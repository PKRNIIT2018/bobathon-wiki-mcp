# Wikipedia Search MCP Demo - Project Creation Prompt

## Project Overview

Create a full-stack web application that demonstrates the Model Context Protocol (MCP) by building a Wikipedia search tool. The application uses the Playwright MCP server to automate browser interactions, search Wikipedia, extract article content, and generate AI-powered summaries.

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js with Express.js
- **MCP Integration**: @modelcontextprotocol/sdk
- **Browser Automation**: Playwright MCP Server (@playwright/mcp)
- **Package Manager**: npm

## Project Requirements

### 1. Project Structure

Create the following directory structure:

```
MCPDemo/
├── frontend/
│   ├── index.html          # Main HTML page with search interface
│   ├── styles.css          # Complete styling with responsive design
│   └── app.js              # Client-side JavaScript for API calls
├── backend/
│   ├── server.js           # Express server with API endpoints
│   ├── mcpClient.js        # MCP Playwright client wrapper
│   └── wikipediaService.js # Wikipedia search and summarization logic
├── package.json            # Project dependencies and scripts
├── .gitignore             # Git ignore patterns
├── README.md              # Complete documentation
├── QUICKSTART.md          # Quick start guide
├── TROUBLESHOOTING.md     # Common issues and solutions
├── PLAN.md                # Detailed architecture and planning
├── MCP_INTEGRATION.md     # Technical MCP implementation guide
├── MCP_USE_CASES.md       # Comprehensive use case examples
└── PROMPT.md              # This file - project creation prompt
```

### 2. Core Functionality

#### Frontend Features
- Clean, Wikipedia-inspired user interface
- Search input with real-time validation
- Loading states with spinner animation
- Error handling with retry functionality
- Example search buttons for quick testing
- Responsive design for mobile and desktop
- AI-generated summary display (up to 1000 words)
- Prominent "View Full Article" button

#### Backend Features
- Express.js REST API server
- MCP client connection to Playwright server
- Wikipedia search automation
- Content extraction from Wikipedia pages
- AI summary generation (1000 words max)
- Comprehensive error handling
- Graceful shutdown handling
- Health check endpoint

#### MCP Integration
- Connect to Playwright MCP server via stdio transport
- Use browser automation tools:
  - `browser_navigate` - Navigate to Wikipedia
  - `browser_type` - Enter search queries
  - `browser_evaluate` - Extract page content
  - `browser_snapshot` - Capture page structure
  - `browser_close` - Clean up browser sessions

### 3. Implementation Details

#### Package.json Configuration

```json
{
  "name": "wikipedia-mcp-demo",
  "version": "1.0.0",
  "description": "Wikipedia search demo using Model Context Protocol with Playwright",
  "type": "module",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js",
    "dev": "node --watch backend/server.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.4",
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}
```

#### MCP Client Implementation

**Key Requirements:**
- Use StdioClientTransport for local Playwright MCP server
- Configure with chromium browser in headless mode
- Implement proper connection handling
- Add error handling for all MCP tool calls
- Provide helper methods for common operations
- Implement graceful disconnection

**Critical Configuration:**
```javascript
command: 'npx',
args: ['-y', '@playwright/mcp@latest', '--browser=chromium', '--headless']
```

#### Wikipedia Service Implementation

**Search Flow:**
1. Navigate to https://www.wikipedia.org
2. Wait 3 seconds for page load
3. Type search query with submit=true
4. Wait 5 seconds for results
5. Extract content using browser_evaluate
6. Parse MCP response (handle "### Result" format)
7. Generate AI summary (1000 words)
8. Return formatted data

**Content Extraction:**
- Title from `#firstHeading` or `h1`
- Summary from first non-empty paragraph
- Sections from `h2` and `h3` headings (deduplicated)
- Infobox data from `.infobox` tables
- Current URL
- Disambiguation page detection

**AI Summary Generation:**
- Include title, summary, key information (10 items)
- List article structure (15 main sections)
- Add contextual information
- Limit to 1000 words maximum
- Format with markdown-style bold text

#### Frontend Implementation

**Display Requirements:**
- Show ONLY AI summary in gradient purple card
- Include "AI Summary" header with "Up to 1000 words" badge
- Scrollable content area (max 600px height)
- Large "View Full Article on Wikipedia" button
- Convert markdown formatting to HTML
- Handle loading and error states

**Styling Requirements:**
- Gradient background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Glassmorphism effect with backdrop-filter
- Smooth animations and transitions
- Responsive design with mobile breakpoints
- Custom scrollbar styling
- Hover effects on interactive elements

### 4. Error Handling

#### Critical Error Scenarios

**Browser Not Installed:**
- Error: "Browser 'chrome-for-testing' is not installed"
- Solution: Run `npx @playwright/mcp install-browser chrome-for-testing`
- Prevention: Document in README and QUICKSTART

**JSON Parse Errors:**
- MCP returns "### Result" formatted responses
- Extract JSON between headers using regex
- Handle both "### Result" and "### Error" formats
- Provide detailed error logging

**Page Load Issues:**
- Implement adequate wait times (3-5 seconds)
- Check for page load completion
- Verify content extraction success
- Provide fallback error messages

**Duplicate Content:**
- Use Set to track seen section headings
- Filter out navigation elements
- Remove bracketed content from headings
- Skip "Contents", "Navigation menu", etc.

### 5. Best Practices

#### Code Quality
- Use ES6+ module syntax
- Implement async/await for all async operations
- Add comprehensive error handling with try-catch
- Include detailed console logging
- Write clean, readable code with comments
- Follow consistent naming conventions

#### Security
- Validate all user inputs
- Sanitize HTML output (use escapeHtml)
- Implement CORS properly
- Set reasonable rate limits
- Handle sensitive data appropriately

#### Performance
- Use headless browser mode
- Implement appropriate timeouts
- Minimize wait times where possible
- Clean up resources properly
- Handle concurrent requests

#### Documentation
- Provide complete README with setup instructions
- Include quick start guide
- Document all API endpoints
- Explain MCP integration details
- List common use cases
- Create troubleshooting guide

### 6. Testing Checklist

Before considering the project complete, verify:

- [ ] Dependencies install without errors
- [ ] Browser downloads and installs successfully
- [ ] Server starts and connects to MCP
- [ ] Frontend loads at http://localhost:3000
- [ ] Search functionality works for multiple topics
- [ ] AI summary generates correctly (up to 1000 words)
- [ ] "View Full Article" button opens Wikipedia
- [ ] Loading states display properly
- [ ] Error handling works for invalid searches
- [ ] No duplicate sections in results
- [ ] Responsive design works on mobile
- [ ] Server shuts down gracefully
- [ ] All documentation is complete

### 7. Common Pitfalls to Avoid

**DO NOT:**
- Use `en.wikipedia.org` - use `www.wikipedia.org` instead
- Parse MCP responses without handling "### Result" format
- Display raw Wikipedia content alongside AI summary
- Forget to install the browser before first run
- Use synchronous operations for async tasks
- Skip error handling for MCP tool calls
- Hardcode wait times without testing
- Ignore duplicate section filtering

**DO:**
- Read all related files together when making changes
- Use apply_diff for targeted code modifications
- Test thoroughly after each major change
- Provide complete file content in write_to_file
- Include all required parameters in tool calls
- Wait for user confirmation after tool use
- Update documentation as features are added

### 8. IBM Bob IDE Standards

When using IBM Bob as the IDE, follow these standards:

#### File Operations
- Read multiple related files simultaneously for efficiency
- Use `apply_diff` for targeted changes to existing files
- Use `write_to_file` only for new files or complete rewrites
- Always provide complete file content with accurate line counts
- Never use placeholders like "// rest of code unchanged"

#### Tool Usage
- Use exactly one tool per message
- Every assistant message must include a tool call
- Wait for user confirmation after each tool use
- Don't assume tool success without feedback
- Complete tasks step-by-step

#### Code Changes
- Make all related changes in a single apply_diff when possible
- Use multiple SEARCH/REPLACE blocks in one diff
- Match existing content exactly in SEARCH blocks
- Include sufficient context in line ranges
- Combine adjacent ranges (<10 lines apart)

#### Error Prevention
- Verify file paths are relative to workspace directory
- Check that all required parameters are included
- Validate line counts match actual content
- Test regex patterns before using in search_files
- Confirm MCP server configuration is correct

#### Documentation
- Create comprehensive README files
- Include quick start guides
- Document all API endpoints
- Explain architecture decisions
- Provide troubleshooting guides
- List all dependencies and versions

### 9. Success Criteria

The project is complete when:

1. ✅ All files are created with correct structure
2. ✅ Dependencies install without errors
3. ✅ MCP Playwright server connects successfully
4. ✅ Wikipedia searches work reliably
5. ✅ AI summaries generate correctly (1000 words)
6. ✅ UI displays only summary with full article button
7. ✅ No duplicate sections appear
8. ✅ Error handling works for all scenarios
9. ✅ Documentation is comprehensive
10. ✅ Code follows best practices

### 10. Deployment Notes

**Local Development:**
```bash
npm install
npx @playwright/mcp install-browser chrome-for-testing
npm start
```

**Environment Variables:**
- `PORT` - Server port (default: 3000)

**Browser Requirements:**
- Chrome for Testing (installed via Playwright MCP)
- Headless mode enabled by default

**Network Requirements:**
- Internet connection for Wikipedia access
- No proxy configuration needed for local development

### 11. Future Enhancements

Consider these improvements for future versions:

- Add caching for repeated searches
- Implement search history
- Support multiple languages
- Add image extraction
- Export summaries as PDF/Markdown
- Voice search integration
- Dark mode toggle
- Related articles suggestions
- User preferences storage
- Analytics and usage tracking

---

## Final Notes

This prompt provides a complete specification for building the Wikipedia Search MCP Demo. Follow the structure, implement all features, handle all error cases, and create comprehensive documentation. The result should be a production-ready application that demonstrates the power of MCP while providing real value to users.

**Remember:** Quality over speed. Take time to implement proper error handling, write clean code, and create thorough documentation. The goal is to create a reference implementation that others can learn from and build upon.