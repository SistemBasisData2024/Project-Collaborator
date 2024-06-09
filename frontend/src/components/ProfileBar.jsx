import { Link } from "react-router-dom";

export default function ProfileBar({active}){
  return (
    <div className='w-[26.32%] h-[100.17%] bg-[#780000] rounded-[25px] absolute top-[-0.17%] left-0 z-[12]'>
      <div className='w-[240px] h-[5px] bg-[#d9d9d9] rounded-[50px] relative z-[19] mt-[135px] mr-0 mb-0 ml-[30px]' />
      {active == 'HOME'?
        <button className='w-[240px] h-[60px] bg-[#d9d9d9] rounded-[25px] border-none relative z-[24] pointer mt-[10px] mr-0 mb-0 ml-[30px]'>
          <span className="flex h-4/5 justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#780000] absolute top-[10%] left-[25.83%] text-left whitespace-nowrap z-[29]">
            Home
          </span>
          <div className='w-[10.21%] h-[45.97%] bg-[url(../../assets/images/8c7e1d1f-becb-49b0-92ef-e6f1245bf4df.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[26.91%] left-[4.06%] z-[27]'>
            <div className='w-[7.5px] h-[10px] rounded-[1px] border-solid border-2 border-[#780000] relative z-[28] mt-[16.352px] mr-0 mb-0 ml-[8.5px]' />
            </div>
        </button>
        :
        <span className="block h-[48px] font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] relative text-left whitespace-nowrap z-40 mt-[5px] mr-0 mb-0 ml-[92px]">
          <Link to="/home" className="highlight-text">Home</Link>
        </span>
      }
      { active =='APP' ?
        <button className='w-[240px] h-[60px] bg-[#d9d9d9] rounded-[25px] border-none relative z-[24] pointer mt-[10px] mr-0 mb-0 ml-[30px]'>
          <span className="flex h-4/5 justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#780000] absolute top-[10%] left-[25.83%] text-left whitespace-nowrap z-[29]">
            My Application
          </span>
        </button>
      :
        <span className="block h-[48px] font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] relative text-left whitespace-nowrap z-40 mt-[5px] mr-0 mb-0 ml-[92px]">
          <Link to="/myapp" className="highlight-text">My Application</Link>
        </span>
      }
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
          <div className='w-[25.672px] h-[25.03px] bg-[url(../../assets/images/ccc0e21e-7d4b-40c4-b4d0-eccf160228a4.png)] bg-[length:100%_100%] bg-no-repeat relative z-[64] mt-[4.327px] mr-0 mb-0 ml-[3.24px]' />
        </div>
        <div className='w-full h-full absolute top-0 left-0 z-[61]'>
          <div className='w-full h-full bg-[url(../../assets/images/e2be9fb0-8273-4532-8edb-8e2b945dcd82.png)] bg-[length:100%_100%] bg-no-repeat rounded-[50%] absolute top-0 left-0 z-[62]' />
        </div>
      </div>
      <span className="flex h-[8.12%] justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] absolute top-[69.04%] left-[30.67%] text-left whitespace-nowrap z-40">
        Profile Setting
      </span>
      <div className='w-[10%] h-[5.08%] bg-[url(../../assets/images/64821f1b-1e15-409a-9b04-ea93d55f133a.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[70.73%] left-[12.33%] z-[21]' />
      <span className="flex h-[8.12%] justify-start items-start font-['Poppins'] text-[20px] font-medium leading-[48px] text-[#d9d9d9] absolute top-[79.02%] left-[30.67%] text-left whitespace-nowrap z-40">
        <Link to="/" className="highlight-text">Logout</Link>
      </span>
      <div className='w-[10%] h-[5.08%] absolute top-[80.54%] left-[11%] overflow-hidden z-[22]'>
        <div className='w-[18.75px] h-[18.75px] bg-[url(../../assets/images/2ea19915-0de8-401f-a471-452d868b6f1e.png)] bg-[length:100%_100%] bg-no-repeat relative z-[23] mt-[5.625px] mr-0 mb-0 ml-[5.625px]' />
      </div>
    </div>
  )
}