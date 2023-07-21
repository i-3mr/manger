// take queries

import { Contributors } from "./js/Contributors.js";
import { QuestionForm } from "./js/QuestionForm.js";
import { createNewFormElement } from "./js/create-new-form.js";
import { inviteMembersELement } from "./js/invite-members.js";

export const programId = new URLSearchParams(location.search).get("id");
const programName = new URLSearchParams(location.search).get("name");

export const BASE_URL = "/api/v1";
export const TOKEN = localStorage.getItem("token");

if (!TOKEN) location.href = "/login";
if (!programId) location.assign("/");

document.querySelector(".sub-title").textContent = `برنامج : ${programName}`;

// get program data
const program = axios({
  method: "GET",
  url: `${BASE_URL}/programs/${programId}`,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

// get forms data
const forms = axios({
  method: "GET",
  url: `${BASE_URL}/forms/?programId=${programId}`,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

const [programData, formsData] = await Promise.all([program, forms]).then((e) =>
  e.map((e) => e.data)
);

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
