// ===================================
// ZYEL LAB - Terminal Interface Script
// ===================================

// Typing Animation Configuration
const typingSpeed = 50;
const deletingSpeed = 30;
const pauseDuration = 1000;

// Text content for typing animation
const heroTexts = {
    title: "public ai + crypto experiment lab",
    subtitle: "building in public. documenting failures.",
    description: "I build small systems, break them, and document what I learn."
};

const helpCommand = "type 'help' to start";

// ===================================
// Hamburger Menu Toggle
// ===================================
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close for external links
        if (link.getAttribute('target') !== '_blank') {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target) && sidebar.classList.contains('active')) {
        hamburger.classList.remove('active');
        sidebar.classList.remove('active');
    }
});

// ===================================
// Typing Animation Engine
// ===================================
class TypeWriter {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.charIndex = 0;
    }

    async type() {
        return new Promise(resolve => {
            const interval = setInterval(() => {
                if (this.charIndex < this.text.length) {
                    this.element.textContent += this.text.charAt(this.charIndex);
                    this.charIndex++;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, this.speed);
        });
    }

    async delete() {
        return new Promise(resolve => {
            const interval = setInterval(() => {
                if (this.element.textContent.length > 0) {
                    this.element.textContent = this.element.textContent.slice(0, -1);
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, deletingSpeed);
        });
    }
}

// ===================================
// Initialize Typing Animations
// ===================================
async function initTypewriting() {
    const titleElement = document.getElementById('typed-title');
    const subtitleElement = document.getElementById('typed-subtitle');
    const descriptionElement = document.getElementById('typed-description');
    const commandElement = document.getElementById('help-command');

    // Type hero texts in sequence
    await new Promise(resolve => setTimeout(resolve, 500)); // Initial delay
    
    const titleWriter = new TypeWriter(titleElement, heroTexts.title, typingSpeed);
    await titleWriter.type();
    await new Promise(resolve => setTimeout(resolve, 300));

    const subtitleWriter = new TypeWriter(subtitleElement, heroTexts.subtitle, typingSpeed - 10);
    await subtitleWriter.type();
    await new Promise(resolve => setTimeout(resolve, 300));

    const descriptionWriter = new TypeWriter(descriptionElement, heroTexts.description, typingSpeed - 5);
    await descriptionWriter.type();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Type help command
    const commandWriter = new TypeWriter(commandElement, helpCommand, typingSpeed + 20);
    await commandWriter.type();
}

// ===================================
// Fake CLI Command Handler
// ===================================
const commandElement = document.getElementById('help-command');

// Simulate command execution on Enter key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && commandElement.textContent === helpCommand) {
        executeHelpCommand();
    }
});

// Click on command to execute
if (commandElement) {
    commandElement.style.cursor = 'pointer';
    commandElement.addEventListener('click', executeHelpCommand);
}

async function executeHelpCommand() {
    const commandWriter = new TypeWriter(commandElement, '', 0);
    await commandWriter.delete();
    
    commandElement.textContent = 'help';
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Scroll to about section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Reset command after delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    commandElement.textContent = '';
    const resetWriter = new TypeWriter(commandElement, helpCommand, typingSpeed + 20);
    await resetWriter.type();
}

// ===================================
// Update Last Modified Timestamp
// ===================================
function updateTimestamp() {
    const timestampElement = document.getElementById('last-update');
    if (timestampElement) {
        const now = new Date();
        const formatted = now.toISOString().split('T')[0] + ' ' + 
                         now.toTimeString().split(' ')[0];
        timestampElement.textContent = formatted;
    }
}

// ===================================
// Smooth Scroll for Navigation
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or external link
        if (href === '#' || this.getAttribute('target') === '_blank') {
            return;
        }
        
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Console Easter Egg
// ===================================
console.log('%c███████╗██╗   ██╗███████╗██╗         ██╗      █████╗ ██████╗ ', 'color: #00ff88; font-family: monospace;');
console.log('%c╚══███╔╝╚██╗ ██╔╝██╔════╝██║         ██║     ██╔══██╗██╔══██╗', 'color: #00ff88; font-family: monospace;');
console.log('%c  ███╔╝  ╚████╔╝ █████╗  ██║         ██║     ███████║██████╔╝', 'color: #00ff88; font-family: monospace;');
console.log('%c ███╔╝    ╚██╔╝  ██╔══╝  ██║         ██║     ██╔══██║██╔══██╗', 'color: #00ff88; font-family: monospace;');
console.log('%c███████╗   ██║   ███████╗███████╗    ███████╗██║  ██║██████╔╝', 'color: #00ff88; font-family: monospace;');
console.log('%c╚══════╝   ╚═╝   ╚══════╝╚══════╝    ╚══════╝╚═╝  ╚═╝╚═════╝ ', 'color: #00ff88; font-family: monospace;');
console.log('%c\nzyel@lab:~$ Welcome to the lab', 'color: #00ff88; font-weight: bold;');
console.log('%cType commands: help, experiments, log, playground', 'color: #00cc6a;');
console.log('%c\n[!] Looking for something? Check the source code ;)', 'color: #ffcc00;');

// Console commands simulation
window.help = () => {
    console.log('%c\nAvailable sections:', 'color: #00ff88; font-weight: bold;');
    console.log('%c  > about        - Learn about this lab', 'color: #00cc6a;');
    console.log('%c  > experiments  - View active experiments', 'color: #00cc6a;');
    console.log('%c  > log          - Read experiment logs', 'color: #00cc6a;');
    console.log('%c  > playground   - Try interactive demos', 'color: #00cc6a;');
    return '→ Use navigation menu or scroll down';
};

window.experiments = () => {
    document.getElementById('experiments').scrollIntoView({ behavior: 'smooth' });
    return '→ Scrolling to experiments...';
};

window.log = () => {
    document.getElementById('log').scrollIntoView({ behavior: 'smooth' });
    return '→ Scrolling to log...';
};

window.playground = () => {
    document.getElementById('playground').scrollIntoView({ behavior: 'smooth' });
    return '→ Scrolling to playground...';
};

// ===================================
// Initialize on DOM Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    updateTimestamp();
    initTypewriting();
    
    // Update timestamp every minute
    setInterval(updateTimestamp, 60000);
    
    // Add glitch effect on random intervals (subtle)
    setInterval(() => {
        if (Math.random() > 0.95) { // 5% chance every 3 seconds
            document.body.style.animation = 'glitch 0.1s';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 100);
        }
    }, 3000);
});

// ===================================
// Keyboard Shortcuts
// ===================================
document.addEventListener('keydown', (e) => {
    // Alt + M: Toggle menu
    if (e.altKey && e.key === 'm') {
        e.preventDefault();
        hamburger.click();
    }
    
    // Alt + 1-5: Navigate to sections
    if (e.altKey && ['1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        const sections = ['about', 'experiments', 'log', 'playground'];
        const index = parseInt(e.key) - 1;
        if (sections[index]) {
            document.getElementById(sections[index])?.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add subtle glitch animation to CSS (injected dynamically)
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translateX(0); }
        20% { transform: translateX(-2px); }
        40% { transform: translateX(2px); }
        60% { transform: translateX(-1px); }
        80% { transform: translateX(1px); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(style);

// ===================================
// Performance: Lazy Load Sections
// ===================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for lazy animation
document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});
