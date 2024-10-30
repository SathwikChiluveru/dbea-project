'use client'

import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import VerifyOTPForm from '@/components/VerifyOTP';

// Function to simulate sending OTP
function sendOTP() {
  console.log('OTP sent');
  // This function is currently empty, but here you would implement your OTP sending logic
}

export default function LoginWithPhoneForm() {
  const [showOTPForm, setShowOTPForm] = useState(false);

  // Handle "Send OTP" click
  const handleSendOTP = () => {
    sendOTP();
    setShowOTPForm(true); // Show OTP form after sending OTP
  };

  return (
    <Flex
      minH={'90vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        {!showOTPForm ? (
          <>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Login with Phone Number
            </Heading>
            <Text
              fontSize={{ base: 'sm', sm: 'md' }}
              color={useColorModeValue('gray.800', 'gray.400')}
            >
              Enter your phone number to receive an OTP
            </Text>
            <FormControl id="phone">
              <Input
                placeholder="Your phone number"
                _placeholder={{ color: 'gray.500' }}
                type="tel"
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={'black'}
                color={'white'}
                _hover={{
                  bg: 'gray.800',
                }}
                onClick={handleSendOTP}
              >
                Send OTP
              </Button>
            </Stack>
          </>
        ) : (
          <VerifyOTPForm />
        )}
      </Stack>
    </Flex>
  );
}
