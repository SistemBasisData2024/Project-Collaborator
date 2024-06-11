import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import ProfileBar from "../../components/ProfileBar";
import { getUserProjects } from "../../lib/actions/projects.actions";
import { checkUser, dateFormatter } from "../../lib/utils";
import { Link } from "react-router-dom";

export default function MyProjectPage(){
  checkUser();

  const user = JSON.parse(localStorage.getItem('user'));
  const [projectList, setProjectList] = useState([]);
  const [modal, setModal] = useState(false);

  const fetchProjectList = async (id) => {
    const response = await getUserProjects(id);

    console.log(response);
    if(response.success){
      setProjectList(response.response.data);
    }
  }

  useEffect(() => {
    fetchProjectList(user.id);
  }, []);
  return(
    <div className='w-screen h-max bg-[#003049] overflow-hidden mx-auto my-0'>
      <NavBar login={false}/>
      <div className='w-[1140px] h-[620px] bg-[#d9d9d9] rounded-[25px] mt-[30px] mr-0 mb-20 ml-[150px] overflow-hidden flex flex-row'>
        <ProfileBar active={'PROJECT'}/>
        <div className="flex flex-col m-5 space-y-4 w-full overflow-y-auto">
          { projectList.map((project) => {
            return (
              <div className="w-full p-5 bg-white rounded-3xl" key={project.id}>
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <Link to={`/project/${project.id}`} className="text-xl font-bold text-[#003049] hover:underline">{project.name}</Link>
                    <p>{dateFormatter(new Date(project.started_at), '/')} - {project.ended_at ? dateFormatter(new Date(project.ended_at), '/') : 'Not Ended Yet'}</p>
                  </div>
                  <button className="bg-[#003049] text-white px-8 py-1 rounded-xl hover:scale-105 transition-all duration-75">Edit</button>
                </div>
                <div className='w-full h-[5px] bg-[#003049] rounded-[50px] my-2' />
                <p>Status : {project.status}</p>
                <p>Progress : {project.progress}</p>
                <p>Description : {project.description}</p>
              </div>
            )})
          }
        </div>
      </div>
    </div>
  )
}