# Demo Cheat Sheet - Quick Reference

## 🎯 Demo Objective
Show Wikipedia search app using Playwright MCP with IBM BOB for AI-powered browser automation

---

## ⏱️ Time Allocation (10 minutes)
- **0:00-1:00** - Introduction
- **1:00-3:00** - What is Playwright MCP
- **3:00-4:30** - Installation process
- **4:30-6:00** - How I built it with IBM BOB (prompting)
- **6:00-9:00** - **LIVE DEMO** ⭐
- **9:00-10:00** - Key features wrap-up

---

## 🚀 Demo Commands

### Start Server (if not running)
```bash
npm run dev
```

### Open Application
```
http://localhost:3000
```

### Test Searches (in order)
1. **"IBM"** - Shows full article with infobox
2. **"Artificial Intelligence"** - Different structure
3. **"asdfghjkl123"** - Error handling demo

---

## 💡 Key Talking Points

### What is Playwright?
- Browser automation framework
- Controls Chrome, Firefox, Safari
- Used for testing, scraping, automation

### What is MCP?
- Model Context Protocol by Anthropic
- Lets AI assistants like IBM BOB use external tools
- AI decides which tools to use and when

### Why This Matters?
- Traditional: Write explicit scripts
- With MCP + IBM BOB: AI-driven automation
- More flexible and intelligent

---

## 🎬 Demo Flow Checklist

### Before Starting
- [ ] Server running on port 3000
- [ ] Browser open to localhost:3000
- [ ] Terminal visible (for logs)
- [ ] Test all 3 searches work

### During Demo
1. [ ] Show clean UI
2. [ ] Search "IBM"
3. [ ] Point out: title, summary, sections, infobox
4. [ ] Switch to terminal - show logs
5. [ ] Search "Artificial Intelligence"
6. [ ] Search invalid term - show error
7. [ ] Briefly show code (backend/wikipediaService.js)

### What to Highlight
- ✅ Real-time browser automation via IBM BOB
- ✅ Structured data extraction
- ✅ Clean, responsive UI
- ✅ Error handling
- ✅ Fast performance (2-3 sec)

---

## 🎤 Opening Statement (Memorize)
"Today I'll demonstrate a Wikipedia search application that leverages Playwright's Model Context Protocol with IBM BOB for intelligent browser automation. This showcases how AI assistants can interact with web browsers programmatically to extract structured data in real-time."

---

## 📊 Key Features to Mention

1. **Intelligent Extraction with IBM BOB**
   - Automatically finds article structure
   - Handles different page layouts
   - Filters irrelevant content

2. **Real-time Automation**
   - Navigate → Type → Extract
   - 2-3 second response time

3. **Structured Output**
   - Title, summary, sections, infobox
   - JSON format
   - Clean presentation

4. **Error Handling**
   - Graceful failures
   - User-friendly messages

---

## ❓ Q&A - Prepared Answers

### Q1: "How does MCP differ from regular Playwright?"
**Answer**: "Regular Playwright requires explicit scripts. MCP allows AI assistants like IBM BOB to dynamically control the browser based on natural language. IBM BOB decides which tools to use, making it more flexible."

### Q2: "Can this work with other websites?"
**Answer**: "Absolutely! Same approach works anywhere. Just modify the extraction logic for the target site's structure. Could do Amazon products, news articles, form automation, etc."

### Q3: "What are the security implications?"
**Answer**: "MCP runs locally, so you control access. For production: use environment variables, implement rate limiting, add authentication, run in sandboxed environments, and monitor all activities."

### Q4: "How scalable is this?"
**Answer**: "This demo is single-threaded. For production scale: use browser pools, implement queue systems, deploy on cloud infrastructure, add caching with Redis, and use headless mode for better performance."

### Bonus Q: "What other use cases?"
**Answer**: "Many possibilities: E2E testing with AI-generated scenarios, data migration from legacy systems, competitive analysis, accessibility testing, screenshot services, and form automation."

---

## 🔧 Technical Details (If Asked)

### Architecture
```
Frontend (HTML/JS) 
    ↓ HTTP
Backend (Node.js/Express)
    ↓ MCP
IBM BOB + Playwright MCP
    ↓
Wikipedia
```

### MCP Tools Used
- `browser_navigate` - Go to Wikipedia
- `browser_type` - Enter search query
- `browser_evaluate` - Extract page content

### Tech Stack
- **Backend**: Node.js, Express, MCP SDK
- **Frontend**: Vanilla HTML/CSS/JS
- **Automation**: Playwright MCP with IBM BOB
- **Browser**: Chromium (headless)

---

## 🐛 Troubleshooting (If Demo Fails)

### Port 3000 in use
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Browser not responding
- Restart server
- Clear browser cache
- Check terminal for errors

### Fallback Plan
1. Show screenshots instead
2. Walk through code
3. Explain architecture
4. Show recorded video (if available)

---

## 📝 Installation Summary (If Asked)

### Step 1: Install Playwright MCP
```bash
npx @playwright/mcp@latest init
```

### Step 2: Configure IBM BOB
Set up MCP server connection in IBM BOB

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Run
```bash
npm run dev
```

---

## 🎯 Closing Statement (Memorize)
"This demo shows how Playwright MCP with IBM BOB enables AI-powered browser automation. It's easy to set up, powerful for web scraping and testing, and flexible for various use cases. The code is available in the repository - feel free to explore and build your own MCP-powered applications with IBM BOB!"

---

## 📋 Post-Demo Actions
- [ ] Share repository link
- [ ] Provide documentation
- [ ] Answer follow-up questions
- [ ] Collect feedback
- [ ] Send thank you email

---

## 🎨 Demo Tips

### DO:
✅ Speak clearly and confidently
✅ Show enthusiasm about IBM BOB
✅ Engage with audience
✅ Pause for questions
✅ Keep to time

### DON'T:
❌ Rush through slides
❌ Read from screen
❌ Apologize for bugs
❌ Go over time
❌ Get too technical (unless asked)

---

## 📞 Emergency Contacts
- **Repository**: [Your GitHub link]
- **Documentation**: README.md, MCP_INTEGRATION.md
- **Support**: [Your email/Slack]

---

## ✨ Success Metrics
- Demo completed in 10 minutes ✓
- All features shown ✓
- Questions answered confidently ✓
- Audience engaged ✓
- Repository shared ✓

---

## 🤖 IBM BOB Highlights

### What to Emphasize:
- IBM BOB generated all the code through prompts
- IBM BOB understood MCP integration requirements
- IBM BOB created error handling automatically
- IBM BOB optimized the data extraction logic
- Development time reduced from days to hours

### Example Prompts Used with IBM BOB:
1. "Create a Wikipedia search service using Playwright MCP"
2. "Add structured data extraction for title, summary, sections, and infobox"
3. "Implement error handling for invalid searches"
4. "Make the UI responsive and user-friendly"

---

**Good luck! You've got this! 🚀**