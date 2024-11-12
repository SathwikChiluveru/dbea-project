'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  SimpleGrid,
  Divider,
  Card,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';

export default function SimpleCustomerOnboardingForm() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    icNumber: '',
    familyName: '',
    givenName: '',
    dateOfBirth: '',
    gender: '',
    occupation: '',
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    emailAddress: '',
    countryCode: '',
    mobileNumber: '',
    phoneCountryCode: '',
    phoneAreaCode: '',
    phoneLocalNumber: '',
    preferredUserld: '',
    currency: '',
    positionTitle: '',
    yearOfService: 0,
    employerName: '',
    officeAddress1: '',
    officeAddress2: '',
    officeAddress3: '',
    officeContactNumber: '',
    officeContactNumberExt: '',
    workingInSingapore: false,
    createDepositAccount: false,
    password: '',
    tenantId: '',
    customerType: '',
    annualSalary: 0
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://personal-wudetvzg.outsystemscloud.com/OnboardCustomerService/rest/OnboardCustomer/OnboardCustomer',
        {
          icNumber: formData.icNumber,
          familyName: formData.familyName,
          givenName: formData.givenName,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          occupation: formData.occupation,
          streetAddress: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postalCode: formData.postalCode,
          emailAddress: formData.emailAddress,
          countryCode: "+65",
          mobileNumber: formData.mobileNumber,
          phoneCountryCode: "+65",
          phoneLocalNumber: formData.mobileNumber,
          preferredUserld: formData.emailAddress,
          currency: "SGD",
          positionTitle: formData.positionTitle,
          yearOfService: formData.yearOfService,
          employerName: formData.employerName,
          officeContactNumber: "0",
          workingInSingapore: formData.workingInSingapore,
          createDepositAccount: formData.createDepositAccount,
          password: formData.password,
          customerType: "100",
          annualSalary: formData.annualSalary
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Contacts-Key': process.env.NEXT_PUBLIC_LOGIN_API_KEY
          }
        }
      );
  
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Customer onboarded successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom"
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Response data:', error.response?.data);
      console.log('Response status:', error.response?.status);
      toast({
        title: "Error",
        description: "Error onboarding customer. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
    }
  };
  

  return (
    <Box maxW="4xl" mx="auto" p={4} mb={2}>
      <Card p={6} boxShadow="lg">
        <Box textAlign="center" mb={4}>
          <Heading as="h2" size="lg">
            Registration Form
          </Heading>
          <Text mt={2}>Please fill in the information below to create your account.</Text>
        </Box>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="start" width="full">

            {/* Personal Information Section */}
            <Box width="full">
              <Heading as="h3" size="md" mb={2}>Personal Information</Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                <FormControl>
                  <FormLabel>IC Number</FormLabel>
                  <Input name="icNumber" value={formData.icNumber} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Family Name</FormLabel>
                  <Input name="familyName" value={formData.familyName} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Given Name</FormLabel>
                  <Input name="givenName" value={formData.givenName} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <Input name="gender" value={formData.gender} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Occupation</FormLabel>
                  <Input name="occupation" value={formData.occupation} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} />
                </FormControl>
              </SimpleGrid>
            </Box>

            <Divider />

            {/* Contact Information Section */}
            <Box width="full">
              <Heading as="h3" size="md" mb={2}>Contact Information</Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                <FormControl>
                  <FormLabel>Street Address</FormLabel>
                  <Input name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Input name="city" value={formData.city} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>State</FormLabel>
                  <Input name="state" value={formData.state} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Country</FormLabel>
                  <Input name="country" value={formData.country} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Postal Code</FormLabel>
                  <Input name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Email Address</FormLabel>
                  <Input name="emailAddress" value={formData.emailAddress} onChange={handleInputChange} />
                </FormControl>
              </SimpleGrid>
            </Box>

            <Divider />

            {/* Job Information Section */}
            <Box width="full">
              <Heading as="h3" size="md" mb={2}>Job Information</Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                <FormControl>
                  <FormLabel>Employer Name</FormLabel>
                  <Input name="employerName" value={formData.employerName} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Position Title</FormLabel>
                  <Input name="positionTitle" value={formData.positionTitle} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Years of Service</FormLabel>
                  <Input name="yearOfService" type="number" value={formData.yearOfService} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Annual Salary</FormLabel>
                  <Input name="annualSalary" type="number" value={formData.annualSalary} onChange={handleInputChange} />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <Checkbox
                    name="workingInSingapore"
                    isChecked={formData.workingInSingapore}
                    onChange={handleInputChange}
                    mt={6}
                  >
                    Working in Singapore
                  </Checkbox>
                </FormControl>
              </SimpleGrid>
            </Box>

            <Divider />

            {/* Account Preferences Section */}
            <Box width="full">
              <Heading as="h3" size="md" mb={2}>Account Preferences</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl display="flex" alignItems="center">
                  <Checkbox
                    name="createDepositAccount"
                    isChecked={formData.createDepositAccount}
                    onChange={handleInputChange}
                    mt={5}
                  >
                    Create Deposit Account
                  </Checkbox>
                </FormControl>
              </SimpleGrid>
            </Box>

            {/* Password Field */}
            <Box width="full">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input name="password" type="password" value={formData.password} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} />
                </FormControl>
              </SimpleGrid>
            </Box>

            <Button type="submit" colorScheme="blue" width="full">
              Submit
            </Button>
          </VStack>
        </form>
      </Card>
    </Box>
  );
}
