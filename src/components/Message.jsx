import {useState,useContext,useEffect,useRef} from "react";
import { AuthContext} from "../context/AuthContext";
import { ChatContext} from "../context/ChatContext";

function Message({msg}){

    
    const currentUser = useContext(AuthContext);
    const {data} = useContext(ChatContext);
    const [sender, setSender] = useState(null);
    const ref = useRef();

    useEffect(()=>{
        if(msg.senderId === currentUser.uid) setSender("owner");
    },[])


    useEffect(()=>{
        ref.current?.scrollIntoView({behavior:"smooth"});
    },[msg])

    
    return(
        <div ref={ref} className={`message ${sender==="owner" && "flex-row-reverse"} flex gap-[20px] mb-[20px]`}>
            <div className="messageInfo flex flex-col text-gray font-thin ">
            
                <img
                    src={ sender === "owner" ? currentUser?.photoURL : data?.user?.photoURL}
                    className="h-[35px] w-[35px] rounded-full object-cover"
            
                />
                <span className="text-[13px]">just now</span>
            </div>
            <div className={`messageContnet max-w-[80%] flex flex-col gap-[10px] ${sender==="owner" && "items-end" }`}>
                {
                    msg.text &&  <p className="p-[10px] bg-[#8da4f1] max-w-max  text-white" style={{borderRadius:` ${sender==="owner"? "10px 0px 10px 10px" :"0px 10px 10px 10px" }`}}>{msg.text}</p>
                }
               
                {
                msg.img &&  <img className="w-[50%] h-[50%] object-cover rounded" src={msg.img}/> 
                }
               
            </div>

        </div>
    )
}
export default Message;