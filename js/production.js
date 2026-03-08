document.addEventListener('DOMContentLoaded', () => {

    // --- Tab Switching Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.prod-form');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked tab and corresponding form
            btn.classList.add('active');
            const targetFormId = btn.getAttribute('data-target');
            document.getElementById(targetFormId).classList.add('active');
        });
    });

    // --- Image Upload Preview Logic ---
    const imageInputs = document.querySelectorAll('.img-input');
    
    imageInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            // Find the preview area within the same file-upload div
            const previewArea = e.target.parentElement.querySelector('.preview-area');
            const label = e.target.parentElement.querySelector('label');
            
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Create or update img element
                    let img = previewArea.querySelector('img');
                    if (!img) {
                        img = document.createElement('img');
                        previewArea.appendChild(img);
                    }
                    img.src = event.target.result;
                    img.style.display = 'block';
                    label.style.display = 'none'; // Hide the icon text once image is selected
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // --- Form Submission & Validation Logic ---
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Basic validation check (html 'required' tags handle most of it natively)
            if(form.checkValidity()) {
                showPopup();
                form.reset(); // Clear form after submission
                
                // Reset image previews
                const previews = form.querySelectorAll('.preview-area img');
                const labels = form.querySelectorAll('.file-upload label');
                previews.forEach(p => p.style.display = 'none');
                labels.forEach(l => l.style.display = 'block');
            }
        });
    });

});

// --- Popup Logic ---
function showPopup() {
    const popup = document.getElementById('success-popup');
    popup.classList.add('show');
}

function closePopup() {
    const popup = document.getElementById('success-popup');
    popup.classList.remove('show');
}