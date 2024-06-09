import { Link } from "react-router-dom";

export default async function ProjectCard({project, index}){
  console.log(project);
  console.log(index);

  return (
    <Link to={`/detail/${project.id}`} className='w-[22.19%] h-[200px] text-[0px] bg-[#fff] rounded-[25px] absolute shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]' style={{ left: `${27.63 + (index % 3) * 25}%`, top: `${16.78 + Math.floor(index / 3) * 40}%` }}>
      <span className="block font-bold h-[48px] font-['Poppins'] text-[20px] leading-[48px] text-[#003049] relative text-left whitespace-nowrap z-40 mt-[20px] mr-0 mb-0 ml-[30px]">
        {project.project_name}
      </span>
      <span className="block h-[20px] font-['Poppins'] text-[13px] font-medium leading-[20px] text-[#003049] relative text-left whitespace-nowrap z-40 mt-[5px] mr-0 mb-0 ml-[30px]">
        {project.description}
      </span>
      <span className="block h-[20px] font-['Poppins'] text-[13px] font-medium leading-[20px] text-[#003049] relative text-left whitespace-nowrap z-40 mt-[5px] mr-0 mb-0 ml-[30px]">
        Owner: {project.user_name} [{project.email}]
      </span>
    </Link>
  )
}