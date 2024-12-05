import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faCopy } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import AxiosInstance from "../utils/axiosInstace";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./loader";
interface Preview {
  title: string;
  image: string;
}
const HomePage = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [shortenUrl, setShortenUrl] = useState("");
  const [openModal, setModal] = useState(false);
  const [preview, setPreview] = useState<Preview>({
    title: "",
    image: "",
  });
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parsedData = JSON.parse(userData as string);
    const { name } = parsedData;
    if (name) {
      setName(name);
    }
  }, []);

  const createShortId = () => {
    if (url.trim().length === 0) {
      toast.error("Enter a url to generate short url");
      return;
    } else {
      setLoader(true);
      AxiosInstance.post("/urlshortener", { url })
        .then(res => {
          setModal(true);
          setShortenUrl(res?.data?.shortenUrl);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  const navigate = useNavigate();
  const logout = () => {
    AxiosInstance.post("/users/logout").then(res => {
      if (res.status === 200) {
        localStorage.removeItem("userData");
        navigate("/login");
        toast.success(res.data.message);
      }
    });
  };

  const searchUrl = () => {
    if (shortenUrl.trim().length === 0) {
      toast.error("Enter a shortenUrl to search domain");
      return;
    } else {
      AxiosInstance.get(`/urlshortener/${shortenUrl}`).then(res => {
        console.log("res = ", res.data);
        const url = res.data;
        if (url) {
          window.open(url, "_blank");
        } else {
          toast.error("Invalid shortened url");
        }
      });
    }
  };

  const fetchUrlData = () => {
    if (url.trim().length > 0) {
        setLoader(true)
      AxiosInstance.post("/urlshortener/preview", { url }).then(response => {
        console.log("response = ", response.data);
        setPreview(()=>{
           return{
           title:response.data.title,
            image:response.data.image
           }
        })
      })
      .finally(()=>{
        setLoader(false)
      })
    }
  };

  useMemo(fetchUrlData, [url]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shortenUrl)
      .then(() => {
        toast("URL copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <>
      {loader && <Loader />}
      <div className="h-screen w-screen flex flex-col space-y-5 justify-center items-center relative">
        <header className="h-14 top-0 absolute w-full bg-indigo-500 flex items-center justify-between px-5 text-white ">
          <h1 className="font-bold font-mono text-xl">UrlShortner</h1>
          <div className="flex items-center space-x-4">
            <h1 className="font-semibold text-lg">{`welcome ${name} !`}</h1>
            <FontAwesomeIcon
              className="text-white h-6"
              icon={faPowerOff}
              onClick={logout}
            />
          </div>
        </header>
        <div className="flex flex-col w-full items-center  justify-center ">
            {preview.title.trim().length>0&&(
                <div className="flex items-center space-x-3">
                    {preview.image.length>0&&(
                     <img src={preview.image} alt=""  className="h-10 w-10 rounded-full"/>
                    )}
                    
                <h1>{preview.title}</h1>
                </div>
            )}
            <div className="flex  w-full justify-center">
            <input
            type="text"
            value={url}
            className="w-2/5 h-12 bg-slate-500 focus:outline-none focus:ring-0 px-4 text-white rounded-l-lg placeholder:text-white"
            placeholder="Paste url here "
            onChange={e => setUrl(e.target.value)}
          />
          <button
            className="bg-indigo-600 text-white px-5 rounded-r-lg"
            onClick={() => createShortId()}
          >
            create short url
          </button>
            </div>
          
        </div>
        {shortenUrl && shortenUrl.length > 0 && (
          <div className="flex w-full justify-center ">
            <input
              type="text"
              value={shortenUrl}
              className="w-2/5 h-12 bg-slate-500 focus:outline-none focus:ring-0 px-4 text-white rounded-l-lg placeholder:text-white"
              placeholder="Paste url here "
              onChange={e => setShortenUrl(e.target.value)}
            />
            <button
              className="bg-indigo-600 text-white px-5 rounded-r-lg"
              onClick={() => searchUrl()}
            >
              Search Domian
            </button>
          </div>
        )}
      </div>
      {openModal && shortenUrl && shortenUrl.length > 0 && (
        <div className="justify-center items-center flex fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-75">
          <div className="h-[300px] relative w-[550px] bg-white flex items-center justify-center px-5">
            {/* <div className="relative"> */}
            <div className="absolute top-4 right-5">
              <FontAwesomeIcon
                className="text-black h-8"
                onClick={() => setModal(false)}
                icon={faTimesCircle}
              />
            </div>
            <input
              type="text"
              className="bg-slate-500 text-white h-12 w-full px-4 focus:ring-0 focus:border-none focus:outline-none rounded-l-lg"
              value={shortenUrl}
              readOnly
              name=""
              id=""
            />
            {/* <FontAwesomeIcon className="text-black h-6" icon={faCopy}  /> */}
            {/* </div> */}
            <button
              className="bg-indigo-600 text-white  max-h-12 h-12 px-5 py-2 rounded-r-lg"
              onClick={copyToClipboard}
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
