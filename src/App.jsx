import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegistrPage';
import ErrorPage from "./pages/ErrorPage/Error";
import Home from './pages/Home';
import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(
    function(){
    if(token){
      setIsAuth(true);
    }else{
      setIsAuth(false)
      if( !location.pathname.includes('register')){
      navigate("/login")
      }
    }
    },
    [token, location.pathname]
    );

  return (
    <div>
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        isAuth && {}
        (
          <>

            <Route path='/' element={<Home></Home>}></Route>
            
          </>
        )
        <Route path='*' element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
