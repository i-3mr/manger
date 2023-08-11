import { API } from "../api.js";
import { customAlert } from "../js/customAlert.js";
import { isEmail } from "../js/is-email.js";

const toUrl = location.hash?.slice(1) || "";

const email = new URLSearchParams(location.search).get("email");
if (email) {
  document.querySelector(`[class="login-box"] input`).value = email;
}

const isPassword = (p) => (p.length >= 8 ? true : false);

const hostName = "";

const loginBox = document.querySelector("#login");
const registerBox = document.querySelector("#register");

const loginBtn = document.querySelector("#loginBtn");
const registerBtn = document.querySelector("#registerBtn");

document.querySelector(".no-account").addEventListener("click", () => {
  loginBox.classList.add("hide");
  registerBox.classList.remove("hide", "dNone");
  setTimeout(() => {
    loginBox.classList.add("dNone");
  }, 250);
});
document.querySelector(".account").addEventListener("click", () => {
  registerBox.classList.add("hide");
  loginBox.classList.remove("hide", "dNone");
  setTimeout(() => {
    registerBox.classList.add("dNone");
  }, 250);
});

loginBox.addEventListener("submit", async (e) => {
  e.preventDefault();
  document
    .querySelectorAll(".invalid-input")
    ?.forEach((e) => e.classList.remove("invalid-input"));

  const email = loginBox.querySelector(".email");
  const password = loginBox.querySelector("input[type='password']");
  if (!isEmail(email.value + hostName)) {
    customAlert("بريد غير صالح", false);
    email.classList.add("invalid-input");
  } else if (!isPassword(password.value)) {
    customAlert("كلمة السر يجب أن تحتوي على الأقل على ٨ حروف أو أرقام", false);
    password.classList.add("invalid-input");
  } else {
    // * Valid Data
    try {
      const data = await API.send({
        method: "post",
        url: `auth/login`,
        data: {
          email: email.value + hostName,
          password: password.value,
        },
      });
      const token = data?.token;
      localStorage.token = token;
      document.cookie = `token=${token};`;
      customAlert(data?.message, true);
      location.assign(`../${toUrl}`);
    } catch (error) {
      //console.log(error);
      customAlert(error?.response?.data?.message || error.message || "حدث خطأ");
    }
  }
});

// Registration
registerBox.addEventListener("submit", async (e) => {
  e.preventDefault();
  document
    .querySelectorAll(".invalid-input")
    ?.forEach((e) => e.classList.remove("invalid-input"));

  const name = registerBox.querySelector("input");
  const email = registerBox.querySelector(".email");
  const pass1 = registerBox.querySelector("input[type='password']");
  const pass2 = registerBox.querySelectorAll("input[type='password']")[1];
  if (name.value.length < 2) {
    customAlert("الاسم قصير جداً", false);
    name.classList.add("invalid-input");
  } else if (!isEmail(email.value + hostName)) {
    customAlert("بريد غير صالح", false);
    email.classList.add("invalid-input");
  } else if (!isPassword(pass1.value)) {
    customAlert("كلمة السر يجب أن تحتوي على الأقل على ٨ حروف أو أرقام", false);
    pass1.classList.add("invalid-input");
  } else if (pass1.value !== pass2.value) {
    pass2.classList.add("invalid-input");
    customAlert("كلمة السر غير مطابقة", false);
  } else {
    //* Valid Info
    try {
      const data = await API.send({
        method: "post",
        url: `auth/register`,
        data: {
          name: name.value,
          email: email.value + hostName,
          password: pass1.value,
        },
      });
      const token = data?.token;
      localStorage.token = token;
      document.cookie = `token=${token};`;
      location.assign(`/${toUrl}`);
      customAlert(data?.message, true);
      // emailSection(email.value + hostName);
    } catch (error) {
      //console.log(error.message);
      customAlert(error?.response?.data?.message || "حدث خطأ");
    }
  }
});

function emailSection(email) {
  document.querySelector("#login")?.remove();
  document.querySelector("#register")?.remove();

  document.querySelector(".main").innerHTML = `
    <div class="user-cont">
      <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg></div>
      <div class="text">
        <h2>تم الإرسال إلى البريد</h2>
        <span>${email}</span>
        <p dir="rtl">يرجي مراجعة البريد الخاص بك و كتابة الرمز الموجود في الرسالة</p>
      </div>
    </div>
  `;

  const input = document.createElement("input");
  input.className = "form-field";
  input.placeholder = "otp";

  const btn = document.createElement("button");
  btn.id = "loginBtn";
  btn.textContent = "توثيق";
  btn.addEventListener("click", async () => {
    if (input.value.length < 6)
      return customAlert("يجب أن يحتوي الرمز على الأقل على ٦ أرقام");

    try {
      const data = await API.send({
        method: "post",
        url: `auth/ver`,
        data: {
          otp: input.value.trim(),
          email,
        },
      });
      customAlert(data.message, true);
      localStorage.token = data.token;
      setTimeout(() => {
        location.assign("../main/");
      }, 2000);
    } catch (error) {
      customAlert(error?.response?.data?.message || "حدث خطأ");
    }
  });
  document.querySelector(".main .text").append(input, btn);
}

const noPasswordBtn = document.querySelector(".no-password");
noPasswordBtn.addEventListener("click", async () => {
  const cont = document.querySelector("#login");
  cont.querySelector("h2").textContent = "نسيت كلمة المرور";

  cont.querySelector(`[type="password"]`)?.remove();
  cont.querySelector(`label:nth-of-type(2)`)?.remove();
  cont.querySelector(`.no-account`)?.remove();
  cont.querySelector(`#loginBtn`)?.remove();
  noPasswordBtn.remove();

  const btn = document.createElement("button");
  btn.className = "loginBtn";
  btn.textContent = "إرسال";
  btn.addEventListener("click", async () => {
    try {
      const data = await API.send({
        method: "post",
        url: `auth/forget-password`,
        data: {
          email: document.querySelector(".email").value + "@kfupm.edu.sa",
        },
      });
      customAlert(data.message, true);
      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (error) {
      customAlert(error?.response?.data?.message || "حدث خطأ");
    }
  });

  cont.append(btn);
});
