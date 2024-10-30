'use client'

import { useState } from 'react'
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
} from '@chakra-ui/react'

// Questions for the quiz
const questions = [
  {
    question: "How would you describe your investment experience?",
    options: ["Novice", "Somewhat experienced", "Experienced", "Very experienced"]
  },
  {
    question: "What is your primary investment goal?",
    options: ["Preserve capital", "Generate income", "Grow wealth", "Aggressive growth"]
  },
  {
    question: "How long do you plan to hold your investments?",
    options: ["Less than 1 year", "1-3 years", "3-5 years", "More than 5 years"]
  },
  {
    question: "How would you react if your investment portfolio lost 20% in a year?",
    options: ["Sell everything", "Sell some", "Hold steady", "Buy more"]
  },
  {
    question: "What percentage of your total assets are you planning to invest?",
    options: ["Less than 10%", "10-25%", "25-50%", "More than 50%"]
  }
]

// Risk profiles based on score ranges
const riskProfiles = [
  { label: "Conservative", range: [0, 0.25] },
  { label: "Moderate", range: [0.25, 0.5] },
  { label: "Growth-Oriented", range: [0.5, 0.75] },
  { label: "Aggressive", range: [0.75, 1] },
]

// Main component
export default function RiskAssessmentQuiz() {
  const toast = useToast()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(''))
  const [isComplete, setIsComplete] = useState(false)
  const [riskProfile, setRiskProfile] = useState("")

  // Calculate progress based on current question step
  const progress = isComplete ? 100 : (step / questions.length) * 100

  // Handle selection of answer
  const handleAnswerChange = (value) => {
    const newAnswers = [...answers]
    newAnswers[step] = value
    setAnswers(newAnswers)
  }

  // Calculate risk profile based on answers
  const calculateRiskProfile = (answers) => {
    const riskValues = answers.map((answer, index) => {
      const options = questions[index].options
      return options.indexOf(answer) / (options.length - 1)
    })
    const averageRisk = riskValues.reduce((sum, value) => sum + value, 0) / riskValues.length
    const profile = riskProfiles.find(profile => 
      averageRisk >= profile.range[0] && averageRisk < profile.range[1]
    )
    return profile ? profile.label : "Unknown"
  }

  // Restart the quiz
  const restartQuiz = () => {
    setStep(0)
    setAnswers(Array(questions.length).fill(''))
    setIsComplete(false)
    setRiskProfile("")
  }

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      maxWidth={800}
      p={6}
      m="50px auto"
      as="form">
      
      {isComplete ? (
        <Box textAlign="center">
          <Heading fontSize="2xl" fontWeight="bold" color="black">Risk Profile Assessment</Heading>
          <Text mt={2} color="gray.600" fontSize="md">
            Let's determine your investment risk profile
          </Text>
          <Heading mt={6} size="lg" color="black">
            Your Risk Profile: <Text as="span" fontWeight="bold">{riskProfile}</Text>
          </Heading>
          <Text mt={4} color="gray.500">
            Based on your answers, we've determined your risk profile.
          </Text>
          <Text color="gray.500">
            This will help us provide tailored investment recommendations.
          </Text>
          <Progress value={100} size="md" hasStripe isAnimated mt={6} mb={6} />
          <ButtonGroup spacing={4}>
            <Button onClick={restartQuiz} colorScheme="gray.700" variant="link">
              Start Over
            </Button>
            <Button backgroundColor="black" color="white" _hover={{ backgroundColor: "gray.700" }} variant="solid">
              See Investment Recommendations
            </Button>
          </ButtonGroup>
        </Box>
      ) : (
        <>
          <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated />
          <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            Risk Assessment Quiz
          </Heading>
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
              <Button
                onClick={() => setStep(step - 1)}
                isDisabled={step === 0}
                colorScheme="teal"
                variant="solid"
                w="7rem"
              >
                Back
              </Button>
              <Button
                w="7rem"
                colorScheme="teal"
                variant="outline"
                isDisabled={!answers[step]}
                onClick={() => {
                  if (step === questions.length - 1) {
                    const profile = calculateRiskProfile(answers)
                    setRiskProfile(profile)
                    setIsComplete(true)
                    toast({
                      title: 'Quiz Completed',
                      description: `Your risk profile is: ${profile}`,
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    })
                  } else {
                    setStep(step + 1)
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
  )
}
