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
    } else if (currentPage === 'item.html') {
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
        navigateToPage('item.html');
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
});