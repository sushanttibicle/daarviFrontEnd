import { useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import config from '../config'

const PrivateRouteAdmin = ({children}) => {
   let userid=(localStorage.getItem("userid"))
   const [role,setRole]=useState("")
   const navigate=useNavigate()
    const toast = useToast()
   useEffect(()=>{
    fetch(`${config.DEPLOYED_URL}/api/${userid}`).
    then((res)=>res.json())
    .then(res=>{
      console.log(res)
      setRole(res.role)
    })   
     
   },[])
 if(!userid || userid==null ||userid== undefined || role=="customer"){

 
    toast({
        title: 'Restricted you are not admin',
        
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return <Navigate to="/login"/>
    
       
       
    }else{
      return children
    }

  
}

export default PrivateRouteAdmin