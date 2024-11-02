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


export default function RegisterPage() {
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [phone, setPhone] = useState(''); // Store only the phone number as a string
  const [isLoading, setIsLoading] = useState(false)
  const [verificationSid, setVerificationSid] = useState(null);

  // Function to send OTP
  const handleSendOTP = async () => {

    setIsLoading(true)
    // Ensure phone number starts with +65
    const formattedPhone = phone.startsWith('+65') ? phone : `+65${phone}`;

    try {
      const response = await fetch(
        'https://personal-wudetvzg.outsystemscloud.com/AuthService/rest/projNotification/projSendOTP',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Contacts-Key': '46fb6999-7a3b-4d7a-a59c-334dbbf6b604',
          },
          body: JSON.stringify({ Mobile: formattedPhone }),
        }
      );
      const data = await response.json();
      if (data.Success) {
        console.log('OTP sent successfully');
        setVerificationSid(data.VerificationSid); 
        setShowOTPForm(true); // Show OTP form after sending OTP
      } else {
        console.error('Error sending OTP:', data.ErrorMessage);
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setIsLoading(false); 
    }
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                isLoading={isLoading}
              >
                Send OTP
              </Button>
            </Stack>
          </>
        ) : (
          <VerifyOTPForm verificationSid={verificationSid}/>
        )}
      </Stack>
    </Flex>
  );
}
