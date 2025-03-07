<template>
    <div class="px-12 py-6">
        <!-- Button Selected -->
        <div class="mb-6">
            <!-- Align the select dropdown to the right of the flex container -->
            <div class="flex justify-end">
                <select v-model="selectedCoin" @change="handleCoinChange"
                    class="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-400">
                    <option value="bitcoin">Bitcoin</option>
                    <option value="binancecoin">BNB</option>
                    <option value="ethereum">Ethereum</option>
                    <option value="solana">Solana</option>
                    <option value="tether">Tether</option>
                    <option value="ripple">XRP</option>
                </select>
            </div>
        </div>

        <!-- Card -->
        <div class="flex flex-wrap justify-center space-x-4 relative">
            <div class="w-80 p-12 bg-white border font-poppins border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h1 class="text-xl font-semibold text-gray-500 dark:text-gray-400 text-center">{{ selectedCoin }} Price</h1>
                <p class="text-4xl text-black text-center mt-4">{{ cryptoData.Price }}</p>
            </div>
            <div class="flex flex-col space-y-4">
                <div class="flex space-x-4">
                    <div class="w-60 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <h1 class="text-md text-gray-500 dark:text-gray-400 text-center">Market Cap (USD)</h1>
                        <p class="text-lg text-gray-600 text-center">${{ cryptoData.MarketCap }}</p>
                    </div>
                    <div class="w-60 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <h1 class="text-md text-gray-500 dark:text-gray-400 text-center">FDV (USD)</h1>
                        <p class="text-lg text-gray-600 text-center">${{ cryptoData.FDV }}</p>
                    </div>
                    <div class="w-60 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <h1 class="text-md text-gray-500 dark:text-gray-400 text-center">24 Hour Trading Vol</h1>
                        <p class="text-lg text-gray-600 text-center">${{ cryptoData.Volume }}</p>
                    </div>
                </div>
                <div class="flex space-x-4">
                    <div class="w-60 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <h1 class="text-md text-gray-500 dark:text-gray-400 text-center">Circulating Supply</h1>
                        <p class="text-lg text-gray-600 text-center">{{ cryptoData.CirculatingSupply }}</p>
                    </div>
                    <div class="w-60 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <h1 class="text-md text-gray-500 dark:text-gray-400 text-center">Total Supply</h1>
                        <p class="text-lg text-gray-600 text-center">{{ cryptoData.TotalSupply }}</p>
                    </div>
                    <div class="w-60 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <h1 class="text-md text-gray-500 dark:text-gray-400 text-center">Max Supply</h1>
                        <p class="text-lg text-gray-600 text-center">{{ cryptoData.MaxSupply }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Price Chart -->
        <div>

        </div>

    </div>
</template>


<script>
export default {
    name: "CryptoPrice",
    data() {
        return {
            selectedCoin: "bitcoin",
            cryptoData: {
                Price: "Loading...",
                MarketCap: "Loading...",
                FDV: "Loading...",
                Volume: "Loading...",
                CirculatingSupply: "Loading...",
                TotalSupply: "Loading...",
                MaxSupply: "Loading..."
            },
            intervalId: null
        };
    },
    methods: {
        async fetchCryptoData() {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${this.selectedCoin}`);
                const data = await response.json();

                this.cryptoData = {
                    Price: this.formatNumber(data.market_data.current_price.usd, "currency"),
                    MarketCap: this.formatNumber(data.market_data.market_cap.usd),
                    FDV: this.formatNumber(data.market_data.fully_diluted_valuation.usd),
                    Volume: this.formatNumber(data.market_data.total_volume.usd),
                    CirculatingSupply: this.formatNumber(data.market_data.circulating_supply),
                    TotalSupply: this.formatNumber(data.market_data.total_supply),
                    MaxSupply: this.formatNumber(data.market_data.max_supply)
                };
            } catch (error) {
                console.error("Error fetching crypto data:", error);
                // Show error message in the UI
                this.cryptoData = {
                    Price: "Failed to load",
                    MarketCap: "Failed to load",
                    FDV: "Failed to load",
                    Volume: "Failed to load",
                    CirculatingSupply: "Failed to load",
                    TotalSupply: "Failed to load",
                    MaxSupply: "Failed to load"
                };
            }
        },
        handleCoinChange() {
            console.log("Coin changed to:", this.selectedCoin);
            this.fetchCryptoData();
        },
        formatNumber(value, type = "number") {
            if (!value || value === "-") return "-";
            return new Intl.NumberFormat("en-US", {
                style: type === "currency" ? "currency" : "decimal",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(value);
        }
    },
    mounted() {
        this.fetchCryptoData();
        this.intervalId = setInterval(this.fetchCryptoData, 15000); // Increase interval to 15 seconds
    },
    beforeUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
};
</script>


