'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Text,
  Flex,
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  useToast,
} from '@chakra-ui/react';
import { useRecommendations } from '@/context/RecommendationContext';

const questions = [
  { question: "How would you describe your investment experience?", options: ["Novice", "Somewhat experienced", "Experienced", "Very experienced"] },
  { question: "What is your primary investment goal?", options: ["Preserve capital", "Generate income", "Grow wealth", "Aggressive growth"] },
  { question: "How long do you plan to hold your investments?", options: ["Less than 1 year", "1-3 years", "3-5 years", "More than 5 years"] },
  { question: "How would you react if your investment portfolio lost 20% in a year?", options: ["Sell everything", "Sell some", "Hold steady", "Buy more"] },
  { question: "What percentage of your total assets are you planning to invest?", options: ["Less than 10%", "10-25%", "25-50%", "More than 50%"] },
  { question: "Are you open to investments in foreign markets?", options: ["Yes", "No"] }
];

const riskProfiles = [
  { label: "Low Risk", range: [0, 0.33] },
  { label: "Medium Risk", range: [0.33, 0.66] },
  { label: "High Risk", range: [0.66, 2] },
];

export default function RiskAssessmentQuiz() {
  const router = useRouter(); 
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [isComplete, setIsComplete] = useState(false);
  const [riskProfile, setRiskProfile] = useState("");
  const [apiResponse, setApiResponse] = useState('');
  const { setRecommendations, setRisk, setForeignMarketPreference } = useRecommendations();


  const progress = isComplete ? 100 : (step / questions.length) * 100;

  const handleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);
  };

  const calculateRiskProfile = (answers) => {
    const riskValues = answers.slice(0, answers.length - 1).map((answer, index) => {
      const options = questions[index].options;
      return options.indexOf(answer) / (options.length - 1);
    });
    const averageRisk = riskValues.reduce((sum, value) => sum + value, 0) / riskValues.length;
    const profile = riskProfiles.find(profile => 
      averageRisk >= profile.range[0] && averageRisk < profile.range[1]
    );
    return profile ? profile.label : "Unknown";
  };

  const getInvestmentRecommendations = async () => {
    try {
      const res = await fetch('/api/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ riskProfile }),
      });

      const data = await res.json();

      if (data.error) {
        console.error('Error from API:', data.error);
        setApiResponse('Error occurred while fetching recommendations.');
      } else {
        console.log("Investment Recommendations:", data.reply);
        setRecommendations(data.reply);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Request error:', error);
      setApiResponse('Failed to get response from the API.');
    }
  };

  const handleCompleteQuiz = () => {
    const profile = calculateRiskProfile(answers);
    const foreignMarketPreference = answers[5] === "Yes"; // Assuming question 6 is about foreign markets
    setForeignMarketPreference(foreignMarketPreference);
    setRiskProfile(profile);
    setRisk(profile)
    setIsComplete(true);
    toast({
      title: 'Quiz Completed',
      description: `Your risk profile is: ${profile}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box borderWidth="1px" rounded="lg" maxWidth={800} p={6} m="50px auto" as="form">
      {isComplete ? (
        <Box textAlign="center">
          <Heading fontSize="2xl" fontWeight="bold">Risk Profile Assessment</Heading>
          <Text mt={2} mb={4} color="blue.800">Your Risk Profile: <strong>{riskProfile}</strong></Text>
          <ButtonGroup spacing={4}>
            <Button onClick={getInvestmentRecommendations} colorScheme="blue">See Investment Recommendations</Button>
          </ButtonGroup>
        </Box>
      ) : (
        <>
          <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated />
          <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">Risk Assessment Quiz</Heading>
          <Box>
            <FormControl as="fieldset">
              <FormLabel as="legend" fontSize="lg">
                {questions[step].question}
              </FormLabel>
              <RadioGroup
                value={answers[step]}
                onChange={(value) => handleAnswerChange(value)}
              >
                <Stack spacing={4}>
                  {questions[step].options.map((option, index) => (
                    <Radio key={index} value={option}>
                      {option}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>
          </Box>
          <ButtonGroup mt="5%" w="100%">
            <Flex w="100%" justifyContent="space-between">
              <Button onClick={() => setStep(step - 1)} isDisabled={step === 0} colorScheme="teal" variant="solid" w="7rem">Back</Button>
              <Button
                w="7rem"
                colorScheme="teal"
                variant="outline"
                isDisabled={!answers[step]}
                onClick={() => {
                  if (step === questions.length - 1) {
                    handleCompleteQuiz();
                  } else {
                    setStep(step + 1);
                  }
                }}
              >
                {step === questions.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Flex>
          </ButtonGroup>
        </>
      )}
    </Box>
  );
}
