document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prediction-form');
    const resultDiv = document.getElementById('prediction-result');

    if (!form || !resultDiv) return;

    const shipSvg = `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 70 Q100 95 190 70 L175 55 L25 55 Z" fill="#5C3D2E"/>
        <rect x="30" y="42" width="140" height="13" rx="2" fill="#8B6914"/>
        <rect x="40" y="32" width="120" height="10" rx="2" fill="#D4A84B"/>
        <rect x="55" y="8" width="12" height="24" rx="2" fill="#C0392B"/>
        <rect x="80" y="12" width="12" height="20" rx="2" fill="#C0392B"/>
        <rect x="105" y="8" width="12" height="24" rx="2" fill="#C0392B"/>
        <rect x="130" y="12" width="12" height="20" rx="2" fill="#C0392B"/>
        <rect x="53" y="5" width="16" height="5" rx="1" fill="#2C3E50"/>
        <rect x="78" y="9" width="16" height="5" rx="1" fill="#2C3E50"/>
        <rect x="103" y="5" width="16" height="5" rx="1" fill="#2C3E50"/>
        <rect x="128" y="9" width="16" height="5" rx="1" fill="#2C3E50"/>
        <ellipse cx="61" cy="3" rx="8" ry="3" fill="#95A5A6" opacity="0.5"/>
        <ellipse cx="111" cy="3" rx="6" ry="3" fill="#95A5A6" opacity="0.4"/>
        <rect x="35" y="46" width="4" height="4" rx="0.5" fill="#85C1E9"/>
        <rect x="47" y="46" width="4" height="4" rx="0.5" fill="#85C1E9"/>
        <rect x="59" y="46" width="4" height="4" rx="0.5" fill="#85C1E9"/>
        <rect x="71" y="46" width="4" height="4" rx="0.5" fill="#85C1E9"/>
        <rect x="83" y="46" width="4" height="4" rx="0.5" fill="#85C1E9"/>
        <rect x="95" y="46" width="4" height="4" rx="0.5" fill="#85C1E9"/>
        <rect x="107" y="46" width="4" height="4" rx="0.5" fill="#85C1E9"/>
        <rect x="119" y="46" width="4" height="4" rx="0.5" fill="#85C1E9"/>
        <rect x="131" y="46" width="4" height="4" rx="0.5" fill="#85C1E9"/>
        <rect x="143" y="46" width="4" height="4" rx="0.5" fill="#85C1E9"/>
        <rect x="155" y="46" width="4" height="4" rx="0.5" fill="#85C1E9"/>
    </svg>`;

    function showPredictionAnimation(result) {
        const overlay = document.createElement('div');
        overlay.className = 'predict-overlay';
        overlay.innerHTML = `
            <div class="anim-ship">${shipSvg}</div>
            <div class="anim-text" data-i18n="anim.predicting">${typeof t === 'function' ? t('anim.predicting') : 'Sailing through the data...'}</div>
            <div class="anim-waves-bottom">
                <div class="anim-wave-1"></div>
                <div class="anim-wave-2"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        // After 2 seconds, show the result
        setTimeout(() => {
            const survived = result.survived;
            overlay.classList.add(survived ? 'result-survived' : 'result-died');

            // Remove the "sailing" text
            const animText = overlay.querySelector('.anim-text');
            animText.style.display = 'none';

            // Add result text
            const resultText = document.createElement('div');
            resultText.className = `result-text ${survived ? 'survived' : 'died'}`;
            if (survived) {
                resultText.textContent = typeof t === 'function' ? t('result.survived') : 'Survived!';
            } else {
                resultText.textContent = typeof t === 'function' ? t('result.not_survived') : 'Did Not Survive';
            }
            overlay.querySelector('.anim-ship').after(resultText);

            // Add probability text
            const probText = document.createElement('div');
            probText.style.cssText = 'color: #fff; font-size: 1.2rem; opacity: 0; animation: anim-text-in 0.5s ease 1.2s forwards;';
            probText.textContent = `${result.probability_survived}% ${typeof t === 'function' ? t('result.chance') : 'chance of survival'}`;
            resultText.after(probText);

            // Add click to continue button
            const continueBtn = document.createElement('button');
            continueBtn.className = 'btn btn-light mt-4 continue-btn';
            continueBtn.innerHTML = '<i class="bi bi-arrow-right-circle"></i> ' + (typeof t === 'function' ? t('anim.continue') : 'Click to Continue');
            continueBtn.style.cssText = 'opacity: 0; animation: anim-text-in 0.5s ease 1.5s forwards; font-weight: 600; padding: 0.75rem 2rem; border-radius: 50px;';
            probText.after(continueBtn);

            // Remove overlay when user clicks continue
            continueBtn.addEventListener('click', () => {
                overlay.style.animation = 'none';
                overlay.style.transition = 'opacity 0.4s ease';
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                    showInlineResult(result);
                }, 400);
            });

            // Also allow clicking anywhere on overlay to dismiss
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.style.animation = 'none';
                    overlay.style.transition = 'opacity 0.4s ease';
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.remove();
                        showInlineResult(result);
                    }, 400);
                }
            });
        }, 2000);
    }

    function showInlineResult(result) {
        const survived = result.survived;
        const cardClass = survived ? 'result-survived' : 'result-died';
        const icon = survived ? '&#10003;' : '&#10007;';
        const label = survived
            ? (typeof t === 'function' ? t('result.survived') : 'Survived!')
            : (typeof t === 'function' ? t('result.not_survived') : 'Did Not Survive');
        const color = survived ? '#28a745' : '#dc3545';
        const chanceText = typeof t === 'function' ? t('result.chance') : 'chance of survival';

        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `
            <div class="result-card ${cardClass}">
                <div style="font-size: 2rem; color: ${color};">${icon}</div>
                <h5 style="color: ${color};">${label}</h5>
                <div class="result-probability" style="color: ${color};">
                    ${result.probability_survived}%
                </div>
                <small class="text-muted">${chanceText}</small>
                <div class="progress mt-2" style="height: 20px;">
                    <div class="progress-bar bg-danger" style="width: ${result.probability_died}%">${result.probability_died}%</div>
                    <div class="progress-bar bg-success" style="width: ${result.probability_survived}%">${result.probability_survived}%</div>
                </div>
            </div>
        `;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => { data[key] = value; });

        data.pclass = parseInt(data.pclass);
        data.age = parseFloat(data.age);
        data.sibsp = parseInt(data.sibsp);
        data.parch = parseInt(data.parch);
        data.fare = parseFloat(data.fare);

        // Hide previous result
        resultDiv.style.display = 'none';

        fetch('/api/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            showPredictionAnimation(result);
        })
        .catch(error => {
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = `<div class="alert alert-danger">Prediction failed: ${error.message}</div>`;
        });
    });
});
