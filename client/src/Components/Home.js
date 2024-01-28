import React from 'react'
import Topnavigation from './Topnavigation'
import { useSelector } from 'react-redux'

function Home() {
   
  let storeObj=useSelector((store)=>{
return store
  })
  console.log("Inside Store");
  console.log(storeObj);
  return (
    <div>
        <Topnavigation/>
        <h1>Home</h1>
        <h3>🎉Welcome {storeObj.loginReducer.loginDetails.firstName} {storeObj.loginReducer.loginDetails.lastName}🎉</h3>
        <img src={`/${storeObj.loginReducer.loginDetails.profilepic}`}></img>
    </div>
  )
}

export default Home