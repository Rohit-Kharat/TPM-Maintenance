import React from 'react'
import M6 from "../assets/M6.png";
function Resources() {
  return (
        <div className="content-grid">
        
        {/* Main Content Area */}
        <div className="main-content">
        <h2 id="Sealent" className="subtitle">Replacement of Sealent Drum</h2>
        <h4>Step:1 - Personal Protective Equipment (PPE)</h4>
        <p>Gloves – Protect hands from exposure to sealants, which may contain chemicals.
Safety Goggles – Prevent eye irritation from fumes or accidental splashes.
Mask or Respirator – If working in a closed environment, wear a respirator to avoid inhaling fumes.
Protective Clothing – Avoid direct skin contact with chemicals.</p>
<h4>Step:2 - OPEN THE BAG LINER</h4>
<p>Opening the adhesive drum liner before loading into the pump will provide easier access to prepare the bag and top sheet for unloading.</p>
<img src="https://seal-bond.com/hs-fs/hubfs/SealBond_May2024/images/Open-Adhesive-Lining-Bag.jpg?width=1200&height=1200&name=Open-Adhesive-Lining-Bag.jpg" width="250px"alt="" />
<h4>Step:2 - CUT BAG AND LINER</h4>
<p>Trim the bag liner to the top of the drum and cut the top sheet using a template. Proper trimming will allow the pump to operate as designed and minimize the leaks and air bubbles.</p>
<img src="https://seal-bond.com/hs-fs/hubfs/SealBond_May2024/images/Trim-Adhesive-Lining-Bag.jpg?width=1200&height=861&name=Trim-Adhesive-Lining-Bag.jpg" width="250px"alt="" />
<h4>Step:2 - CUT BAG AND LINER</h4>
<p>The drum liner and top sheet should be compressed neatly at the bottom of the drum for easy disposal.</p>
<img src="https://seal-bond.com/hs-fs/hubfs/SealBond_May2024/images/Clean-unloaded-drum.jpg?width=1152&height=1536&name=Clean-unloaded-drum.jpg" width="250px" height="300px" alt="" />
<iframe width="560" height="315" src="https://www.youtube.com/embed/hOmpu7YBd-U?si=9SiwTRYgEJdtMrf_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<h2 id="6M" className="subtitle">6M Level Problem Handling</h2>
<p>The 6M are a set of categories used to identify the root cause of problem, particularly in manufacturing process.</p>
<img src={M6} height="350px" width="700px" alt="" />
<h4>Man</h4>
<p>This category addresses issues related to human error skills training and heavier in the manufacturing process in the process.automative industry,human factors can lead to defects in assembly incorrect installation or failure to follow safety procedures.</p>
<h4>Problem Handling</h4>
<p>Training and skill development :- Ensuring working have proper training certification and skill development program.</p>
<p>Ergonomics:- Work station ergonomics to reduce work fatigues and error.</p>
<p>Clear instruction provide clear and concise work instruction and checklist.</p>
<p>Monitoring and auditingimplement periodic audit to check human error rates and correction action plan.</p>
<h4>Method</h4>
<p>This refers to process technique and workflow using in manufacturing the vehicle insufficient or inconsistent process can lead to quality issues or inefficiencies on production line</p>
<p>Problem Handling</p>
<p>Standard quality procedure(SOP) :-assure all the.process are documented.and follow consistency to reduce variability.</p>
<p>Process optimization :- Continuously evaluating and optimize process for efficiency and quality.</p>
<p>Kaisen Practice:- Adopt continuous improvement technique such as Kaizen to streamline process and eliminate waste.</p>
<p></p>
</div>
       <div className="sidebar">
          <div className="sidebar-box">
            <h3 className="sidebar-title">Accessing the knowledge</h3>
            <nav>
              <ul className="sidebar-list">
              <li><a href="#Sealent" className="sidebar-link">Replacement of Sealent Drum</a></li>
                <li><a href="#Tip" className="sidebar-link">Replacement of Tip</a></li>
                <li><a href="#Visitor" className="sidebar-link">Visitors DO's and DON'T</a></li>
                <li><a href="#6M" className="sidebar-link">6M Level Problem Handling</a></li>
              </ul>
            </nav>
          </div>
        </div>
    </div>
  )
}

export default Resources
