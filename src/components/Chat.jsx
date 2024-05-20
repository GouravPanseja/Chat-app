import { IoMdVideocam , IoIosPersonAdd } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import Messages from "./Messages";
import Input from "./Input";
import {ChatContext} from "../context/ChatContext"
import { useContext } from "react";

function Chat(){
    const {data} = useContext(ChatContext);

    const openMeet = ()=>{
        window.open("https://meet.google.com/")
    }
    return(
        <div className="w-[67%] chat">
            <div className="chatInfo flex items-center justify-between w-full h-[70px] bg-[#5d5b8d] p-[10px] text-slate-100">
                <span>{data.user.displayName}</span>
                <div className="chatIcons flex gap-5 items-end ">
                    <IoMdVideocam 
                        className="text-slate-300 cursor-pointer" size={25}
                        onClick={openMeet}
                    />
                    <IoIosPersonAdd className="text-slate-300 cursor-pointer" size={25}/>
                    <BsThreeDots className="text-slate-300 cursor-pointer" size={25}/>
                </div>                 
            </div>

            <Messages/>
            <Input/>
        </div>
    )
}
export default Chat;