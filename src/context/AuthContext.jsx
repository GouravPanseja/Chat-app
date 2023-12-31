import {createContext} from "react";
import { auth } from "../firebase";
import {onAuthStateChanged} from "firebase/auth";
import {useState,useEffect} from "react"

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{

    

    const [currentUser , setCurrentUser] = useState(null);
    
    useEffect( ()=>{
        
        // observer applied on auth objmect
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            
            setCurrentUser(user);
    
        })

        return ()=>{
            unsubscribe();  
        }
    }, [])

    return (
        
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    )
}