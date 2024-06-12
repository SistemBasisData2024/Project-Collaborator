import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyApplicationPage.css";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import ProfileBar from "../../components/ProfileBar";
import { getSentApplications } from "../../lib/actions/applications.actions";
import ApplicationSent from "../../components/ApplicationSent";
import { checkUser } from "../../lib/utils";
import { useUser } from "../../contexts/UserContext";

export default function MyApplicationPage() {
  checkUser();

  const { user }= useUser();// Retrieve the logged-in user from local storage
  const [applications, setApplications] = useState([]);

  const fetchApplicationsList = async (id) => {
    const response = await getSentApplications(id);

    if(response.success){
      setApplications(response.response.data);
    }
  }
  useEffect(() => {
    fetchApplicationsList(user.id)
  }, []);

  if (!user) {
    return <p>User is not logged in.</p>;
  }

  return (
    <div className='w-screen h-max bg-[#003049] overflow-hidden mx-auto my-0'>
      <NavBar login={false}/>
      <div className='w-[1140px] h-[620px] bg-[#d9d9d9] rounded-[25px] mt-[30px] mr-0 mb-20 ml-[150px] overflow-y-auto flex flex-row'>
        <ProfileBar active={'APP'}/>
        <div className="flex flex-col ml-5 mt-5 mr-5 w-full">
          <div className='flex flex-row w-max h-fit bg-[#780000] rounded-[25px] px-8 space-x-1 py-2'>
            <span className="font-['Poppins'] rounded-3xl px-12 text-[20px] font-medium text-[#780000] bg-[#d9d9d9] text-left whitespace-nowrap">
              SENT
            </span>
            <span className="font-['Poppins'] text-[20px] px-12 font-medium text-[#d9d9d9] text-left whitespace-nowrap">
              <Link to="/myapps" className="highlight-text">RECEIVED</Link>
            </span>
          </div>
          <div className="flex flex-col space-y-5 mt-5">
            {applications.length > 0 ? (
              applications.map((application) => (
                <ApplicationSent application={application} />
              ))
            ) : (
              <p className="text-black">No applications found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
