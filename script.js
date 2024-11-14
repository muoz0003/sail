document.addEventListener('DOMContentLoaded', () => {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const styleSelect = document.getElementById('style');
    const skillSelect = document.getElementById('skill');
    const terrainSelect = document.getElementById('terrain');
    const recommendedLength = document.getElementById('recommended-length');
    const recommendedWidth = document.getElementById('recommended-width');
    const suggestedSkiSize = document.getElementById('suggested-ski-size');
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
        const weightUnit = document.querySelector('input[name="weightUnit"]:checked').value;
        const heightUnit = document.querySelector('input[name="heightUnit"]:checked').value;
        const style = styleSelect.value;
        const skill = skillSelect.value;
        const terrain = terrainSelect.value;

        if (isNaN(weight) || isNaN(height)) {
            alert('Please enter valid weight and height.');
            return;
        }

        // Convert weight to kg if in lbs
        const weightInKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;

        // Convert height to cm if in inches
        const heightInCm = heightUnit === 'inches' ? height * 2.54 : height;

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
    }

    function resetFields() {
        weightInput.value = '';
        heightInput.value = '';
        document.getElementById('kg').checked = true;
        document.getElementById('cm').checked = true;
        styleSelect.value = 'cross-country';
        skillSelect.value = 'beginner';
        terrainSelect.value = 'groomed';
        recommendedLength.textContent = '';
        recommendedWidth.textContent = '';
        suggestedSkiSize.textContent = '';
    }

    calculateBtn.addEventListener('click', calculateSkiDimensions);
    resetBtn.addEventListener('click', resetFields);
});