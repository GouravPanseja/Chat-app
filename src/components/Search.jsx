import React from "react";
import { useState,useContext } from "react";
import {db} from "../firebase";
import {collection,where,query, getDocs,getDoc,updateDoc, limit,doc,setDoc, serverTimestamp} from "firebase/firestore";
import {AuthContext} from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext";

function Search(){
    const currentUser = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    // searched username 
    const [username, setUsername] = useState("");
    // actual user
    const [user, setUser] = useState(null);
    // error
    const [error, setError] = useState(false);

    const handleSearch =async ()=>{

        const collectionRef = collection(db,'users');

        const usersQuery = query(collectionRef, where("displayName" , "==", username), limit(1));

        try{

            const querySnapshot = await getDocs(usersQuery);
            var res =null;
            querySnapshot.forEach((userDoc)=>{
                res = userDoc.data();
            })
            if(res){
                setUser(res);
            }
            else{
                setUser(null); 
            }
           
            
        }
        catch(err){
         
            setError(err);
        }
        
        
    
        
       
    }

    const selectUserHandler =async (u)=>{


        setUsername("");
        setUser(null); 


        // check if the selected and the current user chat exists already in 'chats' or not
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        
        try{
            const res = await getDoc(doc(db, "chats", combinedId))
            
            if(!res.exists()){
                // create chat between the two
                await setDoc(doc(db,"chats", combinedId),{
                    messages:[]
                })  
            }           
        
        }
        catch(err){
            console.log(err);
        }
              

        //update userchat's for both users.

        try{
            // update the userChat doc for current user
            await updateDoc(doc(db, "userChats", currentUser.uid),{
                [combinedId + ".userInfo"]:{
                    uid:user.uid,
                    displayName: user.displayName,
                    photoURL:user.photoURL,
                },
                [combinedId +".date"]:serverTimestamp()  
            })

            // update the userChat doc for the user which is selected
            await updateDoc(doc(db, "userChats", user.uid),{
                [combinedId + ".userInfo"]:{
                    uid:currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL:currentUser.photoURL,
                },
                [combinedId +".date"]:serverTimestamp()  
            })



        }
        catch(err){
            console.log(err);
            setError(err);
        }
        dispatch({type:"CHANGE_USER", payload:u});
    }
    

    const keyDownHandler = (e)=>{
        // if key pressed is "enter" than execute this function and return what it returns
        e.code ==='Enter' && handleSearch();
    }

    return(

       
        <div className="search border-b border-1 border-gray ">

            <div className="searchForm ">
                <input onKeyDown={keyDownHandler} onChange={(e)=> setUsername(e.target.value)} value={username}  className="px-2 bg-transparent border-none text-white outline-none text-md text-sm " type="text" placeholder="Find a user"/>
            </div>
            {
                user &&
                    <div  onClick={()=> selectUserHandler(user)} className="userChat p-[10px] flex items-center gap-[10px] text-white cursor-pointer hover:bg-[#2f2d52]">
                        <img className="w-[50px] h-[50px] object-cover rounded-full" src={user.photoURL}/> 
                        <div className="userCahtInfo ">
                            <span className="font-[500] ">{user.displayName}</span>
                        </div>
                    </div>

                }
                
            
            

        </div>
    )
}
export default Search;