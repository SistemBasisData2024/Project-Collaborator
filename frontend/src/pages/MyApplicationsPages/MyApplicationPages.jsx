import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyApplicationPages.css";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import ProfileBar from "../../components/ProfileBar";
import { getReceivedApplications } from "../../lib/actions/applications.actions";
import ApplicationReceived from "../../components/ApplicationReceived";
import { checkUser } from "../../lib/utils";

export default function MyApplicationPage() {
  checkUser();
  const [applications, setApplications] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve the logged-in user from local storage

  const fetchApplicationsList = async (id) => {
    const response = await getReceivedApplications(id);

    console.log(response.response);
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
    <div className='w-screen h-max bg-[#003049] overflow-hidden mx-auto my-0'>
      <NavBar login={false}/>
      <div className='w-[1140px] h-[620px] bg-[#d9d9d9] rounded-[25px] mt-[30px] mr-0 mb-20 ml-[150px] flex flex-row overflow-y-hidden'>
        <ProfileBar active={'APP'}/>
        <div className="flex flex-col ml-5 mt-5 mr-5 w-full">
          <div className='flex flex-row w-max h-fit bg-[#780000] rounded-[25px] px-8 space-x-1 py-2'>
            <span className="font-['Poppins'] text-[20px] px-12 font-medium text-[#d9d9d9] text-left whitespace-nowrap">
                <Link to="/myapp" className="highlight-text">SENT</Link>
            </span>
            <span className="font-['Poppins'] rounded-3xl px-12 text-[20px] font-medium text-[#780000] bg-[#d9d9d9] text-left whitespace-nowrap">
                RECEIVED
            </span>
          </div>
          <div className="flex flex-col space-y-5 mt-5 overflow-y-auto overflow-hidden mb-5">
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
    </div>
  );
}
