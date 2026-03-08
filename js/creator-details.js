document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Parse URL to get Creator ID ---
    const params = new URLSearchParams(window.location.search);
    const creatorId = params.get("id") || "cr_arun"; // Fallback to Arun if no ID is passed

    // --- 2. Mock Database Structure ---
    const creatorsDatabase = {
        "cr_arun": {
            name: "Arun Kumar",
            category: "Technology Podcast Host",
            followers: "150K",
            stats: { songs: 0, albums: 0, podcasts: 24, followers: "150K" },
            bio: "Arun Kumar is a premier technology podcast host known for deep insights into AI, startup ecosystems, and the future of technology in India. His award-winning series 'Tech Nexus' breaks down complex tech trends for everyday listeners.",
            bannerImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
            profileImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
        },
        "cr_kavi": {
            name: "Kavi Rajan",
            category: "Independent Music Producer",
            followers: "1.2M",
            stats: { songs: 45, albums: 4, podcasts: 12, followers: "1.2M" },
            bio: "Creating Tamil rap and experimental fusion music with deep cultural roots. Kavi Rajan blends classical Indian instruments with modern trap beats to create a unique auditory experience.",
            bannerImg: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=1600&auto=format&fit=crop",
            profileImg: "https://images.unsplash.com/photo-1520423465871-0866049020b7?q=80&w=400&auto=format&fit=crop"
        }
    };

    // Current Creator Context
    const currentCreator = creatorsDatabase[creatorId] || creatorsDatabase["cr_arun"];

    // Mock Content Data (Used across tabs)
    const mockContent = {
        songs: [
            { id: 's1', cardType: 'song', title: 'Future Echoes',    duration: '3:45', type: 'Music',        img: mc(0), target: 'details/audio-details.html?id=s1' },
            { id: 's2', cardType: 'song', title: 'Neon Lights',       duration: '4:12', type: 'Music',        img: mc(1), target: 'details/audio-details.html?id=s2' },
            { id: 's3', cardType: 'song', title: 'Mazhai Mazhai',     duration: '3:20', type: 'Music',        img: mc(2), target: 'details/audio-details.html?id=s3' },
            { id: 's4', cardType: 'song', title: 'Kuthu Beats 2026', duration: '3:55', type: 'Music',        img: mc(3), target: 'details/audio-details.html?id=s4' },
            { id: 's5', cardType: 'song', title: 'Midnight Raaga',   duration: '4:48', type: 'Music',        img: mc(0), target: 'details/audio-details.html?id=s5' },
            { id: 's6', cardType: 'song', title: 'Rooftop Sessions', duration: '3:30', type: 'Music',        img: mc(1), target: 'details/audio-details.html?id=s6' }
        ],
        albums: [
            { id: 'a1', cardType: 'album', title: 'Tech Beats Vol 1',    duration: '12 Songs', type: 'Album', img: mc(2), target: 'details/playlist-details.html?id=a1' },
            { id: 'a2', cardType: 'album', title: 'Neon Nights Vol 1',   duration: '10 Songs', type: 'Album', img: mc(3), target: 'details/playlist-details.html?id=a2' },
            { id: 'a3', cardType: 'album', title: 'Tamil Rap Vol 1',     duration: '8 Songs',  type: 'Album', img: mc(0), target: 'details/playlist-details.html?id=a3' },
            { id: 'a4', cardType: 'album', title: 'Kuthu Madness 2026', duration: '14 Songs', type: 'Album', img: mc(1), target: 'details/playlist-details.html?id=a4' },
            { id: 'a5', cardType: 'album', title: 'Midnight Classics',   duration: '9 Songs',  type: 'Album', img: mc(2), target: 'details/playlist-details.html?id=a5' },
            { id: 'a6', cardType: 'album', title: 'Street Anthems',      duration: '11 Songs', type: 'Album', img: mc(3), target: 'details/playlist-details.html?id=a6' }
        ],
        rap: [
            { id: 'r1', cardType: 'song', title: 'Street Code',       duration: '2:50', type: 'Rap', img: mc(0), target: 'details/audio-details.html?id=r1' },
            { id: 'r2', cardType: 'song', title: 'Gully Flow',        duration: '3:15', type: 'Rap', img: mc(1), target: 'details/audio-details.html?id=r2' },
            { id: 'r3', cardType: 'song', title: 'Chennai Chronicles',duration: '3:40', type: 'Rap', img: mc(2), target: 'details/audio-details.html?id=r3' },
            { id: 'r4', cardType: 'song', title: 'Urumi Beats',       duration: '2:58', type: 'Rap', img: mc(3), target: 'details/audio-details.html?id=r4' },
            { id: 'r5', cardType: 'song', title: 'Metro Lights',      duration: '3:22', type: 'Rap', img: mc(0), target: 'details/audio-details.html?id=r5' },
            { id: 'r6', cardType: 'song', title: 'Dravidam Rising',   duration: '4:05', type: 'Rap', img: mc(1), target: 'details/audio-details.html?id=r6' }
        ],
        bgm: [
            { id: 'b1', cardType: 'song', title: 'Suspense Theme',  duration: '1:30', type: 'BGM', img: mc(2), target: 'details/audio-details.html?id=b1' },
            { id: 'b2', cardType: 'song', title: 'Epic Chase',       duration: '2:10', type: 'BGM', img: mc(3), target: 'details/audio-details.html?id=b2' },
            { id: 'b3', cardType: 'song', title: 'Love Melody',      duration: '3:05', type: 'BGM', img: mc(0), target: 'details/audio-details.html?id=b3' },
            { id: 'b4', cardType: 'song', title: 'Victory March',    duration: '1:55', type: 'BGM', img: mc(1), target: 'details/audio-details.html?id=b4' },
            { id: 'b5', cardType: 'song', title: 'Dark Corridors',   duration: '2:45', type: 'BGM', img: mc(2), target: 'details/audio-details.html?id=b5' },
            { id: 'b6', cardType: 'song', title: 'Rain Sequence',    duration: '2:20', type: 'BGM', img: mc(3), target: 'details/audio-details.html?id=b6' }
        ],
        instrumental: [
            { id: 'i1', cardType: 'song', title: 'Acoustic Morning', duration: '5:00', type: 'Instrumental', img: mc(0), target: 'details/audio-details.html?id=i1' },
            { id: 'i2', cardType: 'song', title: 'Veena Raagam',     duration: '6:15', type: 'Instrumental', img: mc(1), target: 'details/audio-details.html?id=i2' },
            { id: 'i3', cardType: 'song', title: 'Flute Meditation', duration: '4:30', type: 'Instrumental', img: mc(2), target: 'details/audio-details.html?id=i3' },
            { id: 'i4', cardType: 'song', title: 'Carnatic Fusion',  duration: '7:20', type: 'Instrumental', img: mc(3), target: 'details/audio-details.html?id=i4' },
            { id: 'i5', cardType: 'song', title: 'Tabla Beats',      duration: '3:50', type: 'Instrumental', img: mc(0), target: 'details/audio-details.html?id=i5' },
            { id: 'i6', cardType: 'song', title: 'Sitar Dreams',     duration: '5:40', type: 'Instrumental', img: mc(1), target: 'details/audio-details.html?id=i6' }
        ],
        podcastEpisodes: [
            { id: 'pe1', cardType: 'episode', title: 'AI in 2026',          duration: '45:10', type: 'Episode', img: pc(0), target: 'details/audio-details.html?id=pe1' },
            { id: 'pe2', cardType: 'episode', title: 'Startup Funding Guide',duration: '52:20', type: 'Episode', img: pc(1), target: 'details/audio-details.html?id=pe2' },
            { id: 'pe3', cardType: 'episode', title: 'Future of Work',       duration: '38:45', type: 'Episode', img: pc(2), target: 'details/audio-details.html?id=pe3' },
            { id: 'pe4', cardType: 'episode', title: 'Tamil Tech Scene',     duration: '41:00', type: 'Episode', img: pc(3), target: 'details/audio-details.html?id=pe4' },
            { id: 'pe5', cardType: 'episode', title: 'Web3 Explained',       duration: '55:30', type: 'Episode', img: pc(0), target: 'details/audio-details.html?id=pe5' },
            { id: 'pe6', cardType: 'episode', title: 'Climate Tech 2026',    duration: '48:15', type: 'Episode', img: pc(1), target: 'details/audio-details.html?id=pe6' }
        ],
        podcastPlaylists: [
            { id: 'pp1', cardType: 'series', title: 'Tech Nexus Season 3',  duration: '24 Episodes', type: 'Podcast', img: pc(2), target: 'details/playlist-details.html?id=pp1' },
            { id: 'pp2', cardType: 'series', title: 'Startup Diaries S1',   duration: '12 Episodes', type: 'Podcast', img: pc(3), target: 'details/playlist-details.html?id=pp2' },
            { id: 'pp3', cardType: 'series', title: 'AI & Tamil Future',    duration: '18 Episodes', type: 'Podcast', img: pc(0), target: 'details/playlist-details.html?id=pp3' },
            { id: 'pp4', cardType: 'series', title: 'Deep Dive Science',    duration: '10 Episodes', type: 'Podcast', img: pc(1), target: 'details/playlist-details.html?id=pp4' }
        ]
    };

    // --- 3. Render Profile Header & Stats ---
    function renderProfile() {
        document.getElementById('banner-img').src = currentCreator.bannerImg;
        document.getElementById('profile-img').src = currentCreator.profileImg;
        document.getElementById('creator-name').innerText = currentCreator.name;
        document.getElementById('creator-category').innerText = currentCreator.category;
        document.getElementById('creator-followers').innerText = `${currentCreator.followers} Followers`;
        
        document.getElementById('stat-songs').innerText = currentCreator.stats.songs;
        document.getElementById('stat-albums').innerText = currentCreator.stats.albums;
        document.getElementById('stat-podcasts').innerText = currentCreator.stats.podcasts;
        document.getElementById('stat-followers-large').innerText = currentCreator.stats.followers;
        
        document.getElementById('creator-bio').innerText = currentCreator.bio;
        
        // Update document title for UX
        document.title = `${currentCreator.name} - Thala Nivitham`;
    }

    // Follow Toggle Logic
    window.toggleFollow = function() {
        const btn = document.getElementById('follow-btn');
        if(btn.innerText.includes("Following")) {
            btn.innerHTML = `<i class="fa-solid fa-user-plus"></i> Follow`;
            btn.style.background = "var(--accent)";
        } else {
            btn.innerHTML = `<i class="fa-solid fa-check"></i> Following`;
            btn.style.background = "rgba(255,255,255,0.1)";
        }
    };

    // --- 4. Card UI Generation (delegates to global makeContentCard from cards.js) ---
    function generateCardHTML(item) {
        return makeContentCard({
            type: item.cardType,
            id: item.id,
            img: item.img,
            title: item.title,
            creator: currentCreator.name,
            extra: { label: item.duration + ' · ' + item.type },
            url: item.target
        });
    }

    // --- 5. Tab Management Logic ---
    const contentArea = document.getElementById('tab-content-area');
    let currentSubTab = 'episodes'; // For Podcast tab logic

    function renderTabContent(tabName) {
        contentArea.innerHTML = ""; // Clear existing

        if (tabName === "Podcasts") {
            // Podcast Tab Structure: Two sub-sections (Episodes & Playlists)
            contentArea.innerHTML = `
                <div class="sub-tabs-container">
                    <button class="sub-tab-btn ${currentSubTab === 'episodes' ? 'active' : ''}" onclick="switchSubTab('episodes')">Individual Episodes</button>
                    <button class="sub-tab-btn ${currentSubTab === 'playlists' ? 'active' : ''}" onclick="switchSubTab('playlists')">Podcast Playlists</button>
                </div>
                <div class="cards-row" id="podcast-grid"></div>
            `;
            renderPodcastGrid();
        } else {
            // Render Standard Grid for other tabs
            const dataMap = {
                "Songs": mockContent.songs,
                "Albums": mockContent.albums,
                "Rap Content": mockContent.rap,
                "BGM": mockContent.bgm,
                "Instrumental": mockContent.instrumental
            };
            
            const listData = dataMap[tabName] || [];
            
            if(listData.length === 0) {
                contentArea.innerHTML = `<p style="color: var(--text-secondary); text-align: center; padding: 40px 0;">No ${tabName.toLowerCase()} available yet.</p>`;
                return;
            }

            contentArea.innerHTML = `<div class="cards-row">${listData.map(item => generateCardHTML(item)).join('')}</div>`;
        }
    }

    window.switchSubTab = function(type) {
        currentSubTab = type;
        renderTabContent('Podcasts'); // Re-render the podcast tab
    };

    function renderPodcastGrid() {
        const grid = document.getElementById('podcast-grid');
        const data = currentSubTab === 'episodes' ? mockContent.podcastEpisodes : mockContent.podcastPlaylists;
        grid.innerHTML = data.map(item => generateCardHTML(item)).join('');
    }

    // Setup Main Tab Listeners
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active styling
            tabBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Render specific content
            renderTabContent(e.target.getAttribute('data-tab'));
        });
    });

    // --- Initialization ---
    renderProfile();
    // Default open the first tab (Songs)
    renderTabContent("Songs");
});