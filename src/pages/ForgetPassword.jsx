'use client'

import {
  Button,

  Flex,
  Text,
 
  Input,
  Stack,
  Image,
  Box,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import WithSubnavigation from '../components/Navbar'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {  useState } from 'react'

import config from '../config'
import axios from 'axios'
const ForgetPassword = () => {
  
    const [loading,setLoading]=useState(false)
    const [searchParams,setSearchParam]=useSearchParams();
    const token = searchParams.get("token");
    const userEmail=searchParams.get("email")
    const [paramtoken,setParamToken]=useState(token)
    const [status,setStatus]=useState(false)
    const [password,setPassword]=useState("")
    const toast = useToast();
    const navigate=useNavigate()

    function validatePassword(password) {
        // Check if password length is at least 8 characters
        return password.length >= 8;
    }
  
  
    const handleReset=()=>{
        if(token && validatePassword(password)){
            axios.post(`${config.DEPLOYED_URL}/api/update_password`,{
                token:paramtoken,
                password
          
              }).then((res)=>{
                console.log("here1",res)
                if(res.data.success==true){
                  toast({
                    title: "Reset Successfully" ,
                
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                 });
                 navigate("/login")
                  
                }else {
                    toast({
                        title: "Error try after some time" ,
                    
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                     });  
                }
          
              })
        }else{
            toast({
                title: " Rquire Token or Password must be 8 char" ,
            
                status: "warning",
                duration: 3000,
                isClosable: true,
             });
        }
     
     } 
    
   
  console.log(status)
  
    return (
  <Box>
  <WithSubnavigation/>
  {
    loading? <Box display={'flex'} justifyContent={{base:'center',lg:'center'}} marginTop={'10px'}  width={'100%'}><Spinner
    thickness='5px'
    speed='0.65s'
    emptyColor='gray.200'
    color='green.500'
    size='xl'
    
  /></Box>:
  
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} background={{base:"url('https://daarvipharmaceuticals.vercel.app/darviplant.webp')",lg:'white'}} backgroundSize="cover" // Adjust the background size as needed (e.g., 'contain', 'cover', '50% 50%')
        backgroundRepeat="no-repeat" // Adjust the background repeat as needed (e.g., 'no-repeat', 'repeat', 'repeat-x', 'repeat-y')
        backgroundPosition="center"   >
  
        <Flex p={8} flex={1} align={'center'} justify={'center'} >
          <Stack spacing={4} w={'130%'} maxW={'md'} backgroundColor={'white'}padding={'10px'} borderRadius={'10px'}>
          <Text as={'h1'} fontSize={{base:'2xl',md:'2xl',lg:'3xl'}}>Enter new password</Text>
  
  
  <Input type="text" value={paramtoken} onChange={(e)=>setParamToken(e.target.value)} placeholder='Enter your code here'/>
  <Input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your new password"/>
   <Button bgColor={'skyblue'} onClick={handleReset}>Reset Password</Button>
  
  
  
  
           
            </Stack>
        </Flex>
        <Flex flex={1} display={{base:'none',lg:'block'}}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src='https://daarvipharmaceuticals.vercel.app/darviplant.webp'
          
          />
        </Flex>
      </Stack>
      }
  </Box>
    )
  
}

export default ForgetPassword