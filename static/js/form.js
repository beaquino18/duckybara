// List of Canadian cities
const canadianCities = [
    "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", 
    "Quebec City", "Hamilton", "Kitchener", "London", "Victoria", "Halifax", "Oshawa", 
    "Windsor", "Saskatoon", "Regina", "St. John's", "Barrie", "Kelowna", "Abbotsford", 
    "Kingston", "Milton", "Sherbrooke", "Thunder Bay", "Moncton", "Saint John", 
    "Trois-Rivières", "Brantford", "Guelph", "Kamloops", "Lethbridge", "Red Deer", 
    "Niagara Falls", "Nanaimo", "Fredericton", "Sudbury", "Waterloo", "Mississauga", 
    "Brampton", "Surrey", "Richmond", "Burnaby", "Markham", "Vaughan", "Oakville"
  ];
  
  /**
   * Autocomplete function for location search
   * @param {HTMLElement} input - The input element to apply autocomplete to
   */
  function locationAutocomplete(input) {
    let currentFocus = -1;
    
    // Create necessary CSS styles for the dropdown
    addAutocompleteStyles();
    
    // Add input event listener to detect when user types
    input.addEventListener("input", function() {
      let matches = [];
      let inputValue = this.value;
      
      // Close any already open lists
      closeAllLists();
      
      // If no input, do nothing
      if (!inputValue) return false;
      
      // Create the container div for suggestions
      const suggestionsContainer = document.createElement("div");
      suggestionsContainer.setAttribute("id", this.id + "-autocomplete-list");
      suggestionsContainer.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(suggestionsContainer);
      
      // Find matching cities
      for (let i = 0; i < canadianCities.length; i++) {
        // Check if the city contains the input text
        if (canadianCities[i].toLowerCase().indexOf(inputValue.toLowerCase()) > -1) {
          matches.push(canadianCities[i]);
          
          // Create a DIV element for each matching item
          const suggestionItem = document.createElement("div");
          
          // Highlight the matching letters
          const matchPosition = canadianCities[i].toLowerCase().indexOf(inputValue.toLowerCase());
          const beforeMatch = canadianCities[i].substr(0, matchPosition);
          const match = canadianCities[i].substr(matchPosition, inputValue.length);
          const afterMatch = canadianCities[i].substr(matchPosition + inputValue.length);
          
          suggestionItem.innerHTML = beforeMatch + "<strong>" + match + "</strong>" + afterMatch;
          suggestionItem.innerHTML += "<input type='hidden' value='" + canadianCities[i] + "'>";
          
          // Add click event to set the input value when clicked
          suggestionItem.addEventListener("click", function() {
            input.value = this.getElementsByTagName("input")[0].value;
            closeAllLists();
          });
          
          suggestionsContainer.appendChild(suggestionItem);
        }
      }
    });
    
    // Add keyboard navigation
    input.addEventListener("keydown", function(e) {
      let suggestionList = document.getElementById(this.id + "-autocomplete-list");
      if (!suggestionList) return;
      
      const items = suggestionList.getElementsByTagName("div");
      
      // Down arrow key pressed
      if (e.key === "ArrowDown") {
        currentFocus++;
        // Make current item more visible
        setActiveItem(items, currentFocus);
      } 
      // Up arrow key pressed
      else if (e.key === "ArrowUp") {
        currentFocus--;
        // Make current item more visible
        setActiveItem(items, currentFocus);
      } 
      // Enter key pressed
      else if (e.key === "Enter") {
        e.preventDefault();
        if (currentFocus > -1) {
          // Simulate click on active item
          if (items) items[currentFocus].click();
        }
      }
    });
    
    // Close dropdown when clicked elsewhere
    document.addEventListener("click", function(e) {
      closeAllLists(e.target);
    });
    
    /**
     * Highlight the active suggestion item
     * @param {HTMLCollection} items - Collection of suggestion items
     * @param {number} index - Index of the active item
     */
    function setActiveItem(items, index) {
      if (!items) return false;
      
      // First, remove active class from all items
      removeActiveClass(items);
      
      // Adjust index if out of range
      if (index >= items.length) index = 0;
      if (index < 0) index = (items.length - 1);
      
      // Add the active class to current item
      items[index].classList.add("autocomplete-active");
      
      // Update the global focus variable
      currentFocus = index;
    }
    
    /**
     * Remove active class from all items
     * @param {HTMLCollection} items - Collection of suggestion items
     */
    function removeActiveClass(items) {
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("autocomplete-active");
      }
    }
    
    /**
     * Close all autocomplete lists except the specified element
     * @param {HTMLElement} excludeElement - Element to exclude from closing
     */
    function closeAllLists(excludeElement) {
      const autocompleteItems = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < autocompleteItems.length; i++) {
        if (excludeElement != autocompleteItems[i] && excludeElement != input) {
          autocompleteItems[i].parentNode.removeChild(autocompleteItems[i]);
        }
      }
    }
    
    /**
     * Add CSS styles needed for the autocomplete dropdown
     */
    function addAutocompleteStyles() {
      const styleSheet = document.createElement("style");
      styleSheet.textContent = `
        .autocomplete-items {
          position: absolute;
          border: 1px solid #ddd;
          border-top: none;
          z-index: 99;
          top: 100%;
          left: 0;
          right: 0;
          max-height: 300px;
          overflow-y: auto;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          background: white;
        }
        
        .autocomplete-items div {
          padding: 10px;
          cursor: pointer;
        }
        
        .autocomplete-items div:hover {
          background-color: #e9e9e9;
        }
        
        .autocomplete-active {
          background-color: #4CAF50 !important;
          color: #ffffff;
        }
        
        .location-wrapper {
          position: relative;
          display: inline-block;
          width: 100%;
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }
  
  function toggleSelection(button) {
    // Check if button is already selected
    const isCurrentlySelected = button.classList.contains('selected');
    
    // Get all currently selected buttons
    const selectedButtons = document.querySelectorAll('.event-button.selected');
    
    // If not selected and already have 2 selections, don't allow another selection
    if (!isCurrentlySelected && selectedButtons.length >= 2) {
      // Optional: show a message to the user
      alert("You can only select up to 2 event types.");
      return;
    }
    
    // Toggle the selected class on the button
    button.classList.toggle('selected');
    
    // Update the hidden input with the current selections
    const eventTypeInput = document.getElementById('event_type');
    const updatedSelectedButtons = document.querySelectorAll('.event-button.selected');
    const selectedValues = Array.from(updatedSelectedButtons).map(btn => btn.value);
    eventTypeInput.value = selectedValues.join(',');
  }
  
  // Initialize form elements when the DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // 1. Add event listener to age dropdown
    const ageSelect = document.getElementById('age');
    
    if (ageSelect) {
      ageSelect.addEventListener('change', function() {
        console.log('Selected age range:', this.value);
      });
    }
    
    // 2. Check form validation on submit
    const form = document.querySelector('form');
    
    if (form) {
      form.addEventListener('submit', function(e) {
        // Check if event type is selected
        const eventType = document.getElementById('event_type').value;
        if (!eventType) {
          alert('Please select at least one event type');
          e.preventDefault();
          return;
        }
      });
    }
    
    // 3. Add styles for event buttons
    const style = document.createElement('style');
    style.textContent = `
      .event-button {
        padding: 8px 16px;
        margin-right: 8px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s;
      }
      
      .event-button.selected {
        background-color: #4CAF50;
        color: white;
        border-color: #388E3C;
      }
    `;
    document.head.appendChild(style);
    
    // 4. Initialize the location autocomplete
    const locationInput = document.getElementById("location");
    
    if (locationInput) {
      // Wrap the input in a div if it's not already
      if (!locationInput.parentNode.classList.contains('location-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'location-wrapper';
        locationInput.parentNode.insertBefore(wrapper, locationInput);
        wrapper.appendChild(locationInput);
      }
      
      // Initialize the autocomplete
      locationAutocomplete(locationInput);
    }
  });
