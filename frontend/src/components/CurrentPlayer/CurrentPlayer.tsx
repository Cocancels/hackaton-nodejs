import React, { useState } from "react";
import Character from "../Character/Character";

const CurrentPlayer = () => {
  const [health, setHealth] = useState(100);
  const attack = () => {
    setHealth(health - 10);
  };
  const defense = () => {
    setHealth(health + 5);
  };
  return (
    <div className="App">
      <Character
        name="Mario"
        health={health}
        spells={[
          { id: 1, name: "épée", type: "attack", onAttack: attack },
          {
            id: 2,
            name: "Potion de régénération",
            type: "defense",
            onAttack: defense,
          },
        ]}
      />
    </div>
  );
};

export default CurrentPlayer;
