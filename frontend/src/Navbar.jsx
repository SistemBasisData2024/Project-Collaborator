import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-semibold">Project Collaborator</div>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-white">Home</a></li>
          <li><a href="#" className="text-white">About</a></li>
          <li><a href="#" className="text-white">Contact</a></li>
          <li><a href="#" className="text-white">Login</a></li>
          <li><a href="#" className="text-white">Register</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
