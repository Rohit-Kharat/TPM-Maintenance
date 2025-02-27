import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu } from "lucide-react"; // Added Menu icon
import "./Navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbar-container">
      <nav className="border-b">
        <div className="container">
          <div className="nav-content">
            {/* Logo and Mobile Menu Button */}
            <div className="nav-header">
              <Link to="/home" className="logo">
                <span className="text-xl font-bold">TATA MOTORS</span>
              </Link>
              
              <button 
                className="mobile-menu-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Main Menu */}
            <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <Link to="/form" className="nav-item" onClick={() => setIsMenuOpen(false)}>
                Form
              </Link>
              <Link to="/Kaizen" className="nav-item" onClick={() => setIsMenuOpen(false)}>
                Kaizen
              </Link>
              <Link to="/Resources" className="nav-item" onClick={() => setIsMenuOpen(false)}>
                Resources
              </Link>
              <Link to="/Update" className="nav-item" onClick={() => setIsMenuOpen(false)}>
                Update
              </Link>
              <Link to="/contact" className="nav-item" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}