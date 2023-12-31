import { signOut } from "firebase/auth";
import {auth} from "../firebase"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Navbar(){
    const currentUser = useContext(AuthContext);



    return(
        <div className="navbar flex items-center justify-between bg-[#2f2d52] h-[70px] p-[10px] text-[#ddddf7] text-[14px]">
            <span className="logo font-bold">Chat Box</span>
            <div className="w-[50%] flex items-center justify-evenly">
                <img className="bg-#ddddf7 h-[24px] w-[24px] rounded-full object-cover " src={currentUser.photoURL} alt=""/>
                <span>{currentUser.displayName}</span>
                <button onClick= {async ()=>{ await signOut(auth)}} className="text-[10px] bg-[#5d5b8b] text-[#ddddf7] p-[2px] rounded ">Logout</button>
            </div>
        </div>
    )
}
export default Navbar;