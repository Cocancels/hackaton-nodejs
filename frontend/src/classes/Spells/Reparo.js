import Spell from "../spell";

class Reparo extends Spell {
  constructor() {
    super(2, "Reparo", "Lance un sort de soin", "utility", 10);
  }

  cast(character) {
    character.heal(10);
  }
}

export default Reparo;
