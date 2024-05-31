document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (users[username] && users[username].password === password) {
      localStorage.setItem('currentUser', username);
      window.location.href = 'home.html';
    } else {
      alert('Invalid username or password');
    }
  });
  