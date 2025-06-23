const entriesContainer = document.getElementById('entries');
const emotionCounts = { Happy: 0, Sad: 0, Confused: 0, Scared: 0, Excited: 0 };

function saveEntry() {
  const dreamText = document.getElementById('dream').value.trim();
  const checkboxes = document.querySelectorAll('.emotions input:checked');

  if (!dreamText || checkboxes.length === 0) {
    alert("Please describe your dream and select at least one emotion.");
    return;
  }

  const emotions = Array.from(checkboxes).map(cb => cb.value);
  emotions.forEach(e => emotionCounts[e]++);

  const timestamp = new Date().toLocaleString();

  const entry = document.createElement('div');
  entry.className = 'entry';
  entry.innerHTML = `<h4>🕒 ${timestamp}</h4><p>${dreamText}</p><strong>Emotions:</strong> ${emotions.join(', ')}`;

  entriesContainer.prepend(entry);

  document.getElementById('dream').value = '';
  checkboxes.forEach(cb => cb.checked = false);

  updateChart();
}

const ctx = document.getElementById('emotionChart').getContext('2d');
const emotionChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Object.keys(emotionCounts),
    datasets: [{
      label: 'Emotion Frequency',
      data: Object.values(emotionCounts),
      backgroundColor: [
        '#ffd54f',
        '#4fc3f7',
        '#ba68c8',
        '#ef5350',
        '#81c784'
      ],
      borderColor: '#333',
      borderWidth: 1,
      borderRadius: 5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
});

function updateChart() {
  emotionChart.data.datasets[0].data = Object.values(emotionCounts);
  emotionChart.update();
}
