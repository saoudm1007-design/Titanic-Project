document.addEventListener('DOMContentLoaded', function() {
    const colors = {
        primary: 'rgba(13, 110, 253, 0.8)',
        success: 'rgba(40, 167, 69, 0.8)',
        danger: 'rgba(220, 53, 69, 0.8)',
        warning: 'rgba(255, 193, 7, 0.8)',
        info: 'rgba(23, 162, 184, 0.8)',
        secondary: 'rgba(108, 117, 125, 0.8)',
    };

    // 1. Survival by Class (bar chart)
    if (document.getElementById('chart-survival-class') && typeof statsData !== 'undefined') {
        const classLabels = ['First Class', 'Business Class', 'Economy Class'];
        const classRates = Object.values(statsData.survival_by_class).map(v => (v * 100).toFixed(1));

        new Chart(document.getElementById('chart-survival-class'), {
            type: 'bar',
            data: {
                labels: classLabels,
                datasets: [{
                    label: 'Survival Rate (%)',
                    data: classRates,
                    backgroundColor: [colors.warning, colors.primary, colors.secondary],
                    borderWidth: 0,
                    borderRadius: 6,
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 100, title: { display: true, text: 'Survival Rate (%)' } }
                }
            }
        });
    }

    // 2. Survival by Sex (doughnut)
    if (document.getElementById('chart-survival-sex') && typeof statsData !== 'undefined') {
        const sexLabels = Object.keys(statsData.survival_by_sex).map(s => s.charAt(0).toUpperCase() + s.slice(1));
        const sexRates = Object.values(statsData.survival_by_sex).map(v => (v * 100).toFixed(1));

        new Chart(document.getElementById('chart-survival-sex'), {
            type: 'doughnut',
            data: {
                labels: sexLabels,
                datasets: [{
                    data: sexRates,
                    backgroundColor: [colors.primary, colors.danger],
                    borderWidth: 3,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: function(ctx) {
                                return ctx.label + ': ' + ctx.parsed + '% survived';
                            }
                        }
                    }
                }
            }
        });
    }

    // 3. Age Distribution (bar chart)
    if (document.getElementById('chart-age-dist') && typeof statsData !== 'undefined') {
        const ageLabels = Object.keys(statsData.age_distribution);
        const ageCounts = Object.values(statsData.age_distribution);

        new Chart(document.getElementById('chart-age-dist'), {
            type: 'bar',
            data: {
                labels: ageLabels,
                datasets: [{
                    label: 'Passengers',
                    data: ageCounts,
                    backgroundColor: 'rgba(102, 126, 234, 0.7)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 1,
                    borderRadius: 4,
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Count' } }
                }
            }
        });
    }

    // 4. Embarkation Port (pie chart)
    if (document.getElementById('chart-embarked') && typeof statsData !== 'undefined') {
        const portMap = { 'S': 'Southampton', 'C': 'Cherbourg', 'Q': 'Queenstown' };
        const embarkedLabels = Object.keys(statsData.embarked_distribution).map(k => portMap[k] || k);
        const embarkedCounts = Object.values(statsData.embarked_distribution);

        new Chart(document.getElementById('chart-embarked'), {
            type: 'pie',
            data: {
                labels: embarkedLabels,
                datasets: [{
                    data: embarkedCounts,
                    backgroundColor: [colors.primary, colors.success, colors.warning],
                    borderWidth: 3,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
});
