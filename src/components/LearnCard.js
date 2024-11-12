'use client'
import { useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Heading, Text, Button } from '@chakra-ui/react';

const financialTerms = [
    { term: "Compound Interest", definition: "Interest calculated on the initial principal and the accumulated interest over time." },
    { term: "Diversification", definition: "Spreading investments across various financial instruments to reduce risk." },
    { term: "ETF", definition: "Exchange-Traded Fund, a type of investment fund traded on stock exchanges." },
    { term: "Bull Market", definition: "A financial market in which prices are rising or expected to rise." },
    { term: "Bear Market", definition: "A financial market in which prices are falling or expected to fall." },
    { term: "Asset Allocation", definition: "The process of dividing investments among different asset categories, such as stocks, bonds, and cash, to optimize risk and reward." },
    { term: "Liquidity", definition: "The ease with which an asset can be converted into cash without affecting its market price." },
    { term: "Mutual Fund", definition: "An investment vehicle that pools funds from multiple investors to invest in a diversified portfolio of stocks, bonds, or other securities." },
    { term: "Inflation", definition: "The rate at which the general level of prices for goods and services rises, eroding purchasing power over time." },
    { term: "Capital Gains", definition: "The profit earned from the sale of an asset, such as stocks, real estate, or other investments, above its purchase price." },
    { term: "Dividend", definition: "A portion of a company's earnings distributed to shareholders, typically on a regular basis." },
    { term: "Credit Score", definition: "A numerical representation of an individual's creditworthiness, based on credit history and other financial factors." },
    { term: "Bond", definition: "A fixed-income instrument that represents a loan made by an investor to a borrower, typically used by companies or governments to finance projects." },
    { term: "Hedge Fund", definition: "An alternative investment fund that uses advanced strategies to achieve higher returns, often involving higher risk and limited to accredited investors." },
];

export default function LearnCard() {
  const [currentTermIndex, setCurrentTermIndex] = useState(0);

  const nextTerm = () => {
    setCurrentTermIndex((prevIndex) => (prevIndex + 1) % financialTerms.length);
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Financial Term of the Day</Heading>
        <Text fontSize="sm" color="gray.600">Expand your financial vocabulary</Text>
      </CardHeader>
      <CardBody>
        <Heading size="lg" mb={2}>{financialTerms[currentTermIndex].term}</Heading>
        <Text>{financialTerms[currentTermIndex].definition}</Text>
      </CardBody>
      <CardFooter>
        <Button colorScheme="blue" onClick={nextTerm}>Learn Next Term</Button>
      </CardFooter>
    </Card>
  );
}
