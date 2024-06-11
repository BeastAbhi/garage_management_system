import React, { useState } from 'react'
import UserContext from './userContext'

function UserState(props) {
  const host = import.meta.env.REACT_APP_HOST_LINK;
  const [user, setUser] = useState({})
  const authToken = localStorage.getItem("token");

  //Login 
  const login = async (userName, password) =>{
    //api call
    const response = await fetch(`${host}/api/auth/login`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userName, password})
    });
    return(await response.json())
  }

  //Sign up
  const signup = async (userName, phoneNo, password, name) =>{
    //api call
    const response = await fetch(`${host}/api/auth/signup`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userName, phoneNo, password, name})
    })
    return(await response.json())
  }

  //Delete an user
  const deleteUser = async () =>{
    //api call
    const response = await fetch(`${host}/api/auth/deleteuser`,{
      method: 'DELETE',
      headers:{
        "Content-Type": "application/json",
        "auth-token": authToken
      }
    });
    return(await response.json())
  }

  //Update an user
  const updateUser = async (name, userName, phoneNO) =>{
    //api call
    const response = await fetch(`${host}/api/auth/updateuser`,{
      method: 'PUT',
      headers:{
        "Content-Type": "application/json",
        "auth-token": authToken
      },
      body: JSON.stringify({name, userName, phoneNO})
    })
    setUser(await response.json())
  }
  
  //Change password of an user
  const changePass = async (oldPassword, newPassword) =>{
    //api call
    const response = await fetch(`${host}/api/auth/changepassword`,{
      method: 'PUT',
      headers:{
        "Content-Type": "application/json",
        "auth-token": authToken
      },
      body: JSON.stringify({oldPassword, newPassword})
    })
    setUser(await response.json())
  }

  const getUser = async () =>{
    const response = await fetch(`${host}/api/auth/getuser`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "auth-token": authToken
        }
    });
    setUser(await response.json())
  }

  return (
    <UserContext.Provider
    value={{user, login, signup, deleteUser, updateUser, changePass, getUser }}
    >
      {/* this line is compersory for using context api */}
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState