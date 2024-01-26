'use client'

import {
  Button,

  Flex,
  Text,
  FormControl,
  FormLabel,

  Input,
  Stack,
  Image,
  Box,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import WithSubnavigation from '../components/Navbar'
import {  useSearchParams } from 'react-router-dom'
import {useState } from 'react'

import config from '../config'
import axios from 'axios'

export default function ResetPassword() {
  
  const [loading,setLoading]=useState(false)
  const [searchParams,setSearchParam]=useSearchParams();
  const token = searchParams.get("token");
  const userEmail=searchParams.get("email")
  
  const toast = useToast();

const [password,setPassword]=useState("")
const [confirmPassword,setConfirmPassword]=useState("")

  const handleReset=()=>{
    console.log(userEmail,password)
    if(password==confirmPassword){
      axios.put(`${config.DEPLOYED_URL}/api/forget_password`,{
    
        email:userEmail,
        password:password
      }).then((res)=>{
        if(res.data.message=="password update successfully"){
          toast({
            title: "Password update Successfully" ,
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
        title: "Confirm password not match" ,
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
        <Text as={'h1'} fontSize={{base:'2xl',md:'2xl',lg:'3xl'}}>Reset Your Password</Text>
        <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </FormControl>

          <FormControl id="confirmpassword">
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
          </FormControl>
          <Button bgColor={'red.500'} color={'white'} onClick={handleReset}>Reset</Button>



         
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