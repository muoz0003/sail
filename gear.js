document.addEventListener('DOMContentLoaded', function () {
    const weightSlider = document.getElementById('weight');
    const weightValue = document.getElementById('weightValue');
    const weightUnit = document.getElementById('weightUnit');
    const weightUnitLabel = document.getElementById('weightUnitLabel');
    const heightSlider = document.getElementById('height');
    const heightValue = document.getElementById('heightValue');
    const heightUnit = document.getElementById('heightUnit');
    const heightUnitLabel = document.getElementById('heightUnitLabel');

    // Update weight value display
    weightSlider.addEventListener('input', function () {
        weightValue.textContent = weightSlider.value;
    });

    weightUnit.addEventListener('change', function () {
        weightUnitLabel.textContent = weightUnit.value;
        if (weightUnit.value === 'lb') {
            weightSlider.min = 44;
            weightSlider.max = 330;
            weightSlider.step = 1;
            weightSlider.value = (parseFloat(weightSlider.value) * 2.20462).toFixed(0);
        } else {
            weightSlider.min = 20;
            weightSlider.max = 150;
            weightSlider.step = 1;
            weightSlider.value = (parseFloat(weightSlider.value) / 2.20462).toFixed(0);
        }
        weightValue.textContent = weightSlider.value;
    });

    // Update height value display
    heightSlider.addEventListener('input', function () {
        heightValue.textContent = heightSlider.value;
    });

    heightUnit.addEventListener('change', function () {
        heightUnitLabel.textContent = heightUnit.value;
        if (heightUnit.value === 'ft') {
            heightSlider.min = 3.0;
            heightSlider.max = 7.0;
            heightSlider.step = 0.1;
            heightSlider.value = (parseFloat(heightSlider.value) / 30.48).toFixed(1);
        } else {
            heightSlider.min = 100;
            heightSlider.max = 220;
            heightSlider.step = 1;
            heightSlider.value = (parseFloat(heightSlider.value) * 30.48).toFixed(0);
        }
        heightValue.textContent = heightSlider.value;
    });

    // Handle Type selection
    const typeOptions = document.querySelectorAll('.type-option');
    typeOptions.forEach(option => {
        option.addEventListener('click', function () {
            this.classList.toggle('selected');
            updateHiddenInput('type', typeOptions);
        });
    });

    // Handle Skill Level selection
    const skillOptions = document.querySelectorAll('.skill-option');
    skillOptions.forEach(option => {
        option.addEventListener('click', function () {
            this.classList.toggle('selected');
            updateHiddenInput('skillLevel', skillOptions);
        });
    });

    // Handle Stiffness selection
    const stiffnessOptions = document.querySelectorAll('.stiffness-option');
    stiffnessOptions.forEach(option => {
        option.addEventListener('click', function () {
            this.classList.toggle('selected');
            updateHiddenInput('stiffness', stiffnessOptions);
        });
    });

    function updateHiddenInput(inputId, options) {
        const selectedValues = Array.from(options)
            .filter(option => option.classList.contains('selected'))
            .map(option => option.getAttribute('data-value').toLowerCase().trim());
        document.getElementById(inputId).value = selectedValues.join(',');
    }

    // Calculate ski size based on user input
    function calculateSkiSize(weight, height, skillLevel, type) {
        let baseSize = height + 20; // Base size is height + 20 cm

        // Adjust size based on skill level
        if (skillLevel === 'beginner') {
            baseSize -= 10;
        } else if (skillLevel === 'expert') {
            baseSize += 10;
        }

        // Adjust size based on type
        if (type === 'classic') {
            baseSize += 5;
        } else if (type === 'skate') {
            baseSize -= 5;
        }

        return baseSize;
    }

    // Handle form submission
    document.getElementById('skiFormUpdated').addEventListener('submit', function (e) {
        e.preventDefault();

        // Ensure Type, Skill Level, and Stiffness are selected
        if (!document.getElementById('type').value || !document.getElementById('skillLevel').value || !document.getElementById('stiffness').value) {
            alert('Please select your Type, Skill Level, and Stiffness.');
            return;
        }

        let weight = parseFloat(weightSlider.value);
        const weightUnitValue = weightUnit.value;
        let height = parseFloat(heightSlider.value);
        const heightUnitValue = heightUnit.value;
        const types = document.getElementById('type').value.toLowerCase().split(',');
        const skillLevels = document.getElementById('skillLevel').value.toLowerCase().split(',');
        const stiffnesses = document.getElementById('stiffness').value.toLowerCase().split(',');

        // Convert weight to kg if necessary
        if (weightUnitValue === 'lb') {
            weight = weight * 0.453592; // Convert lbs to kg
        }

        // Convert height to cm if necessary
        if (heightUnitValue === 'ft') {
            height = height * 30.48; // Convert feet to cm
        }

        console.log('User Input:', { weight, height, types, skillLevels, stiffnesses });

        // Calculate recommended ski size
        const recommendedSkiSize = calculateSkiSize(weight, height, skillLevels[0], types[0]);
        console.log('Recommended Ski Size:', recommendedSkiSize);

        // Fetch ski data from CSV file
        fetch('ski_list.csv')
            .then(response => response.text())
            .then(data => {
                const skis = parseCSV(data);
                console.log('Parsed Skis:', skis); // Log parsed skis

                // Initial filtering
                let filteredSkis = filterSkis(skis, types, skillLevels, stiffnesses, recommendedSkiSize);

                // If no skis found, relax the filtering conditions
                if (filteredSkis.length === 0) {
                    console.log('No skis found with all filters applied. Relaxing stiffness filter.');
                    // Remove stiffness filter
                    filteredSkis = filterSkis(skis, types, skillLevels, [], recommendedSkiSize);
                }
                if (filteredSkis.length === 0) {
                    console.log('No skis found without stiffness filter. Widening size range.');
                    // Widen size match range
                    filteredSkis = filterSkis(skis, types, skillLevels, [], recommendedSkiSize, 20);
                }
                if (filteredSkis.length === 0) {
                    console.log('No skis found with wider size range. Relaxing skill level filter.');
                    // Remove skill level filter
                    filteredSkis = filterSkis(skis, types, [], [], recommendedSkiSize, 20);
                }
                if (filteredSkis.length === 0) {
                    console.log('No skis found without skill level filter. Relaxing type filter.');
                    // Remove type filter
                    filteredSkis = filterSkis(skis, [], [], [], recommendedSkiSize, 20);
                }
                if (filteredSkis.length === 0) {
                    console.log('No skis found without type filter. Displaying all skis.');
                    // Show all skis
                    filteredSkis = skis;
                }

                console.log('Final Filtered Skis:', filteredSkis);

                // Limit to a maximum of 3 skis
                filteredSkis = filteredSkis.slice(0, 5);

                // Display results
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = '';

                // Display recommended ski size
                const recommendedSkiInfo = document.createElement('div');
                recommendedSkiInfo.classList.add('card', 'mb-3');
                recommendedSkiInfo.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-skiing-nordic"></i> Recommended Ski Size</h5>
                        <p class="card-text">
                            Based on your input, the recommended ski size is ${recommendedSkiSize.toFixed(0)} cm.
                        </p>
                    </div>
                `;
                resultDiv.appendChild(recommendedSkiInfo);

                // Display skis
                if (filteredSkis.length > 0) {
                    filteredSkis.forEach(ski => {
                        const weightMinLbs = (ski.WeightMin * 2.20462).toFixed(0);
                        const weightMaxLbs = (ski.WeightMax * 2.20462).toFixed(0);
                        const skiInfo = document.createElement('div');
                        skiInfo.classList.add('card', 'mb-3');
                        skiInfo.innerHTML = `
                            <div class="card-body">
                                <h5 class="card-title"><i class="fas fa-skiing-nordic"></i> ${ski.Brand} ${ski.Model}</h5>
                                <p class="card-text">
                                    Type: ${capitalizeFirstLetter(ski.Type)}<br>
                                    Size: ${ski['Size (cm)']} cm<br>
                                    Stiffness: ${capitalizeFirstLetter(ski.Stiffness)}<br>
                                    Skill Level: ${capitalizeFirstLetter(ski.SkillLevel)}<br>
                                    Weight Range: ${ski.WeightMin} - ${ski.WeightMax} kg (${weightMinLbs} - ${weightMaxLbs} lbs)<br>
                                    Grip Type: ${capitalizeFirstLetter(ski['Grip Type'])}
                                </p>
                            </div>
                        `;
                        resultDiv.appendChild(skiInfo);
                    });
                } else {
                    resultDiv.innerHTML += '<p>No matching skis found.</p>';
                }

                // Add share button and email input
                const shareButton = document.createElement('button');
                shareButton.classList.add('btn', 'btn-info', 'mt-3');
                shareButton.innerHTML = '<i class="fas fa-share"></i> Share Results';
                resultDiv.appendChild(shareButton);

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
    });

    function filterSkis(skis, types, skillLevels, stiffnesses, recommendedSkiSize, sizeRange = 10) {
        return skis.filter(ski => {
            const typeMatch = types.length ? types.includes(ski.Type) : true;
            const skillMatch = skillLevels.length ? skillLevels.includes(ski.SkillLevel) : true;
            const stiffnessMatch = stiffnesses.length ? stiffnesses.includes(ski.Stiffness) : true;
            const sizeMatch = Math.abs(ski['Size (cm)'] - recommendedSkiSize) <= sizeRange;
            return typeMatch && skillMatch && stiffnessMatch && sizeMatch;
        });
    }

    // Helper function to capitalize the first letter
    function capitalizeFirstLetter(string) {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
    }

    // Handle form reset
    document.getElementById('skiForm').addEventListener('reset', function () {
        // Reset weight slider and display
        weightSlider.value = weightSlider.defaultValue;
        weightValue.textContent = weightSlider.defaultValue;
        weightUnit.value = 'kg';
        weightUnitLabel.textContent = 'kg';
        weightSlider.min = 20;
        weightSlider.max = 150;
        weightSlider.step = 1;

        // Reset height slider and display
        heightSlider.value = heightSlider.defaultValue;
        heightValue.textContent = heightSlider.defaultValue;
        heightUnit.value = 'cm';
        heightUnitLabel.textContent = 'cm';
        heightSlider.min = 100;
        heightSlider.max = 220;
        heightSlider.step = 1;

        // Deselect type options
        typeOptions.forEach(opt => opt.classList.remove('selected'));
        document.getElementById('type').value = '';

        // Deselect skill level options
        skillOptions.forEach(opt => opt.classList.remove('selected'));
        document.getElementById('skillLevel').value = '';

        // Deselect stiffness options
        stiffnessOptions.forEach(opt => opt.classList.remove('selected'));
        document.getElementById('stiffness').value = '';

        // Clear results
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';
    });

    function parseCSV(data) {
        const lines = data.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        return lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            const ski = {};
            headers.forEach((header, index) => {
                ski[header] = values[index] ? values[index].toLowerCase() : '';
            });
            ski.WeightMin = parseFloat(ski['Weight Range (kg)']?.split('-')[0]);
            ski.WeightMax = parseFloat(ski['Weight Range (kg)']?.split('-')[1]?.replace('+', ''));
            ski['Size (cm)'] = parseFloat(ski['Size (cm)']);
            return ski;
        });
    }

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
    switchLanguage('en'); // Set default language content

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