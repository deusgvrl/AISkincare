import React from 'react';
import { Box, Flex, Link, Spacer, Image, HStack, Center } from '@chakra-ui/react';
import { Router, Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
      <Box bg="black" py="3" borderBottom="1px" px={6}>
        <Flex justify="space-between" align="center">
          <Center paddingRight='450px'>

          <RouterLink to="/">
            <Image marginLeft={450} src="/face-recognition.svg" boxSize="40px" alt="Logo" />
          </RouterLink>
          </Center>

          <Center>
          <HStack justify="center" position="absolute" left="0" right="0" spacing={6} >
            <Link as={RouterLink} to="/" color="white" fontWeight="bold" px="2" fontSize="lg" _hover={{ color: "yellow.200" }}>
              Home
            </Link>
            <Link as={RouterLink} to="/scan" color="white" fontWeight="bold" px="2" fontSize="lg" _hover={{ color: "yellow.200" }}>
              Scan
            </Link>
          </HStack>
          </Center>
        </Flex>
      </Box>
  );
}

export default Navbar;
