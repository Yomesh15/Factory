import React, { useEffect, useState, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import CaptainTodayWork from "../components/CaptainTodayWork";
import factory from "../assets/name.png"
import PopupRide from "../components/PopupRide";
import bellSound from "../assets/bell.wav";
import { IoLogOutOutline } from "react-icons/io5";
import {useNavigate} from "react-router-dom"


const CaptainHomepage = () => {
  const [online, setOnline] = useState(false);
  const [popup, setpopup] = useState(false);
  const navigate = useNavigate()

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(bellSound);
    audioRef.current.loop = true;

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);
  

  useEffect(() => {
    if (!audioRef.current) return;

    if (popup) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.log(err));
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [popup]);


  useEffect(() => {
    let timer;

    if (online) {
      setpopup(false);

      timer = setTimeout(() => {
        setpopup(true);
      }, 4000);
    } else {
      setpopup(false);
    }

    return () => clearTimeout(timer);
  }, [online]);


  return (
    <>
      <div className="w-full bg-white shadow-sm rounded-b-3xl px-5 py-4">

        <div className="flex items-center justify-between">

          <button className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center active:scale-95 transition">
            <GiHamburgerMenu className="text-xl text-gray-700" />
          </button>

          <h1 className="text-xl font-extrabold tracking-wide">
            Captain
          </h1>

          <button className="relative w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center active:scale-95 transition">
            <IoLogOutOutline onClick={() =>{
              localStorage.removeItem("captainToken")
              window.scrollTo({top:0, behavior:"smooth"})
              navigate('/captainlogin')
            }} className="text-xl text-gray-700" />
          </button>

        </div>

        <div className="mt-5 bg-gray-50 rounded-2xl p-4 flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Driver Status
            </p>

            <div className="flex items-center gap-2 mt-1">

              <span
                className={`w-3 h-3 rounded-full ${online
                  ? "bg-green-500 animate-pulse"
                  : "bg-red-500"
                  }`}
              ></span>

              <h2
                className={`font-bold text-lg ${online
                  ? "text-green-600"
                  : "text-red-500"
                  }`}
              >
                {online ? "Online" : "Offline"}
              </h2>

            </div>
          </div>

          <button
            onClick={() => setOnline(!online)}
            className={`relative w-16 h-9 rounded-full transition-all duration-300 ${online
              ? "bg-green-500"
              : "bg-gray-300"
              }`}
          >
            <span
              className={`absolute top-1 left-1 h-7 w-7 rounded-full bg-white shadow-md transition-all duration-300 ${online ? "translate-x-7" : ""
                }`}
            />
          </button>

        </div>

      </div>

      <div className="middle">
        <img src={factory} />
      </div>

      <div className="last">
        {
          popup ? (
            <PopupRide setpopup={setpopup} />
          ) : (
            <CaptainTodayWork />
          )
        }
      </div>
    </>
  );
};

export default CaptainHomepage;