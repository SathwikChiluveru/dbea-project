import { Box, Heading, Text, VStack, List, ListItem, Link, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Divider } from '@chakra-ui/react';
import { useState } from 'react'
export default function RecommendationCard({ title, description, investments }) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stockData, setStockData] = useState(null);
  const [apiError, setApiError] = useState(false);


  const handleStockClick = async (investment) => {

    const ticker = investment.slice(investment.indexOf('(') + 1, investment.indexOf(')'));

    try {
      const username = process.env.NEXT_PUBLIC_API_USERNAME;
      const password = process.env.NEXT_PUBLIC_API_KEY;
      const authHeader = 'Basic ' + btoa(`${username}:${password}`);
      console.log("Auth Header:", authHeader); // Debug only; remove in production

      const response = await fetch(`https://smuedu-dev.outsystemsenterprise.com/gateway/rest/stockmanagement/price?Symbol=${ticker}`, {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
        },
      });
      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setStockData(data);
      setApiError(false);
      onOpen();
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setStockData(null);  
      setApiError(true);  
      onOpen();
    }
  };


  return (
    <>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <Heading fontSize="lg" mb={2}>{title}</Heading>
        <Text mb={4} color="gray.600">{description}</Text>
        <VStack align="start">
          <List spacing={1}>
            {investments.map((investment, index) => (
              <ListItem key={index}>
                <Link color="blue.500" onClick={() => handleStockClick(investment)}>
                  • {investment}
                </Link>
              </ListItem>
            ))}
          </List>
        </VStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{stockData?.CompanyName || "Stock Information"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {apiError ? (
              <Text color="red.500" textAlign="center" mb={10}>No Info From API</Text>
            ) : (
              stockData && (
                <VStack spacing={4} align="start">
                  <Stat>
                    <StatLabel>Current Price</StatLabel>
                    <StatNumber>${stockData.Price}</StatNumber>
                  </Stat>

                  <Divider />

                  <Stat>
                    <StatLabel>Change</StatLabel>
                    <StatNumber>
                      <StatArrow type={stockData.ChangeFromPrev >= 0 ? 'increase' : 'decrease'} />
                      {stockData.ChangeFromPrev} ({stockData.ChangePercent}%)
                    </StatNumber>
                  </Stat>

                  <Divider />

                  <Stat>
                    <StatLabel>Previous Close</StatLabel>
                    <StatNumber>${stockData.PreviousClose}</StatNumber>
                  </Stat>

                  <Divider />

                  <Stat>
                    <StatLabel>Volume</StatLabel>
                    <StatNumber>{stockData.Volume}</StatNumber>
                  </Stat>

                  <Divider />

                  <Stat>
                    <StatLabel>Quote Currency</StatLabel>
                    <StatNumber>{stockData.QuoteCurrency}</StatNumber>
                  </Stat>

                  <Divider />

                  <Text fontSize="sm" color="gray.500">
                    Date: {stockData.Date}
                  </Text>
                </VStack>
              )
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
