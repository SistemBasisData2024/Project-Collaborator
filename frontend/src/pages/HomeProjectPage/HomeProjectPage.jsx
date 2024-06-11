import React, { useEffect, useState } from "react";
import "./HomeProjectPage.css";
import { Link } from "react-router-dom";
import { getAllOpenProject } from "../../lib/actions/projects.actions";
import { getAllAvailableCollaborators } from "../../lib/actions/users.actions";
import NavBar from "../../components/NavBar";
import ProfileBar from "../../components/ProfileBar";
import { checkUser } from "../../lib/utils";

export default function HomePage() {
  checkUser();
  const [projects, setProjects] = useState([]);

  const fetchProjectList = async () => {
    const response = await getAllOpenProject();
    
    console.log(response);
    if(response.success){
      setProjects(response.response.data);
    }
  }

  useEffect(() => {
    fetchProjectList();
  }, []);

  return (
    <div className='w-screen h-max bg-[#003049] overflow-hidden mx-auto my-0'>
      <NavBar login={false}/>

      <div className='w-[1140px] h-[620px] bg-[#d9d9d9] rounded-[25px] mt-[30px] mr-0 mb-20 ml-[150px] overflow-hidden flex flex-row'>
        <ProfileBar active={'HOME'}/>
        <div className="flex flex-col m-5 h-full">
          <div className='flex flex-row w-max h-fit bg-[#780000] rounded-[25px] px-8 space-x-1 py-2'>
            <span className="font-['Poppins'] rounded-3xl px-12 text-[20px] font-medium text-[#780000] bg-[#d9d9d9] text-left whitespace-nowrap">
              HIRE
            </span>
            <span className="font-['Poppins'] text-[20px] px-12 font-medium text-[#d9d9d9] text-left whitespace-nowrap">
              <Link to="/homes" className="highlight-text">OPEN TO WORK</Link>
            </span>
          </div>
          <div className="grid grid-cols-3 gap-6 h-max mt-6 overflow-y-auto mb-2 pb-4 overflow-hidden">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <Link to={`/project/${project.id}`} key={index} className='flex flex-col w-full h-[150px] bg-[#ffffff] rounded-[25px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] px-6 py-3'>
                  <span className="block font-bold font-['Poppins'] text-[20px] text-[#003049] text-left">
                    {project.project_name}
                  </span>
                  <span className="block font-['Poppins'] text-[13px] font-medium text-[#003049] text-left grow text-ellipsis overflow-hidden">
                    {project.description}
                  </span>
                  <span className="block font-['Poppins'] text-[13px] font-medium text-[#003049] text-left justify-self-end mt-2">
                    By: {project.user_name} [{project.email}]
                  </span>
                </Link>
              ))
            ) : (
              <span className="block font-['Poppins'] text-[13px] font-medium leading-[20px] text-[#003049] relative text-left whitespace-nowrap ml-2">
                No projects found
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
