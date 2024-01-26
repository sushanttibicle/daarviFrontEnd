import { useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
   let token=(localStorage.getItem("token"))
   const navigate=useNavigate()
    const toast = useToast()
   useEffect(()=>{
    token=(localStorage.getItem("token"))
     
   },[])
 
         if(!token ||token==null|| token==undefined){
        toast({
            title: 'Please Login First',
            
            status: 'warning',
            duration: 2000,
            isClosable: true,
          })
        return <Navigate to="/login"/>
    }else{
      return children
    }

  
}

export default PrivateRoute