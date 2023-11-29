import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Box, Heading, Image } from '@chakra-ui/react';

function Header() {
  const [user] = useAuthState(auth);

  return (
    <Box
      as="header"
      w="100%"
      p={5}
      boxShadow="lg"
      position="sticky"
      top="0"
      bg="white"
      zIndex="10"
      display="flex"
      alignItems="center"
      justifyContent="space-between"  // Update this line to space-between
    >
      <Heading as="h1" fontSize="3xl" fontWeight="bold" color="blue.400">
        Password Manager
      </Heading>
      <Image
        onClick={() => auth.signOut()}
        src={user.photoURL ? user.photoURL : ''}
        alt="profile"
        h="10"
        w="10"
        rounded="full"
        cursor="pointer"
      />
    </Box>
  );
}

export default Header;
