// Global state
let autoRefreshInterval = null;
let errorFilter = 'all';

// Mock data for demonstration
const mockLogs = [
    { timestamp: new Date().toISOString(), level: 'INFO', message: 'Ollama server starting...' },
    { timestamp: new Date(Date.now() - 1000).toISOString(), level: 'INFO', message: 'Server listening on port 11434' },
    { timestamp: new Date(Date.now() - 2000).toISOString(), level: 'INFO', message: 'Model loading: llama2' },
    { timestamp: new Date(Date.now() - 5000).toISOString(), level: 'SUCCESS', message: 'Model llama2 loaded successfully' },
    { timestamp: new Date(Date.now() - 10000).toISOString(), level: 'INFO', message: 'API endpoint ready' }
];

const mockErrors = [
    {
        timestamp: new Date(Date.now() - 300000).toISOString(),
        level: 'critical',
        title: 'Model loading failed',
        error: 'Failed to load model \'llama2\': insufficient memory',
        stack: 'ModelLoader.load() at line 45',
        suggestion: 'Free up system memory or use a smaller model'
    },
    {
        timestamp: new Date(Date.now() - 180000).toISOString(),
        level: 'warning',
        title: 'High memory usage',
        error: 'Memory usage at 85% of available RAM',
        stack: 'Current usage: 6.8GB / 8GB',
        suggestion: 'Consider closing other applications or using a smaller model'
    },
    {
        timestamp: new Date(Date.now() - 60000).toISOString(),
        level: 'error',
        title: 'Connection timeout',
        error: 'Request to model endpoint timed out after 30 seconds',
        stack: 'HttpClient.request() at line 127',
        suggestion: 'Check network connectivity and server status'
    }
];

// Tab switching functionality
function openTab(evt, tabName) {
    // Hide all tab content
    const tabContent = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].classList.remove('active');
    }

    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    // Show the selected tab content and mark button as active
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Log management functions
function refreshLogs() {
    const logsContainer = document.getElementById('serverLogs');
    
    // Simulate fetching new logs
    const newLog = {
        timestamp: new Date().toISOString(),
        level: ['INFO', 'SUCCESS', 'WARNING'][Math.floor(Math.random() * 3)],
        message: [
            'Processing request from client',
            'Model inference completed',
            'Cache cleared successfully',
            'New connection established',
            'Background task completed'
        ][Math.floor(Math.random() * 5)]
    };
    
    mockLogs.unshift(newLog);
    
    // Keep only last 50 logs
    if (mockLogs.length > 50) {
        mockLogs.splice(50);
    }
    
    displayLogs();
    
    // Show refresh feedback
    const refreshBtn = event.target;
    const originalText = refreshBtn.textContent;
    refreshBtn.textContent = 'Refreshed!';
    refreshBtn.style.background = '#38a169';
    setTimeout(() => {
        refreshBtn.textContent = originalText;
        refreshBtn.style.background = '';
    }, 1000);
}

function clearLogs() {
    if (confirm('Are you sure you want to clear all logs?')) {
        document.getElementById('serverLogs').innerHTML = '<div class="log-entry info"><span class="timestamp">[' + new Date().toISOString().replace('T', ' ').substring(0, 19) + ']</span><span class="level">INFO</span><span class="message">Logs cleared</span></div>';
    }
}

function displayLogs() {
    const logsContainer = document.getElementById('serverLogs');
    logsContainer.innerHTML = '';
    
    mockLogs.forEach(log => {
        const logEntry = createLogEntry(log);
        logsContainer.appendChild(logEntry);
    });
    
    // Auto-scroll to top for new entries
    logsContainer.scrollTop = 0;
}

function createLogEntry(log) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${log.level.toLowerCase()}`;
    
    const timestamp = new Date(log.timestamp);
    const formattedTime = timestamp.toISOString().replace('T', ' ').substring(0, 19);
    
    entry.innerHTML = `
        <span class="timestamp">[${formattedTime}]</span>
        <span class="level">${log.level}</span>
        <span class="message">${log.message}</span>
    `;
    
    return entry;
}

function toggleAutoRefresh() {
    const checkbox = document.getElementById('autoRefresh');
    
    if (checkbox.checked) {
        autoRefreshInterval = setInterval(refreshLogs, 5000); // Refresh every 5 seconds
        console.log('Auto-refresh enabled');
    } else {
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
            autoRefreshInterval = null;
        }
        console.log('Auto-refresh disabled');
    }
}

// Error management functions
function refreshErrors() {
    // Simulate checking for new errors
    const possibleNewErrors = [
        {
            timestamp: new Date().toISOString(),
            level: 'warning',
            title: 'Slow response time',
            error: 'API response time exceeded 5 seconds',
            stack: 'ResponseHandler.process() at line 89',
            suggestion: 'Check server load and consider using a smaller model'
        },
        {
            timestamp: new Date().toISOString(),
            level: 'error',
            title: 'Rate limit exceeded',
            error: 'Too many requests in the last minute',
            stack: 'RateLimiter.check() at line 23',
            suggestion: 'Reduce request frequency or increase rate limits'
        }
    ];
    
    // Randomly add a new error (30% chance)
    if (Math.random() < 0.3) {
        const newError = possibleNewErrors[Math.floor(Math.random() * possibleNewErrors.length)];
        mockErrors.unshift(newError);
        
        // Keep only last 20 errors
        if (mockErrors.length > 20) {
            mockErrors.splice(20);
        }
    }
    
    displayErrors();
    
    // Show refresh feedback
    const refreshBtn = event.target;
    const originalText = refreshBtn.textContent;
    refreshBtn.textContent = 'Refreshed!';
    refreshBtn.style.background = '#38a169';
    setTimeout(() => {
        refreshBtn.textContent = originalText;
        refreshBtn.style.background = '';
    }, 1000);
}

function clearErrors() {
    if (confirm('Are you sure you want to clear all errors?')) {
        mockErrors.length = 0;
        document.getElementById('errorList').innerHTML = '<div style="text-align: center; color: #a0aec0; padding: 40px;">No errors to display</div>';
    }
}

function filterErrors() {
    const filterValue = document.getElementById('errorFilter').value;
    errorFilter = filterValue;
    displayErrors();
}

function displayErrors() {
    const errorContainer = document.getElementById('errorList');
    errorContainer.innerHTML = '';
    
    const filteredErrors = errorFilter === 'all' 
        ? mockErrors 
        : mockErrors.filter(error => error.level === errorFilter);
    
    if (filteredErrors.length === 0) {
        errorContainer.innerHTML = '<div style="text-align: center; color: #a0aec0; padding: 40px;">No errors matching the current filter</div>';
        return;
    }
    
    filteredErrors.forEach(error => {
        const errorEntry = createErrorEntry(error);
        errorContainer.appendChild(errorEntry);
    });
}

function createErrorEntry(error) {
    const entry = document.createElement('div');
    entry.className = `error-entry ${error.level}`;
    
    const timestamp = new Date(error.timestamp);
    const formattedTime = timestamp.toISOString().replace('T', ' ').substring(0, 19);
    
    entry.innerHTML = `
        <div class="error-header">
            <span class="timestamp">[${formattedTime}]</span>
            <span class="level ${error.level}">${error.level.toUpperCase()}</span>
            <span class="error-title">${error.title}</span>
        </div>
        <div class="error-details">
            <p><strong>Error:</strong> ${error.error}</p>
            <p><strong>Stack:</strong> ${error.stack}</p>
            <p><strong>Suggestion:</strong> ${error.suggestion}</p>
        </div>
    `;
    
    return entry;
}

// System monitoring functions (mock implementations)
function checkOllamaConnection() {
    // In a real implementation, this would make an API call to Ollama
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Math.random() > 0.1); // 90% success rate
        }, 1000);
    });
}

function getSystemStats() {
    // Mock system statistics
    return {
        memoryUsage: Math.floor(Math.random() * 100),
        cpuUsage: Math.floor(Math.random() * 100),
        diskUsage: Math.floor(Math.random() * 100),
        activeConnections: Math.floor(Math.random() * 10)
    };
}

// Real-time updates simulation
function simulateRealTimeUpdates() {
    // Add a new log entry every 10-30 seconds
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance
            const messages = [
                'Heartbeat check completed',
                'Model cache updated',
                'Background maintenance completed',
                'Client connection established',
                'Request processed successfully'
            ];
            
            const newLog = {
                timestamp: new Date().toISOString(),
                level: ['INFO', 'SUCCESS'][Math.floor(Math.random() * 2)],
                message: messages[Math.floor(Math.random() * messages.length)]
            };
            
            mockLogs.unshift(newLog);
            if (mockLogs.length > 50) {
                mockLogs.splice(50);
            }
            
            // Only update display if we're on the logs tab and auto-refresh is off
            const logsTab = document.getElementById('logs');
            const autoRefreshEnabled = document.getElementById('autoRefresh').checked;
            
            if (logsTab.classList.contains('active') && !autoRefreshEnabled) {
                displayLogs();
            }
        }
    }, 15000);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize logs display
    displayLogs();
    
    // Initialize errors display
    displayErrors();
    
    // Start real-time updates simulation
    simulateRealTimeUpdates();
    
    // Check connection status
    checkOllamaConnection().then(connected => {
        if (!connected) {
            // Add connection error to the error list
            const connectionError = {
                timestamp: new Date().toISOString(),
                level: 'critical',
                title: 'Connection to Ollama server failed',
                error: 'Unable to establish connection to Ollama API',
                stack: 'ConnectionManager.connect() at line 156',
                suggestion: 'Ensure Ollama server is running and accessible on localhost:11434'
            };
            mockErrors.unshift(connectionError);
            displayErrors();
        }
    });
    
    console.log('Ollama Wrapper initialized successfully');
});

// Utility functions for potential API integration
function formatLogLevel(level) {
    const levelMap = {
        'debug': 'DEBUG',
        'info': 'INFO',
        'warn': 'WARNING',
        'error': 'ERROR',
        'fatal': 'CRITICAL'
    };
    return levelMap[level.toLowerCase()] || level.toUpperCase();
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toISOString().replace('T', ' ').substring(0, 19);
}

// Export functions for potential use in other modules
window.OllamaWrapper = {
    refreshLogs,
    clearLogs,
    refreshErrors,
    clearErrors,
    filterErrors,
    toggleAutoRefresh,
    openTab
};