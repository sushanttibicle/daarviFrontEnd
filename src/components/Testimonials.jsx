import { Box, Text } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const TestimonialCarousel = () => {
  return (
    <Box maxWidth={{base:'95%',lg:'50%'}} height={{base:'auto',lg:'auto'}} paddingTop={'70px'} margin="auto">
       <Text textAlign={'center'} fontSize={{base:'30px',lg:'40px'}}  fontWeight={'bold'}>Our Patients Says</Text>
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        autoPlay
        interval={5000}
        infiniteLoop
        swipeable
      >
        <Box p={4}  rounded="md" fontStyle={'italic'}>
          <Text fontSize="lg">"Looking for a place to have some best medicine for stocmach and finally got.😊"<b>-Joyis Jose</b></Text>
        </Box>
        <Box p={4}  rounded="md" fontStyle={'italic'}>
          <Text fontSize="lg">"Looking for a place to have some best medicine for stocmach and finally got.😊"<b>-Joel Joy</b></Text>
        </Box>
        <Box p={4}  rounded="md" fontStyle={'italic'}>
          <Text fontSize="lg">"Looking for a place to have some best medicine for stocmach and finally got.😊"<b>-Nishant Manoj</b></Text>
        </Box>
        <Box p={4}  rounded="md" fontStyle={'italic'}>
          <Text fontSize="lg">
          "Looking for a place to have some best medicine for stocmach and finally got.😊"<b>-shijil v.p</b>
            </Text>
          </Box>
          <Box p={4}  rounded="md" fontStyle={'italic'}>
          <Text fontSize="lg">
          "Looking for a place to have some best medicine for stocmach and finally got.😊"<b>-ALPH PLSY</b>
            </Text>
          </Box>
          <Box p={4}  rounded="md" fontStyle={'italic'}>
          <Text fontSize="lg">
          "Looking for a place to have some best medicine for stocmach and finally got.😊"<b>-gskeiyu 029</b>
            </Text>
          </Box>
          
      </Carousel>
    </Box>
  );
};

export default TestimonialCarousel;