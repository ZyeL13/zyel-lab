Experiment 1: Multi-LLM Debate Engine
Status: 🟢 Running
Started: 2026-02-10
Last Updated: 2026-02-15
Tags: llm-coordination crypto-analysis multi-agent
Overview
Testing multi-LLM coordination for crypto topics. Three language models debate bull/bear cases on crypto assets, with a fourth model acting as judge to reach consensus.
Goal: Build a system where multiple LLMs can coordinate, debate, and reach consensus on complex crypto analysis questions.
Architecture
User Query → Router LLM
              ↓
    ┌─────────┴─────────┐
    ↓         ↓         ↓
LLM A     LLM B     LLM C
(Bull)    (Bear)    (Neutral)
    ↓         ↓         ↓
    └─────────┬─────────┘
              ↓
        Judge LLM
              ↓
      Final Analysis
Components
LLM A (Bull Case): Claude Sonnet 4 - generates bullish arguments
LLM B (Bear Case): GPT-4 - generates bearish arguments
LLM C (Neutral): Gemini - provides balanced perspective
Judge LLM: Claude Opus 4 - synthesizes all arguments and reaches conclusion
Key Learnings
What Worked ✅
Claude stronger at reasoning: Opus 4 consistently produced better structured arguments with more logical flow
GPT-4 faster response time: Averaging 1.2s vs Claude's 2.4s for similar length outputs
Async debate structure: Running LLMs in parallel then judging sequentially was 3x faster than sequential debates
What Failed ❌
Timeout cascade problem: When LLM B was slow (>5s), entire chain would timeout
Solution: Added fallback chain with 3-model redundancy
If primary LLM times out → try backup LLM → if still fails → use cached generic response
Hallucination in edge cases: Judge LLM occasionally cited non-existent price data
Solution: Added fact-checking layer with on-chain oracle verification
Cost explosion: Initial implementation cost $2.40 per query
Solution: Implemented aggressive caching + cheaper models for bull/bear (Haiku/GPT-3.5)
Current Performance
Metric
Value
Avg Response Time
4.2s
Cost per Query
$0.18
Success Rate
94.3%
Hallucination Rate
2.1%
Implementation Details
Tech Stack:
Python 3.11
Anthropic API (Claude)
OpenAI API (GPT)
Google AI Studio (Gemini)
Redis (caching layer)
PostgreSQL (debate history storage)
Key Code Snippets:
async def run_debate(query: str) -> DebateResult:
    # Parallel execution of bull/bear/neutral
    bull, bear, neutral = await asyncio.gather(
        get_bull_case(query),
        get_bear_case(query),
        get_neutral_analysis(query),
        return_exceptions=True
    )
    
    # Fallback handling
    bull = await fallback_if_failed(bull, "bull")
    bear = await fallback_if_failed(bear, "bear")
    neutral = await fallback_if_failed(neutral, "neutral")
    
    # Judge synthesis
    verdict = await judge_consensus([bull, bear, neutral])
    
    return DebateResult(
        bull_case=bull,
        bear_case=bear,
        neutral_view=neutral,
        verdict=verdict,
        confidence=calculate_confidence(verdict)
    )
Next Steps
Experiment with different model combinations
Try Mistral for bear case (cheaper)
Test Claude Haiku for neutral (faster)
Add real-time market data integration
CoinGecko API for price feeds
On-chain metrics from Dune Analytics
Build web UI for live debates
Real-time streaming of arguments
Visualize confidence scores
Allow users to submit their own queries
Scale testing
Test with 100+ concurrent debates
Measure latency under load
Optimize caching strategy
Demo & Code
Live Demo: [Coming Soon]
GitHub Repo: github.com/yourusername/multi-llm-debate
Playground: Run on Replit
Discussion & Notes
2026-02-15: Judge LLM sometimes too conservative - considers both sides "valid" without taking stance. May need to add forced-choice mechanism.
2026-02-12: Discovered that running judge synthesis twice with different prompts and averaging results improves consistency by 18%.
2026-02-10: Initial prototype working! 3 models debating in real-time feels like magic. Now need to fix the timeout issues before scaling.
Status Legend:
🟢 Running - Active development
🟡 Paused - On hold
🔴 Failed - Archived with learnings
✅ Complete - Finished & deployed
