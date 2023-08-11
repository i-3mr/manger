export class Contributors {
  constructor({ members, pendingInvitations }) {
    // repeat the array for 10 times
    this.members = [...members];
  }

  render() {
    const contributors = document.createElement("section");
    contributors.className = "contributors";

    const title = document.createElement("h2");
    title.className = "contributors-title";
    title.textContent = "المساهمون";

    const contributorsList = document.createElement("ul");
    contributorsList.classList.add("contributors-list");
    this.members.forEach((member) => {
      contributorsList.appendChild(this.#createMember(member));
    });
    contributors.append(title, contributorsList);

    if (this.members.length)
      document.querySelector(".members").appendChild(contributors);
  }

  #createMember(member) {
    const memberItem = document.createElement("li");
    memberItem.classList.add("member");
    memberItem.innerHTML = `
      <div class="member-info">
          <div class="flex">
            <i class="fas fa-user-circle"></i>
            <h3>${member.name}</h3>
          </div>

          <button class="btn primary-btn red">حذف</button>
        </div>
      `;
    return memberItem;
  }
}
