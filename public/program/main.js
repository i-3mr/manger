// take queries

import { API } from "../api.js";
import { Contributors } from "./js/Contributors.js";
import { QuestionForm } from "./js/QuestionForm.js";
import { createNewFormElement } from "./js/create-new-form.js";
import { inviteMembersELement } from "./js/invite-members.js";

export const programId = new URLSearchParams(location.search).get("id");
const programName = new URLSearchParams(location.search).get("name");

const token = localStorage.getItem("token");

if (!token) location.href = "/login";
if (!programId) location.assign("/");

document.querySelector(".sub-title").textContent = `برنامج : ${programName}`;

// get program data
const program = API.send({
  method: "GET",
  url: `programs/${programId}`,
});

// get forms data
const forms = API.send({
  method: "GET",
  url: `forms/?programId=${programId}`,
});

const [programData, formsData] = await Promise.all([program, forms]);


if (formsData.forms.length === 0) {
  document.querySelector(".grid-container").append(createNewFormElement());
}

const formsContainer = formsData.forms.map((el) => {
  const form = QuestionForm.fromJSON(el);
  form.renderToDOM();
  return form;
});

const contributors = new Contributors({ members: programData.contributors });
contributors.render();

// invite members element
inviteMembersELement();
