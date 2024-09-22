# Waste Protocol Frontend

This is the frontend application for **Waste Protocol**, a decentralized platform for waste management and carbon credit trading. Users can list, sell, and track recyclable waste and earn Waste Coin and USDC rewards. The platform promotes sustainability through carbon emission reductions, all recorded on the blockchain for transparency.

## Features

- **User Authentication**: Easily connect and authenticate using MetaMask.
- **Real-Time Trash Data**: Check live prices and carbon emission rates for waste.
- **Sell Recyclable Waste**: Submit sell requests, get approval, and receive rewards in USDC and Waste Coin.
- **Carbon Credit Marketplace**: Purchase carbon credits using Waste Coin.
- **Data Analytics**: View indexed transaction data and insights, powered by The Graph.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) - for server-side rendering and fast page loads.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - for a responsive, modern design.
- **Blockchain**: [Ethereum](https://ethereum.org/) - all waste transactions and carbon credits are recorded on the blockchain.
- **Wallet Connection**: [MetaMask](https://metamask.io/) - allows easy login and wallet connection.
- **Oracles**: [Chainlink](https://chain.link/) - provides real-time data for trash prices and carbon emissions.
- **Data Indexing**: [The Graph](https://thegraph.com/) - enables querying and indexing of blockchain data.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/waste-protocol-frontend.git
   cd waste-protocol-frontend
   Install dependencies:

bash
คัดลอกโค้ด
npm install
Environment Variables:
Create a .env.local file in the root directory and add your environment variables:

bash
คัดลอกโค้ด
NEXT_PUBLIC_CHAIN_ID=<Your Chain ID>
NEXT_PUBLIC_API_URL=<API URL>
NEXT_PUBLIC_INFURA_PROJECT_ID=<Infura Project ID>
Run the development server:

bash
คัดลอกโค้ด
npm run dev
The app will be available at http://localhost:3000.

Usage
Connect your wallet: Use MetaMask to connect and authenticate your wallet.
Check waste data: View real-time pricing and carbon emissions for recyclables.
Submit a sell request: Submit your waste for recycling, wait for approval, and earn rewards.
Carbon credit marketplace: Purchase carbon credits using Waste Coin.
Project Structure
bash
คัดลอกโค้ด
.
├── components        # Reusable UI components
├── pages             # Next.js pages (Home, Sell, Analytics, etc.)
├── public            # Static files (images, icons)
├── styles            # Tailwind CSS styles and global styling
└── utils             # Helper functions and API integrations
Dependencies
Next.js: React framework for server-rendered applications.
Tailwind CSS: Utility-first CSS framework.
Ethers.js: Library to interact with Ethereum blockchain.
MetaMask: Wallet integration for Ethereum.
Chainlink: Oracles for real-time data.
The Graph: Decentralized indexing protocol for querying blockchain data.
Future Features
NFT Integration: Tokenization of carbon credits as NFTs (future implementation).
Improved Analytics: More insights and reporting features for carbon emissions and recycling impact.
