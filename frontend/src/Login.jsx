import React from 'react';

const Login = () => {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form className="flex flex-col space-y-4 max-w-xs">
        <input type="email" placeholder="Email" className="border rounded-md p-2" />
        <input type="password" placeholder="Password" className="border rounded-md p-2" />
        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 rounded-md">Login</button>
      </form>
    </div>
  );
};

export default Login;
