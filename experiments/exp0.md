Experiment 0: Token Sentiment Tracker
Status: 🔴 FAILED & ARCHIVED
Started: 2026-01-25
Failed: 2026-02-08
Duration: 14 days
Tags: sentiment-analysis twitter-api failed expensive-lesson
Overview
Original Goal: Build a real-time sentiment tracker that analyzes Twitter and Reddit posts about crypto tokens to generate sentiment scores and predict short-term price movements.
Why I thought this would work:
Social sentiment often precedes price movements
Twitter/Reddit are major crypto discussion platforms
LLMs are good at sentiment analysis
Real-time data = potential edge
Spoiler: It didn't work. At all.
What I Built
Architecture (Before it crashed and burned)
Twitter API v2 ──┐
                 ├─→ Message Queue (Redis) → Sentiment Analysis (GPT-3.5)
Reddit API ──────┘                              ↓
                                         Aggregation Layer
                                                ↓
                                         PostgreSQL Store
                                                ↓
                                         Dashboard (Streamlit)
Features Implemented
✅ Twitter stream listener for crypto keywords ($BTC, $ETH, etc.)
✅ Reddit scraper for r/cryptocurrency, r/bitcoin
✅ GPT-3.5 sentiment classification (positive/negative/neutral)
✅ Real-time dashboard with live sentiment scores
✅ Historical sentiment vs price correlation charts
What Failed ❌
The Rate Limit Massacre
Day 1-2: Everything works great! Getting ~500 tweets/min, processing smoothly.
Day 3: Twitter API v2 rate limits hit. Need to upgrade to paid tier.
Cost: $100/month for basic access
Thought: "Fine, this will be worth it"
Day 4: Rate limits hit again at scale. Need enterprise tier.
Cost: $5,000/month minimum
Thought: "Wait, what?"
Day 5-7: Tried to optimize, reduce keywords, cache aggressively. Didn't help.
Day 8: Total API costs for 48 hours: $147
Twitter API: $100 (upgrade fee)
Reddit API: $0 (scraping, no API used)
GPT-3.5 API: $47 (sentiment analysis on 23,400 posts)
Conclusion: This approach is economically IMPOSSIBLE at scale.
The Hallucination Problem
Even when it was working, GPT-3.5 was hallucinating like crazy:
Example 1:
Tweet: "Just bought more Bitcoin! 🚀"
GPT-3.5: "Negative sentiment - user expressing regret about Bitcoin purchase"
Example 2:
Tweet: "Ethereum is trash"
GPT-3.5: "Positive sentiment - user showing enthusiasm for Ethereum"
Result: Sentiment scores were basically random. Correlation with price: 0.03 (statistically zero).
Performance Issues
Latency: 1.2s average to process one tweet (GPT API call)
Backlog: Queue grew to 40,000+ messages in 24hrs
Crashes: Redis ran out of memory twice
Data quality: 60% of tweets were spam/bots
Key Learnings
What I Learned ✅
Twitter API v2 is a trap for real-time sentiment
Rate limits are designed for researchers, not production apps
Enterprise tier pricing is insane ($5k+/month minimum)
Free tier is basically unusable (50 requests/15min)
Social sentiment ≠ predictive signal
Most crypto Twitter is noise (bots, spam, shilling)
Reddit quality is higher but volume is lower
By the time something trends, it's too late
Correlation with price: basically zero
GPT-3.5 is terrible at sentiment on short text
Fine-tuned model needed (expensive to train)
Better to use specialized sentiment models
Or just use keyword matching (probably as good)
Real-time processing at scale is HARD
Need proper infrastructure (Kafka, not Redis)
Need horizontal scaling (expensive)
Need monitoring and alerting (time-consuming)
Cost estimates were way off
Thought: "Maybe $50/month"
Reality: "$2,940/month minimum" (enterprise Twitter + GPT-4 + infra)
What I'd Do Differently 🔄
If I tried this again (I won't):
Use on-chain data instead
Whale wallet movements
DEX trading volumes
Smart contract interactions
All publicly available, no rate limits
Focus on quality over quantity
Track 10 influential accounts, not 10,000 random ones
Use webhook notifications, not streaming
Process async, not real-time
Use specialized models
FinBERT for financial sentiment
Crypto-specific sentiment models (exist on HuggingFace)
Way cheaper than GPT API calls
Start with historical data
Prove correlation exists BEFORE building real-time
Back-test the strategy
Validate assumptions
The Numbers (Brutal Honesty)
Metric
Value
Days Active
14
Total Cost
$147
Tweets Processed
23,400
Cost per Tweet
$0.0063
API Requests
31,200
Successful Predictions
0
Working Code Remaining
~400 lines (deleted rest)
Hours Wasted
~60
Lessons Learned
Priceless
Code That Survived
Most code was deleted, but here's the only part worth saving - the async sentiment analyzer:
import asyncio
from openai import AsyncOpenAI

client = AsyncOpenAI()

async def analyze_sentiment(text: str) -> str:
    """
    Analyze sentiment of a tweet/post.
    Returns: "positive", "negative", or "neutral"
    
    Note: This didn't work well. Use FinBERT instead.
    """
    try:
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a crypto sentiment analyzer. Classify the sentiment as: positive, negative, or neutral. Respond with ONLY the sentiment, nothing else."
                },
                {
                    "role": "user", 
                    "content": f"Sentiment of: {text}"
                }
            ],
            max_tokens=10,
            temperature=0
        )
        
        sentiment = response.choices[0].message.content.strip().lower()
        
        # Validate response
        if sentiment not in ["positive", "negative", "neutral"]:
            return "neutral"  # Default fallback
            
        return sentiment
        
    except Exception as e:
        print(f"Sentiment analysis failed: {e}")
        return "neutral"

# Usage
# sentiment = await analyze_sentiment("Bitcoin to the moon! 🚀")
Alternatives That Might Actually Work
Based on what I learned, here are better approaches:
1. On-Chain Sentiment
Instead of social media, track:
Large wallet movements (> $1M transfers)
DEX volumes and liquidity changes
Smart contract deployments
Gas price spikes
Why better: No rate limits, no noise, actual money moving
2. Influencer Tracking
Instead of 10,000 random accounts, track 20 influential ones:
Set up webhook alerts
Process async, not real-time
Focus on quality signals
Why better: 100x less data, 10x better signal
3. Historical Analysis First
Before building real-time:
Download historical tweets (academic dataset)
Test if sentiment actually predicts anything
Validate assumptions with data
Why better: Prove the idea works before spending money
Final Thoughts
This was my first failed experiment in the lab. Feels bad, but that's the point of this lab - to try things, fail fast, and learn.
What I'm doing instead:
Pivoting to on-chain data analysis (Experiment 001)
Building a multi-LLM debate engine instead
Focusing on areas where API costs don't scale linearly
Biggest lesson: Validate your cost model BEFORE building. I should have calculated:
(tweets_per_day × api_cost_per_tweet × 30_days) = total_cost
Would have realized immediately this was unsustainable.
Archive Status
❌ Code deleted (kept only sentiment function above)
❌ Infrastructure shut down
❌ API keys revoked
✅ Lessons documented
✅ Moving on to next experiment
Time to fail: 14 days
Time to document failure: 1 day
Value of documentation: ∞
Next Experiment: Experiment 001: Multi-LLM Debate Engine
zyel@lab:~$ rm -rf experiment_000/
zyel@lab:~$ echo "fail fast, learn faster"
fail fast, learn faster
zyel@lab:~$ █
