document.addEventListener('DOMContentLoaded', function() {
  // Check if the Get Started button exists (on landing page)
  const getStartedBtn = document.querySelector('.get-started-btn');
  
  if (getStartedBtn) {
      getStartedBtn.addEventListener('click', function() {
          // Set a flag in localStorage indicating user has started
          localStorage.setItem('navbarUpdated', 'true');
          // The actual navigation happens via the link's href
      });
  }
  
  // Reset navbar on the landing page to ensure it's clean
  resetNavbar();
});

function resetNavbar() {
  // Get the nav-right div
  const navRight = document.querySelector('.nav-right');
  
  if (navRight) {
      // Clear the navigation links
      navRight.innerHTML = '';
  }
}
