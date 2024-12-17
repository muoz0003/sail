document.addEventListener('DOMContentLoaded', function () {
    const resultDiv = document.getElementById('result');

    // Create share button
    const shareButton = document.createElement('button');
    shareButton.classList.add('btn', 'btn-info', 'mt-3');
    shareButton.innerHTML = '<i class="fas fa-share"></i> Share Results';
    resultDiv.appendChild(shareButton);

    // Create email input field
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.classList.add('form-control', 'mt-2');
    emailInput.placeholder = 'Enter your email';
    resultDiv.appendChild(emailInput);

    // Handle share button click
    shareButton.addEventListener('click', function () {
        const email = emailInput.value;
        if (!email) {
            alert('Please enter a valid email address.');
            return;
        }

        const recommendedSkiSize = document.querySelector('.card-text').textContent;
        const skiRecommendations = Array.from(document.querySelectorAll('.card-body'))
            .map(card => card.innerText)
            .join('\n\n');

        const emailBody = `Recommended Ski Size:\n${recommendedSkiSize}\n\nSki Recommendations:\n${skiRecommendations}`;

        window.location.href = `mailto:${email}?subject=Ski Size Recommendations&body=${encodeURIComponent(emailBody)}`;
    });
});