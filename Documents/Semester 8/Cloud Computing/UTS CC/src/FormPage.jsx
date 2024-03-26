import React, { useState } from 'react';
import { Box, VStack, Input, FormControl, FormLabel, Button, Textarea, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, push } from 'firebase/database'; // Import database functions
import app from './firebase'; // Import the Firebase app instance

function FormPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skinCondition, setSkinCondition] = useState('');
  const database = getDatabase(app); // Get database reference

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const userData = {
      name: name,
      email: email,
      skinCondition: skinCondition
    };

    // Mendapatkan referensi database untuk menyimpan data pengguna
    const userRef = ref(database, 'users'); // Sesuaikan dengan path di Firebase Database

    try {
      // Menyimpan data pengguna ke Firebase Database
      await push(userRef, userData);
      navigate('/result');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <Box display='flex' py='2' bg='white' minHeight='100vh' justifyContent='center' alignContent='center'>
      <VStack spacing={4} as="form" onSubmit={handleSubmitForm}>
        <Heading size='2xl' color='black' py='4'>
          Tell us about yourself
        </Heading>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>About Your Skin Condition</FormLabel>
          <Textarea placeholder="Describe your skin condition" value={skinCondition} onChange={(e) => setSkinCondition(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue">Submit Form</Button>
      </VStack>
    </Box>
  );
}

export default FormPage;
