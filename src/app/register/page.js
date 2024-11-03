'use client'

import { useState } from 'react'
import { Box, Button, Checkbox, FormControl, FormLabel, Heading, Input, Stack, Text, VStack, SimpleGrid, Divider, Card } from '@chakra-ui/react'

export default function SimpleCustomerOnboardingForm() {
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
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      alert('Customer onboarded successfully!')
    } catch (error) {
      console.error('Error:', error)
      alert('Error onboarding customer. Please try again.')
    }
  }

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
  )
}
