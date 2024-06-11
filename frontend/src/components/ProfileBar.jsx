import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function ProfileBar({active}){
  const {user}= useUser(); 

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
  }
  return (
    <div className='w-max h-full bg-[#780000] rounded-[25px] px-12 flex flex-row items-center'>
      <div>
        <div className="flex flex-row items-center justify-start">
          <span className="font-['Poppins'] text-2xl ml-6 leading-[48px] text-[#d9d9d9] text-left font-medium tracking-wide">
            Welcome, <b>{user.name} </b>
          </span>
        </div>
        <div className='w-full h-[5px] bg-[#d9d9d9] rounded-[50px] my-3' />
        <div className="flex flex-col space-y-2">
          {active == 'HOME'?
            <button className='w-[240px] h-fit flex flex-row bg-[#d9d9d9] rounded-3xl border-none relative items-center'>
              <span className="font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#780000] text-left whitespace-nowrap ml-12">
                <Link to="/home">Home</Link>
              </span>
            </button>
            :
            <span className="block font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] text-left whitespace-nowrap ml-12 hover:underline">
              <Link to="/home">Home</Link>
            </span>
          }
          { active =='APP' ?
            <button className='w-[240px] h-fit flex flex-row bg-[#d9d9d9] rounded-3xl border-none relative items-center'>
              <span className="font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#780000] text-left whitespace-nowrap ml-12">
                <Link to="/myapp">My Application</Link>
              </span>
            </button>
          :
            <span className="block font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] relative text-left whitespace-nowrap ml-12 hover:underline">
              <Link to="/myapp">My Application</Link>
            </span>
          }

          {
            active == 'PROJECT' ?
            <button className='w-[240px] h-fit flex flex-row bg-[#d9d9d9] rounded-3xl border-none relative items-center'>
              <span className="font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#780000] text-left whitespace-nowrap ml-12">
                <Link to="/myprojects">My Projects</Link>
              </span>
            </button>
            :
            <span className="block h-[48px] font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] relative text-left whitespace-nowrap ml-12 hover:underline">
              <Link to="/myprojects">My Projects</Link>
            </span>
          }

          {
            active == 'REVIEW' ?
            <button className='w-[240px] h-fit flex flex-row bg-[#d9d9d9] rounded-3xl border-none relative items-center'>
              <span className="font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#780000] text-left whitespace-nowrap ml-12">
                <Link to="/myreview">My Review</Link>
              </span>
            </button>
            :
            <span className="block h-[48px] font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] relative text-left whitespace-nowrap ml-12 hover:underline">
              <Link to="/myreview">My Review</Link>
            </span>
          }
        </div>
        <div className='w-full h-[5px] bg-[#d9d9d9] rounded-[50px] my-3' />
        <div className="flex flex-col space-y-1">
          { active == 'SETTING' ?
            <button className='w-[240px] h-fit flex flex-row bg-[#d9d9d9] rounded-3xl border-none relative items-center'>
              <span className="font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#780000] text-left whitespace-nowrap ml-12">
                <Link to="/setting">Profile Setting</Link>
              </span>
            </button>
            :
            <span className="block h-[48px] font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] relative text-left whitespace-nowrap ml-12 hover:underline">
              <Link to="/setting">Profile Setting</Link>
            </span>
          }
          <div className="flex flex-row items-center cursor-pointer group/logout" onClick={(e) => handleLogOut()}>
            <div className='w-max h-fit ml-3 mr-4'>
              <div className='w-[18.75px] h-[18.75px] bg-[url(../../assets/images/2ea19915-0de8-401f-a471-452d868b6f1e.png)] bg-[length:100%_100%] bg-no-repeat' />
            </div>
            <span className="font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] text-left whitespace-nowrap group-hover/logout:underline">
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}