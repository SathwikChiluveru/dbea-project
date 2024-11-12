'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Divider,
  Avatar,
  Icon,
  Button
} from '@chakra-ui/react';
import {
  FaIdCard,
  FaCalendarAlt,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBriefcase,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleQuizClick = () => {
    router.push('/risk-quiz');
  };

  const handleFinLitClick = () => {
    router.push('/finlit-hub');
  };

  // Fetch customer details using stored phone number
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const phone = localStorage.getItem('userPhone'); 
      if (!phone) {
        console.error('No phone number found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://personal-wudetvzg.outsystemscloud.com/LoginService/rest/Login/GetCustomerDetails?PhoneMobile=${encodeURIComponent(phone.slice(3))}&CountryCode=+65`,
          {
            headers: {
              'X-Contacts-Key': process.env.NEXT_PUBLIC_LOGIN_API_KEY,
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        setCustomerData(data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!customerData) {
    return <Text>Failed to load customer data</Text>;
  }

  return (
    <Flex align="center" justify="center" p={6}>
      <Box
        maxW="1000px"
        w="full"
        bg="white"
        boxShadow="2xl"
        rounded="lg"
        p={6}
        textAlign="center"
        position="relative"
      >
        <Button 
          position="absolute" 
          top={4} 
          right={4} 
          colorScheme="blue" 
          onClick={handleQuizClick}
          size="sm"
        >
          Risk Assessment Quiz
        </Button>
        <Button 
          position="absolute" 
          top={14} 
          right={4} 
          colorScheme="green" 
          onClick={handleFinLitClick}
          size="sm"
        >
          Financial Literacy Hub
        </Button>
        <Avatar size="xl" name={`${customerData.givenName} ${customerData.familyName}`} mb={4} />
        <Heading fontSize="2xl" fontWeight="bold">{`${customerData.givenName} ${customerData.familyName}`}</Heading>
        <Text fontSize="lg" color="gray.500">{customerData.employment.positionTitle} at {customerData.employment.employerName}</Text>
        
        <Divider my={4} />

        <VStack align="start" spacing={3}>
          <SectionHeading title="Personal Information" />
          <InfoItem icon={FaIdCard} label="Customer ID" value={customerData.customer.customerId} />
          <InfoItem icon={FaCalendarAlt} label="Date of Birth" value={customerData.dateOfBirth} />
          <InfoItem icon={FaUser} label="Tax ID" value={customerData.taxIdentifier} />

          <Divider my={4} />

          <SectionHeading title="Contact Information" />
          <InfoItem icon={FaMapMarkerAlt} label="Address" value={`${customerData.address.streetAddress1}, ${customerData.address.city}, ${customerData.address.postalCode}`} />
          <InfoItem icon={FaPhone} label="Phone" value={`${customerData.cellphone.countryCode} ${customerData.cellphone.phoneNumber}`} />
          <InfoItem icon={FaEnvelope} label="Email" value={customerData.profile.email} />

          <Divider my={4} />

          <SectionHeading title="Employment Information" />
          <InfoItem icon={FaBriefcase} label="Employer" value={customerData.employment.employerName} />
          <InfoItem icon={FaBriefcase} label="Position" value={customerData.employment.positionTitle} />
          <InfoItem icon={FaBriefcase} label="Since" value={customerData.employment.yearOfService} />

          <Divider my={4} />

          <SectionHeading title="Account Information" />
          <InfoItem label="Customer Type" value={customerData.profile.customerType} />
          <InfoItem label="Registered" value={customerData.maintenanceHistory.registrationDate} />
        </VStack>
      </Box>
    </Flex>
  );
}

// Section heading component
const SectionHeading = ({ title }) => (
  <Heading size="md" fontWeight="bold" color="black" mt={4} mb={2}>{title}</Heading>
);

// Info item component
const InfoItem = ({ icon, label, value }) => (
  <Flex align="center">
    {icon && <Icon as={icon} boxSize={5} mr={2} color="gray.500" />}
    <Text fontWeight="medium" mr={2}>{label}:</Text>
    <Text>{value}</Text>
  </Flex>
);
