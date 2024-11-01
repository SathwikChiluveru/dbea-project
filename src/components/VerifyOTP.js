'use client'

import { Center, Heading } from '@chakra-ui/react'
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react'
import { PinInput, PinInputField } from '@chakra-ui/react'
import { useState } from 'react'


export default function VerifyOTPForm({ verificationSid }) {
  const [otp, setOtp] = useState('');

  // Function to verify OTP
  const verifyOTP = async () => {
    try {
      const response = await fetch(
        'https://personal-wudetvzg.outsystemscloud.com/AuthService/rest/projNotification/projVerifyOTP',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Contacts-Key': '46fb6999-7a3b-4d7a-a59c-334dbbf6b604',
          },
          body: JSON.stringify({ VerificationSid: verificationSid, Code: otp }),
        }
      );
      const data = await response.json();
      if (data.Success) {
        console.log('OTP verified successfully:', data.Status);
        // Proceed with the next step in the login process
      } else {
        console.error('Error verifying OTP:', data.ErrorMessage);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <Flex
      minH={'50vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'sm'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Verify your Phone Number
          </Heading>
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}
        >
          We have sent an OTP to your phone number
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput onChange={(value) => setOtp(value)}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'black'}
            color={'white'}
            _hover={{
              bg: 'gray.800',
            }}
            onClick={verifyOTP}
          >
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
