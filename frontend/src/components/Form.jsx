import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Form.css';

function Form() {
    const [issues, setIssues] = useState([]);
    const [newIssue, setNewIssue] = useState({ TPM: "", Name: "", category: "", NOP: "", Line: "", description: "",status: "" });
    const [isRedTagClosed, setIsRedTagClosed] = useState(""); // Yes/No
const [whoClosedRedTag, setWhoClosedRedTag] = useState(""); // Name of the person
const [howRedTagClosed, setHowRedTagClosed] = useState("");
    const [images, setImages] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchIssues();
        const interval = setInterval(fetchIssues, 60000); // Refresh every minute
        return () => clearInterval(interval);
    }, []);

    const fetchIssues = async () => {
        try {
            const response = await axios.get("http://localhost:5000/issues");
            const allIssues = response.data;

            // Filter out issues older than 24 hours
            const now = new Date();
            const recentIssues = allIssues.filter(issue => {
                const issueTime = new Date(issue.createdAt);
                return (now - issueTime) < 24 * 60 * 60 * 1000; // Keep only issues less than 24 hours old
            });

            setIssues(recentIssues);
        } catch (error) {
            console.error("Error fetching issues:", error);
        }
    };

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this issue?")) {
            await axios.delete(`http://localhost:5000/issues/${id}`);
            fetchIssues();
        }
    };
    const handleStatusChange = (status) => {
        setNewIssue((prevIssue) => ({
            ...prevIssue,
            status: prevIssue.status === status ? "" : status, // Toggle selection
        }));
    
        // Reset Red Tag details if another status is selected
        if (status !== "Red Tag") {
            setIsRedTagClosed("");
            setWhoClosedRedTag("");
            setHowRedTagClosed("");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("TPM", newIssue.TPM);
        formData.append("Name", newIssue.Name);
        formData.append("category", newIssue.category);
        formData.append("NOP", newIssue.NOP);
        formData.append("Line", newIssue.Line);
        formData.append("description", newIssue.description);
        formData.append("status", newIssue.status);
        
        if (newIssue.status === "Red Tag") {
            formData.append("isRedTagClosed", isRedTagClosed);
            formData.append("whoClosedRedTag", whoClosedRedTag);
            formData.append("howRedTagClosed", howRedTagClosed);
        }
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        await axios.post("http://localhost:5000/issues", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        setNewIssue({ TPM: "", Name: "", category: "", NOP: "", Line: "", description: "",status: "" });
        setImages([]);
    setIsRedTagClosed("");
    setWhoClosedRedTag("");
    setHowRedTagClosed("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        fetchIssues();

        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    const exportExcel = async () => {
        window.location.href = "http://localhost:5000/export-excel";
    };

    return (
        <>
        <div className="form-container">
            <h2 className="Heading">Maintenance Issue Tracker</h2>
            
            <form className="issue-form" onSubmit={handleSubmit}>
                <input className="input-field" type="text" placeholder="TPM Theme" value={newIssue.TPM} onChange={(e) => setNewIssue({ ...newIssue, TPM: e.target.value })} required />
                <input className="input-field" type="text" placeholder="Name" value={newIssue.Name} onChange={(e) => setNewIssue({ ...newIssue, Name: e.target.value })} required />
                
                <select className="input-field" value={newIssue.category} onChange={(e) => setNewIssue({ ...newIssue, category: e.target.value })} required>
                <option value="">Select</option>
                    <option value="Maintanance">Maintanance</option>
                    <option value="Production">Production</option>
                </select>
                <input className="input-field" type="number" placeholder="Number of People involved" value={newIssue.NOP} onChange={(e) => setNewIssue({ ...newIssue, NOP: e.target.value })} required />
                
                <select className="input-field" value={newIssue.Line} onChange={(e) => setNewIssue({ ...newIssue, Line: e.target.value })} required>
                    <option value="">Select Line</option>
                    <option value="REARFLOOR">REAR FLOOR</option>
                    <option value="FRONTFLOOR">FRONT FLOOR</option>
                    <option value="FRONTEND">FRONT END</option>
                    <option value="UNDERBODYCOMPLETE">UNDER BODY COMPLETE</option>
                    <option value="BODYSIDERH">BODY SIDE RH</option>
                    <option value="BODYSIDELH">BODY SIDE LH</option>
                    <option value="MAINLINE">MAIN LINE</option>
                    <option value="TAILGATE">TAILGATE</option>
                    <option value="FDRDLH">FDRD LH</option>
                    <option value="FDRDRH">FDRD RH</option>
                    <option value="HOOD">HOOD</option>  
                    <option value="FENDER">FENDER</option>
                </select>
                <div className="status-selection">
    <label>
        <input
            className='checkbox'
            type="checkbox"
            checked={newIssue.status === "White Tag"}
            onChange={() => handleStatusChange("White Tag")}
        />
        White Tag
    </label>
    <label>
        <input
            className='checkbox1'
            type="checkbox"
            checked={newIssue.status === "Red Tag"}
            onChange={() => handleStatusChange("Red Tag")}
        />
        Red Tag
    </label>
</div>

{/* Show additional fields only if Red Tag is selected */}
{newIssue.status === "Red Tag" && (
    <div className="red-tag-details">
        <label>Is the Red Tag Closed?</label>
        <select className="input-field" value={isRedTagClosed} onChange={(e) => setIsRedTagClosed(e.target.value)} required>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>

        {/* If Red Tag is Closed, ask for details */}
        {isRedTagClosed === "Yes" && (
            <>
                <input className="input-field" type="text" placeholder="Who closed the Red Tag?" value={whoClosedRedTag} onChange={(e) => setWhoClosedRedTag(e.target.value)} required />
                <textarea className="textarea-field" placeholder="How was the Red Tag closed?" value={howRedTagClosed} onChange={(e) => setHowRedTagClosed(e.target.value)} required></textarea>
            </>
        )}
    </div>
)}
                <textarea className="textarea-field" placeholder="Description" value={newIssue.description} onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })} required></textarea>
                
                <input className="file-input" type="file" multiple ref={fileInputRef} onChange={handleFileChange} />
                
                <button className="submit-button" type="submit">Submit Issue</button>
            </form>

            {showPopup && (
                <div className="popup">
                    <p>✅ Thank you for your response!</p>
                </div>
            )}  
        </div>
         <h3 className="Issue-List">Issue List (Only Last 24 Hours)</h3>
            
         <table className="issue-table">
             <thead>
                 <tr>
                     <th>TPM Theme</th>
                     <th>Name</th>
                     <th>Category</th>
                     <th>Number of People Involved</th>
                     <th>Line</th>
                     <th>Status</th>
                     <th>Description</th>
                     <th>Images</th>
                     <th>Is the Red Tag Closed</th>
                     <th>Who Close the tag</th>
                     <th>How is Tag Tackle</th>
                     <th>Action</th>
                 </tr>
             </thead>
             <tbody>
                 {issues.length > 0 ? (
                     issues.map((issue, index) => (
                         <tr key={index}>
                             <td>{issue.TPM}</td>
                             <td>{issue.Name}</td>
                             <td>{issue.category}</td>
                             <td>{issue.NOP}</td>
                             <td>{issue.Line}</td>
                             <td>{issue.status}</td>
                             <td>{issue.description}</td>
                             <td className="image-column">
                                 {issue.images.map((img, i) => (
                                     <img className="issue-image" key={i} src={`http://localhost:5000${img}`} alt="Issue" width="50" />
                                 ))}
                             </td>
                             {issue.status === "Red Tag" ? (
                    <>
                        <td>{issue.isRedTagClosed === "Yes" ? "Closed ✅" : "Open ❌"}</td>
                        <td>{issue.isRedTagClosed === "Yes" ? issue.whoClosedRedTag : "N/A"}</td>
                        <td>{issue.isRedTagClosed === "Yes" ? issue.howRedTagClosed : "N/A"}</td>
                    </>
                ) : (
                    <>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </>
                )}
                             <td>
                                 <button className="delete-button" onClick={() => handleDelete(issue._id)}>Delete</button>
                             </td>
                         </tr>
                     ))
                 ) : (
                     <tr>
                         <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>No issues in the last 24 hours.</td>
                     </tr>
                 )}
             </tbody>
         </table>

         <button className="export-button" onClick={exportExcel}>Export to Excel</button>  
         </>
    );
}

export default Form;
