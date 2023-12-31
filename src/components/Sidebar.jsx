import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

function Sidebar(){
    return(
        <div className="w-[33%] bg-[#3e3c61] overflow-y-scroll">
            <Navbar/>
            <Search/>
            <Chats/>  
        </div>
    )
}
export default Sidebar;