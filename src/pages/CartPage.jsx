import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContextProvider";
import WithSubnavigation from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import config from "../config";
const CartPage = () => {
  //https://agreeable-coat-fawn.cyclic.app/api/cart/cartitems/64f40bdf05cda2833de50720
  const { length, Length } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const id = localStorage.getItem("userid");
  const [totalprice, setTotalprice] = useState(0);
  const [loading,setLoading]=useState(false)
  const toast = useToast();
  const navigate=useNavigate()
   
  useEffect(() => {
    setLoading(true)
    axios.get(`${config.DEPLOYED_URL}/api/cart/cartitems/${id}`, {
      headers: {
          Authorization: localStorage.getItem('token')
      }
  }).then((res) => {
      setProducts(res.data.cart);
      Length(res.data.cartCount);
      setTotalprice(res.data.totalCartPrice);
    }).finally((res)=>{
      setLoading(false)
    });
  }, [count,length]);
  console.log(products, totalprice);
const handleRemove=(prodid)=>{
console.log(prodid)
  axios.delete(`${config.DEPLOYED_URL}/api/cart/cartitems/delete/${prodid}`,  {
    headers: {
        Authorization: localStorage.getItem('token')
    }
})
  .then((res) => {
    console.log(res.data);
    setCount(count + 1);
  })
  .catch((error) => {
    console.error(error);
  });
}

const handleCoupon=()=>{
  toast({
    title: "Enter Valid Coupon",
    status: "warning",
    duration: 3000,
    isClosable: true,
 });
 
}
const handleCheckout=()=>{
  if(length>0){
    navigate("/checkout")
  }else{
    toast({
      title: "Fill your Cart",
      status: "warning",
      duration: 3000,
      isClosable: true,
   });
   }
}
  return (
    <>
    <WithSubnavigation />
  <Box marginTop={'100px'}>
   
   
    <Box width={'80%'} margin={'auto'}>
    
   
     <Text fontSize={'3xl'} fontWeight={'bold'}>{length===0?"Sorry Nothing in Cart🥺":`My Cart(${length})`} </Text>
     {
      loading?
      <Box display={'flex'} justifyContent={{base:'center',lg:'center'}} marginTop={'10px'}  width={'100%'}><Spinner
  thickness='5px'
  speed='0.65s'
  emptyColor='gray.200'
  color='green.500'
  size='xl'
  
/></Box>
      
      : <Grid gridTemplateColumns={{base:'100%',lg:'70% 30%'}} gap={'10px'}>
     
      <GridItem>
             {               

             products.map((e)=>(
                 
                 <Box padding={'2px'} marginTop={'5px'} key={e._id}>
             <Grid gridTemplateColumns={{base:'100%',lg:'20% 80%'}}>
             <GridItem ><Image src={e.image1url} alt="darvi" margin={'auto'} width={'50%'}/></GridItem>
             <GridItem >
             <Box >
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
               <Text fontSize={'2xl'} fontWeight={'bold'}>{e.productname}</Text>
              <Text fontSize={'md'} fontWeight={'bold'}>Qty: {e.productquantity}</Text>
                   
              </Box>
                   
                   <Text fontSize={'sm'}>{e.category}</Text>
                   <Text fontSize={'xl'} fontWeight={'bold'} >₹{e.price}</Text>
                   
                  
                  
                 
                 </Box>
                 <Button float={'right'} backgroundColor={'red.500'} color={'white'} onClick={()=>handleRemove(e._id)}>Remove</Button>
             </GridItem>
             </Grid>
             <Divider marginTop={'5px'}/>
           </Box>
                
               ))
               
               }
  
  
           
         </GridItem>
         <GridItem >
          <Text fontSize={'2xl'} textAlign={'center'}>Have a Coupon?</Text>
          <InputGroup width={{base:'85%',md:'80%',lg:'80%'}} margin={'auto'}>
       
       <Input
         type="email"
         name="Subscriber Email"
         backgroundColor={'white'}
         placeholder="Add your Coupon"
         fontWeight={'bold'}
         color="black" // Text color
         borderRadius="5px" // Border radius
         required
       />
       <InputRightElement width="30%">
         <Button
        
         onClick={handleCoupon}
           bgGradient="linear(to-r,blue.500, blue.400)"
           borderRadius={'0px 5px 5px 0px'}
           color="white" // Button text color
          _hover={
          {
           cursor:'pointer'
          }
          }
         >
         Apply
         </Button>
       </InputRightElement>
     </InputGroup>
     <Box width={'95%'} margin={'auto'} >
     <Text color={"Red"} as={"b"} fontSize={'2xl'}>Price Details</Text>
     <Flex justifyContent={'space-between'} alignItems={'center'}>
     <Text fontWeight={'bold'} fontSize={'xl'}>Price Details</Text>
     <Text fontWeight={'bold'} color={"green.400"}>₹{totalprice}</Text>
     </Flex>
     <Flex justifyContent={'space-between'} alignItems={'center'}>
     <Text fontWeight={'bold'} fontSize={'xl'}>Discount</Text>
     <Text fontWeight={'bold'} color={"green.400"}>₹0</Text>
     </Flex>
     <Flex justifyContent={'space-between'} alignItems={'center'}>
     <Text fontWeight={'bold'} fontSize={'xl'}>Convenience Fee</Text>
     <Text fontWeight={'bold'} color={"green.400"}>₹0</Text>
     </Flex>
     <Divider size={'2px'} margin={"20px"}/>
     <Flex justifyContent={'space-between'} alignItems={'center'}>
     <Text fontWeight={'bold'} fontSize={'xl'}>Total</Text>
     <Text fontWeight={'bold'} color={"green.400"}>₹{totalprice}</Text>
     </Flex>
     <Flex justifyContent={'center'} alignItems={'center'}>
     <Button   bgGradient="linear(to-r,#345b22, green.300)"  _hover={
          {
           cursor:'pointer'
          }
          }  marginTop={'10px'} color={'white'} width={'60%'} textAlign={'center'} onClick={()=>handleCheckout()}>Checkout</Button>
     </Flex>
     </Box>
         </GridItem>
      </Grid>

     }
    
   
    </Box>
    <Box display={{ base: "none", lg: "block" }} marginTop={"30px"}>
        <Image
          src="./features1.webp"
          margin={"auto"}
          alt="darvi web vector image"
        />
      </Box>
      <Box
        display={{ base: "block", lg: "none" }}
        marginTop={"30px"}
        backgroundColor={"d9d9d9"}
      >
        <Image src="./features2.png" alt="darvi web vector image" />
      </Box>
    </Box>

    </>
  );
};

export default CartPage;
