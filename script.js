// Default settings configuration
const DEFAULT_SETTINGS = {
    serverUrl: 'http://localhost:11434',
    apiTimeout: 30,
    maxRetries: 3,
    theme: 'light',
    autoConnect: false,
    saveLogs: false,
    modelCacheSize: 1000
};

// Settings manager class
class SettingsManager {
    constructor() {
        this.settings = this.loadSettings();
        this.initializeApp();
    }

    // Load settings from localStorage
    loadSettings() {
        try {
            const stored = localStorage.getItem('ollamaWrapperSettings');
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...DEFAULT_SETTINGS, ...parsed };
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
        return { ...DEFAULT_SETTINGS };
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
        this.settings = { ...DEFAULT_SETTINGS };
        return this.saveSettings();
    }

    // Initialize the application
    initializeApp() {
        this.applyTheme();
        this.setupEventListeners();
        this.populateSettingsForm();
        if (this.settings.autoConnect) {
            this.testConnection();
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

    // Setup event listeners
    setupEventListeners() {
        // Navigation
        document.getElementById('home-btn').addEventListener('click', () => this.showView('home'));
        document.getElementById('settings-btn').addEventListener('click', () => this.showView('settings'));

        // Settings form
        document.getElementById('settings-form').addEventListener('submit', (e) => this.handleSettingsSubmit(e));
        document.getElementById('reset-btn').addEventListener('click', () => this.handleReset());

        // Connection test
        document.getElementById('test-connection-btn').addEventListener('click', () => this.testConnection());

        // Theme change listener
        document.getElementById('theme').addEventListener('change', (e) => {
            this.setSetting('theme', e.target.value);
            this.applyTheme();
        });

        // Real-time validation
        this.setupValidation();

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (this.settings.theme === 'auto') {
                this.applyTheme();
            }
        });
    }

    // Setup form validation
    setupValidation() {
        const inputs = document.querySelectorAll('#settings-form input, #settings-form select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    // Show specific view
    showView(viewName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${viewName}-btn`).classList.add('active');

        // Update views
        document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
        document.getElementById(`${viewName}-view`).classList.add('active');
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
        const statusText = statusIndicator.querySelector('.status-text');
        const testButton = document.getElementById('test-connection-btn');
        
        // Update UI to show testing state
        statusText.textContent = 'Testing...';
        statusIndicator.className = 'status-indicator testing';
        testButton.disabled = true;

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
            testButton.disabled = false;
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

        // Insert message at the top of the active view
        const activeView = document.querySelector('.view.active');
        const firstChild = activeView.firstElementChild;
        activeView.insertBefore(message, firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.settingsManager = new SettingsManager();
});