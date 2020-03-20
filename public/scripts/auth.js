authorization = new Object()
authorization.loggedIn = false;
//listen for auth state change
auth.onAuthStateChanged(user => {
    if (user){
        $("li.logged-in").show();
        $("li.logged-out").hide();
        authorization.loggedIn = true;
        authorization.email = user.email;
        if (user.email == "mohammad@mylilhealthmart.com")
            authorization.user = CTS.USER.BACKEND.ADMIN_SUPER
        else
            authorization.user = CTS.USER.BACKEND.ADMIN_REGULAR

    } else{
        $("li.logged-in").hide();
        $("li.logged-out").show();
        authorization.loggedIn = false;
    }
})


$('#login_alert_warning').hide();


//login
const loginForm  = document.querySelector('#login-form');
loginForm.addEventListener('submit',(evt) => {
    //Prevent default refresh action
    evt.preventDefault();

    //Get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    //signup the user with email
    //auth.createUserWithEmailAndPassword(email, password).then(cred =>{
    //    console.log(cred)
        //auth.loginWithCredential(cred);

        
    //})

    loginForm.reset();
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(function(firebaseUser) {
        $('#modal-login').modal('hide') 
    })
    .catch(function(error) {
        $('#login_alert_warning').show();
       console.log(error)
    });
})

//login
document.querySelector('#nav_logout').addEventListener('click',(evt) => {
    //Prevent default action
    evt.preventDefault();

    auth.signOut().then(()=>{
    })
})



