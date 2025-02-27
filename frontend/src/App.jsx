import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from './components/Navbar';
import Mainpage from './components/Mainpage';
import './App.css';
import Form from "./components/Form";
import TPMMessage from "./components/TPMMessage";
import ChatBox from "./components/ChatBox";
import Resources from "./components/Resources";
import TPMThemeUpdate from "./components/TPMThemeUpdate";
import Kaizen from "./components/Kaizen";
function App() {
  const Layout = ({ children }) => {
    return (
      <>
        <Navbar />
        <TPMMessage />
        {children}
      </>
    );
  };    
    return (
       <>
  <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Layout><Mainpage/></Layout>} />
        <Route path="/Kaizen" element={<Layout><Kaizen/></Layout>} />
        <Route path="/resources" element={<Layout><Resources /></Layout>} />
        <Route path="/Update" element={<Layout><div className="ChatboxandTPMUpdate"><ChatBox />< TPMThemeUpdate/></div></Layout>} />
        <Route path="/form" element={<Layout><Form /></Layout>} />
      </Routes>
    </Router>
       </>
          
    );
}

export default App;
