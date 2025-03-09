document.addEventListener('DOMContentLoaded', function() {
  // Check if navbar should be updated (on any page)
  if (localStorage.getItem('navbarUpdated') === 'true') {
      // Get the current page path
      const currentPath = window.location.pathname;
      
      // Only update navbar if NOT on the home/landing page
      if (currentPath !== '/' && currentPath !== '/landing-page' && 
          !currentPath.includes('landing-page.html') && !currentPath.endsWith('index.html')) {
          updateNavbar();
      } else {
          // We're on the home page, so make sure the navbar is clean
          resetNavbar();
      }
  }
});

function updateNavbar() {
  // Get the nav-right div
  const navRight = document.querySelector('.nav-right');
  
  if (navRight) {
      // Create navigation links
      const navLinks = [
          { text: 'Home', href: '/' }, // Adjust as needed for your routing
          { text: 'Activity', href: '/events' },
          { text: 'Profile', href: '/profile' },
          { text: 'Socials', href: '/socials' }
      ];
      
      // Clear existing content in nav-right
      navRight.innerHTML = '';
      
      // Create nav links container
      const navLinksContainer = document.createElement('ul');
      navLinksContainer.className = 'nav-links';
      
      // Add each navigation link
      navLinks.forEach(link => {
          const listItem = document.createElement('li');
          const anchor = document.createElement('a');
          anchor.href = link.href;
          anchor.textContent = link.text;
          listItem.appendChild(anchor);
          navLinksContainer.appendChild(listItem);
      });
      
      // Create logout icon
      const logoutItem = document.createElement('li');
      logoutItem.className = 'logout-item';
      const logoutLink = document.createElement('a');
      logoutLink.href = '/';
      logoutLink.title = 'Logout';
      logoutLink.className = 'logout-link';
      
      // Create the logout icon
      const logoutIcon = document.createElement('span');
      logoutIcon.innerHTML = '⇥'; // Unicode exit/logout symbol
      logoutIcon.className = 'logout-icon';
      
      // Add click event to also clear localStorage
      logoutLink.addEventListener('click', function() {
          localStorage.removeItem('navbarUpdated');
      });
      
      logoutLink.appendChild(logoutIcon);
      logoutItem.appendChild(logoutLink);
      
      // Add the navigation links and logout to nav-right
      navRight.appendChild(navLinksContainer);
      navLinksContainer.appendChild(logoutItem);
  }
}

function resetNavbar() {
  // Get the nav-right div
  const navRight = document.querySelector('.nav-right');
  
  if (navRight) {
      // Clear the navigation links
      navRight.innerHTML = '';
  }
}
