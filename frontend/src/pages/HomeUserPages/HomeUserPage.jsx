import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomeUserPage.css";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import ProfileBar from "../../components/ProfileBar";

export default function HomePages() {
  const [collaborators, setCollaborators] = useState([]);

  const fetchCollaboratorsList = async () => {
    const response = await getAllAvailableCollaborators();

    console.log(response);
    if(response.success){
      setCollaborators(response.response.data);
    }
  }

  useEffect(() => {
    fetchCollaboratorsList();
  }, []);
  
  return (
    <div className='main-container w-[1440px] h-[869px] bg-[#003049] relative overflow-hidden mx-auto my-0'>
      <NavBar login={false}/>
      <div className='w-[1140px] h-[590px] bg-[#d9d9d9] rounded-[25px] relative z-[11] mt-[30px] mr-0 mb-0 ml-[150px] overflow-y-auto'>
        <ProfileBar active={'HOME'}/>
        <div className='w-[38.16%] h-[9.49%] bg-[#780000] rounded-[25px] absolute top-[2.54%] left-[27.63%] z-30'>
          <span className="flex h-[85.71%] justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#780000] absolute top-[7.14%] left-[11.61%] text-left whitespace-nowrap z-40">
            <span className="highlight-text">OPEN TO WORK</span>
          </span>
          <span className="flex h-[85.71%] justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] absolute top-[7.14%] left-[68.16%] text-left whitespace-nowrap z-40">
            <Link to="/home" className="highlight-text">HIRE</Link>
          </span>
          <button className='w-[46.67%] h-[53.57%] bg-[#d9d9d9] rounded-[25px] border-none absolute top-1/4 left-[3.45%] z-[31] pointer' />
        </div>
        <div className="collaborators-container" style={{ width: "62%", height: "100%", overflowY: "auto" }}>
          {collaborators.length > 0 ? (
            collaborators.map((collaborator, index) => (
              <div key={index} className='w-[22.19%] h-[200px] text-[0px] bg-[#fff] rounded-[25px] absolute shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]' style={{ left: `${27.63 + (index % 3) * 25}%`, top: `${16.78 + Math.floor(index / 3) * 40}%` }}>
                <span className="block h-[48px] font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#003049] relative text-left whitespace-nowrap z-40 mt-[20px] mr-0 mb-0 ml-[30px]">
                  {collaborator.name}
                </span>
                <span className="block h-[20px] font-['Poppins'] text-[13px] font-medium leading-[20px] text-[#003049] relative text-left whitespace-nowrap z-40 mt-[5px] mr-0 mb-0 ml-[30px]">
                  {collaborator.email}
                </span>
                <span className="block h-[20px] font-['Poppins'] text-[13px] font-medium leading-[20px] text-[#003049] relative text-left whitespace-nowrap z-40 mt-[5px] mr-0 mb-0 ml-[30px]">
                {collaborator.bio}
                </span>
              </div>
            ))
          ) : (
            <span className="block h-[20px] font-['Poppins'] text-[13px] font-medium leading-[20px] text-[#003049] relative text-left whitespace-nowrap z-40 mt-[20px] mr-0 mb-0 ml-[30px]">
              No collaborators found
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

