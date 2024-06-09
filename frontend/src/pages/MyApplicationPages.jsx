import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyApplicationPages.css";
import { Link } from "react-router-dom";

export default function MyApplicationPage() {
    const [applications, setApplications] = useState([]);
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve the logged-in user from local storage

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:3000/applications/owner/${user.id}`)
                .then(response => {
                    setApplications(response.data.data);
                })
                .catch(error => console.error('Error fetching applications:', error));
        }
    }, [user]);

    const handleAccept = async (applicationId) => {
        try {
            await axios.put(`http://localhost:3000/applications/${applicationId}/accept`);
            setApplications(applications.map(app => 
                app.id === applicationId ? { ...app, status: 'ACCEPTED' } : app
            ));
            alert('Application accepted successfully');
        } catch (error) {
            console.error('Error accepting application:', error);
            alert('Failed to accept application');
        }
    };

    const handleDeny = async (applicationId) => {
        try {
            await axios.put(`http://localhost:3000/applications/${applicationId}/reject`);
            setApplications(applications.map(app => 
                app.id === applicationId ? { ...app, status: 'REJECTED' } : app
            ));
            alert('Application denied successfully');
        } catch (error) {
            console.error('Error denying application:', error);
            alert('Failed to deny application');
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
                    <div className='w-[10.5%] h-[5.36%] absolute top-[70.68%] left-[14.5%] overflow-hidden z-[50]'>
                        <div className='w-[120%] h-[120%] absolute top-[-10%] left-[-11%] overflow-hidden z-[53]'>
                            <div className='w-[34.02px] h-[33.27px] bg-[url(../assets/images/5b29ec94-cf87-4bb2-9a4b-898d059f2d66.png)] bg-[length:100%_100%] bg-no-repeat relative z-[54] mt-[2.015px] mr-0 mb-0 ml-[2.97px]' />
                        </div>
                        <div className='w-full h-full absolute top-0 left-0 z-[51]'>
                            <div className='w-full h-full bg-[url(../assets/images/791ca684-0199-4d30-bc29-07a74d7c1b6c.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[52]' />
                        </div>
                    </div>
                    <span className="flex h-[8.12%] justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] absolute top-[85.88%] left-[30.67%] text-left whitespace-nowrap z-40">
                        Logout
                    </span>
                    <div className='w-[8.5%] h-[4.42%] absolute top-[87.32%] left-[15.5%] overflow-hidden z-[30]'>
                        <div className='w-[120%] h-[120%] absolute top-[-10%] left-[-11%] overflow-hidden z-[33]'>
                            <div className='w-[27.4px] h-[27.23px] bg-[url(../assets/images/b22f7c2b-1983-4dbf-bb6d-2951e5c5f7b4.png)] bg-[length:100%_100%] bg-no-repeat relative z-[34] mt-[2.015px] mr-0 mb-0 ml-[2.97px]' />
                        </div>
                        <div className='w-full h-full absolute top-0 left-0 z-[31]'>
                            <div className='w-full h-full bg-[url(../assets/images/2b03276b-36d8-4da3-90a0-5b6cd9d2e345.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[32]' />
                        </div>
                    </div>
                </div>
                <div className="ml-[250px] mt-[50px] mr-[50px]">
                    {applications.length === 0 ? (
                        <p>No applications found.</p>
                    ) : (
                        applications.map(application => (
                            <div key={application.id} className="application-card">
                                <h3>{application.title}</h3>
                                <p>Status: {application.status}</p>
                                <button onClick={() => handleAccept(application.id)} className="accept-btn">Accept</button>
                                <button onClick={() => handleDeny(application.id)} className="deny-btn">Deny</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
