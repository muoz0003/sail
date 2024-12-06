document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-link');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].classList.add('active');
        }
    }

    document.getElementById('calculate-boot-size-btn').addEventListener('click', function() {
        const footLength = parseFloat(document.getElementById('foot-length').value);
        const footWidth = parseFloat(document.getElementById('foot-width').value);
        const activity = document.getElementById('activity').value;
        const category = document.getElementById('category').value;

        let bootSize = '';
        let description = '';

        if (activity === 'skiing') {
            bootSize = (footLength * 0.65 + footWidth * 0.35).toFixed(1);
            description = {
                en: `For skiing, it's important to have a snug fit to ensure control and performance. The recommended ski boot size is approximately ${bootSize} cm.`,
                fr: `Pour le ski, il est important d'avoir un ajustement serré pour assurer le contrôle et la performance. La taille recommandée des bottes de ski est d'environ ${bootSize} cm.`
            };
        } else if (activity === 'snowshoeing') {
            bootSize = (footLength * 0.6 + footWidth * 0.4).toFixed(1);
            description = {
                en: `For snowshoeing, comfort and warmth are key. The recommended snowshoe boot size is approximately ${bootSize} cm.`,
                fr: `Pour la raquette, le confort et la chaleur sont essentiels. La taille recommandée des bottes de raquette est d'environ ${bootSize} cm.`
            };
        } else if (activity === 'trekking') {
            bootSize = (footLength * 0.7 + footWidth * 0.3).toFixed(1);
            description = {
                en: `For trekking, a balance of comfort and support is essential. The recommended trekking boot size is approximately ${bootSize} cm.`,
                fr: `Pour la randonnée, un équilibre entre confort et soutien est essentiel. La taille recommandée des bottes de randonnée est d'environ ${bootSize} cm.`
            };
        } else if (activity === 'climbing') {
            bootSize = (footLength * 0.75 + footWidth * 0.25).toFixed(1);
            description = {
                en: `For climbing, a tight fit is crucial for precision and performance. The recommended climbing shoe size is approximately ${bootSize} cm.`,
                fr: `Pour l'escalade, un ajustement serré est crucial pour la précision et la performance. La taille recommandée des chaussures d'escalade est d'environ ${bootSize} cm.`
            };
        } else if (activity === 'mountaineering') {
            bootSize = (footLength * 0.65 + footWidth * 0.35).toFixed(1);
            description = {
                en: `For mountaineering, warmth and support are key. The recommended mountaineering boot size is approximately ${bootSize} cm.`,
                fr: `Pour l'alpinisme, la chaleur et le soutien sont essentiels. La taille recommandée des bottes d'alpinisme est d'environ ${bootSize} cm.`
            };
        }

        const shoeSizes = convertToShoeSizes(bootSize, category);

        const lang = document.documentElement.lang;
        document.getElementById('boot-size').innerText = lang === 'fr' ? `Taille recommandée des bottes: ${bootSize} cm` : `Recommended Boot Size: ${bootSize} cm`;
        document.getElementById('boot-size-description').innerText = description[lang];
        document.getElementById('eu-size').innerText = shoeSizes.EU;
        document.getElementById('us-size').innerText = shoeSizes.US;
        document.getElementById('jpn-size').innerText = shoeSizes.JPN;
        document.getElementById('aus-size').innerText = shoeSizes.AUS;
    });

    function convertToShoeSizes(cm, category) {
        const size = parseFloat(cm);
        let shoeSizes = {};

        if (category === 'men') {
            shoeSizes = getMensShoeSizes(size);
        } else if (category === 'women') {
            shoeSizes = getWomensShoeSizes(size);
        } else if (category === 'kids') {
            shoeSizes = getKidsShoeSizes(size);
        }

        return shoeSizes;
    }

    function getMensShoeSizes(size) {
        const sizes = [
            { EU: 39, US: 6, JPN: 24.5, AUS: 5 },
            { EU: 40, US: 7, JPN: 25.5, AUS: 6 },
            { EU: 41, US: 8, JPN: 26.5, AUS: 7 },
            { EU: 42, US: 9, JPN: 27.5, AUS: 8 },
            { EU: 43, US: 10, JPN: 28.5, AUS: 9 },
            { EU: 44, US: 11, JPN: 29.5, AUS: 10 },
            { EU: 45, US: 12, JPN: 30.5, AUS: 11 },
            { EU: 46, US: 13, JPN: 31.5, AUS: 12 }
        ];
        return findClosestSize(size, sizes);
    }

    function getWomensShoeSizes(size) {
        const sizes = [
            { EU: 35, US: 5, JPN: 22.0, AUS: 4 },
            { EU: 36, US: 6, JPN: 23.0, AUS: 5 },
            { EU: 37, US: 7, JPN: 24.0, AUS: 6 },
            { EU: 38, US: 8, JPN: 25.0, AUS: 7 },
            { EU: 39, US: 9, JPN: 26.0, AUS: 8 },
            { EU: 40, US: 10, JPN: 27.0, AUS: 9 },
            { EU: 41, US: 11, JPN: 28.0, AUS: 10 },
            { EU: 42, US: 12, JPN: 29.0, AUS: 11 }
        ];
        return findClosestSize(size, sizes);
    }

    function getKidsShoeSizes(size) {
        const sizes = [
            { EU: 23, US: 7, JPN: 12.5, AUS: 6 },
            { EU: 24, US: 8, JPN: 13.5, AUS: 7 },
            { EU: 25, US: 9, JPN: 14.5, AUS: 8 },
            { EU: 26, US: 10, JPN: 15.5, AUS: 9 },
            { EU: 27, US: 11, JPN: 16.5, AUS: 10 },
            { EU: 28, US: 12, JPN: 17.5, AUS: 11 },
            { EU: 29, US: 13, JPN: 18.5, AUS: 12 },
            { EU: 30, US: 1, JPN: 19.5, AUS: 13 }
        ];
        return findClosestSize(size, sizes);
    }

    function findClosestSize(size, sizes) {
        let closest = sizes[0];
        let minDiff = Math.abs(size - closest.JPN);
        for (let i = 1; i < sizes.length; i++) {
            const diff = Math.abs(size - sizes[i].JPN);
            if (diff < minDiff) {
                closest = sizes[i];
                minDiff = diff;
            }
        }
        return closest;
    }

    // Language switcher
    const languageSelector = document.querySelectorAll('.selection-box');
    languageSelector.forEach(box => {
        box.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            document.documentElement.lang = lang;
            translatePage(lang);
        });
    });

    function translatePage(lang) {
        const elements = document.querySelectorAll('[data-lang-en]');
        elements.forEach(el => {
            el.innerText = el.getAttribute(`data-lang-${lang}`);
        });
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
});