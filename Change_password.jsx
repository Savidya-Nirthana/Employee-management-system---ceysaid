import React from 'react'
import '../Styles/ChangePassword.css'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

export default function Change_password() {
  
  const [currentPassword,setcurrent] = useState('');
  const [newPassword,setnew] = useState('');
  const [confirmPassword,setconfirm] = useState('');
  const [message,setMessage] = useState({});

  
  const Handle_Submit = (e) => {
    e.preventDefault();

    if( currentPassword == newPassword){

      setMessage({message:'Invalid Input',error:true});
      
    }
    else{

      if( newPassword !== confirmPassword){
        
        setMessage({message:'Re-Enter new password',error:true});
      }
      else{

        if(isValidPassword(newPassword)){
          setMessage({message:'Update Successfully!',error:false});
        }
        else{
          setMessage({message:'Try another Password!',error:true})
        }
      }
        
    }
    
    if(message.error){
      toast.error(message.message);
    }
    else{
      toast(message.message);
    }
   
  }

  const isValidPassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    return minLength && hasUppercase && hasSymbol;
  }
  
  
  
  return (
    <div>
      <div>
        <ToastContainer />
      </div>
      <h2>Change Password</h2>
        <form onSubmit={Handle_Submit}>
        <div className="container">
      <div>
        <label>Current Password </label>:
        <input
          type="password"
          onChange = {(e) => {setcurrent(e.target.value)}} 
          required
        />
      </div>
      <div>
        <label>New Password </label>:
        <input
          type="password"
          onChange = {(e) => {setnew(e.target.value)}}
          required
        />
      </div>
      <div>
        <label>Confirm Password </label>:
        <input
          type="password"
          onChange = {(e) => {setconfirm(e.target.value)}}
          required
        />
      </div>
      <div className="ChangeButton">
        <button type="submit">Change Password</button>
      </div>
      </div>
        </form>
    </div>
  )
}
 