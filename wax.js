document.addEventListener('DOMContentLoaded', function () {
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-link');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].classList.add('active');
        }
    }

    // Canvas animation for snow
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const snowflakes = [];

    function createSnowflakes() {
        for (let i = 0; i < 100; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 4 + 1,
                speed: Math.random() * 1 + 0.5
            });
        }
    }

    function drawSnowflakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.5; // Set transparency level
        ctx.fillStyle = 'white';
        ctx.beginPath();
        snowflakes.forEach(snowflake => {
            ctx.moveTo(snowflake.x, snowflake.y);
            ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
        });
        ctx.fill();
        updateSnowflakes();
    }

    function updateSnowflakes() {
        snowflakes.forEach(snowflake => {
            snowflake.y += snowflake.speed;
            if (snowflake.y > canvas.height) {
                snowflake.y = 0;
                snowflake.x = Math.random() * canvas.width;
            }
        });
    }

    function animate() {
        drawSnowflakes();
        requestAnimationFrame(animate);
    }

    createSnowflakes();
    animate();

    // Adjust canvas size on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const languageSelector = document.querySelectorAll('.language-selector .selection-box');
    let currentLang = 'en';

    languageSelector.forEach(box => {
        box.addEventListener('click', () => {
            currentLang = box.getAttribute('data-lang');
            document.querySelectorAll('[data-lang-en]').forEach(el => {
                el.textContent = el.getAttribute(`data-lang-${currentLang}`);
            });
        });
    });

    document.getElementById('waxForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const temperature = document.getElementById('temperature').value;
        const snowCondition = document.getElementById('snowCondition').value;
        let recommendation = '';

        if (currentLang === 'en') {
            if (temperature > 10) {
                recommendation = 'It\'s too warm for skiing! Use slippers and go to the beach instead.';
            } else if (temperature >= 0) {
                recommendation = 'Use warm wax (Red or Yellow)';
            } else if (temperature < 0 && temperature >= -10) {
                if (snowCondition === 'new') {
                    recommendation = 'Use medium wax (Blue)';
                } else if (snowCondition === 'old' || snowCondition === 'icy') {
                    recommendation = 'Use cold wax (Green)';
                }
            } else if (temperature < -10) {
                recommendation = 'Use extra cold wax (Green or White)';
            }
        } else if (currentLang === 'fr') {
            if (temperature > 10) {
                recommendation = 'Il fait trop chaud pour skier ! Utilisez des pantoufles et allez à la plage à la place.';
            } else if (temperature >= 0) {
                recommendation = 'Utilisez de la cire chaude (Rouge ou Jaune)';
            } else if (temperature < 0 && temperature >= -10) {
                if (snowCondition === 'new') {
                    recommendation = 'Utilisez de la cire moyenne (Bleue)';
                } else if (snowCondition === 'old' || snowCondition === 'icy') {
                    recommendation = 'Utilisez de la cire froide (Verte)';
                }
            } else if (temperature < -10) {
                recommendation = 'Utilisez de la cire extra froide (Verte ou Blanche)';
            }
        }

        document.getElementById('recommendation').innerText = `Recommended Wax: ${recommendation}`;
    });
});