// ==================== UV GUARD PRO - COMPLETE VERSION ====================
class UVGuardPro {
    constructor() {
        this.dataHistory = [];
        this.currentData = null;
        this.monitoringInterval = null;
        this.charts = {};
        this.currentLocation = null;
        this.lastUpdateTime = null;
        this.isDemoMode = false;
        this.regressionModel = null;
        this.derivativeModel = null;
        
        
        // API Configuration
        this.API_CONFIG = {
            // Untuk kompatibilitas dengan kode lama
            apiKey1: "7c147cbc7723582a81895d13c584fb31",
            apiKey2: "c5e0d6bf87b5b5260a35352e699409a6",
            apiKey3: "8330042657054aafedcfd960d14eda1d",
            currentKeyIndex: 0,
            baseUrl: "https://api.openweathermap.org/data/2.5",
            geoUrl: "https://api.openweathermap.org/geo/1.0"
        };
        
        this.MULTI_API_CONFIG = {
            // OpenWeatherMap (3 key untuk failover)
            openweather: {
                keys: [
                    "7c147cbc7723582a81895d13c584fb31",
                    "c5e0d6bf87b5b5260a35352e699409a6",
                    "8330042657054aafedcfd960d14eda1d"
                ],
                currentKeyIndex: 0,
                baseUrl: "https://api.openweathermap.org/data/2.5"
            },
            
            // WeatherAPI.com (key kamu)
            weatherapi: {
                key: "d92bc5798de74504a8a20859250412",
                baseUrl: "https://api.weatherapi.com/v1"
            },
            
            // Visual Crossing (key kamu)
            visualcrossing: {
                key: "KD56SWLAEN7EFXT3LM7LUTS6U",
                baseUrl: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline"
            },
            
            // Settings
            useMultipleSources: true,
            enableFallback: true,
            timeout: 10000
        };

        // Data provinsi Indonesia
        this.INDONESIA_PROVINCES = [
            { id: 1, name: "DKI Jakarta", capital: "Jakarta", lat: -6.2088, lon: 106.8456 },
            { id: 2, name: "Jawa Barat", capital: "Bandung", lat: -6.9175, lon: 107.6191 },
            { id: 3, name: "Jawa Timur", capital: "Surabaya", lat: -7.2575, lon: 112.7521 },
            { id: 4, name: "Jawa Tengah", capital: "Semarang", lat: -6.9667, lon: 110.4167 },
            { id: 5, name: "Banten", capital: "Serang", lat: -6.1200, lon: 106.1503 },
            { id: 6, name: "DI Yogyakarta", capital: "Yogyakarta", lat: -7.7956, lon: 110.3695 },
            { id: 7, name: "Bali", capital: "Denpasar", lat: -8.6500, lon: 115.2167 },
            { id: 8, name: "Sumatera Utara", capital: "Medan", lat: 3.5952, lon: 98.6722 },
            { id: 9, name: "Sumatera Barat", capital: "Padang", lat: -0.9492, lon: 100.3543 },
            { id: 10, name: "Riau", capital: "Pekanbaru", lat: 0.5333, lon: 101.4500 },
            { id: 11, name: "Kepulauan Riau", capital: "Tanjung Pinang", lat: 0.9188, lon: 104.4554 },
            { id: 12, name: "Jambi", capital: "Jambi", lat: -1.5900, lon: 103.6100 },
            { id: 13, name: "Sumatera Selatan", capital: "Palembang", lat: -2.9900, lon: 104.7600 },
            { id: 14, name: "Bengkulu", capital: "Bengkulu", lat: -3.7956, lon: 102.2592 },
            { id: 15, name: "Lampung", capital: "Bandar Lampung", lat: -5.4500, lon: 105.2667 },
            { id: 16, name: "Kalimantan Barat", capital: "Pontianak", lat: -0.0226, lon: 109.3307 },
            { id: 17, name: "Kalimantan Tengah", capital: "Palangkaraya", lat: -2.2100, lon: 113.9200 },
            { id: 18, name: "Kalimantan Selatan", capital: "Banjarmasin", lat: -3.3199, lon: 114.5908 },
            { id: 19, name: "Kalimantan Timur", capital: "Samarinda", lat: -0.5022, lon: 117.1536 },
            { id: 20, name: "Kalimantan Utara", capital: "Tanjung Selor", lat: 2.8375, lon: 117.3653 },
            { id: 21, name: "Sulawesi Utara", capital: "Manado", lat: 1.4931, lon: 124.8413 },
            { id: 22, name: "Sulawesi Tengah", capital: "Palu", lat: -0.8950, lon: 119.8597 },
            { id: 23, name: "Sulawesi Selatan", capital: "Makassar", lat: -5.1477, lon: 119.4327 },
            { id: 24, name: "Sulawesi Tenggara", capital: "Kendari", lat: -3.9675, lon: 122.5947 },
            { id: 25, name: "Gorontalo", capital: "Gorontalo", lat: 0.5412, lon: 123.0595 },
            { id: 26, name: "Sulawesi Barat", capital: "Mamuju", lat: -2.6786, lon: 118.8933 },
            { id: 27, name: "Maluku", capital: "Ambon", lat: -3.6954, lon: 128.1814 },
            { id: 28, name: "Maluku Utara", capital: "Ternate", lat: 0.7833, lon: 127.3667 },
            { id: 29, name: "Papua", capital: "Jayapura", lat: -2.5333, lon: 140.7167 },
            { id: 30, name: "Papua Barat", capital: "Manokwari", lat: -0.8667, lon: 134.0833 },
            { id: 31, name: "Papua Selatan", capital: "Merauke", lat: -8.4932, lon: 140.4018 },
            { id: 32, name: "Papua Tengah", capital: "Nabire", lat: -3.3667, lon: 135.4833 },
            { id: 33, name: "Papua Pegunungan", capital: "Wamena", lat: -4.0956, lon: 138.9550 },
            { id: 34, name: "Papua Barat Daya", capital: "Sorong", lat: -0.8667, lon: 131.2500 }
        ];
        
        // Cache untuk hasil geocoding
        this.geoCache = new Map();
        
        // UV Thresholds
        this.UV_THRESHOLDS = {
            low: { min: 0, max: 2.9, level: "Rendah", color: "#00cc00" },
            moderate: { min: 3, max: 5.9, level: "Sedang", color: "#ffcc00" },
            high: { min: 6, max: 7.9, level: "Tinggi", color: "#ff6600" },
            veryHigh: { min: 8, max: 10.9, level: "Sangat Tinggi", color: "#ff3300" },
            extreme: { min: 11, max: 20, level: "Ekstrem", color: "#cc00cc" }
        };

        // Southeast Asia detection
        this.isInSoutheastAsia = function(lat, lon) {
            // ASEAN region boundaries
            const inLatRange = lat > -11 && lat < 23;
            const inLonRange = lon > 95 && lon < 127;
            return inLatRange && inLonRange;
        };
        
        // Indonesia detection
        this.isInIndonesia = function(lat, lon) {
            return lat > -11 && lat < 6 && lon > 95 && lon < 141;
        };
        
        // Singapore detection
        this.isInSingapore = function(lat, lon) {
            return lat > 1.2 && lat < 1.5 && lon > 103.6 && lon < 104.0;
        };
        
        // Malaysia detection
        this.isInMalaysia = function(lat, lon) {
            // Peninsula Malaysia + East Malaysia (Borneo)
            const inPeninsula = lat > 1 && lat < 7 && lon > 100 && lon < 105;
            const inBorneo = lat > 1 && lat < 7 && lon > 110 && lon < 119;
            return inPeninsula || inBorneo;
        };
        
        // Logging function
        this.logUVCorrection = function(originalUV, correctedUV, lat, lon, cityName) {
            console.log(`📊 UV Correction: ${cityName}`);
            console.log(`   ${originalUV.toFixed(1)} → ${correctedUV.toFixed(1)}`);
        };

        
        // Initialize
        this.initSunAnimation();
        this.init();
    }
    
    initSunAnimation() {
        console.log("🌞 Sun animation initialized");
        // Simple sun animation for daytime detection
        const sunElement = document.getElementById('sunAnimation');
        if (sunElement) {
            const updateSun = () => {
                const now = new Date();
                const hour = now.getHours();
                const isDaytime = hour >= 6 && hour < 18;
                
                if (isDaytime) {
                    sunElement.innerHTML = '☀️';
                    sunElement.style.color = '#FFD700';
                    sunElement.style.textShadow = '0 0 20px #FFA500';
                } else {
                    sunElement.innerHTML = '🌙';
                    sunElement.style.color = '#87CEEB';
                    sunElement.style.textShadow = '0 0 10px #4682B4';
                }
            };
            updateSun();
            setInterval(updateSun, 60000); // Update every minute
        }
    }
    
    async init() {
        console.log("🚀 UV Guard Pro Initializing...");
        
        try {
            // 1. Load saved data
            this.loadHistory();
            
            // 2. Initialize components
            await this.initializeComponents();
            
            // 3. Set default location
            this.setDefaultLocation();
            
            // 4. Start time updates
            this.startTimeUpdates();
            
            // 5. Test API connection
            const apiConnected = await this.testAPIConnection();
            
            // 6. Initial data fetch
            if (this.dataHistory.length > 0 && this.currentLocation) {
                console.log("🔄 Using existing data from history");
                const latestData = this.dataHistory[this.dataHistory.length - 1];
                this.currentData = {
                    uvIndex: latestData.uvIndex,
                    temperature: latestData.temperature,
                    humidity: latestData.humidity,
                    weather: latestData.weather,
                    cityName: latestData.location,
                    timestamp: new Date(),
                    lat: latestData.lat,
                    lon: latestData.lon,
                    source: "history",
                    apiSource: "history"
                };
                this.updateAllUI();
            }
            
            // Fetch fresh data
            if (apiConnected && this.currentLocation) {
                console.log("🌐 API connected, fetching fresh data...");
                setTimeout(() => {
                    this.fetchData();
                }, 1000);
            } else if (this.currentLocation) {
                setTimeout(() => {
                    this.fetchData();
                }, 1000);
            }
            
            console.log("✅ UV Guard Pro initialized successfully!");
            
        } catch (error) {
            console.error("❌ Initialization error:", error);
            this.showNotification("Error inisialisasi aplikasi", "error");
        }
    }
    
    async initializeComponents() {
        // Initialize province dropdown
        this.initProvinceSelect();
        
        // Initialize skin type selector
        this.initSkinTypeSelector();
        
        // Initialize charts
        setTimeout(() => {
            this.initCharts();
        }, 500);
        
        // Initialize all event listeners
        this.initEventListeners();
        
        // Initialize UI state
        this.updateUIState();
    }
    
    // ==================== PROVINCE DROPDOWN - VERSI SIMPEL 100% BERHASIL ====================
initProvinceSelect() {
    console.log("🔄 Loading province dropdown...");
    
    const dropdown = document.getElementById('provinceSelect');
    if (!dropdown) {
        console.error("❌ Dropdown not found!");
        // Coba cari lagi dengan delay
        setTimeout(() => {
            const retryDropdown = document.getElementById('provinceSelect');
            if (retryDropdown) {
                this.initProvinceSelect();
            }
        }, 1000);
        return;
    }
    
    // Clear existing options
    dropdown.innerHTML = '<option value="">-- Pilih Provinsi Indonesia --</option>';
    
    // Add provinces
    this.INDONESIA_PROVINCES.forEach(prov => {
        const option = document.createElement('option');
        option.value = `${prov.lat},${prov.lon}`;
        option.textContent = `${prov.name} (${prov.capital})`;
        dropdown.appendChild(option);
    });
    
    console.log(`✅ Loaded ${this.INDONESIA_PROVINCES.length} provinces`);
    
    // Add event listener
    dropdown.addEventListener('change', (e) => {
        if (!e.target.value) return;
        
        const [lat, lon] = e.target.value.split(',').map(Number);
        const selectedText = e.target.options[e.target.selectedIndex].text;
        
        // Parse province and city names
        const provinceMatch = selectedText.match(/^(.+?)\(/);
        const cityMatch = selectedText.match(/\(([^)]+)\)/);
        
        const provinceName = provinceMatch ? provinceMatch[1].trim() : selectedText;
        const cityName = cityMatch ? cityMatch[1].trim() : provinceName;
        
        console.log(`📍 Selected: ${provinceName} - ${cityName} (${lat}, ${lon})`);
        
        // Update current location
        this.currentLocation = {
            lat: lat,
            lon: lon,
            name: cityName,
            province: provinceName,
            country: "ID"
        };
        
        // Update input fields
        const cityInput = document.getElementById('cityInput');
        const latInput = document.getElementById('latInput');
        const lonInput = document.getElementById('lonInput');
        
        if (cityInput) cityInput.value = `${cityName}, ${provinceName}`;
        if (latInput) latInput.value = lat;
        if (lonInput) lonInput.value = lon;
        
        // Show notification
        this.showNotification(`Provinsi ${provinceName} dipilih`, "success");
        
        // Update location status
        this.updateLocationStatus(`Lokasi: ${provinceName}, Indonesia`);
        
        // Fetch data after a short delay
        setTimeout(() => {
            this.fetchData();
        }, 800);
    });
    
    // Trigger change event jika ada lokasi yang disimpan
    setTimeout(() => {
        if (this.currentLocation && this.currentLocation.lat && this.currentLocation.lon) {
            const lat = this.currentLocation.lat;
            const lon = this.currentLocation.lon;
            
            // Cari option yang cocok
            for (let i = 0; i < dropdown.options.length; i++) {
                const option = dropdown.options[i];
                if (option.value === `${lat},${lon}` || 
                    option.text.includes(this.currentLocation.name) ||
                    option.text.includes(this.currentLocation.province)) {
                    dropdown.selectedIndex = i;
                    dropdown.dispatchEvent(new Event('change'));
                    break;
                }
            }
        }
    }, 1500);
}

    initSkinTypeSelector() {
        const select = document.getElementById('skinTypeSelect');
        if (!select) return;
        
        // Clear existing options
        select.innerHTML = '';
        
        // Add skin types
        const skinTypes = {
            'I': { name: 'Tipe I - Sangat putih, mudah terbakar' },
            'II': { name: 'Tipe II - Putih, mudah terbakar' },
            'III': { name: 'Tipe III - Coklat muda, terbakar sedang' },
            'IV': { name: 'Tipe IV - Coklat, jarang terbakar' },
            'V': { name: 'Tipe V - Coklat gelap, sangat jarang terbakar' },
            'VI': { name: 'Tipe VI - Hitam, tidak pernah terbakar' }
        };
        
        Object.entries(skinTypes).forEach(([key, data]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = data.name;
            select.appendChild(option);
        });
        
        // Set default to type III
        select.value = 'III';
        
        // Calculate on changes
        const calculateBtn = document.getElementById('calculateSunbath');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.calculateSunbathDuration();
            });
        }
        
        select.addEventListener('change', () => {
            this.calculateSunbathDuration();
        });
        
        const spfSelect = document.getElementById('spfSelect');
        if (spfSelect) {
            spfSelect.addEventListener('change', () => {
                this.calculateSunbathDuration();
            });
        }
        
        const calcUV = document.getElementById('calcUV');
        if (calcUV) {
            calcUV.addEventListener('input', () => {
                this.calculateSunbathDuration();
            });
        }
    }
    
    initCharts() {
        console.log("📊 Initializing charts...");
        
        // PERBAIKAN 1: UV Chart
        const uvCtx = document.getElementById('uvChart');
        if (!uvCtx) {
            console.error("❌ UV chart canvas not found!");
            // Create fallback element
            const chartContainer = document.querySelector('.chart-container');
            if (chartContainer) {
                chartContainer.innerHTML = '<div class="chart-error">Elemen chart tidak ditemukan. Refresh halaman.</div>';
            }
            return;
        }
        
        // Destroy previous chart if exists
        if (this.charts.uv) {
            try {
                this.charts.uv.destroy();
            } catch (e) {
                console.warn("Error destroying old chart:", e);
            }
        }
        
        try {
            this.charts.uv = new Chart(uvCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'UV Index',
                        data: [],
                        borderColor: '#0066cc',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: '#0066cc',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#ffffff',
                            bodyColor: '#ffffff',
                            callbacks: {
                                label: (context) => `UV Index: ${context.parsed.y.toFixed(1)}`
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: 'category',
                            title: {
                                display: true,
                                text: 'Waktu',
                                color: '#64748b'
                            },
                            grid: { color: 'rgba(0,0,0,0.05)' }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'UV Index',
                                color: '#64748b'
                            },
                            grid: { color: 'rgba(0,0,0,0.05)' },
                            suggestedMax: 15
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    }
                }
            });
            console.log("✅ UV Chart initialized");
            
            // Update chart with existing data
            if (this.dataHistory.length > 0) {
                setTimeout(() => {
                    this.updateCharts();
                }, 100);
            }
            
        } catch (error) {
            console.error("❌ Error initializing UV chart:", error);
            uvCtx.innerHTML = '<div class="chart-error">Chart tidak dapat dimuat. Error: ' + error.message + '</div>';
        }
        
        // History Chart
        const historyCtx = document.getElementById('historyChart');
        if (historyCtx) {
            try {
                if (this.charts.history) {
                    try {
                        this.charts.history.destroy();
                    } catch (e) {
                        console.warn("Error destroying history chart:", e);
                    }
                }
                
                this.charts.history = new Chart(historyCtx.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                        datasets: [{
                            label: 'Rata-rata UV Index',
                            data: [8.2, 8.5, 8.8, 9.2, 9.5, 9.8, 10.1, 10.3, 10.0, 9.5, 8.8, 8.3],
                            backgroundColor: 'rgba(0, 102, 204, 0.6)',
                            borderColor: '#0066cc',
                            borderWidth: 1,
                            borderRadius: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                            title: {
                                display: true,
                                text: 'Trend UV Index Tahunan Indonesia',
                                color: '#1e293b',
                                font: { size: 14 }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'UV Index',
                                    color: '#64748b'
                                }
                            }
                        }
                    }
                });
                console.log("✅ History Chart initialized");
            } catch (error) {
                console.error("❌ Error initializing history chart:", error);
            }
        }
    }
    
    initEventListeners() {
        console.log("🔗 Initializing event listeners...");
        
        // Location detection button
        const detectBtn = document.getElementById('detectLocation');
        if (detectBtn) {
            detectBtn.addEventListener('click', () => {
                this.detectUserLocation();
            });
        }
        
        // City search button - UNTUK SELURUH DUNIA
        const searchBtn = document.getElementById('searchCity');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.searchCityUniversal();
            });
        }
        
        // Use coordinates button
        const coordsBtn = document.getElementById('useCoordsBtn');
        if (coordsBtn) {
            coordsBtn.addEventListener('click', () => {
                this.useCoordinates();
            });
        }
        
        // Fetch data button
        const fetchBtn = document.getElementById('fetchData');
        if (fetchBtn) {
            fetchBtn.addEventListener('click', () => {
                this.fetchData();
            });
        }
        
        // Refresh button
        const refreshBtn = document.getElementById('refreshData');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.fetchData();
            });
        }
        
        // Start monitoring button
        const startMonitorBtn = document.getElementById('startMonitoring');
        if (startMonitorBtn) {
            startMonitorBtn.addEventListener('click', () => {
                this.startMonitoring();
            });
        }
        
        // Stop monitoring button
        const stopMonitorBtn = document.getElementById('stopMonitoring');
        if (stopMonitorBtn) {
            stopMonitorBtn.addEventListener('click', () => {
                this.stopMonitoring();
            });
        }
        
        // Export data button
        const exportBtn = document.getElementById('exportDataBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportData();
            });
        }
        
        // Clear history button
        const clearBtn = document.getElementById('clearHistoryBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearHistory();
            });
        }
        
        // Chart range selector
        const chartRange = document.getElementById('chartRange');
        if (chartRange) {
            chartRange.addEventListener('change', (e) => {
                const hours = parseInt(e.target.value);
                this.updateChartRange(hours);
            });
        }
        
        // City input enter key
        const cityInput = document.getElementById('cityInput');
        if (cityInput) {
            cityInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchCityUniversal();
                }
            });
        }
        
        console.log("✅ All event listeners initialized");
    }
    
    // ==================== LOCATION METHODS ====================
    setDefaultLocation() {
        this.currentLocation = {
            lat: -6.2088,
            lon: 106.8456,
            name: "Jakarta",
            country: "ID"
        };
        
        // Update input fields
        const cityInput = document.getElementById('cityInput');
        const latInput = document.getElementById('latInput');
        const lonInput = document.getElementById('lonInput');
        
        if (cityInput) cityInput.value = "Jakarta, Indonesia";
        if (latInput) latInput.value = "-6.2088";
        if (lonInput) lonInput.value = "106.8456";
        
        this.updateLocationStatus("Lokasi default: Jakarta, Indonesia");
        console.log("📍 Default location set to Jakarta");
    }
    
    async detectUserLocation() {
    console.log("📍 Attempting to detect location...");
    
    // Tampilkan pesan jelas ke user
    this.showNotification("Mendeteksi lokasi... Browser akan meminta izin.", "info");
    
    // Cek support geolocation
    if (!navigator.geolocation) {
        const errorMsg = "Browser Anda tidak mendukung geolocation. Gunakan browser modern seperti Chrome, Firefox, Edge.";
        this.showNotification(errorMsg, "error");
        this.updateLocationStatus("Browser tidak support geolocation");
        this.useDefaultLocationFallback();
        return;
    }
    
    // Options yang kompatibel dengan semua browser
    const geoOptions = {
        enableHighAccuracy: true,
        timeout: 15000, // 15 detik timeout
        maximumAge: 60000 // 1 menit cache maksimal
    };
    
    try {
        // Pakai Promise dengan error handling lengkap
        const position = await new Promise((resolve, reject) => {
            // Timeout manual sebagai backup
            const timeoutId = setTimeout(() => {
                reject(new Error("Timeout: Gagal mendapatkan lokasi dalam 15 detik"));
            }, 15000);
            
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    clearTimeout(timeoutId);
                    resolve(pos);
                },
                (err) => {
                    clearTimeout(timeoutId);
                    reject(err);
                },
                geoOptions
            );
        });

        console.log("✅ Geolocation success:", position);
        
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        
        console.log(`Coordinates: ${lat}, ${lon} (accuracy: ${accuracy}m)`);
        
        // Update UI dengan koordinat dulu
        this.currentLocation = {
            lat: lat,
            lon: lon,
            name: "Lokasi Anda",
            country: "ID"
        };
        
        // Update input fields
        this.updateLocationInputs("Lokasi Anda", lat, lon);
        this.updateLocationStatus(`Lokasi terdeteksi (akurasi: ${Math.round(accuracy)}m)`);
        
        // Coba dapatkan nama kota (tapi jangan block jika gagal)
        setTimeout(async () => {
            try {
                const locationInfo = await this.reverseGeocode(lat, lon);
                if (locationInfo && locationInfo.city) {
                    const displayName = locationInfo.state ? 
                        `${locationInfo.city}, ${locationInfo.state}, ${locationInfo.country}` :
                        `${locationInfo.city}, ${locationInfo.country}`;
                    
                    this.currentLocation.name = locationInfo.city;
                    this.currentLocation.country = locationInfo.country;
                    
                    const cityInput = document.getElementById('cityInput');
                    if (cityInput) cityInput.value = displayName;
                    
                    this.updateLocationStatus(`Lokasi: ${displayName}`);
                }
            } catch (geoError) {
                console.warn("Reverse geocode failed, using coordinates only:", geoError);
            }
        }, 0);
        
        this.showNotification("Lokasi berhasil dideteksi!", "success");
        
        // Fetch data
        setTimeout(() => this.fetchData(), 1000);
        
    } catch (error) {
        console.error("❌ Geolocation failed:", error);
        
        // User-friendly error messages
        let userMessage = "Gagal mendeteksi lokasi";
        let suggestion = "";
        
        if (error.code === 1 || error.message.includes("denied")) {
            userMessage = "Izin lokasi ditolak";
            suggestion = "Izinkan akses lokasi di browser settings dan coba lagi.";
        } else if (error.code === 2 || error.message.includes("unavailable")) {
            userMessage = "Lokasi tidak tersedia";
            suggestion = "Pastikan GPS/Internet aktif.";
        } else if (error.code === 3 || error.message.includes("timeout")) {
            userMessage = "Timeout mendapatkan lokasi";
            suggestion = "Coba lagi dengan koneksi lebih baik.";
        } else if (error.message.includes("Timeout")) {
            userMessage = "Proses terlalu lama";
            suggestion = "Cek koneksi internet dan GPS.";
        } else {
            userMessage = `Error: ${error.message || "Tidak diketahui"}`;
        }
        
        this.showNotification(`${userMessage}. ${suggestion}`, "error");
        this.updateLocationStatus("Gagal deteksi lokasi");
        
        // Auto-fallback ke lokasi default
        setTimeout(() => {
            this.useDefaultLocationFallback();
        }, 2000);
    }
}

useDefaultLocationFallback() {
        console.log("🔄 Using default location fallback...");
        
        // Set ke Jakarta sebagai default
        this.currentLocation = {
            lat: -6.2088,
            lon: 106.8456,
            name: "Jakarta",
            province: "DKI Jakarta",
            country: "ID"
        };
        
        // Update input fields
        const cityInput = document.getElementById('cityInput');
        const latInput = document.getElementById('latInput');
        const lonInput = document.getElementById('lonInput');
        
        if (cityInput) cityInput.value = "Jakarta, Indonesia";
        if (latInput) latInput.value = "-6.2088";
        if (lonInput) lonInput.value = "106.8456";
        
        // Update status
        this.updateLocationStatus("Lokasi default: Jakarta, Indonesia");
        this.showNotification("Menggunakan lokasi default Jakarta", "info");
        
        console.log("📍 Default fallback location: Jakarta");
        
        // Fetch data setelah 1 detik
        setTimeout(() => {
            this.fetchData();
        }, 1000);
    }


// Helper untuk update input fields
updateLocationInputs(name, lat, lon) {
    const cityInput = document.getElementById('cityInput');
    const latInput = document.getElementById('latInput');
    const lonInput = document.getElementById('lonInput');
    
    if (cityInput) cityInput.value = name;
    if (latInput) latInput.value = lat.toFixed(6);
    if (lonInput) lonInput.value = lon.toFixed(6);
}
    
    // Search kota di seluruh dunia
    async searchCityUniversal() {
        const cityInput = document.getElementById('cityInput');
        if (!cityInput) return;
        
        const searchText = cityInput.value.trim();
        
        if (!searchText) {
            this.showNotification("Masukkan nama kota atau koordinat", "warning");
            return;
        }
        
        // Cek apakah input adalah koordinat
        const coordRegex = /^(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)$/;
        const coordMatch = searchText.match(coordRegex);
        
        if (coordMatch) {
            // Input adalah koordinat
            const lat = parseFloat(coordMatch[1]);
            const lon = parseFloat(coordMatch[2]);
            
            if (isNaN(lat) || isNaN(lon)) {
                this.showNotification("Koordinat tidak valid", "error");
                return;
            }
            
            if (lat < -90 || lat > 90) {
                this.showNotification("Latitude harus antara -90 dan 90", "error");
                return;
            }
            
            if (lon < -180 || lon > 180) {
                this.showNotification("Longitude harus antara -180 dan 180", "error");
                return;
            }
            
            this.currentLocation = { 
                lat, 
                lon, 
                name: `Koordinat (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
                country: "XX"
            };
            
            // Update input fields
            const latInput = document.getElementById('latInput');
            const lonInput = document.getElementById('lonInput');
            
            if (latInput) latInput.value = lat.toFixed(6);
            if (lonInput) lonInput.value = lon.toFixed(6);
            
            this.updateLocationStatus(`Lokasi: Koordinat manual`);
            this.showNotification("Koordinat diterima", "success");
            this.fetchData();
            return;
        }
        
        // Gunakan OpenWeatherMap Geocoding API untuk semua kota di dunia
        this.showNotification(`Mencari: ${searchText}...`, "info");
        
        // Coba OpenWeatherMap Geocoding API dulu
        const geoResult = await this.geocodeCity(searchText);
        
        if (geoResult) {
            this.currentLocation = {
                lat: geoResult.lat,
                lon: geoResult.lon,
                name: geoResult.name,
                country: geoResult.country,
                state: geoResult.state
            };
            
            // Update input fields
            const latInput = document.getElementById('latInput');
            const lonInput = document.getElementById('lonInput');
            
            if (latInput) latInput.value = geoResult.lat.toFixed(6);
            if (lonInput) lonInput.value = geoResult.lon.toFixed(6);
            
            const displayName = geoResult.state ? 
                `${geoResult.name}, ${geoResult.state}, ${geoResult.country}` :
                `${geoResult.name}, ${geoResult.country}`;
            
            this.updateLocationStatus(`Lokasi: ${displayName}`);
            this.showNotification(`Kota ditemukan: ${displayName}`, "success");
            
            await this.fetchData();
            return;
        }
        
        // Jika OpenWeatherMap gagal, coba OpenStreetMap Nominatim sebagai fallback
        try {
            this.showNotification("Mencari via OpenStreetMap...", "info");
            
            const osmUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&limit=1&addressdetails=1`;
            const response = await fetch(osmUrl, {
                headers: {
                    'User-Agent': 'UVGuardPro/1.0'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                
                if (data && data.length > 0) {
                    const result = data[0];
                    this.currentLocation = {
                        lat: parseFloat(result.lat),
                        lon: parseFloat(result.lon),
                        name: result.display_name.split(',')[0],
                        country: result.address?.country_code?.toUpperCase() || "XX",
                        state: result.address?.state || result.address?.region || ""
                    };
                    
                    // Update input fields
                    const latInput = document.getElementById('latInput');
                    const lonInput = document.getElementById('lonInput');
                    
                    if (latInput) latInput.value = parseFloat(result.lat).toFixed(6);
                    if (lonInput) lonInput.value = parseFloat(result.lon).toFixed(6);
                    
                    this.updateLocationStatus(`Lokasi via OSM: ${result.display_name}`);
                    this.showNotification(`Lokasi ditemukan via OpenStreetMap`, "success");
                    
                    await this.fetchData();
                    return;
                }
            }
        } catch (osmError) {
            console.warn("OSM geocoding error:", osmError);
        }
        
        // Jika semua gagal
        this.showNotification(`"${searchText}" tidak ditemukan. Coba format: "Kota, Negara" atau "Kota Negara"`, "warning");
        this.updateLocationStatus("Kota tidak ditemukan");
    }
    
    // Geocode menggunakan OpenWeatherMap API
    async geocodeCity(cityName) {
    console.log(`📍 Geocoding: "${cityName}"`);
    
    // Check cache
    const cacheKey = cityName.toLowerCase().trim();
    if (this.geoCache.has(cacheKey)) {
        console.log("📍 Using cached geocode result");
        return this.geoCache.get(cacheKey);
    }
    
    // Pakai OpenWeatherMap Geocoding API
    const owmConfig = this.MULTI_API_CONFIG.openweather;
    
    for (let i = 0; i < owmConfig.keys.length; i++) {
        const apiKey = owmConfig.keys[i];
        if (!apiKey) continue;
        
        try {
            const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=5&appid=${apiKey}`;
            
            console.log(`📍 Trying OpenWeatherMap key ${i+1}...`);
            const response = await fetch(geocodeUrl);
            
            if (response.ok) {
                const data = await response.json();
                
                if (data && data.length > 0) {
                    const result = data[0];
                    const geoData = {
                        name: result.name,
                        lat: result.lat,
                        lon: result.lon,
                        country: result.country,
                        state: result.state || ""
                    };
                    
                    // Cache hasilnya
                    this.geoCache.set(cacheKey, geoData);
                    
                    console.log(`📍 Found: ${result.name}, ${result.country} (${result.lat}, ${result.lon})`);
                    return geoData;
                } else {
                    console.warn(`📍 No results found for "${cityName}"`);
                    return null;
                }
            } else {
                console.warn(`📍 Geocoding failed with key ${i+1}: ${response.status}`);
            }
            
        } catch (error) {
            console.error(`📍 Geocoding error with key ${i+1}:`, error.message);
        }
    }
    
    console.warn(`📍 All geocoding attempts failed for "${cityName}"`);
    return null;
}

    
    // Reverse geocode coordinates to city name
    async reverseGeocode(lat, lon) {
    const cacheKey = `${lat.toFixed(4)},${lon.toFixed(4)}`;
    
    if (this.geoCache.has(cacheKey)) {
        return this.geoCache.get(cacheKey);
    }
    
    // Pakai OpenWeatherMap Reverse Geocoding
    const owmConfig = this.MULTI_API_CONFIG.openweather;
    
    for (let i = 0; i < owmConfig.keys.length; i++) {
        const apiKey = owmConfig.keys[i];
        if (!apiKey) continue;
        
        try {
            const reverseUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
            
            const response = await fetch(reverseUrl);
            
            if (response.ok) {
                const data = await response.json();
                
                if (data && data.length > 0) {
                    const result = {
                        city: data[0].name,
                        country: data[0].country || "XX",
                        state: data[0].state || ""
                    };
                    
                    this.geoCache.set(cacheKey, result);
                    console.log(`📍 Reverse geocode: ${result.city}, ${result.country}`);
                    return result;
                }
            }
        } catch (error) {
            console.warn(`📍 Reverse geocoding error with key ${i+1}:`, error);
        }
    }
    
    // Fallback
    console.log(`📍 Reverse geocode failed for (${lat}, ${lon})`);
    return { city: "Lokasi Anda", country: "XX", state: "" };
}

    
    useCoordinates() {
        const latInput = document.getElementById('latInput');
        const lonInput = document.getElementById('lonInput');
        
        if (!latInput || !lonInput) return;
        
        const lat = parseFloat(latInput.value);
        const lon = parseFloat(lonInput.value);
        
        if (isNaN(lat) || isNaN(lon)) {
            this.showNotification("Koordinat tidak valid", "error");
            return;
        }
        
        if (lat < -90 || lat > 90) {
            this.showNotification("Latitude harus antara -90 dan 90", "error");
            return;
        }
        
        if (lon < -180 || lon > 180) {
            this.showNotification("Longitude harus antara -180 dan 180", "error");
            return;
        }
        
        this.currentLocation = { 
            lat, 
            lon, 
            name: `Koordinat (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
            country: "XX"
        };
        
        // Update city input
        const cityInput = document.getElementById('cityInput');
        if (cityInput) {
            cityInput.value = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        }
        
        this.updateLocationStatus(`Lokasi: Koordinat manual`);
        this.showNotification("Koordinat diterima", "success");
        this.fetchData();
    }
    
    // ==================== API METHODS ====================
    async testAPIConnection() {
    console.log("🔌 Testing API connection...");
    
    // Test OpenWeatherMap dari MULTI_API_CONFIG
    const owmConfig = this.MULTI_API_CONFIG.openweather;
    
    for (let i = 0; i < owmConfig.keys.length; i++) {
        const apiKey = owmConfig.keys[i];
        
        if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
            console.warn(`⚠️ OpenWeatherMap key ${i+1} tidak valid`);
            continue;
        }
        
        try {
            const testUrl = `https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=${apiKey}&units=metric`;
            
            console.log(`🔍 Testing OpenWeatherMap key ${i+1}...`);
            const response = await fetch(testUrl);
            
            if (response.ok) {
                console.log(`✅ OpenWeatherMap key ${i+1}: CONNECTED`);
                owmConfig.currentKeyIndex = i;
                
                // Test multi-source jika aktif
                if (this.MULTI_API_CONFIG.useMultipleSources) {
                    console.log("🔍 Testing multi-source providers...");
                    await this.testMultiSourceAPIs();
                }
                
                this.isDemoMode = false;
                this.updateAPIStatus(true);
                return true;
            } else {
                console.warn(`⚠️ OpenWeatherMap key ${i+1} failed: ${response.status}`);
            }
            
        } catch (error) {
            console.error(`❌ OpenWeatherMap key ${i+1} error:`, error.message);
        }
    }
    
    // Jika OpenWeatherMap gagal semua, coba WeatherAPI.com
    console.log("🔍 Testing WeatherAPI.com...");
    try {
        const weatherapiKey = this.MULTI_API_CONFIG.weatherapi.key;
        if (weatherapiKey && weatherapiKey !== "YOUR_WEATHERAPI_KEY") {
            const testUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherapiKey}&q=Jakarta&aqi=no`;
            const response = await fetch(testUrl);
            
            if (response.ok) {
                console.log("✅ WeatherAPI.com: CONNECTED");
                this.isDemoMode = false;
                this.updateAPIStatus(true);
                return true;
            }
        }
    } catch (error) {
        console.warn("⚠️ WeatherAPI.com test failed:", error.message);
    }
    
    // Jika masih gagal, coba Visual Crossing
    console.log("🔍 Testing Visual Crossing...");
    try {
        const vcKey = this.MULTI_API_CONFIG.visualcrossing.key;
        if (vcKey && vcKey !== "YOUR_VISUALCROSSING_KEY") {
            const testUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Jakarta/today?key=${vcKey}&unitGroup=metric`;
            const response = await fetch(testUrl);
            
            if (response.ok) {
                console.log("✅ Visual Crossing: CONNECTED");
                this.isDemoMode = false;
                this.updateAPIStatus(true);
                return true;
            }
        }
    } catch (error) {
        console.warn("⚠️ Visual Crossing test failed:", error.message);
    }
    
    console.warn("⚠️ All API tests failed. Using DEMO MODE.");
    this.isDemoMode = true;
    this.updateAPIStatus(false);
    return false;
}

// ==================== TAMBAHKAN METHOD INI JUGA ====================

async testMultiSourceAPIs() {
    console.log("🔍 Testing additional API sources...");
    
    let availableSources = [];
    
    // Test WeatherAPI.com
    const weatherapiKey = this.MULTI_API_CONFIG.weatherapi.key;
    if (weatherapiKey && weatherapiKey !== "YOUR_WEATHERAPI_KEY") {
        try {
            const url = `https://api.weatherapi.com/v1/current.json?key=${weatherapiKey}&q=Jakarta&aqi=no`;
            const response = await fetch(url);
            if (response.ok) {
                console.log("✅ WeatherAPI.com: AVAILABLE");
                availableSources.push("WeatherAPI.com");
            }
        } catch (error) {
            console.warn("❌ WeatherAPI.com: NOT AVAILABLE");
        }
    }
    
    // Test Visual Crossing
    const vcKey = this.MULTI_API_CONFIG.visualcrossing.key;
    if (vcKey && vcKey !== "YOUR_VISUALCROSSING_KEY") {
        try {
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Jakarta/today?key=${vcKey}`;
            const response = await fetch(url);
            if (response.ok) {
                console.log("✅ Visual Crossing: AVAILABLE");
                availableSources.push("Visual Crossing");
            }
        } catch (error) {
            console.warn("❌ Visual Crossing: NOT AVAILABLE");
        }
    }
    
    console.log(`📡 Available sources: ${availableSources.join(', ') || 'None'}`);
    return availableSources;
}

    
    updateAPIStatus(connected) {
    const apiStatus = document.getElementById('apiStatus');
    if (!apiStatus) return;
    
    if (connected) {
        apiStatus.innerHTML = '<span class="status-indicator active"></span> <span>API Connected</span>';
        apiStatus.style.color = '#10b981';
        apiStatus.title = "Connected to weather API";
    } else {
        apiStatus.innerHTML = '<span class="status-indicator warning"></span> <span>Demo Mode</span>';
        apiStatus.style.color = '#f59e0b';
        apiStatus.title = "Using demo data (API failed)";
    }
}

    
        async fetchData() {
        if (!this.currentLocation) {
        this.showNotification("Pilih lokasi terlebih dahulu", "warning");
        console.warn("❌ No location selected");
        return;
    }
    
    try {
        this.validateCoordinates(this.currentLocation.lat, this.currentLocation.lon);
    } catch (validationError) {
        this.showNotification(`Error lokasi: ${validationError.message}`, "error");
        console.error("❌ Location validation failed:", validationError);
        return;
    }
    
    console.log("=".repeat(60));
    console.log("🚀 UV GUARD PRO - DATA FETCH START");
    console.log(`📍 Location: ${this.currentLocation.name || "Unknown"}`);
    console.log(`📌 Coordinates: ${this.currentLocation.lat}, ${this.currentLocation.lon}`);
    console.log("=".repeat(60));

        
        this.showNotification("Mengambil data dari multiple sources...", "info");
        this.toggleButtons(false);
        
        try {
            let data;
            
            // ==================== PERUBAHAN BESAR DI SINI ====================
            // CEK: Apakah multi-source system aktif?
            const useMultiSource = this.MULTI_API_CONFIG && 
                                  this.MULTI_API_CONFIG.useMultipleSources === true;
            
            console.log(`🔧 System Mode: ${useMultiSource ? 'MULTI-SOURCE' : 'SINGLE-SOURCE'}`);
            console.log(`🔧 Demo Mode: ${this.isDemoMode ? 'ON' : 'OFF'}`);
            
            if (this.isDemoMode) {
                // Jika demo mode aktif, gunakan demo data
                console.log("🎭 Using DEMO DATA (demo mode active)");
                data = await this.generateDemoData();
                
            } else if (useMultiSource) {
                // MULTI-SOURCE MODE: Coba semua provider
                console.log("🌐 MULTI-SOURCE: Trying all weather providers...");
                data = await this.fetchFromMultipleSources();
                
                // Jika multi-source gagal, coba OpenWeatherMap saja
                if (!data) {
                    console.log("⚠️ Multi-source failed, trying OpenWeatherMap alone...");
                    data = await this.fetchAPIData();
                }
                
            } else {
                // SINGLE-SOURCE MODE: OpenWeatherMap saja
                console.log("🌐 SINGLE-SOURCE: Using OpenWeatherMap only");
                data = await this.fetchAPIData();
            }
            // ==================== SAMPAI DI SINI ====================
            
            // Jika semua API gagal, fallback ke demo data
            if (!data) {
                console.log("❌ ALL API SOURCES FAILED, using DEMO DATA");
                this.isDemoMode = true;
                this.updateAPIStatus(false);
                data = await this.generateDemoData();
                
                this.showNotification("Menggunakan data demo (API gagal)", "warning");
            } else {
                this.isDemoMode = false;
                this.updateAPIStatus(true);
                
                // Tampilkan notifikasi sumber data
                const provider = data.provider || data.apiSource || "API";
                const uvValue = data.uvIndex.toFixed(1);
                const timeOfDay = data.isDaytime ? "siang" : "malam";
                
                this.showNotification(
                    `Data ${provider}: UV ${uvValue} (${timeOfDay})`, 
                    "success"
                );
            }
            
            // Proses data yang didapat
            if (data) {
                console.log("✅ DATA RECEIVED SUCCESSFULLY:");
                console.log(`   Provider: ${data.provider || data.apiSource || "Unknown"}`);
                console.log(`   UV Index: ${data.uvIndex}`);
                console.log(`   Temperature: ${data.temperature}°C`);
                console.log(`   Weather: ${data.weather}`);
                console.log(`   Time: ${data.isDaytime ? 'Daytime ☀️' : 'Nighttime 🌙'}`);
                console.log("=".repeat(60));
                
                await this.processData(data);
            }
            
        } catch (error) {
            console.error("❌ CRITICAL ERROR in fetchData:", error);
            this.showNotification(`Error sistem: ${error.message}`, "error");
            
            // Emergency fallback ke demo data
            try {
                console.log("🆘 EMERGENCY: Using demo data as last resort...");
                const demoData = await this.generateDemoData();
                await this.processData(demoData);
            } catch (demoError) {
                console.error("💥 EVEN DEMO DATA FAILED:", demoError);
                this.showNotification("Sistem error total. Refresh halaman.", "error");
            }
        } finally {
            this.toggleButtons(true);
            console.log("✅ Fetch process completed");
        }
    }
    
    async fetchAPIData() {
    const { lat, lon, name } = this.currentLocation;
    const apiConfig = this.MULTI_API_CONFIG.openweather;
    const apiKeys = apiConfig.keys;
    const currentApiKey = apiKeys[apiConfig.currentKeyIndex];
    
    if (!currentApiKey) {
        console.warn("No valid API key available for OpenWeatherMap");
        return null;
    }
    
    try {
        // Fetch weather data
        const weatherUrl = `${apiConfig.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${currentApiKey}&units=metric&lang=id`;
        
        console.log(`🌐 OpenWeatherMap: Fetching weather data...`);
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) {
            console.warn(`❌ OpenWeatherMap weather error: ${weatherResponse.status}`);
            apiConfig.currentKeyIndex = (apiConfig.currentKeyIndex + 1) % apiKeys.length;
            return null;
        }
        
        const weatherData = await weatherResponse.json();
        
        // Fetch UV index
        const uvUrl = `${apiConfig.baseUrl}/uvi?lat=${lat}&lon=${lon}&appid=${currentApiKey}`;
        let uvIndex = 0;
        let originalUV = 0;
        
        try {
            const uvResponse = await fetch(uvUrl);
            if (uvResponse.ok) {
                const uvData = await uvResponse.json();
                uvIndex = uvData.value || 0;
                originalUV = uvIndex;
                
                // Koreksi untuk Southeast Asia
                if (this.isInSoutheastAsia(lat, lon)) {
                    console.log(`🌏 Southeast Asia detected: ${weatherData.name || name}`);
                    
                    let correctionFactor = 0.70;
                    
                    if (this.isInIndonesia(lat, lon)) {
                        correctionFactor = 0.65;
                        console.log(`🇮🇩 Indonesia correction applied`);
                    } else if (this.isInSingapore(lat, lon)) {
                        correctionFactor = 0.75;
                        console.log(`🇸🇬 Singapore correction applied`);
                    } else if (this.isInMalaysia(lat, lon)) {
                        correctionFactor = 0.75;
                        console.log(`🇲🇾 Malaysia correction applied`);
                    }
                    
                    uvIndex = uvIndex * correctionFactor;
                    const MAX_SEA_UV = 11;
                    uvIndex = Math.min(uvIndex, MAX_SEA_UV);
                    
                    console.log(`📊 UV corrected: ${originalUV.toFixed(1)} → ${uvIndex.toFixed(1)}`);
                    this.logUVCorrection(originalUV, uvIndex, lat, lon, weatherData.name || name);
                }
                
                uvIndex = Math.min(uvIndex, 12);
            }
        } catch (uvError) {
            console.warn("❌ OpenWeatherMap UV API error:", uvError);
        }
        
        // ========== PERBAIKAN KRITIS: SUNRISE/SUNSET ==========
        // Data dari OpenWeatherMap SUDAH dalam waktu lokal kota tersebut!
        // JANGAN tambah atau kurangi jam!
        
        const sunriseUnix = weatherData.sys.sunrise; // LOCAL TIME timestamp
        const sunsetUnix = weatherData.sys.sunset;   // LOCAL TIME timestamp
        
        // Konversi ke Date object - INI SUDAH WAKTU LOKAL
        const sunriseLocal = new Date(sunriseUnix * 1000);
        const sunsetLocal = new Date(sunsetUnix * 1000);
        
        // Waktu sekarang
        const now = new Date();
        
        // ========== DEBUG DETAILED ==========
        console.log("=".repeat(50));
        console.log("🕐 SUNRISE/SUNSET DEBUG untuk:", weatherData.name || name);
        console.log("=".repeat(50));
        console.log("📍 Koordinat:", lat + ", " + lon);
        console.log("📅 Tanggal sekarang:", now.toLocaleDateString('id-ID'));
        console.log("⏰ Waktu sekarang:", now.toLocaleTimeString('id-ID'));
        console.log("");
        console.log("📊 DATA DARI API:");
        console.log("  Sunrise Unix:", sunriseUnix);
        console.log("  Sunset Unix:", sunsetUnix);
        console.log("  Sunrise (Date):", sunriseLocal.toString());
        console.log("  Sunset (Date):", sunsetLocal.toString());
        console.log("  Sunrise (Local):", sunriseLocal.toLocaleTimeString('id-ID'));
        console.log("  Sunset (Local):", sunsetLocal.toLocaleTimeString('id-ID'));
        console.log("  Sunrise (ISO):", sunriseLocal.toISOString());
        console.log("  Sunset (ISO):", sunsetLocal.toISOString());
        console.log("");
        
        // Cek apakah masuk akal untuk lokasi Indonesia
        const sunriseHour = sunriseLocal.getHours();
        const sunsetHour = sunsetLocal.getHours();
        
        console.log("✅ Sunrise Hour:", sunriseHour + ":" + sunriseLocal.getMinutes().toString().padStart(2, '0'));
        console.log("✅ Sunset Hour:", sunsetHour + ":" + sunsetLocal.getMinutes().toString().padStart(2, '0'));
        
        // Validasi: Untuk Indonesia, sunrise biasanya 5-7 pagi, sunset 17-19 sore
        if (sunriseHour < 4 || sunriseHour > 8) {
            console.warn("⚠️ WARNING: Sunrise time seems unrealistic for Indonesia!");
        }
        if (sunsetHour < 17 || sunsetHour > 20) {
            console.warn("⚠️ WARNING: Sunset time seems unrealistic for Indonesia!");
        }
        
        // Cek apakah sekarang siang atau malam
        const isDaytime = now >= sunriseLocal && now <= sunsetLocal;
        
        console.log("");
        console.log("🔆 DAY/NIGHT CHECK:");
        console.log("  Now:", now.toLocaleTimeString('id-ID'));
        console.log("  Sunrise:", sunriseLocal.toLocaleTimeString('id-ID'));
        console.log("  Sunset:", sunsetLocal.toLocaleTimeString('id-ID'));
        console.log("  Is Daytime?", isDaytime ? "☀️ YA (Siang)" : "🌙 TIDAK (Malam)");
        console.log("=".repeat(50));
        
        // Jika malam hari, adjust UV index
        if (!isDaytime) {
            console.log("🌙 Nighttime detected, reducing UV index");
            uvIndex = Math.max(0, uvIndex * 0.1); // UV sangat rendah di malam hari
        }
        
        return {
            uvIndex: parseFloat(uvIndex.toFixed(1)),
            temperature: parseFloat(weatherData.main.temp.toFixed(1)),
            feelsLike: parseFloat(weatherData.main.feels_like.toFixed(1)),
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure,
            weather: weatherData.weather[0].description,
            weatherMain: weatherData.weather[0].main,
            weatherIcon: weatherData.weather[0].icon,
            windSpeed: parseFloat(weatherData.wind.speed.toFixed(1)),
            windDeg: weatherData.wind.deg || 0,
            clouds: weatherData.clouds.all,
            sunrise: sunriseLocal,  // INI SUDAH WAKTU LOKAL!
            sunset: sunsetLocal,    // INI SUDAH WAKTU LOKAL!
            cityName: weatherData.name || name,
            country: weatherData.sys.country || "XX",
            timestamp: now,
            lat: lat,
            lon: lon,
            source: "api",
            apiSource: "OpenWeatherMap",
            provider: "OpenWeatherMap",
            isDaytime: isDaytime,
            originalUV: originalUV,
            timezoneOffset: weatherData.timezone || 25200 // timezone offset dalam detik (7 jam = 25200 detik)
        };
        
    } catch (error) {
        console.error("❌ OpenWeatherMap fetch error:", error);
        const apiConfig = this.MULTI_API_CONFIG.openweather;
        apiConfig.currentKeyIndex = (apiConfig.currentKeyIndex + 1) % apiConfig.keys.length;
        return null;
    }
}

    
    async generateDemoData() {
        const { lat, lon, name, country } = this.currentLocation;
        const now = new Date();
        const hour = now.getHours();
        const month = now.getMonth();
        
        // PERBAIKAN 3: Generate realistic sunrise/sunset times based on latitude
        const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const declination = 23.45 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81));
        
        // Calculate sunrise/sunset hour
        const latRad = lat * Math.PI / 180;
        const declRad = declination * Math.PI / 180;
        const hourAngle = Math.acos(-Math.tan(latRad) * Math.tan(declRad)) * 180 / Math.PI / 15;
        
        const sunriseHour = 12 - hourAngle;
        const sunsetHour = 12 + hourAngle;
        
        const sunrise = new Date(now);
        sunrise.setHours(Math.floor(sunriseHour), Math.floor((sunriseHour % 1) * 60), 0, 0);
        
        const sunset = new Date(now);
        sunset.setHours(Math.floor(sunsetHour), Math.floor((sunsetHour % 1) * 60), 0, 0);
        
        // PERBAIKAN 4: UV hanya di siang hari, 0 di malam hari
        const isDaytime = hour >= sunrise.getHours() && hour <= sunset.getHours();
        
        let uvIndex = 0;
        
        if (isDaytime) {
            // Generate realistic UV based on location and time
            const latitudeFactor = Math.cos(lat * Math.PI / 180); // 1 at equator, 0 at poles
            const seasonFactor = this.calculateSeasonFactor(lat, month);
            
            // Base UV at noon at equator
            let baseUV = 12 * latitudeFactor * seasonFactor;
            
            // Adjust for time of day (sinusoidal curve centered at solar noon)
            const solarNoon = 12; // Solar noon at 12:00
            const hourFromNoon = Math.abs(hour - solarNoon);
            const timeFactor = Math.cos(hourFromNoon * Math.PI / 12); // Cosine curve
            
            baseUV = Math.max(0, baseUV * Math.max(0, timeFactor));
            
            // Add some randomness
            const randomFactor = 0.8 + Math.random() * 0.4;
            uvIndex = parseFloat((baseUV * randomFactor).toFixed(1));
            
            // Ensure UV is not too high
            uvIndex = Math.min(uvIndex, 15);
        } else {
            // Malam hari, UV = 0
            uvIndex = 0;
            console.log("🌙 Demo: Nighttime, UV set to 0");
        }
        
        // Weather conditions based on location
        let weatherConditions;
        
        // Different weather patterns for different latitudes
        if (Math.abs(lat) < 23.5) {
            // Tropical regions
            weatherConditions = [
                { desc: "Cerah", main: "Clear", icon: "01d", prob: 40 },
                { desc: "Cerah Berawan", main: "Partly Cloudy", icon: "02d", prob: 30 },
                { desc: "Hujan Ringan", main: "Light Rain", icon: "10d", prob: 20 },
                { desc: "Hujan Petir", main: "Thunderstorm", icon: "11d", prob: 10 }
            ];
        } else if (Math.abs(lat) < 45) {
            // Temperate regions
            weatherConditions = [
                { desc: "Cerah", main: "Clear", icon: "01d", prob: 30 },
                { desc: "Cerah Berawan", main: "Partly Cloudy", icon: "02d", prob: 40 },
                { desc: "Berawan", main: "Cloudy", icon: "03d", prob: 20 },
                { desc: "Hujan Ringan", main: "Light Rain", icon: "10d", prob: 10 }
            ];
        } else {
            // Polar regions
            weatherConditions = [
                { desc: "Berawan", main: "Cloudy", icon: "03d", prob: 50 },
                { desc: "Cerah Berawan", main: "Partly Cloudy", icon: "02d", prob: 30 },
                { desc: "Salju Ringan", main: "Light Snow", icon: "13d", prob: 15 },
                { desc: "Berkabut", main: "Mist", icon: "50d", prob: 5 }
            ];
        }
        
        const weather = this.weightedRandomChoice(weatherConditions);
        
        // Temperature based on latitude and season
        let baseTemp;
        if (Math.abs(lat) < 23.5) {
            baseTemp = 28; // Tropical
        } else if (Math.abs(lat) < 45) {
            baseTemp = 15; // Temperate
        } else {
            baseTemp = -5; // Polar
        }
        
        // Adjust for season
        baseTemp += 15 * this.calculateSeasonFactor(lat, month);
        
        // Adjust for time of day (cooler at night)
        const tempVariation = Math.cos((hour - 14) * Math.PI / 12) * 8;
        const temperature = baseTemp + tempVariation + (Math.random() - 0.5) * 4;
        
        return {
            uvIndex: uvIndex,
            temperature: parseFloat(temperature.toFixed(1)),
            feelsLike: parseFloat((temperature + (weather.main === "Clear" ? 2 : 0)).toFixed(1)),
            humidity: Math.floor(weather.main === "Clear" ? 50 : 70 + Math.random() * 20),
            pressure: Math.floor(1013 + (Math.random() - 0.5) * 20),
            weather: weather.desc,
            weatherMain: weather.main,
            weatherIcon: weather.icon,
            windSpeed: parseFloat((5 + Math.random() * 15).toFixed(1)),
            windDeg: Math.floor(Math.random() * 360),
            clouds: weather.main === "Clear" ? 10 : weather.main === "Partly Cloudy" ? 40 : 80,
            sunrise: sunrise,
            sunset: sunset,
            cityName: name || "Demo Location",
            country: country || "XX",
            timestamp: new Date(),
            lat: lat,
            lon: lon,
            source: "demo",
            apiSource: "demo",
            isDaytime: isDaytime
        };
    }
    
    calculateSeasonFactor(lat, month) {
        // Northern hemisphere summer: Jun-Jul-Aug
        // Southern hemisphere summer: Dec-Jan-Feb
        const isNorthernSummer = month >= 5 && month <= 7;
        const isSouthernSummer = month <= 1 || month >= 11;
        
        if (lat > 0) {
            // Northern hemisphere
            return isNorthernSummer ? 1.3 : 0.7;
        } else if (lat < 0) {
            // Southern hemisphere
            return isSouthernSummer ? 1.3 : 0.7;
        } else {
            // Equator
            return 1.0;
        }
    }
    
    weightedRandomChoice(items) {
        const totalWeight = items.reduce((sum, item) => sum + (item.prob || 1), 0);
        let random = Math.random() * totalWeight;
        
        for (const item of items) {
            random -= (item.prob || 1);
            if (random <= 0) {
                return item;
            }
        }
        
        return items[0];
    }
    
    // ==================== DATA PROCESSING ====================
    async processData(data) {
        console.log("📊 Processing data:", data);
        
        const dataPoint = {
            timestamp: data.timestamp,
            uvIndex: data.uvIndex,
            temperature: data.temperature,
            humidity: data.humidity,
            weather: data.weather,
            location: data.cityName,
            lat: data.lat,
            lon: data.lon,
            source: data.apiSource
        };
        
        this.dataHistory.push(dataPoint);
        
        if (this.dataHistory.length > 50) {
            this.dataHistory = this.dataHistory.slice(-50);
        }
        
        this.currentData = data;
        this.lastUpdateTime = new Date();
        
        // Update chart
        if (!this.charts.uv) {
            this.initCharts();
        }
        
        this.updateAllUI();
        
        this.saveHistory();
        
        const sourceText = this.isDemoMode ? "Demo" : "API";
        const timeText = data.isDaytime ? "siang" : "malam";
        this.showNotification(`Data ${sourceText} berhasil diperbarui (UV: ${data.uvIndex}, ${timeText})`, "success");
    }
    
    updateAllUI() {
        if (!this.currentData) {
            console.warn("No current data to update UI");
            return;
        }
        
        console.log("🔄 Updating all UI components...");
        
        try {
            this.updateRealtimeDisplay();
            this.updateWeatherInfo();
            this.updateRecommendations();
            this.updateActivityRecommendations();
            
            // PERBAIKAN 5: Update charts dengan delay untuk memastikan
            setTimeout(() => {
                this.updateCharts();
                this.performMathematicalAnalysis();
                this.updateStats();
                this.updateDataSourceInfo();
                this.calculateSunbathDuration();
            }, 200);
            
            console.log("✅ All UI components updated");
            
        } catch (error) {
            console.error("❌ Error updating UI:", error);
        }
    }
    
    // ==================== UI UPDATE METHODS ====================
    updateRealtimeDisplay() {
        if (!this.currentData) return;
        
        const uvIndex = this.currentData.uvIndex;
        const uvLevel = this.getUVLevel(uvIndex);
        
        // Update UV value
        const uvValueElement = document.getElementById('currentUV');
        if (uvValueElement) {
            uvValueElement.textContent = uvIndex.toFixed(1);
            uvValueElement.style.color = uvLevel.color;
            
            // Tambah indikator siang/malam
            const now = new Date();
            const isDaytime = this.currentData.isDaytime || 
                (now >= this.currentData.sunrise && now <= this.currentData.sunset);
            
            if (!isDaytime) {
                uvValueElement.innerHTML += ' <span style="font-size:0.6em;color:#666">🌙</span>';
            } else {
                uvValueElement.innerHTML += ' <span style="font-size:0.6em;color:#666">☀️</span>';
            }
        }
        
        // Update UV level badge
        const levelElement = document.getElementById('uvLevel');
        if (levelElement) {
            levelElement.textContent = uvLevel.level;
            levelElement.className = 'level-badge';
            levelElement.style.backgroundColor = uvLevel.color;
            levelElement.style.color = 'white';
            levelElement.style.boxShadow = `0 4px 15px ${uvLevel.color}80`;
            levelElement.setAttribute('data-level', uvLevel.key);
        }
        
        // Update UV description
        const descElement = document.getElementById('uvDescription');
        if (descElement) {
            descElement.textContent = this.getUVDescription(uvLevel.level);
            
            // Tambah catatan untuk malam hari
            if (uvIndex === 0) {
                descElement.textContent += " (Malam hari - tidak ada UV)";
            }
        }
        
        // Update UV gauge
        const gaugeElement = document.getElementById('uvGauge');
        if (gaugeElement) {
            const gaugeWidth = Math.min(100, (uvIndex / 15) * 100);
            gaugeElement.style.width = `${gaugeWidth}%`;
            gaugeElement.style.backgroundColor = uvLevel.color;
            gaugeElement.style.boxShadow = `0 0 20px ${uvLevel.color}`;
        }
    }
    
    updateWeatherInfo() {
    if (!this.currentData) {
        console.error("❌ ERROR: currentData is undefined!");
        return;
    }
    
    const data = this.currentData;
    
    // Debug log dulu
    console.log("🔍 DEBUG updateWeatherInfo - Data structure:", {
        hasData: !!data,
        sunrise: data.sunrise,
        sunset: data.sunset,
        sunriseType: typeof data.sunrise,
        isDateSunrise: data.sunrise instanceof Date,
        sunriseToString: data.sunrise ? data.sunrise.toString() : 'null',
        sunsetToString: data.sunset ? data.sunset.toString() : 'null',
        timezoneOffset: data.timezoneOffset,
        isDaytime: data.isDaytime
    });

    const updateElement = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        } else {
            console.warn(`⚠️ Element with id "${id}" not found`);
        }
    };
    
    // Tampilkan kota dan negara
    let locationText = data.cityName || 'Unknown City';
    if (data.country && data.country !== "XX") {
        locationText += `, ${data.country}`;
    }
    updateElement('locationName', locationText);
    
    const coordinatesElement = document.getElementById('coordinatesText');
    if (coordinatesElement) {
        const lat = data.lat !== undefined ? data.lat.toFixed(4) : '0.0000';
        const lon = data.lon !== undefined ? data.lon.toFixed(4) : '0.0000';
        coordinatesElement.textContent = `${lat}, ${lon}`;
    }
    
    updateElement('temperature', data.temperature !== undefined ? `${data.temperature.toFixed(1)}°C` : '- °C');
    updateElement('feelsLikeText', data.feelsLike !== undefined ? `${data.feelsLike.toFixed(1)}°C` : '- °C');
    updateElement('weatherCondition', data.weather || 'Tidak diketahui');
    
    // Humidity
    updateElement('humidity', `${data.humidity !== undefined ? data.humidity : '-'}%`);
    
    const pressureElement = document.getElementById('pressureText');
    const windElement = document.getElementById('windText');
    const cloudsElement = document.getElementById('cloudsText');
    
    // Pressure
    if (pressureElement) {
        pressureElement.textContent = `${data.pressure !== undefined ? data.pressure : '-'} hPa`;
    }
    
    // Wind
    if (windElement) {
        windElement.textContent = data.windSpeed !== undefined ? `${data.windSpeed.toFixed(1)} m/s` : '- m/s';
    }
    
    // Clouds
    if (cloudsElement) {
        cloudsElement.textContent = `${data.clouds !== undefined ? data.clouds : '-'}%`;
    }
    
    // ========== PERBAIKAN UTAMA: SUNRISE & SUNSET DISPLAY ==========
    if (data.sunrise && data.sunset) {
        console.log("🌅 Processing sunrise/sunset data...");
        
        try {
            // PERBAIKAN 1: Data sudah lokal, JANGAN tambah 7 jam lagi!
            // Pastikan kita punya Date object
            let sunriseDate, sunsetDate;
            
            if (data.sunrise instanceof Date) {
                sunriseDate = data.sunrise;
                sunsetDate = data.sunset;
            } else if (typeof data.sunrise === 'number') {
                // Jika number (Unix timestamp), konversi ke Date
                sunriseDate = new Date(data.sunrise * 1000);
                sunsetDate = new Date(data.sunset * 1000);
            } else if (typeof data.sunrise === 'string') {
                // Jika string, parse ke Date
                sunriseDate = new Date(data.sunrise);
                sunsetDate = new Date(data.sunset);
            } else {
                // Fallback
                sunriseDate = new Date();
                sunsetDate = new Date();
                sunriseDate.setHours(6, 0, 0);
                sunsetDate.setHours(18, 0, 0);
            }
            
            // PERBAIKAN 2: Tampilkan waktu lokal TANPA timeZone parameter
            // Karena data sudah lokal untuk kota tersebut
            const sunriseTime = sunriseDate.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit'
            });
            
            const sunsetTime = sunsetDate.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit'
            });
            
            console.log(`🕐 Display times for ${data.cityName}:`);
            console.log(`  Sunrise Date: ${sunriseDate.toString()}`);
            console.log(`  Sunset Date: ${sunsetDate.toString()}`);
            console.log(`  Sunrise Local: ${sunriseTime}`);
            console.log(`  Sunset Local: ${sunsetTime}`);
            console.log(`  Sunrise ISO: ${sunriseDate.toISOString()}`);
            console.log(`  Sunset ISO: ${sunsetDate.toISOString()}`);
            
            // Update UI
            updateElement('sunriseText', sunriseTime);
            updateElement('sunsetText', sunsetTime);
            
            // PERBAIKAN 3: Update status waktu (siang/malam)
            const now = new Date();
            const timeStatus = document.getElementById('timeStatus');
            
            // Gunakan isDaytime dari data jika ada, jika tidak hitung
            let isDaytime;
            if (data.isDaytime !== undefined) {
                isDaytime = data.isDaytime;
                console.log(`🔆 Using API isDaytime: ${isDaytime}`);
            } else {
                // Hitung manual: bandingkan waktu sekarang dengan sunrise/sunset
                const currentHour = now.getHours();
                const currentMinutes = now.getHours() * 60 + now.getMinutes();
                const sunriseHour = sunriseDate.getHours();
                const sunriseMinutes = sunriseDate.getHours() * 60 + sunriseDate.getMinutes();
                const sunsetHour = sunsetDate.getHours();
                const sunsetMinutes = sunsetDate.getHours() * 60 + sunsetDate.getMinutes();
                
                isDaytime = currentMinutes >= sunriseMinutes && currentMinutes <= sunsetMinutes;
                console.log(`🔆 Calculated isDaytime: ${isDaytime} (Now: ${currentHour}:${now.getMinutes()}, Sunrise: ${sunriseHour}:${sunriseDate.getMinutes()}, Sunset: ${sunsetHour}:${sunsetDate.getMinutes()})`);
            }
            
            if (timeStatus) {
                if (isDaytime) {
                    timeStatus.innerHTML = '☀️ Siang Hari';
                    timeStatus.style.color = '#FF8C00';
                    timeStatus.title = `UV aktif - perlindungan diperlukan`;
                } else {
                    timeStatus.innerHTML = '🌙 Malam Hari';
                    timeStatus.style.color = '#4169E1';
                    timeStatus.title = `UV tidak aktif - tidak perlu sunscreen`;
                }
            }
            
            // PERBAIKAN 4: Update timezone info berdasarkan lokasi
            const timezoneInfo = document.getElementById('timezoneInfo');
            if (timezoneInfo) {
                if (data.country === "ID") {
                    // Untuk Indonesia, tentukan zona waktu berdasarkan longitude
                    if (data.lon > 114) {
                        timezoneInfo.textContent = "WITA (UTC+8)";
                        timezoneInfo.title = "Waktu Indonesia Tengah";
                    } else if (data.lon > 129) {
                        timezoneInfo.textContent = "WIT (UTC+9)";
                        timezoneInfo.title = "Waktu Indonesia Timur";
                    } else {
                        timezoneInfo.textContent = "WIB (UTC+7)";
                        timezoneInfo.title = "Waktu Indonesia Barat";
                    }
                } else if (data.timezoneOffset) {
                    // Untuk negara lain, hitung dari offset
                    const offsetHours = data.timezoneOffset / 3600;
                    const sign = offsetHours >= 0 ? '+' : '';
                    timezoneInfo.textContent = `UTC${sign}${offsetHours}`;
                    timezoneInfo.title = `Local timezone (${offsetHours} hours from UTC)`;
                } else {
                    timezoneInfo.textContent = "Local Time";
                    timezoneInfo.title = "Waktu lokal kota tersebut";
                }
            }
            
            // PERBAIKAN 5: Update day/night indicator berdasarkan waktu lokal
            const dayNightElement = document.getElementById('dayNightIndicator');
            if (dayNightElement) {
                const hour = now.getHours();
                if (hour >= 5 && hour < 10) {
                    dayNightElement.innerHTML = '🌅 Pagi';
                    dayNightElement.style.color = '#FFA500';
                    dayNightElement.title = `Pagi hari (${hour}:${now.getMinutes().toString().padStart(2, '0')})`;
                } else if (hour >= 10 && hour < 15) {
                    dayNightElement.innerHTML = '☀️ Siang';
                    dayNightElement.style.color = '#FF4500';
                    dayNightElement.title = `Siang hari - UV tinggi (${hour}:${now.getMinutes().toString().padStart(2, '0')})`;
                } else if (hour >= 15 && hour < 18) {
                    dayNightElement.innerHTML = '🌇 Sore';
                    dayNightElement.style.color = '#FF8C00';
                    dayNightElement.title = `Sore hari (${hour}:${now.getMinutes().toString().padStart(2, '0')})`;
                } else if (hour >= 18 && hour < 24) {
                    dayNightElement.innerHTML = '🌙 Malam';
                    dayNightElement.style.color = '#4169E1';
                    dayNightElement.title = `Malam hari (${hour}:${now.getMinutes().toString().padStart(2, '0')})`;
                } else {
                    dayNightElement.innerHTML = '🌌 Dini Hari';
                    dayNightElement.style.color = '#6A5ACD';
                    dayNightElement.title = `Dini hari (${hour}:${now.getMinutes().toString().padStart(2, '0')})`;
                }
            }
                
        } catch (error) {
            console.error("❌ Error processing sunrise/sunset:", error);
            console.error("Sunrise raw value:", data.sunrise);
            console.error("Sunset raw value:", data.sunset);
            
            // Fallback values yang realistis untuk Indonesia
            updateElement('sunriseText', '06:00');
            updateElement('sunsetText', '18:00');
            
            const timeStatus = document.getElementById('timeStatus');
            if (timeStatus) {
                timeStatus.textContent = '⏱️ Waktu Tidak Diketahui';
                timeStatus.style.color = '#888';
            }
        }
    } else {
        console.warn("⚠️ Sunrise/sunset data missing!");
        updateElement('sunriseText', '--:--');
        updateElement('sunsetText', '--:--');
    }
    
    // Update last update time
    if (this.lastUpdateTime) {
        const lastUpdateElement = document.getElementById('lastUpdate');
        if (lastUpdateElement) {
            lastUpdateElement.textContent = this.lastUpdateTime.toLocaleTimeString('id-ID');
        }
    }
    
    // Update data source
    const dataSourceElement = document.getElementById('dataSource');
    if (dataSourceElement) {
        if (data.apiSource === 'demo') {
            dataSourceElement.textContent = 'Data Demo';
            dataSourceElement.style.color = '#ff6600';
        } else {
            dataSourceElement.textContent = data.apiSource || 'API';
            dataSourceElement.style.color = '#0066cc';
        }
    }
    
    console.log("✅ Weather info updated successfully");
}
    
    updateRecommendations() {
        if (!this.currentData) return;
        
        const uvIndex = this.currentData.uvIndex;
        const uvLevel = this.getUVLevel(uvIndex);
        const now = new Date();
        const isDaytime = this.currentData.isDaytime || 
            (now >= this.currentData.sunrise && now <= this.currentData.sunset);
        
        const recommendations = {
            low: {
                protection: [
                    "SPF 15+ untuk aktivitas >1 jam",
                    "Topi untuk perlindungan tambahan",
                    "Kacamata hitam jika diperlukan"
                ],
                activities: [
                    "Aman untuk semua aktivitas outdoor",
                    "Ideal untuk olahraga pagi/sore",
                    "Berjemur 15-30 menit untuk vitamin D"
                ],
                sunbath: {
                    safeDuration: "30-60 menit",
                    optimalDuration: "15-30 menit",
                    risk: "Rendah",
                    bestTime: "Pagi atau Sore"
                }
            },
            moderate: {
                protection: [
                    "SPF 30+ wajib digunakan",
                    "Topi bertepi lebar",
                    "Kacamata hitam UV400",
                    "Cari tempat teduh saat siang"
                ],
                activities: [
                    "Batasi paparan 10:00-14:00",
                    "Olahraga di pagi/sore hari",
                    "Gunakan pakaian pelindung"
                ],
                sunbath: {
                    safeDuration: "15-30 menit",
                    optimalDuration: "10-15 menit",
                    risk: "Sedang",
                    bestTime: "Sebelum 10:00 atau setelah 15:00"
                }
            },
            high: {
                protection: [
                    "SPF 50+ wajib digunakan",
                    "Pakaian lengan panjang",
                    "Topi lebar dan kacamata",
                    "Hindari matahari langsung"
                ],
                activities: [
                    "Hindari outdoor 10:00-16:00",
                    "Aktivitas indoor disarankan",
                    "Jika harus keluar, batasi waktu"
                ],
                sunbath: {
                    safeDuration: "10-15 menit",
                    optimalDuration: "5-10 menit",
                    risk: "Tinggi",
                    bestTime: "Hanya pagi sebelum 9:00"
                }
            },
            veryHigh: {
                protection: [
                    "SPF 50+ dan reapplay setiap 2 jam",
                    "Pakaian UPF 50+",
                    "Payung atau tempat teduh",
                    "Tetap di dalam ruangan jika mungkin"
                ],
                activities: [
                    "Hindari semua aktivitas outdoor",
                    "Jika harus keluar, sangat singkat",
                    "Prioritaskan aktivitas indoor"
                ],
                sunbath: {
                    safeDuration: "5-10 menit",
                    optimalDuration: "Tidak disarankan",
                    risk: "Sangat Tinggi",
                    bestTime: "Hindari berjemur"
                }
            },
            extreme: {
                protection: [
                    "Tetap di dalam ruangan",
                    "Jika keluar, semua perlindungan maksimal",
                    "Tutup semua kulit",
                    "Gunakan sunscreen waterproof"
                ],
                activities: [
                    "Hindari keluar rumah",
                    "Aktivitas indoor saja",
                    "Tunda perjalanan jika mungkin"
                ],
                sunbath: {
                    safeDuration: "Tidak aman",
                    optimalDuration: "Tidak disarankan",
                    risk: "Ekstrem",
                    bestTime: "Tidak ada waktu aman"
                }
            }
        };
        
        // Jika malam hari dan UV = 0, beri rekomendasi khusus
        if (!isDaytime || uvIndex === 0) {
            const nightRecommendations = {
                protection: [
                    "Tidak perlu sunscreen",
                    "Tidak ada risiko UV",
                    "Nikmati waktu malam dengan aman"
                ],
                activities: [
                    "Aktivitas outdoor aman tanpa perlindungan UV",
                    "Berjalan-jalan malam hari",
                    "Aktivitas outdoor tanpa batasan UV"
                ],
                sunbath: {
                    safeDuration: "Tidak diperlukan",
                    optimalDuration: "Tidak ada UV",
                    risk: "Tidak ada",
                    bestTime: "Kapan saja di malam hari"
                }
            };
            
            const container = document.getElementById('recommendationsContainer');
            if (container) {
                container.innerHTML = `
                    <div class="recommendation-card" data-level="night">
                        <div class="recommendation-header">
                            <div class="recommendation-icon">
                                <i class="fas fa-moon"></i>
                            </div>
                            <div class="recommendation-title">🌙 Malam Hari</div>
                        </div>
                        <ul class="recommendation-list">
                            <li><i class="fas fa-check-circle"></i> Tidak ada radiasi UV</li>
                            <li><i class="fas fa-check-circle"></i> Tidak perlu sunscreen</li>
                            <li><i class="fas fa-check-circle"></i> Aman untuk aktivitas outdoor</li>
                            <li><i class="fas fa-check-circle"></i> UV Index: 0 (Aman)</li>
                        </ul>
                    </div>
                `;
            }
            return;
        }
        
        const rec = recommendations[uvLevel.key] || recommendations.moderate;
        
        const container = document.getElementById('recommendationsContainer');
        if (!container) return;
        
        const recommendationTypes = [
            {
                title: "🛡️ Perlindungan",
                icon: "fa-shield-alt",
                items: rec.protection || []
            },
            {
                title: "🏃 Aktivitas",
                icon: "fa-running",
                items: rec.activities || []
            },
            {
                title: "⏱️ Durasi Berjemur",
                icon: "fa-sun",
                items: [
                    `Aman: ${rec.sunbath?.safeDuration || '-'}`,
                    `Optimal: ${rec.sunbath?.optimalDuration || '-'}`,
                    `Risiko: ${rec.sunbath?.risk || '-'}`
                ]
            },
            {
                title: "🕐 Waktu Terbaik",
                icon: "fa-clock",
                items: [
                    `Waktu terbaik: ${rec.sunbath?.bestTime || '-'}`,
                    "Hindari: 10:00 - 14:00",
                    "Gunakan sunscreen SPF 30+"
                ]
            }
        ];
        
        let html = '';
        
        recommendationTypes.forEach(type => {
            if (type.items && type.items.length > 0) {
                html += `
                    <div class="recommendation-card" data-level="${uvLevel.key}">
                        <div class="recommendation-header">
                            <div class="recommendation-icon">
                                <i class="fas ${type.icon}"></i>
                            </div>
                            <div class="recommendation-title">${type.title}</div>
                        </div>
                        <ul class="recommendation-list">
                            ${type.items.map(item => `
                                <li><i class="fas fa-check-circle"></i> ${item}</li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }
        });
        
        container.innerHTML = html || '<div class="loading-recommendations">Tidak ada rekomendasi</div>';
    }
    
    updateActivityRecommendations() {
        if (!this.currentData) return;
        
        const uvIndex = this.currentData.uvIndex;
        const now = new Date();
        const currentHour = now.getHours();
        const isDaytime = this.currentData.isDaytime || 
            (now >= this.currentData.sunrise && now <= this.currentData.sunset);
        
        let recommendation = "";
        
        if (!isDaytime || uvIndex === 0) {
            recommendation = "🌙 Malam hari: Tidak ada radiasi UV. Aman untuk semua aktivitas outdoor tanpa perlindungan UV.";
        } else if (uvIndex <= 2) {
            recommendation = "UV rendah. Aman untuk semua aktivitas outdoor sepanjang hari.";
        } else if (uvIndex <= 5) {
            recommendation = "UV sedang. Batasi paparan 10:00-14:00. Gunakan SPF 30+.";
        } else if (uvIndex <= 7) {
            recommendation = "UV tinggi. Hindari outdoor 10:00-16:00. SPF 50+ wajib.";
        } else if (uvIndex <= 10) {
            recommendation = "UV sangat tinggi. Hanya aktivitas outdoor singkat di pagi/sore.";
        } else {
            recommendation = "UV ekstrem. Hindari semua aktivitas outdoor. Tetap di dalam ruangan.";
        }
        
        if (isDaytime) {
            if (currentHour >= 10 && currentHour <= 14) {
                recommendation += " Saat ini adalah waktu puncak UV - ekstra hati-hati!";
            } else if (currentHour >= 6 && currentHour <= 9) {
                recommendation += " Saat ini waktu baik untuk aktivitas pagi.";
            } else if (currentHour >= 16 && currentHour <= 18) {
                recommendation += " Saat ini waktu terbaik untuk aktivitas sore.";
            }
        }
        
        const recElement = document.getElementById('currentActivityRec');
        if (recElement) {
            recElement.textContent = recommendation;
        }
    }
    
    // ==================== MATHEMATICAL ANALYSIS ====================
    performMathematicalAnalysis() {
        if (!this.dataHistory || this.dataHistory.length < 2) {
            console.log("Not enough data for mathematical analysis");
            this.updateMathematicalDisplay(null);
            return;
        }
        
        try {
            const recentData = this.dataHistory.slice(-8);
            const n = recentData.length;
            
            if (n < 2) {
                this.updateMathematicalDisplay(null);
                return;
            }
            
            const times = recentData.map(d => {
                const date = new Date(d.timestamp);
                return date.getTime() / (1000 * 60 * 60);
            });
            
            const uvValues = recentData.map(d => d.uvIndex);
            
            const timeMin = Math.min(...times);
            const timesNormalized = times.map(t => t - timeMin);
            
            let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
            
            for (let i = 0; i < n; i++) {
                const x = timesNormalized[i];
                const y = uvValues[i];
                sumX += x;
                sumY += y;
                sumXY += x * y;
                sumX2 += x * x;
            }
            
            const denominator = n * sumX2 - sumX * sumX;
            
            if (Math.abs(denominator) < 1e-10) {
                this.updateMathematicalDisplay(null);
                return;
            }
            
            const slope = (n * sumXY - sumX * sumY) / denominator;
            const intercept = (sumY - slope * sumX) / n;
            
            this.regressionModel = { a: 0, b: slope, c: intercept };
            this.derivativeModel = { a2: 0, b: slope };
            
            console.log("Linear regression model:", { slope, intercept });
            
            const currentRate = slope;
            const currentUV = uvValues[uvValues.length - 1];
            let peakUV = Math.max(...uvValues);
            let peakTimeIndex = uvValues.indexOf(peakUV);
            let peakTime = times[peakTimeIndex];
            
            const peakDate = new Date(peakTime * 1000 * 60 * 60);
            const peakTimeStr = peakDate.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            let safeTime = "16:00";
            
            if (slope < 0 && currentUV > 3) {
                const hoursToSafe = (currentUV - 3) / Math.abs(slope);
                const safeDate = new Date(Date.now() + hoursToSafe * 60 * 60 * 1000);
                safeTime = safeDate.toLocaleTimeString('id-ID', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
            } else if (slope > 0 && currentUV < 3) {
                const hoursToUnsafe = (3 - currentUV) / slope;
                const unsafeDate = new Date(Date.now() + hoursToUnsafe * 60 * 60 * 1000);
                safeTime = `Hingga ${unsafeDate.toLocaleTimeString('id-ID', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                })}`;
            }
            
            this.updateMathematicalDisplay({ a: 0, b: slope, c: intercept }, currentRate, peakTimeStr, peakUV, safeTime);
            
        } catch (error) {
            console.error("Error in mathematical analysis:", error);
            this.updateMathematicalDisplay(null);
        }
    }
    
    updateMathematicalDisplay(coefficients, currentRate = 0, peakTime = "--:--", peakUV = 0, safeTime = "16:00") {
        const updateCoeff = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value !== null ? value.toFixed(4) : "0.0000";
            }
        };
        
        if (coefficients) {
            updateCoeff('coeffA', coefficients.a);
            updateCoeff('coeffB', coefficients.b);
            updateCoeff('coeffC', coefficients.c);
            
            const derivAElement = document.getElementById('derivA');
            const derivBElement = document.getElementById('derivB');
            
            if (derivAElement) derivAElement.textContent = (2 * coefficients.a).toFixed(4);
            if (derivBElement) derivBElement.textContent = coefficients.b.toFixed(4);
        } else {
            updateCoeff('coeffA', 0);
            updateCoeff('coeffB', 0);
            updateCoeff('coeffC', 0);
            
            const derivAElement = document.getElementById('derivA');
            const derivBElement = document.getElementById('derivB');
            if (derivAElement) derivAElement.textContent = "0.0000";
            if (derivBElement) derivBElement.textContent = "0.0000";
        }
        
        const rateElement = document.getElementById('currentRate');
        if (rateElement) {
            rateElement.textContent = Math.abs(currentRate).toFixed(2);
            this.updateTrendIndicator(currentRate);
        }
        
        const peakTimeElement = document.getElementById('peakTime');
        const peakUVElement = document.getElementById('peakUV');
        const safeTimeElement = document.getElementById('safeTime');
        
        if (peakTimeElement) peakTimeElement.textContent = peakTime;
        if (peakUVElement) peakUVElement.textContent = peakUV.toFixed(1);
        if (safeTimeElement) safeTimeElement.textContent = safeTime;
    }
    
    updateTrendIndicator(currentRate) {
        const trendElement = document.getElementById('trendIndicator');
        const interpretationElement = document.getElementById('rateInterpretation');
        
        if (!trendElement || !interpretationElement) return;
        
        if (currentRate > 0.1) {
            trendElement.innerHTML = '<i class="fas fa-arrow-up"></i> <span>Naik</span>';
            trendElement.setAttribute('data-trend', 'up');
            trendElement.style.background = 'rgba(255, 51, 0, 0.1)';
            trendElement.style.color = '#ff3300';
            interpretationElement.textContent = 
                "UV Index sedang meningkat. Waspada terhadap peningkatan risiko.";
        } else if (currentRate < -0.1) {
            trendElement.innerHTML = '<i class="fas fa-arrow-down"></i> <span>Turun</span>';
            trendElement.setAttribute('data-trend', 'down');
            trendElement.style.background = 'rgba(0, 204, 136, 0.1)';
            trendElement.style.color = '#00cc88';
            interpretationElement.textContent = 
                "UV Index sedang menurun. Kondisi akan semakin aman.";
        } else {
            trendElement.innerHTML = '<i class="fas fa-arrow-right"></i> <span>Stabil</span>';
            trendElement.setAttribute('data-trend', 'stable');
            trendElement.style.background = 'rgba(255, 204, 0, 0.1)';
            trendElement.style.color = '#ffcc00';
            interpretationElement.textContent = 
                "UV Index stabil. Tidak ada perubahan signifikan.";
        }
    }
    
    calculateSunbathDuration() {
    if (!this.currentData) return;
    
    const uvIndex = this.currentData.uvIndex;
    const skinTypeSelect = document.getElementById('skinTypeSelect');
    const spfSelect = document.getElementById('spfSelect');
    const calcUV = document.getElementById('calcUV');
    
    if (!skinTypeSelect || !spfSelect) return;
    
    const skinType = skinTypeSelect.value;
    const spf = parseInt(spfSelect.value) || 1;
    const useCustomUV = calcUV ? parseFloat(calcUV.value) : uvIndex;
    
    // PERBAIKAN: Handle UV = 0 (malam hari)
    if (!skinType || useCustomUV <= 0) {
        this.updateSunbathResults('N/A', 'N/A', 'Tidak ada', 'Tidak ada UV');
        
        // Update juga elemen lain
        const sunbathDurationElement = document.getElementById('sunbathDuration');
        if (sunbathDurationElement) {
            sunbathDurationElement.textContent = 'Tidak ada UV';
            sunbathDurationElement.style.color = '#666';
        }
        return;
    }
        
        const medTimes = {
            'I': 10,
            'II': 20,
            'III': 30,
            'IV': 45,
            'V': 60,
            'VI': 90
        };
        
        const med = medTimes[skinType] || 30;
        let safeDuration = (med * spf) / useCustomUV;
        
        safeDuration = Math.min(safeDuration, 120);
        safeDuration = Math.max(safeDuration, 0);
        
        const vitaminDTime = Math.min(safeDuration * 0.25, 30);
        
        let burnRisk = "Rendah";
        let riskColor = "#00cc00";
        
        if (safeDuration < 15) {
            burnRisk = "Sangat Tinggi";
            riskColor = "#ff3300";
        } else if (safeDuration < 30) {
            burnRisk = "Tinggi";
            riskColor = "#ff6600";
        } else if (safeDuration < 60) {
            burnRisk = "Sedang";
            riskColor = "#ffcc00";
        }
        
        const updateElement = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        };
        
        updateElement('safeSunbathTime', Math.round(safeDuration));
        updateElement('vitaminDTime', Math.round(vitaminDTime));
        updateElement('burnRisk', burnRisk);
        updateElement('sunbathDuration', `${Math.round(safeDuration)} menit`);
        
        const burnRiskElement = document.getElementById('burnRisk');
        if (burnRiskElement) {
            burnRiskElement.style.color = riskColor;
            burnRiskElement.style.fontWeight = 'bold';
        }
    }
    
    // ==================== CHART METHODS - PERBAIKAN UTAMA ====================
    updateCharts() {
    console.log("📈 Updating charts...");
    
    // PERBAIKAN: Pastikan chart container ada
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) {
        console.error("Chart container not found!");
        return;
    }
    
    // PERBAIKAN: Inisialisasi chart jika belum ada
    if (!this.charts.uv) {
        const uvCtx = document.getElementById('uvChart');
        if (!uvCtx) {
            console.error("Chart canvas not found!");
            
            // Buat canvas jika tidak ada
            const newCanvas = document.createElement('canvas');
            newCanvas.id = 'uvChart';
            newCanvas.style.width = '100%';
            newCanvas.style.height = '400px';
            chartContainer.appendChild(newCanvas);
            
            // Coba init lagi
            setTimeout(() => {
                this.initCharts();
                if (this.charts.uv) {
                    this.updateCharts();
                }
            }, 500);
            return;
        }
        
        this.initCharts();
        if (!this.charts.uv) {
            console.error("Failed to initialize chart!");
            return;
        }
    }
    
    if (!this.dataHistory || this.dataHistory.length < 1) {
        console.log("No data to update chart");
        // Set placeholder data
        this.charts.uv.data.labels = ['00:00', '06:00', '12:00', '18:00'];
        this.charts.uv.data.datasets[0].data = [0, 5, 10, 5];
        this.charts.uv.update();
        return;
    }
    
    try {
        // Gunakan data terakhir (maks 12 data)
        const recentData = this.dataHistory.slice(-12);
        const labels = recentData.map((point, index) => {
            try {
                const time = new Date(point.timestamp);
                return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
            } catch (e) {
                return `${index * 2}:00`;
            }
        });
        
        const data = recentData.map(point => point.uvIndex);
        
        console.log(`📊 Chart data: ${data.length} points, latest UV: ${data[data.length-1]}`);
        
        // PERBAIKAN: Update chart dengan error handling
        this.charts.uv.data.labels = labels;
        this.charts.uv.data.datasets[0].data = data;
        
        // Update y-axis max
        if (data.length > 0) {
            const maxUV = Math.max(...data.filter(d => !isNaN(d)));
            if (maxUV > 0) {
                this.charts.uv.options.scales.y.suggestedMax = Math.max(15, maxUV * 1.3);
            }
        }
        
        // Update chart dengan animasi
        this.charts.uv.update('active');
        console.log("✅ Chart updated successfully");
        
        // Update history table juga
        this.updateHistoryTable();
        
    } catch (error) {
        console.error("❌ Error updating charts:", error);
        
        // Fallback: Tampilkan data sederhana
        try {
            const simpleData = [0, 3, 6, 9, 7, 4, 2];
            const simpleLabels = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
            
            if (this.charts.uv) {
                this.charts.uv.data.labels = simpleLabels;
                this.charts.uv.data.datasets[0].data = simpleData;
                this.charts.uv.update();
            }
        } catch (fallbackError) {
            console.error("Even fallback failed:", fallbackError);
        }
    }
}
    
    updateChartRange(hours) {
        if (!this.charts.uv || !this.dataHistory.length) return;
        
        try {
            const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
            const filteredData = this.dataHistory.filter(point => 
                new Date(point.timestamp) >= cutoffTime
            );
            
            const labels = filteredData.map((point) => {
                const time = new Date(point.timestamp);
                return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
            });
            
            const data = filteredData.map(point => point.uvIndex);
            
            this.charts.uv.data.labels = labels;
            this.charts.uv.data.datasets[0].data = data;
            this.charts.uv.update();
            
        } catch (error) {
            console.error("Error updating chart range:", error);
        }
    }
    
    updateHistoryTable() {
        const tbody = document.getElementById('historyBody');
        if (!tbody) {
            console.warn("History table body not found");
            return;
        }
        
        const recentData = this.dataHistory.slice(-10).reverse();
        
        if (recentData.length === 0) {
            tbody.innerHTML = `
                <tr class="no-data">
                    <td colspan="7">
                        <i class="fas fa-database"></i>
                        <p>Tidak ada data riwayat. Ambil data UV terlebih dahulu.</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        let html = '';
        
        recentData.forEach((data, index) => {
            const time = new Date(data.timestamp).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            const uvLevel = this.getUVLevel(data.uvIndex);
            const levelColor = uvLevel.color;
            
            let rate = '-';
            if (index < recentData.length - 1) {
                const nextData = recentData[index + 1];
                const timeDiff = (new Date(data.timestamp) - new Date(nextData.timestamp)) / (1000 * 60 * 60);
                const uvDiff = data.uvIndex - nextData.uvIndex;
                
                if (timeDiff > 0) {
                    rate = `${(uvDiff / timeDiff).toFixed(2)}/jam`;
                }
            }
            
            html += `
                <tr>
                    <td>${time}</td>
                    <td><strong>${data.uvIndex.toFixed(1)}</strong></td>
                    <td>${rate}</td>
                    <td>${data.temperature ? data.temperature.toFixed(1) + '°C' : '-'}</td>
                    <td>${data.humidity || '-'}%</td>
                    <td>
                        <span class="badge" style="background: ${levelColor}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem;">
                            ${uvLevel.level}
                        </span>
                    </td>
                    <td>
                        <button class="btn-icon small" onclick="app.useHistoricalData(${this.dataHistory.length - 1 - index})" 
                                title="Gunakan data ini">
                            <i class="fas fa-redo"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        tbody.innerHTML = html;
    }
    
    updateStats() {
        const updateCount = (id, value) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        };
        
        updateCount('dataCount', this.dataHistory.length);
        
        const footerDataCount = document.getElementById('footerDataCount');
        if (footerDataCount) footerDataCount.textContent = this.dataHistory.length;
        
        const today = new Date().toDateString();
        const todayUpdates = this.dataHistory.filter(item => 
            new Date(item.timestamp).toDateString() === today
        ).length;
        
        const footerUpdates = document.getElementById('footerUpdates');
        if (footerUpdates) footerUpdates.textContent = todayUpdates;
        
        const uniqueLocations = new Set(this.dataHistory.map(item => item.location));
        const footerLocations = document.getElementById('footerLocations');
        if (footerLocations) footerLocations.textContent = uniqueLocations.size;
        
        const footerRecommendations = document.getElementById('footerRecommendations');
        if (footerRecommendations) footerRecommendations.textContent = this.dataHistory.length * 4;
    }
    
    updateDataSourceInfo() {
        if (!this.currentData) return;
        
        const sourceElement = document.getElementById('dataSource');
        if (!sourceElement) return;
        
        const source = this.currentData.apiSource;
        
        if (source === 'demo') {
            sourceElement.textContent = 'Data Demo';
            sourceElement.style.color = '#ff6600';
        } else {
            sourceElement.textContent = 'OpenWeatherMap API';
            sourceElement.style.color = '#0066cc';
        }
    }
    
    updateLocationStatus(message) {
        const statusElement = document.getElementById('locationStatus');
        if (statusElement) {
            statusElement.innerHTML = `<i class="fas fa-info-circle"></i> <span>${message}</span>`;
        }
    }
    
    updateUIState() {
        const startBtn = document.getElementById('startMonitoring');
        const stopBtn = document.getElementById('stopMonitoring');
        
        if (startBtn) {
            startBtn.disabled = !!this.monitoringInterval;
            startBtn.style.opacity = this.monitoringInterval ? '0.5' : '1';
        }
        if (stopBtn) {
            stopBtn.disabled = !this.monitoringInterval;
            stopBtn.style.opacity = !this.monitoringInterval ? '0.5' : '1';
        }
    }
    
    startTimeUpdates() {
        setInterval(() => {
            const now = new Date();
            const timeElement = document.getElementById('currentTime');
            if (timeElement) {
                timeElement.textContent = now.toLocaleTimeString('id-ID');
            }
            
            const dataTimestamp = document.getElementById('dataTimestamp');
            if (dataTimestamp) {
                dataTimestamp.textContent = now.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
        }, 1000);
    }
    
    // ==================== UTILITY METHODS ====================
    getUVLevel(uvIndex) {
        for (const [key, threshold] of Object.entries(this.UV_THRESHOLDS)) {
            if (uvIndex >= threshold.min && uvIndex <= threshold.max) {
                return {
                    key: key,
                    level: threshold.level,
                    color: threshold.color,
                    min: threshold.min,
                    max: threshold.max
                };
            }
        }
        return { 
            key: 'extreme', 
            level: 'Ekstrem', 
            color: '#cc00cc', 
            min: 11, 
            max: 20 
        };
    }
    
    getUVDescription(level) {
        const descriptions = {
            'Rendah': 'Bahaya rendah. Dapat berada di luar dengan aman.',
            'Sedang': 'Bahaya sedang. Gunakan perlindungan dasar.',
            'Tinggi': 'Bahaya tinggi. Perlindungan ekstra diperlukan.',
            'Sangat Tinggi': 'Bahaya sangat tinggi. Hindari matahari tengah hari.',
            'Ekstrem': 'Bahaya ekstrem. Hindari semua paparan matahari.'
        };
        return descriptions[level] || 'Tidak diketahui';
    }
    
    toggleButtons(enable) {
        const buttonIds = [
            'fetchData', 
            'startMonitoring', 
            'detectLocation', 
            'searchCity',
            'useCoordsBtn',
            'calculateSunbath',
            'refreshData'
        ];
        
        buttonIds.forEach(id => {
            const button = document.getElementById(id);
            if (button) {
                button.disabled = !enable;
                button.style.opacity = enable ? '1' : '0.5';
                button.style.cursor = enable ? 'pointer' : 'not-allowed';
            }
        });
        
        const fetchBtn = document.getElementById('fetchData');
        if (fetchBtn) {
            if (!enable) {
                fetchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
            } else {
                fetchBtn.innerHTML = '<i class="fas fa-cloud-download-alt"></i> Ambil Data Sekarang';
            }
        }
    }
    
    // ==================== MONITORING METHODS ====================
    startMonitoring() {
        if (this.monitoringInterval) {
            this.stopMonitoring();
        }
        
        if (!this.currentLocation) {
            this.showNotification("Pilih lokasi terlebih dahulu", "warning");
            return;
        }
        
        this.monitoringInterval = setInterval(() => {
            this.fetchData();
        }, 5 * 60 * 1000);
        
        this.updateUIState();
        
        this.showNotification("Monitoring dimulai. Data akan diperbarui setiap 5 menit.", "success");
        console.log("🔴 Monitoring started");
    }
    
    stopMonitoring() {
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = null;
        }
        
        this.updateUIState();
        
        this.showNotification("Monitoring dihentikan.", "info");
        console.log("🟢 Monitoring stopped");
    }
    
    // ==================== DATA MANAGEMENT ====================
    saveHistory() {
        try {
            const historyToSave = this.dataHistory.map(item => ({
                t: item.timestamp.getTime(),
                uv: item.uvIndex,
                temp: item.temperature,
                hum: item.humidity,
                w: item.weather,
                loc: item.location,
                lat: item.lat,
                lon: item.lon,
                src: item.source
            }));
            
            localStorage.setItem('uvguard_pro_history', JSON.stringify(historyToSave));
            
            if (this.currentLocation) {
                localStorage.setItem('uvguard_pro_location', JSON.stringify(this.currentLocation));
            }
            
            localStorage.setItem('uvguard_pro_last_update', new Date().toISOString());
            
            console.log("💾 History saved to localStorage, items:", this.dataHistory.length);
            
        } catch (error) {
            console.error("❌ Error saving history:", error);
        }
    }
    
    loadHistory() {
        try {
            const savedHistory = localStorage.getItem('uvguard_pro_history');
            if (savedHistory) {
                const parsed = JSON.parse(savedHistory);
                this.dataHistory = parsed.map(item => ({
                    timestamp: new Date(item.t),
                    uvIndex: item.uv,
                    temperature: item.temp,
                    humidity: item.hum,
                    weather: item.w,
                    location: item.loc,
                    lat: item.lat,
                    lon: item.lon,
                    source: item.src || 'saved'
                }));
                
                console.log(`📂 Loaded ${this.dataHistory.length} history items from localStorage`);
            }
            
            const savedLocation = localStorage.getItem('uvguard_pro_location');
            if (savedLocation) {
                this.currentLocation = JSON.parse(savedLocation);
                
                const cityInput = document.getElementById('cityInput');
                const latInput = document.getElementById('latInput');
                const lonInput = document.getElementById('lonInput');
                
                if (cityInput && this.currentLocation.name) {
                    cityInput.value = `${this.currentLocation.name}${this.currentLocation.country ? ', ' + this.currentLocation.country : ''}`;
                }
                if (latInput && this.currentLocation.lat) {
                    latInput.value = this.currentLocation.lat;
                }
                if (lonInput && this.currentLocation.lon) {
                    lonInput.value = this.currentLocation.lon;
                }
                
                console.log("📍 Loaded saved location:", this.currentLocation);
            }
            
        } catch (error) {
            console.error("❌ Error loading history:", error);
        }
    }
    
    clearHistory() {
        if (confirm("Hapus semua riwayat data? Tindakan ini tidak dapat dibatalkan.")) {
            this.dataHistory = [];
            localStorage.removeItem('uvguard_pro_history');
            
            this.updateHistoryTable();
            this.updateStats();
            
            if (this.charts.uv) {
                this.charts.uv.data.labels = [];
                this.charts.uv.data.datasets[0].data = [];
                this.charts.uv.update();
            }
            
            this.showNotification("Riwayat data telah dihapus.", "success");
            console.log("🗑️ History cleared");
        }
    }
    
    exportData() {
        if (this.dataHistory.length === 0) {
            this.showNotification("Tidak ada data untuk diekspor", "warning");
            return;
        }
        
        try {
            const headers = ['Waktu', 'UV Index', 'Suhu (°C)', 'Kelembapan (%)', 'Kondisi', 'Lokasi', 'Latitude', 'Longitude', 'Sumber'];
            
            const csvContent = [
                headers.join(','),
                ...this.dataHistory.map(item => [
                    new Date(item.timestamp).toISOString(),
                    item.uvIndex,
                    item.temperature || '',
                    item.humidity || '',
                    `"${item.weather || ''}"`,
                    `"${item.location || ''}"`,
                    item.lat || '',
                    item.lon || '',
                    item.source || ''
                ].join(','))
            ].join('\n');
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `uv-data-${new Date().toISOString().slice(0, 10)}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            this.showNotification("Data berhasil diekspor ke CSV", "success");
            console.log("📤 Data exported to CSV");
            
        } catch (error) {
            console.error("❌ Error exporting data:", error);
            this.showNotification("Gagal mengekspor data", "error");
        }
    }
    
    useHistoricalData(index) {
        const originalIndex = this.dataHistory.length - 1 - index;
        
        if (originalIndex >= 0 && originalIndex < this.dataHistory.length) {
            const historicalData = this.dataHistory[originalIndex];
            
            this.currentData = {
                uvIndex: historicalData.uvIndex,
                temperature: historicalData.temperature,
                humidity: historicalData.humidity,
                weather: historicalData.weather,
                cityName: historicalData.location,
                timestamp: new Date(),
                lat: historicalData.lat,
                lon: historicalData.lon,
                source: "history",
                apiSource: "history"
            };
            
            this.updateRealtimeDisplay();
            this.updateWeatherInfo();
            this.updateRecommendations();
            
            this.showNotification(`Menggunakan data historis dari ${historicalData.location}`, "info");
            console.log(`↩️ Using historical data from index ${originalIndex}`);
        }
    }
    
    // ==================== NOTIFICATION SYSTEM ====================
    showNotification(message, type = 'info') {
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
    
    const container = document.getElementById('notificationSystem');
    if (!container) {
        console.warn("Notification container not found");
        return;
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Icons
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const icon = icons[type] || 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <div class="notification-content">
            <div class="notification-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(notification);
    
    // Auto remove setelah 5 detik
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
       
        console.log(`📢 Notification: ${type} - ${message}`);
    }

        // ==================== METHOD BARU: WeatherAPI.com ====================
    async fetchFromWeatherAPI(lat, lon) {
        console.log("🌐 Mengambil data dari WeatherAPI.com...");
        
        // Cek config
        if (!this.MULTI_API_CONFIG || !this.MULTI_API_CONFIG.weatherapi) {
            console.error("WeatherAPI config not found!");
            return null;
        }
        
        const apiKey = this.MULTI_API_CONFIG.weatherapi.key;
        const baseUrl = this.MULTI_API_CONFIG.weatherapi.baseUrl;
        
        if (!apiKey || apiKey === "YOUR_WEATHERAPI_KEY") {
            console.error("WeatherAPI key tidak dikonfigurasi");
            return null;
        }
        
        const url = `${baseUrl}/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
        console.log("URL WeatherAPI:", url);
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                console.warn(`WeatherAPI.com error: ${response.status}`);
                return null;
            }
            
            const data = await response.json();
            const uvIndex = data.current?.uv || 0;
            
            console.log(`✅ WeatherAPI.com: UV = ${uvIndex}, Suhu = ${data.current.temp_c}°C`);
            
            return {
                uvIndex: parseFloat(uvIndex.toFixed(1)),
                temperature: data.current.temp_c,
                feelsLike: data.current.feelslike_c,
                humidity: data.current.humidity,
                pressure: data.current.pressure_mb,
                weather: data.current.condition.text,
                weatherIcon: `https:${data.current.condition.icon}`,
                windSpeed: data.current.wind_kph / 3.6,
                windDeg: data.current.wind_degree,
                clouds: data.current.cloud,
                cityName: data.location?.name || "Unknown",
                country: data.location?.country || "XX",
                timestamp: new Date(data.current.last_updated),
                lat: lat,
                lon: lon,
                source: "api",
                apiSource: "WeatherAPI.com",
                provider: "WeatherAPI.com"
            };
            
        } catch (error) {
            console.error("❌ WeatherAPI.com error:", error);
            return null;
        }
    }

        // ==================== METHOD BARU: Visual Crossing ====================
    async fetchFromVisualCrossing(lat, lon) {
        console.log("🌐 Mengambil data dari Visual Crossing...");
        
        // Cek config
        if (!this.MULTI_API_CONFIG || !this.MULTI_API_CONFIG.visualcrossing) {
            console.error("Visual Crossing config not found!");
            return null;
        }
        
        const apiKey = this.MULTI_API_CONFIG.visualcrossing.key;
        const baseUrl = this.MULTI_API_CONFIG.visualcrossing.baseUrl;
        
        if (!apiKey || apiKey === "YOUR_VISUALCROSSING_KEY") {
            console.error("Visual Crossing key tidak dikonfigurasi");
            return null;
        }
        
        const today = new Date().toISOString().split('T')[0];
        const url = `${baseUrl}/${lat},${lon}/${today}?key=${apiKey}&unitGroup=metric&include=current`;
        console.log("URL Visual Crossing:", url);
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                console.warn(`Visual Crossing error: ${response.status}`);
                return null;
            }
            
            const data = await response.json();
            const current = data.currentConditions;
            
            if (!current) {
                console.warn("Visual Crossing: No current data");
                return null;
            }
            
            const uvIndex = current.uvindex || 0;
            
            console.log(`✅ Visual Crossing: UV = ${uvIndex}, Suhu = ${current.temp}°C`);
            
            return {
                uvIndex: parseFloat(uvIndex.toFixed(1)),
                temperature: current.temp,
                feelsLike: current.feelslike || current.temp,
                humidity: current.humidity,
                pressure: current.pressure,
                weather: current.conditions || "Clear",
                weatherIcon: this.getWeatherIcon(current.conditions || "Clear"),
                windSpeed: current.windspeed,
                windDeg: current.winddir,
                clouds: current.cloudcover || 0,
                cityName: data.resolvedAddress || "Unknown",
                country: "XX",
                timestamp: new Date(),
                lat: lat,
                lon: lon,
                source: "api",
                apiSource: "VisualCrossing",
                provider: "Visual Crossing"
            };
            
        } catch (error) {
            console.error("❌ Visual Crossing error:", error);
            return null;
        }
    }
    
    // Helper untuk icon weather
    getWeatherIcon(conditions) {
        const cond = conditions.toLowerCase();
        if (cond.includes("clear") || cond.includes("sunny")) return "☀️";
        if (cond.includes("cloud")) return "☁️";
        if (cond.includes("rain")) return "🌧️";
        if (cond.includes("storm")) return "⛈️";
        return "☀️";
    }

        // ==================== METHOD BARU: Multi-Source System ====================
    async fetchFromMultipleSources() {
    console.log("🔄 Starting multi-source fetch...");
    
    if (!this.currentLocation) {
        console.error("❌ No location for multi-source");
        return null;
    }
    
    const lat = this.currentLocation.lat;
    const lon = this.currentLocation.lon;
    const locationName = this.currentLocation.name || `(${lat}, ${lon})`;
    
    console.log(`🎯 Multi-source target: ${locationName}`);
    
    const results = [];
    const errors = [];
    
    // 1. OpenWeatherMap (Prioritas 1)
    console.log("1. 📡 OpenWeatherMap...");
    try {
        const owmData = await this.fetchWithTimeout(
            () => this.fetchAPIData(),
            8000,
            "OpenWeatherMap"
        );
        if (owmData) {
            results.push(owmData);
            console.log(`   ✅ Success: UV ${owmData.uvIndex}`);
        }
    } catch (error) {
        errors.push(`OpenWeatherMap: ${error.message}`);
        console.warn("   ⚠️ Error:", error.message);
    }
    
    // 2. WeatherAPI.com (Prioritas 2)
    console.log("2. 📡 WeatherAPI.com...");
    try {
        const weatherApiData = await this.fetchWithTimeout(
            () => this.fetchFromWeatherAPI(lat, lon),
            8000,
            "WeatherAPI.com"
        );
        if (weatherApiData) {
            results.push(weatherApiData);
            console.log(`   ✅ Success: UV ${weatherApiData.uvIndex}`);
        }
    } catch (error) {
        errors.push(`WeatherAPI.com: ${error.message}`);
        console.warn("   ⚠️ Error:", error.message);
    }
    
    // 3. Visual Crossing (Prioritas 3)
    console.log("3. 📡 Visual Crossing...");
    try {
        const vcData = await this.fetchWithTimeout(
            () => this.fetchFromVisualCrossing(lat, lon),
            8000,
            "Visual Crossing"
        );
        if (vcData) {
            results.push(vcData);
            console.log(`   ✅ Success: UV ${vcData.uvIndex}`);
        }
    } catch (error) {
        errors.push(`Visual Crossing: ${error.message}`);
        console.warn("   ⚠️ Error:", error.message);
    }
    
    console.log(`📊 Multi-source results: ${results.length}/3 successful`);
    console.log(`❌ Errors: ${errors.length > 0 ? errors.join(', ') : 'None'}`);
    
    if (results.length === 0) {
        console.log("❌ All sources failed");
        return null;
    }
    
    // Pilih data terbaik
    const bestData = this.selectBestData(results, lat, lon);
    console.log(`🏆 Selected: ${bestData.provider || bestData.apiSource} with UV ${bestData.uvIndex}`);
    
    return bestData;
}

// Helper method untuk timeout
async fetchWithTimeout(fetchFunction, timeout = 8000, sourceName = "Unknown") {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(new Error(`${sourceName} timeout after ${timeout}ms`));
        }, timeout);
        
        fetchFunction()
            .then(result => {
                clearTimeout(timeoutId);
                resolve(result);
            })
            .catch(error => {
                clearTimeout(timeoutId);
                reject(error);
            });
    });
}

    // Method untuk memilih data terbaik
    selectBestData(dataArray, lat, lon) {
    console.log(`🎯 Selecting best from ${dataArray.length} sources`);
    
    if (dataArray.length === 0) return null;
    if (dataArray.length === 1) return dataArray[0];
    
    // Tampilkan semua data
    dataArray.forEach((data, i) => {
        console.log(`   ${i+1}. ${data.provider || data.apiSource}: UV ${data.uvIndex}, Temp ${data.temperature}°C`);
    });
    
    // ========== LOGIKA PEMILIHAN SEDERHANA ==========
    
    // 1. Prioritas berdasarkan provider
    const priorityOrder = ["WeatherAPI.com", "OpenWeatherMap", "Visual Crossing"];
    
    for (const provider of priorityOrder) {
        const found = dataArray.find(d => 
            d.provider === provider || d.apiSource === provider
        );
        if (found) {
            console.log(`✅ Selected by priority: ${provider}`);
            return found;
        }
    }
    
    // 2. Jika tidak match, ambil dengan UV paling realistis
    // (hindari UV terlalu tinggi/tidak realistis)
    const realisticData = dataArray.filter(d => d.uvIndex >= 0 && d.uvIndex <= 15);
    if (realisticData.length > 0) {
        // Ambil yang pertama (bisa juga yang UV rata-rata)
        console.log("✅ Selected: Most realistic UV");
        return realisticData[0];
    }
    
    // 3. Fallback: data pertama
    console.log("✅ Selected: First available");
    return dataArray[0];
}

validateCoordinates(lat, lon) {
    console.log(`📍 Validating coordinates: ${lat}, ${lon}`);
    
    if (lat === undefined || lon === undefined || 
        lat === null || lon === null) {
        throw new Error("Koordinat tidak boleh kosong");
    }
    
    if (isNaN(lat) || isNaN(lon)) {
        throw new Error("Koordinat harus berupa angka");
    }
    
    if (lat < -90 || lat > 90) {
        throw new Error("Latitude harus antara -90 dan 90");
    }
    
    if (lon < -180 || lon > 180) {
        throw new Error("Longitude harus antara -180 dan 180");
    }
    
    console.log("✅ Coordinates valid");
    return true;
}

validateCityName(cityName) {
    if (!cityName || cityName.trim().length === 0) {
        throw new Error("Nama kota tidak boleh kosong");
    }
    
    if (cityName.length > 100) {
        throw new Error("Nama kota terlalu panjang (max 100 karakter)");
    }
    
    // Basic validation untuk mencegah input berbahaya
    if (/[<>{}[\]]/.test(cityName)) {
        throw new Error("Nama kota mengandung karakter tidak valid");
    }
    
    return true;
}

validateUVIndex(uv) {
    if (uv === undefined || uv === null) {
        throw new Error("UV Index tidak valid");
    }
    
    if (isNaN(uv)) {
        throw new Error("UV Index harus berupa angka");
    }
    
    if (uv < 0 || uv > 20) {
        throw new Error("UV Index harus antara 0 dan 20");
    }
    
    return true;
}

    createSimpleChartFallback() {
        console.log("📊 Creating simple chart fallback...");
        
        const chartContainer = document.querySelector('.chart-container');
        if (!chartContainer) {
            console.warn("📊 Chart container not found");
            return;
        }
        
        // Hapus canvas jika ada
        const canvas = document.getElementById('uvChart');
        if (canvas) {
            canvas.style.display = 'none';
        }
        
        if (!this.dataHistory || this.dataHistory.length === 0) {
            chartContainer.innerHTML = `
                <div class="simple-chart no-data">
                    <div class="chart-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h4>UV Index Chart</h4>
                    <p>Ambil data terlebih dahulu untuk melihat grafik</p>
                    <button class="btn btn-primary" onclick="app.fetchData()">
                        <i class="fas fa-cloud-download-alt"></i> Ambil Data UV
                    </button>
                </div>
            `;
            return;
        }
        
        // Ambil 10 data terakhir
        const recentData = this.dataHistory.slice(-10);
        const maxUV = Math.max(...recentData.map(d => d.uvIndex), 1);
        
        // Buat HTML untuk chart bars
        let barsHTML = '';
        recentData.forEach((data, index) => {
            const height = (data.uvIndex / maxUV) * 120; // Max height 120px
            const uvLevel = this.getUVLevel(data.uvIndex);
            const time = new Date(data.timestamp).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            barsHTML += `
                <div class="simple-bar" style="width: ${80 / recentData.length}%">
                    <div class="bar-value" 
                         style="height: ${height}px; 
                                background: ${uvLevel.color};
                                box-shadow: 0 2px 8px ${uvLevel.color}80;"
                         title="UV: ${data.uvIndex.toFixed(1)} at ${time}">
                        <span class="bar-label">${data.uvIndex.toFixed(1)}</span>
                    </div>
                    <div class="time-label">${time}</div>
                </div>
            `;
        });
        
        chartContainer.innerHTML = `
            <div class="simple-chart">
                <div class="chart-header">
                    <h4><i class="fas fa-chart-line"></i> UV Index (Simple View)</h4>
                    <small>Chart.js tidak tersedia, menggunakan tampilan alternatif</small>
                </div>
                <div class="chart-bars">
                    ${barsHTML}
                </div>
                <div class="chart-footer">
                    <button class="btn btn-small" onclick="app.initCharts()">
                        <i class="fas fa-redo"></i> Coba Chart.js Lagi
                    </button>
                </div>
            </div>
        `;
        
        // Tambahkan style inline jika belum ada
        this.addSimpleChartStyles();
    }
    
    addSimpleChartStyles() {
        // Cek apakah style sudah ada
        if (document.getElementById('simple-chart-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'simple-chart-styles';
        style.textContent = `
            .simple-chart {
                background: white;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                margin: 20px 0;
                border: 1px solid #e2e8f0;
            }
            
            .simple-chart.no-data {
                text-align: center;
                padding: 40px 20px;
            }
            
            .simple-chart.no-data .chart-icon {
                font-size: 3rem;
                color: #cbd5e1;
                margin-bottom: 15px;
            }
            
            .simple-chart.no-data h4 {
                color: #475569;
                margin: 10px 0;
            }
            
            .simple-chart.no-data p {
                color: #64748b;
                margin-bottom: 20px;
            }
            
            .chart-header {
                margin-bottom: 20px;
            }
            
            .chart-header h4 {
                margin: 0 0 5px 0;
                color: #1e293b;
                font-size: 1.1rem;
            }
            
            .chart-header small {
                color: #64748b;
                font-size: 0.85rem;
            }
            
            .chart-bars {
                display: flex;
                align-items: flex-end;
                height: 150px;
                padding: 20px 10px;
                border-bottom: 2px solid #e2e8f0;
                gap: 8px;
            }
            
            .simple-bar {
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 100%;
                flex: 1;
            }
            
            .bar-value {
                width: 80%;
                min-height: 5px;
                border-radius: 6px 6px 0 0;
                position: relative;
                transition: height 0.5s ease;
                display: flex;
                align-items: flex-end;
                justify-content: center;
            }
            
            .bar-value .bar-label {
                position: absolute;
                top: -25px;
                font-size: 0.8rem;
                font-weight: bold;
                color: #334155;
                background: white;
                padding: 2px 6px;
                border-radius: 4px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .time-label {
                margin-top: 10px;
                font-size: 0.75rem;
                color: #64748b;
                text-align: center;
                white-space: nowrap;
            }
            
            .chart-footer {
                margin-top: 15px;
                text-align: center;
            }
            
            .btn {
                padding: 8px 16px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.2s;
            }
            
            .btn-primary {
                background: #0066cc;
                color: white;
            }
            
            .btn-primary:hover {
                background: #0052a3;
            }
            
            .btn-small {
                padding: 6px 12px;
                font-size: 0.8rem;
                background: #f1f5f9;
                color: #475569;
            }
            
            .btn-small:hover {
                background: #e2e8f0;
            }
        `;
        document.head.appendChild(style);
    }

    // WeatherAPI.com fetcher
async fetchFromWeatherAPI(lat, lon) {
    console.log("🌐 Mengambil data dari WeatherAPI.com...");
    
    const apiKey = this.MULTI_API_CONFIG.weatherapi.key;
    const baseUrl = this.MULTI_API_CONFIG.weatherapi.baseUrl;
    
    if (!apiKey || apiKey === "YOUR_WEATHERAPI_KEY") {
        console.error("WeatherAPI key tidak dikonfigurasi");
        return null;
    }
    
    const url = `${baseUrl}/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            console.warn(`WeatherAPI.com error: ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        const uvIndex = data.current?.uv || 0;
        
        console.log(`✅ WeatherAPI.com: UV = ${uvIndex}, Suhu = ${data.current.temp_c}°C`);
        
        // Handle sunrise/sunset
        const sunriseUTC = new Date(data.current.last_updated);
        const sunsetUTC = new Date(data.current.last_updated);
        sunriseUTC.setHours(6, 0, 0); // Default sunrise 6:00
        sunsetUTC.setHours(18, 0, 0); // Default sunset 18:00
        
        // Konversi ke WIB
        const sunriseWIB = new Date(sunriseUTC.getTime() + (7 * 60 * 60 * 1000));
        const sunsetWIB = new Date(sunsetUTC.getTime() + (7 * 60 * 60 * 1000));
        
        return {
            uvIndex: parseFloat(uvIndex.toFixed(1)),
            temperature: data.current.temp_c,
            feelsLike: data.current.feelslike_c,
            humidity: data.current.humidity,
            pressure: data.current.pressure_mb,
            weather: data.current.condition.text,
            weatherIcon: `https:${data.current.condition.icon}`,
            windSpeed: data.current.wind_kph / 3.6, // Convert km/h to m/s
            windDeg: data.current.wind_degree,
            clouds: data.current.cloud,
            sunrise: sunriseWIB,
            sunset: sunsetWIB,
            cityName: data.location?.name || "Unknown",
            country: data.location?.country || "XX",
            timestamp: new Date(data.current.last_updated),
            lat: lat,
            lon: lon,
            source: "api",
            apiSource: "WeatherAPI.com",
            provider: "WeatherAPI.com"
        };
        
    } catch (error) {
        console.error("❌ WeatherAPI.com error:", error);
        return null;
    }
}

// Visual Crossing fetcher
async fetchFromVisualCrossing(lat, lon) {
    console.log("🌐 Mengambil data dari Visual Crossing...");
    
    const apiKey = this.MULTI_API_CONFIG.visualcrossing.key;
    const baseUrl = this.MULTI_API_CONFIG.visualcrossing.baseUrl;
    
    if (!apiKey || apiKey === "YOUR_VISUALCROSSING_KEY") {
        console.error("Visual Crossing key tidak dikonfigurasi");
        return null;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const url = `${baseUrl}/${lat},${lon}/${today}?key=${apiKey}&unitGroup=metric&include=current`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            console.warn(`Visual Crossing error: ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        const current = data.currentConditions;
        
        if (!current) {
            console.warn("Visual Crossing: No current data");
            return null;
        }
        
        const uvIndex = current.uvindex || 0;
        
        console.log(`✅ Visual Crossing: UV = ${uvIndex}, Suhu = ${current.temp}°C`);
        
        // Handle sunrise/sunset
        const sunriseUTC = new Date(data.days[0]?.sunrise || `${today}T06:00:00`);
        const sunsetUTC = new Date(data.days[0]?.sunset || `${today}T18:00:00`);
        
        // Konversi ke WIB
        const sunriseWIB = new Date(sunriseUTC.getTime() + (7 * 60 * 60 * 1000));
        const sunsetWIB = new Date(sunsetUTC.getTime() + (7 * 60 * 60 * 1000));
        
        return {
            uvIndex: parseFloat(uvIndex.toFixed(1)),
            temperature: current.temp,
            feelsLike: current.feelslike || current.temp,
            humidity: current.humidity,
            pressure: current.pressure,
            weather: current.conditions || "Clear",
            weatherIcon: this.getWeatherIcon(current.conditions || "Clear"),
            windSpeed: current.windspeed,
            windDeg: current.winddir,
            clouds: current.cloudcover || 0,
            cityName: data.resolvedAddress || "Unknown",
            country: "XX",
            timestamp: new Date(),
            lat: lat,
            lon: lon,
            source: "api",
            apiSource: "VisualCrossing",
            provider: "Visual Crossing"
        };
        
    } catch (error) {
        console.error("❌ Visual Crossing error:", error);
        return null;
    }
}

// Helper untuk icon weather
getWeatherIcon(conditions) {
    const cond = conditions.toLowerCase();
    if (cond.includes("clear") || cond.includes("sunny")) return "01d";
    if (cond.includes("cloud")) return "03d";
    if (cond.includes("rain")) return "10d";
    if (cond.includes("storm")) return "11d";
    return "01d";
}

// Method untuk memilih data terbaik
selectBestData(dataArray, lat, lon) {
    console.log(`🎯 Selecting best from ${dataArray.length} sources`);
    
    if (dataArray.length === 0) return null;
    if (dataArray.length === 1) return dataArray[0];
    
    // Tampilkan semua data
    dataArray.forEach((data, i) => {
        console.log(`   ${i+1}. ${data.provider || data.apiSource}: UV ${data.uvIndex}, Temp ${data.temperature}°C`);
    });
    
    // Priority order
    const priorityOrder = ["OpenWeatherMap", "WeatherAPI.com", "Visual Crossing"];
    
    for (const provider of priorityOrder) {
        const found = dataArray.find(d => 
            d.provider === provider || d.apiSource === provider
        );
        if (found) {
            console.log(`✅ Selected by priority: ${provider}`);
            return found;
        }
    }
    
    // Filter data yang valid
    const validData = dataArray.filter(d => 
        d.uvIndex >= 0 && d.uvIndex <= 15 && 
        d.temperature >= -50 && d.temperature <= 60
    );
    
    if (validData.length > 0) {
        // Ambil rata-rata UV dari semua sumber valid
        const avgUV = validData.reduce((sum, d) => sum + d.uvIndex, 0) / validData.length;
        
        // Cari yang paling dekat dengan rata-rata
        const closest = validData.reduce((prev, curr) => {
            const prevDiff = Math.abs(prev.uvIndex - avgUV);
            const currDiff = Math.abs(curr.uvIndex - avgUV);
            return currDiff < prevDiff ? curr : prev;
        });
        
        console.log(`✅ Selected: Closest to average UV ${avgUV.toFixed(1)}`);
        return closest;
    }
    
    // Fallback: data pertama
    console.log("✅ Selected: First available");
    return dataArray[0];
}

}

// ==================== GLOBAL INITIALIZATION ====================
let app;

document.addEventListener('DOMContentLoaded', () => {
    console.log("🌞 UV Guard Pro - Document loaded");
    
    // PERBAIKAN: Cek Chart.js dengan lebih baik
    if (typeof Chart === 'undefined') {
        console.error("❌ Chart.js not loaded!");
        // Tampilkan pesan error yang lebih jelas
        const errorContainer = document.querySelector('.chart-container') || document.body;
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `
            background: #ff3333;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px;
            text-align: center;
        `;
        errorMsg.innerHTML = `
            <h3>❌ Error: Chart.js tidak ditemukan</h3>
            <p>Pastikan Anda telah memuat library Chart.js:</p>
            <code>&lt;script src="https://cdn.jsdelivr.net/npm/chart.js"&gt;&lt;/script&gt;</code>
            <p style="margin-top: 10px;">Refresh halaman setelah menambahkan script.</p>
        `;
        errorContainer.appendChild(errorMsg);
        return;
    }
    
    try {
        app = new UVGuardPro();
        window.app = app;
        
        // PERBAIKAN: Tambah fallback jika chart masih error
        setTimeout(() => {
            if (!app.charts.uv) {
                console.log("Chart initialization may have failed, trying again...");
                app.initCharts();
            }
        }, 2000);
        
        console.log("🎉 UV Guard Pro application started successfully!");
        
    } catch (error) {
        console.error("❌ Fatal error initializing application:", error);
        alert(`Error inisialisasi aplikasi: ${error.message}\n\nCek console untuk detail.`);
    }

    
});