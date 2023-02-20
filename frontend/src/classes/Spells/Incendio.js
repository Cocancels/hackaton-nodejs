import Spell from "../spell";

class Incendio extends Spell {
  constructor() {
    super(
      1,
      "Incendio",
      "Lance un incendie sur votre adversaire",
      "damage",
      10
    );
  }

  cast(character) {
    character.takeDamage(10);
  }
}

export default Incendio;
