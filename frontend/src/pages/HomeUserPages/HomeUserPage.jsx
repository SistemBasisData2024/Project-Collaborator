import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomeUserPage.css";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import ProfileBar from "../../components/ProfileBar";
import { checkUser } from "../../lib/utils";
import { getAllAvailableCollaborators } from "../../lib/actions/users.actions";

export default function HomePages() {
  checkUser();
  
  const [collaborators, setCollaborators] = useState([]);

  const fetchCollaboratorsList = async () => {
    const response = await getAllAvailableCollaborators();

    console.log(response.response);
    if(response.success){
      setCollaborators(response.response.data);
    }
  }

  useEffect(() => {
    fetchCollaboratorsList();
  }, []);
  
  return (
    <div className='w-screen h-max bg-[#003049] overflow-hidden mx-auto my-0'>
      <NavBar login={false}/>
      <div className='w-[1140px] h-[620px] bg-[#d9d9d9] rounded-[25px] mt-[30px] mr-0 mb-20 ml-[150px] overflow-y-auto flex flex-row'>
        <ProfileBar active={'HOME'}/>
        <div className="flex flex-col m-5 w-full">
          <div className='flex flex-row w-max h-fit bg-[#780000] rounded-[25px] px-8 space-x-1 py-2'>
            <span className="font-['Poppins'] text-[20px] px-12 font-medium text-[#d9d9d9] text-left whitespace-nowrap">
              <Link to="/home" className="highlight-text">HIRE</Link>
            </span>
            <span className="font-['Poppins'] rounded-3xl px-12 text-[20px] font-medium text-[#780000] bg-[#d9d9d9] text-left whitespace-nowrap">
              <span className="highlight-text">OPEN TO WORK</span>
            </span>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-6 overflow-hidden overflow-y-auto mb-2 pb-4">
            {collaborators.length > 0 ? (
              collaborators.map((collaborator, index) => (
                <div key={index} className='w-full h-max bg-[#ffffff] rounded-[25px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] px-6 py-3'>
                  <span className="block font-bold font-['Poppins'] text-[20px] text-[#003049] text-left">
                    {collaborator.name}
                  </span>
                  <span className="block font-['Poppins'] text-[13px] font-medium text-[#003049] text-left">
                    {collaborator.email}
                  </span>
                  <span className="block font-['Poppins'] text-[13px] font-medium text-[#003049] text-left mt-[15px]">
                  {collaborator.bio}
                  </span>
                </div>
              ))
            ) : (
              <span className="block font-['Poppins'] text-[13px] font-medium leading-[20px] text-[#003049] relative text-left whitespace-nowrap ml-2">
                No collaborators found
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

