import { Box, HStack, Link, Text, VStack, Button, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function HomePage() {
    return (
      <>
        <Box bg='black' py='4'>
        <VStack spacing='7' color='white' textAlign='center'>
          <Heading as="h1" fontSize='6xl' maxW='lg'>
            Skincare Recommendation with </Heading>
          
        <Box 
        as='span' 
        bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
        bgClip='text' 
        fontSize='5xl' 
        fontWeight='bold' 
        marginTop='-40px'
        marginBottom='-28px'
        >
          Face Detection AI
        </Box>
        <Box marginTop='30px'>
          <Text color='whiteAlpha.600' fontSize='2xl' marginBottom='14px'> {/* Adjust the marginBottom value as needed */}
            Personalizing your AI-Inspired Recommendations!
          </Text>
          <Text color='whiteAlpha.600' fontSize='xl'>
            A Project by Kelompok 2.
          </Text>
        </Box>

        <Button as={RouterLink} to='/scan' variant='outline' color='white' borderColor='yellow.200' _hover={{
          bg:'whiteAlpha.500'
        }}>
          Try Now!
        </Button>
        </VStack>
      </Box>
      </>
    );
  }
  
  export default HomePage;
  