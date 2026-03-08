document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Banner Data Structure (Exactly 4 Sliding Banners) ---
    const creatorBannerData = [
        {
            id: "cr_kavi",
            label: "TOP CREATOR",
            name: "Kavi Rajan",
            role: "Independent Music Producer",
            desc: "Creating Tamil rap and experimental fusion music with deep cultural roots.",
            image: "https://images.unsplash.com/photo-1520423465871-0866049020b7?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: "cr_arun",
            label: "FEATURED CREATOR",
            name: "Arun Kumar",
            role: "Technology Podcast Host",
            desc: "Deep dive into AI, startups, and the future of technology in India.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: "cr_meera",
            label: "TRENDING CREATOR",
            name: "Meera S",
            role: "Motivational Speaker",
            desc: "Inspiring millions with daily stories of resilience and personal growth.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: "cr_stan",
            label: "CREATOR OF THE WEEK",
            name: "MC Stan",
            role: "Rap Artist",
            desc: "Breaking records with the hardest hitting verses from the streets.",
            image: "https://images.unsplash.com/photo-1520342868574-5fa3804e551c?q=80&w=1200&auto=format&fit=crop"
        }
    ];

    // Dummy data for cards (adhering to exact BRD structure: Name -> Cat -> Followers)
    const creatorsList = [
        { id: 'cr_arun', name: 'Arun Kumar', category: 'Technology', followers: '150K Followers', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
        { id: 'cr_meera', name: 'Meera S', category: 'Motivation', followers: '2.1M Followers', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop' },
        { id: 'cr_stan', name: 'MC Stan', category: 'Rap', followers: '3.5M Followers', img: 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?q=80&w=300&auto=format&fit=crop' },
        { id: 'cr_ravi', name: 'Ravi Narayanan', category: 'Storytelling', followers: '85K Followers', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
        { id: 'cr_rakesh', name: 'DJ Rakesh', category: 'Musician', followers: '420K Followers', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop' },
        { id: 'cr_vivek', name: 'Dr. Vivek', category: 'Wellness', followers: '550K Followers', img: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=300&auto=format&fit=crop' }
    ];

    // Category data (Exactly 8 categories to support 4 per row grid)
    const categories = [
        { id: 'cat_music', name: 'Music Artists', count: '450 Creators', icon: 'fa-guitar' },
        { id: 'cat_podcast', name: 'Podcast Hosts', count: '320 Creators', icon: 'fa-microphone-lines' },
        { id: 'cat_rap', name: 'Rap Artists', count: '150 Creators', icon: 'fa-fire' },
        { id: 'cat_indie', name: 'Independent Creators', count: '580 Creators', icon: 'fa-compact-disc' },
        { id: 'cat_story', name: 'Storytellers', count: '210 Creators', icon: 'fa-book-open' },
        { id: 'cat_tech', name: 'Technology Creators', count: '180 Creators', icon: 'fa-laptop-code' },
        { id: 'cat_comedy', name: 'Comedy Creators', count: '290 Creators', icon: 'fa-masks-theater' },
        { id: 'cat_edu', name: 'Education Creators', count: '340 Creators', icon: 'fa-graduation-cap' }
    ];

    // --- 6. Proper UI/UX Banner Sliding Logic (handled by global script.js) ---
    // --- Card Rendering (Proper Alignment & Metadata Structure) ---
    
    function createCreatorCardHTML(data) {
        // Actions at bottom of cover image (no blur/overlay & center buttons removed)
        return `
            <div class="creator-card" data-creator-id="${data.id}" onclick="handleCreatorAction('view', '${data.id}')">
                <div class="creator-thumb">
                    <img src="${data.img}" alt="${data.name}" loading="lazy">
                    
                    <div class="card-thumb-actions">
                        <button class="thumb-action-btn view" onclick="handleCreatorAction('view', '${data.id}'); event.stopPropagation();">
                            <i class="fa-solid fa-id-card"></i>
                        </button>
                        <button class="thumb-action-btn follow" onclick="handleCreatorAction('follow', '${data.id}'); event.stopPropagation();">
                            <i class="fa-solid fa-user-plus"></i>
                        </button>
                    </div>
                </div>
                
                <h3 class="card-name">${data.name}</h3>
                <p class="card-category">${data.category}</p>
                <span class="card-followers">${data.followers}</span>
            </div>
        `;
    }

    function renderCarousel(containerId, dataArray) {
        const container = document.getElementById(containerId);
        if (!container) return;
        // Duplicate array for demo
        const displayData = [...dataArray, ...dataArray]; 
        container.innerHTML = displayData.map(item => createCreatorCardHTML(item)).join('');
    }

    // Grid will naturally align 4 per row based on locked grid columns in CSS
    function renderCategories() {
        const grid = document.getElementById('creator-categories-grid');
        if (!grid) return;
        
        grid.innerHTML = categories.map(cat => `
            <div class="category-card" onclick="window.location.href='creator-category.html?cat=${cat.id}'">
                <i class="fa-solid ${cat.icon} cat-icon"></i>
                <h3 class="cat-name">${cat.name}</h3>
                <p class="cat-count">${cat.count}</p>
            </div>
        `).join('');
    }

    function renderTopCreators() {
        const list = document.getElementById('top-creators-list');
        if (!list) return;

        list.innerHTML = creatorsList.slice(0, 5).map((creator, index) => `
            <div class="top-creator-row" onclick="handleCreatorAction('view', '${creator.id}')">
                <span class="rank-number">${index + 1}</span>
                <img src="${creator.img}" alt="${creator.name}" class="top-creator-thumb" loading="lazy">
                <div class="top-creator-info">
                    <h4>${creator.name}</h4>
                    <p>${creator.category}</p>
                </div>
                <span class="top-creator-followers-badge">${creator.followers}</span>
            </div>
        `).join('');
    }

    // Action Handler
    window.handleCreatorAction = function(action, creatorId) {
        if (action === 'view') {
            window.location.href = `creator-details.html?id=${creatorId}`;
        } else if (action === 'play') {
            alert(`Play Content: ${creatorId}`);
        } else if (action === 'follow') {
            alert(`Followed: ${creatorId}`);
        }
    };

    // Horizontal Scroll Setup
    function setupCarousels() {
        const sections = document.querySelectorAll('.ott-section');
        
        sections.forEach(section => {
            const track = section.querySelector('.carousel-track');
            const leftBtn = section.querySelector('.carousel-arrow.left-arrow');
            const rightBtn = section.querySelector('.carousel-arrow.right-arrow');
            
            if (!track || !leftBtn || !rightBtn) return;

            leftBtn.addEventListener('click', () => track.scrollBy({ left: -400, behavior: 'smooth' }));
            rightBtn.addEventListener('click', () => track.scrollBy({ left: 400, behavior: 'smooth' }));

            // Basic Mouse Drag support
            let isDown = false, startX, scrollLeft;
            track.addEventListener('mousedown', (e) => { isDown = true; track.classList.add('dragging'); startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; });
            track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('dragging'); });
            track.addEventListener('mouseup', () => { isDown = false; track.classList.remove('dragging'); });
            track.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - track.offsetLeft;
                const walk = (x - startX) * 2; 
                track.scrollLeft = scrollLeft - walk;
            });
        });
    }

    // --- Init ---
    
    renderCarousel('trending-creators-track', creatorsList);
    renderCategories(); // Renders grid
    renderCarousel('featured-creators-track', [...creatorsList].reverse());
    renderTopCreators();
    renderCarousel('collections-track', creatorsList.slice(1, 5));
    renderCarousel('recommended-creators-track', creatorsList);
    
    setupCarousels();
});