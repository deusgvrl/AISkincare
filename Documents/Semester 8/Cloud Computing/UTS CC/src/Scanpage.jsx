import React, { useState, useRef } from 'react';
import {
  Box, Button, VStack, Image, useDisclosure, Modal,
  ModalOverlay, ModalContent, ModalBody, ModalFooter,
  Input, Heading, Spinner, Text, ButtonGroup
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


function ScanPage() {
  const [imageSrc, setImageSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const { isOpen: isOpenCamera, onOpen: onOpenCamera, onClose: onCloseCamera } = useDisclosure();
  const { isOpen: isOpenUpload, onOpen: onOpenUpload, onClose: onCloseUpload } = useDisclosure();
  const videoRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (imageSrc) {
      navigate('/form'); // Change '/form' to your form page's path
    } else {
      alert('Please upload a photo before submitting.');
    }
  };

  const handleCameraClick = () => {
    onOpenCamera();
    setIsLoading(true); // Start loading
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsLoading(false); // End loading
      })
      .catch(console.error); // Handle errors properly in production
  };

  const capturePhoto = () => {
    setIsLoading(true); // Start loading
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL();
    setImageSrc(dataURL);
    setIsLoading(false); // End loading
    videoRef.current.srcObject.getTracks().forEach(track => track.stop()); // Stop the camera
    onCloseCamera();
  };

  const handleFileChange = (event) => {
    setIsLoading(true); // Start loading
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setIsLoading(false); // End loading
    };
    reader.readAsDataURL(file);
    onCloseUpload();
  };

  return (
    <Box display='flex' py='2' bg='black' minHeight='100vh' justifyContent='center' alignContent='center'>
      <VStack spacing={4}>
        <Heading size='3xl' color='white' paddingTop={2} paddingBottom={2}>
          Upload your Photo!
        </Heading>
        <Text fontSize='2xl' color='whiteAlpha.600' py='1'>
          Please select the options below.
        </Text>
        <Box display='grid' gridTemplateRows='repeat(2, 1fr)' gap={3}>
          <ButtonGroup  variant="outline" spacing={2}>
            <Button
              borderColor="yellow.200"
              textColor="white"
              _hover={{
                background: "transparent",
                borderColor: "white",
                textDecoration: "underline",
              }}
              onClick={onOpenUpload}
            >
              Upload Photo
            </Button>
            <Button
              borderColor="yellow.200"
              textColor="white"
              _hover={{
                background: "transparent",
                borderColor: "white",
                textDecoration: "underline",
              }}
              onClick={handleCameraClick}
            >
              Use Webcam
            </Button>
          </ButtonGroup>
        </Box>
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          imageSrc && (
            <>
            <Box border="2px" borderColor="yellow.200" borderRadius="lg" overflow="hidden" maxW='sm'>
              <Image 
                src={imageSrc} 
                alt="Uploaded or Captured" 
                objectFit="contain" // This ensures the image is scaled correctly within its box
                boxSize="100%" // This will make the image as large as its container
              />
            </Box>
            <Button onClick={() => setImageSrc('')}>Retake/Re-upload</Button>
            <Button onClick={handleSubmit}>Submit</Button>
            </>
          )
        )}
        <Modal isOpen={isOpenCamera} onClose={onCloseCamera}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody p={6}>
              <video ref={videoRef} autoPlay playsInline style={{ width: '100%', marginTop: '10px' }}></video>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={capturePhoto}>Capture</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Upload Modal */}
        <Modal isOpen={isOpenUpload} onClose={onCloseUpload}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody p={6}>
              <Input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
}

export default ScanPage;