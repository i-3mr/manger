// phone input

export const phoneInput = () => {
  const input = document.createElement("input");
  input.type = "tel";
  input.dir = "ltr";
  input.name = "phone";
  input.className = "question-input primary-input text-center";
  input.placeholder = "05xxxxxxxx";

  input.addEventListener("input", (event) => {
    // regex to remove all non-digits but not spaces
    const regex = /[^\d]/g;

    const phoneNumber = event.target.value.replace(regex, "");
    let formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    event.target.value = formattedPhoneNumber;

    event.target.value = formattedPhoneNumber;
  });

  input.addEventListener("blur", (event) => {
    if (!validatePhoneNumber(event.target.value)) {
      event.target.classList.add("invalid");
      event.target.classList.remove("valid");
      return;
    }

    event.target.classList.remove("invalid");
    event.target.classList.add("valid");
  });

  return input;
};

const validatePhoneNumber = (phoneNumber) => {
  const regex = /^05\d{8}$/;

  return regex.test(phoneNumber.split(" ").join(""));
};

const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = phoneNumberString.replace(/\D/g, "");

  const part1 = cleaned.substring(0, 3);
  const part2 = cleaned.substring(3, 6);
  const part3 = cleaned.substring(6, 10);

  return `${part1} ${part2} ${part3}`.trim();
};
