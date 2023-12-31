import React from "react";
import {useContext, useState,useEffect} from "react";
import { db } from "../firebase";
import { getDoc,doc,onSnapshot } from "firebase/firestore";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from '../context/ChatContext'

function Chats(){

    const [chats,setChats] = useState([]);
    const currentUser = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "userChats",currentUser.uid),
        (docSnapshot)=>{
            setChats(docSnapshot.data());
        });
        return ()=>{
            unsub();
        }
    }, [currentUser.uid])
   

    const handleSelect = (u)=>{
        dispatch({type:"CHANGE_USER", payload:u});
    }   


    //  [   [combinedID, { date:--, userInfo:{--}, lastMessage:"--" }] , [combinedID, { date:--, userInfo:{--} , lastMessage:"--"}]   ]
    return(
        <div className="chats">
        
        {
            Object.entries(chats)?.sort((a,b)=> b[1].date -a[1].date).map((chat)=>{
                return(
                    <div onClick={()=> handleSelect(chat[1]?.userInfo)}   key={chat[0]} className="userChat p-[10px] flex items-center gap-[10px] text-white cursor-pointer hover:bg-[#2f2d52]">
                        <img className="w-[50px] h-[50px] object-cover rounded-full" src={chat[1]?.userInfo?.photoURL}/> 
                        <div className="userCahtInfo ">
                            <span className="font-[500] ">{chat[1]?.userInfo?.displayName}</span>
                            <p className="text-[13px] text-slate-200">{chat[1]?.lastMessage?.text}</p>
                        </div>
                    </div>
                )
            })
        }
        </div>
    ) 
}
export default Chats;

