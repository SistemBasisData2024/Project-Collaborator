import { Link, useNavigate } from "react-router-dom";
import { dateFormatter } from "../lib/utils";
import { finishProjects, updateProjects } from "../lib/actions/projects.actions";
import Modal from "./Modal";
import { useState } from "react";

export default function ProjectCard({project}) {
  const projectStatus = project.status == 'OPEN' ? true : false;
  const [modal, setModal] = useState(false);
  const [isSelected, setSelected] = useState(projectStatusy
    
  );
  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description);

  const navigate = useNavigate();
  const handleFinishProject = async (id) => {
    const response = await finishProjects(id);

    alert(response.response.message);
    if(response.success){
      navigate('/myreview');
    }
  }

  const handleEditProject = async (e) => {
    e.preventDefault();
    
    const status = isSelected ? 'OPEN' : 'CLOSED';
    const response = await updateProjects(project.id, {name: name, description: description, status: status});

    alert(response.response.message);
    if(response.success){
      window.location.reload();
    }
  }
  return(
    <>
      <Modal isVisible={modal} onClose={() => {
        setName(project.name);
        setSelected(projectStatus)
        setDescription(project.description);
        setModal(false);
      }}>
        <p className="text-xl font-semibold">Projects Edit Form</p>
        <form className="flex flex-col space-y-3" onSubmit={handleEditProject}>
          <div className="flex flex-col">
            <label>Title</label>
            <input 
              type="text" 
              className="border-2 border-black py-1 px-2 mb-3" 
              placeholder="Project Title"
              value={name}
              onChange={(e) => setName(e.value)}/>
          </div>
          <div className="flex flex-col">
            <label>Description</label>
            <input 
              type="text"
              className="h-[200px] border-black border-2 py-1 px-2 mb-3 text-start"
              placeholder='Project Description'
              value={description}
              onChange={(e) => setDescription(e.value)}/>
          </div>
          <div className="flex flex-row items-center justify-between">
            <label>Open to collaborator : </label>
            <div
              onClick={(e) => setSelected(!isSelected)}
              className={`flex w-14 h-7 rounded-full transition-all duration-200 ${isSelected ?
                'bg-green-500' : 'bg-gray-600' 
              }`}>
              <span className={`h-7 w-7 bg-white rounded-full transition-all duration-150 ${isSelected? 'ml-7' : ""}`}/>
            </div>
          </div>
          <button className="bg-green-500 px-7 py-1 text-white rounded-lg hover:scale-105 transition-all duration-75" type="submit">Apply</button>
        </form>
      </Modal>
      <div className="w-full p-5 bg-white rounded-3xl">
        <div className="flex flex-row items-center justify-between">
          <div>
            <Link to={`/project/${project.id}`} className="text-xl font-bold text-[#003049] hover:underline">{project.name}</Link>
            <p>{dateFormatter(new Date(project.started_at), '/')} - {project.ended_at ? dateFormatter(new Date(project.ended_at), '/') : 'Not Ended Yet'}</p>
          </div>
          <div className="flex flex-row space-x-2">
            <button className="bg-[#003049] text-white px-8 py-1 rounded-md hover:scale-105 transition-all duration-75" onClick={() => setModal(true)}>
              Edit
            </button>
            <button className="bg-red-800 px-8 py-1 text-white rounded-md hover:scale-105 transition-all duration-75" onClick={() => handleFinishProject(project.id)}>
              End Project
            </button>
          </div>
        </div>
        <div className='w-full h-[5px] bg-[#003049] rounded-[50px] my-2' />
        <p>Status : {project.status}</p>
        <p>Progress : {project.progress}</p>
        <p>Description : {project.description}</p>
      </div>   
    </>
  )
}