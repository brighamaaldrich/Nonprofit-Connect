// DOM elements
const postList = document.querySelector('.posts');
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const setupUI = user => {
  if(user) {
    // Toggle UI elements
    loggedInLinks.forEach(item => {
      item.style.display = "block";
    });
    loggedOutLinks.forEach(item => {
      item.style.display = "none";
    });
  } else {
    loggedInLinks.forEach(item => {
      item.style.display = "none";
    });
    loggedOutLinks.forEach(item => {
      item.style.display = "block";
    });
  }
}

// Setup posts
const setupPosts = (data) => {

  if(data.length) {
    let html = '';
    data.forEach(doc => {
      const post = doc.data();
      const li = `
      <li>
        <div class="collapsible-header grey lighten-4"> ${post.title} </div>
        <div class="collapsible-body white"> ${post.content} </div>
      </li>
    `;
      html += li;
    });
    postList.innerHTML = html
  } else {
    postList.innerHTML = "<h5 class = 'center-align'>Login to view posts</h5>"
  }

};
// Setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});