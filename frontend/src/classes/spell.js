class Spell {
  constructor(id, name, description, type, cost) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.cost = cost;
  }

  getManaCost() {
    return this.cost;
  }
}

export default Spell;
