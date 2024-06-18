document.addEventListener('DOMContentLoaded', function() {
    const loginDiv = document.getElementById('login');
    const contentDiv = document.getElementById('content');
    const loginButton = document.getElementById('loginButton');
    const profileButton = document.getElementById('profileButton');
    const logoutButton = document.getElementById('logoutButton');
    const usernameInput = document.getElementById('username');
    const apiUrlBase = 'https://leetcode-stats-api.herokuapp.com/';

    function setPopupSize(width, height) {
        document.body.style.width = width + 'px';
        document.body.style.height = height + 'px';
    }

    setPopupSize(400, 200);

    const storedUsername = localStorage.getItem('leetcodeUsername');
    if (storedUsername) {
        fetchLeetCodeData(storedUsername);
        loginDiv.style.display = 'none';
        contentDiv.style.display = 'block';
        setPopupSize(550, 400);
    }

    loginButton.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        if (username) {
          localStorage.setItem('leetcodeUsername', username);
          fetchLeetCodeData(username);
          loginDiv.style.display = 'none';
          contentDiv.style.display = 'block';
          setPopupSize(550, 400);
        }
    });

    profileButton.addEventListener('click', function() {
    const username = localStorage.getItem('leetcodeUsername');
        if (username) {
            window.open(`https://leetcode.com/${username}/`, '_blank');
        }
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('leetcodeUsername');
        loginDiv.style.display = 'block';
        contentDiv.style.display = 'none';
        setPopupSize(400, 200);
    });

    function updatePieChart(data) {
        const ctx = document.getElementById('pieChart').getContext('2d');
        const { easySolved, mediumSolved, hardSolved } = data;

        const chartData = {
            labels: ['Easy', 'Medium', 'Hard'],
            datasets: [{
                label: 'Solved Problems',
                data: [easySolved, mediumSolved, hardSolved],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', 
                    'rgba(255, 206, 86, 0.6)', 
                    'rgba(255, 99, 132, 0.6)'  
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        };

        const pieChart = new Chart(ctx, {
            type: 'pie',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Solved Problems by Difficulty'
                }
            }
        });
    }
  
    function fetchLeetCodeData(username) {
        const apiUrl = `${apiUrlBase}${username}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                document.getElementById('user').textContent = `Username: ${username}`;
                document.getElementById('easySolved').textContent = `${data.easySolved}/${data.totalEasy}`;
                document.getElementById('mediumSolved').textContent = `${data.mediumSolved}/${data.totalMedium}`;
                document.getElementById('hardSolved').textContent = `${data.hardSolved}/${data.totalHard}`;
                document.getElementById('totalSolved').textContent = `${data.totalSolved}`;
                document.getElementById('acceptanceRate').textContent = `${data.acceptanceRate}`;
                document.getElementById('ranking').textContent = `${data.ranking}`;

                updatePieChart(data);
                
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('stats').textContent = 'Failed to load data.';
            });
    }
  });
  