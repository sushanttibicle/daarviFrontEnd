import { Box, Button, Flex, Grid, GridItem, Image, Spinner, Text } from "@chakra-ui/react";
import "../App.css";
import WithSubnavigation from "../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TestimonialCarousel from "../components/Testimonials";
import Footer from "../components/Footer";
import ImageFader from "../components/ImageFader";
import { BiMessageDetail } from "react-icons/bi";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import CardCarousel from "../components/CardCarousel";
import config from "../config";
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
const Home = () => {
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    
    setLoading(true)

    axios.get(`${config.DEPLOYED_URL}/api/product/allproducts`).then((res)=>{
     
      setProducts(res.data)
     
    }).finally((res)=>{
      setLoading(false)
    })
  },[])
  const imageUrls = ['./womenstomach.webp', './womendaarvi.webp']; // Replace with your image URLs

  return (
    <div className="App">
      <Box style={{ position: "relative" }} height={"100vh"}>
        <Box
          className="navbar"
          style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2 }}
        >
          <WithSubnavigation />
        </Box>
        <Box className="vector">
          <Image src="./p2.webp" />
        </Box>
        <Box className="image">
        <ImageFader
        images={imageUrls}
        width={{base:'370px',lg:'500px'}}
        height={{base:'370px',lg:'500px'}}
        interval={5000} // 1 second interval
      />
        </Box>
       
        <Box className="box">
          <h1 className="h1">Digestive Health</h1>
          <Image
            src="./Frame23.png"
            width={{ base: "90%", lg: "50%" }}
            className="h11"
          />
          <Link to="/products_page">
            <Button
              backgroundColor={"#345b22"}
              color={"white"}
              fontWeight={"bold"}
              borderRadius={"10px"}
              className="h12"
            >
              Shop Now
            </Button>
          </Link>
        </Box>
      </Box>
      <Image src="./group.webp" alt="darvi"   display={{ base: "none", lg: "block" }}/>

      <Image
        display={{ base: "block", lg: "none" }}
        src="./component1.webp"
      
        alt="darvi web vector image"
      />
      <Image
        display={{ base: "block", lg: "none" }}
        src="./group108.png"
        marginTop={"10px"}
        alt="darvi web vector image"
      />
      <Text
        textAlign={"center"}
        fontSize={{ base: "30px", lg: "40px" }}
        marginTop={{ base: "10px", lg: "10px" }}
        fontWeight={"bold"}
      >
        Our Products
      </Text>
      {/* <Grid
        gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        justifyContent={"center"}
        alignItems={"center"}
        gap={{ base: "5px", lg: "10px" }}
      >
        <GridItem width={{base:'95%',lg:"80%"}} borderRadius={"10px"}>
          <Grid
            gridTemplateColumns={"1fr 1fr"}
            justifyContent={"center"}
            alignItems={"center"}
           // className="gradient-bg"
            borderRadius={"10px"}
            
          >
            <GridItem>
              <Image
                src="./gasodigi5.webp"
                alt="gas o digi"
                width={"80%"}
                transform="rotate(-1.5deg)"
              />
            </GridItem>
            <GridItem >
            <Flex justifyContent={'space-between'}>
            <Text  as={'h1'} fontSize={{base:'2xl',lg:'3xl'}}  fontWeight={'bold'} paddingLeft={'10px'}>Gas O Digi</Text>
       
    
     
     
       </Flex>
       <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text marginTop={'-10px'} as={'h4'} fontSize={'xl'} fontWeight={'bold'} paddingLeft={'10px'} >Syrup</Text>
       <Flex alignItems={'center'}>   <Star rating={5} /></Flex>
       </Flex>
       <Text as={'h2'} width={'90%'} paddingLeft={'10px'} fontSize={'md'}>Acid Neutralizer, Digestion & Metabolism Booster</Text>
        <Text as={'h2'} fontSize={'3xl'} fontWeight={'bold'} paddingLeft={'10px'}>₹145</Text>
        

              <Box marginTop={"10px"} paddingLeft={"10px"}>
                <Link to="/products_page">
                <Text fontWeight={'bold'} fontSize={'lg'} textDecoration={'underline'}>view more</Text>
                </Link>
              </Box>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem  width={{base:'95%',lg:"80%"}}>
          <Grid
            gridTemplateColumns={"1fr 1fr"}
            justifyContent={"center"}
            alignItems={"center"}
         //   className="gradient-bg"
            borderRadius={"10px"}
          >
            <GridItem>
              <Image
                src="./nithya5.webp"
                alt="Nithya"
                width={"80%"}
                transform="rotate(-1.5deg)"
              />
            </GridItem>
            <GridItem>
            <Flex justifyContent={'space-between'}>
            <Text  as={'h1'} fontSize={{base:'2xl',lg:'3xl'}}  fontWeight={'bold'} paddingLeft={'10px'}>Nithya Amruth</Text>
       
      
     
     
       </Flex>
       <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text marginTop={'-10px'} as={'h4'} fontSize={'xl'} fontWeight={'bold'} paddingLeft={'10px'} >Syrup</Text>
       <Flex alignItems={'center'}>  <Star rating={5} /></Flex>
       </Flex>
       <Text as={'h2'} width={'90%'} paddingLeft={'10px'} fontSize={'md'}>Useful in Digestion Diorders & Acidity</Text>
        <Text as={'h2'} fontSize={'3xl'} fontWeight={'bold'} paddingLeft={'10px'}>₹145</Text>
        

              <Box marginTop={"10px"} paddingLeft={"10px"}>
              <Link to="/products_page">
              <Text fontWeight={'bold'} fontSize={'lg'} textDecoration={'underline'}>view more</Text>
               
                </Link>
              </Box>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid> */}
       <Box>
      <Grid gridTemplateColumns={{base:'1fr',lg:'1fr 1fr' }}   justifyContent={"center"}
        alignItems={"center"}
        gap={{ base: "5px", lg: "10px" }}>
        {loading?<Box display={'flex'} justifyContent={{base:'center',lg:'flex-end'}} marginTop={'10px'}  width={'100%'}>
          <Spinner
  thickness='5px'
  speed='0.65s'
  emptyColor='gray.200'
  color='green.500'
  size='xl'
  
/></Box>
        : products.map((e)=>(
      <Box width={{base:'90%',lg:'350px'}} height={'auto'} margin={'auto'} key={e._id}>
         <Link to={`/products_page/${e._id}`}>
          <Image  height={{base:'320px',lg:'350px'}} margin={'auto'} src={e.image1url} transform="rotate(-2deg)"/>
          <Text as={'h1'} fontSize={{base:'2xl',lg:'3xl'}}  fontWeight={'bold'} paddingLeft={'10px'}>{e.productname}</Text>
          <Text marginTop={'-10px'} as={'h4'} fontSize={'xl'} fontWeight={'bold'} paddingLeft={'10px'}>{e.category}</Text>
          <Text as={'h2'} fontSize={'3xl'} fontWeight={'bold'} paddingLeft={'10px'}>₹{e.price}</Text>
          <Box paddingLeft={'10px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}><Star rating={e.rating} /><Text fontWeight={'bold'} textDecoration={'underline'}>view more</Text></Box>
         
          </Link>
       </Box>
    
          ))
        }
       
      

       </Grid>
    
     </Box>
      {/* <TestimonialCarousel /> */}
      <Text textAlign={'center'} fontSize={{base:'30px',lg:'40px'}}  marginTop={"25px"}  fontWeight={'bold'}>Our Patients Says</Text>
     
      <CardCarousel/>
      <Box display={{ base: "none", lg: "block" }} marginTop={"25px"} marginBottom={'20px'}>
        <Image
          src="./features1.webp"
          margin={"auto"}
          alt="darvi web vector image"
        />
      </Box>
      <Box
        display={{ base: "block", lg: "none" }}
        marginTop={"25px"}
        backgroundColor={"d9d9d9"}
      >
        <Image src="./features2.png" alt="darvi web vector image" marginBottom={'20px'}/>
      </Box>
      <Footer />
    </div>
  );
};

export default Home;
