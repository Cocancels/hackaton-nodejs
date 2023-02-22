import { CharacterData } from "../../interfaces/Character";
import Button from "../Button/Button";
import HealthBar from "../HealthBar/HealthBar";
import ManaBar from "../ManaBar/HealthBar";
import "./Character.css";
import { StatusBar } from "./StatusBar/StatusBar";

interface CharacterProps {
  character: CharacterData;
}

const CharacterComponent = (props: CharacterProps) => {
  const { character } = props;
  const defaultImage = "/images/hr-debout.gif";

  return (
    <div className="character-container">
      <div className="character">
        <div className={`character-name`}>
          <h2>
            {character.firstName} {character.lastName}
          </h2>
        </div>
        <div className="character-image-container">
          <img className="character-image" src={defaultImage} alt={""} />
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
