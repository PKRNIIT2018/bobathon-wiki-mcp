# Server Commands - Quick Reference

## 🚀 Starting the Server

### Method 1: Using npm (Recommended)
```bash
npm run dev
```

### Method 2: Using Node directly
```bash
node backend/server.js
```

### What You'll See When Started:
```
Available MCP tools: browser_close, browser_resize, browser_console_messages...
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

---

## 🛑 Stopping the Server

### Method 1: In the Terminal (Recommended)
Press `Ctrl + C` in the terminal where the server is running

### Method 2: Kill by Port Number
If the server is stuck or running in background:

```bash
# Find the process using port 3000
lsof -ti:3000

# Kill the process
lsof -ti:3000 | xargs kill -9
```

### Method 3: Kill by Process Name
```bash
# Find Node processes
ps aux | grep node

# Kill specific process by PID
kill -9 <PID>
```

---

## 🔄 Restart the Server

### Quick Restart
```bash
# Stop the server (Ctrl + C)
# Then start again
npm run dev
```

### Force Restart (if port is in use)
```bash
# Kill any process on port 3000
lsof -ti:3000 | xargs kill -9

# Start the server
npm run dev
```

---

## 🐛 Troubleshooting

### Error: "EADDRINUSE: address already in use :::3000"

**Problem**: Port 3000 is already being used by another process

**Solution**:
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Start the server again
npm run dev
```

### Error: "Cannot find module"

**Problem**: Dependencies not installed

**Solution**:
```bash
npm install
npm run dev
```

### Server Starts but Browser Shows Error

**Problem**: MCP client not initialized properly

**Solution**:
```bash
# Stop server (Ctrl + C)
# Restart it
npm run dev
```

---

## 📋 Pre-Demo Checklist

### Before Your Demo:
```bash
# 1. Make sure port 3000 is free
lsof -ti:3000 | xargs kill -9 2>/dev/null

# 2. Start the server
npm run dev

# 3. Wait for confirmation message
# Look for: "Ready to accept search requests!"

# 4. Test in browser
# Open: http://localhost:3000

# 5. Test a search
# Try searching for "IBM"
```

---

## 🎬 During Demo

### Keep Terminal Visible
- Show the terminal with server logs
- Audience can see real-time MCP tool calls
- Demonstrates the automation process

### What Logs to Point Out:
```
📝 Search request received: "IBM"
Step 1: Navigating to Wikipedia...
Calling MCP tool: browser_navigate
✓ Tool browser_navigate completed
Step 2: Entering search query...
Calling MCP tool: browser_type
✓ Tool browser_type completed
Step 3: Extracting article content...
✓ Article extracted successfully
```

---

## 🔧 Advanced Commands

### Run in Background (Not Recommended for Demo)
```bash
npm run dev &
```

### Check if Server is Running
```bash
# Check port 3000
lsof -i:3000

# Check Node processes
ps aux | grep "node backend/server.js"

# Test with curl
curl http://localhost:3000/api/health
```

### View Server Logs
If running in background:
```bash
tail -f nohup.out
```

---

## 💡 Quick Tips

### Tip 1: Use Two Terminals
- **Terminal 1**: Run the server (`npm run dev`)
- **Terminal 2**: Available for other commands

### Tip 2: Keep Server Running
- Don't stop/restart during demo unless necessary
- Start it before the presentation begins
- Test it works before going live

### Tip 3: Have Backup Plan
If server crashes during demo:
```bash
# Quick recovery
lsof -ti:3000 | xargs kill -9 && npm run dev
```

---

## 📱 One-Line Commands

### Start Fresh
```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null; npm run dev
```

### Check Status
```bash
curl -s http://localhost:3000/api/health && echo "✓ Server is running" || echo "✗ Server is down"
```

### Emergency Stop
```bash
lsof -ti:3000 | xargs kill -9 && echo "✓ Server stopped"
```

---

## 🎯 Demo Day Commands

### Morning of Demo:
```bash
# 1. Navigate to project
cd /Users/prasanthramesh/WorkSpace/MCPDemo-Wiki

# 2. Pull latest changes (if any)
git pull

# 3. Install/update dependencies
npm install

# 4. Test start
npm run dev

# 5. Test in browser
open http://localhost:3000

# 6. Test search functionality
# Search for "IBM" in the UI

# 7. If all works, you're ready!
```

### 5 Minutes Before Demo:
```bash
# Ensure clean start
lsof -ti:3000 | xargs kill -9 2>/dev/null
npm run dev

# Wait for "Ready to accept search requests!"
# Open browser to http://localhost:3000
# You're ready to present!
```

---

## ⚠️ Important Notes

1. **Always use `Ctrl + C` first** - Cleanest way to stop
2. **Use `kill -9` only if necessary** - Force kills the process
3. **Check logs for errors** - Terminal shows what went wrong
4. **Test before demo** - Run through all searches once
5. **Keep terminal visible** - Shows the automation in action

---

## 🆘 Emergency Recovery

If everything goes wrong:
```bash
# Nuclear option - restart everything
lsof -ti:3000 | xargs kill -9
pkill -f "node backend/server.js"
npm install
npm run dev
```

---

**Remember**: The server must be running for the demo to work!
Check that you see "Ready to accept search requests!" before starting your presentation.