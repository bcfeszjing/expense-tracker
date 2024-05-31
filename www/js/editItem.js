document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const date = urlParams.get('date');
  const name = urlParams.get('name');

  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    const items = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
    const selectedItem = items.find(item => item.date === date && item.name === name);

    if (selectedItem) {
      document.getElementById('expense-name').value = selectedItem.name;
      document.getElementById('category').value = selectedItem.category;
      document.getElementById('amount').value = selectedItem.amount;
      document.getElementById('date').value = selectedItem.date;
      document.getElementById('description').value = selectedItem.description;
    } else {
      alert('Expense item not found.');
    }
  } else {
    alert('User not logged in.');
    window.location.href = 'index.html';
  }

  document.getElementById('save-button').addEventListener('click', function() {
    const expenseName = document.getElementById('expense-name').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    const updatedItem = {
      name: expenseName,
      category: category,
      amount: amount,
      date: date,
      description: description
    };

    if (currentUser) {
      let items = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
      const index = items.findIndex(item => item.date === date && item.name === name);

      if (index !== -1) {
        items[index] = updatedItem;
        localStorage.setItem(`expenses_${currentUser}`, JSON.stringify(items));

        window.dispatchEvent(new Event('storage'));

        window.location.href = 'item.html';
      } else {
        alert('Expense item not found.');
      }
    } else {
      alert('User not logged in.');
      window.location.href = 'index.html';
    }
  });

  document.getElementById('delete-button').addEventListener('click', function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      let items = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
      const index = items.findIndex(item => item.date === date && item.name === name);

      if (index !== -1) {
        items.splice(index, 1);
        localStorage.setItem(`expenses_${currentUser}`, JSON.stringify(items));

        window.dispatchEvent(new Event('storage'));

        window.location.href = 'item.html';
      } else {
        alert('Expense item not found.');
      }
    } else {
      alert('User not logged in.');
      window.location.href = 'index.html';
    }
  });
});
