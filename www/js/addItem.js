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
  
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(newItem);
    localStorage.setItem('items', JSON.stringify(items));
  
    window.location.href = 'item.html';
  });