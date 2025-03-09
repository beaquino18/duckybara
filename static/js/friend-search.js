document.addEventListener('DOMContentLoaded', function() {
  // Hardcoded list of potential friends
  const potentialFriends = [
      "Alex Thompson", "Blake Rivera", "Cameron Lee", "Dana Mitchell",
      "Elliot Chen", "Fiona Wilson", "Gabriel Patel", "Harper Singh",
      "Indigo James", "Jordan Kim", "Kai Anderson", "Logan Martinez",
      "Morgan Taylor", "Nico Rodriguez", "Olivia Wright", "Parker Brown",
      "Quinn Lopez", "Riley Garcia", "Skyler Nguyen", "Taylor Washington"
  ];
  
  const searchInput = document.getElementById('friendSearch');
  const searchResults = document.getElementById('searchResults');
  const addFriendBtn = document.getElementById('addFriendBtn');
  const friendsGrid = document.getElementById('friendsGrid');
  
  let selectedFriend = null;
  
  // Listen for input in the search box
  searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      
      // Clear previous results
      searchResults.innerHTML = '';
      
      if (searchTerm.length < 2) {
          searchResults.style.display = 'none';
          return;
      }
      
      // Filter potential friends based on search term
      const filteredFriends = potentialFriends.filter(friend => 
          friend.toLowerCase().includes(searchTerm)
      );
      
      // Display results
      if (filteredFriends.length > 0) {
          searchResults.style.display = 'block';
          
          filteredFriends.forEach(friend => {
              const resultItem = document.createElement('div');
              resultItem.classList.add('search-result-item');
              resultItem.textContent = friend;
              
              resultItem.addEventListener('click', function() {
                  searchInput.value = friend;
                  selectedFriend = friend;
                  searchResults.style.display = 'none';
              });
              
              searchResults.appendChild(resultItem);
          });
      } else {
          searchResults.style.display = 'none';
      }
  });
  
  // Add friend button click event
  addFriendBtn.addEventListener('click', function() {
      if (selectedFriend || (searchInput.value && potentialFriends.includes(searchInput.value))) {
          const friendName = selectedFriend || searchInput.value;
          
          // Create new friend card
          const friendCard = document.createElement('div');
          friendCard.classList.add('friend-card');
          
          // Generate random pattern (1, 2, or 3)
          const pattern = Math.floor(Math.random() * 3) + 1;
          
          // Create event indicators based on pattern
          let eventIndicators = '';
          if (pattern === 1) {
              eventIndicators = '<span class="event-indicator conference"></span>';
          } else if (pattern === 2) {
              eventIndicators = '<span class="event-indicator workshop"></span><span class="event-indicator meetup"></span>';
          } else {
              eventIndicators = '<span class="event-indicator conference"></span><span class="event-indicator workshop"></span><span class="event-indicator meetup"></span>';
          }
          
          friendCard.innerHTML = `
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${friendName}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50" alt="${friendName}" class="friend-image">
              <div class="friend-info">
                  <div class="friend-name">${friendName}</div>
                  <div class="friend-events">
                      ${eventIndicators}
                  </div>
              </div>
          `;
          
          // Add to friends grid
          friendsGrid.prepend(friendCard);
          
          // Clear search
          searchInput.value = '';
          selectedFriend = null;
          
          // Add animation
          friendCard.classList.add('new-friend-animation');
          setTimeout(() => {
              friendCard.classList.remove('new-friend-animation');
          }, 1000);
      }
  });
  
  // Close results when clicking outside
  document.addEventListener('click', function(e) {
      if (e.target !== searchInput && e.target !== searchResults) {
          searchResults.style.display = 'none';
      }
  });
});
