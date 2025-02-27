import React from "react";
import { Link } from "react-router-dom";
import "./Mainpage.css"; // Import your CSS file
import biw from "../assets/biw.webp";
import i1 from "../assets/1.png";
import i2 from "../assets/2.png";
import i3 from "../assets/3.png";
import i4 from "../assets/4.png";
import i5 from "../assets/5.png";
import i6 from "../assets/6.png";
import Pillar from "../assets/piilar.png";

export default function Mainpage() {
  return (
    <div className="home-container">
    <div className="content">
        <div className="TPM">
    <h1 className="title">
            An Overview of </h1><span className="highlight">TPM Manufacturing</span>
          
          <p className="description">
            Find out all about Total Productive Maintenance (TPM) and its 8 pillars, 
            why and how to implement it in your factory, and the benefits of digitized TPM processes.
          </p></div>
          <div className="biw">
          <img className="BIWSHOP" src={biw} alt="" />
          </div>
          </div>
      {/* Content Grid */}
      <div className="content-grid">
        
        {/* Main Content Area */}
        <div className="main-content">
         
        <h2 id="what-is-tpm" className="subtitle">What is Total Productive Maintenance?</h2>
          <p className="description">
          Total Productive Maintenance is a holistic approach to equipment maintenance that integrates maintenance activities with the manufacturing process. It seeks to reduce time and production waste, eliminate small stops and breakdowns, eradicate workplace accidents and achieve perfect production. As a lean manufacturing strategy and cornerstone of loss reduction, TPM manufacturing depends on your workers taking proactive measures to prevent downtime and environmental issues, as well as encourage a safe and healthy work environment—all while improving productivity.
          </p>
          <h2 id="why-implement" className="subtitle">Why Implement TPM in Your Factory?</h2>
          <div className="paraandimg">
            <div className="img">
            <img src={i1} height="60px" width="60px"alt="" />
            </div>
            <div className="para">
            <h2 className="subtitle">Reduce waste and product defects</h2>
            <p className="description">
                A goal of TPM is to keep machines running in their optimal condition. By properly maintaining equipment and proactively mitigating wear and breakdown risks, plant managers can reduce the amount of scrap and product defects that result from the process.
            </p>
            </div>
          </div>
          <div className="paraandimg">
          <div className="img">
            <img src={i2} height="60px" width="60px" alt="" />
            </div>
            <div className="para">
            <h2 className="subtitle">Reduce operating costs</h2>
            <p className="description">
            Expanding on the previous point, TPM minimizes manufacturing scrap and product defects, reducing material costs. Maximizing uptime through proper equipment care also means you can ship goods quickly once they come off production lines, which lowers your inventory costs.
            </p>
            </div>
          </div>
          <div className="paraandimg">
          <div className="img">
            <img src={i3} height="60px" width="60px" alt="" />
            </div>
            <div className="para">
            <h2 className="subtitle">Increase productivity rates</h2>
            <p className="description">
            By nature, less equipment breakdowns means your machines are running for longer periods of time, increasing your overall output.
            </p>
            </div>
          </div>
          <div className="paraandimg">
          <div className="img">
            <img src={i4} height="60px" width="60px" alt="" />
            </div>
            <div className="para">
            <h2 className="subtitle">Empower your workers</h2>
            <p className="description">
            TPM calls for workers to actively step up and take care of their equipment—even before an issue arises. As a result, workers are accomplishing much more than just clocking into the factory each day. Rather, they’re taking greater ownership of their machines, which adds a valuable social aspect to their job function.
            </p>
            </div>
          </div>
          <div className="paraandimg">
          <div className="img">
            <img src={i5} height="60px" width="60px" alt="" />
            </div>
            <div className="para">
            <h2 className="subtitle">Minimize safety issues</h2>
            <p className="description">
            TPM seeks to eliminate health and safety risks, leading to a safer workplace that has no adverse effects on workers’ physical or mental health.
            </p>
            </div>
          </div>
          <div className="paraandimg">
            <div className="img">
            <img src={i6} height="60px" width="60px"alt="" />
            </div>
            <div className="para">
            <h2 className="subtitle">Take a proactive approach to quality</h2>
            <p className="description">
            TPM requires taking preventative, rather than just reactive, quality checks, ensuring all systems and processes are contributing to the production of high-quality products. Not only does this reduce the amount of product defects, but it can also minimize the amount of customer complaints.
            </p>
          </div>
          </div>
          <h2 id="pillar" className="subtitle">The eight TPM Pillars</h2>
          <img src={Pillar} height="250px" width="700px" alt="" />
        </div>

        {/* Table of Contents Sidebar */}
        <div className="sidebar">
          <div className="sidebar-box">
            <h3 className="sidebar-title">Table of Contents</h3>
            <nav>
              <ul className="sidebar-list">
              <li><a href="#what-is-tpm" className="sidebar-link">What is Total Productive Maintenance?</a></li>
                <li><a href="#why-implement" className="sidebar-link">Why Implement TPM in Your Factory?</a></li>
                <li><a href="#goals" className="sidebar-link">The Goals of TPM</a></li>
                <li><a href="#pillar" className="sidebar-link">The eight TPM Pillars</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
