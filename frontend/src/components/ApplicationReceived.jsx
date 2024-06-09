import { acceptReceviedApplications, denyReceivedApplications } from "../lib/actions/applications.actions";


export default function ApplicationReceived({application}) {
  const handleAccept = async (applicationId) => {
    const response = await acceptReceviedApplications(applicationId);

    if(response.success){
      alert('Application canceled successfully');
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
      alert('Error accepting application:', response.response.message);
    }
  };
  
  return (
    <div className="application-card">
      <h3 className="text-[24px] font-semibold text-[#780000] mb-[10px]">{application.project.name}</h3>
      <p>User: {application.user.name}</p>
      <p>Email: {application.user.email}</p>
      <p>Role: {application.role}</p>
      <p>Status: {application.status}</p>
      {application.status == 'PENDING' ?
        <>
          <button onClick={() => handleDeny(application.id)} className="deny-btn">Reject</button>
          <button onClick={() => handleAccept(application.id)} className="accept-btn">Accept</button>
        </>
        :
        <></>
      }
    </div>
  )
}