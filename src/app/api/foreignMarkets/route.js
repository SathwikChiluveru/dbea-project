import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const riskProfile = searchParams.get('riskProfile');

  if (!riskProfile) {
    return NextResponse.json({ error: 'Risk profile is required' }, { status: 400 });
  }

  async function getAllCountriesData() {
    try {
      const response = await fetch('https://personal-5ghfiira.outsystemscloud.com/CountryInterestRate/rest/CountryData/GetAllCountriesData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Contacts-Key': process.env.NEXT_PUBLIC_FOREIGN_API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching countries data: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in getAllCountriesData:', error);
      return null;
    }
  }

  async function getAllInterestRates() {
    try {
      const response = await fetch('https://personal-5ghfiira.outsystemscloud.com/CountryInterestRate/rest/CountryInterestRate/GetAllInterestRate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Contacts-Key': process.env.NEXT_PUBLIC_FOREIGN_API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching interest rates data: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in getAllInterestRates:', error);
      return null;
    }
  }

  const countriesWithStockMarkets = [
    "United States", "Canada", "Mexico", "Brazil", "Argentina", "Chile", "Colombia",
    "United Kingdom", "France", "Germany", "Switzerland", "Netherlands", "Belgium",
    "Italy", "Spain", "Portugal", "Sweden", "Denmark", "Finland", "Norway", 
    "Russia", "Poland", "Turkey", "Greece", "Austria", "Hungary", "Ireland", 
    "Czech Republic", "South Africa", "Nigeria", "Egypt", "Morocco", "Israel", 
    "Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Bahrain", 
    "China", "Japan", "South Korea", "India", "Hong Kong", "Singapore", "Malaysia", 
    "Indonesia", "Thailand", "Vietnam", "Philippines", "Pakistan", "Sri Lanka", 
    "Bangladesh", "Taiwan", "Australia", "New Zealand"
  ];

  async function getForeignMarketRecommendations(riskProfile) {
    const countriesData = await getAllCountriesData();
    const interestRatesData = await getAllInterestRates();

    if (!countriesData || !interestRatesData) {
      console.error('Failed to retrieve necessary data for recommendations');
      return [];
    }

    const filteredRecommendations = countriesData
      .filter(country => {
        const hasStockMarket = countriesWithStockMarkets.includes(country.country_name);
        if (!hasStockMarket) return false;
        
        if (riskProfile === 'Low Risk') return country.income_level === 'High income';
        if (riskProfile === 'Medium Risk') return country.income_level !== 'Low income';
        if (riskProfile === 'High Risk') return country.region === 'Emerging markets';
      })
      .map(country => {
        const centralBankRate = interestRatesData.central_bank_rates.find(rate => rate.country === country.country_name);
        return {
          country: country.country_name,
          income_level: country.income_level,
          interest_rate: centralBankRate?.rate_pct || 'N/A',
        };
      });

    return filteredRecommendations;
  }

  try {
    const recommendations = await getForeignMarketRecommendations(riskProfile);
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Error generating foreign market recommendations:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
