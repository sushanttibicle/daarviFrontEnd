import { Box, Flex, Grid, GridItem, Image,Text,Button, Spinner, useToast,  Divider, Stack, StackDivider, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {BsStar,BsStarFill,BsStarHalf} from 'react-icons/bs'
import {BiMessageDetail} from 'react-icons/bi'
import WithSubnavigation from '../components/Navbar';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { AppContext } from '../components/AppContextProvider';
import { MdCheckCircle, MdLocalShipping } from "react-icons/md";
import Footer from '../components/Footer';
import config from '../config';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'
function Star({ rating }) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "#e4c72b" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf  key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar  key={i} style={{ marginLeft: "1", }} />;
        })}
    </Box>
  );
}

const SingleProductPage = () => {
  const [products,setProducts]=useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading,setLoading]=useState(false)
  const token=localStorage.getItem('token')
  const param=useParams()
  const toast = useToast();
  const navigate=useNavigate()
  const[count,setCount]=useState(0)
  const [quantity, setQuantity] = useState(1);
  const {length,Length}=useContext(AppContext)
  const id=localStorage.getItem('userid')
  const [filled, setFilled] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [hoverCount, setHoverCount] = useState(0);
  const [name,setName]=useState("")
  const [desc,setDesc]=useState("")
  const [reviewData,setReviewData]=useState([])


  const handleStarClick = (starCount) => {
    setSelectedCount(starCount);
  };

  const handleStarHover = (starCount) => {
    if (selectedCount === 0) {
      setHoverCount(starCount);
    }
  };

  const resetHoverCount = () => {
    if (selectedCount === 0) {
      setHoverCount(0);
    }
  };
  
    useEffect(()=>{
      axios.get(`${config.DEPLOYED_URL}/api/cart/cartitems/${id}`,  {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then((res)=>{
      
        Length(res.data.cartCount)
      })
     },[count,length])
  useEffect(()=>{
    setLoading(true)
    

    axios.get(`${config.DEPLOYED_URL}/api/product/allproducts/${param.id}`).then((res)=>{
      setProducts(res.data)
      if (res.data) {
        setSelectedImage(res.data.image2url);
      }
    }).finally((res)=>{
      setLoading(false)
    })

   
   
  },[])
  useEffect(()=>{
    axios.get(`${config.DEPLOYED_URL}/api/review/${param.id}`).then((res)=>{
      setReviewData(res.data)
    })
  },[count])
  console.log(reviewData)
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
   
  };
  const thumbnails = [
    
    `${products.image2url}`,
    `${products.image3url}`,
    `${products.image4url}`,
    // Add more images here
  ];
const handleCart=async()=>{
  if(token){
    await axios.post(`${config.DEPLOYED_URL}/api/cart/cartitems/addcart`, { 
      productId:products._id,
      productname:products.productname,
      category:products.category,
      price:products.price,
      rating:products.rating,
      image1url:products.image1url,
      productquantity:quantity
     }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token"),
      }
  }).then((res)=>{
    console.log(res.data.message)
  if(res.data.message==='Product added to cart'){
    toast({
      title: "Added to Cart" ,
  
      status: "success",
      duration: 3000,
      isClosable: true,
   });
   setCount(count+1)
  }else if(res.data.message==='Item already in cart'){
    toast({
      title: "Item already in cart",
      status: "warning",
      duration: 3000,
      isClosable: true,
   });
  }
  })
  }else{
    toast({
      title: "Login first" ,
  
      status: "warning",
      duration: 3000,
      isClosable: true,
   });
   navigate('/login')
   
  }
}

const handleReview = ()=>{
console.log(name,desc)
  if(desc!="" && hoverCount!=0){
    axios.post(`${config.DEPLOYED_URL}/api/review/create`,{ 
      productId:products._id,
      userId:id,
      name,
      desc,
      isReviewed:"True",
      rating:hoverCount
     }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token"),
      }}).then((res)=>{
        if(res){
          if(res.data.message=="You already reviewed"){
            toast({
              title: "You already reviewed" ,
          
              status: "warning",
              duration: 3000,
              isClosable: true,
           });
          }
          else  if(res.data.message=="Review saved successfully"){
            toast({
              title: "Thank you for your feedback" ,
          
              status: "success",
              duration: 3000,
              isClosable: true,
           })
           setCount(count+1)
          }
          else{
            toast({
              title: "Error Try after some time" ,
          
              status: "error",
              duration: 3000,
              isClosable: true,
          });
          }
      }})
    }
    else{
      toast({
        title: "Enter Feedback and Rate product" ,
    
        status: "error",
        duration: 3000,
        isClosable: true,
    });
    }
    
  }
  return (
    <Box >
      <WithSubnavigation/>
      <Box width={{base:'95%',lg:'80%'}} margin={'auto'} >
      {loading?<Box display={'flex'} justifyContent={{base:'center',lg:'center'}} marginTop={'100px'}  width={'100%'}><Spinner
  thickness='5px'
  speed='0.65s'
  emptyColor='gray.200'
  color='green.500'
  size='xl'
  
/></Box>
        : <Grid gridTemplateColumns={{base:'1fr',md:'1fr 1fr',lg:'1fr 1fr'}}  marginTop={'80px'} paddingLeft={{base:'0px',lg:'25px'}}>
         <GridItem>
         <Box mt={4}>
        {selectedImage && (
          <Image src={selectedImage} alt="Selected Image" boxSize={{base:'80%',lg:"450px"}} width={{base:'100%',lg:'400px'}}marginLeft={{base:'0px',lg:'5px'}}  borderRadius={'10px'}  />
        )}
      </Box>
          <Flex>
        {thumbnails.map((thumbnail, index) => (
          <Image
            key={index}
            src={thumbnail}
            alt={`Thumbnail ${index}`}
            cursor="pointer"
            onClick={() => setSelectedImage(thumbnail)}
            boxSize="80px"
            m={2}
            borderRadius="md"
            boxShadow={selectedImage === thumbnail ? 'md' : 'none'}
            transition="box-shadow 0.2s"
          />
        ))}
      </Flex>
      </GridItem>
         <GridItem>
          <Flex justifyContent={'space-between'}>
         <Text  as={'h1'} fontSize={{base:'4xl',lg:'5xl'}}  fontWeight={'bold'} paddingLeft={'10px'}>{products.productname}</Text>
       
         <Star rating={products.rating} />
       
       
         </Flex>
         <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Text marginTop={'-10px'} as={'h4'} fontSize={'xl'} fontWeight={'bold'} paddingLeft={'10px'} >{products.category}</Text>
         <Flex alignItems={'center'}> <BiMessageDetail/><Text>{reviewData.length} reviews</Text></Flex>
         </Flex>
         <Text as={'h2'} width={'90%'} paddingLeft={'10px'} fontSize={'2xl'} color={'gray.600'} fontWeight={'bold'}>{products.shortdescription}</Text>
          <Text as={'h2'} fontSize={'3xl'} fontWeight={'bold'} paddingLeft={'10px'}>₹{products.price}</Text>
         {/* <Text as={'h2'} width={'90%'} paddingLeft={'10px'} fontSize={'2xl'}>{products.longdescription}</Text> */}
        <Divider  paddingLeft={'10px'} marginBottom={'5px'} />
         <Flex alignItems={'center'}gap={1}  paddingLeft={'10px'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery(COD Available)</Text>
            </Flex>
            <Stack  divider={
              <StackDivider />
            }>
          
              <Image src='https://daarvipharmaceuticals.vercel.app/payments.webp' alt='we accept all payments' paddingLeft={'10px'} width={'300px'} height={'80px'}/>
           
          </Stack>
 
            <Divider  paddingLeft={'10px'} marginTop={'5px'}/>
        <Box display={'flex'} justifyContent={"flex-start"} alignItems={'center'} gap={"3px"} paddingLeft={'10px'}>
          <Button marginTop={'10px'} marginBottom={'10px'}  onClick={handleDecrease}   width={{base:'50px',lg:'20px'}} fontSize={'30px'} bgColor={'#8dc896'} fontWeight={'bold'} color={'white'} justifyContent={'center'} alignItems={'center'}>-</Button>
          <Box mx={2}>
        <Text fontSize={{base:'30px',lg:'20px'}} fontWeight={'bold'}>{quantity}</Text>
      </Box>
          <Button marginTop={'10px'} marginBottom={'10px'}  onClick={handleIncrease}   width={{base:'50px',lg:'20px'}} fontSize={'30px'} bgColor={'#8dc896'} fontWeight={'bold'} color={'white'} justifyContent={'center'} alignItems={'center'}>+</Button>
       
        </Box> 
         <Flex justifyContent={'space-between'}>
          <Box marginTop={'10px'} paddingLeft={'10px'}><Button bgColor={'#5cac60'}  _hover={
          {
           cursor:'pointer'
          }}  fontSize={'xl'}  color={'white'} fontWeight={'bold'} width={{base:'300px',md:'200px',lg:'200px'}} height={'50px'}  borderRadius={'10px'} onClick={handleCart}>Add to Cart</Button></Box>
         
          </Flex>
         </GridItem>
      </Grid>
}
<Tabs  marginTop={'30px'} width={'100%'} >
  <TabList width={'100%'}>
    <Tab _selected={{ color: 'white', bg: '#5cac60' }} fontWeight={'bold'} width={{base:'150px',lg:'200px'}} borderRadius={'5px'}>Description</Tab>
    <Tab _selected={{ color: 'white', bg: '#5cac60' }} fontWeight={'bold'} width={{base:'150px',lg:'200px'}} borderRadius={'5px'}>FAQ</Tab>
    <Tab _selected={{ color: 'white', bg: '#5cac60' }} fontWeight={'bold'} width={{base:'150px',lg:'200px'}} borderRadius={'5px'}>Reviews</Tab>
   
    </TabList>
  <TabPanels>
    <TabPanel>
     
    <Text as={'h2'} width={'90%'}  fontSize={'xl'}>{products.longdescription}</Text>
    <Text as={'h2'} width={'90%'}  fontSize={'md'} fontWeight={'bold'} marginTop={5}>Shake Well before use. Store in dry and cool place.</Text>

    <Text as={'h2'} width={'90%'}  fontSize={'xl'} fontWeight={'bold'} marginTop={5}>Direction for use {products.productname}:</Text>
    <Text as={'h2'} width={'90%'}  fontSize={'xl'} marginTop={2}>
Dosage:{products.dosage}</Text>
<Text as={'h2'} width={'90%'}  fontSize={'xl'} fontWeight={'bold'} marginTop={5}>Warning:</Text>
<Text as={'h2'} width={'90%'}  fontSize={'xl'} marginTop={2}>
{products.warning}</Text>
<Grid gridTemplateColumns={{base:'1fr',md:'1fr 1fr',lg:'1fr 1fr'}} gap={5} marginTop={4}>
  <GridItem>
    <Image src='https://daarvipharmaceuticals.vercel.app/sauf.jpg' alt='sauf image darvi'/>
    <Text as={'h2'} width={'90%'}  fontSize={'md'}  marginTop={2}>Saunf seed extracts possess strong carminative properties that 
help to relieve belching and gas. The antispasmodic action works 
to ease abdominal cramps caused due to indigestion. While it also 
controls gastric secretions that help to reduce acidic and sour 
taste in the mouth.</Text>
    
  </GridItem>
  <GridItem>
  <Image src='https://daarvipharmaceuticals.vercel.app/mulethi.jpg' alt='sauf image darvi'/>
    <Text as={'h2'} width={'90%'}  fontSize={'md'}  marginTop={2}>Mulethi is helpful in keeping your liver at its optimal best. A 
healthy liver will prevent gas or acidity formation in the stomach. 
Also, the healthy liver helps in better food absorption</Text>
    
  </GridItem>
</Grid>

    </TabPanel>
    <TabPanel>
    <Accordion>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left' fontWeight={'bold'}>
        Why Nithya Amruth ? 
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <List spacing={3}>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
    Boost Appetitie
  </ListItem>
  <ListItem>
  <ListIcon as={MdCheckCircle} color='green.500' />
   Relives Gastric Reflux
  </ListItem>
  <ListItem>
  <ListIcon as={MdCheckCircle} color='green.500' />
 Relives Acidity
  </ListItem>
  <ListItem>
  <ListIcon as={MdCheckCircle} color='green.500' />
   Cures Constipation
  </ListItem>
  <ListItem>
  <ListIcon as={MdCheckCircle} color='green.500' />
  Indigestion
  </ListItem>
  <ListItem>
  <ListIcon as={MdCheckCircle} color='green.500' />
Helps to improve immune system 
  </ListItem>
</List>
    
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
      <Box as="span" flex='1' textAlign='left' fontWeight={'bold'}>
      Why GAS O DIGI ? 
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <List spacing={3}>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
    Helpful in relieving acidity.
  </ListItem>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
    Provides relief from gas & abdominal discomfort.
  </ListItem>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
    Beneficial in bloating & heartburn.
  </ListItem>
  <ListItem>
    <ListIcon as={MdCheckCircle} color='green.500' />
    Effective in nausea & vomiting.
  </ListItem>
  </List>
   
    </AccordionPanel>
  </AccordionItem>
</Accordion>
    </TabPanel>
    <TabPanel>
      <Grid gridTemplateColumns={{base:'1fr',lg:'1fr 1fr'}} justifyContent={'center'} alignItems={'center'} gap={3}>
        <GridItem>
        <Box display={'flex'}  justifyContent={'center'}>
      {[...Array(5)].map((_, index) => (
        <Box display={'flex'}>
        <Text
          key={index}
          onMouseEnter={() => handleStarHover(index + 1)}
          onMouseLeave={resetHoverCount}
          onClick={() => handleStarClick(index + 1)}
          style={{
            fontSize: '4rem',
            cursor: 'pointer',
           
           
            color:
              selectedCount > 0
                ? index < selectedCount
                  ? 'gold'
                  : 'gray'
                : index < hoverCount
                ? 'gold'
                : 'gray'
          }}
        >
          &#9733;
        </Text>
        </Box>
      ))}
     
    </Box>
    <Box >
        <Text fontSize={'50px'} fontWeight={'bold'}   display={'flex'} justifyContent={'center'} alignItems={'center'}> {selectedCount > 0 ? selectedCount : hoverCount}</Text>
      </Box>
        </GridItem>
        <GridItem>
           
           
            <Textarea placeholder='Write Review here' value={desc} marginTop={'10px'} border={'1px solid gray'}  onChange={(e)=>setDesc(e.target.value)}/>

          <Button marginTop={'10px'} color={'white'} bgColor={'#5cac60'}  _hover={
          {
           cursor:'pointer'
          }}  onClick={handleReview}>Submit</Button>
        </GridItem>
      </Grid>
    
    </TabPanel>
   
  </TabPanels>
</Tabs>
<Box>
 
{
  reviewData.map((el)=>(
    <Box
    display="inline-block"
    position="relative"
    borderRadius={'5px'}
    overflow="hidden"
   width={{base:'97%',lg:'97%'}}
   height={{base:'auto',lg:'auto'}}
    transition="transform 0.3s"
    
    _hover={{
      transform: "scale(1.02)",
    }}
    marginBottom={'10px'}
  >
    <Grid gridTemplateColumns={'20% 80%'} gap={2} padding={5} justifyContent={'center'} alignItems={'center'}>
        <GridItem justifyContent={'center'} alignItems={'center'} margin={'auto'}><Image src="https://daarvipharmaceuticals.vercel.app/darvi.png" alt="Darvi"  width={'100%'}   /></GridItem>
        <GridItem>
        <Star rating={el.rating} />
        {el.desc}
 <Text fontWeight={'bold'}>{el.name}</Text>
 
        </GridItem>
    </Grid>
 
  </Box>
  ))
}
</Box>
      </Box>
      <Footer/>
    </Box>
  )
}

export default SingleProductPage