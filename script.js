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