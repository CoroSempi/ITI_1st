var signUpUserName = document.getElementById("userName");
var singUpEmail = document.getElementById("email");
var signUpPassword = document.getElementById("password");
var PasswordConformation = document.getElementById("PasswordConformation");

let signMessage = document.getElementById("signMessage");
let signUpForm = document.getElementById("signUpForm");

let noAccount = document.getElementById("no-account");
let skip = document.getElementById("skip");

skip.addEventListener("click", () => {
  window.location.href = "../index.html";
});

noAccount.addEventListener("click", () => {
  location.href = "../Pages/signIn.html";
});

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (PasswordConformation.value === signUpPassword.value) {
    checkUser();
  } else {
    signMessage.textContent = "Make sure that your Passwords match!";
  }
});

function checkUser() {
  let userReq = new XMLHttpRequest();
  userReq.open("get", "../users.json");
  userReq.addEventListener("readystatechange", () => {
    if (userReq.readyState == 4 && userReq.status == 200) {
      let users = JSON.parse(userReq.response);
      let user = users.find(
        (e) =>
          e.email == singUpEmail.value || e.userName == signUpUserName.value
      );

      if (user) {
        signMessage.textContent = "Uesr Name or Email already Exist !";
      } else {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userName: signUpUserName.value,
            email: singUpEmail.value,
            password: signUpPassword.value,
          })
        );
        signMessage.style.color = "green";
        signMessage.textContent = "Uesr Created Successfully !";
        setTimeout(() => {
          location.href = "../Pages/signIn.html";
        }, 2000);
      }
    }
  });
  userReq.send();
}
