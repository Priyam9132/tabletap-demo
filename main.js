// Select buttons and sections
const orderBtn = document.querySelector('.order-btn');
const paymentSection = document.getElementById('payment-section');
const payOptions = document.querySelectorAll('.pay-option');
const onlineOptions = document.getElementById('online-options');
const onlinePays = document.querySelectorAll('.online-pay');

// Show payment section when order is placed
orderBtn.addEventListener('click', () => {
  paymentSection.classList.remove('hidden');
  window.scrollTo({ top: paymentSection.offsetTop, behavior: 'smooth' });
});

// Handle payment option selection
payOptions.forEach(option => {
  option.addEventListener('click', () => {
    const method = option.dataset.method;

    if (method === 'reception') {
      alert('You selected Pay at Reception. Your order has been placed!');
      paymentSection.classList.add('hidden');
    } else if (method === 'online') {
      onlineOptions.classList.remove('hidden');
    }
  });
});

// Handle online payment clicks
onlinePays.forEach(btn => {
  btn.addEventListener('click', () => {
    alert(`Redirecting to ${btn.textContent} for payment...`);
  });
});
