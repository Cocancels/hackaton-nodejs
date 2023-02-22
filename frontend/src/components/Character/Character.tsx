import { useEffect, useState } from "react";
import Character from "../../classes/character";
import { CharacterData } from "../../interfaces/Character";
import Button from "../Button/Button";
import HealthBar from "../HealthBar/HealthBar";
import ManaBar from "../ManaBar/HealthBar";
import "./Character.css";
import { StatusBar } from "./StatusBar/StatusBar";

interface CharacterProps {
  character: CharacterData;
  flip?: boolean;
  isAttacking?: boolean;
  playerAttacking?: Character;
}

const CharacterComponent = (props: CharacterProps) => {
  const { character, flip, isAttacking, playerAttacking } = props;

  const [image, setImage] = useState<string>("/images/hr-debout.gif");

  const handleAttack = () => {
    setImage("/images/hr-sort.gif");
    setTimeout(() => {
      setImage("/images/hr-debout.gif");
    }, 1000);
  };

  useEffect(() => {
    if (isAttacking) {
      handleAttack();
    }
  }, [isAttacking]);

  return (
    <div className="character-container">
      <div className="character">
        <div className={`character-name`}>
          <h2>
            {character.firstName} {character.lastName}
          </h2>
        </div>
        <div className="character-image-container">
          <img
            className={`character-image ${flip ? "flipped" : ""}`}
            src={image}
            alt={""}
          />
          <div className="character-info">
            <StatusBar status={character.status} />
            <div className="character-info-bar">
              <HealthBar
                health={character.health}
                maxHealth={character.maxHealth}
              />
              <ManaBar mana={character.mana} maxMana={character.maxMana} />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CharacterComponent;
