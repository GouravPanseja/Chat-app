import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
function Home (){
    return(
        <div className="home bg-[#a7bcff] min-h-screen flex items-center justify-center">
            <div className="container  rounded-md w-[65%] h-[80vh] flex overflow-hidden">
                <Sidebar/>
                <Chat/>
            </div>
            
        </div>
        
        )
}

export default Home;