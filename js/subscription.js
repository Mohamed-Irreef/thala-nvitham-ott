document.addEventListener('DOMContentLoaded', () => {

    // Target all plan selection buttons
    const planButtons = document.querySelectorAll('.plan-btn');

    // Attach click event for plan alerts
    planButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Retrieve the specific plan name from the data attribute
            const planName = e.target.getAttribute('data-plan');
            alert(`You selected the ${planName} plan`);
        });
    });

    // Target the Compare Plans button
    const compareBtn = document.getElementById('compareBtn');
    
    // Attach click event for redirection
    if (compareBtn) {
        compareBtn.addEventListener('click', () => {
            window.location.href = 'subscription-comparison.html';
        });
    }

});