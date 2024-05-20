import React, {useState, useRef} from "react";
import { Link,useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";
import Loader from "../components/Loader";
import bg from "../assets/icons-bg.svg"
function Login(){

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
        const email = e.target[0].value;
        const password = e.target[1].value;
        console.log(email,password);


        try{
            setLoading(true); 
            const res = await signInWithEmailAndPassword(auth, email, password);

            console.log(auth.currentUser);
            setLoading(false);

            navigate("/");
            


        }
        catch(err)  {
           
            displayText(err);
            console.log(err);
            setError(true);
            setLoading(false);

        }
        
    }
        

    return(
        <div className="formContainer bg-black min-h-screen flex justify-center items-center tex-white" style={{backgroundImage:`url(${bg})`}}>
            <div className="formWrapper flex flex-col w-[25vw] bg-black h-[50vh] p-5 rounded-md justify-between  items-center" style={{ boxShadow: "0px 1px 5px 3px rgb(239,254,139)"}}>
             
                <span className="logo mb-0 text-white"> Chat Box </span>
                <span className="title text-xs mt-0 text-slate-4 text-white">Register</span>
             
                
                <form onSubmit={submitHandler} className="flex flex-col h-[70%] justify-around ">
                    <input className="border-b shadow-b shadow-sm rounded p-[2px]" type="email" placeholder="email.."/>
                    <input className="border-b shadow-b shadow-sm rounded p-[2px]" type="password" placeholder="password..."/>
                    <button   className="bg-slate-300 rounded p-1 w-[50%] mx-auto relative h-[50px] flex justify-center items-center">{loading ? <Loader/> : "Sign up"}</button>
                </form>
                <p className="text-sm text-white">Don't have an account?  <Link to={"/register"}>Signup</Link></p>
                <div className="h-4  text-white w-full" ref={display}> </div>
            </div>
        </div>
    )
}

export default Login;