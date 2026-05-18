# Troubleshooting Guide

## Common Issues and Solutions

### 1. Browser Not Installed Error

**Error Message:**
```
Error: Browser "chrome-for-testing" is not installed
```

**Solution:**
```bash
# Install the browser
npx @playwright/mcp install-browser chrome-for-testing

# This will download ~171 MB
# Wait for it to complete before starting the server
```

### 2. JSON Parse Error

**Error Message:**
```
Unexpected token '#', "### Error"... is not valid JSON
```

**Cause:** The MCP tool returned an error message instead of JSON data.

**Solutions:**
- Ensure the browser is installed (see issue #1)
- Increase wait times in `wikipediaService.js`
- Check internet connection
- Verify Wikipedia is accessible

### 3. Port Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find and kill the process using port 3000
lsof -i :3000
kill -9 <PID>

# Or use a different port
PORT=3001 npm start
```

### 4. MCP Connection Failed

**Error Message:**
```
Failed to connect to MCP server
```

**Solutions:**
- Ensure `@modelcontextprotocol/sdk` is installed
- Check that Playwright MCP is available: `npx @playwright/mcp@latest --version`
- Restart the server
- Check Node.js version (requires 18+)

### 5. Search Takes Too Long

**Symptoms:** Search hangs or times out

**Solutions:**
- First search may take longer (browser initialization)
- Check internet speed
- Increase timeout values in `wikipediaService.js`
- Verify Wikipedia is not blocked

### 6. No Results Found

**Symptoms:** Search completes but shows "Article Not Found"

**Possible Causes:**
- Topic doesn't exist on Wikipedia
- Disambiguation page (multiple meanings)
- Page structure changed
- Selectors need updating

**Solutions:**
- Try a more specific search term
- Check spelling
- Try alternative names
- Verify the article exists on Wikipedia manually

### 7. Module Not Found Errors

**Error Message:**
```
Cannot find module '@modelcontextprotocol/sdk'
```

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### 8. CORS Errors in Browser

**Error Message:**
```
Access to fetch blocked by CORS policy
```

**Solution:**
- Ensure the backend server is running
- Check that CORS is enabled in `server.js`
- Verify the API URL in `frontend/app.js` matches your server

### 9. Blank Page or UI Not Loading

**Symptoms:** Browser shows blank page at localhost:3000

**Solutions:**
- Check browser console for errors (F12)
- Verify frontend files are in the correct location
- Ensure server is serving static files
- Clear browser cache
- Try a different browser

### 10. Server Crashes on Search

**Symptoms:** Server stops responding during search

**Solutions:**
- Check server logs for error details
- Ensure sufficient memory available
- Verify browser process isn't hanging
- Restart the server
- Check for unhandled promise rejections

## Debugging Tips

### Enable Verbose Logging

The server already logs all MCP operations. Watch the console for:
- Navigation steps
- Tool calls
- Response data
- Error messages

### Test MCP Connection

```bash
# Check if MCP tools are available
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "mcp": "connected",
  "service": "ready"
}
```

### Test Search API Directly

```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"topic": "Test"}'
```

### Check Browser Installation

```bash
# Verify browser is installed
ls ~/.cache/ms-playwright/

# Should show chrome-for-testing directory
```

### Monitor Resource Usage

```bash
# Check if browser process is running
ps aux | grep chrome

# Check memory usage
top -o mem
```

## Getting Help

If you're still experiencing issues:

1. **Check the logs** - Server console shows detailed operation logs
2. **Verify prerequisites** - Node.js 18+, npm, internet connection
3. **Test components individually** - Frontend, backend, MCP connection
4. **Review documentation** - README.md, MCP_INTEGRATION.md
5. **Check MCP documentation** - https://modelcontextprotocol.io

## Known Limitations

1. **First search is slow** - Browser initialization takes time
2. **Complex pages** - Some Wikipedia pages may have different structures
3. **Rate limiting** - Wikipedia may rate limit excessive requests
4. **Browser resources** - Headless browser uses memory
5. **Network dependent** - Requires stable internet connection

## Performance Optimization

### Reduce Wait Times

If searches are consistently successful, you can reduce wait times in `wikipediaService.js`:

```javascript
await this.mcp.wait(2); // Instead of 3
await this.mcp.wait(3); // Instead of 5
```

### Enable Caching

Add caching to avoid repeated searches:

```javascript
const cache = new Map();
// Check cache before searching
if (cache.has(topic)) {
  return cache.get(topic);
}
```

### Use Headless Mode

Already enabled by default for better performance:

```javascript
'--headless' // In mcpClient.js
```

## Reporting Issues

When reporting issues, please include:

1. Error message (full stack trace)
2. Server console logs
3. Browser console errors (if applicable)
4. Node.js version: `node --version`
5. npm version: `npm --version`
6. Operating system
7. Steps to reproduce

## Quick Fixes Checklist

- [ ] Browser installed: `npx @playwright/mcp install-browser chrome-for-testing`
- [ ] Dependencies installed: `npm install`
- [ ] Server running: `npm start`
- [ ] Port 3000 available
- [ ] Internet connection working
- [ ] Wikipedia accessible
- [ ] Browser console clear of errors
- [ ] Server logs show no errors

---

**Most issues are resolved by:**
1. Installing the browser
2. Restarting the server
3. Clearing cache
4. Checking internet connection