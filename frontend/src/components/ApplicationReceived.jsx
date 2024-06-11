import { Link } from "react-router-dom";
import { acceptReceviedApplications, denyReceivedApplications } from "../lib/actions/applications.actions";


export default function ApplicationReceived({application}) {
  const handleAccept = async (applicationId) => {
    const response = await acceptReceviedApplications(applicationId);
    
    if(response.success){
      alert('Application accepted successfully');
      window.location.reload();
    }
    else {
      alert('Error accepting application:', response.response.message);
    }
  };

  const handleDeny = async (applicationId) => {
    const response = await denyReceivedApplications(applicationId);

    if(response.success){
      alert('Application canceled successfully');
      window.location.reload();
    }
    else {
      alert('Error canceling application:', response.response.message);
    }
  };
  
  return (
    <div className="flex flex-col bg-white w-full rounded-3xl p-5">
      <div className="flex flex-row justify-between items-center">
        <Link to={`/project/${application.project.id}`} className="text-[24px] font-semibold text-[#003049] hover:underline">{application.project.name}</Link>
        {application.status == 'PENDING' ?
        <div className="flex flex-row justify-between space-x-4 items-center">
          <button onClick={() => handleDeny(application.id)} className="px-8 py-1 bg-[#003049] text-white rounded-xl hover:scale-105 transition-all duration-75">Reject</button>
          <button onClick={() => handleAccept(application.id)} className="px-8 py-1 bg-[#003049] text-white rounded-xl hover:scale-105 transition-all duration-75">Accept</button>
        </div>
        :
        <>
          <p>{application.status}</p>
        </>
      }
      </div>
      <div className='w-full h-[5px] bg-[#003049] rounded-[50px] my-2' />
      <p>User: {application.user.name}</p>
      <p>Email: {application.user.email}</p>
      <p>Role: {application.role}</p>
      <p>Message : {application.message}</p>
    </div>
  )
}