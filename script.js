document.addEventListener('DOMContentLoaded', () => {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const genderSelect = document.getElementById('gender');
    const recommendedLength = document.getElementById('recommended-length');
    const recommendedWidth = document.getElementById('recommended-width');
    const suggestedSkiSize = document.getElementById('suggested-ski-size');
    const recommendedSnowshoeLength = document.getElementById('recommended-snowshoe-length');
    const recommendedPoleLength = document.getElementById('recommended-pole-length');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const selectionBoxes = document.querySelectorAll('.selection-box');

    const skis = [{
            brand: 'FISCHER',
            model: 'Spider 62 Crown Xtralite',
            width: 62,
            sizes: [169, 179, 189, 199]
        },
        {
            brand: 'SALOMON',
            model: 'RC+ Grip with Prolink Access Binding - Kids',
            width: 45,
            sizes: [121, 131, 141, 151, 161]
        },
        {
            brand: 'FISCHER',
            model: 'Aerolite Skate 60 IFP',
            width: 41,
            sizes: [176, 181, 186]
        },
        {
            brand: 'SALOMON',
            model: 'RC7+ eSKIN with Prolink Shift Binding',
            width: 44,
            sizes: [174, 182, 190, 198, 206]
        },
        {
            brand: 'SALOMON',
            model: 'RC8+ eSKIN with Prolink Shift Binding',
            width: 44,
            sizes: [174, 182, 190, 198, 206]
        },
        {
            brand: 'SALOMON',
            model: 'Escape Snow 59 POSI with Prolink Auto Binding',
            width: 59,
            sizes: [163, 173, 183, 193]
        },
        {
            brand: 'FISCHER',
            model: 'Twin Skin Power EF',
            width: 51,
            sizes: [184, 189, 194, 199]
        },
        {
            brand: 'FISCHER',
            model: 'Sports Crown EF',
            width: 50,
            sizes: [179, 184, 189, 194, 199]
        },
        {
            brand: 'ROSSIGNOL',
            model: 'Evo Xc 60 R-Skin with Control SI Ski Bindings',
            width: 60,
            sizes: [165, 175, 185, 195]
        },
        {
            brand: 'ROSSIGNOL',
            model: 'Evo OT 65 Positrack IFP with Control SI Ski Bindings',
            width: 65,
            sizes: [165, 175, 185, 195]
        },
        {
            brand: 'ATOMIC',
            model: 'Pro C2 Skintec Med with Prolink Shift CL Binding',
            width: 45,
            sizes: [174, 181, 188, 195, 202, 209]
        },
        {
            brand: 'ATOMIC',
            model: 'Pro C1 Skintec Med with Prolink Shift CL Binding',
            width: 45,
            sizes: [174, 181, 188, 195, 202, 209]
        },
        {
            brand: 'FISCHER',
            model: 'Twin Skin Sport EF',
            width: 51,
            sizes: [179, 184, 189, 194, 199]
        },
        {
            brand: 'ROSSIGNOL',
            model: 'BC 80 Positrack',
            width: 80,
            sizes: [166, 176, 186, 196]
        },
        {
            brand: 'ROSSIGNOL',
            model: 'XT Venture WXLS',
            width: 70,
            sizes: [176, 186, 191]
        },
        {
            brand: 'ATOMIC',
            model: 'Savor 48 Skintec Med + PA',
            width: 48,
            sizes: [174, 184, 194, 204]
        },
        {
            brand: 'ATOMIC',
            model: 'Savor 52 Grip + Prolink Access CL',
            width: 52,
            sizes: [177, 184, 191, 198, 205]
        },
        {
            brand: 'ATOMIC',
            model: 'Savor 48 Skintec Hard with Prolink Shift Pro CL Binding',
            width: 48,
            sizes: [204]
        },
        {
            brand: 'SALOMON',
            model: 'Escape 48 eSKIN Cross-country Skis and X-Stiff Shift Binding',
            width: [48, 46, 44, 46],
            sizes: [180, 206]
        },
        {
            brand: 'ATOMIC',
            model: 'Pro C1 Skintec Hard Cross-country Skis with Prolink Shift CL Binding',
            width: 47,
            sizes: [209]
        },
        {
            brand: 'ROSSIGNOL',
            model: 'Delta Sport R-Skin',
            width: 44,
            sizes: [176, 186, 196]
        },
        {
            brand: 'ROSSIGNOL',
            model: 'Delta Comp R-Skin',
            width: 44,
            sizes: [176, 186, 196]
        },
        {
            brand: 'FISCHER',
            model: 'Speedmax 3D Skate Plus',
            width: 41,
            sizes: [181, 186, 191]
        },
        {
            brand: 'FISCHER',
            model: 'Carbonlite Skate Plus',
            width: 41,
            sizes: [181, 186, 191]
        },
        {
            brand: 'SALOMON',
            model: 'S/Max Carbon Skate',
            width: 44,
            sizes: [170, 177, 182, 187, 192]
        },
        {
            brand: 'SALOMON',
            model: 'S/Race Skate',
            width: 44,
            sizes: [170, 177, 182, 187, 192]
        },
        {
            brand: 'ATOMIC',
            model: 'Redster S9 Gen S',
            width: 44,
            sizes: [170, 177, 184, 191]
        },
        {
            brand: 'ATOMIC',
            model: 'Redster C9 Carbon',
            width: 44,
            sizes: [170, 177, 184, 191]
        },
        {
            brand: 'MADSHUS',
            model: 'Redline 3.0 Skate',
            width: 44,
            sizes: [170, 177, 184, 191]
        },
        {
            brand: 'MADSHUS',
            model: 'Redline 3.0 Classic',
            width: 44,
            sizes: [170, 177, 184, 191]
        },
        {
            brand: 'FISCHER',
            model: 'RCR Skate',
            width: 41,
            sizes: [176, 181, 186]
        },
        {
            brand: 'FISCHER',
            model: 'RCS Skate Plus',
            width: 41,
            sizes: [176, 181, 186]
        },
        {
            brand: 'ROSSIGNOL',
            model: 'X-IUM Skate',
            width: 44,
            sizes: [173, 180, 187, 193]
        },
        {
            brand: 'ROSSIGNOL',
            model: 'X-IUM Classic',
            width: 44,
            sizes: [173, 180, 187, 193]
        },
        {
            brand: 'SALOMON',
            model: 'S/Max Skate',
            width: 44,
            sizes: [170, 177, 182, 187, 192]
        },
        {
            brand: 'SALOMON',
            model: 'S/Race Classic',
            width: 44,
            sizes: [170, 177, 182, 187, 192]
        },
        {
            brand: 'ATOMIC',
            model: 'Redster C7 Skintec',
            width: 44,
            sizes: [170, 177, 184, 191]
        },
        {
            brand: 'ATOMIC',
            model: 'Redster C8 Skintec',
            width: 44,
            sizes: [170, 177, 184, 191]
        },
        {
            brand: 'MADSHUS',
            model: 'Hypersonic Skate',
            width: 44,
            sizes: [170, 177, 184, 191]
        },
        {
            brand: 'MADSHUS',
            model: 'Hypersonic Classic',
            width: 44,
            sizes: [170, 177, 184, 191]
        }
    ];

    function calculateSkiDimensions() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const gender = genderSelect.value;
        const styleElement = document.querySelector('.selection-box.selected[data-group="style"]');
        const skillElement = document.querySelector('.selection-box.selected[data-group="skill"]');
        const terrainElement = document.querySelector('.selection-box.selected[data-group="terrain"]');

        if (!styleElement || !skillElement || !terrainElement) {
            alert('Please select your activity, skill level, and terrain type.');
            return;
        }

        const style = styleElement.getAttribute('data-value');
        const skill = skillElement.getAttribute('data-value');
        const terrain = terrainElement.getAttribute('data-value');

        if (isNaN(weight) || isNaN(height)) {
            alert('Please enter valid weight and height.');
            return;
        }

        const weightInKg = weight + 5; // Add 5 kg for gear
        const heightInCm = height;

        if (style === 'snowshoeing') {
            // Calculate snowshoe size
            const snowshoeSize = calculateSnowshoeSize(weightInKg, terrain);
            recommendedSnowshoeLength.textContent = `${snowshoeSize} inches`;

            // Calculate ski pole length
            let poleLength = heightInCm * 0.68; // Adjusted for snowshoeing
            const roundedPoleLength = Math.round(poleLength / 5) * 5;
            recommendedPoleLength.textContent = roundedPoleLength;

            // Hide ski recommendations
            recommendedLength.textContent = '';
            recommendedWidth.textContent = '';
            suggestedSkiSize.textContent = '';

        } else {
            let length = 0;
            let width = 0;

            if (style === 'cross-country') {
                length = heightInCm * (skill === 'beginner' ? 1.1 : 1.2);
            } else if (style === 'skate') {
                length = heightInCm * (skill === 'beginner' ? 1.05 : 1.1);
            }

            if (weightInKg > 75) {
                length += 5;
            } else if (weightInKg < 55) {
                length -= 5;
            }

            if (terrain === 'backcountry' || terrain === 'mixed') {
                length -= 5;

                const desiredPressure = 4000; // 4 kPa in N/m^2
                const gravity = 9.81; // m/s^2
                const weightInNewton = weightInKg * gravity;
                const skiLengthInMeters = length / 100;
                const surfaceArea = weightInNewton / desiredPressure;
                width = (surfaceArea / (2 * skiLengthInMeters)) * 1000;

                if (width < 55) {
                    width = 55;
                }
            } else {
                width = style === 'cross-country' ? 45 : 40;
            }

            const roundedLength = Math.round(length);
            const roundedWidth = Math.round(width);
            recommendedLength.textContent = roundedLength;
            recommendedWidth.textContent = roundedWidth;

            let closestSki = null;
            let closestDifference = Infinity;

            skis.forEach(ski => {
                ski.sizes.forEach(size => {
                    const difference = Math.abs(size - roundedLength);
                    if (difference < closestDifference) {
                        closestSki = {
                            ...ski,
                            closestSize: size
                        };
                        closestDifference = difference;
                    }
                });
            });

            if (closestSki) {
                suggestedSkiSize.innerHTML = `Brand: ${closestSki.brand}, Model: ${closestSki.model}, Length: ${closestSki.closestSize} cm, Width: ${roundedWidth} mm`;
            } else {
                suggestedSkiSize.textContent = 'No suitable ski found for the given dimensions.';
            }

            // Calculate snowshoe size
            const snowshoeSize = calculateSnowshoeSize(weightInKg, terrain);
            recommendedSnowshoeLength.textContent = `${snowshoeSize} inches`;

            // Calculate ski pole length
            let poleLength = 0;
            if (style === 'cross-country') {
                poleLength = heightInCm * 0.83;
            } else if (style === 'skate') {
                poleLength = heightInCm * 0.89;
            }

            const roundedPoleLength = Math.round(poleLength / 5) * 5;
            recommendedPoleLength.textContent = roundedPoleLength;
        }

        document.querySelector('.results').scrollIntoView({
            behavior: 'smooth'
        });
    }

    function calculateSnowshoeSize(weightInKg, terrain) {
        const weightInLbs = weightInKg * 2.20462;
        let size = 0;

        if (terrain === 'groomed') {
            if (weightInLbs <= 120) {
                size = 22; // 20-22 inches
            } else if (weightInLbs <= 180) {
                size = 25; // 23-25 inches
            } else {
                size = 25; // Max size for groomed trails
            }
        } else if (terrain === 'mixed') {
            if (weightInLbs <= 120) {
                size = 23; // 23 inches
            } else if (weightInLbs <= 160) {
                size = 25; // 23-25 inches
            } else if (weightInLbs <= 220) {
                size = 28; // 26-30 inches
            } else {
                size = 30; // Up to 30 inches
            }
        } else if (terrain === 'backcountry') {
            if (weightInLbs <= 160) {
                size = 25; // 25 inches
            } else if (weightInLbs <= 180) {
                size = 30; // 26-30 inches
            } else if (weightInLbs <= 250) {
                size = 35; // 30-35 inches
            } else {
                size = 36; // Over 250 lbs
            }
        }

        return size || 25; // Default size if none matched
    }

    function resetFields() {
        weightInput.value = '';
        heightInput.value = '';
        genderSelect.value = 'male';
        document.querySelectorAll('.selection-box').forEach(s => s.classList.remove('selected'));
        document.getElementById('cross-country').classList.add('selected');
        document.getElementById('beginner').classList.add('selected');
        document.getElementById('groomed').classList.add('selected');
        recommendedLength.textContent = '';
        recommendedWidth.textContent = '';
        suggestedSkiSize.textContent = '';
        recommendedSnowshoeLength.textContent = '';
        recommendedPoleLength.textContent = '';
    }

    calculateBtn.addEventListener('click', calculateSkiDimensions);
    resetBtn.addEventListener('click', resetFields);

    selectionBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const group = box.closest('table').querySelectorAll('.selection-box');
            group.forEach(s => s.classList.remove('selected'));
            box.classList.add('selected');
        });
    });

    // Set default selected styles
    document.getElementById('cross-country').classList.add('selected');
    document.getElementById('beginner').classList.add('selected');
    document.getElementById('groomed').classList.add('selected');

    // Language switcher
    const languageBoxes = document.querySelectorAll('.language-selector .selection-box');
    languageBoxes.forEach(box => {
        box.addEventListener('click', () => {
            languageBoxes.forEach(s => s.classList.remove('selected'));
            box.classList.add('selected');
            const lang = box.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    function switchLanguage(lang) {
        document.querySelectorAll('[data-lang-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-lang-${lang}`);
        });
    }

    // Set default language
    document.getElementById('english').classList.add('selected');

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