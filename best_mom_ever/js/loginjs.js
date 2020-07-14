const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "happybirthday" && password === "0728") {
        window.location.replace("https://amandawang0125.github.io/html/best_mom_ever/pics.html");
       /// location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})