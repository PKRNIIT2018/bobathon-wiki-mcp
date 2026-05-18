# Wikipedia Search MCP Demo

A demonstration application showcasing the Model Context Protocol (MCP) using Playwright for automated Wikipedia searches.

## What This Demo Shows

This project demonstrates how to:
- ✅ Integrate MCP servers into a web application
- ✅ Use Playwright MCP server for browser automation
- ✅ Build a practical search interface with real-time results
- ✅ Extract and format web content programmatically
- ✅ Create a clean separation between UI, API, and automation layers

## Features

- 🔍 **Smart Search**: Enter any topic and get Wikipedia content instantly
- 🎨 **Clean UI**: Wikipedia-inspired interface with responsive design
- ⚡ **Fast Results**: Optimized content extraction and formatting
- 🛡️ **Error Handling**: Graceful handling of failed searches and edge cases
- 📱 **Responsive**: Works on desktop and mobile devices

## Architecture Overview

```
┌─────────────┐
│   Browser   │ ← User Interface
└──────┬──────┘
       │ HTTP
┌──────▼──────┐
│   Express   │ ← API Server
│   Server    │
└──────┬──────┘
       │ MCP Protocol
┌──────▼──────┐
│ Playwright  │ ← MCP Server
│ MCP Server  │
└──────┬──────┘
       │ Browser Automation
┌──────▼──────┐
│  Wikipedia  │ ← Target Website
└─────────────┘
```

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Playwright MCP server (will be installed automatically)

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd MCPDemo

# Install dependencies
npm install
```

### 2. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### 3. Use the Application

1. Open your browser to `http://localhost:3000`
2. Enter a topic (e.g., "Artificial Intelligence")
3. Click "Search" or press Enter
4. View the formatted Wikipedia content

## Project Structure

```
MCPDemo/
├── frontend/
│   ├── index.html          # Main HTML page
│   ├── styles.css          # Styling
│   └── app.js              # Frontend JavaScript
├── backend/
│   ├── server.js           # Express server
│   ├── mcpClient.js        # MCP client wrapper
│   └── wikipediaService.js # Wikipedia search logic
├── package.json            # Dependencies
├── PLAN.md                 # Detailed project plan
├── MCP_INTEGRATION.md      # Technical MCP guide
└── README.md               # This file
```

## How It Works

### 1. User Interaction
User enters a search topic in the web interface.

### 2. API Request
Frontend sends POST request to `/api/search` with the topic.

### 3. MCP Communication
Backend uses MCP client to communicate with Playwright server:
- Navigate to Wikipedia
- Type search query
- Extract article content
- Format and return data

### 4. Display Results
Frontend receives formatted data and displays it to the user.

## MCP Tools Used

This demo uses the following Playwright MCP tools:

| Tool | Purpose |
|------|---------|
| `browser_navigate` | Navigate to Wikipedia homepage |
| `browser_type` | Enter search query in search box |
| `browser_snapshot` | Capture page structure for element selection |
| `browser_evaluate` | Execute JavaScript to extract article content |
| `browser_wait_for` | Wait for page to load after search |
| `browser_close` | Clean up browser session |

## API Endpoints

### POST /api/search
Search Wikipedia for a topic.

**Request:**
```json
{
  "topic": "Artificial Intelligence"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Artificial Intelligence",
    "summary": "Artificial intelligence is...",
    "sections": [
      { "level": "h2", "text": "History" },
      { "level": "h2", "text": "Applications" }
    ],
    "url": "https://en.wikipedia.org/wiki/Artificial_intelligence"
  }
}
```

### GET /api/health
Check server and MCP connection status.

**Response:**
```json
{
  "status": "ok",
  "mcp": "connected"
}
```

## Common MCP Use Cases

Beyond this Wikipedia search demo, MCP can be used for many other scenarios:

### 1. **Development Tools**
- Code analysis and refactoring
- Git operations (commits, branches, PRs)
- Project scaffolding and generation
- Dependency management

### 2. **Data Integration**
- Database queries and updates
- File system operations
- API integrations
- Data transformation pipelines

### 3. **Testing & QA**
- Automated UI testing
- Visual regression testing
- Performance monitoring
- Accessibility audits

### 4. **Content Management**
- Web scraping and data extraction
- Content aggregation
- Document processing
- Media file handling

### 5. **DevOps & Automation**
- Server monitoring
- Deployment automation
- Log analysis
- Infrastructure management

### 6. **Business Intelligence**
- Report generation
- Data visualization
- Analytics dashboards
- KPI tracking

## Extending This Demo

### Add More MCP Servers

```javascript
// Example: Add filesystem MCP server
import { FilesystemMCPClient } from './filesystemClient.js';

const fsClient = new FilesystemMCPClient();
await fsClient.connect();

// Save search results to file
await fsClient.callTool('write_file', {
  path: 'results.json',
  content: JSON.stringify(searchResults)
});
```

### Add Caching

```javascript
// Cache recent searches
const cache = new Map();

app.post('/api/search', async (req, res) => {
  const { topic } = req.body;
  
  if (cache.has(topic)) {
    return res.json(cache.get(topic));
  }
  
  const result = await wikiService.search(topic);
  cache.set(topic, result);
  
  res.json(result);
});
```

### Add More Features

- **Image Extraction**: Use `browser_take_screenshot` to capture images
- **Related Articles**: Extract "See also" section links
- **Multiple Languages**: Support different Wikipedia language editions
- **Export Options**: Save results as PDF or Markdown
- **Search History**: Track and display recent searches

## Troubleshooting

### Server Won't Start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Use a different port
PORT=3001 npm start
```

### MCP Connection Failed
```bash
# Verify Playwright MCP is installed
npx @playwright/mcp@latest --version

# Reinstall if needed
npm install @playwright/mcp@latest
```

### Search Returns No Results
- Check your internet connection
- Verify Wikipedia is accessible
- Try a different search term
- Check browser console for errors

### Slow Performance
- Increase timeout values in `wikipediaService.js`
- Use headless browser mode (already default)
- Implement caching for repeated searches

## Development

### Run in Development Mode
```bash
npm run dev
```

### Run Tests
```bash
npm test
```

### Lint Code
```bash
npm run lint
```

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this demo for learning and projects.

## Resources

- [MCP Documentation](https://modelcontextprotocol.io)
- [Playwright MCP Server](https://github.com/microsoft/playwright-mcp)
- [MCP SDK](https://github.com/modelcontextprotocol/sdk)
- [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page)

## Demo Video

[Coming Soon - Add link to demo video]

## Screenshots

[Coming Soon - Add screenshots of the application]

## Support

For questions or issues:
- Open an issue on GitHub
- Check the MCP documentation
- Review the troubleshooting section

---

**Built with ❤️ to demonstrate the power of MCP**