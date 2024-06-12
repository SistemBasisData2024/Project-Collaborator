import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import ProfileBar from "../../components/ProfileBar";
import { createProject, finishProjects, getUserProjects } from "../../lib/actions/projects.actions";
import { checkUser, dateFormatter } from "../../lib/utils";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Modal from "../../components/Modal";
import ProjectCard from "../../components/ProjectCard";

export default function MyProjectPage(){
  checkUser();

  const {user} = useUser(); 
  const [projectList, setProjectList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isSelected, setSelected] = useState(true);

  const fetchProjectList = async (id) => {
    const response = await getUserProjects(id);

    console.log(response);
    if(response.success){
      setProjectList(response.response.data);
    }
  }
  
  const handleCreateProject = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const dataJson = Object.fromEntries(formData.entries());
    const status = isSelected? 'OPEN' : 'CLOSED';

    const response = await createProject({name: dataJson.name, description: dataJson.description, owner_id: user.id, status: status});

    alert(response.response.message)
    if(response.success){
      window.location.reload();
    }
  }

  useEffect(() => {
    fetchProjectList(user.id);
  }, []);
  return(
    <div className='w-screen h-max bg-[#003049] overflow-hidden mx-auto my-0'>
      <NavBar login={false}/>
      <Modal isVisible={modal} onClose={() => setModal(false)}>
        <p className="text-xl font-semibold">Create Project Form</p>
        <form className='flex flex-col' onSubmit={handleCreateProject}>
            <label>Title</label>
            <input 
              type="text" 
              className="border-2 border-black py-1 px-2 mb-3" 
              placeholder="Title of the project" 
              name="name"/>
            <label>Description</label>
            <input 
              type="text"
              className="h-[200px] border-black border-2 py-1 px-2 mb-3 text-start"
              placeholder="Description of your project"
              name="description"/>
            <div className="flex flex-row items-center justify-between mb-3">
              <label>Open to collaborator : </label>
              <div
                onClick={(e) => setSelected(!isSelected)}
                className={`flex w-14 h-7 rounded-full transition-all duration-200 ${isSelected ?
                  'bg-green-500' : 'bg-gray-600' 
                }`}>
                <span className={`h-7 w-7 bg-white rounded-full transition-all duration-150 ${isSelected? 'ml-7' : ""}`}/>
              </div>
            </div>
            <button className="bg-green-500 px-7 py-1 text-white rounded-lg hover:scale-105 transition-all duration-75" type="submit">Create</button>
          </form>

      </Modal>
      <div className='w-[1140px] h-[620px] bg-[#d9d9d9] rounded-[25px] mt-[30px] mr-0 mb-20 ml-[150px] overflow-hidden flex flex-row'>
        <ProfileBar active={'PROJECT'}/>
        <div className="flex flex-col m-5 w-full justify-between">
          <div className="w-full overflow-y-auto overflow-hidden space-y-4">
            { projectList.map((project) => {
              return (
                <ProjectCard project={project} key={project.id}/>
              )
              })
            }
          </div>
          <button className="self-end bg-[#003049] px-8 py-2 text-white rounded-md" onClick={() => setModal(true)}>
            Add Project
          </button>
        </div>
      </div>
    </div>
  )
}