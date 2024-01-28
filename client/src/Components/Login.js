
import React, {useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  let dispatch=useDispatch();
    let navigate= useNavigate();
    let emailRef=useRef();
    let passwordRef=useRef();

    useEffect(()=>{
      emailRef.current.value=localStorage.getItem("email");
      passwordRef.current.value=localStorage.getItem("password");
      if (localStorage.getItem("token")) {
        validateLoginonLoad();
      }
    },[])
    let validateLoginonLoad= async()=>{
      let dataToSend=new FormData();
      
      dataToSend.append("token",localStorage.getItem("token"));
      // dataToSend.append("password",localStorage.getItem("password"));
      let reqOption={
          method:"Post",
          body:dataToSend
        };
        let JSONData=await fetch("http://localhost:1234/validateToken",reqOption);
        let JSOData= await JSONData.json();
        console.log(JSOData);
        if (JSOData.status=="failure") {
          alert(JSOData.msg);
        }else{
          dispatch({type:"login",data:JSOData.data});
          navigate("/Home");
        }     
  }
    // let sendloginDataToServerThruFormData= async()=>{
    //     let dataToSend=new FormData();
        
    //     dataToSend.append("email",emailRef.current.value);
    //     dataToSend.append("password",passwordRef.current.value);
    //     let reqOption={
    //         method:"Post",
    //         body:dataToSend
    //       };
    //       let JSONData=await fetch("http://localhost:1234/login",reqOption);
    //       let JSOData= await JSONData.json();
    //       console.log(JSOData);
    //       if (JSOData.status=="failure") {
    //         alert(JSOData.msg);
            
    //       }else{
    //         // localStorage.setItem("email",emailRef.current.value);
    //         // localStorage.setItem("password",passwordRef.current.value);
    //         localStorage.setItem("token",JSOData.data.token);
    //         dispatch({type:"login",data:JSOData.data});
    //         navigate("/Home");
    //       }     
    // }

    let validateLogin=()=>{
       return async()=>{
        let dataToSend=new FormData();
        
        dataToSend.append("email",emailRef.current.value);
        dataToSend.append("password",passwordRef.current.value);
        let reqOption={
            method:"Post",
            body:dataToSend
          };
          let JSONData=await fetch("http://localhost:1234/login",reqOption);
          let JSOData= await JSONData.json();
          console.log(JSOData);
          if (JSOData.status=="failure") {
            alert(JSOData.msg);
            
          }else{
            // localStorage.setItem("email",emailRef.current.value);
            // localStorage.setItem("password",passwordRef.current.value);
            localStorage.setItem("token",JSOData.data.token);
            dispatch({type:"login",data:JSOData.data});
            navigate("/Home");
          }     
       }
    }
  return (
    <div className='App'>
        <form className='loginform'>
        <h3>Login Form</h3>
        <div>
          <label>Email</label>
          <input ref={emailRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input type='password' ref={passwordRef}></input>
        </div>
        <button type='button' onClick={()=>{
        //  sendloginDataToServerThruFormData();
        // dispatched function using redux Thunk
        dispatch(validateLogin());
        }}>Login</button>
      </form>
      <div>
        <Link to="/Signup">Signup</Link>
      </div>
    </div>
  )
}
export default Login