class WikipediaSearchApp {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api';
        this.searchForm = document.getElementById('searchForm');
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.resultsDiv = document.getElementById('results');
        this.loadingDiv = document.getElementById('loading');
        this.errorDiv = document.getElementById('error');
        this.errorMessage = document.getElementById('errorMessage');
        this.retryButton = document.getElementById('retryButton');
        
        this.currentTopic = '';
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Form submission
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.performSearch();
        });

        // Example buttons
        document.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const topic = btn.getAttribute('data-topic');
                this.searchInput.value = topic;
                this.performSearch();
            });
        });

        // Retry button
        this.retryButton.addEventListener('click', () => {
            if (this.currentTopic) {
                this.performSearch();
            }
        });

        // Input validation
        this.searchInput.addEventListener('input', () => {
            const isValid = this.searchInput.value.trim().length > 0;
            this.searchButton.disabled = !isValid;
        });
    }

    async performSearch() {
        const topic = this.searchInput.value.trim();
        if (!topic) return;

        this.currentTopic = topic;
        this.showLoading();

        try {
            const response = await fetch(`${this.apiUrl}/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic })
            });

            const result = await response.json();

            if (result.success) {
                this.displayResults(result.data);
            } else {
                this.displayError(result.error || 'Search failed. Please try again.');
            }
        } catch (error) {
            console.error('Search error:', error);
            this.displayError('Failed to connect to server. Please ensure the backend is running.');
        }
    }

    showLoading() {
        this.loadingDiv.style.display = 'block';
        this.resultsDiv.innerHTML = '';
        this.errorDiv.style.display = 'none';
        this.searchButton.disabled = true;
    }

    hideLoading() {
        this.loadingDiv.style.display = 'none';
        this.searchButton.disabled = false;
    }

    displayResults(data) {
        this.hideLoading();

        // Build infobox if data exists
        let infoboxHtml = '';
        if (data.infobox && Object.keys(data.infobox).length > 0) {
            const infoboxRows = Object.entries(data.infobox)
                .slice(0, 8) // Limit to 8 rows
                .map(([key, value]) => `
                    <div class="infobox-row">
                        <div class="infobox-label">${this.escapeHtml(key)}</div>
                        <div class="infobox-value">${this.escapeHtml(value)}</div>
                    </div>
                `).join('');

            infoboxHtml = `
                <div class="infobox">
                    <div class="infobox-title">${this.escapeHtml(data.title)}</div>
                    <div class="infobox-content">
                        ${infoboxRows}
                    </div>
                </div>
            `;
        }

        // Build table of contents
        let tocHtml = '';
        if (data.sections && data.sections.length > 0) {
            const tocItems = data.sections
                .map((section, index) => `
                    <li>
                        <a href="#section-${index}">
                            ${this.escapeHtml(section.text)}
                        </a>
                    </li>
                `).join('');

            tocHtml = `
                <div class="toc">
                    <h2>Contents</h2>
                    <ul>
                        ${tocItems}
                    </ul>
                </div>
            `;
        }

        // Build article metadata
        const metaHtml = `
            <div class="article-meta">
                <div class="article-meta-item">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"/>
                        <path d="M8 4a.75.75 0 01.75.75v3.5h2.5a.75.75 0 010 1.5h-3.25a.75.75 0 01-.75-.75v-4.25A.75.75 0 018 4z"/>
                    </svg>
                    <span>Retrieved from Wikipedia</span>
                </div>
                ${data.sections ? `
                    <div class="article-meta-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v9a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 12.5v-9z"/>
                        </svg>
                        <span>${data.sections.length} sections</span>
                    </div>
                ` : ''}
            </div>
        `;

        // Convert markdown-style formatting to HTML
        const formattedSummary = data.aiSummary
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/•/g, '&bull;');

        this.resultsDiv.innerHTML = `
            <div class="article">
                <div class="ai-summary">
                    <div class="summary-header">
                        <h2>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 10px;">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            AI Summary
                        </h2>
                        <span class="word-count">Up to 1000 words</span>
                    </div>
                    <div class="summary-content">
                        <p>${formattedSummary}</p>
                    </div>
                    <div class="summary-actions">
                        <a href="${this.escapeHtml(data.url)}" target="_blank" rel="noopener noreferrer" class="full-article-btn">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                <path d="M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM9 16H2V9h7v7zm7 0h-7V9h7v7zm0-9H2V2h14v5z"/>
                            </svg>
                            <span>View Full Article on Wikipedia</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-left: 8px;">
                                <path d="M8.636 3.5a.5.5 0 00-.5-.5H1.5A1.5 1.5 0 000 4.5v10A1.5 1.5 0 001.5 16h10a1.5 1.5 0 001.5-1.5V7.864a.5.5 0 00-1 0V14.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h6.636a.5.5 0 00.5-.5z"/>
                                <path d="M16 .5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h3.793L6.146 9.146a.5.5 0 10.708.708L15 1.707V5.5a.5.5 0 001 0v-5z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    displayError(message) {
        this.hideLoading();
        this.errorMessage.textContent = message;
        this.errorDiv.style.display = 'block';
        this.resultsDiv.innerHTML = '';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new WikipediaSearchApp();
    console.log('Wikipedia Search MCP Demo initialized');
});

// Made with Bob
