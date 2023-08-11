// email input

export const emailInput = () => {
  const input = document.createElement("input");
  input.type = "email";
  input.name = "email";
  input.dir = "ltr";
  input.className = "question-input primary-input email-input text-center";
  input.placeholder = "example@example.com";

  input.addEventListener("blur", (event) => {
    if (!validateEmail(event.target.value)) {
      event.target.classList.add("invalid");
      event.target.classList.remove("valid");
      return;
    }

    event.target.classList.remove("invalid");
    event.target.classList.add("valid");
  });

  return input;
};

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
