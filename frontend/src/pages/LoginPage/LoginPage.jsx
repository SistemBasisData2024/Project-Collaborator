import React from 'react';
import './LoginPage.css';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { login } from '../../lib/actions/users.actions';
import { useUser } from '../../contexts/UserContext';

export default function Main() {
  const navigate = useNavigate();
  const {user, setUser} = useUser();

  if(user != null) {
    window.location.replace('/home');
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const dataJson = Object.fromEntries(formData.entries());

    const response = await login({ email: dataJson.email, password: dataJson.password });

    if (response.success) {
      console.log(response.response.data);
      setUser(response.response.data);
      // localStorage.setItem('user', JSON.stringify(response.response.data)); // Save user data to local storage
      navigate('/home'); // Redirect to homepage after login
    } else {
      alert(`Login failed: ${response.response.message}`);
    }
  };
  
  return (
    <div className='main-container w-[1440px] h-[869px] bg-[#003049] relative overflow-hidden mx-auto my-0'>
      <NavBar/>
      <div className='w-[920px] h-[488px] bg-[#d9d9d9] rounded-[50px] relative z-[11] mt-[67px] mr-0 mb-0 ml-[260px]'>
        <div className='w-[51.63%] h-full bg-[#c1121f] rounded-[50px] absolute top-0 left-0 z-[15]'>
          <span className="flex w-[414px] h-[40.57%] justify-start items-start font-['Poppins'] text-[50px] font-medium leading-[66px] text-[#fdf0d5] tracking-[1px] absolute top-[8.61%] left-[6.53%] text-left z-[15]">
            Hello, welcome back to ProjectPals!
          </span>
        </div>
        <form className='w-[37.93%] h-[78.07%] absolute top-[8.61%] left-[57.28%] z-[18]' onSubmit={handleLogin}>
          <input 
            type="email" 
            className='input-field' 
            placeholder="Email Address"
            name='email'
            required
          />
          <input 
            type="password" 
            className='input-field mt-[57px]' 
            placeholder="Password" 
            name='password'
            required
          />
          <button type="submit" className='w-[189.131px] h-[36px] bg-[#780000] border-none relative z-[18] pointer mt-[172px] mr-0 mb-0 ml-0'>
            <div className='w-[189px] h-[36px] bg-[#c1121f] rounded-[2px] relative z-[19] mt-0 mr-0 mb-0 ml-0'>
              <span className="flex h-[26px] justify-center items-start font-['Poppins'] text-[20px] font-medium leading-[26px] text-[#fdf0d5] absolute top-[calc(50%-13px)] left-0 right-0 text-center whitespace-nowrap z-20">
                LOGIN
              </span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
