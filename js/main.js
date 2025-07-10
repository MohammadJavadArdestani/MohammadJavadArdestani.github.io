// Main JavaScript for Mohammad Javad's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initDashboard();
    initContactForm();
    initScrollEffects();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Dashboard functionality with admin authentication and full CRUD operations
function initDashboard() {
    const dashboardToggle = document.getElementById('dashboardToggle');
    const dashboardModal = document.getElementById('dashboardModal');
    const closeDashboard = document.getElementById('closeDashboard');
    const contentEditor = document.getElementById('contentEditor');

    let currentEditingSection = null;
    let originalContent = {};
    let isAdmin = false;
    let currentAction = 'edit'; // 'edit', 'add', 'delete'

    // Hide dashboard toggle by default (admin-only)
    if (dashboardToggle) {
        dashboardToggle.style.display = 'none';
    }

    // Admin authentication function
    function authenticateAdmin() {
        const password = prompt('Enter admin password:');
        if (password === 'admin123') { // Change this to your desired password
            isAdmin = true;
            if (dashboardToggle) {
                dashboardToggle.style.display = 'flex';
            }
            if (adminLogin) {
                adminLogin.style.display = 'none';
            }
            showMessage('Admin access granted!', 'success');
            return true;
        } else {
            showMessage('Access denied!', 'error');
            return false;
        }
    }

    // Admin login button
    const adminLogin = document.getElementById('adminLogin');
    if (adminLogin) {
        adminLogin.addEventListener('click', function() {
            authenticateAdmin();
        });
    }

    // Show dashboard modal with authentication
    if (dashboardToggle) {
        dashboardToggle.addEventListener('click', function() {
            if (!isAdmin) {
                if (!authenticateAdmin()) {
                    return;
                }
            }
            dashboardModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close dashboard modal
    if (closeDashboard) {
        closeDashboard.addEventListener('click', function() {
            dashboardModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetEditor();
        });
    }

    // Close modal when clicking outside
    if (dashboardModal) {
        dashboardModal.addEventListener('click', function(e) {
            if (e.target === dashboardModal) {
                dashboardModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                resetEditor();
            }
        });
    }

    // Global functions for dashboard buttons
    window.editSection = function(sectionName) {
        if (!isAdmin) {
            showMessage('Admin access required!', 'error');
            return;
        }

        currentAction = 'edit';
        currentEditingSection = sectionName;
        const section = document.getElementById(sectionName);
        
        if (section) {
            // Store original content
            originalContent[sectionName] = section.innerHTML;
            
            // Extract content based on section type
            let content = '';
            
            switch(sectionName) {
                case 'about':
                    content = extractAboutContent(section);
                    break;
                case 'experience':
                    content = extractExperienceContent(section);
                    break;
                case 'research':
                    content = extractResearchContent(section);
                    break;
                case 'projects':
                    content = extractProjectsContent(section);
                    break;
                case 'presentations':
                    content = extractPresentationsContent(section);
                    break;
                case 'courses':
                    content = extractCoursesContent(section);
                    break;
                case 'teaching':
                    content = extractTeachingContent(section);
                    break;
                case 'awards':
                    content = extractAwardsContent(section);
                    break;
                case 'leadership':
                    content = extractLeadershipContent(section);
                    break;
                default:
                    content = section.innerHTML;
            }
            
            contentEditor.value = content;
            contentEditor.focus();
            updateEditorPlaceholder('edit');
        }
    };

    window.addComponent = function(sectionName) {
        if (!isAdmin) {
            showMessage('Admin access required!', 'error');
            return;
        }

        currentAction = 'add';
        currentEditingSection = sectionName;
        
        // Get template based on section type
        let template = getComponentTemplate(sectionName);
        contentEditor.value = template;
        contentEditor.focus();
        updateEditorPlaceholder('add');
    };

    window.deleteComponent = function(sectionName) {
        if (!isAdmin) {
            showMessage('Admin access required!', 'error');
            return;
        }

        currentAction = 'delete';
        currentEditingSection = sectionName;
        
        const section = document.getElementById(sectionName);
        if (section) {
            originalContent[sectionName] = section.innerHTML;
            
            // Show current content for reference
            let content = '';
            switch(sectionName) {
                case 'about':
                    content = extractAboutContent(section);
                    break;
                case 'experience':
                    content = extractExperienceContent(section);
                    break;
                case 'research':
                    content = extractResearchContent(section);
                    break;
                case 'projects':
                    content = extractProjectsContent(section);
                    break;
                case 'presentations':
                    content = extractPresentationsContent(section);
                    break;
                case 'courses':
                    content = extractCoursesContent(section);
                    break;
                case 'teaching':
                    content = extractTeachingContent(section);
                    break;
                case 'awards':
                    content = extractAwardsContent(section);
                    break;
                case 'leadership':
                    content = extractLeadershipContent(section);
                    break;
                default:
                    content = section.innerHTML;
            }
            
            contentEditor.value = content;
            updateEditorPlaceholder('delete');
        }
    };

    window.saveContent = function() {
        if (!isAdmin) {
            showMessage('Admin access required!', 'error');
            return;
        }

        if (!currentEditingSection) {
            showMessage('No section selected for editing!', 'error');
            return;
        }
        
        const section = document.getElementById(currentEditingSection);
        const newContent = contentEditor.value;
        
        if (section && newContent) {
            try {
                switch(currentAction) {
                    case 'edit':
                        // Apply content based on section type
                        switch(currentEditingSection) {
                            case 'about':
                                applyAboutContent(section, newContent);
                                break;
                            case 'experience':
                                applyExperienceContent(section, newContent);
                                break;
                            case 'research':
                                applyResearchContent(section, newContent);
                                break;
                            case 'projects':
                                applyProjectsContent(section, newContent);
                                break;
                            case 'presentations':
                                applyPresentationsContent(section, newContent);
                                break;
                            case 'courses':
                                applyCoursesContent(section, newContent);
                                break;
                            case 'teaching':
                                applyTeachingContent(section, newContent);
                                break;
                            case 'awards':
                                applyAwardsContent(section, newContent);
                                break;
                            case 'leadership':
                                applyLeadershipContent(section, newContent);
                                break;
                            default:
                                section.innerHTML = newContent;
                        }
                        showMessage('Content updated successfully!', 'success');
                        break;
                        
                    case 'add':
                        // Add new component to section
                        addComponentToSection(section, newContent, currentEditingSection);
                        showMessage('Component added successfully!', 'success');
                        break;
                        
                    case 'delete':
                        // Delete component from section
                        deleteComponentFromSection(section, newContent, currentEditingSection);
                        showMessage('Component deleted successfully!', 'success');
                        break;
                }
                
                // Save to localStorage for persistence
                saveToLocalStorage(currentEditingSection, section.innerHTML);
                
                resetEditor();
            } catch (error) {
                showMessage('Error updating content: ' + error.message, 'error');
            }
        } else {
            showMessage('No content to save!', 'error');
        }
    };

    window.cancelEdit = function() {
        if (currentEditingSection && originalContent[currentEditingSection]) {
            const section = document.getElementById(currentEditingSection);
            if (section) {
                section.innerHTML = originalContent[currentEditingSection];
            }
        }
        resetEditor();
        showMessage('Changes cancelled!', 'success');
    };

    function resetEditor() {
        contentEditor.value = '';
        currentEditingSection = null;
        currentAction = 'edit';
        originalContent = {};
        updateEditorPlaceholder('edit');
    }

    function updateEditorPlaceholder(action) {
        switch(action) {
            case 'edit':
                contentEditor.placeholder = 'Edit content here...';
                break;
            case 'add':
                contentEditor.placeholder = 'Add new component content here...';
                break;
            case 'delete':
                contentEditor.placeholder = 'Content to be deleted (click Save to confirm deletion)...';
                break;
        }
    }

    // Component templates for adding new items
    function getComponentTemplate(sectionName) {
        const templates = {
            'experience': `
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <div class="timeline-header">
            <h3>New Position</h3>
            <span class="timeline-company">Company Name</span>
            <span class="timeline-date">Date Range</span>
        </div>
        <p>Description of your role and responsibilities.</p>
        <ul>
            <li>Key achievement 1</li>
            <li>Key achievement 2</li>
            <li>Key achievement 3</li>
        </ul>
    </div>
</div>`,
            'research': `
<div class="research-card">
    <div class="research-header">
        <h3>New Research Project</h3>
        <span class="research-status">In Progress</span>
    </div>
    <div class="research-authors">
        <strong>Authors:</strong> Your Name, Co-author Name
    </div>
    <div class="research-description">
        <p>Description of your research project, methodology, and findings.</p>
    </div>
</div>`,
            'projects': `
<div class="project-card">
    <div class="project-header">
        <h3>New Project</h3>
        <a href="#" class="project-link" target="_blank">
            <i class="fab fa-github"></i>
        </a>
    </div>
    <p>Description of your project, technologies used, and outcomes.</p>
    <div class="project-tags">
        <span class="tag">Technology 1</span>
        <span class="tag">Technology 2</span>
    </div>
</div>`,
            'presentations': `
<div class="presentation-card">
    <div class="presentation-header">
        <h3>New Presentation</h3>
        <span class="presentation-course">Course/Event Name</span>
    </div>
    <p>Description of your presentation topic and key points.</p>
    <div class="presentation-links">
        <a href="#" class="presentation-link" target="_blank">
            <i class="fas fa-file-pdf"></i> Slides
        </a>
    </div>
</div>`,
            'awards': `
<div class="award-card">
    <div class="award-icon">
        <i class="fas fa-trophy"></i>
    </div>
    <div class="award-content">
        <h3>New Award</h3>
        <p>Description of the award and why you received it.</p>
        <span class="award-year">2024</span>
    </div>
</div>`,
            'leadership': `
<div class="leadership-card">
    <div class="leadership-icon">
        <i class="fas fa-users"></i>
    </div>
    <div class="leadership-content">
        <h3>New Leadership Role</h3>
        <p>Description of your leadership position and responsibilities.</p>
        <span class="leadership-period">2024</span>
    </div>
</div>`
        };
        
        return templates[sectionName] || 'Add new content here...';
    }

    // Add component to section
    function addComponentToSection(section, content, sectionName) {
        const container = getContainerForSection(section, sectionName);
        if (container) {
            container.insertAdjacentHTML('beforeend', content);
        } else {
            section.innerHTML += content;
        }
    }

    // Delete component from section
    function deleteComponentFromSection(section, contentToDelete, sectionName) {
        const container = getContainerForSection(section, sectionName);
        if (container) {
            // Find and remove the matching content
            const elements = container.children;
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].outerHTML.includes(contentToDelete.trim())) {
                    elements[i].remove();
                    break;
                }
            }
        }
    }

    // Get the appropriate container for each section type
    function getContainerForSection(section, sectionName) {
        switch(sectionName) {
            case 'experience':
                return section.querySelector('.timeline');
            case 'research':
                return section.querySelector('.research-grid');
            case 'projects':
                return section.querySelector('.projects-grid');
            case 'presentations':
                return section.querySelector('.presentations-grid');
            case 'awards':
                return section.querySelector('.awards-grid');
            case 'leadership':
                return section.querySelector('.leadership-grid');
            default:
                return section;
        }
    }

    // Content extraction functions
    function extractAboutContent(section) {
        const aboutText = section.querySelector('.about-text');
        return aboutText ? aboutText.innerHTML : section.innerHTML;
    }

    function extractExperienceContent(section) {
        const timeline = section.querySelector('.timeline');
        return timeline ? timeline.innerHTML : section.innerHTML;
    }

    function extractResearchContent(section) {
        const researchGrid = section.querySelector('.research-grid');
        return researchGrid ? researchGrid.innerHTML : section.innerHTML;
    }

    function extractProjectsContent(section) {
        const projectsGrid = section.querySelector('.projects-grid');
        return projectsGrid ? projectsGrid.innerHTML : section.innerHTML;
    }

    function extractPresentationsContent(section) {
        const presentationsGrid = section.querySelector('.presentations-grid');
        return presentationsGrid ? presentationsGrid.innerHTML : section.innerHTML;
    }

    function extractCoursesContent(section) {
        const coursesContent = section.querySelector('.courses-content');
        return coursesContent ? coursesContent.innerHTML : section.innerHTML;
    }

    function extractTeachingContent(section) {
        const teachingGrid = section.querySelector('.teaching-grid');
        return teachingGrid ? teachingGrid.innerHTML : section.innerHTML;
    }

    function extractAwardsContent(section) {
        const awardsGrid = section.querySelector('.awards-grid');
        return awardsGrid ? awardsGrid.innerHTML : section.innerHTML;
    }

    function extractLeadershipContent(section) {
        const leadershipGrid = section.querySelector('.leadership-grid');
        return leadershipGrid ? leadershipGrid.innerHTML : section.innerHTML;
    }

    // Content application functions
    function applyAboutContent(section, content) {
        const aboutText = section.querySelector('.about-text');
        if (aboutText) {
            aboutText.innerHTML = content;
        } else {
            section.innerHTML = content;
        }
    }

    function applyExperienceContent(section, content) {
        const timeline = section.querySelector('.timeline');
        if (timeline) {
            timeline.innerHTML = content;
        } else {
            section.innerHTML = content;
        }
    }

    function applyResearchContent(section, content) {
        const researchGrid = section.querySelector('.research-grid');
        if (researchGrid) {
            researchGrid.innerHTML = content;
        } else {
            section.innerHTML = content;
        }
    }

    function applyProjectsContent(section, content) {
        const projectsGrid = section.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = content;
        } else {
            section.innerHTML = content;
        }
    }

    function applyPresentationsContent(section, content) {
        const presentationsGrid = section.querySelector('.presentations-grid');
        if (presentationsGrid) {
            presentationsGrid.innerHTML = content;
        } else {
            section.innerHTML = content;
        }
    }

    function applyCoursesContent(section, content) {
        const coursesContent = section.querySelector('.courses-content');
        if (coursesContent) {
            coursesContent.innerHTML = content;
        } else {
            section.innerHTML = content;
        }
    }

    function applyTeachingContent(section, content) {
        const teachingGrid = section.querySelector('.teaching-grid');
        if (teachingGrid) {
            teachingGrid.innerHTML = content;
        } else {
            section.innerHTML = content;
        }
    }

    function applyAwardsContent(section, content) {
        const awardsGrid = section.querySelector('.awards-grid');
        if (awardsGrid) {
            awardsGrid.innerHTML = content;
        } else {
            section.innerHTML = content;
        }
    }

    function applyLeadershipContent(section, content) {
        const leadershipGrid = section.querySelector('.leadership-grid');
        if (leadershipGrid) {
            leadershipGrid.innerHTML = content;
        } else {
            section.innerHTML = content;
        }
    }

    // Local storage functions for persistence
    function saveToLocalStorage(sectionName, content) {
        try {
            localStorage.setItem(`portfolio_${sectionName}`, content);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    function loadFromLocalStorage(sectionName) {
        try {
            return localStorage.getItem(`portfolio_${sectionName}`);
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }

    // Load saved content on page load
    function loadSavedContent() {
        const sections = ['about', 'experience', 'research', 'projects', 'presentations', 'courses', 'teaching', 'awards', 'leadership'];
        sections.forEach(sectionName => {
            const savedContent = loadFromLocalStorage(sectionName);
            if (savedContent) {
                const section = document.getElementById(sectionName);
                if (section) {
                    // Apply saved content based on section type
                    switch(sectionName) {
                        case 'about':
                            applyAboutContent(section, savedContent);
                            break;
                        case 'experience':
                            applyExperienceContent(section, savedContent);
                            break;
                        case 'research':
                            applyResearchContent(section, savedContent);
                            break;
                        case 'projects':
                            applyProjectsContent(section, savedContent);
                            break;
                        case 'presentations':
                            applyPresentationsContent(section, savedContent);
                            break;
                        case 'courses':
                            applyCoursesContent(section, savedContent);
                            break;
                        case 'teaching':
                            applyTeachingContent(section, savedContent);
                            break;
                        case 'awards':
                            applyAwardsContent(section, savedContent);
                            break;
                        case 'leadership':
                            applyLeadershipContent(section, savedContent);
                            break;
                    }
                }
            }
        });
    }

    // Load saved content when page loads
    loadSavedContent();

    // Add admin logout function
    window.logoutAdmin = function() {
        isAdmin = false;
        if (dashboardToggle) {
            dashboardToggle.style.display = 'none';
        }
        if (adminLogin) {
            adminLogin.style.display = 'flex';
        }
        showMessage('Admin logged out!', 'success');
    };
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Scroll effects
function initScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Active navigation highlighting
    const sectionsForNav = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sectionsForNav.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animations
function initAnimations() {
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-item h3');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + (stat.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
            }
        };
        
        // Start counter animation when section is visible
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat);
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message at the top of the page
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Keyboard shortcuts for dashboard
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to open dashboard (admin only)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const dashboardToggle = document.getElementById('dashboardToggle');
        if (dashboardToggle && dashboardToggle.style.display !== 'none') {
            dashboardToggle.click();
        }
    }
    
    // Escape to close dashboard
    if (e.key === 'Escape') {
        const dashboardModal = document.getElementById('dashboardModal');
        if (dashboardModal && dashboardModal.style.display === 'flex') {
            const closeBtn = document.getElementById('closeDashboard');
            if (closeBtn) {
                closeBtn.click();
            }
        }
    }
});

// Performance optimization
function debounce(func, wait) {
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

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 