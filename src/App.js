
// import CardSignin from './modules/authentication/components/CardSignin';
// import FormSignin from './modules/authentication/components/FormSignin';
// import './App.css';
// import React from 'react'

// function App() {
//   return (
//     <div>
//       <CardSignin/>

//     </div>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";


import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/common/Home";
export default function App() {
  return (   
    
    <Router>

      <Routes>
        <Route path='/sign-in' element={<SignIn />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/Home' element={<Home/>}/>
      </Routes>

    </Router>
  );
}