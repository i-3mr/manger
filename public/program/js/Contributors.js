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
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) 
            --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
            <h3>${member.name}</h3>
          </div>

          <button class="btn primary-btn red">حذف</button>
        </div>
      `;
    return memberItem;
  }
}
