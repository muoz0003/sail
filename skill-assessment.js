// skill-assessment.js

document.addEventListener('DOMContentLoaded', () => {
    // Animated Background - Falling Snowflakes
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
                opacity: Math.random(),
                speedX: Math.random() * 3 - 1.5,
                speedY: Math.random() * 3 + 1,
                radius: Math.random() * 4 + 1
            });
        }
    }

    function drawSnowflakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.beginPath();
        for (let i = 0; i < snowflakes.length; i++) {
            const sf = snowflakes[i];
            ctx.moveTo(sf.x, sf.y);
            ctx.arc(sf.x, sf.y, sf.radius, 0, Math.PI * 2, true);
        }
        ctx.fill();
        updateSnowflakes();
    }

    function updateSnowflakes() {
        for (let i = 0; i < snowflakes.length; i++) {
            const sf = snowflakes[i];
            sf.x += sf.speedX;
            sf.y += sf.speedY;

            if (sf.y > canvas.height) {
                sf.x = Math.random() * canvas.width;
                sf.y = -sf.radius;
            }
        }
    }

    function animateSnowflakes() {
        drawSnowflakes();
        requestAnimationFrame(animateSnowflakes);
    }

    createSnowflakes();
    animateSnowflakes();

    // Adjust canvas size on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Skill Assessment Functionality
    const calculateSkillBtn = document.getElementById('calculate-skill-btn');

    calculateSkillBtn.addEventListener('click', () => {
        console.log('Calculate button clicked'); // Debugging statement

        let totalScore = 0;

        // Retrieve values from the form
        const experience = parseInt(document.getElementById('experience').value);
        const terrain = parseInt(document.getElementById('terrain').value);
        const fitness = parseInt(document.getElementById('fitness').value);
        const equipment = parseInt(document.getElementById('equipment').value);

        console.log('Experience:', experience); // Debugging statement
        console.log('Terrain:', terrain); // Debugging statement
        console.log('Fitness:', fitness); // Debugging statement
        console.log('Equipment:', equipment); // Debugging statement

        // Calculate total score
        totalScore = experience + terrain + fitness + equipment;
        console.log('Total Score:', totalScore); // Debugging statement

        // Determine skill level
        let skillLevel = '';
        if (totalScore <= 10) {
            skillLevel = document.documentElement.lang === 'fr' ? 'Débutant' : 'Beginner';
        } else if (totalScore <= 14) {
            skillLevel = document.documentElement.lang === 'fr' ? 'Intermédiaire' : 'Intermediate';
        } else if (totalScore <= 17) {
            skillLevel = document.documentElement.lang === 'fr' ? 'Avancé' : 'Advanced';
        } else {
            skillLevel = document.documentElement.lang === 'fr' ? 'Expert' : 'Expert';
        }
        console.log('Skill Level:', skillLevel); // Debugging statement

        // Display the skill level
        document.getElementById('skill-level').textContent = skillLevel;
        document.getElementById('skill-results').style.display = 'block';

        // Smooth scroll to results
        document.getElementById('skill-results').scrollIntoView({ behavior: 'smooth' });
    });

    // Language Switcher
    const languageBoxes = document.querySelectorAll('.language-selector .selection-box');
    languageBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const lang = box.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    function switchLanguage(lang) {
        document.documentElement.lang = lang;

        // Update text for all elements with data-lang attributes
        const elements = document.querySelectorAll('[data-lang-en]');
        elements.forEach(el => {
            if (lang === 'fr') {
                el.textContent = el.getAttribute('data-lang-fr');
            } else {
                el.textContent = el.getAttribute('data-lang-en');
            }
        });
    }

    // Set default language to English
    switchLanguage('en');
});