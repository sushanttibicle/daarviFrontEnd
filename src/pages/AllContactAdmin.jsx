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

  Grid,
  GridItem,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,

  FiStar,

  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi'

import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import config from '../config'
import { FaArrowsDownToPeople } from "react-icons/fa6"
import { GrContact } from "react-icons/gr";
import axios from 'axios'

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

const AllContactAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const[contact,SetContact]=useState([])
  const toast = useToast();
  const token = localStorage.getItem("token");
  useEffect((el)=>{
    axios.get(`${config.DEPLOYED_URL}/api/contact/getContact`).then((res)=>{
      SetContact(res.data)
    })
  })
   
  return (
    <Box minH="auto" bg={useColorModeValue('gray.100', 'gray.900')}>
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
       <Box  padding={'10px'}>
        <Grid gridTemplateColumns={{base:'1fr',lg:'1fr 1fr 1fr'}} justifyContent={'center'} alignItems={'center'} gap={2}>

          {
            contact.map((el)=>(
                 <GridItem>
                  <Box backgroundColor={'white'}  padding={'5px'} borderRadius={'10px'} width={'300px'} height={'200px'}>
                    <Text fontSize={'xl'} fontWeight={'bold'}>{el.name}</Text>
                    <Text fontSize={'md'} fontWeight={'bold'}>{el.email}</Text>
                  
                    <Text fontSize={'md'} >{el.message}</Text>
                  
                  </Box>
  
                 </GridItem>
            ))
          }
           
        </Grid>
    
    </Box>
       
       </Box>
      
      </Box>
    
  )
}

export default AllContactAdmin