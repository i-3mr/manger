import { PhoneNumQuestion } from "./PhoneNumQuestion.js";
import { FieldQuestion } from "./FieldQuestion.js";
import { MultipleChoice } from "./MultipleChoice.js";
import { EmailQuestion } from "./EmailQuestion.js";

export class QuestionBuilder {
  static buildQuestion(question) {
    switch (question.type) {
      case "field":
        return new FieldQuestion({ question });
      case "multiple":
        return new MultipleChoice({ question });
      case "phone":
        return new PhoneNumQuestion({ question });
      case "email":
        return new EmailQuestion({ question });
    }
  }
}
