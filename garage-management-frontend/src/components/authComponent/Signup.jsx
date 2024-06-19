import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import userContext from "@/context/user/userContext";
import { useNavigate } from "react-router-dom";
import loaderContext from '@/context/loader/loaderContext'

const Signup = () => {
    const userCon = useContext(userContext)
    const loaderCon  = useContext(loaderContext)
    const { signup } = userCon
    const { showToast, setLoader } = loaderCon
    const [signUpDetails, setSignUpDetails] = useState({name:"", password:"",CPassword:"",phoneNo:"",userName:""})
    const navigate = useNavigate()
    const setValue = (e) => {
        setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
    };
    const handelSubmit = async (e) => {
      e.preventDefault();
      setLoader(true)
      if(signUpDetails.password === signUpDetails.CPassword){
          const res = await signup(signUpDetails.userName, signUpDetails.phoneNo, signUpDetails.password, signUpDetails.name)
          if(res.success){
            localStorage.setItem('token',res.authtoken)
            navigate('/')
            showToast('Logged In','Logged in successfully')
          }
          else{
            showToast('Error',res.err? res.err: res.error[0].msg,'destructive')
          }
      }
      else{
        showToast('Error',"Password Does Not Match",'destructive')
      }
      setLoader(false)
    };
  return (
    <div className="flex justify-center items-center absolute h-screen w-screen bg-white">
      <div className="min-w-96 p-10 justify-center shadow-2xl rounded-lg border-2 border-gray-50">
        <h1 className="font-sans text-4xl font-bold">Sign Up</h1>
        <p className="font-sans text-sm font-thin mb-4">Sign Up to Continue </p>
        <form onSubmit={handelSubmit} className="flex flex-col gap-2">
          <Label htmlFor="userName">User Name</Label>
          <Input
            type="text"
            id="userName"
            name="userName"
            placeholder="User Name"
            onChange={setValue}
          />
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onChange={setValue}
          />
          <Label htmlFor="phno">Phone Number</Label>
          <Input
            type="text"
            id="phno"
            name="phoneNo"
            placeholder="Phone Number"
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
          <Label htmlFor="CPassword">Confirm Password</Label>
          <Input
            type="password"
            id="CPassword"
            name="CPassword"
            placeholder="Confirm Password"
            onChange={setValue}
          />
          <Button type="submit" className="mt-5">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
