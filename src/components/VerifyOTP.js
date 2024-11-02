'use client'

import { Center, Heading } from '@chakra-ui/react'
import {
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
  useToast
} from '@chakra-ui/react'
import { PinInput, PinInputField } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function VerifyOTPForm({ verificationSid }) {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast();
  const router = useRouter();

  // Function to verify OTP
  const verifyOTP = async () => {
    setIsLoading(true)
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
        toast({
          title: 'Verification Successful',
          description: 'You have successfully verified your OTP.',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
        router.push('/risk-quiz'); 
        // Proceed with the next step in the login process
      } else {
        console.error('Error verifying OTP:', data.ErrorMessage);
        toast({
          title: 'Verification Failed',
          description: 'Please try again.',
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      toast({
        title: 'Network Error',
        description: 'Unable to verify OTP. Please try again.',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); 
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
            isLoading={isLoading}
          >
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
