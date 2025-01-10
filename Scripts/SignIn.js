var singInEmail = document.getElementById("email");
var signInPassword = document.getElementById("password");

let signMessage = document.getElementById("signMessage");
let signInForm = document.getElementById("signInForm");

let noAccount = document.getElementById("no-account");
let skip = document.getElementById("skip");

skip.addEventListener("click", () => {
  window.location.href = "../index.html";
});

noAccount.addEventListener("click", () => {
  location.href = "../Pages/signUp.html";
});

signInForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(singInEmail.value);
  console.log(signInPassword.value);

  checkUser();
});

function checkUser() {
  let userReq = new XMLHttpRequest();
  userReq.open("get", "../users.json");
  userReq.addEventListener("readystatechange", () => {
    if (userReq.readyState == 4 && userReq.status == 200) {
      let users = JSON.parse(userReq.response);
      let localUser = localStorage.getItem("userData");
      localUser = JSON.parse(localUser);
      if (localUser) {
        users = [...users, localUser];
      }

      console.log(users);
      let user = users.find(
        (e) =>
          e.email == singInEmail.value && e.password == signInPassword.value
      );

      if (user) {
        localStorage.setItem("userName", user.userName);
        location.href = "../index.html";
      } else {
        signMessage.innerHTML = "";
        signMessage.innerHTML = "Wrong Email or Password, Please try Again";
      }
    }
  });
  userReq.send();
}
