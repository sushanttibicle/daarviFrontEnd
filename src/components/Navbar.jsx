import {
    Box,
    Flex,
    Text,
    IconButton,
   
    Stack,
    Collapse,
    Icon,
    
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
   
    useDisclosure,
    Image,
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem,
    MenuDivider,
  } from '@chakra-ui/react';
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons';
  import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from "@chakra-ui/react";
  import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
  import {AiOutlineUser,AiOutlineShoppingCart,AiFillHome} from 'react-icons/ai'
  import {BiSolidUser,BiSolidUserCheck,BiSolidContact} from 'react-icons/bi'
  import{BsFillBox2HeartFill, BsHeartFill} from 'react-icons/bs'
  import{FaArrowsDownToPeople, FaPeopleArrows, FaPeopleCarry} from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react';
import { Badge } from '@chakra-ui/react'
import axios from 'axios';
import { AppContext } from './AppContextProvider';
import config from '../config';
  export default function WithSubnavigation() {
    // const { isOpen, onToggle } = useDisclosure();
    const token=localStorage.getItem('token')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = useState('left')
    const {length,Length}=useContext(AppContext)
    const id=localStorage.getItem('userid')
    const navigate=useNavigate()
    const user=localStorage.getItem('user')
    const [users,setUsers]=useState(user)
    
    useEffect(()=>{
      axios.get(`${config.DEPLOYED_URL}/api/cart/cartitems/count/${id}`).then((res)=>{
           Length(res.data.cartCount)
      })
     },[length])
     const handleLogout = () => {
     
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("userid")
      localStorage.removeItem("role")
      window.location.reload()
      navigate("/")
    };
    return (
      <Box  position="fixed"
      bg={useColorModeValue("white", "white")}
      px={4}
      width="100%"
      top={0}
     className='zindexall'
     >
        <Flex
         
          color={useColorModeValue('black', 'black')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
        //   borderStyle={'solid'}
          borderColor={useColorModeValue('black', 'black')}
          justifyContent={'space-around'}
          alignItems={'center'}
          >
             <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }} >
         <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon boxSize={'20px'} /> : <HamburgerIcon boxSize={'20px'}  />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
           
            marginRight={'10px'}
            onClick={isOpen ? onClose : onOpen}

          />
          </Flex>
          <Flex flex={{ base: 1 }} marginRight={{base:'30px',lg:'1px'}}  justifyContent={'space-around'} alignItems={'center'}  gap={'10px'}  >
            <Flex>
            <Link to={'/'}> <Image src="https://daarvipharmaceuticals.vercel.app/darvi.png" alt="Darvi"/></Link>
             </Flex>
            <Flex display={{ base: 'none', md: 'flex',lg:'center' }} mr={150}>
              <DesktopNav />
            </Flex>

           </Flex>
  
          <Flex justifyContent={'center'} gap={'5px'} >
          {token ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                 <BiSolidUserCheck fontSize={'27px'}/>
                </MenuButton>
                <MenuList>
                  <MenuItem><Text fontWeight={'bold'}>Welcome! {localStorage.getItem('user')}</Text></MenuItem>
                  <Link to="/order page"> <MenuItem><Text fontWeight={'bold'}>My Order</Text></MenuItem></Link>
                 
                  <MenuDivider />
                  <MenuItem>
                  <Button bgGradient="linear(to-r,red.400, red.300)"textAlign={'center'} 
         _hover={
          {
           cursor:'pointer'
          }}  fontSize={'sm'}  color={'white'} fontWeight={'bold'} width={{base:'70px',lg:'100px'}} height={'20px'}  borderRadius={'2px'} onClick={handleLogout} >LogOut</Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link  to="/login">
                
                <BiSolidUser fontSize={'25px'}/>
              </Link>
            )}
             
             <Link to='/cart_page'>
            <Flex position="relative">
  <AiOutlineShoppingCart fontSize={'25px'} />
  <Badge
    position="absolute"
    top="-10px"
    right="-10px"
    backgroundColor={"red.400"}
    borderRadius={"50%"}
    color={"white"}
    width="20px"
    height="20px"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
   {length>0?length:0}
  </Badge>
</Flex>
</Link>
         </Flex>
        </Flex>
  
        {/* <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse> */}
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
                <Image
                  width={"50%"}
                  margin={"auto"}
                  src="https://daarvipharmaceuticals.vercel.app/darvi.png"
                  alt="Darvi Logo"
                />
              </DrawerHeader>
              <DrawerCloseButton  fontSize={'10px'} />
          <DrawerBody>
          <Flex gap={'5px'}>   Welcome!{users? <Text fontWeight={'bold'} marginLeft={'2px'}>{users}</Text>:<Link to="/login"><Button backgroundColor={'green.400'} height={'25px'} color={'white'}>Sign in</Button></Link>}</Flex>
          <Link to="/"> <Flex gap={'5px'} alignItems={'center'}marginTop={'15px'}><AiFillHome/> <Text fontWeight={'bold'} fontSize={'20px'}>Home</Text></Flex></Link>
           <Link to="/products_page"> <Flex gap={'5px'} alignItems={'center'}marginTop={'15px'} > <BsHeartFill/><Text fontWeight={'bold'} fontSize={'20px'}>Products</Text></Flex></Link>
           <Link to="/aboutus"><Flex gap={'5px'} alignItems={'center'}marginTop={'15px'}>  <FaPeopleArrows/><Text fontWeight={'bold'} fontSize={'20px'}>Our Story</Text></Flex></Link>
         
           <Link to="/contactus"><Flex gap={'5px'} alignItems={'center'}marginTop={'15px'}><BiSolidContact/> <Text fontWeight={'bold'} fontSize={'20px'}>Contact</Text></Flex></Link>
           <Link to="/order%20page"> <Flex gap={'5px'} alignItems={'center'}marginTop={'15px'}><FaPeopleCarry/> <Text fontWeight={'bold'} fontSize={'20px'}>My Order</Text></Flex></Link>
          {token?<Button marginTop={'15px'} backgroundColor={'red.700'} fontWeight={'bold'} onClick={handleLogout} color={'white'}>LogOut</Button>:""}
          </DrawerBody>
          <DrawerFooter>
          <Image
                  width={"50%"}
                  margin={"auto"}
                  src="https://daarvipharmaceuticals.vercel.app/darvi.png"
                  alt="Darvi Logo"
                />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </Box>
    );
  }
  
  const DesktopNav = () => {
    const linkColor = useColorModeValue('black', 'black');
    const linkHoverColor = useColorModeValue('#FE7005', '#FE7005');
    const popoverContentBgColor = useColorModeValue('black', 'black');
  
    return (
      <Stack direction={'row'} spacing={4} zIndex={1}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
               <Link to={navItem.href}>
                <Text
                  p={2}
                 
                fontWeight={'bold'}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                    
                    
                  }}
                  className='navbar'
                  >
                  {navItem.label}
                </Text>
               </Link>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  
  const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
      <Link
        href={href}
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('black', 'back') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'pink.400' }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    );
  };
  
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'white')}
        
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
            color:'#FE7005'
          }}
         
          >
          <Text
            fontWeight={600}
            color={useColorModeValue('black', 'black')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('black', 'black')}
            align={'start'}>
            {children &&
              children.map((child) => (
                <Link key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  
 
  
  const NAV_ITEMS = [
    
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Products',
      href: '/products_page',
    },
    {
      label: 'Our Story',
      href: '/aboutus',
    },
    {
      label: 'Contact',
      href: '/contactus',
    }

  ];