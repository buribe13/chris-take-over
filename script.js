// Bitcoin Price API Integration
const BITCOIN_API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const UPDATE_INTERVAL = 60000; // Update every minute

// Fetch Bitcoin price
async function fetchBitcoinPrice() {
    try {
        const response = await fetch(BITCOIN_API_URL);
        const data = await response.json();
        const price = parseFloat(data.bpi.USD.rate.replace(/,/g, ''));
        return price;
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        return null;
    }
}

// Update Bitcoin price display
async function updateBitcoinPrice() {
    const price = await fetchBitcoinPrice();
    if (price) {
        const btcPriceElement = document.getElementById('btcPrice');
        if (btcPriceElement) {
            btcPriceElement.textContent = `$${price.toLocaleString('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            })}`;
            
            // Add animation
            btcPriceElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                btcPriceElement.style.transform = 'scale(1)';
            }, 300);
        }
    }
}

// Update ChrisCoin price based on Bitcoin (mock calculation)
function updateChrisCoinPrice() {
    const btcPrice = parseFloat(document.getElementById('btcPrice').textContent.replace(/[$,]/g, '')) || 0;
    if (btcPrice > 0) {
        // ChrisCoin price is a fraction of Bitcoin (for demo purposes)
        const chrisCoinPrice = (btcPrice / 1000000).toFixed(6);
        const chrisCoinElement = document.getElementById('chrisCoinPrice');
        if (chrisCoinElement) {
            chrisCoinElement.textContent = `$${chrisCoinPrice}`;
        }
    }
}

// Wallet Connection Functions
let walletConnected = false;
let walletAddress = null;

// Check if Web3/Bitcoin wallet is available
function checkWalletAvailability() {
    // Check for common Bitcoin wallet extensions
    if (typeof window.btc !== 'undefined' || typeof window.Bitcoin !== 'undefined') {
        return true;
    }
    // For demo purposes, we'll simulate wallet connection
    return false;
}

// Connect wallet
async function connectWallet() {
    try {
        // Check for Bitcoin wallet
        if (checkWalletAvailability()) {
            // Actual wallet connection logic would go here
            // For demo, we'll simulate it
            simulateWalletConnection();
        } else {
            // Simulate wallet connection for demo
            simulateWalletConnection();
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet. Please make sure you have a Bitcoin wallet extension installed.');
    }
}

// Simulate wallet connection (for demo purposes)
function simulateWalletConnection() {
    walletConnected = true;
    // Generate a mock Bitcoin address
    walletAddress = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
    
    updateWalletUI();
    alert('Wallet connected successfully! (Demo mode)');
}

// Update wallet UI
function updateWalletUI() {
    const walletStatus = document.getElementById('walletStatus');
    const walletAddressElement = document.getElementById('walletAddress');
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const connectWalletNav = document.getElementById('connectWallet');
    
    if (walletConnected) {
        if (walletStatus) {
            walletStatus.innerHTML = '<p style="color: #4ade80;">✓ Wallet Connected</p>';
        }
        if (walletAddressElement) {
            walletAddressElement.textContent = `Address: ${walletAddress}`;
            walletAddressElement.style.display = 'block';
        }
        if (connectWalletBtn) {
            connectWalletBtn.textContent = 'Disconnect Wallet';
            connectWalletBtn.onclick = disconnectWallet;
        }
        if (connectWalletNav) {
            connectWalletNav.textContent = 'Disconnect';
            connectWalletNav.onclick = disconnectWallet;
        }
    } else {
        if (walletStatus) {
            walletStatus.innerHTML = '<p>Wallet not connected</p>';
        }
        if (walletAddressElement) {
            walletAddressElement.style.display = 'none';
        }
        if (connectWalletBtn) {
            connectWalletBtn.textContent = 'Connect Wallet';
            connectWalletBtn.onclick = connectWallet;
        }
        if (connectWalletNav) {
            connectWalletNav.textContent = 'Connect Wallet';
            connectWalletNav.onclick = connectWallet;
        }
    }
}

// Disconnect wallet
function disconnectWallet() {
    walletConnected = false;
    walletAddress = null;
    updateWalletUI();
    alert('Wallet disconnected');
}

// Tokenomics Chart
function drawTokenomicsChart() {
    const canvas = document.getElementById('tokenomicsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    
    // Set canvas size
    canvas.width = 300;
    canvas.height = 300;
    
    const data = [
        { label: 'Liquidity Pool', value: 60, color: '#f7931a' },
        { label: 'Community Rewards', value: 25, color: '#ffd700' },
        { label: 'Team & Development', value: 10, color: '#ff6b35' },
        { label: 'Marketing', value: 5, color: '#4ecdc4' }
    ];
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach((item, index) => {
        const sliceAngle = (item.value / 100) * 2 * Math.PI;
        
        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
        
        // Draw border
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 30);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`${item.value}%`, labelX, labelY);
        
        currentAngle += sliceAngle;
    });
}

// Smooth scroll for navigation links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Buy Now button handler
function handleBuyNow() {
    if (!walletConnected) {
        alert('Please connect your wallet first to buy ChrisCoin!');
        connectWallet();
    } else {
        alert('Buy functionality coming soon! (This is a demo)');
    }
}

// Learn More button handler
function handleLearnMore() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bitcoin price
    updateBitcoinPrice();
    setInterval(updateBitcoinPrice, UPDATE_INTERVAL);
    
    // Update ChrisCoin price when Bitcoin price updates
    setInterval(() => {
        updateBitcoinPrice().then(() => {
            setTimeout(updateChrisCoinPrice, 500);
        });
    }, UPDATE_INTERVAL);
    
    // Draw tokenomics chart
    drawTokenomicsChart();
    
    // Draw Palantir chart
    drawPalantirChart();
    
    // Setup wallet connection buttons
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
    
    // Setup other buttons
    document.getElementById('buyNow').addEventListener('click', handleBuyNow);
    document.getElementById('learnMore').addEventListener('click', handleLearnMore);
    
    // Setup smooth scroll
    setupSmoothScroll();
    
    // Add scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .timeline-item, .stat-card, .story-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Also observe story cards that are added dynamically
    const storiesObserver = new MutationObserver(() => {
        document.querySelectorAll('.story-card').forEach(el => {
            if (!el.hasAttribute('data-observed')) {
                el.setAttribute('data-observed', 'true');
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            }
        });
    });
    
    const storiesContainer = document.getElementById('storiesContainer');
    if (storiesContainer) {
        storiesObserver.observe(storiesContainer, { childList: true, subtree: true });
    }
    
    // Fetch Christopher Buchanan stories
    fetchChristopherBuchananStories();
    
    // Refresh stories every 30 minutes
    setInterval(fetchChristopherBuchananStories, 30 * 60 * 1000);
});

// Add real-time price updates with animation
setInterval(() => {
    updateBitcoinPrice();
    setTimeout(updateChrisCoinPrice, 500);
}, UPDATE_INTERVAL);

// LA Times RSS Feed Integration
const LA_TIMES_RSS_FEEDS = [
    'https://www.latimes.com/rss2.0.xml', // Main feed
    'https://www.latimes.com/business/rss2.0.xml', // Business
    'https://www.latimes.com/entertainment/rss2.0.xml', // Entertainment
    'https://www.latimes.com/sports/rss2.0.xml', // Sports
    'https://www.latimes.com/politics/rss2.0.xml', // Politics
    'https://www.latimes.com/world-nation/rss2.0.xml', // World & Nation
];

// CORS proxy to fetch RSS feeds (using a public proxy)
const CORS_PROXY = 'https://api.allorigins.win/get?url=';

// Fetch and parse RSS feed
async function fetchRSSFeed(feedUrl) {
    try {
        const proxyUrl = CORS_PROXY + encodeURIComponent(feedUrl);
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        if (data.contents) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
            return xmlDoc;
        }
        return null;
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return null;
    }
}

// Parse RSS items and filter for Christopher Buchanan
function parseRSSItems(xmlDoc) {
    const items = xmlDoc.querySelectorAll('item');
    const articles = [];
    
    items.forEach(item => {
        const title = item.querySelector('title')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const author = item.querySelector('dc\\:creator, creator')?.textContent || '';
        
        // Check if author is Christopher Buchanan (case-insensitive)
        // Also check title and description for author name
        const authorLower = author.toLowerCase();
        const titleLower = title.toLowerCase();
        const descLower = description.toLowerCase();
        
        if (authorLower.includes('christopher buchanan') || 
            authorLower.includes('chris buchanan') ||
            titleLower.includes('christopher buchanan') ||
            descLower.includes('christopher buchanan')) {
            articles.push({
                title: title,
                link: link,
                description: description,
                pubDate: pubDate,
                author: author
            });
        }
    });
    
    return articles;
}

// Format date
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    } catch (error) {
        return dateString;
    }
}

// Display articles
function displayArticles(articles) {
    const container = document.getElementById('storiesContainer');
    if (!container) return;
    
    if (articles.length === 0) {
        container.innerHTML = `
            <div class="no-stories">
                <p>No recent articles by Christopher Buchanan found.</p>
                <p class="stories-note">The RSS feed is being checked regularly. New articles will appear here when published.</p>
            </div>
        `;
        return;
    }
    
    // Remove duplicates based on title
    const uniqueArticles = articles.filter((article, index, self) =>
        index === self.findIndex(a => a.title === article.title)
    );
    
    // Sort by date (newest first)
    uniqueArticles.sort((a, b) => {
        const dateA = new Date(a.pubDate);
        const dateB = new Date(b.pubDate);
        return dateB - dateA;
    });
    
    // Limit to 10 most recent
    const recentArticles = uniqueArticles.slice(0, 10);
    
    container.innerHTML = recentArticles.map(article => `
        <div class="story-card">
            <h3 class="story-title">
                <a href="${article.link}" target="_blank" rel="noopener noreferrer">
                    ${article.title}
                </a>
            </h3>
            <div class="story-meta">
                <span class="story-date">${formatDate(article.pubDate)}</span>
                ${article.author ? `<span class="story-author">by ${article.author}</span>` : ''}
            </div>
            ${article.description ? `<p class="story-description">${article.description.replace(/<[^>]*>/g, '').substring(0, 200)}...</p>` : ''}
            <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="story-link">
                Read more →
            </a>
        </div>
    `).join('');
}

// Fetch all feeds and aggregate articles
async function fetchChristopherBuchananStories() {
    const container = document.getElementById('storiesContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-stories">Loading stories...</div>';
    
    let allArticles = [];
    
    // Try fetching from multiple feeds
    for (const feedUrl of LA_TIMES_RSS_FEEDS) {
        try {
            const xmlDoc = await fetchRSSFeed(feedUrl);
            if (xmlDoc) {
                const articles = parseRSSItems(xmlDoc);
                allArticles = allArticles.concat(articles);
            }
        } catch (error) {
            console.error(`Error fetching feed ${feedUrl}:`, error);
        }
    }
    
    // Also try direct search approach - fetch LA Times search API if available
    // For now, display what we found
    if (allArticles.length > 0) {
        displayArticles(allArticles);
    } else {
        // Fallback: try alternative approach or show message
        container.innerHTML = `
            <div class="no-stories">
                <p>Searching for Christopher Buchanan's articles...</p>
                <p class="stories-note">If no articles appear, Christopher Buchanan may not have recent publications, or the RSS feeds may need time to update.</p>
            </div>
        `;
        
        // Try one more time with a delay (sometimes RSS takes time to update)
        setTimeout(async () => {
            for (const feedUrl of LA_TIMES_RSS_FEEDS.slice(0, 2)) {
                try {
                    const xmlDoc = await fetchRSSFeed(feedUrl);
                    if (xmlDoc) {
                        const articles = parseRSSItems(xmlDoc);
                        if (articles.length > 0) {
                            allArticles = allArticles.concat(articles);
                            displayArticles(allArticles);
                            return;
                        }
                    }
                } catch (error) {
                    console.error(`Error fetching feed ${feedUrl}:`, error);
                }
            }
        }, 2000);
    }
}

// Palantir Chart
function drawPalantirChart() {
    const canvas = document.getElementById('palantirChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set background
    ctx.fillStyle = 'rgba(0, 56, 184, 0.05)';
    ctx.fillRect(0, 0, width, height);
    
    // Chart data
    const data = [65, 78, 85, 92, 88, 95, 98];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxValue = 100;
    
    // Chart dimensions
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / data.length;
    const barSpacing = barWidth * 0.2;
    const actualBarWidth = barWidth - barSpacing;
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(0, 85, 255, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw bars
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + index * barWidth + barSpacing / 2;
        const y = height - padding - barHeight;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, '#0055ff');
        gradient.addColorStop(1, '#0038b8');
        
        // Draw bar
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, actualBarWidth, barHeight);
        
        // Draw bar border
        ctx.strokeStyle = '#0055ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, actualBarWidth, barHeight);
        
        // Draw value label
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(value + '%', x + actualBarWidth / 2, y - 5);
        
        // Draw day label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '11px Inter';
        ctx.fillText(labels[index], x + actualBarWidth / 2, height - padding + 20);
    });
    
    // Draw axes
    ctx.strokeStyle = '#0055ff';
    ctx.lineWidth = 2;
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Y-axis labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '11px Inter';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const value = maxValue - (maxValue / 5) * i;
        const y = padding + (chartHeight / 5) * i;
        ctx.fillText(value + '%', padding - 10, y + 4);
    }
}


