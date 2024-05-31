document.getElementById('add-expense-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const expenseName = document.getElementById('expense-name').value;
  const category = document.getElementById('category').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;
  const description = document.getElementById('description').value;

  const newItem = {
    name: expenseName,
    category: category,
    amount: amount,
    date: date,
    description: description
  };

  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
      let userExpenses = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
      userExpenses.push(newItem);
      localStorage.setItem(`expenses_${currentUser}`, JSON.stringify(userExpenses));
      
      // Trigger a custom event to notify changes in localStorage
      window.dispatchEvent(new Event('storage'));
      
      window.location.href = 'item.html';
  } else {
      alert('User not logged in.');
  }
});