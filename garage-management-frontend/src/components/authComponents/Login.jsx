import React, { useContext, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import userContext from "@/context/user/userContext";
import { useNavigate } from "react-router-dom";
import loaderContext from '@/context/loader/loaderContext'

const Login = () => {
  const userCon = useContext(userContext)
  const loaderCon  = useContext(loaderContext)
  const { login } = userCon
  const { showToast, setLoader } = loaderCon
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate()
  const setValue = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    const res = await login(loginDetails.userName, loginDetails.password)
    if(res.success){
      localStorage.setItem('token',res.authtoken)
      navigate('/')
      showToast('Logged In','Logged in Successfully')
    }
    else{
      showToast('Error',res.err? res.err:res.error[0].msg,'destructive')
    }
    setLoader(false)
  };
  return (
    <div className="flex justify-center items-center absolute h-screen w-screen bg-white">
      <div className="min-w-96 p-10 justify-center shadow-2xl rounded-lg border-2 border-gray-50">
        <h1 className="font-sans text-4xl font-bold">Login</h1>
        <p className="font-sans text-sm font-thin mb-4">Login to Continue </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Label htmlFor="userName">User Name</Label>
          <Input
            type="text"
            id="userName"
            name="userName"
            placeholder="User Name"
            onChange={setValue}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={setValue}
          />
          <Button type="submit" className="mt-5">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
