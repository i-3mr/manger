// custom confirm box

export const customConfirm = ({ message, callback, description }) => {
  const confirmBox = document.createElement("div");
  confirmBox.className = "confirm-box";
  confirmBox.innerHTML = `
    <div class="confirm-message">
      <h3>${message}</h3>
      <p class="description">${description}</p>
      <div class="confirm-buttons">
        <button class="btn primary-btn red confirm-btn">تأكيد</button>
        <button class="btn primary-btn cancel-btn">إلغاء</button>
      </div>
    </div>
  `;
  document.body.appendChild(confirmBox);
  const confirmBtn = confirmBox.querySelector(".confirm-btn");
  const cancelBtn = confirmBox.querySelector(".cancel-btn");
  confirmBtn.addEventListener("click", () => {
    callback();
    confirmBox.remove();
  });
  cancelBtn.addEventListener("click", () => confirmBox.remove());

  confirmBox.focus();
};
