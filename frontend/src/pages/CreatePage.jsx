import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreatePage.css";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("OPEN"); // Default status to 'OPEN'
    const [userId, setUserId] = useState(null); // Initialize userId state
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserId(user.id);
        }
    }, []); // Run only once on component mount

    const handleSubmit = async (e) => {
        e.preventDefault();
        const owner_id = userId; // Using userId from localStorage

        try {
            const response = await axios.post('http://localhost:3000/projects/', {
                name,
                description,
                owner_id,
                status
            });
            alert('Project created successfully');
            navigate('/home'); // Redirect to home or another page after successful creation
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Failed to create project');
        }
    };

    return (
        <div className="main-container w-[1440px] h-[869px] bg-[#003049] relative overflow-hidden mx-auto my-0">
            <div className="w-[1140px] h-[590px] bg-[#d9d9d9] rounded-[25px] relative z-[11] mt-[30px] mr-0 mb-0 ml-[150px] overflow-y-auto">
                <div className="form-container" style={{ padding: "20px", width: "70%", margin: "auto" }}>
                    <h2 className="font-['Poppins'] text-[24px] font-medium text-[#003049] mb-[20px]">Create a New Project</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
                        <div className="form-group">
                            <label htmlFor="name" className="font-['Poppins'] text-[18px] font-medium text-[#003049]">Project Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-[10px] rounded-[10px] border border-[#003049]"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="font-['Poppins'] text-[18px] font-medium text-[#003049]">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-[10px] rounded-[10px] border border-[#003049]"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status" className="font-['Poppins'] text-[18px] font-medium text-[#003049]">Status</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full p-[10px] rounded-[10px] border border-[#003049]"
                                required
                            >
                                <option value="OPEN">Open</option>
                                <option value="CLOSED">Closed</option>
                            </select>
                        </div>
                        <button type="submit" className="w-[200px] h-[60px] bg-[#780000] rounded-[25px] border-none text-[#d9d9d9] font-['Poppins'] text-[20px] font-medium leading-[48px] self-start">
                            Create Project
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
