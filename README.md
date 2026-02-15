# zyel lab

> public ai + crypto experiment lab  
> building in public. documenting failures.

[![Status](https://img.shields.io/badge/status-active-00ff88)](https://github.com/yourusername/zyel-lab)
[![License](https://img.shields.io/badge/license-MIT-00cc6a)](./LICENSE)
[![Experiments](https://img.shields.io/badge/experiments-2-00ff88)](./experiments)

**Live Site:** [zyel.vercel.app](https://zyel-lab.vercel.app) *(replace with your actual domain)*

---

## What is this?

This is my public lab where I:
- Build small AI + crypto systems
- Break them
- Document what I learn

**Philosophy:** Shipping experiments > talking about ideas

I'm not polishing anything. I'm building in public. Failures are documented alongside successes.

---

## Project Structure

```
zyel-lab/
│
├── index.html          # Landing page with terminal UI
├── style.css           # Terminal aesthetic (CRT effects, scanlines)
├── script.js           # Typing animations, menu interactions
│
├── experiments/        # All experiments (active + archived)
│   ├── exp1.md        # Multi-LLM Debate Engine
│   └── exp0.md        # Token Sentiment Tracker (failed)
│
├── log/               # Daily experiment journal
│   └── 2026-02-15.md # Latest entry
│
└── playground/        # Interactive demos
    └── (Replit/CodeSandbox embeds)
```

---

## Tech Stack

**Frontend:**
- HTML/CSS/JavaScript (no framework)
- Terminal aesthetic with CRT effects
- Responsive design
- Deployed on Vercel

**Backend (varies by experiment):**
- Python 3.11
- Anthropic API (Claude)
- OpenAI API (GPT)
- Google AI Studio (Gemini)
- Redis / PostgreSQL

---

## Features

✅ **Terminal UI** - Retro hacker aesthetic with CRT glow  
✅ **Typing animations** - Dynamic content rendering  
✅ **Hamburger menu** - Smooth sidebar navigation  
✅ **Experiment tracking** - Active/archived status with learnings  
✅ **Daily logs** - Raw notes showing momentum  
✅ **Interactive playground** - One-click demos via embeds  
✅ **Keyboard shortcuts** - Alt+M (menu), Alt+1-5 (sections)  
✅ **Console easter eggs** - Check browser console ;)

---

## Current Experiments

### 🟢 Active

**[Experiment 001: Multi-LLM Debate Engine](./experiments/exp1.md)**  
Three LLMs debate crypto topics, fourth judges consensus. Testing multi-model coordination.

**Key Learning:** Claude better reasoning, GPT faster. Timeout cascade problem → 3-level fallback fixed it.

### 🔴 Failed

**[Experiment 000: Token Sentiment Tracker](./experiments/exp0.md)**  
Real-time Twitter/Reddit sentiment analysis. Failed due to API rate limit costs ($147 in 48hr).

**Pivot:** Moving to on-chain data instead of social media.

---

## Quick Start

### Local Development

```bash
# Clone the repo
git clone https://github.com/yourusername/zyel-lab.git
cd zyel-lab

# Open in browser (no build step needed)
open index.html

# Or use a local server
python -m http.server 8000
# Visit http://localhost:8000
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts - it's a static site, no config needed
```

---

## Adding a New Experiment

1. **Create markdown file:**
```bash
touch experiments/exp2.md
```

2. **Use this template:**
```markdown
# Experiment 2: [Your Title]

**Status:** 🟢 Running / 🟡 Paused / 🔴 Failed / ✅ Complete
**Started:** YYYY-MM-DD
**Tags:** `tag1` `tag2`

## Overview
[What are you testing?]

## Key Learnings
### What Worked ✅
### What Failed ❌

## Implementation Details
[Code, architecture, etc.]

## Next Steps
[What's next?]
```

3. **Update index.html** (or auto-generate via script)

4. **Log your progress:**
```bash
echo "## Experiment 2 Update\n- Started today\n- Initial tests..." >> log/$(date +%Y-%m-%d).md
```

---

## Daily Log Format

Each day gets a new markdown file in `/log/YYYY-MM-DD.md`:

```markdown
# Log Entry: YYYY-MM-DD

## Today's Progress
- What you built
- What broke
- What you learned

## Experiment Updates
[Status on active experiments]

## Ideas & Thoughts
[Random observations, new ideas]

## Tomorrow's Plan
[What's next]
```

**Purpose:** Show momentum, not just finished products. Recruiters/visitors see consistent building trajectory.

---

## Playground Setup

Interactive demos use embeds from:
- [Replit](https://replit.com) - For Python/Node apps
- [CodeSandbox](https://codesandbox.io) - For web apps
- [StackBlitz](https://stackblitz.com) - For frontend demos

**To add a demo:**
1. Build your experiment on one of these platforms
2. Get the embed/share link
3. Add to playground section in `index.html`
4. Users can run your experiment with one click

---

## Design Philosophy

### Aesthetic
- **Terminal/hacker vibe** - Not enterprise SaaS
- **CRT effects** - Scanlines, glow, subtle flicker
- **Monospace everything** - JetBrains Mono font
- **Green on black** - Classic terminal palette (#00ff88)

### Content
- **Raw & unpolished** - No marketing speak
- **Failures documented** - Learn in public
- **Technical depth** - Show the code, metrics, trade-offs
- **Weekly cadence** - One experiment per week

### Code
- **Production-grade** - Even if the idea is experimental
- **No frameworks** - Vanilla HTML/CSS/JS for simplicity
- **Accessible** - Semantic HTML, keyboard shortcuts
- **Fast** - Static site, minimal JS, lazy loading

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt+M` | Toggle menu |
| `Alt+1` | Jump to About |
| `Alt+2` | Jump to Experiments |
| `Alt+3` | Jump to Log |
| `Alt+4` | Jump to Playground |

**Console Commands:**
Open browser console and try:
```javascript
help()          // Show available commands
experiments()   // Jump to experiments section
log()          // Jump to log section  
playground()   // Jump to playground section
```

---

## Contributing

This is a **personal lab**, so I'm not accepting PRs for experiments (those are my learning journey).

**But you can:**
- ⭐ Star the repo if you like the concept
- 🐛 Report bugs in the website itself
- 💡 Share ideas in Discussions
- 🔗 Fork and build your own lab!

---

## Inspiration

This lab is inspired by:
- [100 Days of Code](https://www.100daysofcode.com/) - Public accountability
- [Indie Hackers](https://www.indiehackers.com/) - Build in public movement
- [Hacker News](https://news.ycombinator.com/) - Learning from failures
- Old-school terminal UIs - Nostalgia + aesthetics

---

## License

MIT License - Feel free to fork and build your own lab!

See [LICENSE](./LICENSE) for details.

---

## Contact

- **GitHub:** [@yourusername](https://github.com/ZyeL13)
- **Twitter:** [@yourusername](https://twitter.com/xumuhl)
- **Email:** aryandopurnama@gmail.com

---

**Last Updated:** 2026-02-15  
**Experiments:** 2 active, 0 paused, 1 failed  
**Status:** Actively building 🚀

---

```
███████╗██╗   ██╗███████╗██╗         ██╗      █████╗ ██████╗ 
╚══███╔╝╚██╗ ██╔╝██╔════╝██║         ██║     ██╔══██╗██╔══██╗
  ███╔╝  ╚████╔╝ █████╗  ██║         ██║     ███████║██████╔╝
 ███╔╝    ╚██╔╝  ██╔══╝  ██║         ██║     ██╔══██║██╔══██╗
███████╗   ██║   ███████╗███████╗    ███████╗██║  ██║██████╔╝
╚══════╝   ╚═╝   ╚══════╝╚══════╝    ╚══════╝╚═╝  ╚═╝╚═════╝ 

zyel@lab:~$ █
```

