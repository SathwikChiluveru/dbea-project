'use client'
import { useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Heading, Text, Button, VStack, Input, FormControl, FormLabel } from '@chakra-ui/react';

export default function CalculatorCard() {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentYears, setInvestmentYears] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [compoundResult, setCompoundResult] = useState(null);

  const calculateCompoundInterest = () => {
    const principal = parseFloat(investmentAmount);
    const years = parseInt(investmentYears);
    const rate = parseFloat(interestRate) / 100; // Convert percentage to decimal
    const amount = principal * Math.pow((1 + rate), years);
    setCompoundResult(amount.toFixed(2));
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Compound Interest Calculator</Heading>
        <Text fontSize="sm" color="gray.600">See the power of long-term investing</Text>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Initial Investment ($)</FormLabel>
            <Input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              placeholder="e.g., 1000"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Investment Period (Years)</FormLabel>
            <Input
              type="number"
              value={investmentYears}
              onChange={(e) => setInvestmentYears(e.target.value)}
              placeholder="e.g., 10"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Annual Interest Rate (%)</FormLabel>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="e.g., 7"
            />
          </FormControl>
          <Button colorScheme="blue" onClick={calculateCompoundInterest}>Calculate</Button>
          {compoundResult && (
            <Text fontSize="lg" fontWeight="bold" color="green.500">
              After {investmentYears} years, your investment could grow to: ${compoundResult}
            </Text>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
}
