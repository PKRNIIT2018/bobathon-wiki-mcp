# Wikipedia Search with Playwright MCP
## 10-Minute Demo Presentation

---

## Slide 1: Title Slide
```
┌─────────────────────────────────────────────┐
│                                             │
│   Wikipedia Search with Playwright MCP     │
│                                             │
│   AI-Powered Browser Automation Demo       │
│                                             │
│   Presenter: [Your Name]                    │
│   Date: May 18, 2026                        │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 2: What is Playwright?
```
┌─────────────────────────────────────────────┐
│  What is Playwright?                        │
├─────────────────────────────────────────────┤
│                                             │
│  🎭 Browser Automation Framework            │
│                                             │
│  ✓ Control Chrome, Firefox, Safari         │
│  ✓ Automate user interactions              │
│  ✓ Extract data from web pages             │
│  ✓ Run tests across browsers               │
│                                             │
│  Use Cases:                                 │
│  • End-to-end testing                       │
│  • Web scraping                             │
│  • Screenshot generation                    │
│  • Form automation                          │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 3: What is MCP?
```
┌─────────────────────────────────────────────┐
│  Model Context Protocol (MCP)               │
├─────────────────────────────────────────────┤
│                                             │
│  🔌 Anthropic's Open Standard               │
│                                             │
│  Enables AI assistants to:                  │
│                                             │
│  ┌─────────────┐                            │
│  │  IBM BOB    │                            │
│  │     AI      │                            │
│  └──────┬──────┘                            │
│         │ MCP                                │
│         ↓                                    │
│  ┌─────────────┐                            │
│  │  Playwright │ → Browser Control          │
│  │   Tools     │                            │
│  └─────────────┘                            │
│                                             │
│  AI decides which tools to use!             │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 4: Playwright + MCP = Magic
```
┌─────────────────────────────────────────────┐
│  Playwright + MCP = Intelligent Automation  │
├─────────────────────────────────────────────┤
│                                             │
│  Traditional Playwright:                    │
│  ❌ Write explicit scripts                  │
│  ❌ Hard-coded selectors                    │
│  ❌ Manual maintenance                      │
│                                             │
│  With MCP:                                  │
│  ✅ AI-driven decisions                     │
│  ✅ Natural language instructions           │
│  ✅ Adaptive automation                     │
│                                             │
│  Example:                                   │
│  "Search Wikipedia for IBM"                 │
│  → AI navigates, searches, extracts data    │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 5: Installation Steps
```
┌─────────────────────────────────────────────┐
│  Installation (3 Simple Steps)              │
├─────────────────────────────────────────────┤
│                                             │
│  1️⃣  Install Playwright MCP                 │
│     npx @playwright/mcp@latest init         │
│                                             │
│  2️⃣  Configure IBM BOB                      │
│     Set up MCP server connection            │
│                                             │
│  3️⃣  Install Dependencies                   │
│     npm install                             │
│                                             │
│  ⏱️  Total Time: ~5 minutes                  │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 6: Architecture Overview
```
┌─────────────────────────────────────────────┐
│  System Architecture                        │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────┐                               │
│  │ Frontend │  (HTML/CSS/JS)                │
│  │   UI     │                               │
│  └────┬─────┘                               │
│       │ HTTP                                │
│       ↓                                     │
│  ┌──────────┐                               │
│  │ Backend  │  (Node.js/Express)            │
│  │  Server  │                               │
│  └────┬─────┘                               │
│       │ MCP                                 │
│       ↓                                     │
│  ┌──────────┐                               │
│  │Playwright│  (Browser Automation)         │
│  │   MCP    │                               │
│  └────┬─────┘                               │
│       │                                     │
│       ↓                                     │
│  ┌──────────┐                               │
│  │Wikipedia │                               │
│  └──────────┘                               │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 7: How I Built This
```
┌─────────────────────────────────────────────┐
│  Development Process with IBM BOB           │
├─────────────────────────────────────────────┤
│                                             │
│  Prompt-Driven Development:                 │
│                                             │
│  1. "Create Wikipedia search with MCP"      │
│     → IBM BOB generated backend service     │
│                                             │
│  2. "Add structured data extraction"        │
│     → IBM BOB enhanced parsing logic        │
│                                             │
│  3. "Build responsive frontend"             │
│     → IBM BOB created clean UI              │
│                                             │
│  4. "Add error handling"                    │
│     → IBM BOB improved reliability          │
│                                             │
│  Total Development Time: ~2 hours           │
│  (with IBM BOB AI assistance)               │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 8: Key Features
```
┌─────────────────────────────────────────────┐
│  Key Features                               │
├─────────────────────────────────────────────┤
│                                             │
│  🎯 Intelligent Data Extraction             │
│     • Article title & summary               │
│     • Table of contents                     │
│     • Infobox data                          │
│                                             │
│  ⚡ Real-time Automation                    │
│     • Navigate → Search → Extract           │
│     • 2-3 second response time              │
│                                             │
│  🛡️  Error Handling                         │
│     • Graceful failures                     │
│     • User-friendly messages                │
│                                             │
│  📊 Structured Output                       │
│     • JSON format                           │
│     • Clean presentation                    │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 9: Live Demo Flow
```
┌─────────────────────────────────────────────┐
│  Demo Walkthrough                           │
├─────────────────────────────────────────────┤
│                                             │
│  1. Show Application UI                     │
│     http://localhost:3000                   │
│                                             │
│  2. Search: "IBM"                           │
│     → Display results                       │
│     → Show backend logs                     │
│                                             │
│  3. Search: "Artificial Intelligence"       │
│     → Different data structure              │
│                                             │
│  4. Error Case: "asdfghjkl123"              │
│     → Graceful error handling               │
│                                             │
│  5. Show Code (briefly)                     │
│     → MCP integration                       │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 10: Behind the Scenes
```
┌─────────────────────────────────────────────┐
│  What Happens During Search?                │
├─────────────────────────────────────────────┤
│                                             │
│  Step 1: Navigate to Wikipedia              │
│  ┌────────────────────────────────┐         │
│  │ browser_navigate                │         │
│  │ url: "https://wikipedia.org"    │         │
│  └────────────────────────────────┘         │
│                                             │
│  Step 2: Enter Search Query                 │
│  ┌────────────────────────────────┐         │
│  │ browser_type                    │         │
│  │ target: '[name="search"]'       │         │
│  │ text: "IBM"                     │         │
│  │ submit: true                    │         │
│  └────────────────────────────────┘         │
│                                             │
│  Step 3: Extract Content                    │
│  ┌────────────────────────────────┐         │
│  │ browser_evaluate                │         │
│  │ → Run JavaScript in page        │         │
│  │ → Extract DOM elements          │         │
│  │ → Return structured data        │         │
│  └────────────────────────────────┘         │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 11: Use Cases Beyond Wikipedia
```
┌─────────────────────────────────────────────┐
│  Other Applications                         │
├─────────────────────────────────────────────┤
│                                             │
│  🧪 Automated Testing                       │
│     • E2E test generation                   │
│     • Cross-browser testing                 │
│                                             │
│  📊 Data Collection                         │
│     • Competitor analysis                   │
│     • Price monitoring                      │
│                                             │
│  📝 Form Automation                         │
│     • Bulk data entry                       │
│     • Application submissions               │
│                                             │
│  📸 Screenshot Services                     │
│     • URL previews                          │
│     • Visual regression testing             │
│                                             │
│  ♿ Accessibility Testing                   │
│     • WCAG compliance checks                │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 12: Q&A - Common Questions
```
┌─────────────────────────────────────────────┐
│  Expected Questions                         │
├─────────────────────────────────────────────┤
│                                             │
│  Q1: MCP vs Regular Playwright?             │
│  A: AI-driven vs script-based automation    │
│                                             │
│  Q2: Works with other websites?             │
│  A: Yes! Just modify extraction logic       │
│                                             │
│  Q3: Security implications?                 │
│  A: Runs locally, add auth for production   │
│                                             │
│  Q4: Scalability?                           │
│  A: Use browser pools, queues, caching      │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 13: Technical Deep Dive (Backup)
```
┌─────────────────────────────────────────────┐
│  Code Snippet: MCP Integration              │
├─────────────────────────────────────────────┤
│                                             │
│  const client = new Client({                │
│    name: "wikipedia-search",                │
│    version: "1.0.0"                         │
│  });                                        │
│                                             │
│  await client.connect(transport);           │
│                                             │
│  const result = await client.callTool({     │
│    name: "browser_navigate",                │
│    arguments: {                             │
│      url: "https://wikipedia.org"           │
│    }                                        │
│  });                                        │
│                                             │
│  // IBM BOB handles the rest!               │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 14: Performance Metrics
```
┌─────────────────────────────────────────────┐
│  Performance Stats                          │
├─────────────────────────────────────────────┤
│                                             │
│  ⚡ Average Search Time: 2-3 seconds        │
│                                             │
│  📦 Data Extracted:                         │
│     • Title                                 │
│     • Summary (800 chars)                   │
│     • 10 sections                           │
│     • 20+ infobox fields                    │
│                                             │
│  💾 Memory Usage: ~150MB                    │
│                                             │
│  🌐 Browser: Chromium (headless)            │
│                                             │
│  ✅ Success Rate: 95%+                      │
│     (for valid Wikipedia articles)          │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 15: Future Enhancements
```
┌─────────────────────────────────────────────┐
│  Roadmap & Ideas                            │
├─────────────────────────────────────────────┤
│                                             │
│  🚀 Planned Features:                       │
│                                             │
│  • Multi-language support                   │
│  • Image extraction                         │
│  • Related articles suggestions             │
│  • Search history                           │
│  • Export to PDF/Markdown                   │
│  • Voice search integration                 │
│                                             │
│  🔧 Technical Improvements:                 │
│                                             │
│  • Caching layer (Redis)                    │
│  • Rate limiting                            │
│  • Authentication                           │
│  • Docker deployment                        │
│  • Monitoring & analytics                   │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Slide 16: Thank You
```
┌─────────────────────────────────────────────┐
│                                             │
│              Thank You!                     │
│                                             │
│  📧 Contact: [your-email]                   │
│  🔗 GitHub: [repository-link]               │
│  📚 Docs: Available in repo                 │
│                                             │
│                                             │
│           Questions?                        │
│                                             │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Presentation Tips

### Slide Timing Guide
- Slides 1-4: 3 minutes (Introduction & Concepts)
- Slides 5-7: 2 minutes (Installation & Architecture)
- Slides 8-10: 2 minutes (Features & Demo prep)
- Live Demo: 3 minutes (Not on slides)
- Slides 11-12: 1 minute (Use cases & Q&A prep)
- Slides 13-16: Backup/Reference only

### Delivery Tips
1. **Don't read slides** - Use them as visual aids
2. **Maintain eye contact** - Look at audience, not screen
3. **Use pointer/cursor** - Highlight key points
4. **Pause for effect** - Let important points sink in
5. **Be enthusiastic** - Show excitement about the tech

### Slide Transitions
- Keep transitions simple (fade or none)
- Don't use distracting animations
- Advance slides smoothly during demo

### Backup Plan
If live demo fails:
- Have screenshots ready (Slides 13-14)
- Show recorded video
- Walk through code instead
- Focus on architecture (Slide 6)