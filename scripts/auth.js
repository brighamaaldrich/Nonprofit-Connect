// listen for auth status changes
auth.onAuthStateChanged(user => {
  const currentUser = auth.currentUser;
  // console.log(currentUser.email);
  // console.log(user.email);
  if (user) {
    console.log("Here")
    db.collection('posts').onSnapshot(snapshot => {
      setupPosts(snapshot.docs, user);
      document.querySelectorAll(".help-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          M.toast({html: 'You have signed up to help!'})
          rsvp(user);
        });
      });
      setupUI(user);
    }, err => console.log(err.message));
    // create new post
    const createForm = document.querySelector('#create-form');
    createForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(currentUser);
      db.collection('posts').add({
        title: createForm.title.value,
        content: createForm.content.value,
        helpers: [ currentUser.uid ],
        helperCount: 1
      }).then(() => {
        // close the create modal & reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
      }).catch(err => {
        console.log(err.message);
      });
    });
  } else {
    setupUI();
    setupPosts([], user);
  }
});


// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      bio: signupForm['signup-bio'].value
    });
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});
