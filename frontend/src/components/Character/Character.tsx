import React from "react";
import Button from "../Button/Button";
import HealthBar from "../HealthBar/HealthBar";
import "./Character.css";

interface Spell {
  type: string;
  name: string;
  id: number;
  onAttack: () => void;
}

interface CharacterProps {
  name: string;
  image?: string;
  health: number;
  spells: Spell[];
}

const Character = (props: CharacterProps) => {
  const { name, image, health, spells } = props;
  const defaultImage =
    "https://3.bp.blogspot.com/-14UwUPZwa48/V1N5VPAv03I/AAAAAAAAFhk/QABZnaexs8Yv8tidLAqv-Sh8nI72I4dzgCLcB/s1600/Harry%252BPotter%252Brender1.png";

  return (
    <div className="character">
      <img src={image ? image : defaultImage} alt={name} />
      <div>
        <h2>{name}</h2>
        <HealthBar health={health} />
      </div>
      {spells &&
        spells.map((spell, index) => {
          return (
            <Button
              key={`index-${index}`}
              onClick={spell.onAttack}
              className={spell.type}
              label={spell.name}
            />
          );
        })}
    </div>
  );
};

export default Character;
