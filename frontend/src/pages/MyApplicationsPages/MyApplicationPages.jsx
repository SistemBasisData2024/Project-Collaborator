import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyApplicationPages.css";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import ProfileBar from "../../components/ProfileBar";
import { getReceivedApplications } from "../../lib/actions/applications.actions";
import ApplicationReceived from "../../components/ApplicationReceived";

export default function MyApplicationPage() {
    const [applications, setApplications] = useState([]);
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve the logged-in user from local storage

    const fetchApplicationsList = async (id) => {
      const response = await getReceivedApplications(id);

      if(response.success){
        setApplications(response.response.data);
      }
    }
    
    useEffect(() => {
      fetchApplicationsList(user.id);
    }, []);    

    if (!user) {
        return <p>User is not logged in.</p>;
    }

  return (
    <div className='main-container w-[1440px] h-[869px] bg-[#003049] relative overflow-hidden mx-auto my-0'>
      <NavBar login={false}/>
      <div className='w-[1140px] h-[590px] bg-[#d9d9d9] rounded-[25px] relative z-[11] mt-[30px] mr-0 mb-0 ml-[150px] overflow-y-auto'>
        <ProfileBar active={'APP'}/>
        <div className='w-[38.16%] h-[9.49%] bg-[#780000] rounded-[25px] absolute top-[2.54%] left-[27.63%] z-30'>
          <span className="flex h-[85.71%] justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] absolute top-[7.14%] left-[68.16%] text-left whitespace-nowrap z-40">
              <Link to="/myapp" className="highlight-text">Sent</Link>
          </span>
          <span className="flex h-[85.71%] justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#780000] absolute top-[7.14%] left-[17.81%] text-left whitespace-nowrap z-40">
              Received
          </span>
          <button className='w-[46.67%] h-[53.57%] bg-[#d9d9d9] rounded-[25px] border-none absolute top-1/4 left-[3.45%] z-[31] pointer' />
        </div>
        <div className="ml-[250px] mt-[50px] mr-[50px]">
          {applications.length === 0 ? (
              <p>No applications found.</p>
          ) : (
            applications.map(application => (
              <ApplicationReceived application={application} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
