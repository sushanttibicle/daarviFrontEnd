import { Box, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

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
const CardCarousel = () => {
    const images = [
        {
            image:"./curntainnew.jpg",
            text:'carpet',
            href:"/carpets"

        },
        {
            image:"./blends.jpg",
            text:'Blends collection',
            href:"/blinds"
        },
        {
          image:"./flooring4.jpg",
          text:'Wooden Flooring',
          href:"/flooring"
      },
      {
        image:"./carpets1.jpg",
        text:'Carpet Colections',
        href:"/carpets"
    },
        ,
        {
            image:"./curtainimg.jpg",
            text:'Curtains',
            href:"/curtains"
        }, {
          image:"./wallpaper3.jpg",
          text:'3D wallpaper',
          href:"/wallpapers"

      },
        {
            image:"./carpet.jpg",
            text:'carpet',
            href:"/carpets"
        }, {
          image:"./flooring3.jpg",
          text:'Wooden Flooring',
          href:"/flooring"
      },
      {
        image:"https://github.com/sushantshekhar82/maayaImages/raw/main/blinds.jpg",
        text:'Blinds',
        href:"/blinds"
    },
        {
          image:"./kidswallpaper.jpg",
          text:'Kids Collection Wallpaper',
          href:"/wallpapers"
      },
      {
          image:"./sofa.jpg",
          text:'Sofa',
          href:"/sofa"
      }
           
      ];
      
      const review = [
        {
            
            desc:"Very good product, please use it for 3 months and after that stop taking it for few months then it works better",
            user:"Kishor kumar",
            star:4,

        },
        {
            
            desc:"I am taking from past 3 weeks. It has relieved me of acidic b burps and heartburn. As suggested in it. I have also stopped consuming chicken and curd.Planning to complete the course of 3 months",
            user:"Somnath",
            star:5,

        },
        {
            
            desc:"Amazing for settling stomach upsets. Great product for controlling acidity and heartburn. Very natural and side effects free",
            user:"Chaitanya",
            star:5,

        },
        {
            
            desc:"Good Product for bloating and acitdity. I want to rate this 5 star because of tis amazing anti acitidy benfits",
            user:"Rakesh Mishra",
            star:4,

        },
        {
            
            desc:"It works, If you have persistent tummy issues there here is a product that acutally works.",
            user:"Rubina Khatun",
            star:5,

        },
        {
            
            desc:"Truly effective and eventually relief. Overall am happy to consume this rather going for other medicines",
            user:"Leela krishna",
            star:4,

        },
        {
            
            desc:"Very effective for acidity, I have acidity issue since long, and also I am a foodie so I have been using this tonic and it has helped me a lot. It has no side effects.",
            user:"Manali Bhanushali",
            star:5,

        },
        {
            
            desc:"Good product, bitter taste but it really works for digestion. I hope they will continue to maintain the quality",
            user:"Krant Kumar",
            star:5,

        },
        {
            
            desc:"Good natural medicine drink.This is good natural medicine  and it also contain alovera. use it for 3 months atleast",
            user:"Ranjit singh",
            star:4,

        }
        ,
        {
            
            desc:"Best medicine, I had tried lot of medicine including alopathy none of then reduce my acidity .First time I use this it gives amazing result.",
            user:"Rubina Khatun",
            star:5,

        }
        
      ]
      const [isHovered, setIsHovered] = useState(false);

      const handleHover = () => {
        setIsHovered(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
      };
      const carouselRef = useRef(null);
  return (
    <Box marginTop={'5px'} >
        <Carousel responsive={responsive}
       infinite={true}
       ref={carouselRef}
       autoPlay 
       autoPlaySpeed={2000}
       arrows={false}
        >
       
  {review.map((el, index) => (
    <Box>
     
    <Box
    display="inline-block"
    position="relative"
    borderRadius={'5px'}
    overflow="hidden"
   
    width={{base:'97%',lg:'97%'}}
   height={{base:'auto',lg:'auto'}}
    transition="transform 0.3s"
    onMouseEnter={handleHover}
    onMouseLeave={handleMouseLeave}
    _hover={{
      transform: "scale(1.02)",
    }}
    marginBottom={'10px'}
  >
    <Grid gridTemplateColumns={'20% 80%'} gap={2} padding={5} justifyContent={'center'} alignItems={'center'}>
        <GridItem><Image src="https://daarvipharmaceuticals.vercel.app/darvi.png" alt="Darvi"  width={'100%'}  transform="rotate(90deg)"/></GridItem>
        <GridItem>
        <Star rating={el.star} />
        {el.desc}
 <Text fontWeight={'bold'}>{el.user}</Text>
 
        </GridItem>
    </Grid>
 
  </Box>
  
  </Box>
  ))}


 
 
</Carousel>
    </Box>
  )
}

export default CardCarousel