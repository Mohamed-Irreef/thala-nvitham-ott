document.addEventListener('DOMContentLoaded', () => {

    // Target elements
    const planCards = document.querySelectorAll('.plan-card');
    const mainCtaBtn = document.getElementById('main-cta-btn');
    const ctaSubtext = document.getElementById('cta-subtext');

    // Add click event to each plan card
    planCards.forEach(card => {
        card.addEventListener('click', () => {
            
            // 1. Remove 'selected' class from all cards
            planCards.forEach(c => c.classList.remove('selected'));
            
            // 2. Add 'selected' class to the clicked card
            card.classList.add('selected');

            // 3. Extract data attributes
            const selectedPlanName = card.getAttribute('data-plan');
            const selectedPlanBilling = card.getAttribute('data-billing');

            // 4. Update the UI dynamically
            mainCtaBtn.textContent = `Join ${selectedPlanName}`;
            ctaSubtext.textContent = `*${selectedPlanBilling}`;
            
            // Add a brief scale animation to the button to draw attention
            mainCtaBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                mainCtaBtn.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Alert on CTA click for demonstration purposes
    mainCtaBtn.addEventListener('click', () => {
        const activePlan = document.querySelector('.plan-card.selected').getAttribute('data-plan');
        alert(`Redirecting to payment gateway for: ${activePlan}`);
    });

});