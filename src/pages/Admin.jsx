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
  Textarea,
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
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Grid, GridItem, Spinner } from '@chakra-ui/react'
import config from '../config'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowsDownToPeople } from 'react-icons/fa6'
import { GrContact } from 'react-icons/gr'


const LinkItems= [
  { name: 'Edit Products',href:'/admin', icon: FiHome },
  { name: 'Add New ',href:'/admin/addnew', icon: FiTrendingUp },
  { name: 'Orders',href:'/admin/orders', icon: FiStar },
  { name: 'Create Admin',href:'/admin/orders', icon: FaArrowsDownToPeople },
  { name: 'All Contact Form',href:'/admin/orders', icon: GrContact },
  
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

const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(false)
  const [activeid,setActiveId]=useState("")
  const [activeIdToDelete,setActiveIdToDelete]=useState("")
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productName,setProductName]=useState("")
  const [price,setPrice]=useState(0)
  const [shortdescription,setShortDescription]=useState("")
  const [longdescription,setLongDescription]=useState("")
  const [dosage,setDosage]=useState("")
  const [warning,setWarning]=useState("")
  const toast = useToast();
  const [count,setCount]=useState(0)
  const token=localStorage.getItem("token")
  useEffect(()=>{
    
    setLoading(true)

    axios.get(`${config.DEPLOYED_URL}/api/product/allproducts`).then((res)=>{
     
      setProducts(res.data)
     
    }).finally((res)=>{
      setLoading(false)
    })
  },[token,count])
  useEffect(()=>{
    fetch(`${config.DEPLOYED_URL}/api/product/allproducts/${activeid}`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
       
        setProductName(res.productname)
        setPrice(res.price)
        setShortDescription(res.shortdescription)
        setLongDescription(res.longdescription)
        setDosage(res.dosage)
        setWarning(res.warning)
      })
  },[activeid])

  const handleUpdate=()=>{

    const productUpdateModel={
      productName,
      price,
      shortdescription,
      longdescription,
      dosage,
      warning
    }

    fetch(`${config.DEPLOYED_URL}/api/product/edit/${activeid}`,  {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(productUpdateModel)
    })
      .then((res) => res.json())
      .then((res) => {
       if(res.message==="Product updated successfully"){
        toast({
          title: "Product Updated Succssfully" ,
      
          status: "success",
          duration: 3000,
          isClosable: true,
       });
       setCount(count+1)
       }
      }) 
     
        

  }
  const handleDelete=(id)=>{
    fetch(`${config.DEPLOYED_URL}/api/product/delete/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem("token")}`,
      }
    }
   )
    .then((res)=>{
      setCount(count+1)
    })

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
     
       
     
      <Grid gridTemplateColumns={{base:'1fr',lg:'1fr 1fr' }}  justifyContent={'center'} alignItems={'center'}>
        {loading?<Box display={'flex'} justifyContent={{base:'center',lg:'flex-end'}} marginTop={'10px'}  width={'100%'}><Spinner
  thickness='5px'
  speed='0.65s'
  emptyColor='gray.200'
  color='green.500'
  size='xl'
  
/></Box>
        : products.map((e)=>(
      <Box width={{base:'90%',lg:'350px'}} height={'auto'} margin={'auto'} key={e._id}>
         <Link>
          <Image height={{base:'350px',lg:'350px'}} margin={'auto'} src={e.image1url} transform="rotate(-2deg)"/>
          <Text marginTop={'-15px'} as={'h1'} fontSize={{base:'4xl',lg:'5xl'}}  fontWeight={'bold'} paddingLeft={'10px'}>{e.productname}</Text> 
          <Box marginTop={'10px'} paddingLeft={'10px'}><Button bgGradient="linear(to-r,#345b22, green.300)" 
           _hover={
          {
           cursor:'pointer'
          } } fontSize={'xl'}  color={'white'} fontWeight={'bold'} width={'100%'} height={'40px'}  borderRadius={'10px'} onClick={() => {
            setSelectedProduct(e);
            setIsModalOpen(true);
            setActiveId(e._id)
          }}>Edit Now</Button></Box>
          </Link>

          <Box marginTop={'3px'} paddingLeft={'10px'}><Button bgGradient="linear(to-r,red.300, red.700)" 
           _hover={
          {
           cursor:'pointer'
          } } fontSize={'xl'}  color={'white'} fontWeight={'bold'} width={'100%'} height={'40px'}  borderRadius={'10px'} onClick={() => {
            handleDelete(e._id)
          }}>Delete Now</Button></Box>
          
          
       </Box>
    
          ))
        }
       
      

       </Grid>
      </Box>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           
          <Box margin={'auto'} padding={'10px'} borderRadius={'20px'} backgroundColor={'white'}>
           <Text as={'h1'} fontSize={'5xl'} fontWeight={'bold'} textAlign={'center'}>Edit Product</Text>
           <Text fontSize={'md'} fontWeight={'bold'}>Product Name</Text>
           <Input marginTop={'10px'} type='text' value={productName} onChange={(e)=>setProductName(e.target.value)}  placeholder='Product Name' size='lg' />
           <Text fontSize={'md'} fontWeight={'bold'}>Price</Text>
           <Input marginTop={'10px'} type='number' value={price} onChange={(e)=>setPrice(e.target.value)}  placeholder='Cost' size='lg' />
           <Text fontSize={'md'} fontWeight={'bold'}>Short Description</Text>
           <Textarea marginTop={'10px'} type='text' value={shortdescription} onChange={(e)=>setShortDescription(e.target.value)}  placeholder='Short Description' height={'auto'} size='lg' />
           <Text fontSize={'md'} fontWeight={'bold'}>Long Description</Text>
           <Textarea marginTop={'10px'} type='text' value={longdescription} onChange={(e)=>setLongDescription(e.target.value)}  placeholder='Long Description' height={'auto'} size='lg' />
           <Text fontSize={'md'} fontWeight={'bold'}>Dosage</Text>
           <Input marginTop={'10px'} type='text' value={dosage} onChange={(e)=>setDosage(e.target.value)}  placeholder='Enter dosage' height={'auto'} size='lg' />
           <Text fontSize={'md'} fontWeight={'bold'}>Warning</Text>
           <Input marginTop={'10px'} type='text' value={warning} onChange={(e)=>setWarning(e.target.value)}  placeholder='Enter warning' height={'auto'} size='lg' />
            
           <Button  marginTop={'20px'} bg={'pink.600'} color={'white'} onClick={handleUpdate} >Update Product</Button>
              
          </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </Box>
  
  )
}

export default Admin