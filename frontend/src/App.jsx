import { useState } from 'react';
import Navbar from './Navbar.jsx';
import Login from './Login.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-semibold mb-4">Welcome to Project Collaborator</h1>
        <p className="mb-4">Please login or register to get started.</p>
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md">Login</button>
          <button className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md">Register</button>
        </div>
      </div>
    </>
  );
}

export default App;
