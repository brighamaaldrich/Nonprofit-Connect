// DOM elements
const postList = document.querySelector('.posts');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
      `;
      accountDetails.innerHTML = html;
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupPosts = (data, user) => {

  console.log(user);
  if(!user) {
    postList.innerHTML = '<h5 class="center-align">Please sign in!</h5>'; // There is no user
    return;
  }
  if (data.length) { // There are posts and user
    let html = '';
    data.forEach(doc => {
      const post = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${post.title} </div>
          <div class="collapsible-body white"> ${post.content} </br></br> <a class='btn yellow darken-2 help-btn'>I want to help</a> </br>
          There are ${post.helperCount} people helping at this community service event! </br> including users ....
          </div>

        </li>
      `;
      html += li;
    });
    postList.innerHTML = html
  } else {
    postList.innerHTML = '<h5 class="center-align">There are no posts</h5>'; // There is no user
  }
};

const rsvp = (user) => {
  if(user) {

  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
