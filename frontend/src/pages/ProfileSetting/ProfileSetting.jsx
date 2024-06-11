import NavBar from "../../components/NavBar";
import ProfileBar from "../../components/ProfileBar";
import { useUser } from "../../contexts/UserContext";

export default function ProfileSetting(){
  const { user } = useUser();

  if(user == null) {
    window.location.replace('/');
  }

  console.log(user);
  return(
    <div className='w-screen h-max bg-[#003049] overflow-hidden mx-auto my-0'>
      <NavBar login={false}/>
      <div className='w-[1140px] h-[620px] bg-[#d9d9d9] rounded-[25px] mt-[30px] mr-0 mb-20 ml-[150px] overflow-hidden flex flex-row'>
        <ProfileBar active={'SETTING'}/>
        <div className="flex flex-col m-5 w-full overflow-y-auto bg-white p-5 rounded-3xl">
            <p className="text-3xl font-bold font-['Poppins'] tracking-wide">User Info</p>
            <p>Email : {user.email}</p>
            <p>Username : {user.name}</p>
            <p>Bio : {user.bio ? user.bio : 'No bio yet.'}</p>
            <p>Open To Request : {user.open_to_work ? "Yes" : "No"}</p>
        </div>          
      </div>
    </div>
  )
}