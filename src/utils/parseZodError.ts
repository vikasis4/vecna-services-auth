import { ZodIssue } from "zod";

const parseZodErrors = (err: ZodIssue[]) => {
  let message: string = "";

  for (const error of err) {
    message += `${error.path.join(".")} -> ${error.message}, `;
  };

  return message;
};

export default parseZodErrors