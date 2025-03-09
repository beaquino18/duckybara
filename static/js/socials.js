document.addEventListener('DOMContentLoaded', function() {
  const postForm = document.getElementById('post-form');
  const postsContainer = document.getElementById('posts-container');
  
  // Track posted content to prevent duplicates
  const postedContent = new Set();
  
  postForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const content = document.getElementById('post-content').value.trim();
      const mood = document.getElementById('post-mood').value;
      
      // Validate content - return early if empty
      if (!content) {
          alert("Please write something before posting.");
          return;
      }
      
      // Check for duplicate content - return early if duplicate
      if (postedContent.has(content)) {
          alert("You've already posted this exact content.");
          return;
      }
      
      // Add to tracking set
      postedContent.add(content);
      
      // Create timestamp with a unique ID to ensure uniqueness
      const now = new Date();
      const postId = 'post-' + now.getTime();
      const timeString = 'Just now';
      
      // Create new post element
      const newPost = document.createElement('div');
      newPost.className = 'post-item user-post';
      newPost.id = postId;
      
      // Get user info (in a real app, this would come from the server)
      const userName = 'Emma R.'; // This should be dynamic in a real app
      
      // Set post HTML content
      newPost.innerHTML = `
          <div class="post-header">
              <img src="https://api.dicebear.com/7.x/personas/svg?seed=Emma%20Rodriguez&radius=50" alt="Your avatar" class="post-avatar">
              <div class="post-info">
                  <div class="post-author">${userName}</div>
                  <div class="post-time">${timeString}</div>
              </div>
              <div class="post-mood ${mood}">${mood.charAt(0).toUpperCase() + mood.slice(1)}</div>
          </div>
          <div class="post-content">
              ${content}
          </div>
          <div class="post-actions">
              <button class="action-btn like-btn">🌟 Like</button>
              <button class="action-btn comment-btn">💬 Comment</button>
          </div>
      `;
      
      // Add new post to the beginning of the feed
      postsContainer.insertBefore(newPost, postsContainer.firstChild);
      
      // Clear the form
      document.getElementById('post-content').value = '';
      
      // Add a subtle highlight effect to the new post
      setTimeout(() => {
          newPost.classList.add('highlight');
          setTimeout(() => {
              newPost.classList.remove('highlight');
          }, 1000);
      }, 10);
  });
  
  // Add event listeners for like buttons (just for UI feedback)
  document.addEventListener('click', function(e) {
      if (e.target.classList.contains('like-btn')) {
          e.target.classList.toggle('active');
      }
  });
});
