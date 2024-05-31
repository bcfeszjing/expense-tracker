document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (users[username]) {
      alert('Username already exists');
    } else {
      users[username] = { password: password, email: email };
      localStorage.setItem('users', JSON.stringify(users));
      alert('Sign up successful! Please log in.');
      window.location.href = 'login.html';
    }
  });
  