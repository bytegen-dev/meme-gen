import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react';
import { FaEdit, FaFileDownload, FaGithub, FaPlus } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiGlobeAlt } from 'react-icons/hi';

const MemeGenerator = () => {
  const [topText, setTopText] = useState<string>('');
  const [bottomText, setBottomText] = useState<string>('GM');
  const [imageUrl, setImageUrl] = useState<string>('bytegen.png');
  const [error, setError] = useState<string>("")
  const [downloading, setdownloading] = useState<boolean>(false)
  const [loadedImage, setLoadedImage] = useState("")
  const [imageHeight, setImageHeight] = useState(300)

  const imageValid = (imageUrl === "bytegen.png") || (imageUrl === "batman.png") || (imageUrl === "doge.png") || (imageUrl === "elon-musk.png")

  const imageName = imageValid ? imageUrl?.replace(".png", "") : "Custom image"

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
        backgroundColor: "#ffffff00",
        scale: 2,
      });
  
      const dataUrl = canvas.toDataURL('image/png');
  
      const link = document.createElement('a');
      link.href = dataUrl;
      const randomNo:any = Math.ceil(Math.random()*100)
      link.download = `${topText || bottomText || `Meme-${randomNo}`}.png`;
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

  const [imageFile, setImageFile] = useState((null))

  const handleImageChange = (e:any) => {
    const file:any = e.target.files?.[0];
    if (file) {
      setImageFile(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex page-el flex-col items-center justify-center">
        <h1 className="text-4xl smaller font-bold mb-8">Create a Meme</h1>
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
          {!imageValid && <input
            type="number"
            placeholder="Height (px)"
            className="mb-4 p-2 border rounded w-full"
            value={imageHeight}
            onChange={(e) => {
              const value:any = e?.target?.value
              if(value < 501){
                setImageHeight(value)
              }
            }}
            required
          />}
          <input
            type="text"
            placeholder="Image URL (required)"
            className="mb-4 p-2 border rounded w-full"
            value={imageName || ""}
            required
            onChange={(e) => {

            }}
          />
          {/* <span className="add-image">
            Add Image
          </span> */}
          {<input
            type="file"
            style={{
              opacity: "0",
              position: "absolute",
              pointerEvents: "none"
            }}
            placeholder="Upload Meme Background"
            className="mb-4 p-2 border rounded w-full"
            accept="image/*"
            id='input-id'
            onChange={(e) => handleImageChange(e)}
          />}
          <div className="image-templates">
            {/* <b>Quick add</b> */}
            <div className={`setto ${imageUrl === "bytegen.png"}`} onClick={()=>{
              setImageUrl("bytegen.png")
            }}>
              Bytegen
            </div>
            <div className={`setto ${imageUrl === "batman.png"}`}  onClick={()=>{
              setImageUrl("batman.png")
            }}>
              Batman
            </div>
            {/* <div className={`setto ${imageUrl === "bytegen.png"}`}  onClick={()=>{
              setImageUrl("https://pbs.twimg.com/media/GVGQ-5BWYAAOawo?format=png&name=small")
            }}>
              NIKE pig
            </div> */}
            <div className={`setto ${imageUrl === "doge.png"}`} onClick={()=>{
              setImageUrl("doge.png")
            }}>
              Doge
            </div>
            <div className={`setto ${imageUrl === "elon-musk.png"}`} onClick={()=>{
              setImageUrl("elon-musk.png")
            }}>
              Elon musk
            </div>
            <div className={`setto ${imageValid ? "" : "true"}`}  onClick={()=>{
              const inputEl = document.getElementById("input-id")
              inputEl?.click()
            }}>
              Custom {imageValid ? <FaPlus /> : <FaEdit /> }
            </div>
            
          </div>
          {imageUrl && <div className="relative w-full h-64 dark-bg">
            <img src={imageUrl} alt="Meme" className="" style={(imageValid) ? {
              opacity: 1
            } : {
              height: imageHeight + "px",
              minHeight: "250px",
            }} />
            <div className={`absolute-div ${imageUrl === "bytegen.png" ? "bytegen" : ""} ${imageUrl === "doge.png" ? "doge" : ""} ${imageUrl === "batman.png" ? "default" : ""} ${imageUrl === "elon-musk.png" ? "elon-musk" : ""}`}>
              <div className={`text ${topText?.length > 7 ? "long-top" : ""}`}>{topText}</div>
              <div className={`text ${bottomText?.length > 7 ? "long-bottom" : ""}`}>{bottomText}</div>
            </div>
          </div>}
          <div className="hide-me">
            {imageUrl && <div className="relative w-full h-64 dark-bg download" ref={elementRef}>
              <img src={imageUrl} alt="Meme" className=""  style={(imageValid) ? {
              opacity: 1
            } : {
              height: imageHeight + "px",
              minHeight: "250px",
            }} />
              <div className={`absolute-div ${imageUrl === "bytegen.png" ? "bytegen" : ""} ${imageUrl === "doge.png" ? "doge" : ""} ${imageUrl === "batman.png" ? "default" : ""} ${imageUrl === "elon-musk.png" ? "elon-musk" : ""}`}>
                <div className={`text ${topText?.length > 7 ? "long-top" : ""}`}>{topText}</div>
                <div className={`text ${bottomText?.length > 7 ? "long-bottom" : ""}`}>{bottomText}</div>
              </div>
            </div>}
          </div>
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
      {/* <img src={imageUrl} alt="Meme" className="" onLoad={()=>{
        if(imageUrl){
          saveImageToSession(imageUrl)
        }
      }} style={{
        position: "fixed",
        opacity: "0",
        pointerEvents: "none",
      }} /> */}
    </>
  );
};

export default MemeGenerator;