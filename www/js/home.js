document.addEventListener('DOMContentLoaded', () => {
    updateTotalExpense(); // Call the function to calculate and display total expense initially
    displayUsername(); // Display the username

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const items = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
        const expenseList = document.getElementById('recent-expenses');

        // Sort items by date
        items.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Display the 4 most recent expenses
        displayRecentExpenses(items.slice(0, 4));
    } else {
        window.location.href = 'index.html';
    }
});

// Function to display username
function displayUsername() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        document.getElementById('username-display').textContent = currentUser;
    } else {
        window.location.href = 'index.html';
    }
}

// Function to handle logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Function to update total expense and latest month
function updateTotalExpense() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const items = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
        const totalExpenseElement = document.getElementById('total-expense');
        const latestMonthElement = document.getElementById('latest-month');

        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];

        const latestDate = new Date();
        const latestMonth = latestDate.getMonth();
        const latestYear = latestDate.getFullYear();
        const totalExpense = items
            .filter(item => {
                const itemDate = new Date(item.date);
                return itemDate.getMonth() === latestMonth && itemDate.getFullYear() === latestYear;
            })
            .reduce((acc, item) => acc + item.amount, 0);
        totalExpenseElement.textContent = `RM${totalExpense.toFixed(2)}`;
        latestMonthElement.textContent = monthNames[latestMonth];
    } else {
        window.location.href = 'index.html';
    }
}

// Function to display recent expenses
function displayRecentExpenses(expenses) {
    const expenseList = document.getElementById('recent-expenses');
    expenseList.innerHTML = ''; // Clear previous content

    expenses.forEach(expense => {
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

        expenseInfo.appendChild(categoryIcon);
        expenseInfo.appendChild(categoryText);
        expenseItem.appendChild(expenseInfo);
        expenseItem.appendChild(amount);

        expenseList.appendChild(expenseItem);
    });
}

// Event listener for changes in localStorage
window.addEventListener('storage', () => {
    updateTotalExpense(); // Call the function to update total expense when localStorage changes
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