import React from 'react';
import { Box, Grid, GridItem, Heading, Image, VStack, Center } from '@chakra-ui/react';

function ResultPage() {
  // Placeholder image URLs
  const cheek1Url = "https://via.placeholder.com/200";
  const cheek2Url = "https://via.placeholder.com/200";
  const chinUrl = "https://via.placeholder.com/200";
  const foreheadUrl = "https://via.placeholder.com/200";
  const fullFaceUrl = "https://via.placeholder.com/412";

  return (
    <Box minHeight='100vh' bg='black' p='5'>
      <Center mb='8'>
        <Heading color='white' size='3xl'>
          Your Personalized Result
        </Heading>
      </Center>
      <Grid templateColumns="1fr 2fr 1fr" gap={6} alignItems="center" mx='180px'>
        {/* Grid for smaller images on the left */}
        <VStack spacing={3}>
          <Image src={cheek1Url} alt="Cheek 1" boxSize="200px" objectFit="cover" />
          <Image src={cheek2Url} alt="Cheek 2" boxSize="200px" objectFit="cover" />
        </VStack>

        {/* Main picture */}
        <Center>
          <Image src={fullFaceUrl} alt="Full Face" boxSize="412px" objectFit="cover" />
        </Center>

        {/* Grid for smaller images on the right */}
        <VStack spacing={2}>
          <Image src={chinUrl} alt="Chin" boxSize="200px" objectFit="cover" />
          <Image src={foreheadUrl} alt="Forehead" boxSize="200px" objectFit="cover" />
        </VStack>
      </Grid>
    </Box>
  );
}

export default ResultPage;
