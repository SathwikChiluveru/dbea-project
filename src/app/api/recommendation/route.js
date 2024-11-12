import { NextResponse } from 'next/server';

// Function to normalize allocations to 100%
function normalizeAllocations(recommendations) {
  const totalAllocation = Object.values(recommendations).flat().reduce((sum, asset) => sum + asset.allocation, 0);

  return Object.keys(recommendations).reduce((normalized, region) => {
    normalized[region] = recommendations[region].map(asset => ({
      ...asset,
      allocation: Math.round((asset.allocation / totalAllocation) * 100),   
    }));
    return normalized;
  }, {});
}

export async function POST(request) {
  const { riskProfile } = await request.json();

  const prompt = `
    Generate a JSON object of investment recommendations based on the user's risk profile, with each asset assigned an allocation percentage. 
    The allocation percentages for each market should sum up to 100%.

    The riskProfile ranges from 0 to 1 and is categorized as follows:

    - Low Risk: 0 <= riskProfile < 0.33
    - Medium Risk: 0.33 <= riskProfile < 0.66
    - High Risk: 0.66 <= riskProfile <= 1

    The user’s riskProfile is ${riskProfile}.

    Based on this, please provide investment recommendations with assets from the US, Singapore (SG), 
    and Global markets in the following JSON format:

    {
      "US": [
        { "name": "Procter & Gamble Co.", "ticker": "PG", "type": "Stock", "allocation": 20 },
        { "name": "Apple Inc.", "ticker": "AAPL", "type": "Stock", "allocation": 15 },
        ...
      ],
      "SG": [
        { "name": "DBS Group Holdings", "ticker": "D05", "type": "Stock", "allocation": 10 },
        ...
      ],
      "Global": [
        { "name": "iShares MSCI World ETF", "ticker": "URTH", "type": "ETF", "allocation": 25 },
        ...
      ]
    }

    For Low Risk, focus on stable, dividend-paying stocks and broad market indexes with higher allocations to secure assets.
    For Medium Risk, include a mix of dividend-paying stocks, large-cap growth stocks, and sector ETFs with moderate allocations.
    For High Risk, include high-growth stocks, innovative sector ETFs, and emerging market exposure with more aggressive allocations.

    Ensure the allocation percentages across all assets sum up to 100%.
  `;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      return NextResponse.json({ error: 'Failed to connect to OpenAI API' }, { status: response.status });
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

    // Parse and normalize the JSON data from OpenAI response
    let recommendations;
    try {
      recommendations = JSON.parse(botResponse);
      recommendations = normalizeAllocations(recommendations); // Normalize to ensure sum is 100%
    } catch (parseError) {
      console.error("Failed to parse or normalize JSON:", parseError);
      return NextResponse.json({ error: 'Failed to parse JSON from OpenAI response' }, { status: 500 });
    }

    return NextResponse.json({ reply: recommendations });
  } catch (error) {
    console.error("Error connecting to OpenAI API:", error);
    return NextResponse.json({ error: 'Failed to connect to OpenAI API' }, { status: 500 });
  }
}
