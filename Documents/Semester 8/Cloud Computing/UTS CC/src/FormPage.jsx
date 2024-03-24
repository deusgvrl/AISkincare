import React from 'react';
import {
  Box, VStack, Input, FormControl, FormLabel, Button, Textarea, Heading
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const navigate = useNavigate();

  const handleSubmitForm = (event) => {
    event.preventDefault();
    // Here, you would typically validate the form fields, 
    // process form submission, maybe update state or call a backend API.
    // After successful form submission or processing, navigate to the results page.
    navigate('/result');
  };

  return (
    <Box display='flex' py='2' bg='white' minHeight='100vh' justifyContent='center' alignContent='center'>
      <VStack spacing={4} as="form" onSubmit={handleSubmitForm}>
        <Heading size='2xl' color='black' py='4'>
          Tell us about yourself
        </Heading>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Your name" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Your email address" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>About Your Skin Condition</FormLabel>
          <Textarea placeholder="Describe your skin condition" />
        </FormControl>
        {/* Removed onClick from Button, as onSubmit in the form is sufficient */}
        <Button type="submit" colorScheme="blue">Submit Form</Button>
      </VStack>
    </Box>
  );
}

export default FormPage;
