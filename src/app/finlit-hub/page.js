'use client'
import { useState } from 'react';
import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Button, Flex } from '@chakra-ui/react';
import { FcReadingEbook, FcCalculator, FcFaq } from "react-icons/fc";
import LearnCard from '@/components/LearnCard';
import QuizCard from '@/components/QuizCard';
import CalculatorCard from '@/components/CalculatorCard';
import { useRouter } from 'next/navigation';


export default function FinLitHub() {

    const router = useRouter();

    const handleBackToProfile = () => {
        router.push('/profile'); 
    };

  return (
    <Box minH="100vh" bg="white" p={8}>
      <Flex justify="center" align="center" mb={8}>
        <Heading as="h1" size="xl" textAlign="center" mr={4}>
          FinLit Hub
        </Heading>
        <Button bg="black" color="white" onClick={handleBackToProfile}>
          Back to Profile
        </Button>
      </Flex>
      <Tabs variant="enclosed" align="center" maxW="3xl" mx="auto">
        <TabList>
          <Tab><FcReadingEbook size={18}/>  Learn</Tab>
          <Tab><FcFaq  size={18} /> Quiz</Tab>
          <Tab><FcCalculator size={18} /> Calculator</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LearnCard />
          </TabPanel>
          <TabPanel>
            <QuizCard />
          </TabPanel>
          <TabPanel>
            <CalculatorCard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
