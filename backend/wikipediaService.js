/**
 * Wikipedia Search Service
 * Uses MCP Playwright client to search Wikipedia and extract content
 */
class WikipediaSearchService {
    constructor(mcpClient) {
        this.mcp = mcpClient;
    }

    /**
     * Summarize content to approximately 1000 words
     * @param {object} data - The extracted Wikipedia data
     * @returns {string} Summarized content
     */
    summarizeContent(data) {
        const words = [];
        
        // Add title
        words.push(`**${data.title}**\n\n`);
        
        // Add summary (first paragraph)
        if (data.summary) {
            words.push(data.summary);
            words.push('\n\n');
        }
        
        // Add key information from infobox
        if (data.infobox && Object.keys(data.infobox).length > 0) {
            words.push('**Key Information:**\n');
            const importantKeys = Object.keys(data.infobox).slice(0, 10);
            for (const key of importantKeys) {
                words.push(`- **${key}:** ${data.infobox[key]}\n`);
            }
            words.push('\n');
        }
        
        // Add sections overview with more detail
        if (data.sections && data.sections.length > 0) {
            words.push('**Article Structure:**\n\n');
            words.push('This article covers the following topics:\n\n');
            const mainSections = data.sections
                .filter(s => s.level === 'h2')
                .slice(0, 15);
            for (const section of mainSections) {
                words.push(`• ${section.text}\n`);
            }
            words.push('\n');
        }
        
        // Add more context
        words.push('**About This Article:**\n\n');
        words.push(`This comprehensive article from Wikipedia provides detailed information about ${data.title}. `);
        words.push(`The content is regularly updated by contributors and includes ${data.sections.length} major sections. `);
        
        if (Object.keys(data.infobox).length > 0) {
            words.push(`Key facts and statistics are provided in the information box. `);
        }
        
        words.push('\n\n');
        words.push(`For the complete article with all details, references, and images, please visit the full Wikipedia page.\n\n`);
        
        // Join and limit to approximately 1000 words
        let summary = words.join('');
        const wordCount = summary.split(/\s+/).length;
        
        if (wordCount > 1000) {
            // Truncate to 1000 words
            const wordArray = summary.split(/\s+/);
            summary = wordArray.slice(0, 1000).join(' ') + '...';
        }
        
        return summary;
    }

    /**
     * Search Wikipedia for a topic and extract article content
     * @param {string} topic - The search topic
     * @returns {Promise<object>} Extracted article data
     */
    async search(topic) {
        try {
            console.log(`\n=== Starting Wikipedia search for: "${topic}" ===`);

            // Step 1: Navigate to Wikipedia
            console.log('Step 1: Navigating to Wikipedia...');
            await this.mcp.navigate('https://www.wikipedia.org');
            await this.mcp.wait(3); // Wait for page to load

            // Step 2: Find and fill search input
            console.log('Step 2: Entering search query...');
            await this.mcp.type('[name="search"]', topic, true); // submit=true to submit the form
            await this.mcp.wait(5); // Wait longer for search results to load

            // Step 3: Extract article content
            console.log('Step 3: Extracting article content...');
            const content = await this.mcp.evaluate(`() => {
                // Extract title
                const title = document.querySelector('#firstHeading')?.textContent || 
                             document.querySelector('h1')?.textContent || 
                             'Article Not Found';

                // Extract summary (first paragraph that's not empty)
                let summary = '';
                const paragraphs = document.querySelectorAll('.mw-parser-output > p');
                for (const p of paragraphs) {
                    const text = p.textContent.trim();
                    if (text && text.length > 50 && !p.classList.contains('mw-empty-elt')) {
                        summary = text;
                        break;
                    }
                }

                // Extract table of contents sections
                const sections = [];
                const seenSections = new Set();
                const headings = document.querySelectorAll('h2, h3');
                for (const heading of headings) {
                    const text = heading.textContent.trim()
                        .replace('[edit]', '')
                        .replace(/\[.*?\]/g, '') // Remove any bracketed content
                        .trim();
                    
                    // Skip edit links, empty headings, Contents, and duplicates
                    if (text &&
                        text !== 'Contents' &&
                        text !== 'Navigation menu' &&
                        text !== 'Personal tools' &&
                        !seenSections.has(text)) {
                        sections.push({
                            level: heading.tagName.toLowerCase(),
                            text: text
                        });
                        seenSections.add(text);
                    }
                }

                // Extract infobox data
                const infobox = {};
                const infoboxRows = document.querySelectorAll('.infobox tr, .infobox-table tr');
                for (const row of infoboxRows) {
                    const th = row.querySelector('th');
                    const td = row.querySelector('td');
                    if (th && td) {
                        const key = th.textContent.trim();
                        const value = td.textContent.trim();
                        if (key && value && value.length < 200) {
                            infobox[key] = value;
                        }
                    }
                }

                // Get current URL
                const url = window.location.href;

                // Check if we're on a disambiguation page
                const isDisambiguation = document.querySelector('.mw-disambig') !== null;

                return {
                    title,
                    summary: summary.substring(0, 800), // Limit summary length
                    sections: sections.slice(0, 10), // Limit to 10 sections
                    infobox,
                    url,
                    isDisambiguation
                };
            }`);

            // Check if the response contains an error
            if (!content || !content.content || !content.content[0]) {
                throw new Error('Invalid response from browser_evaluate');
            }

            let responseText = content.content[0].text;
            
            // The MCP response includes "### Result" header, extract just the JSON
            if (responseText.includes('### Result')) {
                // Find the JSON part (between the header and any trailing content)
                const jsonMatch = responseText.match(/### Result\s*\n({[\s\S]*?})\s*(?:###|$)/);
                if (jsonMatch && jsonMatch[1]) {
                    responseText = jsonMatch[1];
                } else {
                    // Try to find JSON object directly
                    const jsonStart = responseText.indexOf('{');
                    const jsonEnd = responseText.lastIndexOf('}');
                    if (jsonStart !== -1 && jsonEnd !== -1) {
                        responseText = responseText.substring(jsonStart, jsonEnd + 1);
                    }
                }
            }
            
            // Check if response contains an error after the header
            if (responseText.includes('### Error')) {
                console.error('Browser evaluation error:', responseText);
                throw new Error('Failed to extract content from page. The page might not have loaded correctly.');
            }

            // Parse the result
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                console.error('Response text:', responseText.substring(0, 200));
                throw new Error('Failed to parse extracted content');
            }

            console.log('✓ Article extracted successfully');
            console.log(`  Title: ${data.title}`);
            console.log(`  Summary length: ${data.summary.length} chars`);
            console.log(`  Sections: ${data.sections.length}`);
            console.log(`  Infobox items: ${Object.keys(data.infobox).length}`);

            // Check if article was found
            if (data.title === 'Article Not Found' || !data.summary) {
                throw new Error('Article not found or page did not load correctly');
            }

            // Generate 500-word summary
            const aiSummary = this.summarizeContent(data);

            // Handle disambiguation pages - add notice at the end
            if (data.isDisambiguation) {
                const disambiguationNotice = '\n\n---\n\n**Note:** This is a disambiguation page. Wikipedia disambiguation pages help you find the specific article you\'re looking for when a search term has multiple meanings. Please select the most relevant topic from the sections listed above to view the full article.';
                data.aiSummary = aiSummary + disambiguationNotice;
            } else {
                data.aiSummary = aiSummary;
            }

            return {
                success: true,
                data: {
                    ...data,
                    aiSummary: aiSummary
                }
            };

        } catch (error) {
            console.error('Search failed:', error);
            return {
                success: false,
                error: error.message || 'Failed to search Wikipedia'
            };
        }
    }

    /**
     * Search multiple topics in parallel (for demo purposes)
     * @param {string[]} topics - Array of topics to search
     * @returns {Promise<object[]>} Array of results
     */
    async searchMultiple(topics) {
        const results = [];
        
        for (const topic of topics) {
            const result = await this.search(topic);
            results.push({ topic, ...result });
            
            // Small delay between searches
            await this.mcp.wait(1);
        }
        
        return results;
    }

    /**
     * Get a random Wikipedia article
     * @returns {Promise<object>} Random article data
     */
    async getRandomArticle() {
        try {
            console.log('Getting random Wikipedia article...');
            
            await this.mcp.navigate('https://en.wikipedia.org/wiki/Special:Random');
            await this.mcp.wait(3);

            const content = await this.mcp.evaluate(`() => {
                const title = document.querySelector('#firstHeading')?.textContent || '';
                const summary = document.querySelector('.mw-parser-output > p:not(.mw-empty-elt)')?.textContent || '';
                const url = window.location.href;

                return { title, summary: summary.substring(0, 500), url };
            }`);

            const data = JSON.parse(content.content[0].text);

            return {
                success: true,
                data: data
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

export default WikipediaSearchService;

// Made with Bob
