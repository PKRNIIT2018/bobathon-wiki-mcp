import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import MCPPlaywrightClient from './mcpClient.js';
import WikipediaSearchService from './wikipediaService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Global MCP client and service instances
let mcpClient = null;
let wikiService = null;
let isInitializing = false;

/**
 * Initialize MCP connection
 */
async function initializeMCP() {
    if (isInitializing) {
        console.log('MCP initialization already in progress...');
        return;
    }

    isInitializing = true;

    try {
        console.log('\n=== Initializing MCP Playwright Client ===');
        
        mcpClient = new MCPPlaywrightClient();
        await mcpClient.connect();
        
        wikiService = new WikipediaSearchService(mcpClient);
        
        console.log('✓ MCP client and Wikipedia service ready\n');
        isInitializing = false;
        return true;
    } catch (error) {
        console.error('Failed to initialize MCP:', error);
        isInitializing = false;
        throw error;
    }
}

/**
 * Ensure MCP is connected before handling requests
 */
async function ensureMCPConnection(req, res, next) {
    if (!mcpClient || !mcpClient.isConnected) {
        try {
            await initializeMCP();
            next();
        } catch (error) {
            res.status(503).json({
                success: false,
                error: 'MCP service unavailable. Please try again in a moment.'
            });
        }
    } else {
        next();
    }
}

// Routes

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    const status = mcpClient ? mcpClient.getConnectionStatus() : { connected: false };
    
    res.json({
        status: 'ok',
        mcp: status.connected ? 'connected' : 'disconnected',
        service: wikiService ? 'ready' : 'not initialized',
        timestamp: new Date().toISOString()
    });
});

/**
 * Search Wikipedia endpoint
 */
app.post('/api/search', ensureMCPConnection, async (req, res) => {
    const { topic } = req.body;

    // Validate input
    if (!topic || typeof topic !== 'string') {
        return res.status(400).json({
            success: false,
            error: 'Topic is required and must be a string'
        });
    }

    const trimmedTopic = topic.trim();
    if (trimmedTopic.length === 0) {
        return res.status(400).json({
            success: false,
            error: 'Topic cannot be empty'
        });
    }

    if (trimmedTopic.length > 200) {
        return res.status(400).json({
            success: false,
            error: 'Topic is too long (max 200 characters)'
        });
    }

    try {
        console.log(`\n📝 Search request received: "${trimmedTopic}"`);
        
        const result = await wikiService.search(trimmedTopic);
        
        if (result.success) {
            console.log('✓ Search completed successfully\n');
        } else {
            console.log('✗ Search failed\n');
        }
        
        res.json(result);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            error: 'An error occurred while searching. Please try again.'
        });
    }
});

/**
 * Get random article endpoint (bonus feature)
 */
app.get('/api/random', ensureMCPConnection, async (req, res) => {
    try {
        console.log('\n🎲 Random article request received');
        
        const result = await wikiService.getRandomArticle();
        
        res.json(result);
    } catch (error) {
        console.error('Random article error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get random article'
        });
    }
});

/**
 * Serve frontend
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

/**
 * 404 handler
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

/**
 * Error handler
 */
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

/**
 * Start server
 */
async function startServer() {
    try {
        // Initialize MCP before starting server
        await initializeMCP();

        app.listen(PORT, () => {
            console.log('\n' + '='.repeat(50));
            console.log('🚀 Wikipedia Search MCP Demo Server');
            console.log('='.repeat(50));
            console.log(`📍 Server running at: http://localhost:${PORT}`);
            console.log(`🔧 API endpoint: http://localhost:${PORT}/api/search`);
            console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
            console.log('='.repeat(50) + '\n');
            console.log('Ready to accept search requests!\n');
        });
    } catch (error) {
        console.error('\n❌ Failed to start server:', error);
        process.exit(1);
    }
}

/**
 * Graceful shutdown
 */
async function shutdown(signal) {
    console.log(`\n\n${signal} received. Shutting down gracefully...`);
    
    if (mcpClient) {
        try {
            await mcpClient.disconnect();
        } catch (error) {
            console.error('Error during MCP disconnect:', error);
        }
    }
    
    console.log('✓ Cleanup complete. Goodbye!\n');
    process.exit(0);
}

// Handle shutdown signals
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Handle uncaught errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    shutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at:', promise, 'reason:', reason);
});

// Start the server
startServer();

// Made with Bob
