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
} from '@chakra-ui/react'
import WithSubnavigation from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginuser } from '../redux/login/action'

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
 const navigate=useNavigate()
  const toast = useToast();
  const dispatch=useDispatch()
  const {loading,message}=useSelector((store)=>store.user)
  const handleSubmit=()=>{
    if(email!=="" && password!=="" ){
      console.log(email,password)
      dispatch(loginuser(email,password)).then((res)=>{
       if(res){

        if(res.msg==="Login detail are incorrect"){
          toast({
            title: "Incorrect Login Details" ,
        
            status: "error",
            duration: 3000,
            isClosable: true,
         });
        }else if(res.msg==="Invalid username or password,Please Register first"){
          toast({
            title: "No user found, kindly Register " ,
        
            status: "error",
            duration: 3000,
            isClosable: true,
         });
        }
        else if(res.msg=="Please verify you email"){
          toast({
            title: "Email Not Verified" ,
        
            status: "error",
            duration: 3000,
            isClosable: true,
         });
        }
        else{
          toast({
            title: "Login Successful" ,
             status: "success",
            duration: 3000,
            isClosable: true,
         });
         console.log(res)
         localStorage.setItem("token",res.token)
         localStorage.setItem("user",res.data.name)
         localStorage.setItem("userid",res.data._id)
         localStorage.setItem("role",res.data.role)
        navigate("/products_page")
        }
       }else{
        toast({
          title: "Server Error" ,
      
          status: "error",
          duration: 3000,
          isClosable: true,
       });
       }
        
      })
    }else{
      toast({
        title: "Enter all fields" ,
    
        status: "error",
        duration: 1500,
        isClosable: true,
     });
     setEmail("")
     setPassword("")
    }
  }
  return (
<Box>
    <WithSubnavigation/>
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} background={{base:"url('./darviplant.webp')",lg:'white'}} backgroundSize="cover" // Adjust the background size as needed (e.g., 'contain', 'cover', '50% 50%')
      backgroundRepeat="no-repeat" // Adjust the background repeat as needed (e.g., 'no-repeat', 'repeat', 'repeat-x', 'repeat-y')
      backgroundPosition="center"   >

      <Flex p={8} flex={1} align={'center'} justify={'center'} >
        <Stack spacing={4} w={'130%'} maxW={'md'} backgroundColor={'white'}padding={'10px'} borderRadius={'10px'}>
          <Heading fontSize={'2xl'} textAlign={'center'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'row', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
             <Link to="/login/reset_password_mail"> <Text color={'blue.400'}>Forgot password?</Text></Link>
            </Stack>
            <Flex justifyContent={'center'} gap={'5px'} paddingTop={'10px'}> <Text as={'h1'}>New User {" "}</Text><Link to="/register"><Text color={'pink.600'} fontWeight={'bold'}>Register Now</Text></Link></Flex>
        
            <Button backgroundColor={'#345b22'} color={'white'} variant={'solid'}  disabled={loading}
              onClick={handleSubmit}
              >
              {loading?"Wait...":"Sign in"}
            </Button>
          </Stack>
          </Stack>
      </Flex>
      <Flex flex={1} display={{base:'none',lg:'block'}}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src='./darviplant.webp'
        
        />
      </Flex>
    </Stack>
</Box>
  )
}