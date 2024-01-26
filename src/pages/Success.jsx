import React from 'react'
import WithSubnavigation from '../components/Navbar'
import { Box, Button, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div>
        <WithSubnavigation/>
        <Box marginTop={'100px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Image src="./success.gif"  alt="success"/>
       
        </Box>
        <Box marginTop={'5px'} display={'flex'} justifyContent={'center'} alignItems={'center'}> 
       <Link to="/order page" ><Button bgGradient="linear(to-r,red.400, red.300)"textAlign={'center'} 
         _hover={
          {
           cursor:'pointer'
          }}  fontSize={'xl'}  color={'white'} fontWeight={'bold'} width={{base:'150px',lg:'200px'}} height={'50px'}  borderRadius={'10px'} >My Order</Button>
        </Link>
         </Box>
        </div>
  )
}

export default Success