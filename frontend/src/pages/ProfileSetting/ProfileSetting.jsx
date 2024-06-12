import { useState } from "react";
import NavBar from "../../components/NavBar";
import ProfileBar from "../../components/ProfileBar";
import { useUser } from "../../contexts/UserContext";
import Modal from "../../components/Modal";
import { updateProfileInfo } from "../../lib/actions/users.actions";

export default function ProfileSetting(){
  const { user , setUser } = useUser();

  if(user == null) {
    window.location.replace('/');
  }

  const [profileModal, setProfileModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const [isSelected, setSelected] = useState(user.open_to_work);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const dataJson = Object.fromEntries(formData.entries());

    if(dataJson.confirm != user.password) {
      alert('Password is wrong');
      return;
    }

    const response = await updateProfileInfo( 
      {name: dataJson.name, bio: dataJson.bio, profile_pic: null, open_to_work: isSelected},
      user.id
    );

    if(response.success){
      alert('Succesfully update user');
      setUser(response.response.data);
      setProfileModal(false);
    }
    else {
      alert(response.response.message);
    }
  }

  const handleLoginUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const dataJson = Object.fromEntries(formData.entries());

    if(dataJson.confirm != user.password) {
      alert('Password is wrong');
      return;
    }
  }

  return(
    <div className='w-screen h-max bg-[#003049] overflow-hidden mx-auto my-0'>
      <NavBar login={false}/>
      <div className='w-[1140px] h-[620px] bg-[#d9d9d9] rounded-[25px] mt-[30px] mr-0 mb-20 ml-[150px] overflow-hidden flex flex-row'>
        <ProfileBar active={'SETTING'}/>
        <Modal isVisible={profileModal} onClose={() => setProfileModal(false)}>
          <p className="text-xl font-semibold">Update Profile Form</p>
          <form className='flex flex-col space-y-2' onSubmit={handleProfileUpdate}>
            <div className="grid grid-cols-6">
              <label>Username : </label>
              <input 
                type="text" 
                className="border-b-2 border-black col-span-5" 
                value={user.name} 
                placeholder="Username"
                name="name"
                required/>
            </div>
            <div className="grid grid-cols-6">
              <label>Bio :</label>
              <input 
                type="text"
                className="border-black border-b-2 col-span-5"
                value={user.bio ? user.bio : "No bio yet."}
                placeholder="User Bio"
                name="bio"
                required/>
            </div>
            <div className="grid grid-cols-6">
              <label className="col-span-3">Open to collaborator : </label>
              <div
                onClick={(e) => setSelected(!isSelected)}
                className={`flex w-14 h-7 rounded-full col-start-7 transition-all duration-200 ${isSelected ?
                  'bg-green-500' : 'bg-gray-600' 
                }`}>
                <span className={`h-7 w-7 bg-white rounded-full transition-all duration-150 ${isSelected? 'ml-7' : ""}`}/>
              </div>
            </div>
            <div className='w-full h-[5px] bg-[#780000] rounded-[50px] my-10'/>
            <div className="flex flex-row mt-10">
              <label>Password to Confirm :</label>
              <input
                type="password"
                className="border-black border-b-2 col-span-5 ml-2 grow"
                name="confirm"
                placeholder="********"
                required/>
            </div>
            <button className="bg-green-500 px-7 py-1 text-white rounded-lg hover:scale-105 transition-all duration-75" type="submit">Update</button>
          </form>
        </Modal>
        <Modal isVisible={loginModal} onClose={() => setLoginModal(false)}>
          <p className="text-xl font-semibold">Update Login Form</p>
          <form className='flex flex-col space-y-2' onSubmit={handleLoginUpdate}>
            <div className="grid grid-cols-6">
              <label>Email : </label>
              <input 
                type="text" 
                className="border-b-2 border-black col-span-5" 
                placeholder={user.email} 
                name="name"
                required/>
            </div>
            <div className="grid grid-cols-6">
              <label>Password :</label>
              <input 
                type="text"
                className="border-black border-b-2 col-span-5"
                placeholder="********"
                name="bio"
                required/>
            </div>
            <div className='w-full h-[5px] bg-[#780000] rounded-[50px] my-10'/>
            <div className="flex flex-row mt-10">
              <label>Password to Confirm :</label>
              <input
                type="password"
                className="border-black border-b-2 col-span-5 ml-2 grow"
                name="confirm"
                placeholder="********"
                required/>
            </div>
            <button className="bg-green-500 px-7 py-1 text-white rounded-lg hover:scale-105 transition-all duration-75" type="submit">Update</button>
          </form>
        </Modal>
        <div className="flex flex-col m-5 w-full overflow-y-auto bg-white p-5 rounded-3xl">
            <p className="text-3xl font-bold font-['Poppins'] tracking-wide">User Info</p>
            <div className='w-full h-[5px] bg-[#003049] rounded-[50px] my-2' />
            <p>Email : {user.email}</p>
            <p>Username : {user.name}</p>
            <p>Biograph : {user.bio ? user.bio : 'No bio yet.'}</p>
            <p>Open To Request : {user.open_to_work ? "Yes" : "No"}</p>
            <div className="flex flex-row justify-center items-center space-x-4 mt-5">
              <button className="bg-[#003049] px-4 py-1 text-white rounded-xl hover:scale-105 duration-75 transition-all" onClick={(e) => setLoginModal(true)}>Update Login Information</button>
              <button className="bg-[#003049] px-4 py-1 text-white rounded-xl hover:scale-105 duration-75 transition-all" onClick={(e) => setProfileModal(true)}>Update Profile Information</button>
            </div>
        </div>          
      </div>
    </div>
  )
}