// --- Slide Data ---
const slides = [
    {
        image: "./assets/signup-bg-banner1.png",
        heading: "Play thousands of audiobooks, stories, and podcasts.",
        subtext: "Listen to your favorite audio stories, audiobooks, and podcasts anytime, anywhere."
    },
    {
        image: "./assets/signup-bg-banner2.png",
        heading: "Discover premium podcasts across India.",
        subtext: "Dive into educational, entertaining, and storytelling content created by top artists."
    },
    {
        image: "./assets/signup-bg-banner3.png",
        heading: "Enjoy exclusive audio experiences.",
        subtext: "Fund productions, explore rap battles, and immerse yourself in Thala Nivitham Originals."
    }
];

// --- Banner Slider Logic ---
let currentSlide = 0;
const bannerTrack = document.getElementById('bannerTrack');
const bannerHeading = document.getElementById('bannerHeading');
const bannerSubtext = document.getElementById('bannerSubtext');

// Initialize images
function initSlider() {
    slides.forEach((slide, index) => {
        const img = document.createElement('img');
        img.src = slide.image;
        img.className = `banner-img ${index === 0 ? 'active' : ''}`;
        img.id = `slide-${index}`;
        bannerTrack.appendChild(img);
    });
    
    // Start interval
    setInterval(nextSlide, 5000);
}

function nextSlide() {
    // Hide current
    document.getElementById(`slide-${currentSlide}`).classList.remove('active');
    
    // Update index
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Show next
    document.getElementById(`slide-${currentSlide}`).classList.add('active');
    
    // Update Text with animation trigger
    const textContainerH1 = bannerHeading.parentElement;
    
    // Remove animation class to reset
    textContainerH1.style.animation = 'none';
    bannerSubtext.style.animation = 'none';
    
    // Trigger reflow
    void textContainerH1.offsetWidth; 
    
    // Update text
    bannerHeading.innerText = slides[currentSlide].heading;
    bannerSubtext.innerText = slides[currentSlide].subtext;
    
    // Re-add animation
    textContainerH1.style.animation = 'slideUpFade 0.8s ease forwards';
    bannerSubtext.style.animation = 'slideUpFade 1s ease forwards';
}

// --- Form Switching Logic (Mobile vs Email) ---
let isMobileMode = true;

const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');
const inputContainer = document.getElementById('inputContainer');
const submitBtn = document.getElementById('submitBtn');
const toggleMethodBtn = document.getElementById('toggleMethodBtn');
const headerIcon = document.getElementById('headerIcon');

// SVG Icons
const phoneIconSVG = `<svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`;
const emailIconSVG = `<svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
const phoneBtnSVG = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`;
const emailBtnSVG = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="#ef4444" stroke-width="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;

function toggleAuthMethod() {
    isMobileMode = !isMobileMode;

    if (isMobileMode) {
        // Switch to Mobile Form
        headerIcon.innerHTML = phoneIconSVG;
        formTitle.innerText = "Enter your mobile number";
        formSubtitle.innerText = "We will send an SMS with a 4-digit OTP";
        
        inputContainer.innerHTML = `
            <div class="mobile-input-wrapper">
                <div class="country-code">
                    <span class="flag">🇮🇳</span>
                    <span>(+91)</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <input type="tel" id="mobileInput" placeholder="Enter Mobile no." required>
            </div>
        `;
        
        submitBtn.innerText = "Send OTP";
        toggleMethodBtn.innerHTML = `${emailBtnSVG}<span>Email</span>`;
        
    } else {
        // Switch to Email Form
        headerIcon.innerHTML = emailIconSVG;
        formTitle.innerText = "Enter your Email Address";
        formSubtitle.innerText = "We will send an Email with a 4-digit OTP";
        
        inputContainer.innerHTML = `
            <div class="email-input-wrapper">
                <input type="email" id="emailInput" placeholder="Enter your Email Address" required>
            </div>
        `;
        
        submitBtn.innerText = "Send OTP on Email";
        toggleMethodBtn.innerHTML = `${phoneBtnSVG}<span>Mobile</span>`;
    }
}

// --- OTP Step ---
let sentTo = "";

function handleSendOTP(e) {
    e.preventDefault();

    let inputValue = "";
    if (isMobileMode) {
        inputValue = document.getElementById('mobileInput')?.value || "";
    } else {
        inputValue = document.getElementById('emailInput')?.value || "";
    }

    if (inputValue.trim() === "") return;

    sentTo = inputValue.trim();

    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    setTimeout(() => {
        showOTPStep();
    }, 1200);
}

function showOTPStep() {
    const authForm = document.getElementById('authForm');
    const formTitle = document.getElementById('formTitle');
    const formSubtitle = document.getElementById('formSubtitle');
    const headerIcon = document.getElementById('headerIcon');

    headerIcon.innerHTML = `<svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;
    formTitle.innerText = "Enter OTP";
    formSubtitle.innerHTML = `OTP sent to <strong>${sentTo}</strong>`;

    authForm.onsubmit = handleVerifyOTP;
    authForm.innerHTML = `
        <div class="otp-boxes" id="otpContainer">
            <input class="otp-input" type="text" maxlength="1" inputmode="numeric" pattern="[0-9]" autocomplete="one-time-code" />
            <input class="otp-input" type="text" maxlength="1" inputmode="numeric" pattern="[0-9]" />
            <input class="otp-input" type="text" maxlength="1" inputmode="numeric" pattern="[0-9]" />
            <input class="otp-input" type="text" maxlength="1" inputmode="numeric" pattern="[0-9]" />
        </div>
        <p id="otpError" class="otp-error"></p>
        <button type="submit" class="primary-btn" id="verifyBtn">Verify & Login</button>
        <button type="button" class="otp-resend-btn" id="resendBtn" onclick="resendOTP()">Resend OTP</button>
        <p class="otp-back" onclick="goBack()">← Change ${isMobileMode ? 'number' : 'email'}</p>
    `;

    initOTPBoxes();
}

function initOTPBoxes() {
    const inputs = document.querySelectorAll('.otp-input');
    inputs[0].focus();
    inputs.forEach((inp, i) => {
        inp.addEventListener('input', () => {
            inp.value = inp.value.replace(/\D/g, '');
            if (inp.value && i < inputs.length - 1) inputs[i + 1].focus();
        });
        inp.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !inp.value && i > 0) inputs[i - 1].focus();
        });
        inp.addEventListener('paste', (e) => {
            e.preventDefault();
            const digits = (e.clipboardData.getData('text').replace(/\D/g, '')).split('');
            inputs.forEach((box, j) => { if (digits[j]) box.value = digits[j]; });
            const last = Math.min(digits.length, inputs.length) - 1;
            inputs[last].focus();
        });
    });
}

function handleVerifyOTP(e) {
    e.preventDefault();
    const inputs = document.querySelectorAll('.otp-input');
    const otp = Array.from(inputs).map(i => i.value).join('');
    const errorEl = document.getElementById('otpError');
    const verifyBtn = document.getElementById('verifyBtn');

    if (otp.length < 4) {
        errorEl.textContent = 'Please enter all 4 digits.';
        return;
    }

    errorEl.textContent = '';
    verifyBtn.textContent = 'Verifying...';
    verifyBtn.disabled = true;
    verifyBtn.style.opacity = '0.7';

    setTimeout(() => {
        window.location.href = 'subscription.html';
    }, 1000);
}

function resendOTP() {
    const btn = document.getElementById('resendBtn');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    setTimeout(() => {
        btn.textContent = 'OTP Resent!';
        setTimeout(() => {
            btn.textContent = 'Resend OTP';
            btn.disabled = false;
        }, 2000);
    }, 1200);
}

function goBack() {
    const authForm = document.getElementById('authForm');
    authForm.onsubmit = handleSendOTP;
    const headerIcon = document.getElementById('headerIcon');
    const formTitle = document.getElementById('formTitle');
    const formSubtitle = document.getElementById('formSubtitle');

    if (isMobileMode) {
        headerIcon.innerHTML = phoneIconSVG;
        formTitle.innerText = 'Enter your mobile number';
        formSubtitle.innerText = 'We will send an SMS with a 4-digit OTP';
        authForm.innerHTML = `
            <div class="input-group" id="inputContainer">
                <div class="mobile-input-wrapper">
                    <div class="country-code">
                        <span class="flag">🇮🇳</span>
                        <span>(+91)</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <input type="tel" id="mobileInput" placeholder="Enter Mobile no." required>
                </div>
            </div>
            <button type="submit" class="primary-btn" id="submitBtn">Send OTP</button>
            <div class="divider"><span>Or continue with</span></div>
            ${socialGridHTML()}
            <div class="footer-text">By proceeding, you agree to our <a href="#">Privacy Policy</a> and <a href="#">Terms of Services</a></div>
        `;
    } else {
        headerIcon.innerHTML = emailIconSVG;
        formTitle.innerText = 'Enter your Email Address';
        formSubtitle.innerText = 'We will send an Email with a 4-digit OTP';
        authForm.innerHTML = `
            <div class="input-group" id="inputContainer">
                <div class="email-input-wrapper">
                    <input type="email" id="emailInput" placeholder="Enter your Email Address" required>
                </div>
            </div>
            <button type="submit" class="primary-btn" id="submitBtn">Send OTP on Email</button>
            <div class="divider"><span>Or continue with</span></div>
            ${socialGridHTML()}
            <div class="footer-text">By proceeding, you agree to our <a href="#">Privacy Policy</a> and <a href="#">Terms of Services</a></div>
        `;
    }
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('submitBtn').style.opacity = '1';
}

function socialGridHTML() {
    return `
        <div class="social-grid">
            <button type="button" class="social-btn" id="toggleMethodBtn" onclick="toggleAuthMethod()">
                ${isMobileMode ? emailBtnSVG + '<span>Email</span>' : phoneBtnSVG + '<span>Mobile</span>'}
            </button>
            <button type="button" class="social-btn">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="#4285F4" stroke-width="2" fill="none"><path d="M21.64,12.2045 C21.64,11.3323 21.5627,10.6359 21.3927,9.9245 L12,9.9245 L12,14.3686 L17.5145,14.3686 C17.36,15.6536 16.5255,17.4114 14.8873,18.5709 L14.8873,21.4395 L18.0691,21.4395 C19.9855,19.605 21.64,16.2736 21.64,12.2045 Z" fill="#4285F4" stroke="none"></path><path d="M12,22 C14.7127,22 16.9927,21.0664 18.6836,19.4395 L15.5018,16.5709 C14.6364,17.18 13.4327,17.6259 12,17.6259 C9.1255,17.6259 6.6927,15.6027 5.8091,12.8718 L2.5182,12.8718 L2.5182,15.5245 C4.2582,19.1305 7.84,22 12,22 Z" fill="#34A853" stroke="none"></path><path d="M5.8091,12.8718 C5.5773,12.15 5.4382,11.3836 5.4382,10.5986 C5.4382,9.8136 5.5773,9.0473 5.8091,8.3255 L5.8091,5.6727 L2.5182,5.6727 C1.8073,7.15 1.3909,8.8182 1.3909,10.5986 C1.3909,12.3791 1.8073,14.0473 2.5182,15.5245 L5.8091,12.8718 Z" fill="#FBBC05" stroke="none"></path><path d="M12,3.5741 C13.8836,3.5741 15.3127,4.4173 16.14,5.2341 L18.7709,2.5027 C16.9845,0.7627 14.7045,0 12,0 C7.84,0 4.2582,2.8695 2.5182,6.4755 L5.8091,9.1282 C6.6927,6.3973 9.1255,3.5741 12,3.5741 Z" fill="#EA4335" stroke="none"></path></svg>
                <span>Google</span>
            </button>
            <button type="button" class="social-btn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                <span>Facebook</span>
            </button>
            <button type="button" class="social-btn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff" stroke="none"><path d="M12 2.04C10.5 2.04 9 3.12 8.7 4.62c-.12.48 0 1.02.18 1.44.18.42.54.78.96.96.42.18.96.3 1.44.18 1.5-.3 2.58-1.8 2.58-3.3 0-.48-.12-.96-.3-1.44-.18-.42-.54-.78-.96-.96-.42-.18-.96-.3-1.44-.18H12zm-3.36 4.68C7.02 6.72 5.28 7.8 4.2 9.54c-2.4 4.02-1.02 9.78 1.32 13.08 1.14 1.62 2.58 3.36 4.38 3.36 1.74 0 2.64-1.08 4.74-1.08 2.1 0 3 .96 4.68 1.02 1.86.06 3.06-1.5 4.14-3.06 1.32-1.92 1.86-3.78 1.92-3.9-.06-.06-3.66-1.38-3.66-5.58 0-3.48 2.82-5.16 2.94-5.22-1.62-2.4-4.14-2.7-5.04-2.76-2.16-.18-4.26 1.32-5.34 1.32-1.08 0-2.82-1.26-4.62-1.2z"></path></svg>
                <span>Apple</span>
            </button>
        </div>
    `;
}

// Start everything when DOM is ready
document.addEventListener('DOMContentLoaded', initSlider);