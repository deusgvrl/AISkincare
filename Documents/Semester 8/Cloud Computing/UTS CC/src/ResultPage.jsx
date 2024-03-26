import React, { useEffect, useState } from 'react';
import { Box, Grid, VStack, Image, Center, Heading } from '@chakra-ui/react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import app from './firebase';
import { motion } from 'framer-motion';

const animationDuration = 1; 
const delayIncrement = 0.2;

function ResultPage() {
  const [cheek1Url, setCheek1Url] = useState('');
  const [cheek2Url, setCheek2Url] = useState('');
  const [chinUrl, setChinUrl] = useState('');
  const [foreheadUrl, setForeheadUrl] = useState('');
  const [fullFaceUrl, setFullFaceUrl] = useState('');
  
  useEffect(() => {
    const storage = getStorage(app);

    // Fetch and set the download URLs for the images
    const fetchImages = async () => {
      try {
        const cheek1Ref = ref(storage, 'cheek1.jpg'); // Update with the path to the image in Firebase Storage
        const cheek2Ref = ref(storage, 'cheek2.jpg');
        const chinRef = ref(storage, 'chin.jpg');
        const foreheadRef = ref(storage, 'forehead.jpg');
        const fullFaceRef = ref(storage, 'fullFace.jpg');

        const cheek1Url = await getDownloadURL(cheek1Ref);
        const cheek2Url = await getDownloadURL(cheek2Ref);
        const chinUrl = await getDownloadURL(chinRef);
        const foreheadUrl = await getDownloadURL(foreheadRef);
        const fullFaceUrl = await getDownloadURL(fullFaceRef);

        setCheek1Url(cheek1Url);
        setCheek2Url(cheek2Url);
        setChinUrl(chinUrl);
        setForeheadUrl(foreheadUrl);
        setFullFaceUrl(fullFaceUrl);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const motionProps = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: animationDuration },
  };

  const imageDelay1 = 0.4;
  const imageDelay2 = imageDelay1 + delayIncrement;
  const imageDelay3 = imageDelay2 + delayIncrement;
  const imageDelay4 = imageDelay3 + delayIncrement;
  const imageDelay5 = imageDelay4 + delayIncrement;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box minHeight='100vh' bg='black' p='5'>
        <Center mb='8'>
          <Heading color='white' size='3xl'>
            Your Personalized Result
          </Heading>
        </Center>
        <Grid templateColumns="1fr 2fr 1fr" gap={6} alignItems="center" mx='180px'>
          {/* Grid for smaller images on the left */}
          <VStack spacing={3}>
            <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: imageDelay1 }}>
              <Image src={cheek1Url} alt="Cheek 1" boxSize="200px" objectFit="cover" />
            </motion.div>
            <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: imageDelay2 }}>
              <Image src={cheek2Url} alt="Cheek 2" boxSize="200px" objectFit="cover" />
            </motion.div>
          </VStack>

          {/* Main picture */}
          <Center>
            <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: imageDelay3 }}>
              <Image src={fullFaceUrl} alt="Full Face" boxSize="412px" objectFit="cover" />
            </motion.div>
          </Center>

          {/* Grid for smaller images on the right */}
          <VStack spacing={2}>
            <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: imageDelay4 }}>
              <Image src={chinUrl} alt="Chin" boxSize="200px" objectFit="cover" />
            </motion.div>
            <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: imageDelay5 }}>
              <Image src={foreheadUrl} alt="Forehead" boxSize="200px" objectFit="cover" />
            </motion.div>
          </VStack>
        </Grid>
      </Box>
    </motion.div>
  );
}

export default ResultPage;
