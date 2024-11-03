'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import {
  FcViewDetails,
  FcBullish,
  FcGlobe,
} from 'react-icons/fc'

const Card = ({ heading, description, icon, href }) => {
  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}>
      <Stack align={'start'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('gray.100', 'gray.700')}>
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={'sm'}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  )
}

export default function Hero() {
  const router = useRouter()
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading pt={10} fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Your Personalised Investment Journey Starts Here
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Discover a smarter way to invest with our AI-powered RoboAdvisor!
        </Text>
      </Stack>
      
      <Flex justify="center" mt={4} gap={3}>
        <Button colorPalette="gray" variant="outline" onClick={() => router.push('/register')}>Get Started</Button>
        <Button bg={'black'} color={'white'} variant="outline" onClick={() => router.push('/login')}>Login</Button>
      </Flex>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={'Risk Assessment'}
            icon={<Icon as={FcViewDetails} w={10} h={10} />}
            description={'Take our comprehensive quiz to determine your risk tolerance and get tailored investment recommendations.'}
          />
          <Card
            heading={'Interest Rate Analysis'}
            icon={<Icon as={FcBullish} w={10} h={10} />}
            description={'Stay informed with real-time interest rate data and discover the best bond investment opportunities.'}
          />
          <Card
            heading={'Global Market Insights'}
            icon={<Icon as={FcGlobe} w={10} h={10} />}
            description={'Expand your portfolio with curated insights into international markets and diversification strategies.'}
          />
        </Flex>
      </Container>

      <Flex justify="center" mt={4}>
        <Heading pt={10} fontSize={{ base: 'xl', sm: '2xl' }} fontWeight={'bold'}>
                Coming Soon: Educational Gamification
        </Heading>
      </Flex>

      <Flex justify="center" mt={4} mb={10}>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Learn about investments through interactive games and challenges. Stay tuned!
        </Text>
      </Flex>

    </Box>
  )
}
