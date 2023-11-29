import React from 'react';
import { Button, Box, Heading, VStack, Flex } from '@chakra-ui/react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

function LoginPage() {
  const signInUser = () => {
    signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bgGradient='linear(to-t, teal.300, purple.800)'
      color='white'
      position='fixed'
      top='0'
      width='100%'
    >
      <Box
        p={8}
        borderRadius='lg'
        boxShadow='lg'
        maxW='50vw'
        w='100%'
      >
        <VStack spacing={8} align='center'>
          <Heading className='text-4xl font-bold'>Password Manager</Heading>
          <Button
            onClick={signInUser}
            colorScheme='blue'
            size='lg'
            fontWeight='bold'
            rounded='full'
            _hover={{ transform: 'scale(1.05)' }}
            transition='all 0.2s ease-in-out'
            mt={5}
          >
            Sign in with Google
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export default LoginPage;
