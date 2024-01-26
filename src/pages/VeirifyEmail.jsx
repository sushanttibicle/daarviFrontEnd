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

export default function VerifyEmail() {
  
  const [loading,setLoading]=useState(false)
  const [searchParams,setSearchParam]=useSearchParams();
  const token = searchParams.get("token");
  const userEmail=searchParams.get("email")
  const [paramtoken,setParamToken]=useState(token)
  const [status,setStatus]=useState(false)
  const toast = useToast();
  const navigate=useNavigate()



  const handleCheck=()=>{
    axios.post(`${config.DEPLOYED_URL}/api/verify_email`,{
      token:paramtoken,
      email:userEmail

    }).then((res)=>{
      console.log("here1",res)
      if(res.data.success==true){
        toast({
          title: "Verified Successfully" ,
      
          status: "success",
          duration: 3000,
          isClosable: true,
       });
       navigate("/login")
        
      }

    })
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
        <Text as={'h1'} fontSize={{base:'2xl',md:'2xl',lg:'3xl'}}>Email has been sent to your mail, Please Verify your Email</Text>


<Input type="text" value={paramtoken} onChange={(e)=>setParamToken(e.target.value)} placeholder='Enter your code here'/>
 <Button bgColor={'skyblue'} onClick={handleCheck}>Verify Now</Button>




         
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