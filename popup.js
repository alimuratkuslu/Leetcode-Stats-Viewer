document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://leetcode-stats-api.herokuapp.com/alimuratkuslu';
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        document.getElementById('easySolved').textContent = data.easySolved;
        document.getElementById('mediumSolved').textContent = data.mediumSolved;
        document.getElementById('hardSolved').textContent = data.hardSolved;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('stats').textContent = 'Failed to load data.';
      });
  });
  