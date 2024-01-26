import { Box, Button, Image, Input, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import WithSubnavigation from '../components/Navbar'
import axios from 'axios'
import config from '../config'
import Footer from '../components/Footer'

const ContactUs = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [message,setMessage]=useState("")
    const toast = useToast();

    const handleContact=()=>{
        if(name!="" && email!="" && message!=""){
            axios.post(`${config.DEPLOYED_URL}/api/contact/create`,{ 
            name,
            email,
            message
           },{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token"),
            }}).then((res)=>{
            
            if(res){

                if(res.data.message==="Submit successfully"){
                  toast({
                    title: "We will get back to you as soon as possible" ,
                
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                 });
                }else if(res.data.message==="already contacted"){
                    toast({
                      title: "You already contacted , wait we will contact you " ,
                  
                      status: "warning",
                      duration: 5000,
                      isClosable: true,
                   });
                }
                else{
                    toast({
                        title: "Error Try again" ,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                     });
                }
            }

           })
        }else{
            toast({
                title: "Enter all fields" ,
            
                status: "error",
                duration: 1500,
                isClosable: true,
             });
             
        }
    }
    
  return (
   <Box>
    <WithSubnavigation/>
         <Box className='outerbox2' marginTop={'90px'} color={'white'} height={{base:'auto',md:'auto',lg:'auto'}} >
         <Text paddingTop={{base:'50px',md:'50px',lg:'100px'}} fontSize={{base:'3rem',md:'3rem',lg:'4rem'}} fontWeight={'bold'} textAlign={'center'}>Contact Us ✌️</Text>

           
        <Box width={{base:'90%',md:'90%',lg:'40%'}} margin={'auto'}>

            <Text fontWeight={'bold'} color={'white'} marginTop={'5px'} marginBottom={'2px'}>Name</Text>
             <Input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your name'/>
             
             <Text fontWeight={'bold'} color={'white'} marginTop={'5px'} marginBottom={'2px'}>Email</Text>
           <Input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Enter your email' required/>
            
             <Text fontWeight={'bold'} color={'white'} marginTop={'5px'} marginBottom={'2px'}>Message</Text>
           <Textarea type='text' value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Enter your message'/>
             <Button  marginTop={'10px'} color={'white'} bgColor={'#5cac60'}  _hover={
          {
           cursor:'pointer'
          }}  onClick={handleContact}>Submit</Button>
        </Box>
        <Box width={{base:'90%',md:'90%',lg:'40%'}} margin={'auto'}>
          
           
            <Text fontSize={'3xl'} paddingBottom={'10px'} fontWeight={'bold'}>Marketed by : DAARVI PHARMACEUTICALS
            Khata No. 183 Jigani Main Road Anekal (TQ),
            Bangalore 560105
            daarvipharmceuticals@gmail.com
            +919606882888 
            </Text>
            
            </Box>
        </Box>
<Footer/>
   </Box>
  )
}

export default ContactUs