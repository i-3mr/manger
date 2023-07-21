// custom alert function

export const customAlert = (message, type) => {
  const alertBox = document.createElement("div");
  alertBox.className = `alert ${type ? "success" : "error"}`;
  alertBox.textContent = `${message}`;
  document.body.append(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 3000);
};
