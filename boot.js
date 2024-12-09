document.addEventListener('DOMContentLoaded', function() {
    // CSV data inline
    const CSV_DATA = `brand,gender,us,uk,eu,cm
    Salomon,Men,7,6.5,40,25
    Salomon,Men,7.5,7,40.666,25.5
    Salomon,Men,8,7.5,41.333,26
    Salomon,Men,8.5,8,42,26.5
    Salomon,Men,9,8.5,42.666,27
    Salomon,Men,9.5,9,43.333,27.5
    Salomon,Men,10,9.5,44,28
    Salomon,Men,10.5,10,44.666,28.5
    Salomon,Men,11,10.5,45.333,29
    Salomon,Men,11.5,11,46,29.5
    Salomon,Men,12,11.5,46.666,30
    Salomon,Women,5,3.5,36,22
    Salomon,Women,5.5,4,36.666,22.5
    Salomon,Women,6,4.5,37.333,23
    Salomon,Women,6.5,5,38,23.5
    Salomon,Women,7,5.5,38.666,24
    Salomon,Women,7.5,6,39.333,24.5
    Salomon,Women,8,6.5,40,25
    Salomon,Women,8.5,7,40.666,25.5
    Salomon,Women,9,7.5,41.333,26
    Salomon,Women,9.5,8,42,26.5
    Salomon,Women,10,8.5,42.666,27
    Merrell,Men,7,6.5,40,25
    Merrell,Men,7.5,7,41,25.5
    Merrell,Men,8,7.5,41.5,26
    Merrell,Men,8.5,8,42,26.5
    Merrell,Men,9,8.5,43,27
    Merrell,Men,9.5,9,43.5,27.5
    Merrell,Men,10,9.5,44,28
    Merrell,Men,10.5,10,44.5,28.5
    Merrell,Men,11,10.5,45,29
    Merrell,Men,11.5,11,46,29.5
    Merrell,Men,12,11.5,46.5,30
    Merrell,Women,5,3,35,22
    Merrell,Women,5.5,3.5,36,22.5
    Merrell,Women,6,4,36.5,23
    Merrell,Women,6.5,4.5,37.5,23.5
    Merrell,Women,7,5,38,24
    Merrell,Women,7.5,5.5,38.5,24.5
    Merrell,Women,8,6,39,25
    Merrell,Women,8.5,6.5,40,25.5
    Merrell,Women,9,7,40.5,26
    Merrell,Women,9.5,7.5,41,26.5
    Merrell,Women,10,8,42,27
    Keen,Men,7,6.5,40,25
    Keen,Men,7.5,7,40.5,25.5
    Keen,Men,8,7.5,41,26
    Keen,Men,8.5,8,41.5,26.5
    Keen,Men,9,8.5,42,27
    Keen,Men,9.5,9,42.5,27.5
    Keen,Men,10,9.5,43,28
    Keen,Men,10.5,10,44,28.5
    Keen,Men,11,10.5,44.5,29
    Keen,Men,11.5,11,45,29.5
    Keen,Men,12,11.5,46,30
    Keen,Women,5,2.5,35,22
    Keen,Women,5.5,3,35.5,22.5
    Keen,Women,6,3.5,36,23
    Keen,Women,6.5,4,37,23.5
    Keen,Women,7,4.5,37.5,24
    Keen,Women,7.5,5,38,24.5
    Keen,Women,8,5.5,38.5,25
    Keen,Women,8.5,6,39,25.5
    Keen,Women,9,6.5,39.5,26
    Keen,Women,9.5,7,40,26.5
    Keen,Women,10,7.5,40.5,27
    Oboz,Men,8,7,41,26
    Oboz,Men,8.5,7.5,41.5,26.5
    Oboz,Men,9,8,42,27
    Oboz,Men,9.5,8.5,42.5,27.5
    Oboz,Men,10,9,43,28
    Oboz,Men,10.5,9.5,44,28.5
    Oboz,Men,11,10,44.5,29
    Oboz,Men,11.5,10.5,45,29.5
    Oboz,Men,12,11,45.5,30
    Oboz,Women,6,3.5,36.5,23
    Oboz,Women,6.5,4,37,23.5
    Oboz,Women,7,4.5,37.5,24
    Oboz,Women,7.5,5,38,24.5
    Oboz,Women,8,5.5,38.5,25
    Oboz,Women,8.5,6,39,25.5
    Oboz,Women,9,6.5,39.5,26
    Oboz,Women,9.5,7,40,26.5
    Oboz,Women,10,7.5,40.5,27
    Columbia,Men,7,6,39.5,25
    Columbia,Men,7.5,6.5,40,25.5
    Columbia,Men,8,7,41,26
    Columbia,Men,8.5,7.5,41.5,26.5
    Columbia,Men,9,8,42,27
    Columbia,Men,9.5,8.5,42.5,27.5
    Columbia,Men,10,9,43,28
    Columbia,Men,10.5,9.5,44,28.5
    Columbia,Men,11,10,44.5,29
    Columbia,Men,11.5,10.5,45,29.5
    Columbia,Men,12,11,46,30
    Columbia,Women,5,3,35.5,22
    Columbia,Women,5.5,3.5,36,22.5
    Columbia,Women,6,4,37,23
    Columbia,Women,6.5,4.5,37.5,23.5
    Columbia,Women,7,5,38,24
    Columbia,Women,7.5,5.5,38.5,24.5
    Columbia,Women,8,6,39,25
    Columbia,Women,8.5,6.5,40,25.5
    Columbia,Women,9,7,40.5,26
    Columbia,Women,9.5,7.5,41,26.5
    Columbia,Women,10,8,42,27
    The North Face,Men,7,6,39.5,25
    The North Face,Men,7.5,6.5,40,25.5
    The North Face,Men,8,7,41,26
    The North Face,Men,8.5,7.5,41.5,26.5
    The North Face,Men,9,8,42,27
    The North Face,Men,9.5,8.5,42.5,27.5
    The North Face,Men,10,9,43,28
    The North Face,Men,10.5,9.5,44,28.5
    The North Face,Men,11,10,44.5,29
    The North Face,Men,11.5,10.5,45,29.5
    The North Face,Men,12,11,45.5,30
    The North Face,Women,5,3,35.5,22
    The North Face,Women,5.5,3.5,36,22.5
    The North Face,Women,6,4,37,23
    The North Face,Women,6.5,4.5,37.5,23.5
    The North Face,Women,7,5,38,24
    The North Face,Women,7.5,5.5,38.5,24.5
    The North Face,Women,8,6,39,25
    The North Face,Women,8.5,6.5,40,25.5
    The North Face,Women,9,7,40.5,26
    The North Face,Women,9.5,7.5,41,26.5
    The North Face,Women,10,8,42,27
    Sorel,Men,7,6.5,40,25
    Sorel,Men,7.5,7,40.5,25.5
    Sorel,Men,8,7.5,41,26
    Sorel,Men,8.5,8,42,26.5
    Sorel,Men,9,8.5,42.5,27
    Sorel,Men,9.5,9,43,27.5
    Sorel,Men,10,9.5,44,28
    Sorel,Men,10.5,10,44.5,28.5
    Sorel,Men,11,10.5,45,29
    Sorel,Men,11.5,11,45.5,29.5
    Sorel,Men,12,11.5,46,30
    Sorel,Women,5,3,35.5,22
    Sorel,Women,5.5,3.5,36,22.5
    Sorel,Women,6,4,37,23
    Sorel,Women,6.5,4.5,37.5,23.5
    Sorel,Women,7,5,38,24
    Sorel,Women,7.5,5.5,38.5,24.5
    Sorel,Women,8,6,39,25
    Sorel,Women,8.5,6.5,40,25.5
    Sorel,Women,9,7,40.5,26
    Sorel,Women,9.5,7.5,41,26.5
    Sorel,Women,10,8,42,27`;
    
    // Menu active state handler
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-link');
    menuItem.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });

    // Shoe size conversion function
    function convertToShoeSizes(cmSize, category) {
        const sizes = {
            men: {
                EU: Math.round((cmSize + 2) * 1.5),
                US: Math.round((cmSize - 24) * 1.5 + 7),
                JPN: Math.round(cmSize * 10),
                AUS: Math.round((cmSize - 24) * 1.5 + 6)
            },
            women: {
                EU: Math.round((cmSize + 2) * 1.5),
                US: Math.round((cmSize - 22.5) * 1.5 + 6),
                JPN: Math.round(cmSize * 10),
                AUS: Math.round((cmSize - 22.5) * 1.5 + 5)
            }
        };
        return sizes[category.toLowerCase()] || sizes.men;
    }

    // Boot Size Calculator
    const calculateBtn = document.getElementById('calculate-boot-size-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            try {
                const footLength = parseFloat(document.getElementById('foot-length')?.value);
                const footWidth = parseFloat(document.getElementById('foot-width')?.value);
                const activity = document.getElementById('activity')?.value;
                const category = document.getElementById('category')?.value;

                if (!footLength || !footWidth || !activity || !category) {
                    throw new Error('Please fill in all required fields');
                }

                const calculations = {
                    skiing: { ratio: [0.65, 0.35] },
                    snowshoeing: { ratio: [0.6, 0.4] },
                    trekking: { ratio: [0.7, 0.3] },
                    climbing: { ratio: [0.75, 0.25] },
                    mountaineering: { ratio: [0.65, 0.35] }
                };

                const messages = {
                    skiing: {
                        en: "For skiing, it's important to have a snug fit to ensure control and performance.",
                        fr: "Pour le ski, il est important d'avoir un ajustement serré pour assurer le contrôle et la performance."
                    },
                    snowshoeing: {
                        en: "For snowshoeing, comfort and warmth are key.",
                        fr: "Pour la raquette, le confort et la chaleur sont essentiels."
                    },
                    trekking: {
                        en: "For trekking, a balance of comfort and support is essential.",
                        fr: "Pour la randonnée, un équilibre entre confort et soutien est essentiel."
                    },
                    climbing: {
                        en: "For climbing, a tight fit is crucial for precision and performance.",
                        fr: "Pour l'escalade, un ajustement serré est crucial pour la précision et la performance."
                    },
                    mountaineering: {
                        en: "For mountaineering, warmth and support are key.",
                        fr: "Pour l'alpinisme, la chaleur et le soutien sont essentiels."
                    }
                };

                const [lengthRatio, widthRatio] = calculations[activity].ratio;
                const bootSize = (footLength * lengthRatio + footWidth * widthRatio).toFixed(1);
                const shoeSizes = convertToShoeSizes(parseFloat(bootSize), category);
                const lang = document.documentElement.lang || 'en';

                const elements = {
                    'boot-size': `${lang === 'fr' ? 'Taille recommandée des bottes' : 'Recommended Boot Size'}: ${bootSize} cm`,
                    'boot-size-description': `${messages[activity][lang]} ${lang === 'fr' ? 'La taille recommandée est environ' : 'The recommended size is approximately'} ${bootSize} cm.`,
                    'eu-size': shoeSizes.EU,
                    'us-size': shoeSizes.US,
                    'jpn-size': shoeSizes.JPN,
                    'aus-size': shoeSizes.AUS
                };

                Object.entries(elements).forEach(([id, value]) => {
                    const element = document.getElementById(id);
                    if (element) element.innerText = value;
                });
            } catch (error) {
                console.error('Calculation error:', error);
                alert(error.message);
            }
        });
    }

    // Brand Size Converter
    const sizeData = parseSizeData(CSV_DATA);

    const convertBtn = document.getElementById('convert-size-btn');
    if (convertBtn) {
        convertBtn.addEventListener('click', function() {
            try {
                const sourceBrand = document.getElementById('source-brand')?.value.toLowerCase();
                const sourceGender = document.getElementById('source-gender')?.value.toLowerCase();
                const sourceSize = parseFloat(document.getElementById('source-size')?.value);
                const targetBrand = document.getElementById('target-brand')?.value.toLowerCase();
                const targetGender = document.getElementById('target-gender')?.value.toLowerCase();

                if (!sourceBrand || !sourceGender || !sourceSize || !targetBrand || !targetGender) {
                    throw new Error('Please fill in all required fields');
                }

                const cmSize = findCmSize(sourceBrand, sourceGender, sourceSize);
                if (!cmSize) {
                    throw new Error('Size conversion not found');
                }

                const targetSize = findBrandSize(targetBrand, targetGender, cmSize);
                if (!targetSize) {
                    throw new Error('Size conversion not found for target brand and gender');
                }

                const resultElement = document.getElementById('conversion-result');
                if (resultElement) {
                    resultElement.innerHTML = `Your ${capitalize(sourceBrand)} US ${sourceSize} (${capitalize(sourceGender)}) converts to:<br>
                        ${capitalize(targetBrand)} US ${targetSize.US} / UK ${targetSize.UK} / EU ${targetSize.EU} / CM ${targetSize.CM} (${capitalize(targetGender)})`;
                }
            } catch (error) {
                console.error('Conversion error:', error);
                alert(error.message);
            }
        });
    }

    // Helper functions for size conversion
    function parseSizeData(csvData) {
        const lines = csvData.split('\n');
        const data = {};
        
        lines.slice(1).forEach(line => {
            const [brand, gender, us, uk, eu, cm] = line.trim().split(',');
            if (!brand) return;
            
            const brandKey = brand.toLowerCase();
            const genderKey = gender.toLowerCase();

            if (!data[brandKey]) data[brandKey] = {};
            if (!data[brandKey][genderKey]) data[brandKey][genderKey] = [];
            
            data[brandKey][genderKey].push({
                US: parseFloat(us),
                UK: parseFloat(uk),
                EU: parseFloat(eu),
                CM: parseFloat(cm)
            });
        });
        
        return data;
    }

    function findCmSize(brand, gender, usSize) {
        const sizes = sizeData[brand]?.[gender];
        if (!sizes) return null;
        const size = sizes.find(s => s.US === usSize);
        return size ? size.CM : null;
    }

    function findBrandSize(brand, gender, cmSize) {
        const sizes = sizeData[brand]?.[gender];
        if (!sizes || !sizes.length) return null;
        return sizes.reduce((closest, size) => {
            const currentDiff = Math.abs(size.CM - cmSize);
            const closestDiff = Math.abs(closest.CM - cmSize);
            return currentDiff < closestDiff ? size : closest;
        });
    }

    function capitalize(text) {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    // Language switcher
    document.querySelectorAll('.selection-box').forEach(box => {
        box.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            document.documentElement.lang = lang;
            translatePage(lang);
        });
    });

    function translatePage(lang) {
        document.querySelectorAll('[data-lang-en]').forEach(el => {
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
});