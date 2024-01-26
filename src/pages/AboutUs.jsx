import React from 'react'
import {Box, Grid, GridItem, Image, Text}from '@chakra-ui/react'
import WithSubnavigation from '../components/Navbar'
import Footer from '../components/Footer'
const AboutUs = () => {
  return (
    <Box>
         <WithSubnavigation/>
         <Box className='outerbox2' marginTop={'90px'} color={'white'} height={{base:'auto',lg:'100vh'}} marginBottom={'30px'}>
           <Grid gridTemplateColumns={{base:'1fr',md:'1fr',lg:'60% 40%'}} padding={'10px'}  justifyContent={'center'} alignItems={'center'}>
            <GridItem  >
            <Text paddingTop={{base:'50px',md:'50px',lg:'100px'}} fontSize={{base:'3rem',md:'3rem',lg:'4rem'}} fontWeight={'bold'}>About Us...!</Text>
            <Text fontSize={{base:'xl',md:'2xl',lg:'2xl'}}>Namskara A proud Karnataka kannadiga startup was DAARVI PHARMACEUTICALS  our product has to reach all over the world where kannadiga resides. 
            Due to lack of quality issue of Ayurvedic product in market  we came with high quality and very effective product which efficacy at its best use our product and take benefit of our ancient medicine
</Text>
<Text fontSize={{base:'xl',md:'2xl',lg:'2xl'}}>Daarvi pharmaceuticals 
Division of sgm pharmaceuticals 
With a slogan of 
ADD ANCIENT MEDI TO YOUR LIFE 
Deals in ayurvedic medicines 
IT BETTER TO USE OUR ANCIENT MEDICINE COMPARE TO MODERN MEDICINE PRACTICE

</Text>
            </GridItem>
            <GridItem> <Box paddingTop={{base:'50px',md:'50px',lg:'100px'}}>
        <Image src="./darviMD.jpg" alt="darvi md and ceo" margin={'auto'}  height={'300px'} borderRadius={'10px'}/>
        <Text fontWeight={'bold'} textAlign={'center'}>NAVEEN KUMAR M ( B pharm)
FOUNDER & MD
</Text>
    </Box></GridItem>
           </Grid>
           
           
           
 </Box>
<Footer/>
    </Box>
  )
}

export default AboutUs