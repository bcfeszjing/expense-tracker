document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);

    const backArrow = document.getElementById('backArrow');
    backArrow.addEventListener('click', function() {
        window.location.href = 'expense.html';
    });
});