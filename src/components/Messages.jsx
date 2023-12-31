import React from 'react';
import{useState,useContext,useEffect} from "react";
import Message from './Message';
import { ChatContext } from '../context/ChatContext';
import { db } from "../firebase";
import { doc,onSnapshot } from "firebase/firestore";
const Messages = ()=>{
    const [messages, setMessages] = useState([]);
    const {data} = useContext(ChatContext);
   

    useEffect(()=>{
       
        const unsubscribe = onSnapshot(doc(db, "chats", data.chatId),(documentSnaphot)=>{
            
            // exists() will just check if there is a doc with id--> combinedId
            if(documentSnaphot.exists()){
     
                setMessages(documentSnaphot.data().messages);
            }
            else{
                console.log(data);
 
            }
        });
        return()=>{
            unsubscribe();
        }
    }
    ,[data.chatId]) // so that when user selects another person from chats the chat change

    console.log(messages);

   
    return(
        <div className='messages bg-[#ddddf7] p-[10px] overflow-scroll' style={{height:'calc(100% - 140px)'}}>
           {
            messages.map((message)=>(
                <Message key={message.id} msg ={ message}/>
            ))
           }

            
            
            
        </div>
    )
}

export default Messages;