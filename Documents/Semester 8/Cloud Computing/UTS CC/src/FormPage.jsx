import React, { useState } from 'react';
import { Box, VStack, Input, FormControl, FormLabel, Button, Textarea, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, push } from 'firebase/database'; // Import database functions
import app from './firebase'; // Import the Firebase app instance
import { motion } from 'framer-motion';

const animationDuration = 1;
const delayIncrement = 0.2;

function FormPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skinCondition, setSkinCondition] = useState('');
  const database = getDatabase(app); // Get database reference

  const motionProps = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: animationDuration },
  };

  const headingDelay = delayIncrement;
  const inputDelay = headingDelay + delayIncrement;
  const buttonDelay = inputDelay + delayIncrement * 2;

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const userData = {
      name: name,
      email: email,
      skinCondition: skinCondition
    };

    const userRef = ref(database, 'users');

    try {
      await push(userRef, userData);
      navigate('/result');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box display='flex' py='4' bg='black' minHeight='100vh' justifyContent='center' alignContent='center'>
        <VStack spacing={4} as="form" onSubmit={handleSubmitForm}>
          <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: headingDelay }}>
            <Heading size='2xl' color='white' py='4'>
              Tell us about yourself
            </Heading>
          </motion.div>
          <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: inputDelay }}>
            <FormControl isRequired py='2'>
              <FormLabel color='white'>Name</FormLabel>
              <Input style={{ width:'500px'}} textColor='white' placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
          </motion.div>
          <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: inputDelay }}>
            <FormControl isRequired py='2'>
              <FormLabel color='white'>Email</FormLabel>
              <Input style={{ width:'500px'}} textColor='white' type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
          </motion.div>
          <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: inputDelay }}>
            <FormControl isRequired py='2'>
              <FormLabel color='white'>About Your Skin Condition</FormLabel>
              <Textarea  style={{ width:'500px'}} textColor='white' placeholder="Describe your skin condition" value={skinCondition} onChange={(e) => setSkinCondition(e.target.value)} />
            </FormControl>
          </motion.div>
          <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: buttonDelay }}>
            <Button type="submit" colorScheme="blue">Submit Form</Button>
          </motion.div>
        </VStack>
      </Box>
    </motion.div>
  );
}

export default FormPage;
