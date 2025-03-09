document.addEventListener('DOMContentLoaded', function() {
  // Make sure navbar is updated
  localStorage.setItem('navbarUpdated', 'true');
  
  // Initialize any tooltips or popovers if needed
  initializeTooltips();
  
  // Handle any special hover effects
  setupHoverEffects();
  
  // Setup event listeners for join buttons
  setupEventListeners();
});

/**
* Initialize tooltips for friend avatars
*/
function initializeTooltips() {
  // Add a simple tooltip effect for friend avatars (pure CSS approach)
  const friendAvatars = document.querySelectorAll('.friend-avatar');
  
  friendAvatars.forEach(avatar => {
      // We're using the HTML title attribute as a simple tooltip
      // This is already in the HTML, but you can enhance it here if needed
      
      // Optional: you could replace this with a more sophisticated tooltip library
  });
}

/**
* Setup any additional hover effects not handled by CSS
*/
function setupHoverEffects() {
  // Ensure the join button doesn't trigger the description overlay
  const joinButtons = document.querySelectorAll('.join-btn');
  
  joinButtons.forEach(button => {
      button.addEventListener('mouseenter', function(e) {
          // This prevents the event from bubbling up to the parent
          e.stopPropagation();
          
          // Find the parent card and make sure the description stays hidden
          const card = button.closest('.activity-card');
          const description = card.querySelector('.activity-description');
          
          // Save the original opacity to restore later
          description.dataset.originalOpacity = description.style.opacity;
          description.style.opacity = '0';
      });
      
      button.addEventListener('mouseleave', function(e) {
          // This prevents the event from bubbling up to the parent
          e.stopPropagation();
          
          // Find the parent card
          const card = button.closest('.activity-card');
          const description = card.querySelector('.activity-description');
          
          // Only restore the opacity if the mouse is still over the card
          // This check prevents flicker when moving from button to card
          if (card.matches(':hover')) {
              description.style.opacity = description.dataset.originalOpacity || '1';
          }
      });
  });
}

/**
* Setup event listeners for various interactive elements
*/
function setupEventListeners() {
  // Track activity engagement
  const joinButtons = document.querySelectorAll('.join-btn');
  
  joinButtons.forEach(button => {
      button.addEventListener('click', function(e) {
          // Optional: Track analytics or user engagement
          const activityTitle = button.closest('.activity-card').querySelector('.activity-title').textContent;
          console.log(`User clicked to join: ${activityTitle}`);
          
          // Optional: You could send this data to the server
          // using fetch() if you want to track user activity
      });
  });
  
  // No category navigation is present anymore
  
  // Optional: Add keyboard navigation for accessibility
  document.addEventListener('keydown', function(e) {
      // Handle keyboard navigation between activity cards
      if (e.key === 'Tab' && (e.ctrlKey || e.metaKey)) {
          // Ctrl+Tab to cycle through activities
          e.preventDefault();
          navigateActivities(e.shiftKey ? 'prev' : 'next');
      }
  });
}

/**
* Navigate between activities using keyboard
* @param {string} direction - 'next' or 'prev'
*/
function navigateActivities(direction) {
  const activities = document.querySelectorAll('.activity-card');
  if (activities.length === 0) return;
  
  // Find the currently focused activity
  let focusedIndex = -1;
  activities.forEach((activity, index) => {
      if (activity.contains(document.activeElement)) {
          focusedIndex = index;
      }
  });
  
  // Calculate the next index
  let nextIndex;
  if (direction === 'next') {
      nextIndex = focusedIndex < activities.length - 1 ? focusedIndex + 1 : 0;
  } else {
      nextIndex = focusedIndex > 0 ? focusedIndex - 1 : activities.length - 1;
  }
  
  // Focus the join button of the next activity
  const nextButton = activities[nextIndex].querySelector('.join-btn');
  if (nextButton) {
      nextButton.focus();
  }
}
