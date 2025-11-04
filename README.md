# ChrisCoin - Memecoin Website

A modern, responsive website for ChrisCoin, a new memecoin with Bitcoin integration.

## Features

- **Bitcoin Price Integration**: Real-time Bitcoin price display using CoinDesk API
- **Wallet Connection**: Simulated Bitcoin wallet connection functionality
- **Modern UI/UX**: Beautiful gradient design with animations and smooth scrolling
- **Tokenomics Display**: Visual chart showing token distribution
- **Roadmap Section**: Timeline of project milestones
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started

1. Open `index.html` in a web browser
2. The website will automatically fetch and display the current Bitcoin price
3. Click "Connect Wallet" to simulate wallet connection (demo mode)

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and animations
- `script.js` - Bitcoin API integration and interactive features

## Bitcoin Integration

- Fetches real-time Bitcoin price from CoinDesk API
- Updates every 60 seconds
- Calculates ChrisCoin price based on Bitcoin price
- Wallet connection simulation (ready for real wallet integration)

## Customization

You can customize:
- Colors in `styles.css` (CSS variables in `:root`)
- Bitcoin price update interval in `script.js` (UPDATE_INTERVAL)
- Tokenomics data in `script.js` (drawTokenomicsChart function)
- Content and text throughout `index.html`

## Browser Compatibility

Works on all modern browsers (Chrome, Firefox, Safari, Edge)

## Notes

- Wallet connection is currently in demo mode
- For production, integrate with actual Bitcoin wallet APIs (e.g., Unisat, Xverse, etc.)
- Bitcoin price updates automatically every minute

