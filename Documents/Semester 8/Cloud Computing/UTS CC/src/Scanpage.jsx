import React, { useState, useRef } from 'react';
import {
  Box, Button, VStack, Image, useDisclosure, Modal,
  ModalOverlay, ModalContent, ModalBody, ModalFooter,
  Input, Heading, Spinner, Text, ButtonGroup
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadString } from 'firebase/storage'; // Import storage functions
import app from './firebase'; // Import the Firebase app instance
import { motion } from 'framer-motion';

const animationDuration = 1; 
const delayIncrement = 0.2;

function ScanPage() {
  const [imageSrc, setImageSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen: isOpenCamera, onOpen: onOpenCamera, onClose: onCloseCamera } = useDisclosure();
  const { isOpen: isOpenUpload, onOpen: onOpenUpload, onClose: onCloseUpload } = useDisclosure();
  const videoRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const storage = getStorage(app); // Get storage reference

  const motionProps = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: animationDuration },
  };

  const headingDelay = delayIncrement;
  const textDelay = headingDelay + delayIncrement;
  const buttonDelay = textDelay + delayIncrement * 2;

  const handleSubmit = async () => {
    if (imageSrc) {
      const storageRef = ref(storage, 'images/' + Date.now()); // Define storage reference
      await uploadString(storageRef, imageSrc, 'data_url'); // Upload image
      navigate('/form');
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box minHeight="100vh" bg="black" p="5" color="white">
        <VStack spacing="4" textAlign="center">
          <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: headingDelay }}>
            <Heading as="h1" fontSize="6xl">
              Upload your Photo!
            </Heading>
          </motion.div>
          <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: textDelay }}>
            <Text fontSize="xl" color="whiteAlpha.600" mb="1px">
              Please select the options below.
            </Text>
          </motion.div>
          <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: textDelay }}>
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
          </motion.div>
          {isLoading ? (
            <Spinner size="xl" />
          ) : (
            imageSrc && (
              <>
                <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: buttonDelay }}>
                  <Box border="2px" borderColor="yellow.200" borderRadius="lg" overflow="hidden" maxW='sm'>
                    <Image 
                      src={imageSrc} 
                      alt="Uploaded or Captured" 
                      objectFit="contain" // This ensures the image is scaled correctly within its box
                      boxSize="100%" // This will make the image as large as its container
                    />
                  </Box>
                </motion.div>
                <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: buttonDelay }}>
                  <Button onClick={() => setImageSrc('')}>Retake/Re-upload</Button>
                </motion.div>
                <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: buttonDelay }}>
                  <Button onClick={handleSubmit}>Submit</Button>
                </motion.div>
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
    </motion.div>
  );
}

export default ScanPage;
