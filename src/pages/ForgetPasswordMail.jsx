'use client'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import WithSubnavigation from '../components/Navbar'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postuser } from '../redux/register/action'

import { useLocation } from "react-router-dom";
import config from '../config'
import axios from 'axios'

export default function ForgetPasswordMail() {
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(false)
 
  const [status,setStatus]=useState(false)
  const toast = useToast();
  const [text,setText]=useState("")
  const [email,setEmail]=useState("")




  const handleSend=()=>{
    if(email!=""){
      axios.post(`${config.DEPLOYED_URL}/api/forget_password/forgetmail`,{
        email
      }).then((res)=>{
        console.log(res)
        if(res.data.message=="Check you email"){
          toast({
            title: "Email send Successfully" ,
             status: "success",
            duration: 3000,
            isClosable: true,
         });
        }else{
          toast({
            title: "Error,Invalid Email" ,
             status: "error",
            duration: 3000,
            isClosable: true,
         });
        }
       
       
       })
    }else{
      toast({
        title: "Enter Email" ,
         status: "error",
        duration: 3000,
        isClosable: true,
     });
    }
   
    
  }

 
console.log(loading)

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
        <Text as={'h1'} fontSize={{base:'2xl',md:'2xl',lg:'3xl'}}>Forget Password</Text>
<Text as={'h3'}>Enter your registered email id</Text>
        <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </FormControl>
         <Button bgColor={'skyblue'} onClick={handleSend}>Send</Button>

         
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