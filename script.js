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
            apiKey1: "7c147cbc7723582a81895d13c584fb31",  
            apiKey2: "c5e0d6bf87b5b5260a35352e699409a6",
            apiKey3: "8330042657054aafedcfd960d14eda1d",
            currentKeyIndex: 0,
            
            baseUrl: "https://api.openweathermap.org/data/2.5",
            geoUrl: "https://api.openweathermap.org/geo/1.0",
            endpoints: {
                weather: "/weather",
                uv: "/uvi",
                forecast: "/forecast"
            }
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
            low: { min: 0, max: 2, level: "Rendah", color: "#00cc00" },
            moderate: { min: 3, max: 5, level: "Sedang", color: "#ffcc00" },
            high: { min: 6, max: 7, level: "Tinggi", color: "#ff6600" },
            veryHigh: { min: 8, max: 10, level: "Sangat Tinggi", color: "#ff3300" },
            extreme: { min: 11, max: 20, level: "Ekstrem", color: "#cc00cc" }
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
    
    // 1. Cari dropdownnya
    const dropdown = document.getElementById('provinceSelect');
    if (!dropdown) {
        console.error("❌ Dropdown not found!");
        return;
    }
    
    // 2. Kosongkan dulu
    dropdown.innerHTML = '<option value="">-- Pilih Provinsi Indonesia --</option>';
    
    // 3. Isi dengan data provinsi
    this.INDONESIA_PROVINCES.forEach(prov => {
        const option = document.createElement('option');
        option.value = `${prov.lat},${prov.lon}`;
        option.textContent = `${prov.name} (${prov.capital})`;
        dropdown.appendChild(option);
    });
    
    console.log(`✅ Loaded ${this.INDONESIA_PROVINCES.length} provinces`);
    
    // 4. Event handler SANGAT SIMPEL
    dropdown.addEventListener('change', (e) => {
        if (!e.target.value) return;
        
        // Ambil data dari value (format: "lat,lon")
        const [lat, lon] = e.target.value.split(',').map(Number);
        const selectedText = e.target.options[e.target.selectedIndex].text;
        
        // Parse nama kota dari text (format: "Provinsi (Kota)")
        const cityMatch = selectedText.match(/\(([^)]+)\)/);
        const cityName = cityMatch ? cityMatch[1] : selectedText.split('(')[0].trim();
        const provinceName = selectedText.split('(')[0].trim();
        
        console.log(`📍 Selected: ${provinceName} - ${cityName} (${lat}, ${lon})`);
        
        // Set lokasi
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
        
        // Tampilkan notifikasi
        this.showNotification(`${provinceName} dipilih`, "success");
        
        // Ambil data
        setTimeout(() => {
            this.fetchData();
        }, 500);
    });
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
        // Check cache first
        const cacheKey = cityName.toLowerCase();
        if (this.geoCache.has(cacheKey)) {
            console.log("Using cached geocode result");
            return this.geoCache.get(cacheKey);
        }
        
        const apiKeys = [
            this.API_CONFIG.apiKey1,
            this.API_CONFIG.apiKey2,
            this.API_CONFIG.apiKey3
        ];
        
        for (let i = 0; i < apiKeys.length; i++) {
            const apiKey = apiKeys[i];
            
            if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
                continue;
            }
            
            try {
                // Format: city name, state code (optional), country code (optional)
                const geocodeUrl = `${this.API_CONFIG.geoUrl}/direct?q=${encodeURIComponent(cityName)}&limit=5&appid=${apiKey}`;
                
                console.log(`Geocoding: ${cityName} with API key ${i+1}...`);
                const response = await fetch(geocodeUrl);
                
                if (response.ok) {
                    const data = await response.json();
                    
                    if (data && data.length > 0) {
                        // Ambil hasil pertama (yang paling relevan)
                        const result = data[0];
                        const geoData = {
                            name: result.name,
                            lat: result.lat,
                            lon: result.lon,
                            country: result.country,
                            state: result.state || ""
                        };
                        
                        // Cache the result
                        this.geoCache.set(cacheKey, geoData);
                        
                        console.log(`Geocode successful: ${result.name}, ${result.country}`);
                        return geoData;
                    }
                } else {
                    console.warn(`Geocoding API error with key ${i+1}: ${response.status}`);
                }
                
            } catch (error) {
                console.error(`Geocoding error with key ${i+1}:`, error.message);
            }
        }
        
        console.warn("All geocoding attempts failed");
        return null;
    }
    
    // Reverse geocode coordinates to city name
    async reverseGeocode(lat, lon) {
        const cacheKey = `${lat.toFixed(4)},${lon.toFixed(4)}`;
        
        if (this.geoCache.has(cacheKey)) {
            return this.geoCache.get(cacheKey);
        }
        
        const apiKeys = [
            this.API_CONFIG.apiKey1,
            this.API_CONFIG.apiKey2,
            this.API_CONFIG.apiKey3
        ];
        
        for (let i = 0; i < apiKeys.length; i++) {
            const apiKey = apiKeys[i];
            
            if (!apiKey) continue;
            
            try {
                const reverseUrl = `${this.API_CONFIG.geoUrl}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
                
                const response = await fetch(reverseUrl);
                
                if (response.ok) {
                    const data = await response.json();
                    
                    if (data && data.name) {
                        const result = {
                            city: data.name,
                            country: data.country || "XX",
                            state: data.state || ""
                        };
                        
                        this.geoCache.set(cacheKey, result);
                        return result;
                    }
                }
            } catch (error) {
                console.warn(`Reverse geocoding error with key ${i+1}:`, error);
            }
        }
        
        // Fallback to demo location name
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
        
        const apiKeys = [
            this.API_CONFIG.apiKey1,
            this.API_CONFIG.apiKey2,
            this.API_CONFIG.apiKey3
        ];
        
        for (let i = 0; i < apiKeys.length; i++) {
            const apiKey = apiKeys[i];
            
            if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
                console.warn(`⚠️ API key ${i+1} tidak valid`);
                continue;
            }
            
            try {
                const testUrl = `https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=${apiKey}&units=metric`;
                
                console.log(`Testing API key ${i+1}...`);
                const response = await fetch(testUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                
                if (response.ok) {
                    console.log(`✅ API connection successful with key ${i+1}`);
                    this.API_CONFIG.currentKeyIndex = i;
                    this.isDemoMode = false;
                    this.updateAPIStatus(true);
                    return true;
                } else {
                    console.warn(`⚠️ API key ${i+1} failed: ${response.status}`);
                }
                
            } catch (error) {
                console.error(`❌ API key ${i+1} test failed:`, error.message);
            }
        }
        
        console.warn("⚠️ All API keys failed. Using demo mode.");
        this.isDemoMode = true;
        this.updateAPIStatus(false);
        return false;
    }
    
    updateAPIStatus(connected) {
        const apiStatus = document.getElementById('apiStatus');
        if (apiStatus) {
            if (connected) {
                apiStatus.innerHTML = '<span class="status-indicator active"></span> <span>API Connected</span>';
                apiStatus.style.color = '#00cc88';
            } else {
                apiStatus.innerHTML = '<span class="status-indicator warning"></span> <span>Demo Mode</span>';
                apiStatus.style.color = '#ffcc00';
            }
        }
    }
    
    async fetchData() {
        if (!this.currentLocation) {
            this.showNotification("Pilih lokasi terlebih dahulu", "warning");
            return;
        }
        
        console.log("📥 Fetching data for location:", this.currentLocation);
        
        this.showNotification("Mengambil data UV...", "info");
        this.toggleButtons(false);
        
        try {
            let data;
            
            if (!this.isDemoMode) {
                data = await this.fetchAPIData();
                
                if (!data) {
                    console.log("API fetch failed, using demo data");
                    this.isDemoMode = true;
                    this.updateAPIStatus(false);
                    data = await this.generateDemoData();
                }
            } else {
                data = await this.generateDemoData();
            }
            
            if (data) {
                await this.processData(data);
            } else {
                throw new Error("No data received");
            }
            
        } catch (error) {
            console.error("❌ Error fetching data:", error);
            this.showNotification(`Error: ${error.message}`, "error");
            
            try {
                console.log("Trying demo data as fallback...");
                const demoData = await this.generateDemoData();
                await this.processData(demoData);
            } catch (demoError) {
                console.error("Even demo data failed:", demoError);
            }
        } finally {
            this.toggleButtons(true);
        }
    }
    
    async fetchAPIData() {
        const { lat, lon, name } = this.currentLocation;
        const apiKeys = [
            this.API_CONFIG.apiKey1,
            this.API_CONFIG.apiKey2,
            this.API_CONFIG.apiKey3
        ];
        
        const currentApiKey = apiKeys[this.API_CONFIG.currentKeyIndex];
        
        if (!currentApiKey) {
            console.warn("No valid API key available");
            return null;
        }
        
        try {
            // Fetch weather data
            const weatherUrl = `${this.API_CONFIG.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${currentApiKey}&units=metric&lang=id`;
            
            console.log(`Fetching weather data from API...`);
            const weatherResponse = await fetch(weatherUrl);
            
            if (!weatherResponse.ok) {
                console.warn(`Weather API error: ${weatherResponse.status}`);
                this.API_CONFIG.currentKeyIndex = (this.API_CONFIG.currentKeyIndex + 1) % apiKeys.length;
                return null;
            }
            
            const weatherData = await weatherResponse.json();
            
            // Fetch UV index - PERBAIKAN 2: UV index hanya ada di siang hari
            const uvUrl = `${this.API_CONFIG.baseUrl}/uvi?lat=${lat}&lon=${lon}&appid=${currentApiKey}`;
            let uvIndex = 0;
            let uvResponse;
            
            try {
                uvResponse = await fetch(uvUrl);
                if (uvResponse.ok) {
                    const uvData = await uvResponse.json();
                    uvIndex = uvData.value || 0;
                }
            } catch (uvError) {
                console.warn("UV API error:", uvError);
            }
            
            // Parse times
            const sunrise = new Date(weatherData.sys.sunrise * 1000);
            const sunset = new Date(weatherData.sys.sunset * 1000);
            const now = new Date();
            
            // PERBAIKAN BESAR: UV harus 0 di malam hari
            if (now < sunrise || now > sunset) {
                uvIndex = 0; // Malam hari, UV = 0
                console.log("🌙 Nighttime detected, setting UV to 0");
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
                sunrise: sunrise,
                sunset: sunset,
                cityName: weatherData.name || name,
                country: weatherData.sys.country || "XX",
                timestamp: new Date(),
                lat: lat,
                lon: lon,
                source: "api",
                apiSource: "OpenWeatherMap",
                isDaytime: now >= sunrise && now <= sunset
            };
            
        } catch (error) {
            console.error("❌ API fetch error:", error);
            this.API_CONFIG.currentKeyIndex = (this.API_CONFIG.currentKeyIndex + 1) % apiKeys.length;
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
        if (!this.currentData) return;
        
        const data = this.currentData;
        
        const updateElement = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        };
        
        // Tampilkan kota dan negara
        let locationText = data.cityName;
        if (data.country && data.country !== "XX") {
            locationText += `, ${data.country}`;
        }
        updateElement('locationName', locationText);
        
        const coordinatesElement = document.getElementById('coordinatesText');
        if (coordinatesElement) {
            coordinatesElement.textContent = `${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}`;
        }
        
        updateElement('temperature', `${data.temperature.toFixed(1)}°C`);
        updateElement('feelsLikeText', `${data.feelsLike.toFixed(1)}°C`);
        updateElement('weatherCondition', data.weather);
        updateElement('humidity', `${data.humidity}%`);
        
        const pressureElement = document.getElementById('pressureText');
        const windElement = document.getElementById('windText');
        const cloudsElement = document.getElementById('cloudsText');
        
        if (pressureElement) pressureElement.textContent = `${data.pressure} hPa`;
        if (windElement) windElement.textContent = `${data.windSpeed.toFixed(1)} m/s`;
        if (cloudsElement) cloudsElement.textContent = `${data.clouds}%`;
        
        if (data.sunrise && data.sunset) {
            try {
                const sunriseTime = data.sunrise.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                const sunsetTime = data.sunset.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                
                updateElement('sunriseText', sunriseTime);
                updateElement('sunsetText', sunsetTime);
                
                // Tampilkan status siang/malam
                const now = new Date();
                const isDaytime = now >= data.sunrise && now <= data.sunset;
                const timeStatus = document.getElementById('timeStatus');
                if (timeStatus) {
                    timeStatus.textContent = isDaytime ? '☀️ Siang Hari' : '🌙 Malam Hari';
                    timeStatus.style.color = isDaytime ? '#FF8C00' : '#4169E1';
                }
                
            } catch (error) {
                console.error("Error formatting time:", error);
                updateElement('sunriseText', '06:00');
                updateElement('sunsetText', '18:00');
            }
        }
        
        if (this.lastUpdateTime) {
            const lastUpdateElement = document.getElementById('lastUpdate');
            if (lastUpdateElement) {
                lastUpdateElement.textContent = this.lastUpdateTime.toLocaleTimeString('id-ID');
            }
        }
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
        
        if (!skinType || useCustomUV <= 0) {
            // Jika UV = 0 (malam hari)
            const updateElement = (id, value) => {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = value;
                }
            };
            
            updateElement('safeSunbathTime', 'N/A');
            updateElement('vitaminDTime', 'N/A');
            updateElement('burnRisk', 'Tidak ada');
            updateElement('sunbathDuration', `Tidak ada UV`);
            
            const burnRiskElement = document.getElementById('burnRisk');
            if (burnRiskElement) {
                burnRiskElement.style.color = '#00cc00';
                burnRiskElement.style.fontWeight = 'bold';
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
        
        // PERBAIKAN: Cek apakah element chart ada
        const uvCtx = document.getElementById('uvChart');
        if (!uvCtx) {
            console.error("Chart element not found!");
            return;
        }
        
        if (!this.charts.uv) {
            console.log("Chart not initialized yet, initializing now...");
            this.initCharts();
            return;
        }
        
        if (!this.dataHistory || this.dataHistory.length < 1) {
            console.log("No data to update chart");
            // Set placeholder data
            this.charts.uv.data.labels = ['00:00', '06:00', '12:00', '18:00'];
            this.charts.uv.data.datasets[0].data = [0, 0, 0, 0];
            this.charts.uv.update();
            return;
        }
        
        try {
            const recentData = this.dataHistory.slice(-10);
            const labels = recentData.map((point) => {
                try {
                    const time = new Date(point.timestamp);
                    return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
                } catch (e) {
                    return '00:00';
                }
            });
            
            const data = recentData.map(point => point.uvIndex);
            
            console.log("Updating chart with", data.length, "data points:", data);
            
            // PERBAIKAN: Gunakan try-catch untuk update chart
            try {
                this.charts.uv.data.labels = labels;
                this.charts.uv.data.datasets[0].data = data;
                
                if (data.length > 0) {
                    const maxUV = Math.max(...data);
                    this.charts.uv.options.scales.y.suggestedMax = Math.max(15, maxUV * 1.2);
                }
                
                this.charts.uv.update('none');
                console.log("✅ Chart updated successfully");
                
            } catch (chartError) {
                console.error("Error updating chart data:", chartError);
                // Coba reinitialize chart
                setTimeout(() => {
                    this.initCharts();
                    setTimeout(() => this.updateCharts(), 500);
                }, 1000);
            }
            
            this.updateHistoryTable();
            
        } catch (error) {
            console.error("❌ Error updating charts:", error);
            try {
                this.initCharts();
                if (this.dataHistory.length > 0) {
                    setTimeout(() => this.updateCharts(), 100);
                }
            } catch (reinitError) {
                console.error("Failed to reinitialize chart:", reinitError);
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
        const container = document.getElementById('notificationSystem');
        if (!container) {
            console.warn("Notification container not found");
            return;
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
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
        
        setTimeout(() => {
            if (notification.parentNode === container) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode === container) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
        
        console.log(`📢 Notification: ${type} - ${message}`);
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