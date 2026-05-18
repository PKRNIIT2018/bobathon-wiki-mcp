import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

/**
 * MCP Client wrapper for Playwright MCP server
 * Handles connection, tool calls, and error handling
 */
class MCPPlaywrightClient {
    constructor() {
        this.client = null;
        this.transport = null;
        this.isConnected = false;
    }

    /**
     * Connect to the Playwright MCP server
     */
    async connect() {
        try {
            console.log('Connecting to Playwright MCP server...');

            // Create stdio transport to communicate with Playwright MCP server
            this.transport = new StdioClientTransport({
                command: 'npx',
                args: [
                    '-y',
                    '@playwright/mcp@latest',
                    '--browser=chromium',
                    '--headless'
                ]
            });

            // Create MCP client
            this.client = new Client({
                name: 'wikipedia-search-client',
                version: '1.0.0'
            }, {
                capabilities: {}
            });

            // Connect to the server
            await this.client.connect(this.transport);
            this.isConnected = true;

            console.log('✓ Connected to Playwright MCP server');

            // List available tools
            const tools = await this.client.listTools();
            console.log('Available MCP tools:', tools.tools.map(t => t.name).join(', '));

            return true;
        } catch (error) {
            console.error('Failed to connect to MCP server:', error);
            this.isConnected = false;
            throw new Error(`MCP connection failed: ${error.message}`);
        }
    }

    /**
     * Call an MCP tool
     * @param {string} toolName - Name of the tool to call
     * @param {object} args - Arguments for the tool
     * @returns {Promise<object>} Tool result
     */
    async callTool(toolName, args = {}) {
        if (!this.isConnected) {
            throw new Error('MCP client is not connected. Call connect() first.');
        }

        try {
            console.log(`Calling MCP tool: ${toolName}`, args);

            const result = await this.client.callTool({
                name: toolName,
                arguments: args
            });

            console.log(`✓ Tool ${toolName} completed`);
            return result;
        } catch (error) {
            console.error(`Error calling tool ${toolName}:`, error);
            throw new Error(`Tool ${toolName} failed: ${error.message}`);
        }
    }

    /**
     * Navigate to a URL
     */
    async navigate(url) {
        return await this.callTool('browser_navigate', { url });
    }

    /**
     * Type text into an element
     */
    async type(target, text, submit = false) {
        return await this.callTool('browser_type', { target, text, submit });
    }

    /**
     * Click an element
     */
    async click(target) {
        return await this.callTool('browser_click', { target });
    }

    /**
     * Get page snapshot (accessibility tree)
     */
    async snapshot() {
        return await this.callTool('browser_snapshot', {});
    }

    /**
     * Execute JavaScript in the browser
     */
    async evaluate(script) {
        return await this.callTool('browser_evaluate', { function: script });
    }

    /**
     * Take a screenshot
     */
    async screenshot(filename = 'screenshot.png', fullPage = false) {
        return await this.callTool('browser_take_screenshot', { filename, fullPage });
    }

    /**
     * Wait for a specified time
     */
    async wait(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    /**
     * Close the browser and disconnect
     */
    async disconnect() {
        try {
            if (this.isConnected) {
                console.log('Disconnecting from MCP server...');
                
                // Close browser if needed
                try {
                    await this.callTool('browser_close', {});
                } catch (error) {
                    // Browser might already be closed
                    console.log('Browser already closed or not available');
                }

                // Close MCP connection
                await this.client.close();
                this.isConnected = false;
                
                console.log('✓ Disconnected from MCP server');
            }
        } catch (error) {
            console.error('Error during disconnect:', error);
        }
    }

    /**
     * Check if client is connected
     */
    getConnectionStatus() {
        return {
            connected: this.isConnected,
            client: this.client ? 'initialized' : 'not initialized'
        };
    }
}

export default MCPPlaywrightClient;

// Made with Bob
