import React from 'react';
import { Box, Flex, Link, Spacer, Image, HStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  return (
    <motion.div
      className="navbar"
      initial="page-enter"
      animate="page-enter-active"
      exit="page-exit"
    >

      <Box bg="black" py="3" borderBottom="1px" px={6}>
        <Flex justify="space-between" align="center">
          {/* Icon/Image */}
          <Image marginLeft={450} src="/face-recognition.svg" boxSize="40px" alt="Logo" />

          {/* Spacer to ensure links stay centered */}
          <Spacer />

          {/* Navigation Links */}
          <HStack justify="center" position="absolute" left="0" right="0" spacing={6} >
            <Link as={RouterLink} to="/" color="white" fontWeight="bold" px="2" fontSize="lg" _hover={{ color: "yellow.200" }}>
              Home
            </Link>
            <Link as={RouterLink} to="/scan" color="white" fontWeight="bold" px="2" fontSize="lg" _hover={{ color: "yellow.200" }}>
              Scan
            </Link>
          </HStack>

          {/* This Spacer is needed to balance the layout */}
          <Spacer />
        </Flex>
      </Box>
    </motion.div>
  );
}

export default Navbar;
