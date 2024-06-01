document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        const categoryTopic = document.createElement('span');
        categoryTopic.innerText = capitalizeFirstLetter(category);
        const categoryTitle = document.getElementById('categoryTitle');
        categoryTitle.appendChild(categoryTopic);
        fetchExpenses(category);
    }

    const backArrow = document.getElementById('backArrow');
    backArrow.addEventListener('click', function() {
        window.location.href = 'summary.html';
    });

    const closePopup = document.getElementById('closePopup');
    closePopup.addEventListener('click', function() {
        document.getElementById('popupContainer').style.display = 'none';
    });
});

function fetchExpenses(category) {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedMonth = urlParams.get('month');
    const selectedYear = urlParams.get('year');
    const currentUser = localStorage.getItem('currentUser');
    const userExpenses = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
    
    let filteredExpenses = userExpenses.filter(expense => expense.category.toLowerCase() === category.toLowerCase());

    if (selectedMonth && selectedYear) {
        filteredExpenses = filteredExpenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() + 1 === parseInt(selectedMonth) && expenseDate.getFullYear() === parseInt(selectedYear);
        });
    }

    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';

    const groupedExpenses = groupExpensesByDate(filteredExpenses);

    Object.entries(groupedExpenses)
        .sort((a, b) => moment(b[0]) - moment(a[0]))
        .forEach(([date, items]) => {
            const dateHeader = document.createElement('div');
            dateHeader.className = 'expense-date';
            dateHeader.innerText = formatExpenseDate(date);
            expensesList.appendChild(dateHeader);

            items.forEach((item, index) => {
                const expenseItem = document.createElement('div');
                expenseItem.className = 'expense-item d-flex justify-content-between';
                expenseItem.innerHTML = `<div>${item.name}</div><div>RM ${item.amount.toFixed(2)}</div>`;
                expenseItem.addEventListener('click', () => {
                    showExpensePopup(item);
                });
                expensesList.appendChild(expenseItem);
            });
        });
}

function groupExpensesByDate(expenses) {
    return expenses.reduce((acc, expense) => {
        const date = expense.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(expense);
        return acc;
    }, {});
}

function formatExpenseDate(date) {
    const today = moment().startOf('day');
    const expenseDate = moment(date);

    if (expenseDate.isSame(today, 'day')) {
        return 'Today';
    } else if (expenseDate.isSame(today.subtract(1, 'days'), 'day')) {
        return 'Yesterday';
    } else {
        return expenseDate.format('DD/MM/YYYY');
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showExpensePopup(expense) {
    const popupContainer = document.getElementById('popupContainer');
    const expenseDetail = document.getElementById('expenseDetail');
    const expenseName = document.getElementById('expenseName');

    expenseName.innerText = expense.name;
    expenseDetail.innerHTML = `
        <p><strong>Category:</strong> <span>${expense.category}</span></p>
        <p><strong>Amount:</strong> <span>RM ${expense.amount.toFixed(2)}</span></p>
        <p><strong>Date:</strong> <span>${expense.date}</span></p>
        <p><strong>Description:</strong> <span class="popup-description">${expense.description}</span></p>
    `;

    popupContainer.style.display = 'flex';

    const closePopup = document.getElementById('closePopup');
    closePopup.addEventListener('click', () => {
        popupContainer.style.display = 'none';
    });
}

       
