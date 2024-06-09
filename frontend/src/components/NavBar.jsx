import { Link } from "react-router-dom";

export default function NavBar({ login }) {
  return (
    <div className='w-[1440px] h-[182px] relative z-[2] mt-[14px] mr-0 mb-0 ml-0'>
      <div className='w-[9.72%] h-[84.07%] bg-[url(../../assets/images/d7d12c51-19ae-4e4e-ba14-13785a892303.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[8.24%] left-[11.04%]' />
      { login ? 
        <button className='w-[13.13%] h-[19.78%] bg-[#780000] border-none absolute top-[37.91%] left-[77.43%] z-[8] pointer'>
          <Link to='/login' className='w-[189px] h-[36px] bg-[#c1121f] rounded-[2px] relative z-[9] mt-0 mr-0 mb-0 ml-0'>
            <span className="flex h-[26px] justify-center items-start font-['Poppins'] text-[20px] font-medium leading-[26px] text-[#fff] absolute top-[calc(50%-13px)] left-0 right-0 text-center whitespace-nowrap z-10">
              JOIN NOW
            </span>
          </Link>
        </button> : 
      <></>}
      
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
  )
}