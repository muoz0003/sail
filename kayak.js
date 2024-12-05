document.addEventListener('DOMContentLoaded', () => {
    const heightInput = document.getElementById('person-height');
    const kayakWidthInput = document.getElementById('kayak-width');
    const kayakLengthInput = document.getElementById('kayak-length');
    const heightUnit = document.getElementById('height-unit');
    const widthUnit = document.getElementById('width-unit');
    const lengthUnit = document.getElementById('length-unit');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const recommendedLength = document.getElementById('recommended-length');

    calculateBtn.addEventListener('click', () => {
        let personHeight = parseFloat(heightInput.value);
        let kayakWidth = parseFloat(kayakWidthInput.value);
        let kayakLength = parseFloat(kayakLengthInput.value);
        let paddlingStyle = document.querySelector('input[name="paddling-style"]:checked').value;

        if (isNaN(personHeight) || isNaN(kayakWidth) || isNaN(kayakLength)) {
            alert('Please enter valid numbers.');
            return;
        }

        // Convert height to centimeters if in feet
        if (heightUnit.value === 'feet') {
            personHeight *= 30.48;
        }
        console.log(`Converted person height: ${personHeight} cm`);

        // Convert width to centimeters if in feet or inches
        if (widthUnit.value === 'feet') {
            kayakWidth *= 30.48;
        } else if (widthUnit.value === 'inches') {
            kayakWidth *= 2.54;
        }
        console.log(`Converted kayak width: ${kayakWidth} cm`);

        // Convert length to centimeters if in feet or inches
        if (lengthUnit.value === 'feet') {
            kayakLength *= 30.48;
        } else if (lengthUnit.value === 'inches') {
            kayakLength *= 2.54;
        }
        console.log(`Converted kayak length: ${kayakLength} cm`);

        // Determine paddle length based on height, kayak width, and kayak length
        let paddleLength;
        if (personHeight <= 160) {
            if (kayakWidth < 60 && kayakLength < 400) {
                paddleLength = 215;
            } else if (kayakWidth <= 70 && kayakLength <= 450) {
                paddleLength = 225;
            } else {
                paddleLength = 235;
            }
        } else if (personHeight <= 170) {
            if (kayakWidth < 60 && kayakLength < 400) {
                paddleLength = 220;
            } else if (kayakWidth <= 70 && kayakLength <= 450) {
                paddleLength = 230;
            } else {
                paddleLength = 240;
            }
        } else if (personHeight <= 180) {
            if (kayakWidth < 60 && kayakLength < 400) {
                paddleLength = 225;
            } else if (kayakWidth <= 70 && kayakLength <= 450) {
                paddleLength = 235;
            } else {
                paddleLength = 245;
            }
        } else if (personHeight <= 190) {
            if (kayakWidth < 60 && kayakLength < 400) {
                paddleLength = 230;
            } else if (kayakWidth <= 70 && kayakLength <= 450) {
                paddleLength = 240;
            } else {
                paddleLength = 250;
            }
        } else {
            if (kayakWidth < 60 && kayakLength < 400) {
                paddleLength = 235;
            } else if (kayakWidth <= 70 && kayakLength <= 450) {
                paddleLength = 245;
            } else {
                paddleLength = 255;
            }
        }

        // Adjust for paddling style
        if (paddlingStyle === 'high-angle') {
            paddleLength -= 5;
        } else if (paddlingStyle === 'low-angle') {
            paddleLength += 5;
        }

        recommendedLength.innerText = paddleLength + ' cm';
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
            speed: waveSpeed,
            offset: Math.random() * 2 * Math.PI // Randomize the wave offset
        });
    }

    function drawWave(wave) {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);
        for (let x = 0; x < width; x++) {
            const y = wave.y + Math.sin(x * wave.length + wave.offset) * wave.amplitude;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // Semi-transparent white color
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        waves.forEach(wave => {
            wave.offset += wave.speed;
            drawWave(wave);
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        console.log(`Canvas resized: width=${width}, height=${height}`);
    });

    console.log('Canvas initialized');
    console.log(`Canvas dimensions: width=${width}, height=${height}`);
});