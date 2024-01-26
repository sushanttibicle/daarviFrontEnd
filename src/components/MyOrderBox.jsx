import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import React from 'react'

const MyOrderBox = ({order}) => {
  return (
    <div>
    <Box width={'80%'} margin={'auto'} border={'1px'}>
        <Grid>
            <GridItem>
                <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
                 <Box>
                 <Text fontSize={'xl'} fontWeight={'bold'}> Order Id</Text> 
                 <Text fontSize={'md'}>{order._id}</Text>
                </Box>
                    <Box>
                     <Text fontSize={'xl'} fontWeight={'bold'}> Order Date</Text>
                     <Text fontSize={'md'}> {new Date(order.orderDate).toLocaleString()}</Text>
                    </Box>
                   
                    <Box>
                    
                    </Box>

                </Box>

            </GridItem>
            <GridItem>
                
            </GridItem>
        </Grid>
    </Box>
    </div>
  )
}

export default MyOrderBox