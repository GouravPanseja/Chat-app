import { FaRegImage } from "react-icons/fa6";
import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth,storage,db} from "../firebase"
import React  from "react";
import {useState,useRef} from 'react';
import Loader from "../components/Loader";
import {  ref, uploadBytesResumable, getDownloadURL,uploadBytes } from "firebase/storage";
import {setDoc, doc} from "firebase/firestore"
import { useNavigate,Link } from "react-router-dom";


function Register() {

    const [error, setError] = useState(false);
    const [loading, setLoading] =useState(false);
    const display = useRef();
    const navigate = useNavigate();

    const displayText =(text)=>{ 
        display.current.innerHTML = text
        
    }
   
    const submitHandler =async (e)=>{
        e.preventDefault();
        
        // extracting values of the input 
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        
        if(!file){
            displayText("No image added")
            return;
        } 
        console.log(file.name);

        try{
            setLoading(true); 
            const res = await createUserWithEmailAndPassword(auth, email, password);
            
            const pathRef = ref(storage, `userImages/${file.name}` );
           
            await uploadBytes(pathRef, file);

            const url = await getDownloadURL(pathRef);
            console.log(url);
            
            await updateProfile(auth.currentUser, {
                displayName:name,
                photoURL: url,
               
            })

            await setDoc(doc(db, "users" , auth.currentUser.uid), {
                displayName:name,
                email:email,
                photoURL:url,
                uid:auth.currentUser.uid,
            })

            // doc of id same as userId is made
            await setDoc(doc(db, 'userChats', auth.currentUser.uid), {});
            setLoading(false);

            navigate("/");
            


        }
        catch(err)  {
           
            displayText(err);
            setError(true);
            setLoading(false);

        }
        
        
        


    }
    return (
        <div className="formContainer bg-slate-400 min-h-screen flex justify-center items-center tex-white">
            <div className="formWrapper h-[30vw] flex flex-col md:w-[90vw] sm:w-[90vw] w-[28vw] bg-white  p-5 rounded-md justify-between  items-center">
             
                <span className="logo mb-0"> Chat Box </span>
                <span className="title text-xs mt-0 text-slate-4 00">Register</span>
             
                
                <form onSubmit={submitHandler} className="flex flex-col h-[70%] justify-around ">
                    <input className="border-b shadow-b shadow-sm rounded p-[2px]" type="text" placeholder="name..."/>
                    <input className="border-b shadow-b shadow-sm rounded p-[2px]" type="email" placeholder="email.."/>
                    <input className="border-b shadow-b shadow-sm rounded p-[2px]" type="password" placeholder="password..."/>
                    <input onChange={(e)=>{ displayText(e.target.files[0]?.name.substring(0,7) + "...")}} className="hidden " type="file" id="file"/>
                    <label htmlFor="file">
                        <div className="w-full flex justify-center">
                            <FaRegImage size={25} className="inline mx-5 cursor-pointer"/> 
                            <span className=" mx-5 cursor-pointer">upload an image</span>  
                        </div>
                    </label>
                    <button className="bg-slate-300 rounded p-1 w-[50%] mx-auto relative h-[50px] flex justify-center items-center">{loading ? <Loader/> : "Sign up"}</button>
                    <p  className="text-sm">Already have an account? <Link to= "/login" >Login</Link> </p>
                </form>
               <div ref={display} className="h-[20px] "> </div>
            </div>
        </div>
    )
    
}

export default Register;