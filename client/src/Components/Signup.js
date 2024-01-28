
import React, {useRef, useState} from 'react'
import { Link } from 'react-router-dom';

function Signup() {
    let firstNameRef=useRef();
  let lastNameRef=useRef();
  let ageRef=useRef();
  let emailRef=useRef();
  let passwordRef=useRef();
  let profilepicRef=useRef();
  let [profilePicPath,setProfilePicPath]=useState("./Images/no-image.png");

  // let sendDataToServerThruJSON=async()=>{
  //   let dataToSend={
  //     firstName:firstNameRef.current.value,
  //     lastName:lastNameRef.current.value,
  //     age:ageRef.current.value,
  //     email:emailRef.current.value,
  //     password:passwordRef.current.value,
  //     profilepic:profilepicRef.current.value,
  //   };
  //   // Converting JS object to JSON
  //   let dataToSendInJSON=JSON.stringify(dataToSend);

  //   let myHeader=new Headers();
  //   myHeader.append("content-type","application/json")

  //   let reqOption={
  //     method:"Post",
  //     body:dataToSendInJSON,
  //     headers:myHeader,
  //   };
  //   let JSONData=await fetch("http://localhost:1234/signup",reqOption);
  //   // Converting JSON to JS
  //   let JSOData= await JSONData.json();
  //   console.log(JSOData);
  // }
  // let sendDataToServerThruUrlEncoded= async()=>{
  //   let dataToSend=new URLSearchParams();
  //   dataToSend.append("firstName",firstNameRef.current.value);
  //   dataToSend.append("lastName",lastNameRef.current.value);
  //   dataToSend.append("age",ageRef.current.value);
  //   dataToSend.append("email",emailRef.current.value);
  //   dataToSend.append("password",passwordRef.current.value);
  //   dataToSend.append("profilepic",profilepicRef.current.value);

  //    let myHeader=new Headers();
  //    myHeader.append("content-type","application/x-www-form-urlencoded");
  //   let reqOption={
  //     method:"Post",
  //     body:dataToSend,
  //     headers:myHeader
  //   };
  //   let JSONData=await fetch("http://localhost:1234/signup",reqOption);
  //   let JSOData= await JSONData.json();
  //   console.log(JSOData);
  // }
  let sendDataToServerThruFormData= async()=>{
    let dataToSend=new FormData();
    dataToSend.append("firstName",firstNameRef.current.value);
    dataToSend.append("lastName",lastNameRef.current.value);
    dataToSend.append("age",ageRef.current.value);
    dataToSend.append("email",emailRef.current.value);
    dataToSend.append("password",passwordRef.current.value);
    for(let i=0;i<profilepicRef.current.files.length;i++){
      dataToSend.append("profilepic",profilepicRef.current.files[i]);
    }
    let reqOption={
      method:"Post",
      body:dataToSend
    };
    let JSONData=await fetch("http://localhost:1234/signup",reqOption);
    let JSOData= await JSONData.json();
    if (JSOData.status=="Success") {
      alert(JSOData.msg);
    } else {
      alert(JSOData.msg);
    }
    console.log(JSOData);
  }
  return (
    <div className='App'>
      <form>
        <h3>Sign Up Form</h3>
        <div>
          <label>First Name</label>
          <input ref={firstNameRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input type='password' ref={passwordRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input ref={profilepicRef} type='file' onChange={(eveObj)=>{
            let selectedImagePath=URL.createObjectURL(eveObj.target.files[0]);
            setProfilePicPath(selectedImagePath);
          }}></input>
        </div>
        <div>
          <img className='profilepic' src={profilePicPath}></img>
        </div>
        {/* <button type='button'onClick={()=>{
          sendDataToServerThruJSON();
        }}>Sign Up with JSON</button>
        <button type='button'onClick={()=>{
          sendDataToServerThruUrlEncoded();
        }}>Sign Up with URLEncoded</button> */}
        <button type='button' onClick={()=>{
         sendDataToServerThruFormData();
        }}>Sign Up</button>
      </form>
      <div>
        <Link to="/">Login</Link>
      </div>
    </div>
  )
}

export default Signup