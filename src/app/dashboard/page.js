'use client';
import { useEffect, useState } from 'react';
import { useRecommendations } from '@/context/RecommendationContext';
import { Box, Heading, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Card, CardBody, CardHeader, CardFooter, Divider } from '@chakra-ui/react';
import RecommendationList from '@/components/RecommendationList';
import AllocationChart from '@/components/AllocationChart';

export default function DashboardPage() {
  const { recommendations, risk, foreignMarketPreference } = useRecommendations();
  const [foreignMarketRecommendations, setForeignMarketRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (risk && foreignMarketPreference) {
      async function fetchForeignMarketRecommendations() {
        try {
          const response = await fetch(`/api/foreignMarkets?riskProfile=${risk}`);
          const data = await response.json();
          console.log(data)
          setForeignMarketRecommendations(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching foreign market recommendations:', error);
          setLoading(false);
        }
      }
      fetchForeignMarketRecommendations();
    }
  }, [risk]);

  return (
    <Box maxW="5xl" mx="auto" p={6}>
      <Heading as="h1" size="lg" mb={2}>
        Your Investment Suggestions
      </Heading>
      <Text fontSize="md" mb={6}>
        Based on your risk assessment: <strong>{risk}</strong>
      </Text>

      <Tabs variant="enclosed" mb={6}>
        <TabList>
          <Tab>Suggestions</Tab>
          <Tab>Allocation</Tab>
          {foreignMarketPreference && <Tab>Potential Global Markets</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel>
            {recommendations ? (
              <RecommendationList recommendations={recommendations} />
            ) : (
              <Text>Loading recommendations...</Text>
            )}
          </TabPanel>
          <TabPanel>
            {recommendations && <AllocationChart recommendations={recommendations} />}
          </TabPanel>
          {foreignMarketPreference && (
            <TabPanel>
              {loading ? (
                  <Text>Loading foreign market recommendations...</Text>
              ) : (
                  foreignMarketRecommendations.length > 0 ? (
                  <Box>
                      {foreignMarketRecommendations.map((country, index) => (
                      <Card key={index} mb={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
                          <CardHeader>
                          <Heading as="h4" size="md">{country.country}</Heading>
                          </CardHeader>
                          <Divider />
                          <CardBody>
                          <Text><strong>Income Level:</strong> {country.income_level}</Text>
                          {country.interest_rate !== 'N/A' && (
                              <Text><strong>Interest Rate:</strong> {country.interest_rate}%</Text>
                          )}
                          </CardBody>
                      </Card>
                      ))}
                  </Box>
                  ) : (
                  <Text>No recommendations available for your risk profile.</Text>
                  )
              )}
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
