import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyApplicationPage.css";
import { Link } from "react-router-dom";

export default function MyApplicationPage() {
    const [applications, setApplications] = useState([]);
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve the logged-in user from local storage

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:3000/applications/user/${user.id}`)
                .then(response => {
                    setApplications(response.data.data);
                })
                .catch(error => console.error('Error fetching applications:', error));
        }
    }, [user]);

    const handleCancel = async (applicationId) => {
        try {
            await axios.delete(`http://localhost:3000/applications/${applicationId}`);
            setApplications(applications.filter(application => application.id !== applicationId));
            alert('Application canceled successfully');
        } catch (error) {
            console.error('Error canceling application:', error);
            alert('Failed to cancel application');
        }
    };

    if (!user) {
        return <p>User is not logged in.</p>;
    }

    return (
        <div className='main-container w-[1440px] h-[869px] bg-[#003049] relative overflow-hidden mx-auto my-0'>
            <div className='w-[1440px] h-[182px] relative z-[2] mt-[14px] mr-0 mb-0 ml-0'>
                <div className='w-[9.72%] h-[84.07%] bg-[url(../assets/images/d7d12c51-19ae-4e4e-ba14-13785a892303.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[8.24%] left-[11.04%]' />
                <button className='w-[13.13%] h-[19.78%] bg-[#780000] border-none absolute top-[37.91%] left-[77.43%] z-[8] pointer'>
                    <div className='w-[189px] h-[36px] bg-[#c1121f] rounded-[2px] relative z-[9] mt-0 mr-0 mb-0 ml-0'>
                        <span className="flex h-[26px] justify-center items-start font-['Poppins'] text-[20px] font-medium leading-[26px] text-[#fff] absolute top-[calc(50%-13px)] left-0 right-0 text-center whitespace-nowrap z-10">
                            JOIN NOW
                        </span>
                    </div>
                </button>
                <span className="flex h-[15.93%] justify-start items-start font-['Poppins'] text-[20px] font-semibold leading-[24px] text-[#fdf0d5] absolute top-[41.76%] left-[60.9%] text-left whitespace-nowrap z-[7]">
                    OPEN TO WORK
                </span>
                <span className="flex h-[15.93%] justify-start items-start font-['Poppins'] text-[20px] font-semibold leading-[24px] text-[#fdf0d5] absolute top-[41.76%] left-[47.22%] text-left whitespace-nowrap z-[4]">
                    ABOUT
                </span>
                <span className="flex h-[15.93%] justify-start items-start font-['Poppins'] text-[20px] font-semibold leading-[24px] text-[#fdf0d5] absolute top-[41.76%] left-[54.93%] text-left whitespace-nowrap z-[6]">
                    HIRE
                </span>
            </div>
            <div className='w-[1140px] h-[590px] bg-[#d9d9d9] rounded-[25px] relative z-[11] mt-[30px] mr-0 mb-0 ml-[150px] overflow-y-auto'>
                <div className='w-[26.32%] h-[100.17%] bg-[#780000] rounded-[25px] absolute top-[-0.17%] left-0 z-[12]'>
                    <div className='w-[240px] h-[5px] bg-[#d9d9d9] rounded-[50px] relative z-[19] mt-[135px] mr-0 mb-0 ml-[30px]' />
                    <span className="block h-[48px] font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] relative text-left whitespace-nowrap z-40 mt-[5px] mr-0 mb-0 ml-[92px]">
                        <Link to="/home" className="highlight-text">Home</Link>
                    </span>
                    <button className='w-[240px] h-[60px] bg-[#d9d9d9] rounded-[25px] border-none relative z-[24] pointer mt-[10px] mr-0 mb-0 ml-[30px]'>
                        <span className="flex h-4/5 justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#780000] absolute top-[10%] left-[25.83%] text-left whitespace-nowrap z-[29]">
                            My Application
                        </span>
                    </button>
                    <span className="block h-[48px] font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] relative text-left whitespace-nowrap z-40 mt-[11px] mr-0 mb-0 ml-[92px]">
                        My Projects
                    </span>
                    <span className="block h-[48px] font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] relative text-left whitespace-nowrap z-40 mt-[11px] mr-0 mb-0 ml-[92px]">
                        My Review
                    </span>
                    <div className='w-[240px] h-[5px] bg-[#d9d9d9] rounded-[50px] relative z-20 mt-[11px] mr-0 mb-0 ml-[30px]' />
                    <span className="flex h-[8.12%] justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] absolute top-[12.86%] left-[30.67%] text-left whitespace-nowrap z-40">
                        Profile
                    </span>
                    <div className='w-[9%] h-[4.57%] bg-[#fff] rounded-[999px] absolute top-[14.55%] left-[15%] overflow-hidden z-[60]'>
                        <div className='w-[120%] h-[120%] absolute top-[-4%] left-[-9%] overflow-hidden z-[63]'>
                            <div className='w-[25.672px] h-[25.03px] bg-[url(../assets/images/ccc0e21e-7d4b-40c4-b4d0-eccf160228a4.png)] bg-[length:100%_100%] bg-no-repeat relative z-[64] mt-[4.327px] mr-0 mb-0 ml-[3.24px]' />
                        </div>
                        <div className='w-full h-full absolute top-0 left-0 z-[61]'>
                            <div className='w-full h-full bg-[url(../assets/images/e2be9fb0-8273-4532-8edb-8e2b945dcd82.png)] bg-[length:100%_100%] bg-no-repeat rounded-[50%] absolute top-0 left-0 z-[62]' />
                        </div>
                    </div>
                    <span className="flex h-[8.12%] justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] absolute top-[69.04%] left-[30.67%] text-left whitespace-nowrap z-40">
                        Profile Setting
                    </span>
                    <div className='w-[10%] h-[5.08%] bg-[url(../assets/images/64821f1b-1e15-409a-9b04-ea93d55f133a.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[70.73%] left-[12.33%] z-[21]' />
                    <span className="flex h-[8.12%] justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] absolute top-[79.02%] left-[30.67%] text-left whitespace-nowrap z-40">
                        <Link to="/" className="highlight-text">Logout</Link>
                    </span>
                    <div className='w-[10%] h-[5.08%] absolute top-[80.54%] left-[11%] overflow-hidden z-[22]'>
                        <div className='w-[18.75px] h-[18.75px] bg-[url(../assets/images/2ea19915-0de8-401f-a471-452d868b6f1e.png)] bg-[length:100%_100%] bg-no-repeat relative z-[23] mt-[5.625px] mr-0 mb-0 ml-[5.625px]' />
                    </div>
                </div>
                <div className='w-[38.16%] h-[9.49%] bg-[#780000] rounded-[25px] absolute top-[2.54%] left-[27.63%] z-30'>
                    <span className="flex h-[85.71%] justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] absolute top-[7.14%] left-[68.16%] text-left whitespace-nowrap z-40">
                        <Link to="/myapps" className="highlight-text">Received</Link>
                    </span>
                    <span className="flex h-[85.71%] justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#780000] absolute top-[7.14%] left-[21.61%] text-left whitespace-nowrap z-40">
                        Sent
                    </span>
                    <button className='w-[46.67%] h-[53.57%] bg-[#d9d9d9] rounded-[25px] border-none absolute top-1/4 left-[3.45%] z-[31] pointer' />
                </div>
                <div className="projects-container" style={{ width: "100%", height: "100%", overflowY: "auto", padding: "20px 40px 50px 20px" }}>
                    {applications.length > 0 ? (
                        applications.map((application) => (
                            <div key={application.id} className="application-card w-[calc(60%-10px)] bg-[#fff] rounded-[15px] p-[20px] mb-[50px] shadow-md relative" style={{ margin: "80px 300px" }}>
                                <h2 className="text-[24px] font-semibold text-[#780000] mb-[10px]">{application.project.name}</h2>
                                <p className="text-[16px] text-[#333] mb-[10px]">Status: {application.status}</p>
                                <button
                                    onClick={() => handleCancel(application.id)}
                                    className="cancel-button bg-[#c1121f] text-[#fff] py-[10px] px-[10px] rounded-[5px] mt-[10px] absolute bottom-[20px] right-[20px]"
                                >
                                    Cancel Application
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No applications found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
