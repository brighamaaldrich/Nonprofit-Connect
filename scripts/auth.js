// Listen for auth state changes
auth.onAuthStateChanged(user => {
    console.log(user);
    if(user) {
        console.log("User is logged in: ", user);
        // Get data
        db.collection("posts").get().then(snapshot => {
            console.log(snapshot.docs);
            setupPosts(snapshot.docs);
            setupUI(user);
        });
    } else {
        console.log("User logged out!");
        setupUI();
        setupPosts([]);
    }
});
// Signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get user info
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;
    console.log(email, password);

    // Signup the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        signupForm.reset()
    });
});

// Logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("User has signed out!");
    });
});

// Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get user info
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        // Close the login modal and reset the form
        const modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset()
    })
});