# 10-Minute Demo Script: Wikipedia Search with Playwright MCP

## Demo Overview (10 minutes)
**Target Audience**: IBMers
**Goal**: Showcase Playwright MCP integration for automated Wikipedia searches

---

## 1. Introduction (1 minute)

### Opening Statement
"Today I'll demonstrate a Wikipedia search application that leverages Playwright's Model Context Protocol (MCP) for intelligent browser automation. This showcases how AI assistants can interact with web browsers programmatically."

### What You'll See
- What is Playwright MCP
- Installation and setup process
- Live demonstration of the application
- Key features and capabilities

---

## 2. What is Playwright MCP? (2 minutes)

### Explanation
**Playwright** is a browser automation framework that allows programmatic control of web browsers (Chrome, Firefox, Safari).

**MCP (Model Context Protocol)** is Anthropic's open standard that enables AI assistants to:
- Connect to external tools and services
- Execute browser automation tasks
- Interact with web applications in real-time

**Learn more**: https://playwright.dev/mcp/introduction

### Why Playwright MCP?
- ✅ **Automated Testing**: Run tests across multiple browsers
- ✅ **Web Scraping**: Extract data from dynamic websites
- ✅ **AI-Powered Automation**: Let AI assistants control browsers
- ✅ **Real-time Interaction**: Navigate, click, type, and extract data

### Key Capabilities
```
Browser Control → Navigate, Click, Type, Screenshot
Data Extraction → Evaluate JavaScript, Extract DOM content
Form Interaction → Fill forms, Upload files, Handle dialogs
Network Monitoring → Track requests, responses, performance
```

---

## 3. Installation Process (1.5 minutes)

### Step 1: Install Playwright MCP Server
```bash
npx @playwright/mcp@latest init
```

**What this does:**
- Creates `.playwright-mcp/` directory
- Installs Playwright browsers (Chromium, Firefox, WebKit)
- Generates configuration files

### Step 2: Configure MCP in IBM BOB
Configure IBM BOB to connect to the MCP server:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

### Step 3: Install Project Dependencies
```bash
npm install
```

**Dependencies:**
- Express.js (backend server)
- @modelcontextprotocol/sdk (MCP client)
- Playwright MCP tools

---

## 4. How I Prompted and Built This (1.5 minutes)

### Initial Prompt Strategy
"I asked IBM BOB to build a Wikipedia search application using Playwright MCP with these requirements:

1. **Backend**: Node.js server with MCP client integration
2. **Frontend**: Clean, responsive UI for search
3. **Automation**: Use Playwright to navigate Wikipedia and extract data
4. **Features**: Display article summary, sections, and infobox data"

### Development Approach
```
Prompt → IBM BOB generates code → Test → Refine → Deploy
```

### Key Prompts Used
1. "Create a Wikipedia search service using Playwright MCP"
2. "Add error handling and loading states"
3. "Extract structured data: title, summary, sections, infobox"
4. "Make the UI responsive and user-friendly"

---

## 5. Live Demo (3 minutes)

### Demo Flow

#### A. Show the Application
1. **Open Browser**: Navigate to `http://localhost:3000`
2. **Show UI**: Clean search interface

#### B. Perform Search #1: "IBM"
1. Type "IBM" in search box
2. Click Search
3. **Highlight Results**:
   - ✅ Article title
   - ✅ Summary paragraph
   - ✅ Table of contents (10 sections)
   - ✅ Infobox data (Founded, Industry, Revenue, etc.)
   - ✅ Wikipedia URL

#### C. Show Backend Logs
Switch to terminal to show:
```
📝 Search request received: "IBM"
Step 1: Navigating to Wikipedia...
Step 2: Entering search query...
Step 3: Extracting article content...
✓ Article extracted successfully
```

#### D. Perform Search #2: "Artificial Intelligence"
1. Search for a different topic
2. Show how quickly it retrieves data
3. Highlight different infobox structure

#### E. Show Error Handling
1. Search for nonsense: "asdfghjkl123"
2. Show graceful error message

---

## 6. Key Features Showcase (1 minute)

### Feature Highlights

#### 1. **Intelligent Data Extraction**
- Automatically finds and extracts article structure
- Handles different Wikipedia page layouts
- Filters out navigation and irrelevant content

#### 2. **Real-time Browser Automation**
```javascript
// Behind the scenes:
browser_navigate → browser_type → browser_evaluate
```

#### 3. **Structured Output**
- Title, Summary, Sections, Infobox, URL
- JSON format for easy integration
- Clean, readable presentation

#### 4. **Error Handling**
- Graceful failures for missing articles
- User-friendly error messages
- Automatic retry logic

#### 5. **Performance**
- Fast searches (2-3 seconds)
- Efficient DOM extraction
- Minimal resource usage

---

## 7. Q&A Preparation (Expected Questions)

### Question 1: "How does MCP differ from regular Playwright?"
**Answer**:
"Regular Playwright requires you to write explicit automation scripts. MCP allows AI assistants like IBM BOB to dynamically control the browser based on natural language instructions. The AI decides which tools to use and in what order, making it more flexible and intelligent."

### Question 2: "Can this work with other websites besides Wikipedia?"
**Answer**: 
"Absolutely! The same approach works for any website. You'd just modify the extraction logic to match the target site's structure. For example, we could search Amazon products, scrape news articles, or automate form submissions."

### Question 3: "What are the security implications?"
**Answer**: 
"Great question! MCP runs locally on your machine, so you control what it accesses. For production:
- Use environment variables for sensitive data
- Implement rate limiting
- Add authentication/authorization
- Run in sandboxed environments
- Monitor and log all automation activities"

### Question 4: "How scalable is this approach?"
**Answer**: 
"For this demo, it's single-threaded. For production scale:
- Use browser pools (multiple instances)
- Implement queue systems (Bull, RabbitMQ)
- Deploy on cloud infrastructure (AWS Lambda, Docker)
- Add caching (Redis) for frequent searches
- Use headless mode for better performance"

### Bonus Question: "What other use cases exist for Playwright MCP?"
**Answer**:
"Many exciting possibilities:
- **E2E Testing**: AI-generated test scenarios
- **Data Migration**: Extract data from legacy systems
- **Competitive Analysis**: Monitor competitor websites
- **Accessibility Testing**: Automated WCAG compliance checks
- **Screenshot Services**: Generate previews for URLs
- **Form Automation**: Fill out repetitive forms"

---

## 8. Closing (30 seconds)

### Summary Points
✅ Playwright MCP enables AI-powered browser automation
✅ Easy to set up and integrate
✅ Powerful for web scraping, testing, and automation
✅ Flexible and extensible for various use cases

### Call to Action
"The code is available in the repository. Feel free to explore, modify, and build your own MCP-powered applications!"

---

## Demo Checklist

### Before Demo
- [ ] Server running on port 3000
- [ ] Browser open to http://localhost:3000
- [ ] Terminal visible showing logs
- [ ] Test searches work (IBM, Artificial Intelligence)
- [ ] Error case tested (invalid search)
- [ ] Backup slides ready (if live demo fails)

### During Demo
- [ ] Speak clearly and at moderate pace
- [ ] Show code briefly (don't dwell too long)
- [ ] Highlight key features visually
- [ ] Engage audience with questions
- [ ] Keep to time (10 minutes)

### After Demo
- [ ] Answer questions confidently
- [ ] Provide repository link
- [ ] Offer to share documentation
- [ ] Follow up on complex questions

---

## Timing Breakdown
| Section | Time | Cumulative |
|---------|------|------------|
| Introduction | 1:00 | 1:00 |
| What is Playwright MCP | 2:00 | 3:00 |
| Installation | 1:30 | 4:30 |
| Prompting Strategy | 1:30 | 6:00 |
| Live Demo | 3:00 | 9:00 |
| Key Features | 1:00 | 10:00 |

**Q&A**: Additional 5-10 minutes

---

## Pro Tips

### 1. **Practice Run**
Do a full run-through at least twice before the actual demo.

### 2. **Have Backup**
If live demo fails, have screenshots/video ready.

### 3. **Engage Audience**
Ask: "Who has used Playwright before?" or "What automation challenges do you face?"

### 4. **Show, Don't Tell**
Let the application speak for itself. Less talking, more showing.

### 5. **Handle Failures Gracefully**
If something breaks: "This is actually a great opportunity to show error handling..."

---

## Additional Resources to Mention

- **Playwright MCP Introduction**: https://playwright.dev/mcp/introduction
- **Playwright Docs**: https://playwright.dev
- **MCP Specification**: https://modelcontextprotocol.io
- **Project Repository**: [Your GitHub link]
- **Anthropic MCP Guide**: https://docs.anthropic.com/mcp

---

Good luck with your demo! 🚀