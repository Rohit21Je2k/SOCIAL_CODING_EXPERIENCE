import { default as Menu2 } from "./Menu2/Menu";

export default function getMenu(type) {
  if (type == 2) {
    return Menu2;
  }
}
