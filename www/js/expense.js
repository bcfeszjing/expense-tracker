document.addEventListener('DOMContentLoaded', () => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
      const items = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
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
              const expenseItem = document.createElement('div');
              expenseItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

              const categoryIcon = document.createElement('i');
              categoryIcon.className = getCategoryIcon(expense.category);

              const expenseInfo = document.createElement('div');
              expenseInfo.classList.add('d-flex', 'align-items-center', 'flex-grow-1');

              const categoryText = document.createElement('div');
              categoryText.classList.add('ms-3');
              categoryText.innerHTML = `<div class="fw-bold">${expense.category}</div><div>${expense.name}</div>`;

              const amount = document.createElement('span');
              amount.classList.add('ms-auto', 'me-3');
              amount.textContent = `RM${expense.amount.toFixed(2)}`;

              const detailLink = document.createElement('a');
              detailLink.href = `editExpense.html?date=${encodeURIComponent(expense.date)}&name=${encodeURIComponent(expense.name)}`;
              detailLink.classList.add('detail-link');
              detailLink.innerHTML = '<i class="bi bi-chevron-right"></i>';

              expenseInfo.appendChild(categoryIcon);
              expenseInfo.appendChild(categoryText);
              expenseItem.appendChild(expenseInfo);
              expenseItem.appendChild(amount);
              expenseItem.appendChild(detailLink);

              expenseContainer.appendChild(expenseItem);
          });

          expenseList.appendChild(expenseContainer);
      });
  } else {
      window.location.href = 'index.html';
  }
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