import React, { useContext, useEffect, useState } from 'react'
import WithSubnavigation from '../components/Navbar'
import { Box, Button, Divider, Flex, FormControl, FormLabel, Grid, GridItem, Image, Input, Radio, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { AppContext } from '../components/AppContextProvider';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [totalprice, setTotalprice] = useState(0);
    const id = localStorage.getItem("userid");
    const [loading,setLoading]=useState(false)
    const [name,setName]=useState("")
    const [address,setAddress]=useState("")
    const [zipcode,setZipcode]=useState("")
    const [city,setCity]=useState("")
    const [mobile,setMobile]=useState("")
    const toast=useToast()
    const[count,setCount]=useState(0)
    const {length,Length}=useContext(AppContext)
    const navigate=useNavigate()
    useEffect(() => {
        setLoading(true)
        axios.get(`${config.DEPLOYED_URL}/api/cart/cartitems/${id}`, {
          headers: {
              Authorization: localStorage.getItem('token')
          }
      }).then((res) => {
          setProducts(res.data.cart);
        
          setTotalprice(res.data.totalCartPrice);
        }).finally((res)=>{
          setLoading(false)
        });
      }, []);
      useEffect(()=>{
        axios.get(`${config.DEPLOYED_URL}/api/cart/cartitems/${id}`, {
          headers: {
              Authorization: localStorage.getItem('token')
          }
      }).then((res)=>{
        
          Length(res.data.cartCount)
        })
       },[count,length])
       function validatePhoneNumber(phoneNumber) {
        // Remove non-digit characters
       
        const digits = phoneNumber.replace(/\D/g, '');
        if(digits.length !== 10){
          toast({
            title: "Enter valid mobile number" ,
            status: "warning",
            duration: 2000,
            isClosable: true,
         });
        }
        // Check if resulting string has exactly 10 digits
        return digits.length === 10;
    }
      const handlePlaceOrder=async()=>{
        if(name!=="" && address!=="" && zipcode!=="" && city!=="" && validatePhoneNumber(mobile)  ){
       
       await axios.post(`${config.DEPLOYED_URL}/api/order/placeorder`, { 
        userId: localStorage.getItem("userid"),
        products:products,
        totalPrice:totalprice,
        name:name,
        address:address,
        zipcode:zipcode,
        city:city,
        mobile:mobile

      }, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      }).then((res)=>{
        if(res.data.message==="Order placed successfully"){
          toast({
            title: "Order placed successfully" ,
        
            status: "success",
            duration: 7000,
            isClosable: true,
         });
         navigate("/success")
        }
       setCount(count+1)
      });
      }else{
          toast({
            title: "Enter Correct Details" ,
        
            status: "error",
            duration: 3000,
            isClosable: true,
         });
        }
      }
console.log(products,totalprice)
  return (
    <div>
        <WithSubnavigation/>
        <Box marginTop={'100px'} padding={'20px'} >
        <Grid gridTemplateColumns={{base:'100%',lg:'70% 30%'}} gap={'10px'}>
        <GridItem ><Text fontSize={'3xl'}>Shipping Information</Text>
        <Box padding={{base:'5px',lg:'20px'}}>
        <FormControl id="name" marginTop={{base:'10px',lg:'20px'}}>
            <FormLabel>Full Name</FormLabel>
            <Input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your full name'/>
          </FormControl>
          <FormControl id="address"  marginTop={{base:'10px',lg:'20px'}}>
            <FormLabel>Address</FormLabel>
            <Input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Enter your full address'/>
          </FormControl>
          <Flex justifyContent={'space-between'} gap={'10px'}  marginTop={{base:'10px',lg:'20px'}}>
          <FormControl id="zipcode">
            <FormLabel>Zip code</FormLabel>
            <Input type="text" value={zipcode} onChange={(e)=>setZipcode(e.target.value)} placeholder='Pin code or Zip code'/>
          </FormControl>
          <FormControl id="city">
            <FormLabel>City</FormLabel>
            <Input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder='Enter your City or District'/>
          </FormControl>
          </Flex>
          <FormControl id="name"  marginTop={{base:'10px',lg:'20px'}}>
            <FormLabel>Mobile</FormLabel>
            <Input type="number" value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder='Enter your Mobile Number'/>
          </FormControl>
          <FormControl id="paymentmode"  marginTop={{base:'10px',lg:'20px'}}>
            <FormLabel>Payment Mode</FormLabel>
            <Radio size='lg' colorScheme='blue' value='2' defaultChecked>
      Cash on Delivery
    </Radio>
          </FormControl>
          
        </Box>
       
        </GridItem>
        <GridItem><Text fontSize={'3xl'}>Order Summary</Text>
       {
         products.map((e)=>(
                 
            <Box padding={'2px'} marginTop={{base:'10px',lg:'20px'}} marginBottom={'10px'} key={e._id} width={'90%'}>
        <Grid gridTemplateColumns={{base:'20% 80%',lg:'20% 80%'}}>
        <GridItem ><Image src={e.image1url} alt="darvi" margin={'auto'} width={'50%'}/></GridItem>
        <GridItem >
        <Box >
            <Flex justifyContent={'space-between'}>
            <Text fontSize={'md'} fontWeight={'bold'}>{e.productname}</Text>
            <Text fontSize={'md'} fontWeight={'bold'} >₹{e.price}</Text>
            </Flex>
              
              <Text fontSize={'sm'}>Qty: {e.productquantity}</Text>
             
             
            
            </Box>
             </GridItem>
        </Grid>
        <Divider marginTop={'5px'}/>
      </Box>
           
          ))
       }
        
     <Box width={'95%'} margin={'auto'} >
     <Text color={"Red"} as={"b"} fontSize={'2xl'}>Price Details</Text>
     <Flex justifyContent={'space-between'} alignItems={'center'}>
     <Text  fontSize={'xl'}>Price Details</Text>
     <Text fontWeight={'bold'} color={"green.400"}>₹{totalprice}</Text>
     </Flex>
     <Flex justifyContent={'space-between'} alignItems={'center'}>
     <Text  fontSize={'xl'}>Discount</Text>
     <Text fontWeight={'bold'} color={"green.400"}>₹0</Text>
     </Flex>
     <Flex justifyContent={'space-between'} alignItems={'center'}>
     <Text  fontSize={'xl'}>Convenience Fee</Text>
     <Text fontWeight={'bold'} color={"green.400"}>₹0</Text>
     </Flex>
     <Divider size={'2px'} margin={"20px"}/>
     <Flex justifyContent={'space-between'} alignItems={'center'}>
     <Text fontWeight={'bold'} fontSize={'xl'}>Total</Text>
     <Text fontWeight={'bold'} color={"green.400"}>₹{totalprice}</Text>
     </Flex>
     <Flex justifyContent={'center'} alignItems={'center'}>
     <Button
        
           onClick={handlePlaceOrder}
           bgGradient="linear(to-r,blue.500, blue.400)"
           borderRadius={'5px'}
           color="white" // Button text color
           width={'100%'}
           height={'50px'}
           fontSize={'2xl'}
           marginTop={'10px'}
          _hover={
          {
           cursor:'pointer'
          }
          }
         >
         Place Order
         </Button> </Flex>
     </Box>
        </GridItem>
        </Grid>
        </Box>
    </div>
  )
}

export default Checkout