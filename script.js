document.addEventListener('DOMContentLoaded', () => {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const genderSelect = document.getElementById('gender');
    const styleSelect = document.querySelector('.selection-box.selected[data-value]');
    const skillSelect = document.querySelector('.selection-box.selected[data-value]');
    const terrainSelect = document.querySelector('.selection-box.selected[data-value]');
    const recommendedLength = document.getElementById('recommended-length');
    const recommendedWidth = document.getElementById('recommended-width');
    const suggestedSkiSize = document.getElementById('suggested-ski-size');
    const recommendedSnowshoeLength = document.getElementById('recommended-snowshoe-length');
    const recommendedPoleLength = document.getElementById('recommended-pole-length');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');

    const skis = [
        { brand: 'FISCHER', model: 'Spider 62 Crown Xtralite', width: 62, sizes: [169, 179, 189, 199] },
        { brand: 'SALOMON', model: 'RC+ Grip with Prolink Access Binding - Kids', width: 45, sizes: [121, 131, 141, 151, 161] },
        { brand: 'FISCHER', model: 'Aerolite Skate 60 IFP', width: 41, sizes: [176, 181, 186] },
        { brand: 'SALOMON', model: 'RC7+ eSKIN with Prolink Shift Binding', width: 44, sizes: [174, 182, 190, 198, 206] },
        { brand: 'SALOMON', model: 'RC8+ eSKIN with Prolink Shift Binding', width: 44, sizes: [174, 182, 190, 198, 206] },
        { brand: 'SALOMON', model: 'Escape Snow 59 POSI with Prolink Auto Binding', width: 59, sizes: ['L', 'M', 'S', 'TTG', 'XL'] },
        { brand: 'FISCHER', model: 'Twin Skin Power EF', width: 51, sizes: [184, 189, 194, 199] },
        { brand: 'FISCHER', model: 'Sports Crown EF', width: 50, sizes: [179, 184, 189, 194, 199] },
        { brand: 'ROSSIGNOL', model: 'Evo Xc 60 R-Skin with Control SI Ski Bindings', width: 60, sizes: [165, 175, 185, 195] },
        { brand: 'ROSSIGNOL', model: 'Evo OT 65 Positrack IFP with Control SI Ski Bindings', width: 65, sizes: [165, 175, 185, 195] },
        { brand: 'ATOMIC', model: 'Pro C2 Skintec Med with Prolink Shift CL Binding', width: 45, sizes: [174, 181, 188, 195, 202, 209] },
        { brand: 'ATOMIC', model: 'Pro C1 Skintec Med with Prolink Shift CL Binding', width: 45, sizes: [174, 181, 188, 195, 202, 209] },
        { brand: 'FISCHER', model: 'Twin Skin Sport EF', width: 51, sizes: [179, 184, 189, 194, 199] },
        { brand: 'ROSSIGNOL', model: 'BC 80 Positrack', width: 80, sizes: [166, 176, 186, 196] },
        { brand: 'ROSSIGNOL', model: 'XT Venture WXLS', width: 70, sizes: [176, 186, 191] },
        { brand: 'ATOMIC', model: 'Savor 48 Skintec Med + PA', width: 48, sizes: [174, 184, 194, 204] },
        { brand: 'ATOMIC', model: 'Savor 52 Grip + Prolink Access CL', width: 52, sizes: [177, 184, 191, 198, 205] },
        { brand: 'ATOMIC', model: 'Savor 48 Skintec Hard with Prolink Shift Pro CL Binding', width: 48, sizes: [204] }
    ];

    function calculateSkiDimensions() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const gender = genderSelect.value;
        const style = document.querySelector('.selection-box.selected[data-value]').getAttribute('data-value');
        const skill = document.querySelector('.selection-box.selected[data-value]').getAttribute('data-value');
        const terrain = document.querySelector('.selection-box.selected[data-value]').getAttribute('data-value');

        if (isNaN(weight) || isNaN(height)) {
            alert('Please enter valid weight and height.');
            return;
        }

        // Convert weight to kg if in lbs
        const weightInKg = weight;

        // Convert height to cm if in inches
        const heightInCm = height;

        let length = 0;
        let width = 0;

        if (style === 'cross-country') {
            length = heightInCm * (skill === 'beginner' ? 1.1 : 1.2);
            width = 45;
        } else if (style === 'skate') {
            length = heightInCm * (skill === 'beginner' ? 1.05 : 1.1);
            width = 40;
        }

        // Adjust length based on weight
        if (weightInKg > 75) {
            length += 5;
        } else if (weightInKg < 55) {
            length -= 5;
        }

        // Adjust length based on terrain
        if (terrain === 'backcountry') {
            length -= 5;
        }

        const roundedLength = Math.round(length);
        recommendedLength.textContent = roundedLength;
        recommendedWidth.textContent = width;

        let closestSki = null;
        let closestDifference = Infinity;

        skis.forEach(ski => {
            if (ski.width === width) {
                ski.sizes.forEach(size => {
                    const difference = Math.abs(size - roundedLength);
                    if (difference < closestDifference) {
                        closestSki = { ...ski, closestSize: size };
                        closestDifference = difference;
                    }
                });
            }
        });

        if (closestSki) {
            suggestedSkiSize.innerHTML = `Brand: ${closestSki.brand}, Model: ${closestSki.model}, Length: ${closestSki.closestSize} cm, Width: ${width} mm`;
        } else {
            suggestedSkiSize.textContent = 'No suitable ski found for the given dimensions.';
        }

        // Calculate snowshoe size
        let snowshoeSize = 0;
        if (weight <= 140) {
            snowshoeSize = terrain === 'backcountry' ? 22 : 20;
        } else if (weight <= 200) {
            snowshoeSize = terrain === 'backcountry' ? 25 : 22;
        } else if (weight <= 260) {
            snowshoeSize = terrain === 'backcountry' ? 30 : 25;
        } else {
            snowshoeSize = terrain === 'backcountry' ? 35 : 30;
        }

        recommendedSnowshoeLength.textContent = `${snowshoeSize} inches`;

        // Calculate ski pole length
        let poleLength = 0;
        if (style === 'cross-country') {
            poleLength = heightInCm * 0.83;
        } else if (style === 'skate') {
            poleLength = heightInCm * 0.89;
        }

        const roundedPoleLength = Math.round(poleLength / 5) * 5; // Round to nearest 5 cm
        recommendedPoleLength.textContent = roundedPoleLength;

        // Scroll to results section
        document.querySelector('.results').scrollIntoView({ behavior: 'smooth' });
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
});