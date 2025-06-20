// Enhanced CodeShare Galaxy Script
class CodeShareGalaxy {
  constructor() {
    this.textarea = document.getElementById('codeArea');
    this.downloadBtn = document.getElementById('downloadBtn');
    this.clearBtn = document.getElementById('clearBtn');
    this.copyBtn = document.getElementById('copyBtn');
    this.themeBtn = document.getElementById('themeBtn');
    this.sessionLink = document.getElementById('sessionLink');
    this.userCount = document.getElementById('userCount');
    this.charCount = document.getElementById('charCount');
    this.cursorPosition = document.getElementById('cursorPosition');
    this.lastSaved = document.getElementById('lastSaved');
    this.lineNumbers = document.getElementById('lineNumbers');
    this.languageSelect = document.getElementById('languageSelect');
    this.fullscreenBtn = document.getElementById('fullscreenBtn');
    
    this.sessionId = this.generateSessionId();
    this.currentTheme = 'galaxy';
    this.userList = new Set();
    this.lastSaveTime = Date.now();
    
    this.init();
  }

  init() {
    this.setupSession();
    this.setupEventListeners();
    this.createParticles();
    this.updateLineNumbers();
    this.startAutoSave();
    this.updateStatus();
  }

  generateSessionId() {
    // Generate a beautiful session ID
    const adjectives = ['cosmic', 'stellar', 'galactic', 'nebular', 'astral'];
    const nouns = ['void', 'star', 'galaxy', 'comet', 'nova'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 1000);
    return `${adj}-${noun}-${num}`;
  }

  setupSession() {
    // Update URL and session link
    const currentUrl = window.location.origin;
    const sessionUrl = `${currentUrl}/${this.sessionId}`;
    this.sessionLink.textContent = sessionUrl;
    
    // Simulate WebSocket connection (since we can't use real WebSocket in artifacts)
    this.simulateConnection();
  }

  simulateConnection() {
    // Simulate real-time collaboration
    this.showToast('Connected to galaxy session! 🌌', 'success');
    
    // Simulate other users joining occasionally
    setTimeout(() => {
      this.userList.add('Anonymous Astronaut');
      this.updateUserCount();
      this.showToast('Another coder joined the galaxy! 👋', 'info');
    }, 5000);
  }

  setupEventListeners() {
    // Textarea events
    this.textarea.addEventListener('input', () => {
      this.updateLineNumbers();
      this.updateStatus();
      this.simulateRealTimeSync();
    });

    this.textarea.addEventListener('scroll', () => {
      this.lineNumbers.scrollTop = this.textarea.scrollTop;
    });

    this.textarea.addEventListener('click', () => {
      this.updateCursorPosition();
    });

    this.textarea.addEventListener('keyup', () => {
      this.updateCursorPosition();
    });

    // Button events
    this.downloadBtn.addEventListener('click', () => this.downloadCode());
    this.clearBtn.addEventListener('click', () => this.clearCode());
    this.copyBtn.addEventListener('click', () => this.copySessionLink());
    this.themeBtn.addEventListener('click', () => this.toggleTheme());
    this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

    // Language select
    this.languageSelect.addEventListener('change', () => {
      this.updateLanguageMode();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 's':
            e.preventDefault();
            this.saveCode();
            break;
          case 'd':
            e.preventDefault();
            this.downloadCode();
            break;
          case 'k':
            e.preventDefault();
            this.clearCode();
            break;
        }
      }
    });
  }

  updateLineNumbers() {
    const lines = this.textarea.value.split('\n').length;
    let lineNumbersHtml = '';
    
    for (let i = 1; i <= Math.max(lines, 20); i++) {
      lineNumbersHtml += `${i}\n`;
    }
    
    this.lineNumbers.textContent = lineNumbersHtml;
  }

  updateStatus() {
    // Update character count
    const text = this.textarea.value;
    this.charCount.textContent = `${text.length} characters`;
  }

  updateCursorPosition() {
    const textarea = this.textarea;
    const text = textarea.value;
    const cursorPos = textarea.selectionStart;
    
    const textBeforeCursor = text.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    
    this.cursorPosition.textContent = `Ln ${line}, Col ${col}`;
  }

  updateUserCount() {
    this.userCount.textContent = this.userList.size + 1; // +1 for current user
  }

  simulateRealTimeSync() {
    // Simulate real-time synchronization
    const indicator = document.querySelector('.connected');
    if (indicator) {
      indicator.style.color = '#f39c12';
      setTimeout(() => {
        indicator.style.color = '#4cd964';
      }, 200);
    }
  }

  downloadCode() {
    const text = this.textarea.value || '// Your amazing code here';
    const language = this.languageSelect.value;
    const extension = this.getFileExtension(language);
    const filename = `${this.sessionId}.${extension}`;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    
    this.showToast('Code downloaded successfully! 📁', 'success');
  }

  getFileExtension(language) {
    const extensions = {
      'javascript': 'js',
      'python': 'py',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'markdown': 'md'
    };
    return extensions[language] || 'txt';
  }

  clearCode() {
    if (this.textarea.value.trim() === '') {
      this.showToast('Nothing to clear! ✨', 'info');
      return;
    }

    if (confirm('Are you sure you want to clear all code? This action cannot be undone.')) {
      this.textarea.value = '';
      this.updateLineNumbers();
      this.updateStatus();
      this.updateCursorPosition();
      this.showToast('Code cleared! Ready for new cosmic creations! 🌟', 'success');
    }
  }

  copySessionLink() {
    const link = this.sessionLink.textContent;
    
    // Create temporary textarea for copying
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = link;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    
    this.showToast('Session link copied to clipboard! 📋', 'success');
    
    // Animate copy button
    const icon = this.copyBtn.querySelector('i');
    icon.className = 'fas fa-check';
    setTimeout(() => {
      icon.className = 'fas fa-copy';
    }, 2000);
  }

  toggleTheme() {
    // Cycle through different galaxy themes
    const themes = ['galaxy', 'nebula', 'void', 'supernova'];
    const currentIndex = themes.indexOf(this.currentTheme);
    this.currentTheme = themes[(currentIndex + 1) % themes.length];
    
    this.applyTheme(this.currentTheme);
    this.showToast(`Switched to ${this.currentTheme} theme! 🎨`, 'info');
  }

  applyTheme(theme) {
    const body = document.body;
    const galaxyBg = document.querySelector('.galaxy-bg');
    
    body.className = `theme-${theme}`;
    
    switch(theme) {
      case 'nebula':
        galaxyBg.style.background = 'radial-gradient(ellipse at center, rgba(255, 107, 107, 0.3) 0%, rgba(238, 90, 82, 0.2) 25%, rgba(139, 69, 19, 0.1) 50%, #000 70%)';
        break;
      case 'void':
        galaxyBg.style.background = 'radial-gradient(ellipse at center, rgba(108, 92, 231, 0.3) 0%, rgba(72, 61, 139, 0.2) 25%, rgba(25, 25, 112, 0.1) 50%, #000 70%)';
        break;
      case 'supernova':
        galaxyBg.style.background = 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.3) 0%, rgba(255, 140, 0, 0.2) 25%, rgba(255, 69, 0, 0.1) 50%, #000 70%)';
        break;
      default: // galaxy
        galaxyBg.style.background = 'radial-gradient(ellipse at center, rgba(147, 39, 143, 0.3) 0%, rgba(68, 21, 99, 0.2) 25%, rgba(25, 7, 49, 0.1) 50%, #000 70%)';
    }
  }

  toggleFullscreen() {
    const editorContainer = document.querySelector('.editor-container');
    const icon = this.fullscreenBtn.querySelector('i');
    
    if (!document.fullscreenElement) {
      editorContainer.requestFullscreen().then(() => {
        icon.className = 'fas fa-compress';
        this.showToast('Entered fullscreen mode! Press Esc to exit', 'info');
      });
    } else {
      document.exitFullscreen().then(() => {
        icon.className = 'fas fa-expand';
      });
    }
  }

  updateLanguageMode() {
    const language = this.languageSelect.value;
    const tab = document.querySelector('.tab span');
    const extensions = {
      'javascript': 'main.js',
      'python': 'main.py',
      'html': 'index.html',
      'css': 'styles.css',
      'json': 'data.json',
      'markdown': 'README.md'
    };
    
    tab.textContent = extensions[language] || 'main.txt';
    this.showToast(`Switched to ${language.toUpperCase()} mode! 🔧`, 'info');
  }

  saveCode() {
    this.lastSaveTime = Date.now();
    this.lastSaved.textContent = 'Saved just now';
    this.showToast('Code auto-saved to the galaxy! ☁️', 'success');
  }

  startAutoSave() {
    setInterval(() => {
      if (this.textarea.value.trim() !== '') {
        this.saveCode();
      }
      this.updateLastSavedTime();
    }, 30000); // Auto-save every 30 seconds
  }

  updateLastSavedTime() {
    const timeDiff = Date.now() - this.lastSaveTime;
    const minutes = Math.floor(timeDiff / 60000);
    
    if (minutes < 1) {
      this.lastSaved.textContent = 'Saved just now';
    } else if (minutes === 1) {
      this.lastSaved.textContent = 'Saved 1 minute ago';
    } else {
      this.lastSaved.textContent = `Saved ${minutes} minutes ago`;
    }
  }

  createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Create floating particles
    setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every interval
        this.createParticle(particlesContainer);
      }
    }, 2000);
    
    // Create initial particles
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.createParticle(particlesContainer);
      }, i * 1000);
    }
  }

  createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random starting position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (10 + Math.random() * 10) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    // Random colors
    const colors = [
      'rgba(162, 155, 254, 0.8)',
      'rgba(253, 121, 168, 0.8)',
      'rgba(78, 205, 196, 0.8)',
      'rgba(255, 107, 107, 0.8)',
      'rgba(249, 202, 36, 0.8)'
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 15000);
  }

  showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 4 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.animation = 'slide-out 0.3s ease-in forwards';
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 300);
      }
    }, 4000);
  }

  // Simulate typing effect for demo
  simulateTyping() {
    const demoCode = `// Welcome to CodeShare Galaxy! 🌌
// This is a real-time collaborative code editor

function createGalaxy() {
  const stars = [];
  
  for (let i = 0; i < 1000; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      brightness: Math.random()
    });
  }
  
  return stars;
}

const galaxy = createGalaxy();
console.log('Galaxy created with', galaxy.length, 'stars! ✨');

// Start coding and see your changes sync in real-time!`;

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < demoCode.length) {
        this.textarea.value += demoCode[index];
        index++;
        this.updateLineNumbers();
        this.updateStatus();
        this.updateCursorPosition();
      } else {
        clearInterval(typeInterval);
      }
    }, 50);
  }
}

// Add slide-out animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slide-out {
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new CodeShareGalaxy();
  
  // Add welcome message
  setTimeout(() => {
    app.showToast('Welcome to CodeShare Galaxy! 🚀', 'success');
  }, 1000);
  
  // Optional: Uncomment to see typing demo
  // setTimeout(() => {
  //   app.simulateTyping();
  // }, 3000);
});

// Add some extra galaxy effects
document.addEventListener('mousemove', (e) => {
  const particles = document.querySelectorAll('.particle');
  particles.forEach(particle => {
    const rect = particle.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 100) {
      const force = (100 - distance) / 100;
      particle.style.transform = `translate(${dx * force * 0.1}px, ${dy * force * 0.1}px)`;
    }
  });
});

// Add keyboard sound effects (optional)
document.addEventListener('keydown', (e) => {
  if (e.target.id === 'codeArea') {
    // Create subtle typing sound effect using Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800 + Math.random() * 200, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Audio not supported, continue silently
    }
  }
});