import { MdOutlineAttachment } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import React from "react";
import  {useState,useContext} from "react";
import { AuthContext} from "../context/AuthContext";
import { ChatContext} from "../context/ChatContext";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import {updateDoc, doc, arrayUnion} from "firebase/firestore";
import { db,storage } from "../firebase";
import {v4 as uuid} from "uuid"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

function Input(){
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const currentUser = useContext(AuthContext);
    const {data} = useContext(ChatContext);
    
    
    

    const handleSend = async()=>{   
        setText("");
        setImg(null);
        
        if(img){    
            try{
                              
                const pathRef = ref(storage, `chatImages/${uuid()}` );
               
                await uploadBytes(pathRef, img );
    
                const url = await getDownloadURL(pathRef);
                console.log(url);
                   
                await updateDoc(doc(db,"chats",data.chatId),{
                    messages: arrayUnion({
                        id : uuid(),
                        text,
                        senderId: currentUser.uid,
                        date:Timestamp.now(),
                        img:url,
                    })
                })
    
            }
            catch(err)  {
                console.log(err);
            }
            
        }
        else{
            try{
                console.log(currentUser);
                await updateDoc(doc(db,"chats",data.chatId),{
                    messages: arrayUnion({
                        id : uuid(),
                        text,
                        senderId: currentUser.uid,
                        date:Timestamp.now()        // this is local timestamp whereas serverTimestamp was global server timestamp
                    })
                })
            }
            catch(err){
                console.log(err);
            }
            
        }

        try{
            await updateDoc(doc(db,"userChats",currentUser.uid),{
                [data.chatId + ".lastMessage"]:{text},
                [data.chatId + ".date"]:  serverTimestamp(),
    
            })
            await updateDoc(doc(db,"userChats",data.user.uid),{
                [data.chatId + ".lastMessage"]:{text},
                [data.chatId + ".date"]:  serverTimestamp(),
    
            })
        }

        catch(err){
            console.log(err);
        }
        






        
    }   
    const inputSendByEnterHandler=(e)=>{
        e.code ==='Enter' && handleSend();
    }
    return(
        <div className="input h-[70px] bg-white p-[10px] flex items-center justify-btween">
            <input onKeyDown={inputSendByEnterHandler} value={text} onChange={(e)=> setText(e.target.value)} className="w-full outline-none text-[#2f2d52]" type="text" placeholder="Type message..."/>
            <div className="send flex items-center gap-[10px]">
                <CiImageOn size={20 } className=" text-slate-400" />

                <input onChange={(e)=> setImg(e.target.files[0])} type="file" className="hidden h-[40px]" id="file"></input>

                <label htmlFor="file">
                    <MdOutlineAttachment size={20} className="rotate-[90deg] font-bold text-slate-400"/>
                </label>

                <button onClick={handleSend}  className="py-[8px] px-[15px] text-white bg-[#8da4f1] rounded">Send</button>
            </div>
        </div>
    )
}
export default Input; 