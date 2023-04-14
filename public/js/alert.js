const alertButtons = document.querySelectorAll('.alert-btn');
alertButtons.forEach(alertButton => {
  alertButton.addEventListener('click', function() {
    // grab it's alert
    const alertContainer = this.parentElement.closest('.alert-container');
    // Check alert exists before trying to hide it
    if (alertContainer) {
      alertContainer.style.display = 'none';
    }
  });
});