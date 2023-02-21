export const translate = (type: string) => {
  switch (type) {
    case "damage":
      return "Dégâts";
    case "defense":
      return "Défense";
    case "utility":
      return "Utilitaire";
    default:
      return type;
  }
};
