import React, { useState } from 'react';
import './RegisterPage.css';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Registration successful');
      navigate('/login');
    } else {
      alert(`Registration failed: ${data.message}`);
    }
  };

  return (
    <div className='main-container w-[1440px] h-[869px] bg-[#003049] relative overflow-hidden mx-auto my-0'>
      <div className='w-[1440px] h-[182px] relative z-[2] mt-[14px] mr-0 mb-0 ml-0'>
      <Link to="/" className='w-[9.72%] h-[84.07%] absolute top-[8.24%] left-[11.04%]'>
          <div className='w-full h-full bg-[url(../assets/images/c62414c9-a926-4ce1-992a-a6b625e93bc4.png)] bg-[length:100%_100%] bg-no-repeat' />
        </Link>
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
      <div className='w-[920px] h-[488px] bg-[#d9d9d9] rounded-[50px] relative z-[11] mt-[67px] mr-0 mb-0 ml-[260px]'>
        <div className='w-[51.63%] h-full bg-[#c1121f] rounded-[50px] absolute top-0 left-0 z-[16]'>
          <span className="flex w-[427px] h-[43.03%] justify-start items-start font-['Poppins'] text-[50px] font-medium leading-[66px] text-[#fdf0d5] tracking-[1px] absolute top-[8.61%] left-[6.53%] text-left z-[16]">
            Hello, welcome to
            <br />
            ProjectPals!
          </span>
        </div>
        <form className='w-[37.93%] h-[78.07%] absolute top-[8.61%] left-[57.28%] z-20' onSubmit={handleRegister}>
          <input 
            type="text" 
            className='input-field' 
            placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input 
            type="email" 
            className='input-field mt-[57px]' 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            className='input-field mt-[57px]' 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className='w-[189.131px] h-[36px] bg-[#780000] border-none relative z-20 pointer mt-[57px] mr-0 mb-0 ml-0'>
            <div className='w-[189px] h-[36px] bg-[#c1121f] rounded-[2px] relative z-[21] mt-0 mr-0 mb-0 ml-0'>
              <span className="flex h-[26px] justify-center items-start font-['Poppins'] text-[20px] font-medium leading-[26px] text-[#fdf0d5] absolute top-[calc(50%-13px)] left-0 right-0 text-center whitespace-nowrap z-[22]">
                SIGN UP
              </span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
