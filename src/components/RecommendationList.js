import { VStack, Heading, Text, Box } from '@chakra-ui/react';
import RecommendationCard from './RecommendationCard';

export default function RecommendationList({ recommendations }) {
  return (
    <VStack spacing={8} align="stretch">
      {Object.keys(recommendations).map((region, index) => (
        <RecommendationCard
          key={index}
          title={`${region} Investments`}
          description={`Investment opportunities in ${region}`}
          investments={recommendations[region].map(item => `${item.name} (${item.ticker})`)}
        />
      ))}
    </VStack>
  );
}
