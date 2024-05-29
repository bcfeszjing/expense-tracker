$(document).ready(function() {
    $('#monthSelect').change(function() {
        var month = $(this).val();
        // Handle the change event here
        console.log('User selected month: ' + month);
    });
});

$('#monthSelect').change(function() {
    var month = $(this).val();
    // Handle the change event here
    console.log('User selected month: ' + month);

    // Update the Info Bar
    $('#monthDisplay').text('Total Expense for ' + getMonthName(month) + ':');
    $('#expenseDisplay').text('RM ' + getTotalExpenseForMonth(month));
});

function getMonthName(month) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1];
}

function getTotalExpenseForMonth(month) {
    // TODO: Replace this with the actual calculation
    return 'XXX.XX';
}

$('#monthSelect').change(function() {
    var month = $(this).val();
    // Handle the change event here
    console.log('User selected month: ' + month);

    // Update the Info Bar
    $('#monthDisplay').text('Total Expense for ' + getMonthName(month) + ':');
    $('#expenseDisplay').text('RM ' + getTotalExpenseForMonth(month));

    // Create a new doughnut chart
    var ctx = document.getElementById('expenseChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Food', 'Transportation', 'Bills', 'Entertainment', 'Groceries', 'Others'],
            datasets: [{
                data: [0, 0, 0, 0, 0, 0], // Replace these zeros with your data
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#9CCC65', '#FFA726']
            }]
        }
    });
});

// Add event listener to each squircle
document.querySelectorAll('.squircle').forEach(squircle => {
    squircle.addEventListener('click', function() {
        // Get the value of the data-page attribute
        const page = this.closest('.category-column').getAttribute('data-page');
        // Navigate to the specified page if page is not null or undefined
        if (page) {
            window.location.href = page;
        }
    });
});

// Function to fetch expense data from the backend API
function fetchExpenseData() {
    // Make a GET request to the backend API endpoint
    fetch('/api/expense-data')
        .then(response => response.json())
        .then(data => {
            // Update the amount displayed in each squircle based on the data received
            updateSquircleAmounts(data);
        })
        .catch(error => {
            console.error('Error fetching expense data:', error);
        });
}

// Function to update the amount displayed in each squircle
function updateSquircleAmounts(data) {
    // Iterate over each squircle and update the amount based on the data received
    document.querySelectorAll('.squircle').forEach(squircle => {
        const category = squircle.querySelector('h5').textContent.trim();
        const amount = data[category] || 'N/A'; // Use the data received or display "N/A" if not available
        squircle.querySelector('p').textContent = 'RM ' + amount;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.category-column').forEach(column => {
        column.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            if (category) {
                window.location.href = `expenseInterface.html?category=${category}`;
            }
        });
    });
});


