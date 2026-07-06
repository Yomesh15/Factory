import React from 'react'
import home from "../assets/home.png";
import { Link } from "react-router-dom";

const CaptainHome = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col"> 
            <div className="flex-1">
                <img
                    src="https://images.unsplash.com/photo-1614091199036-e934784dbf0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHViZXIlMjByaWRlcnxlbnwwfHwwfHx8MA%3D%3D"
                    alt="Factory"
                    className="w-full h-full object-cover object-top"
                />
            </div>
 
            <div className="bg-black px-6 py-6">
                <h1 className="text-white text-3xl font-bold leading-tight">
                    Get Started with Factory as a Captain
                </h1>

                <p className="text-gray-400 mt-3 text-base">
                    Without You , Factory is Nothing !
                </p>

                <Link to="/captainhomepage" onClick={()=> window.scrollTo({top:0, behavior:'smooth'})}>
                    <button className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 active:scale-95 transition-all duration-200 text-black font-semibold py-4 rounded-2xl text-lg">
                        Continue
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CaptainHome