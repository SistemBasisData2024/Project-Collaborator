import { Link } from "react-router-dom";
import { cancelSentApplications } from "../lib/actions/applications.actions";

export default function ApplicationSent({ application }) {
  const handleCancel = async (applicationId) => {
      const response = await cancelSentApplications(applicationId);

      if(response.success){
        alert('Application canceled successfully');
        window.location.reload();
      }
      else {
        alert('Error canceling application:', response.response.message);
      }
    } 

  return (
    <div className="flex flex-col bg-white w-full rounded-3xl p-5">
      <div className="flex flex-row justify-between items-center">
        <Link to={`/project/${application.project.id}`} className="text-xl font-semibold text-[#003049] hover:underline">{application.project.name}</Link>
        {application.status != 'PENDING' ?
          <p className="text-xl text-[#003049] font-bold">{application.status}</p>
          :
          <button
            onClick={() => handleCancel(application.id)}
            className="bg-[#c1121f] text-[#ffffff] py-2 px-4 rounded-md hover:scale-105 transition-all duration-75">
            Cancel Application
          </button>
        }
      </div>
      <div className='w-full h-[5px] bg-[#003049] rounded-[50px] my-2' />
      <p className="text-lg text-[#003049]">Applied as <b>{application.role}</b></p>
      <p className="text-lg text-[#003049]">Description : {application.project.description}</p>
    </div>
  )
}