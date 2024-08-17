import { useState } from 'react';
import { FaFileDownload, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiGlobeAlt } from 'react-icons/hi';

const MemeGenerator = () => {
  const [topText, setTopText] = useState<string>('');
  const [bottomText, setBottomText] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('/default-meme.jpg');
  const [error, setError] = useState<boolean>(false)

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
            onErrorCapture={()=>{
              setError(true)
            }}
            onLoadedData={()=>{
              setError(false)
            }}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <div className="image-templates">
            {/* <b>Quick add</b> */}
            <div className="setto" onClick={()=>{
              setImageUrl("/default-meme.jpg")
            }}>
              Default
            </div>
            <div className="setto"  onClick={()=>{
              setImageUrl("https://pbs.twimg.com/media/GVGQ-5BWYAAOawo?format=png&name=small")
            }}>
              NIKE pig
            </div>
            <div className="setto" onClick={()=>{
              setImageUrl("https://pbs.twimg.com/media/GT4ZkhNWsAAU6GK?format=jpg&name=small")
            }}>
              Shooter
            </div>
            <div className="setto" onClick={()=>{
              setImageUrl("https://pbs.twimg.com/media/GU0fSAaasAA9ahD?format=jpg&name=small")
            }}>
              Elon musk
            </div>
          </div>
          {imageUrl && <div className="relative w-full h-64 dark-bg">
            <img src={imageUrl} alt="Meme" className="w-full h-full object-cover rounded-lg" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between text-center text-white">
              <span className="font-bold text-2xl mt-2">{topText}</span>
              <span className="font-bold text-2xl mb-2">{bottomText}</span>
            </div>
          </div>}
          {error && <p className='error'>invalid image</p>}
          <button className="primary-btn button" disabled={!imageUrl || error}>
            Save Image <FaFileDownload />
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