import React from 'react';
import { motion } from 'framer-motion';
import { Box, VStack, Text, Button, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const animationDuration = 1; 
const delayIncrement = 0.2;

function HomePage() {

  const motionProps = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: animationDuration },
  };

  const headingDelay = 0.2;
  const textDelay = headingDelay + delayIncrement;
  const projectDelay = textDelay + delayIncrement;
  const buttonDelay = projectDelay + delayIncrement;

  return (
    <Box minHeight="100vh" bg="black" p="5" color="white">
      <VStack spacing="4" textAlign="center">
        <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: headingDelay }}>
          <Heading as="h1" fontSize="6xl" maxW="lg">
            Skincare Recommendation with Face Detection AI
          </Heading>
        </motion.div>
        <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: textDelay }}>
          <Text fontSize="2xl" color="whiteAlpha.600" mb="1px">
            Personalizing your AI-Inspired Recommendations!
          </Text>
        </motion.div>
        <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: projectDelay }}>
          <Text fontSize="xl" color="whiteAlpha.600">
            A Project by Kelompok 2.
          </Text>
        </motion.div>
        <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: buttonDelay }}>
          <Button as={RouterLink} to="/scan" variant="outline" color="white" borderColor="yellow.200" _hover={{ bg: 'whiteAlpha.500' }}>
            Try Now!
          </Button>
        </motion.div>
      </VStack>
    </Box>
  );
}

export default HomePage;
