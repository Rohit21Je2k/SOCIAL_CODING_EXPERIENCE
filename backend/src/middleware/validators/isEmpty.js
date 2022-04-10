import { extractPath } from "./extractPath.js";
import { isEmpty } from "../../util/validators/_index.js";
import { httpError } from "../../util/functions/_index.js";

const validator = ({ path, check, msg }) => {
  return async (req, res, next) => {
    const string = extractPath(req, path);
    if (isEmpty(string) === check) {
      res.send(httpError(msg));
    } else {
      next();
    }
  };
};

export default validator;
