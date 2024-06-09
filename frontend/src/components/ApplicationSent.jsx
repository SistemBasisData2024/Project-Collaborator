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
    <div className="application-card w-[calc(60%-10px)] bg-[#fff] rounded-[15px] p-[20px] mb-[50px] shadow-md relative" style={{ margin: "80px 300px" }}>
      <h2 className="text-[24px] font-semibold text-[#780000] mb-[10px]">{application.project.name}</h2>
      <p className="text-[16px] text-[#333] mb-[10px]">Status: {application.status}</p>
      {application.status != 'PENDING' ?
        <></>
        :
        <button
          onClick={() => handleCancel(application.id)}
          className="cancel-button bg-[#c1121f] text-[#fff] py-[10px] px-[10px] rounded-[5px] mt-[10px] absolute bottom-[20px] right-[20px]">
          Cancel Application
        </button>
      }
    </div>
  )
}