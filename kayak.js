document.addEventListener('DOMContentLoaded', () => {
    const heightInput = document.getElementById('person-height');
    const kayakWidthInput = document.getElementById('kayak-width');
    const kayakLengthInput = document.getElementById('kayak-length');
    const heightUnit = document.getElementById('height-unit');
    const widthUnit = document.getElementById('width-unit');
    const lengthUnit = document.getElementById('length-unit');
    const recommendedWidth = document.getElementById('recommended-width');
    const recommendedWidthFeet = document.getElementById('recommended-width-feet');
    const recommendedWidthInches = document.getElementById('recommended-width-inches');
    const recommendedWidthCm = document.getElementById('recommended-width-cm');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');

    calculateBtn.addEventListener('click', () => {
        let personHeight = parseFloat(heightInput.value);
        let kayakWidth = parseFloat(kayakWidthInput.value);
        let kayakLength = parseFloat(kayakLengthInput.value);

        if (isNaN(personHeight) || isNaN(kayakWidth) || isNaN(kayakLength)) {
            alert('Please enter valid numbers.');
            return;
        }

        // Convert height to meters
        if (heightUnit.value === 'feet') {
            personHeight *= 0.3048;
        }

        // Convert width to meters
        if (widthUnit.value === 'feet') {
            kayakWidth *= 0.3048;
        } else if (widthUnit.value === 'inches') {
            kayakWidth *= 0.0254;
        }

        // Convert length to meters
        if (lengthUnit.value === 'feet') {
            kayakLength *= 0.3048;
        } else if (lengthUnit.value === 'inches') {
            kayakLength *= 0.0254;
        }

        // Example calculation formula
        const recommendedPaddleboardWidth = kayakWidth + (personHeight / 100) + (kayakLength / 200);

        recommendedWidth.innerText = recommendedPaddleboardWidth.toFixed(2) + ' meters';
        recommendedWidthFeet.innerText = (recommendedPaddleboardWidth / 0.3048).toFixed(2) + ' feet';
        recommendedWidthInches.innerText = (recommendedPaddleboardWidth / 0.0254).toFixed(2) + ' inches';
        recommendedWidthCm.innerText = (recommendedPaddleboardWidth * 100).toFixed(2) + ' cm';
        document.getElementById('results').style.display = 'block';
    });

    resetBtn.addEventListener('click', () => {
        heightInput.value = '';
        kayakWidthInput.value = '';
        kayakLengthInput.value = '';
        document.getElementById('results').style.display = 'none';
    });

    // Language selection
    const languageSelector = document.querySelectorAll('.language-selector .selection-box');
    languageSelector.forEach(box => {
        box.addEventListener('click', () => {
            const lang = box.getAttribute('data-lang');
            document.querySelectorAll('[data-lang-en]').forEach(el => {
                el.innerText = el.getAttribute(`data-lang-${lang}`);
            });
        });
    });

    // Animated Waves Background
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const waves = [];
    const waveCount = 5;
    const waveHeight = 20;
    const waveLength = 0.02;
    const waveSpeed = 0.02;

    for (let i = 0; i < waveCount; i++) {
        waves.push({
            y: height / 2 + i * waveHeight,
            length: waveLength,
            amplitude: waveHeight,
            speed: waveSpeed
        });
    }

    function drawWave(wave) {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);
        for (let x = 0; x < width; x++) {
            const y = wave.y + Math.sin(x * wave.length + wave.speed) * wave.amplitude;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Solid white color
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        waves.forEach(wave => {
            wave.speed += 0.01;
            drawWave(wave);
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
});