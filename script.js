// Navigation and routing functionality
class OllamaWrapperApp {
    constructor() {
        this.currentView = 'models';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupMobileMenu();
        this.showView(this.currentView);
    }

    setupEventListeners() {
        // Navigation click handlers
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const viewName = link.getAttribute('data-view');
                this.navigateToView(viewName);
            });
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const state = e.state;
            if (state && state.view) {
                this.showView(state.view, false);
            }
        });

        // Handle initial page load with hash
        window.addEventListener('load', () => {
            const hash = window.location.hash.substring(1);
            if (hash && this.isValidView(hash)) {
                this.navigateToView(hash);
            }
        });
    }

    setupMobileMenu() {
        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.appendChild(menuBtn);

            // Toggle sidebar on mobile
            menuBtn.addEventListener('click', () => {
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.toggle('open');
            });

            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', (e) => {
                const sidebar = document.querySelector('.sidebar');
                const menuBtn = document.querySelector('.mobile-menu-btn');
                
                if (window.innerWidth <= 768 && 
                    !sidebar.contains(e.target) && 
                    !menuBtn.contains(e.target) &&
                    sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                }
            });
        }
    }

    navigateToView(viewName) {
        if (!this.isValidView(viewName)) {
            console.warn(`Invalid view: ${viewName}`);
            return;
        }

        this.showView(viewName);
        this.updateURL(viewName);
        this.closeMobileSidebar();
    }

    showView(viewName, updateHistory = true) {
        // Hide all views
        const allViews = document.querySelectorAll('.view');
        allViews.forEach(view => {
            view.classList.remove('active');
        });

        // Show selected view
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
        }

        // Update navigation active state
        this.updateActiveNav(viewName);

        // Update current view
        this.currentView = viewName;

        // Update browser history
        if (updateHistory) {
            const state = { view: viewName };
            const title = this.getViewTitle(viewName);
            history.pushState(state, title, `#${viewName}`);
            document.title = `${title} - Ollama Wrapper`;
        }

        // Trigger view-specific initialization if needed
        this.initializeView(viewName);
    }

    updateActiveNav(viewName) {
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current nav link
        const activeLink = document.querySelector(`[data-view="${viewName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updateURL(viewName) {
        window.location.hash = viewName;
    }

    closeMobileSidebar() {
        if (window.innerWidth <= 768) {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove('open');
        }
    }

    isValidView(viewName) {
        const validViews = ['models', 'server', 'settings', 'about'];
        return validViews.includes(viewName);
    }

    getViewTitle(viewName) {
        const titles = {
            'models': 'Models',
            'server': 'Server',
            'settings': 'Settings',
            'about': 'About'
        };
        return titles[viewName] || 'Ollama Wrapper';
    }

    initializeView(viewName) {
        // This method can be extended to initialize specific functionality
        // for each view when it becomes active
        switch (viewName) {
            case 'models':
                this.initModelsView();
                break;
            case 'server':
                this.initServerView();
                break;
            case 'settings':
                this.initSettingsView();
                break;
            case 'about':
                this.initAboutView();
                break;
        }
    }

    initModelsView() {
        // Initialize models view functionality
        console.log('Models view initialized');
        // TODO: Load and display available models
    }

    initServerView() {
        // Initialize server view functionality
        console.log('Server view initialized');
        // TODO: Check server status and display metrics
    }

    initSettingsView() {
        // Initialize settings view functionality
        console.log('Settings view initialized');
        // TODO: Load and display current settings
    }

    initAboutView() {
        // Initialize about view functionality
        console.log('About view initialized');
        // TODO: Load version info and other details
    }
}

// Settings manager for configuration and preferences
class SettingsManager {
    constructor() {
        this.defaultSettings = {
            serverUrl: 'http://localhost:11434',
            apiTimeout: 30,
            maxRetries: 3,
            theme: 'light',
            autoConnect: false,
            saveLogs: false,
            modelCacheSize: 1000
        };
        this.settings = this.loadSettings();
        this.initializeSettings();
    }

    // Load settings from localStorage
    loadSettings() {
        try {
            const stored = localStorage.getItem('ollamaWrapperSettings');
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...this.defaultSettings, ...parsed };
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
        return { ...this.defaultSettings };
    }

    // Save settings to localStorage
    saveSettings(newSettings = null) {
        try {
            const settingsToSave = newSettings || this.settings;
            localStorage.setItem('ollamaWrapperSettings', JSON.stringify(settingsToSave));
            this.settings = settingsToSave;
            return true;
        } catch (error) {
            console.error('Error saving settings:', error);
            return false;
        }
    }

    // Get a specific setting
    getSetting(key) {
        return this.settings[key];
    }

    // Set a specific setting
    setSetting(key, value) {
        this.settings[key] = value;
        return this.saveSettings();
    }

    // Reset to default settings
    resetToDefaults() {
        this.settings = { ...this.defaultSettings };
        return this.saveSettings();
    }

    // Initialize settings functionality
    initializeSettings() {
        this.applyTheme();
        this.setupSettingsEventListeners();
        // Delay form population to ensure DOM is ready
        setTimeout(() => this.populateSettingsForm(), 100);
        if (this.settings.autoConnect) {
            // Auto-connect functionality
            setTimeout(() => this.testConnection(), 1000);
        }
    }

    // Apply theme setting
    applyTheme() {
        const theme = this.settings.theme;
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }

    // Setup settings event listeners
    setupSettingsEventListeners() {
        // Wait for DOM to be ready, then set up listeners
        const setupListeners = () => {
            // Settings form submission
            const settingsForm = document.getElementById('settings-form');
            if (settingsForm) {
                settingsForm.addEventListener('submit', (e) => this.handleSettingsSubmit(e));
            }

            // Reset button
            const resetBtn = document.getElementById('reset-btn');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => this.handleReset());
            }

            // Connection test button
            const testConnectionBtn = document.getElementById('test-connection-btn');
            if (testConnectionBtn) {
                testConnectionBtn.addEventListener('click', () => this.testConnection());
            }

            // Theme change listener
            const themeSelect = document.getElementById('theme');
            if (themeSelect) {
                themeSelect.addEventListener('change', (e) => {
                    this.setSetting('theme', e.target.value);
                    this.applyTheme();
                });
            }

            // Real-time validation
            this.setupValidation();

            // Listen for system theme changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (this.settings.theme === 'auto') {
                    this.applyTheme();
                }
            });
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupListeners);
        } else {
            setupListeners();
        }
    }

    // Setup form validation
    setupValidation() {
        const inputs = document.querySelectorAll('#settings-form input, #settings-form select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    // Populate settings form with current values
    populateSettingsForm() {
        Object.keys(this.settings).forEach(key => {
            const element = document.getElementById(this.camelToKebab(key));
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = this.settings[key];
                } else {
                    element.value = this.settings[key];
                }
            }
        });
    }

    // Convert camelCase to kebab-case
    camelToKebab(str) {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    }

    // Convert kebab-case to camelCase
    kebabToCamel(str) {
        return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }

    // Validate individual field
    validateField(input) {
        const value = input.type === 'checkbox' ? input.checked : input.value;
        const name = input.name;
        let isValid = true;
        let errorMessage = '';

        switch (name) {
            case 'serverUrl':
                isValid = this.validateUrl(value);
                errorMessage = isValid ? '' : 'Please enter a valid URL (e.g., http://localhost:11434)';
                break;
            case 'apiTimeout':
                isValid = value >= 1 && value <= 300;
                errorMessage = isValid ? '' : 'Timeout must be between 1 and 300 seconds';
                break;
            case 'maxRetries':
                isValid = value >= 0 && value <= 10;
                errorMessage = isValid ? '' : 'Retries must be between 0 and 10';
                break;
            case 'modelCacheSize':
                isValid = !value || (value >= 100 && value <= 10000);
                errorMessage = isValid ? '' : 'Cache size must be between 100 and 10000 MB';
                break;
        }

        this.showFieldError(input, isValid ? '' : errorMessage);
        return isValid;
    }

    // Validate URL format
    validateUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    // Show field error
    showFieldError(input, message) {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
        input.classList.toggle('error', !!message);
    }

    // Clear field error
    clearError(input) {
        this.showFieldError(input, '');
    }

    // Handle settings form submission
    handleSettingsSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const form = e.target;
        const inputs = form.querySelectorAll('input, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showMessage('Please fix the validation errors above.', 'error');
            return;
        }

        // Collect form data
        const formData = new FormData(form);
        const newSettings = {};

        for (const [key, value] of formData.entries()) {
            const camelKey = this.kebabToCamel(key);
            if (key === 'autoConnect' || key === 'saveLogs') {
                newSettings[camelKey] = true; // Checkbox is only in FormData if checked
            } else if (key === 'apiTimeout' || key === 'maxRetries' || key === 'modelCacheSize') {
                newSettings[camelKey] = parseInt(value, 10);
            } else {
                newSettings[camelKey] = value;
            }
        }

        // Handle unchecked checkboxes
        ['autoConnect', 'saveLogs'].forEach(field => {
            if (!(field in newSettings)) {
                newSettings[field] = false;
            }
        });

        // Save settings
        if (this.saveSettings({ ...this.settings, ...newSettings })) {
            this.showMessage('Settings saved successfully!', 'success');
            this.applyTheme(); // Reapply theme in case it changed
        } else {
            this.showMessage('Failed to save settings. Please try again.', 'error');
        }
    }

    // Handle reset to defaults
    handleReset() {
        if (confirm('Are you sure you want to reset all settings to their default values?')) {
            if (this.resetToDefaults()) {
                this.populateSettingsForm();
                this.applyTheme();
                this.showMessage('Settings reset to defaults.', 'success');
            } else {
                this.showMessage('Failed to reset settings. Please try again.', 'error');
            }
        }
    }

    // Test connection to Ollama server
    async testConnection() {
        const statusIndicator = document.getElementById('connection-status');
        const statusText = statusIndicator?.querySelector('.status-text');
        const testButton = document.getElementById('test-connection-btn');
        
        if (!statusIndicator || !statusText) return;
        
        // Update UI to show testing state
        statusText.textContent = 'Testing...';
        statusIndicator.className = 'status-indicator testing';
        if (testButton) testButton.disabled = true;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.settings.apiTimeout * 1000);

            const response = await fetch(`${this.settings.serverUrl}/api/tags`, {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                statusText.textContent = 'Connected';
                statusIndicator.className = 'status-indicator connected';
                this.showMessage('Successfully connected to Ollama server!', 'success');
            } else {
                throw new Error(`Server responded with status: ${response.status}`);
            }
        } catch (error) {
            statusText.textContent = 'Disconnected';
            statusIndicator.className = 'status-indicator disconnected';
            
            let errorMessage = 'Failed to connect to Ollama server. ';
            if (error.name === 'AbortError') {
                errorMessage += 'Request timed out.';
            } else if (error.message.includes('fetch')) {
                errorMessage += 'Please check the server URL and ensure Ollama is running.';
            } else {
                errorMessage += error.message;
            }
            
            this.showMessage(errorMessage, 'error');
        } finally {
            if (testButton) testButton.disabled = false;
        }
    }

    // Show temporary message
    showMessage(text, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;

        // Insert message at the top of the settings view
        const settingsView = document.getElementById('settings-view');
        const viewContent = settingsView?.querySelector('.view-content');
        if (viewContent) {
            viewContent.insertBefore(message, viewContent.firstElementChild);

            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (message.parentNode) {
                    message.remove();
                }
            }, 5000);
        }
    }
}

// Utility functions for future enhancements
const Utils = {
    // Format file sizes
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

    // Format timestamps
    formatTime(timestamp) {
        return new Date(timestamp).toLocaleString();
    },

    // Show toast notifications (for future use)
    showToast(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        // TODO: Implement actual toast notifications
    },

    // Debounce function for search and other inputs
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ollamaApp = new OllamaWrapperApp();
    window.settingsManager = new SettingsManager();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OllamaWrapperApp, Utils };
}