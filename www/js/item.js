document.addEventListener('DOMContentLoaded', () => {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const expenseList = document.getElementById('expense-list');
  
    const groupedItems = items.reduce((acc, item) => {
      acc[item.date] = acc[item.date] || [];
      acc[item.date].push(item);
      return acc;
    }, {});
  
    const sortedDates = Object.keys(groupedItems).sort((a, b) => new Date(b) - new Date(a));
  
    sortedDates.forEach(date => {
      const dateHeader = document.createElement('h4');
      dateHeader.textContent = date;
      expenseList.appendChild(dateHeader);
  
      const expenseContainer = document.createElement('div');
      expenseContainer.classList.add('list-group');
  
      groupedItems[date].forEach(expense => {
        const expenseItem = document.createElement('a');
        expenseItem.href = `editItem.html?date=${encodeURIComponent(expense.date)}&name=${encodeURIComponent(expense.name)}`;
        expenseItem.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center');
  
        const categoryIcon = document.createElement('i');
        categoryIcon.className = getCategoryIcon(expense.category);
  
        const expenseInfo = document.createElement('div');
        expenseInfo.classList.add('d-flex', 'align-items-center');
  
        const categoryText = document.createElement('div');
        categoryText.classList.add('ms-3');
        categoryText.innerHTML = `<div class="fw-bold">${expense.category}</div><div>${expense.name}</div>`;
  
        const amount = document.createElement('span');
        amount.textContent = `$${expense.amount.toFixed(2)}`;
  
        expenseInfo.appendChild(categoryIcon);
        expenseInfo.appendChild(categoryText);
        expenseItem.appendChild(expenseInfo);
        expenseItem.appendChild(amount);
  
        expenseContainer.appendChild(expenseItem);
      });
  
      expenseList.appendChild(expenseContainer);
    });
  });
  
  function getCategoryIcon(category) {
    switch (category) {
      case 'Food':
        return 'bi bi-cup-straw';
      case 'Bills':
        return 'bi bi-receipt';
      case 'Transportation':
        return 'bi bi-truck';
      case 'Groceries':
        return 'bi bi-cart';
      case 'Entertainment':
        return 'bi bi-controller';
      default:
        return 'bi bi-tags';
    }
  }