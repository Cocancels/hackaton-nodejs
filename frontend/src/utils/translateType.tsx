export const translate = (type: string) => {
  switch (type) {
    case "damage":
      return "Dégâts";
    case "defense":
      return "Défense";
    case "status":
      return "Status";
    default:
      return type;
  }
};
