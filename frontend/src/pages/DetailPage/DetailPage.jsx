import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./DetailPage.css";
import NavBar from "../../components/NavBar";
import ProfileBar from "../../components/ProfileBar";

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
      <NavBar login={false} />
      <div className="w-[1140px] h-[590px] bg-[#d9d9d9] rounded-[25px] relative z-[11] mt-[30px] mb-[50px] mx-auto overflow-x-hidden overflow-y-auto p-6">
        <ProfileBar active={'HOME'} />
        <div className="project-card bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl detail-card ml-[300px]" >
          <h2 className="text-2xl font-bold mb-4">{projectDetail.name}</h2>
          <p className="mb-2"><strong>Description:</strong> {projectDetail.description}</p>
          <p className="mb-2"><strong>Status:</strong> {projectDetail.status}</p>
          <p className="mb-2"><strong>Progress:</strong> {projectDetail.progress}</p>
          <p className="mb-2"><strong>Started At:</strong> {new Date(projectDetail.started_at).toLocaleString()}</p>
          <p className="mb-2"><strong>Ended At:</strong> {projectDetail.ended_at ? new Date(projectDetail.ended_at).toLocaleString() : 'Not Ended Yet'}</p>
          <div className="owner-section mb-4">
            <h3 className="text-xl font-semibold">Owner:</h3>
            <ul>
              <li><strong>Name:</strong> {projectDetail.owner.name}</li>
              <li><strong>Email:</strong> {projectDetail.owner.email}</li>
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
            onChange={(e) => setRole(e.target.value)}/>
          <button className="apply-button" onClick={handleApply}>Apply</button>
        </div>
        </div>
      </div>
    </div>
  );
}