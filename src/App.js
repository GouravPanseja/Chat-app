import logo from './logo.svg';
import Register from './pages/Regsiter';
import Login from "./pages/Login"
import Home from "./pages/Home"
import Loader from './components/Loader';
import {Routes, Route} from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

function App() {
  const currentUser  = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route path='/'  element={
          <ProtectedRoute user = {currentUser}>
              <Home/>
          </ProtectedRoute>
    
        }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        
      </Routes> 
      

    </div>
  );
}

function ProtectedRoute({children,user}){
  return(
    user ?
    children :
    <Register/>

  )
}
export default App;
