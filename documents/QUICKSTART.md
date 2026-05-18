# Quick Start Guide

## Prerequisites

✅ Node.js 18+ installed
✅ npm package manager
✅ Internet connection (for Wikipedia access)
✅ Playwright MCP server (installed automatically)

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Express (web server)
- CORS (cross-origin support)
- MCP SDK (Model Context Protocol client)

### 2. Start the Server

```bash
npm start
```

You should see:
```
=== Initializing MCP Playwright Client ===
Connecting to Playwright MCP server...
✓ Connected to Playwright MCP server
Available MCP tools: browser_navigate, browser_type, browser_click, ...
✓ MCP client and Wikipedia service ready

==================================================
🚀 Wikipedia Search MCP Demo Server
==================================================
📍 Server running at: http://localhost:3000
🔧 API endpoint: http://localhost:3000/api/search
💚 Health check: http://localhost:3000/api/health
==================================================

Ready to accept search requests!
```

### 3. Open the Application

Open your browser and navigate to:
```
http://localhost:3000
```

### 4. Try a Search

1. Enter a topic in the search box (e.g., "Artificial Intelligence")
2. Click "Search" or press Enter
3. Wait a few seconds while the MCP server:
   - Launches a browser
   - Navigates to Wikipedia
   - Searches for your topic
   - Extracts the article content
   - Returns formatted results

## Example Searches

Try these topics to see the demo in action:

- **Artificial Intelligence** - Tech topic with rich content
- **Model Context Protocol** - The technology powering this demo
- **Web Scraping** - Relevant to what the demo does
- **Python** - Programming language with detailed article
- **Machine Learning** - Another tech topic

## Testing the API Directly

### Health Check
```bash
curl http://localhost:3000/api/health
```

Response:
```json
{
  "status": "ok",
  "mcp": "connected",
  "service": "ready",
  "timestamp": "2026-05-15T06:40:00.000Z"
}
```

### Search Request
```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"topic": "Artificial Intelligence"}'
```

Response:
```json
{
  "success": true,
  "data": {
    "title": "Artificial Intelligence",
    "summary": "Artificial intelligence is...",
    "sections": [...],
    "infobox": {...},
    "url": "https://en.wikipedia.org/wiki/Artificial_intelligence"
  }
}
```

## Troubleshooting

### Server Won't Start

**Problem**: Port 3000 already in use
```bash
# Check what's using port 3000
lsof -i :3000

# Use a different port
PORT=3001 npm start
```

### MCP Connection Failed

**Problem**: Playwright MCP server not found
```bash
# Verify Playwright MCP is available
npx @playwright/mcp@latest --version

# If not found, it will be installed automatically on first run
```

### Search Takes Too Long

**Problem**: Slow internet or Wikipedia is slow
- The first search may take longer as Playwright downloads browser binaries
- Subsequent searches should be faster
- Typical search time: 5-10 seconds

### Browser Errors

**Problem**: Browser automation fails
- Check your internet connection
- Ensure Wikipedia is accessible
- Try restarting the server
- Check console logs for detailed error messages

### No Results Found

**Problem**: Article not found or disambiguation page
- Try a more specific search term
- Check spelling
- Try alternative names for the topic

## Development Mode

Run with auto-reload on file changes:
```bash
npm run dev
```

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.

The server will:
1. Close the browser session
2. Disconnect from MCP server
3. Clean up resources
4. Exit gracefully

## Project Structure

```
MCPDemo/
├── frontend/           # Web interface
│   ├── index.html     # Main page
│   ├── styles.css     # Styling
│   └── app.js         # Client-side logic
├── backend/           # Server code
│   ├── server.js      # Express server
│   ├── mcpClient.js   # MCP client wrapper
│   └── wikipediaService.js  # Wikipedia search logic
├── package.json       # Dependencies
└── README.md          # Full documentation
```

## Next Steps

1. ✅ **Try Different Searches** - Test various topics
2. ✅ **Check the Logs** - See MCP operations in console
3. ✅ **Modify the Code** - Customize extraction logic
4. ✅ **Add Features** - Extend with more MCP tools
5. ✅ **Read Documentation** - Check MCP_INTEGRATION.md and MCP_USE_CASES.md

## Common Use Cases

This demo shows one use case (Wikipedia search), but MCP can be used for:

- **Web Automation**: Testing, scraping, monitoring
- **Development Tools**: Code analysis, Git operations
- **Data Integration**: Database queries, API calls
- **Testing**: UI testing, visual regression
- **DevOps**: Server monitoring, deployments

See `MCP_USE_CASES.md` for detailed examples.

## Support

- 📖 [MCP Documentation](https://modelcontextprotocol.io)
- 🐙 [MCP GitHub](https://github.com/modelcontextprotocol)
- 🎭 [Playwright MCP](https://github.com/microsoft/playwright-mcp)

## Demo Checklist

Before presenting:
- [ ] Server starts without errors
- [ ] Can access http://localhost:3000
- [ ] Search works for multiple topics
- [ ] Results display correctly
- [ ] Error handling works (try invalid input)
- [ ] Console logs are informative

---

**Ready to demo!** 🚀