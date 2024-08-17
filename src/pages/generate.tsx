import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import { FaFileDownload, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiGlobeAlt } from 'react-icons/hi';

const MemeGenerator = () => {
  const [topText, setTopText] = useState<string>('');
  const [bottomText, setBottomText] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('default.png');
  const [error, setError] = useState<string>("")
  const [downloading, setdownloading] = useState<boolean>(false)
  const [loadedImage, setLoadedImage] = useState("")

  const elementRef = useRef(null);

  function getImageFromSession(){
    const image = sessionStorage.getItem('image');
    if (image === null) {
      console.error('Image not found in session storage');
    }
    return image;
  }

  async function saveImageToSession(url: string): Promise<void> {
    const response = await fetch(url);
    const blob = await response.blob();
    const reader = new FileReader();
    console.log("Saving image")
    
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const image: any = reader.result;
        sessionStorage.setItem('image', image);
        console.clear()
        console.log("image Saved")
        setLoadedImage(image)
        resolve();
      };

      reader.onerror = () => {
        reject(new Error('Failed to read image'));
      };

      reader.readAsDataURL(blob);
    });
  }

  const downloadImage = async () => {
    try{
      setdownloading(true)
      setError("")
      const element = elementRef.current;
      if (!element) return;
  
      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff0"
      });
  
      const dataUrl = canvas.toDataURL('image/png');
  
      const link = document.createElement('a');
      link.href = dataUrl;
      const randomNo:any = Math.ceil(Math.random()*1000)
      link.download = `meme-${randomNo}.png`;
      link.click(); 
      setTimeout(()=>{
        setdownloading(false)
      }, 2000)
    } catch(error:any){
      console.error(error?.message)
      setError(error?.message)
      setTimeout(()=>{
        setdownloading(false)
      }, 100)
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex page-el flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Create a Meme</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Top Text"
            className="mb-4 p-2 border rounded w-full"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Bottom Text"
            className="mb-4 p-2 border rounded w-full"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image URL (required)"
            className="mb-4 p-2 border rounded w-full"
            value={imageUrl}
            required
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <div className="image-templates">
            {/* <b>Quick add</b> */}
            <div className="setto"  onClick={()=>{
              setImageUrl("default.png")
            }}>
              Default
            </div>
            {/* <div className="setto"  onClick={()=>{
              setImageUrl("https://pbs.twimg.com/media/GVGQ-5BWYAAOawo?format=png&name=small")
            }}>
              NIKE pig
            </div> */}
            <div className="setto" onClick={()=>{
              setImageUrl("https://th.bing.com/th/id/OIP.06sELAGC_YnJm6Prk-rk4wHaHa?rs=1&pid=ImgDetMain")
            }}>
              Doge
            </div>
            <div className="setto" onClick={()=>{
              setImageUrl("https://pbs.twimg.com/media/GU0fSAaasAA9ahD?format=jpg&name=small")
            }}>
              Elon musk
            </div>
            <div className="setto" onClick={()=>{
              setImageUrl("bytegen.png")
            }}>
              Bytegen
            </div>
          </div>
          {imageUrl && <div className="relative w-full h-64 dark-bg" ref={elementRef}>
            <img src={imageUrl} alt="Meme" className="w-full h-full object-cover rounded-lg" onLoad={()=>{
              if(imageUrl){
                saveImageToSession(imageUrl)
              }
            }} style={{
              position: "absolute",
              opacity: "0",
              pointerEvents: "none",
            }} />
            <img src={loadedImage} alt="Meme" className="w-full h-full object-cover rounded-lg" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between text-center text-white">
              <span className="font-bold text-2xl mt-2">{topText}</span>
              <span className="font-bold text-2xl mb-2">{bottomText}</span>
            </div>
          </div>}
          {error && <p className='error'>{error || "an error occured"}</p>}
          <button className="primary-btn button" disabled={!imageUrl} onClick={()=>{
            if(downloading){
              return
            }
            downloadImage()
          }}>
            {downloading ? "Downloading..." : <>Save Image <FaFileDownload /></>}
          </button>
        </div>
      </div>
      <div className="center-me">
        <div className="bottom-details">
          <a href="https://bytegen.dev" target="_blank" className="link">
            <HiGlobeAlt />
          </a>
          <a href="https://github.com/bytegen-dev" target="_blank" className="link">
            <FaGithub />
          </a>
          <a href="https://x.com/bytegen_dev" target="_blank" className="link">
            <FaXTwitter />
          </a>
        </div>
      </div>
    </>
  );
};

export default MemeGenerator;