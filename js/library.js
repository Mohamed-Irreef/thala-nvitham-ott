document.addEventListener('DOMContentLoaded', () => {

    // --- Mock Data --- 
    // Data structures adhere strictly to the list format parameters outlined in the BRD context
    const data = {
        playlists: [
            { id: 'p1', title: 'Late Night Coding', creator: 'Created by You', songs: 42, lastPlayed: '2 hours ago', img: 'assets/music-cover1.png' },
            { id: 'p2', title: 'Tamil Rap Mix', creator: 'Created by You', songs: 18, lastPlayed: 'Yesterday', img: 'assets/music-cover2.png' },
            { id: 'p3', title: 'Podcast Favorites', creator: 'Created by You', songs: 5, lastPlayed: 'Last week', img: 'assets/podcast-cover1.png' },
            { id: 'p4', title: 'Morning Meditation', creator: 'Created by You', songs: 12, lastPlayed: '3 days ago', img: 'assets/podcast-cover2.png' },
            { id: 'p5', title: 'Workout Beats', creator: 'Created by You', songs: 28, lastPlayed: '1 week ago', img: 'assets/music-cover3.png' },
            { id: 'p6', title: 'Tamil Classics', creator: 'Created by You', songs: 35, lastPlayed: '2 weeks ago', img: 'assets/music-cover4.png' },
            { id: 'p7', title: 'Chill Vibes', creator: 'Created by You', songs: 22, lastPlayed: '3 weeks ago', img: 'assets/music-cover1.png' },
            { id: 'p8', title: 'Tech Podcast Mix', creator: 'Created by You', songs: 8, lastPlayed: '1 month ago', img: 'assets/podcast-cover3.png' },
            { id: 'p9', title: 'Late Night Jazz', creator: 'Created by You', songs: 19, lastPlayed: '1 month ago', img: 'assets/music-cover2.png' },
            { id: 'p10', title: 'Devotional Songs', creator: 'Created by You', songs: 31, lastPlayed: '2 months ago', img: 'assets/podcast-cover4.png' }
        ],
        liked: [
            { id: 's1', title: 'Neon Dreams', artist: 'The Synthetics', album: 'Future Echoes', duration: '3:45', img: 'assets/music-cover1.png' },
            { id: 's2', title: 'Gully Flow', artist: 'MC Vetri', album: 'Street Code', duration: '2:50', img: 'assets/music-cover2.png' },
            { id: 's3', title: 'Acoustic Morning', artist: 'Kavi Rajan', album: 'Rooftop Sessions', duration: '4:12', img: 'assets/music-cover3.png' },
            { id: 's4', title: 'Mazhai Mazhai', artist: 'Kavi Rajan', album: 'Tamil Rap Vol 1', duration: '3:12', img: 'assets/music-cover4.png' },
            { id: 's5', title: 'Neon Nights', artist: 'Hari Beats', album: 'Neon Nights Vol 1', duration: '4:05', img: 'assets/music-cover1.png' },
            { id: 's6', title: 'Rooftop Sessions', artist: 'MC Vetri', album: 'Street Code', duration: '3:55', img: 'assets/music-cover2.png' },
            { id: 's7', title: 'Ilayaraja Medley', artist: 'Sangeetha R', album: 'Classics', duration: '5:30', img: 'assets/music-cover3.png' },
            { id: 's8', title: 'Midnight Raaga', artist: 'Priya Meenakshi', album: 'Midnight Raaga', duration: '4:48', img: 'assets/music-cover4.png' },
            { id: 's9', title: 'Kuthu Beats 2026', artist: 'Hari Beats', album: 'Kuthu Beats', duration: '3:20', img: 'assets/music-cover1.png' },
            { id: 's10', title: 'Chand Ke Paas', artist: 'Ravi K.', album: 'Chand Ke Paas', duration: '4:22', img: 'assets/music-cover2.png' }
        ],
        podcasts: [
            { id: 'pod1', title: 'Tech Trends 2026', host: 'Arun Kumar', duration: '45 mins', img: 'assets/podcast-cover1.png' },
            { id: 'pod2', title: 'Startup Diaries', host: 'Sneha M', duration: '55 mins', img: 'assets/podcast-cover2.png' },
            { id: 'pod3', title: 'AI & Tamil Future', host: 'Dr. Nalini', duration: '38 mins', img: 'assets/podcast-cover3.png' },
            { id: 'pod4', title: 'Health First Tamil', host: 'Dr. Nalini', duration: '42 mins', img: 'assets/podcast-cover4.png' },
            { id: 'pod5', title: 'Tech Nexus S3 Ep.1', host: 'Arun Kumar', duration: '48 mins', img: 'assets/podcast-cover1.png' },
            { id: 'pod6', title: 'Entrepreneurship 101', host: 'Sneha M', duration: '50 mins', img: 'assets/podcast-cover2.png' },
            { id: 'pod7', title: 'Sports Talk Tamil', host: 'Rajan S', duration: '35 mins', img: 'assets/podcast-cover3.png' },
            { id: 'pod8', title: 'Finance for Youth', host: 'Priya Meenakshi', duration: '40 mins', img: 'assets/podcast-cover4.png' },
            { id: 'pod9', title: 'Deep Dive Science', host: 'Arun Kumar', duration: '60 mins', img: 'assets/podcast-cover1.png' },
            { id: 'pod10', title: 'Creative minds', host: 'Chef Senthil', duration: '44 mins', img: 'assets/podcast-cover2.png' }
        ],
        downloads: [
            { id: 'd1', title: 'AI Future Podcast', creator: 'Tech Nexus', type: 'Episode', img: 'assets/podcast-cover1.png' },
            { id: 'd2', title: 'Mystery Tales', creator: 'Ravi Narayanan', type: 'Storytelling', img: 'assets/podcast-cover2.png' },
            { id: 'd3', title: 'Neon Nights Vol. 1', creator: 'Hari Beats', type: 'Album', img: 'assets/music-cover1.png' },
            { id: 'd4', title: 'Kuthu Beats 2026', creator: 'Kavi Rajan', type: 'Album', img: 'assets/music-cover2.png' },
            { id: 'd5', title: 'Startup Diaries Ep.5', creator: 'Sneha M', type: 'Episode', img: 'assets/podcast-cover3.png' },
            { id: 'd6', title: 'Rooftop Sessions', creator: 'MC Vetri', type: 'Album', img: 'assets/music-cover3.png' },
            { id: 'd7', title: 'Midnight Raaga', creator: 'Priya Meenakshi', type: 'Album', img: 'assets/music-cover4.png' },
            { id: 'd8', title: 'Health First Ep.12', creator: 'Dr. Nalini', type: 'Episode', img: 'assets/podcast-cover4.png' },
            { id: 'd9', title: 'Tamil Rap Vol 1', creator: 'Kavi Rajan', type: 'Album', img: 'assets/music-cover1.png' },
            { id: 'd10', title: 'Tech Nexus Season 3', creator: 'Arun Kumar', type: 'Series', img: 'assets/podcast-cover1.png' }
        ],
        recent: [
            { id: 'r1', title: 'Mindful Mornings', creator: 'Dr. Vivek', played: '2 hours ago', img: 'assets/podcast-cover1.png' },
            { id: 'r2', title: 'Neon Dreams', creator: 'The Synthetics', played: '5 hours ago', img: 'assets/music-cover1.png' },
            { id: 'r3', title: 'Startup Diaries Ep.6', creator: 'Sneha M', played: 'Yesterday', img: 'assets/podcast-cover2.png' },
            { id: 'r4', title: 'Rooftop Sessions', creator: 'MC Vetri', played: 'Yesterday', img: 'assets/music-cover2.png' },
            { id: 'r5', title: 'Tech Nexus Tamil Ep.47', creator: 'Arun Kumar', played: '2 days ago', img: 'assets/podcast-cover3.png' },
            { id: 'r6', title: 'Kuthu Beats 2026', creator: 'Hari Beats', played: '2 days ago', img: 'assets/music-cover3.png' },
            { id: 'r7', title: 'Health First Ep.15', creator: 'Dr. Nalini', played: '3 days ago', img: 'assets/podcast-cover4.png' },
            { id: 'r8', title: 'Midnight Raaga', creator: 'Priya Meenakshi', played: '4 days ago', img: 'assets/music-cover4.png' },
            { id: 'r9', title: 'Tamil Rap Vol 1', creator: 'Kavi Rajan', played: '5 days ago', img: 'assets/music-cover1.png' },
            { id: 'r10', title: 'Creative Minds Ep.3', creator: 'Chef Senthil', played: 'Last week', img: 'assets/podcast-cover2.png' }
        ],
        history: [
            { id: 'h1', title: 'Global Affairs Ep. 12', creator: 'News Daily', date: 'Mar 7, 2026', duration: '30 min', img: 'assets/podcast-cover1.png' },
            { id: 'h2', title: 'Neon Nights Vol. 1', creator: 'Hari Beats', date: 'Mar 7, 2026', duration: '42 min', img: 'assets/music-cover1.png' },
            { id: 'h3', title: 'Tech Nexus Ep. 46', creator: 'Arun Kumar', date: 'Mar 6, 2026', duration: '45 min', img: 'assets/podcast-cover2.png' },
            { id: 'h4', title: 'Kuthu Beats 2026', creator: 'Kavi Rajan', date: 'Mar 6, 2026', duration: '38 min', img: 'assets/music-cover2.png' },
            { id: 'h5', title: 'Startup Diaries Ep. 5', creator: 'Sneha M', date: 'Mar 5, 2026', duration: '55 min', img: 'assets/podcast-cover3.png' },
            { id: 'h6', title: 'Rooftop Sessions', creator: 'MC Vetri', date: 'Mar 5, 2026', duration: '48 min', img: 'assets/music-cover3.png' },
            { id: 'h7', title: 'Health First Ep. 14', creator: 'Dr. Nalini', date: 'Mar 4, 2026', duration: '40 min', img: 'assets/podcast-cover4.png' },
            { id: 'h8', title: 'Midnight Raaga', creator: 'Priya Meenakshi', date: 'Mar 4, 2026', duration: '52 min', img: 'assets/music-cover4.png' },
            { id: 'h9', title: 'Creative Minds Ep. 2', creator: 'Chef Senthil', date: 'Mar 3, 2026', duration: '44 min', img: 'assets/podcast-cover1.png' },
            { id: 'h10', title: 'Tamil Rap Vol 1', creator: 'Kavi Rajan', date: 'Mar 3, 2026', duration: '36 min', img: 'assets/music-cover1.png' }
        ]
    };

    // --- Tab Switching Logic ---
    const tabs = document.querySelectorAll('.pill-btn');
    const sections = document.querySelectorAll('.content-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Update Active Tab
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');

            // Show Target Section
            const targetId = e.target.getAttribute('data-target');
            sections.forEach(sec => {
                sec.classList.remove('active');
                if(sec.id === targetId) sec.classList.add('active');
            });
        });
    });

    // --- Render Functions (Compact List Style) ---
    function renderPlaylists() {
        const container = document.getElementById('list-playlists');
        container.innerHTML = data.playlists.map(item => `
            <div class="list-row" onclick="simulatePlay('${item.title}', '${item.creator}', '${item.img}')">
                <div class="row-thumb">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="row-play-overlay"><i class="fa-solid fa-play"></i></div>
                </div>
                <div class="row-info">
                    <h4 class="row-title">${item.title}</h4>
                    <div class="row-meta"><span>${item.creator}</span><span>•</span><span>${item.songs} Songs</span></div>
                </div>
                <div class="row-extra">${item.lastPlayed}</div>
                <div class="row-actions">
                    <button class="action-icon accent" title="Share"><i class="fa-solid fa-share-nodes"></i></button>
                    <button class="action-icon" title="Remove"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    function renderLikedSongs() {
        const container = document.getElementById('table-liked');
        container.innerHTML = data.liked.map((item, index) => `
            <div class="table-row" onclick="simulatePlay('${item.title}', '${item.artist}', '${item.img}')">
                <div class="col-num"><span class="number">${index + 1}</span></div>
                <div class="col-title">
                    <div class="row-thumb" style="width:40px; height:40px;">
                        <img src="${item.img}" alt="${item.title}">
                        <div class="row-play-overlay" style="font-size:12px;"><i class="fa-solid fa-play"></i></div>
                    </div>
                    <div>
                        <h4 class="row-title" style="font-size:14px;">${item.title}</h4>
                        <div class="row-meta" style="font-size:12px;">${item.artist}</div>
                    </div>
                </div>
                <div class="col-album">${item.album}</div>
                <div class="col-duration">${item.duration}</div>
                <div class="col-actions">
                    <button class="action-icon active" style="color:var(--accent);"><i class="fa-solid fa-heart"></i></button>
                    <button class="action-icon" style="margin-left:12px;"><i class="fa-solid fa-ellipsis"></i></button>
                </div>
            </div>
        `).join('');
    }

    function renderStandardList(containerId, arrayData, metaLabel, extraLabel) {
        const container = document.getElementById(containerId);
        container.innerHTML = arrayData.map(item => `
            <div class="list-row" onclick="simulatePlay('${item.title}', '${item.creator || item.host}', '${item.img}')">
                <div class="row-thumb">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="row-play-overlay"><i class="fa-solid fa-play"></i></div>
                </div>
                <div class="row-info">
                    <h4 class="row-title">${item.title}</h4>
                    <div class="row-meta">
                        ${item.type && containerId === 'list-downloads' ? `<i class="fa-solid fa-circle-check status-icon"></i>` : ''}
                        <span>${item.creator || item.host}</span>
                        ${item[metaLabel] ? `<span>•</span><span>${item[metaLabel]}</span>` : ''}
                    </div>
                </div>
                <div class="row-extra">${item[extraLabel] || ''}</div>
                <div class="row-actions">
                    <button class="action-icon" title="Add to Playlist"><i class="fa-solid fa-plus"></i></button>
                    <button class="action-icon" title="More Options"><i class="fa-solid fa-ellipsis"></i></button>
                </div>
            </div>
        `).join('');
    }

    // --- Search Filter Logic ---
    const searchInput = document.getElementById('lib-search');
    searchInput.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        // Applies search visually to all currently rendered rows
        const allRows = document.querySelectorAll('.list-row, .table-row');
        allRows.forEach(row => {
            const title = row.querySelector('.row-title').innerText.toLowerCase();
            row.style.display = title.includes(term) ? '' : 'none';
        });
    });

    // --- Audio Player Simulation ---
    const playBtn = document.getElementById('main-play-btn');
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playBtn.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
    });

    window.simulatePlay = function(title, artist, imgSrc) {
        document.getElementById('player-title').innerText = title;
        document.getElementById('player-artist').innerText = artist;
        document.getElementById('player-thumb').src = imgSrc;
        
        isPlaying = true;
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    };

    // Initialize Renders
    renderPlaylists();
    renderLikedSongs();
    renderStandardList('list-podcasts', data.podcasts, 'duration', '');
    renderStandardList('list-downloads', data.downloads, 'type', '');
    renderStandardList('list-recent', data.recent, '', 'played');
    renderStandardList('list-history', data.history, 'duration', 'date');

});

function createPlaylist() {
    document.getElementById('createPlaylistModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('cpName').focus(), 100);
}

function closePlaylistModal(e) {
    if (e && e.target !== document.getElementById('createPlaylistModal')) return;
    document.getElementById('createPlaylistModal').classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('createPlaylistForm').reset();
    document.getElementById('cpCharCount').textContent = '0 / 60';
    const preview = document.getElementById('cpCoverPreview');
    const label = document.getElementById('cpCoverLabel');
    preview.hidden = true; preview.src = '';
    label.hidden = false;
}

function previewCover(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        const img = document.getElementById('cpCoverPreview');
        const lbl = document.getElementById('cpCoverLabel');
        img.src = ev.target.result;
        img.hidden = false;
        lbl.hidden = true;
        img.onclick = () => document.getElementById('cpCoverInput').click();
    };
    reader.readAsDataURL(file);
}

document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('cpName');
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            document.getElementById('cpCharCount').textContent = `${nameInput.value.length} / 60`;
        });
    }
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closePlaylistModal();
    });
});

function submitPlaylist(e) {
    e.preventDefault();
    const name = document.getElementById('cpName').value.trim();
    const desc = document.getElementById('cpDesc').value.trim();
    const coverSrc = document.getElementById('cpCoverPreview').src || '';

    // Add to playlists list in the UI
    const container = document.getElementById('list-playlists');
    if (container) {
        const placeholder = coverSrc
            ? `<img src="${coverSrc}" alt="${name}">`
            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:22px;background:#1e1040;">🎵</div>`;
        const row = document.createElement('div');
        row.className = 'list-row';
        row.innerHTML = `
            <div class="row-thumb">
                ${placeholder}
                <div class="row-play-overlay"><i class="fa-solid fa-play"></i></div>
            </div>
            <div class="row-info">
                <h4 class="row-title">${name}</h4>
                <div class="row-meta">
                    <span>Created by You</span><span>•</span>
                    <span>0 Songs</span>
                    <span>•</span><span>🔒 Private</span>
                </div>
                ${desc ? `<div class="row-meta" style="margin-top:2px;font-style:italic;opacity:.7">${desc}</div>` : ''}
            </div>
            <div class="row-extra">Just now</div>
            <div class="row-actions">
                <button class="action-icon accent" title="Share"><i class="fa-solid fa-share-nodes"></i></button>
                <button class="action-icon" title="Remove"><i class="fa-solid fa-trash"></i></button>
            </div>`;
        container.prepend(row);
    }

    closePlaylistModal();

    // Switch to Playlists tab
    const playlistTab = document.querySelector('.pill-btn[data-target="sec-playlists"]');
    if (playlistTab) playlistTab.click();
}