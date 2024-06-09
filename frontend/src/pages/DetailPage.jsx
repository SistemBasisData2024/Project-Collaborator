import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./DetailPage.css";

export default function DetailPage() {
    const { projectId } = useParams();
    const [projectDetail, setProjectDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState(""); // New state for role input

    useEffect(() => {
        axios.get(`http://localhost:3000/projects/${projectId}`)
            .then(response => {
                console.log('API response:', response.data);
                setProjectDetail(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching project detail:', error);
                setError('Error fetching project details');
                setLoading(false);
            });
    }, [projectId]);

    useEffect(() => {
        console.log('projectDetail state:', projectDetail);
    }, [projectDetail]);

    const handleApply = async () => {
        const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data from local storage
        const userId = user ? user.id : null;

        if (!userId) {
            alert('User is not logged in.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/applications', {
                project_id: projectId,
                user_id: userId,
                role: role
            });
            console.log('Application response:', response.data);
            alert('Application submitted successfully!');
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit application');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="main-container w-full h-full bg-[#003049] relative overflow-hidden mx-auto my-0">
            <div className="w-full h-[182px] relative z-[2] mt-[14px]">
                <div className="w-[9.72%] h-[84.07%] bg-[url(../assets/images/d7d12c51-19ae-4e4e-ba14-13785a892303.png)] bg-cover absolute top-[8.24%] left-[11.04%]" />
                <button className="w-[13.13%] h-[19.78%] bg-[#780000] border-none absolute top-[37.91%] left-[77.43%] z-[8] cursor-pointer">
                    <div className="w-[189px] h-[36px] bg-[#c1121f] rounded-[2px] relative z-[9]">
                        <span className="flex h-[26px] justify-center items-start font-['Poppins'] text-[20px] font-medium leading-[26px] text-[#fff] absolute top-[calc(50%-13px)] left-0 right-0 text-center whitespace-nowrap z-10">
                            JOIN NOW
                        </span>
                    </div>
                </button>
                <span className="flex h-[15.93%] justify-start items-start font-['Poppins'] text-[20px] font-semibold leading-[24px] text-[#fdf0d5] absolute top-[41.76%] left-[60.9%] text-left whitespace-nowrap z-[7]">
                    OPEN TO WORK
                </span>
                <span className="flex h-[15.93%] justify-start items-start font-['Poppins'] text-[20px] font-semibold leading-[24px] text-[#fdf0d5] absolute top-[41.76%] left-[47.22%] text-left whitespace-nowrap z-[4]">
                    ABOUT
                </span>
                <span className="flex h-[15.93%] justify-start items-start font-['Poppins'] text-[20px] font-semibold leading-[24px] text-[#fdf0d5] absolute top-[41.76%] left-[54.93%] text-left whitespace-nowrap z-[6]">
                    HIRE
                </span>
            </div>
            <div className="w-[1140px] h-[590px] bg-[#d9d9d9] rounded-[25px] relative z-[11] mt-[30px] mx-auto overflow-y-auto p-6">
                <div className="w-[26.32%] h-full bg-[#780000] rounded-[25px] absolute top-0 left-0 z-[12] p-6">
                    <div className="w-[240px] h-[5px] bg-[#d9d9d9] rounded-[50px] mt-[135px] mx-auto" />
                    <button className="w-[240px] h-[60px] bg-[#d9d9d9] rounded-[25px] border-none mt-[10px] mx-auto cursor-pointer">
                        <span className="flex h-4/5 justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#780000] mx-auto text-left">
                            <Link to="/home" className="highlight-text">Home</Link>
                        </span>
                    </button>
                    <span className="block h-[48px] font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] mt-[5px] mx-auto text-left">
                        My Application
                    </span>
                    <span className="block h-[48px] font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] mt-[11px] mx-auto text-left">
                        My Projects
                    </span>
                    <span className="block h-[48px] font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] mt-[11px] mx-auto text-left">
                        My Review
                    </span>
                    <div className="w-[240px] h-[5px] bg-[#d9d9d9] rounded-[50px] mt-[11px] mx-auto" />
                    <span className="flex h-[8.12%] justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] absolute top-[12.86%] left-[30.67%] text-left">
                        Profile
                    </span>
                    <div className="w-[9%] h-[4.57%] bg-[#fff] rounded-[999px] absolute top-[14.55%] left-[15%] overflow-hidden z-[60]">
                        <div className="w-[120%] h-[120%] absolute top-[-4%] left-[-9%] overflow-hidden z-[63]">
                            <div className="w-[25.672px] h-[25.03px] bg-[url(../assets/images/ccc0e21e-7d4b-40c4-b4d0-eccf160228a4.png)] bg-cover relative z-[64] mt-[4.327px] mx-auto" />
                        </div>
                        <div className="w-full h-full absolute top-0 left-0 z-[61]">
                            <div className="w-full h-full bg-[url(../assets/images/e2be9fb0-8273-4532-8edb-8e2b945dcd82.png)] bg-cover rounded-[50%] absolute top-0 left-0 z-[62]" />
                        </div>
                    </div>
                    <span className="flex h-[8.12%] justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] absolute top-[79.02%] left-[30.67%] text-left">
                        <Link to="/" className="highlight-text">Logout</Link>
                    </span>
                    <div className="w-[10%] h-[5.08%] absolute top-[80.54%] left-[11%] overflow-hidden z-[22]">
                        <div className="w-[18.75px] h-[18.75px] bg-[url(../assets/images/2ea19915-0de8-401f-a471-452d868b6f1e.png)] bg-cover relative z-[23] mt-[5.625px] mx-auto" />
                    </div>
                </div>
                <div className="project-card bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto detail-card">
                    <h2 className="text-2xl font-bold mb-4">{projectDetail.name}</h2>
                    <p className="mb-2"><strong>Description:</strong> {projectDetail.description}</p>
                    <p className="mb-2"><strong>Status:</strong> {projectDetail.status}</p>
                    <p className="mb-2"><strong>Progress:</strong> {projectDetail.progress}%</p>
                    <p className="mb-2"><strong>Started At:</strong> {new Date(projectDetail.started_at).toLocaleString()}</p>
                    <p className="mb-2"><strong>Ended At:</strong> {projectDetail.ended_at ? new Date(projectDetail.ended_at).toLocaleString() : 'Not Ended Yet'}</p>
                    <div className="owner-section mb-4">
                        <h3 className="text-xl font-semibold">Owner:</h3>
                        <ul>
                            <li><strong>ID:</strong> {projectDetail.owner.id}</li>
                            <li><strong>Name:</strong> {projectDetail.owner.name}</li>
                            <li><strong>Email:</strong> {projectDetail.owner.email}</li>
                            <li><strong>Profile Pic:</strong> {projectDetail.owner.profile_pic ? <img src={projectDetail.owner.profile_pic} alt="Profile" className="w-16 h-16 rounded-full" /> : 'Not Available'}</li>
                        </ul>
                    </div>
                    <div className="collaborators-section mb-4">
                        <h3 className="text-xl font-semibold">Collaborators:</h3>
                        {projectDetail.collaborator.length > 0 ? (
                            <ul>
                                {projectDetail.collaborator.map((collab, index) => (
                                    <li key={index} className="mb-2">
                                        <strong>Name:</strong> {collab.name} <br />
                                        <strong>Role:</strong> {collab.role} <br />
                                        {collab.profile_pic && <img src={collab.profile_pic} alt="Collaborator Profile" className="w-10 h-10 rounded-full" />}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No collaborators found.</p>
                        )}
                    </div>
                    <div className="apply-section">
                    <input 
                    type="text" 
                    className="role-input" 
                    placeholder="Enter role" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                />
                <button className="apply-button" onClick={handleApply}>Apply</button>
            </div>
                </div>
            </div>
        </div>
    );
}
