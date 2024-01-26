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
  Input,
  Select,
  Spinner,
  Grid,
  GridItem,
  Button,
  Divider,
  useToast,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
 
  FiStar,
 
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config'
import { FaArrowsDownToPeople } from 'react-icons/fa6'
import { GrContact } from 'react-icons/gr'



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

const OrdersAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [date,setDate]=useState("")
  const [status,setStatus]=useState("")
  const id=localStorage.getItem('userid')
  const [orders,setOrders]=useState([])
  const [loading,setLoading]=useState(false)
  const [count,setCount]=useState("")
  const toast=useToast()
  const [activeid,setActiveId]=useState("")
   useEffect(()=>{
     setLoading(true)
     axios.get(`${config.DEPLOYED_URL}/api/order/admin/allorders`, {
      headers: {
          Authorization: localStorage.getItem('token')
      }
  }).then((res)=>{
          setOrders(res.data.orders)
     }).finally((res)=>{
       setLoading(false)
     });
    },[count])
    const handleUpdate=(id)=>{

    if(status!="" && date!=""){
      const orderUpdateModel={
        status,
        deliveryDate:date
       }
   
       fetch(`${config.DEPLOYED_URL}/api/order/admin/update/${id}`,  {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `${localStorage.getItem("token")}`,
         },
         body: JSON.stringify(orderUpdateModel)
       })
         .then((res) => res.json())
         .then((res) => {
           console.log(orderUpdateModel,res)
          if(res.message==="updated successfully"){
           toast({
             title: "Updated Succssfully" ,
         
             status: "success",
             duration: 3000,
             isClosable: true,
          });
          setCount(count+1)
          }
         }) 
    }else{
      toast({
        title: "Enter all fields" ,
    
        status: "warning",
        duration: 2000,
        isClosable: true,
     });
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
      <Box marginTop={'100px'} width={'100%'} display={'grid'} justifyContent={'center'} alignItems={'center'}>
       
       
       {loading ? (
         <Spinner size="xl" />
       ) : orders.length === 0 ? (
         <Text fontSize={'2xl'}>"No Orders Yet🥺"</Text>
       ) :<Box width={{base:'90%',md:'90%',lg:'100%'}} margin={'auto'}>
        {
        <Grid templateColumns={'1fr'} gap={4} >
        {orders.map((order) => (
          <GridItem key={order._id}>
          <Box
           borderWidth="1px"
           borderRadius="lg"
           p={2}
           width={'90%'}
           shadow="md"
           margin={'auto'}
           bg="gray.200" // Setting the background color to gray
 >
   {/* First Row */}
   <Box display="flex" flexDirection={{base:'column',md:'column',lg:'row'}} justifyContent="space-between" gap={10} paddingRight={'20px'}>
     {/* Left Column */}
     <Box>
       <Text fontWeight="bold" fontSize="lg" mb={2}>
         Order Details
       </Text>
       <Text>
         <strong>Order ID:</strong> #{order._id}
       </Text>
       <Text>
         <strong>Order Placed:</strong> {new Date(order.orderDate).toLocaleString()}
       </Text>
       <Text>

         <strong>Status:</strong>{" "}
         {
          order.status=='cancelled'? ""  :<Select border={'1px solid gray'} onChange={(e)=>setStatus(e.target.value)}>
            <option>Select Status</option>
          <option value={'pending'}>Pending</option>
           <option value={'dispatched'}>Dispatched</option>
           <option value={'delivered'}>Delivered</option>
           <option value={'cancelled'}>Cancelled</option>
          </Select>
         }
       
       </Text>
       <Text>
         <strong>Delivery Date:</strong>{" "}
         {
          order.status=='cancelled'?<Text fontSize={'20px'} fontWeight={'bold'}>Item Cancelled by customer</Text>:<Input type='date' value={date} onChange={(e)=>setDate(e.target.value)} border={'1px solid gray'} placeholder='Delivery Date'  min={new Date().toISOString().split('T')[0]}/>
          
         }
         </Text>
         {
          order.status=='cancelled'? "":   <Button
          bg="orange.400" // Setting button background to orange
          color="white" // Setting text color to white
          marginTop={'2px'}
          onClick={() => {
          handleUpdate(order._id)
          }}
        > 
          Update
        </Button> 
         }
      
     </Box>
     {/* Right Column */}
     <Box>
       <Text fontWeight="bold" fontSize="lg">
         Address to Ship:
       </Text>
       <Text>
         <strong>Name:</strong> {order.address.name}
       </Text>
       <Text flexWrap={'wrap'}>
         <strong>Address:</strong> {order.address.address}
       </Text>
       <Text>
         <strong>City:</strong> {order.address.city}
       </Text>
       <Text>
         <strong>Mobile:</strong> {order.address.mobile}
       </Text>
       <Text>
         <strong>Zipcode:</strong> {order.address.zipcode}
       </Text>
       Current User Status: <Text color={'green.600'} fontWeight={'bold'}>{order.status}</Text>
     Current Delivery Date<Text color={'orange.600'} fontWeight={'bold'}>{new Date(order.deliveryDate).toLocaleString()}</Text>
     </Box>
   </Box>
   {/* Second Row */}
   <Box>
     <Text fontWeight="bold" fontSize="lg" mt={2}>
       Products:
     </Text>
     
     {order.products.map((product) => (
       <Box display={'flex'} alignItems={'center'}>
       <Image src={product.image1url} width={'50px'}/>
                      <Text key={product.productId}>
                        {product.productname} - Qty:{product.productquantity}
                      </Text>
       </Box>
       
     ))}
      <Divider size={'5px'}/>
       <Text fontWeight="bold" fontSize="lg" mt={2}>
         Total Price:
       </Text>
       <Text>
         ₹{order.totalPrice}
       </Text>
     
   </Box>
 </Box>
 
          </GridItem>
        ))}
      </Grid>
        }
       </Box>
         }
         
       </Box>
      </Box>
    </Box>
  )
}

export default OrdersAdmin