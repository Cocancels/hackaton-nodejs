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
  const defaultImage =
    "https://3.bp.blogspot.com/-14UwUPZwa48/V1N5VPAv03I/AAAAAAAAFhk/QABZnaexs8Yv8tidLAqv-Sh8nI72I4dzgCLcB/s1600/Harry%252BPotter%252Brender1.png";

  return (
    <div className="character">
      <img className="character-image" src={defaultImage} alt={""} />
      <div>
        <h2>
          {character.firstName} {character.lastName}
        </h2>
        <HealthBar health={character.health} maxHealth={character.maxHealth} />
        <ManaBar mana={character.mana} maxMana={character.maxMana} />
        <StatusBar status={character.status} />
      </div>
    </div>
  );
};

export default CharacterComponent;
