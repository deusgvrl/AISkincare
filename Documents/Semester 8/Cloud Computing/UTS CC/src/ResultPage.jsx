import React from 'react';
import { Box, Grid, GridItem, Heading, Image, VStack, Center } from '@chakra-ui/react';

function ResultPage() {
  // Placeholder image URLs
  const cheek1Url = "https://via.placeholder.com/150";
  const cheek2Url = "https://via.placeholder.com/150";
  const chinUrl = "https://via.placeholder.com/150";
  const foreheadUrl = "https://via.placeholder.com/150";
  const fullFaceUrl = "https://via.placeholder.com/628";

  return (
    <Box minHeight='100vh' bg='black' p='5'>
      <Center mb='4'>
        <Heading color='white' size='3xl'>
          Your Personalized Result
        </Heading>
      </Center>
      <Grid templateColumns="1fr 2fr" gap={6} alignItems="center">
        {/* Grid for smaller images */}
        <VStack spacing={2} py='5'>
          <Image src={cheek1Url} alt="Cheek 1" boxSize="150px" objectFit="cover" />
          <Image src={cheek2Url} alt="Cheek 2" boxSize="150px" objectFit="cover" />
          <Image src={chinUrl} alt="Chin" boxSize="150px" objectFit="cover" />
          <Image src={foreheadUrl} alt="Forehead" boxSize="150px" objectFit="cover" />
        </VStack>

        {/* Main picture */}
        <Image src={fullFaceUrl} alt="Full Face" boxSize="628px" objectFit="cover" />
      </Grid>
    </Box>
  );
}

export default ResultPage;
