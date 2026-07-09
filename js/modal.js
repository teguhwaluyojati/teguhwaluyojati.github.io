// Project Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectModal = document.getElementById('projectModal');
    const projectModalClose = document.getElementById('projectModalClose');
    const projectModalCloseBtn = document.getElementById('projectModalCloseBtn');
    
    // Project data
    const projectData = {
        'codeigniter': {
            title: 'CodeIgniter Business System',
            tag: 'Web App',
            year: '2021-2022',
            tech: 'CodeIgniter, PHP, MySQL, Bootstrap',
            image: 'assets/img/portfolio-8.png',
            description: 'A comprehensive business system built with CodeIgniter framework. Problem: The client faced fragmented internal processes across multiple departments with no unified system. Solution: Developed a modular CodeIgniter system with intuitive interfaces for each department\'s workflow. Impact: Achieved 40% improvement in operational efficiency and made feature scaling much easier.',
            features: [
                'Multi-module architecture for different departments',
                'Role-based access control system',
                'Real-time data synchronization',
                'Comprehensive reporting dashboard',
                'Mobile-responsive design'
            ],
            link: '#'
        },
        'laravel-enterprise': {
            title: 'Laravel Enterprise Portal',
            tag: 'Web Platform',
            year: '2021-2023',
            tech: 'Laravel, Vue.js, PostgreSQL, Redis',
            image: 'assets/img/portfolio-7.jpg',
            description: 'Enterprise-grade web portal with modular Laravel architecture. Problem: The legacy web application was difficult to maintain and slow to adapt to new business requirements. Solution: Built a modern Laravel-based portal with clean separation of concerns and comprehensive API design. Impact: Reduced feature deployment time by 60% and enabled faster iteration on business requirements.',
            features: [
                'Microservices architecture',
                'Advanced caching with Redis',
                'API-first design approach',
                'Comprehensive logging and monitoring',
                'Database optimization for large datasets'
            ],
            link: '#'
        },
        'laravel-vue': {
            title: 'Laravel + Vue Dashboard',
            tag: 'Web App',
            year: '2023-Present',
            tech: 'Laravel, Vue.js, Axios, TailwindCSS',
            image: 'assets/img/laravel-vue.png',
            description: 'Modern, responsive admin dashboard with Laravel backend and Vue.js frontend. Problem: The existing admin interface was slow, outdated, and lacked real-time data updates, making daily monitoring tedious. Solution: Created a fast, modern dashboard with Vue.js components and Laravel RESTful API with WebSocket integration. Impact: Improved dashboard responsiveness by 75% and enabled real-time data visualization for monitoring.',
            features: [
                'Real-time data updates with WebSockets',
                'Interactive charts and graphs',
                'Advanced filtering and search',
                'Export functionality (PDF, Excel)',
                'Dark mode support'
            ],
            link: 'https://myassistant.up.railway.app/'
        },
        'telegram-bot': {
            title: 'Laravel + Telegram Bot',
            tag: 'Automation',
            year: '2022-2023',
            tech: 'Laravel, Telegram API, Webhooks, Redis',
            image: 'assets/img/laravel-bot-tele.jpg',
            description: 'Automated notification and command system via Telegram. Problem: The team relied on manual notifications which were delayed and error-prone, affecting response times. Solution: Integrated Telegram bot with Laravel backend to push real-time updates and handle commands directly from Telegram. Impact: Reduced notification delay from hours to seconds and improved team responsiveness.',
            features: [
                'Real-time event notifications',
                'Interactive command handling',
                'Message formatting and threading',
                'User authentication via Telegram',
                'Scheduled reports delivery'
            ],
            link: 'https://t.me/teguhwaluyojati_bot'
        },
        'personal-hub': {
            title: 'Personal Hub',
            tag: 'Web App',
            year: '2026',
            tech: 'JavaScript, Alpine.js, REST API, LocalStorage',
            image: 'assets/img/laravel-vue.png',
            description: 'Unified personal dashboard for daily digital workflow. Problem: Important tools like communication links, market updates, and quick notes were scattered across multiple apps. Solution: Built a centralized hub that combines social shortcuts, market snapshots (USD/IDR, BTC/IDR, IHSG), news feed, and sticky notes in one interface. Impact: Reduced context-switching and made daily monitoring significantly faster.',
            features: [
                'Quick access cards for WhatsApp, Telegram, and GitHub',
                'Live market panel for USD/IDR, BTC/IDR, and IHSG',
                'Integrated news feed with pagination',
                'Sticky notes persisted via LocalStorage',
                'Bilingual interface (ID and EN)'
            ],
            link: 'https://twjdev-personal-hub.vercel.app/'
        },
        'ajulaju-web': {
            title: 'AjuLaju Web App',
            tag: 'Web App',
            year: '2025-2026',
            tech: 'JavaScript, Firebase, Chart.js, Bootstrap',
            image: 'assets/img/portfolio-9.jpg',
            description: 'Web app for vehicle expense tracking in AjuLaju. Problem: Fuel and service expenses were recorded manually and spread across notes, making monthly monitoring difficult. Solution: Built a centralized dashboard to record fuel and service transactions, monitor spending trends, and keep maintenance history in one place. Impact: Expense tracking became clearer, faster, and easier to review anytime.',
            features: [
                'Dashboard for monthly fuel and service expenses',
                'Centralized service history per vehicle',
                'Fuel transaction records with consumption tracking',
                'Trend visualization for recent spending',
                'Cloud-stored data for secure access anywhere'
            ],
            link: 'https://twjdev-aju-laju.vercel.app/'
        },
        'ajulaju-android': {
            title: 'AjuLaju Android Native App',
            tag: 'Mobile',
            year: '2025-2026',
            tech: 'Kotlin, Android SDK, Firebase API, Room Database',
            image: 'assets/img/portfolio-10.jpg',
            description: 'Native Android app companion for AjuLaju vehicle expense tracking. Problem: Vehicle owners needed a practical way to log fuel and service costs directly from mobile without switching between notes and spreadsheets. Solution: Developed an Android app to capture daily expense records, view spending summaries, and sync data for consistent monitoring. Impact: Daily recording became more practical and spending control improved.',
            features: [
                'Quick input for fuel and service expenses',
                'Per-vehicle expense history on mobile',
                'Monthly summary view for spending control',
                'Simple maintenance note logging',
                'Data synchronization with backend storage'
            ],
            link: '#'
        },
        'android-attendance': {
            title: 'Android Attendance App',
            tag: 'Mobile',
            year: '2022',
            tech: 'Java, Android SDK, Firebase, GPS',
            image: 'assets/img/portfolio-10.jpg',
            description: 'Mobile attendance tracking application for Android devices. Problem: Manual attendance tracking was time-consuming and lacked accuracy, with no real-time overview of employee presence. Solution: Developed a mobile app with GPS verification, face recognition integration, and real-time reporting. Impact: Reduced administrative overhead by 80% and eliminated false attendance entries.',
            features: [
                'GPS-based location verification',
                'Face recognition integration',
                'Offline capability with cloud sync',
                'Real-time attendance notifications',
                'Geofencing support for multiple locations'
            ],
            link: '#'
        },
        'laundry-system': {
            title: 'Laundry Information System',
            tag: 'Desktop',
            year: '2020-2021',
            tech: 'C#, WinForms, SQL Server, Crystal Reports',
            image: 'assets/img/portfolio-11.jpg',
            description: 'Complete desktop information system for laundry business operations. Problem: The laundry business needed better tracking of services, transactions, and reporting with manual record-keeping causing delays. Solution: Built a comprehensive desktop application for transaction management, service tracking, and automated reporting. Impact: Streamlined operations and provided clear visibility into business metrics.',
            features: [
                'Transaction and service tracking',
                'Automated invoice generation',
                'Customer and pricing management',
                'Detailed business reports',
                'Data backup and archiving'
            ],
            link: '#'
        }
    };
    
    // Open modal
    function openProjectModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;
        
        document.getElementById('projectModalImage').src = project.image;
        document.getElementById('projectModalTag').textContent = project.tag;
        document.getElementById('projectModalTitle').textContent = project.title;
        document.getElementById('projectModalYear').textContent = project.year;
        document.getElementById('projectModalTech').textContent = project.tech;
        document.getElementById('projectModalDesc').textContent = project.description;
        
        const featuresList = document.getElementById('projectModalFeatures');
        featuresList.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
        
        const link = document.getElementById('projectModalLink');
        if (project.link && project.link !== '#') {
            link.href = project.link;
            link.style.display = 'inline-block';
        } else {
            link.style.display = 'none';
        }
        
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeProjectModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    document.querySelectorAll('.project-card-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    projectModalClose.addEventListener('click', closeProjectModal);
    projectModalCloseBtn.addEventListener('click', closeProjectModal);
    
    // Close modal when clicking outside
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });
});
