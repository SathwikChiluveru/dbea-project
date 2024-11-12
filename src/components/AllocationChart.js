import dynamic from 'next/dynamic';
import { Box, Heading, Text, Flex, FormControl, Input, Button, VStack } from '@chakra-ui/react';
import { useState, useMemo } from 'react';

// Dynamically import ApexCharts for client-side rendering
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AllocationChart({ recommendations }) {
  const [investmentCapital, setInvestmentCapital] = useState(0); 
  const [calculatedAllocations, setCalculatedAllocations] = useState([]);

  // Calculate allocation data for the chart and the list
  const allocationData = useMemo(() => {
    const categories = Object.keys(recommendations).flatMap(region =>
      recommendations[region].map(item => item.name)
    );
    const allocations = Object.keys(recommendations).flatMap(region =>
      recommendations[region].map(item => item.allocation)
    );

    return { categories, allocations };
  }, [recommendations]);

  // Chart options
  const chartOptions = {
    labels: allocationData.categories,
    chart: {
      type: 'donut',
    },
    legend: {
      position: 'bottom',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  // Calculate the dollar allocations based on the input capital
  const calculateAllocations = () => {
    const allocations = Object.keys(recommendations).flatMap(region =>
      recommendations[region].map(item => ({
        ...item,
        amount: ((item.allocation / 100) * investmentCapital).toFixed(2),
      }))
    );
    setCalculatedAllocations(allocations);
  };

  return (
    <Flex maxW="6xl" mx="auto" p={6} gap={8} flexDirection={{ base: 'column', md: 'row' }}>
      {/* Left Section: Portfolio Allocation with Pie Chart */}
      <Box flex="1" p={4} bg="gray.50" rounded="md" shadow="md">
        <Heading as="h3" size="md" mb={2}>
          Portfolio Allocation
        </Heading>
        <Text fontSize="sm" color="gray.600" mb={4}>
          Recommended asset distribution
        </Text>
        <Box width="100%" mx="auto">
          <Chart options={chartOptions} series={allocationData.allocations} type="donut" width="100%" />
        </Box>
      </Box>

      {/* Right Section: Calculate Your Allocation */}
      <Box flex="1" p={4} bg="gray.50" rounded="md" shadow="md">
        <Heading as="h3" size="md" mb={2}>
          Calculate Your Allocation
        </Heading>
        <Text fontSize="sm" color="gray.600" mb={4}>
          Enter your total investment capital
        </Text>
        <FormControl mb={4}>
          <Input
            type="number"
            placeholder="Investment Capital"
            value={investmentCapital}
            onChange={(e) => setInvestmentCapital(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="black" bg="black" color="white" onClick={calculateAllocations} mb={6}>
          Calculate
        </Button>
        
        {/* Recommended Allocation List */}
        <VStack spacing={3} align="start">
          <Text fontWeight="bold">Recommended Allocation:</Text>
          {calculatedAllocations.map((item, index) => (
            <Flex key={index} justifyContent="space-between" w="full">
              <Text>{item.name}</Text>
              <Text>
                ${item.amount} ({item.allocation}%)
              </Text>
            </Flex>
          ))}
          <Flex justifyContent="space-between" w="full" mt={4} pt={4} borderTop="1px solid" borderColor="gray.300">
            <Text fontWeight="bold">Total Investment:</Text>
            <Text fontWeight="bold">${investmentCapital}</Text>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
}
