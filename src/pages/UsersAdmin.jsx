'use client'

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  
  Menu,
  MenuButton,
 
  MenuItem,
  MenuList,
  Image,
  useToast,
  Stack,
  FormControl,
  Input,
  FormLabel,
  Heading,
  Button,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowsDownToPeople } from 'react-icons/fa6'
import { GrContact } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { postadmin } from '../redux/register/action'



const LinkItems= [
  { name: 'Edit Products',href:'/admin', icon: FiHome },
  { name: 'Add New ',href:'/admin/addnew', icon: FiTrendingUp },
  { name: 'Orders',href:'/admin/orders', icon: FiStar },
  { name: 'Create Admin',href:'/admin/createAdmin', icon: FaArrowsDownToPeople },
  { name: 'All Contact Form',href:'/admin/contactsForm', icon: GrContact },
  
]

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Image src="https://daarvipharmaceuticals.vercel.app/darvi.png" alt="Darvi"/>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
         <Link to={link.href}>
         <NavItem key={link.name} icon={link.icon}>
           {link.name}
         </NavItem>
         </Link>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate=useNavigate()
  const handleLogout = () => {
     
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("userid")
    localStorage.removeItem("role")
    window.location.reload()
    navigate("/")
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

<Image
                  width={"auto  "}
                  margin={"auto"}
                  src="https://daarvipharmaceuticals.vercel.app/darvi.png"
                  alt="Darvi Logo"
                />

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://daarvipharmaceuticals.vercel.app/darvi.png'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Darvi</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

const UsersAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name ,setName]=useState("")
  const [email,setEmail]=useState("");
  const [mobile,setMobile]=useState("");
  const [password,setPassword]=useState("");
  const toast = useToast();
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const {loading,message}=useSelector((store)=>store.user)
  function validatePhoneNumber(phoneNumber) {
    // Remove non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');
    // Check if resulting string has exactly 10 digits
    if(digits.length !== 10){
      toast({
        title: "Check mobile number" ,
         status: "warning",
        duration: 2000,
        isClosable: true,
     });
    }
    return digits.length === 10;
}

function validatePassword(password) {
    // Check if password length is at least 8 characters
  
    return password.length >= 8;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(email);
}
  const handleSubmit=()=>{
    if(name!=="" && validateEmail(email) && validatePhoneNumber(mobile) && validatePassword(password)){

     let emailVerify="true"
     let role="admin"
      
      dispatch(postadmin(name,email,mobile,password,emailVerify,role)).then((res)=>{
        
        if(res.msg=="User already Registered"){
          toast({
            title: "Email or Mobile already exists, Kindly login" ,
        
            status: "error",
            duration: 3000,
            isClosable: true,
         });
        }else{
          toast({
            title: "Admin Created" ,
             status: "success",
            duration: 5000,
            isClosable: true,
         });
        
        }
       
      
       
      })
    }else{
      toast({
        title: "Enter all fields or Correct detail" ,
    
        status: "error",
        duration: 1500,
        isClosable: true,
     });
     setPassword("")
    }
   
   
  }
 

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
           <Box margin={'auto'} padding={'10px'} borderRadius={'20px'} backgroundColor={'white'} width={{base:'98%',lg:'500px'}} height={'auto'}>
           <Stack spacing={2} w={{base:'98%',lg:'130%'}} maxW={'md'} backgroundColor={'white'}padding={'10px'} borderRadius={'10px'}>
          <Heading fontSize={'2xl'} textAlign={'center'}>Create Admin</Heading>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} placeholder='Enter you name'  onChange={(e)=>setName(e.target.value)}/>
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email"  value={email} placeholder='Enter valid email' onChange={(e)=>setEmail(e.target.value)}/>
          </FormControl>
          <FormControl id="mobile">
            <FormLabel>Mobile Number</FormLabel>
            <Input type="number" value={mobile} placeholder='Enter 10 digit mobile number' onChange={(e)=>setMobile(e.target.value)}/>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} placeholder='Password should be min 8 char ' onChange={(e)=>setPassword(e.target.value)}/>
          </FormControl>
          <Stack spacing={6}>
            
           
            <Button backgroundColor={'#345b22'} color={'white'} variant={'solid'}  disabled={loading}
              onClick={handleSubmit}>
              {loading?"Wait...":"Create New Admin"}
            </Button>
          </Stack>
          </Stack>
           </Box>
      </Box>
    </Box>
  )
}

export default UsersAdmin