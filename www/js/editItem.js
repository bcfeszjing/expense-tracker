document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const date = urlParams.get('date');
    const name = urlParams.get('name');
  
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const selectedItem = items.find(item => item.date === date && item.name === name);
  
    if (selectedItem) {
      document.getElementById('expense-name').value = selectedItem.name;
      document.getElementById('category').value = selectedItem.category;
      document.getElementById('amount').value = `${selectedItem.amount.toFixed(2)}`;
      document.getElementById('date').value = selectedItem.date;
      document.getElementById('description').value = selectedItem.description;
  
      document.getElementById('save-button').addEventListener('click', () => {
        // Save edited item details to localStorage
        selectedItem.name = document.getElementById('expense-name').value;
        selectedItem.category = document.getElementById('category').value;
        selectedItem.amount = parseFloat(document.getElementById('amount').value);
        selectedItem.date = document.getElementById('date').value;
        selectedItem.description = document.getElementById('description').value;
  
        // Update localStorage
        const updatedItems = items.map(item => {
          if (item.date === date && item.name === name) {
            return selectedItem;
          }
          return item;
        });
        localStorage.setItem('items', JSON.stringify(updatedItems));
  
        // Redirect back to expense list page
        window.location.href = 'item.html';
      });
  
      document.getElementById('delete-button').addEventListener('click', () => {
        // Delete item from localStorage
        const updatedItems = items.filter(item => !(item.date === date && item.name === name));
        localStorage.setItem('items', JSON.stringify(updatedItems));
        // Redirect back to expense list page
        window.location.href = 'item.html';
      });
    } else {
      // Handle error, item not found
      console.error('Item not found.');
    }
  });