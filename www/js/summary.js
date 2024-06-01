document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('.footer-content a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function() {
            footerLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    document.querySelectorAll('.category-column').forEach(column => {
        column.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            if (category) {
                navigateToExpenseInterface(category);
            }
        });
    });

    const homeFooter = document.getElementById('homeFooter');
    const expensesFooter = document.getElementById('expensesFooter');
    const statisticFooter = document.getElementById('statisticFooter');

    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'home.html') {
        setActiveLink(homeFooter);
    } else if (currentPage === 'addItem.html') {
        setActiveLink(expensesFooter);
    } else if (currentPage === 'summary.html') {
        setActiveLink(statisticFooter);
    }

    homeFooter.addEventListener('click', function(event) {
        event.preventDefault();
        navigateToPage('home.html');
        setActiveLink(this);
    });

    expensesFooter.addEventListener('click', function(event) {
        event.preventDefault();
        navigateToPage('addItem.html');
        setActiveLink(this);
    });

    statisticFooter.addEventListener('click', function(event) {
        event.preventDefault();
        navigateToPage('summary.html');
        setActiveLink(this);
    });

    function navigateToPage(page) {
        window.location.href = page;
    }

    function setActiveLink(clickedLink) {
        footerLinks.forEach(link => {
            link.classList.remove('active');
        });
        clickedLink.classList.add('active');
    }

    $('#monthYearPicker').datepicker({
        format: "mm/yyyy",
        startView: "months",
        minViewMode: "months",
        autoclose: true
    }).on('changeDate', function(e) {
        const selectedDate = e.date;
        const month = selectedDate.getMonth() + 1;
        const year = selectedDate.getFullYear();

        $('#monthDisplay').text('Total Expense for ' + getMonthName(month) + ' ' + year + ':');
        $('#expenseDisplay').text('RM ' + getTotalExpenseForMonth(month, year));

        updateChartData(month, year);
        updateSquircleAmounts(month, year);
    });

    var expenseChart = Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Expenses for the Selected Month'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: RM {point.y:.2f}',
                    connectorColor: 'silver',
                    distance: 30,
                    formatter: function() {
                        return this.y > 0 ? `<b>${this.key}</b>: RM ${this.y.toFixed(2)}` : null;
                    },
                    style: {
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }
                },
                innerSize: '50%' // Doughnut chart
            }
        },
        series: [{
            name: 'Expenses',
            data: getInitialChartData()
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                distance: 10, // Adjust data label position for smaller screens
                                style: {
                                    fontSize: '10px' // Adjust font size for smaller screens
                                }
                            }
                        }
                    }
                }
            }]
        },
        credits: {
            enabled: false // Disable Highcharts credits
        },
        navigation: {
            buttonOptions: {
                enabled: false // Disable navigation buttons
            }
        }
    });

    function updateChartData(month, year) {
        const data = getExpenseDataForMonth(month, year).filter(item => item.y > 0);
        expenseChart.series[0].setData(data);
    }

    function getInitialChartData() {
        return [
            { name: 'Food', y: 0 },
            { name: 'Bills', y: 0 },
            { name: 'Transportation', y: 0 },
            { name: 'Groceries', y: 0 },
            { name: 'Entertainment', y: 0 },
            { name: 'Others', y: 0 }
        ];
    }

    function getExpenseDataForMonth(month, year) {
        const currentUser = localStorage.getItem('currentUser');
        const userExpenses = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
        const expenseData = [0, 0, 0, 0, 0, 0];
        const categoryMap = {
            'Food': 0, 'Bills': 1, 'Transportation': 2,
            'Groceries': 3, 'Entertainment': 4, 'Others': 5
        };

        userExpenses.forEach(item => {
            const itemDate = new Date(item.date);
            if (itemDate.getMonth() + 1 === month && itemDate.getFullYear() === year) {
                const index = categoryMap[item.category] !== undefined ? categoryMap[item.category] : 5;
                expenseData[index] += item.amount;
            }
        });

        return [
            { name: 'Food', y: expenseData[0] },
            { name: 'Bills', y: expenseData[1] },
            { name: 'Transportation', y: expenseData[2] },
            { name: 'Groceries', y: expenseData[3] },
            { name: 'Entertainment', y: expenseData[4] },
            { name: 'Others', y: expenseData[5] }
        ];
    }

    function getMonthName(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month - 1];
    }

    function getTotalExpenseForMonth(month, year) {
        const currentUser = localStorage.getItem('currentUser');
        const userExpenses = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
        return userExpenses.reduce((total, item) => {
            const itemDate = new Date(item.date);
            if (itemDate.getMonth() + 1 === month && itemDate.getFullYear() === year) {
                total += item.amount;
            }
            return total;
        }, 0).toFixed(2);
    }

    function updateSquircleAmounts(month, year) {
        const currentUser = localStorage.getItem('currentUser');
        const userExpenses = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
        const categoryTotals = {
            food: 0, transportation: 0, bills: 0,
            entertainment: 0, groceries: 0, others: 0
        };

        userExpenses.forEach(item => {
            const itemDate = new Date(item.date);
            if (itemDate.getMonth() + 1 === month && itemDate.getFullYear() === year) {
                const categoryKey = item.category.toLowerCase();
                if (categoryTotals.hasOwnProperty(categoryKey)) {
                    categoryTotals[categoryKey] += item.amount;
                } else {
                    categoryTotals.others += item.amount;
                }
            }
        });

        document.querySelectorAll('.squircle').forEach(squircle => {
            const category = squircle.closest('.category-column').getAttribute('data-category');
            const amount = categoryTotals[category] || 0;
            squircle.querySelector('.category-amount').textContent = 'RM ' + amount.toFixed(2);
        });
    }

    $('#monthYearPicker').datepicker('setDate', new Date()).trigger('changeDate');
});

function navigateToExpenseInterface(category) {
    const selectedMonthYear = document.getElementById('monthYearPicker').value.split('/');
    const selectedMonth = selectedMonthYear[0];
    const selectedYear = selectedMonthYear[1];

    const url = `expenseInterface.html?category=${encodeURIComponent(category)}&month=${selectedMonth}&year=${selectedYear}`;
    window.location.href = url;
}
