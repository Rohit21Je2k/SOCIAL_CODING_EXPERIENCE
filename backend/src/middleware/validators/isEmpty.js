import { extractPath } from "./extractPath.js";
import { isEmpty } from "../../util/validators/isEmpty.js";
import { httpError } from "../httpError.js";

const validator = ({ path, check, msg }) => {
  return async (req, res, next) => {
    const string = extractPath(req, path);
    if (isEmpty(string) === !check) {
      res.send(httpError(msg));
    } else {
      next();
    }
  };
};

export default validator;
