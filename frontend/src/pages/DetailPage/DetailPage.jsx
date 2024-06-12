import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./DetailPage.css";
import NavBar from "../../components/NavBar";
import ProfileBar from "../../components/ProfileBar";
import { dateFormatter } from "../../lib/utils";
import { finishProjects, getProjectDetail } from "../../lib/actions/projects.actions";
import { makeApplications } from "../../lib/actions/applications.actions";
import { checkUser } from "../../lib/utils";
import Modal from "../../components/Modal";

export default function DetailPage() {
  checkUser();

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.id;
  const navigate = useNavigate();

  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const dataJson = Object.fromEntries(formData.entries());
    
    const response = await makeApplications({
      project_id: projectId,
      user_id: userId,
      role: dataJson.role,
      message: dataJson.message
    });
    if(response.success) {
      console.log('Application response:', response.data);
      alert('Application submitted successfully!');
      setModal(false);
    }
    else {
      console.error('Error submitting application:', error);
      alert('Failed to submit application');
    }
    
  };

  const handleFinishProject = async () => {
    const response = await finishProjects(projectId);

    alert(response.response.message);
    if(response.success){
      navigate('/myreview');
    }
  }

  const fetchProjectDetail = async (id) => {
    const response = await getProjectDetail(id);

    if(response.success){
      setProjectDetail(response.response.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjectDetail(projectId);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='w-screen h-max bg-[#003049] overflow-hidden mx-auto my-0'>
      <NavBar login={false} />
      <div className='w-[1140px] h-[620px] bg-[#d9d9d9] rounded-[25px] mt-[30px] mr-0 mb-20 ml-[150px] overflow-hidden flex flex-row'>
        <ProfileBar active={'HOME'} />
        <Modal isVisible={modal} onClose={() => setModal(false)}>
          <p className="text-xl font-semibold">Collaborators Application Form</p>
          <form className='flex flex-col' onSubmit={handleApply}>
            <label>Role</label>
            <input 
              type="text" 
              className="border-2 border-black py-1 px-2 mb-3" 
              placeholder="Enter role" 
              name="role"/>
            <label>Message</label>
            <input 
              type="text"
              className="h-[200px] border-black border-2 py-1 px-2 mb-3 text-start"
              placeholder="Write your message the owner."
              name="message"/>
            <button className="bg-green-500 px-7 py-1 text-white rounded-lg hover:scale-105 transition-all duration-75" type="submit">Apply</button>
          </form>
        </Modal>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full m-10 overflow-y-auto" >
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">{projectDetail.name}</h2>
              <p className="">{dateFormatter(new Date(projectDetail.started_at), '/')} - {projectDetail.ended_at ? dateFormatter(new Date(projectDetail.ended_at), '/') : 'Not Ended Yet'}</p>
            </div>
            { userId == projectDetail.owner.id ? 
              <button className="bg-red-800 px-7 text-white rounded-lg hover:scale-105 transition-all duration-75" onClick={() => handleFinishProject()}>
                End Project
              </button>
             :
              <button className="bg-green-500 px-7 text-white rounded-lg hover:scale-105 transition-all duration-75" onClick={() => setModal(true)}>
                Apply as Collaborator
              </button>
            }
          </div>
          <div className='w-full h-[5px] bg-[#003049] rounded-[50px] my-2' />
          <div className="mb-4">
            <h3 className="text-md font-semibold inline">Owner: </h3>
            <p className="inline">{projectDetail.owner.name} [{projectDetail.owner.email}]</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Collaborators:</h3>
            {projectDetail.collaborator.length > 0 ? (
              <ul className="list-disc">
                {projectDetail.collaborator.map((collab, index) => (
                  <li key={index} className="mb-1 ml-5">
                    {collab.name} - {collab.role} <br />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No collaborators yet.</p>
            )}
          </div>
          <p className="mb-2"><strong>Description:</strong> {projectDetail.description}</p>
        </div>
      </div>
    </div>
  );
}