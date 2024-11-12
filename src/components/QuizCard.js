'use client'
import { useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Heading, Text, Button, VStack } from '@chakra-ui/react';

const quizQuestions = [
  {
    question: "What is compound interest?",
    options: [
      "Interest calculated only on the principal amount",
      "Interest calculated on the initial principal and accumulated interest",
      "A fixed interest rate that never changes",
      "Interest paid at the end of a loan term"
    ],
    correctAnswer: 1
  },
  {
    question: "Why is diversification important in investing?",
    options: [
      "It guarantees higher returns",
      "It eliminates all investment risk",
      "It spreads risk across different investments",
      "It focuses all investments in one area for maximum profit"
    ],
    correctAnswer: 2
  }
];

export default function QuizCard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleQuizSubmit = () => {
    setShowResult(true);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % quizQuestions.length);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Financial Literacy Quiz</Heading>
        <Text fontSize="sm" color="gray.600">Test your knowledge</Text>
      </CardHeader>
      <CardBody>
        <Heading size="sm" mb={4}>{quizQuestions[currentQuestionIndex].question}</Heading>
        <VStack spacing={3}>
          {quizQuestions[currentQuestionIndex].options.map((option, index) => (
            <Button
              key={index}
              colorScheme={selectedAnswer === index ? "blue" : "gray"}
              variant={selectedAnswer === index ? "solid" : "outline"}
              onClick={() => setSelectedAnswer(index)}
              w="100%"
            >
              {option}
            </Button>
          ))}
        </VStack>
        {showResult && (
          <Text mt={4} fontWeight="bold" color={selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer ? "green.500" : "red.500"}>
            {selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer ? "Correct!" : "Incorrect. Try again!"}
          </Text>
        )}
      </CardBody>
      <CardFooter display="flex" justifyContent="space-between">
        <Button colorScheme="green" onClick={handleQuizSubmit} isDisabled={selectedAnswer === null || showResult}>
          Submit Answer
        </Button>
        <Button colorScheme="blue" onClick={nextQuestion} isDisabled={!showResult}>
          Next Question
        </Button>
      </CardFooter>
    </Card>
  );
}
