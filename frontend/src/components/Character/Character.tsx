import { Character } from "../../interfaces/Character";
import Button from "../Button/Button";
import HealthBar from "../HealthBar/HealthBar";
import ManaBar from "../ManaBar/HealthBar";
import "./Character.css";
import { StatusBar } from "./StatusBar/StatusBar";

interface CharacterProps {
  character: Character;
  isCurrentPlayer: boolean;
  onSpellClick: (id: number) => void;
}

const CharacterComponent = (props: CharacterProps) => {
  const { character, isCurrentPlayer, onSpellClick } = props;

  const handleSpellUse = (id: number) => {
    onSpellClick(id);
  };

  return (
    <div className="character">
      <div>
        <h2>
          {character.firstName} {character.lastName}
        </h2>
        <HealthBar health={character.health} maxHealth={character.maxHealth} />
        <ManaBar mana={character.mana} maxMana={character.maxMana} />
        <StatusBar status={character.status} />
      </div>
      {character.spells &&
        isCurrentPlayer &&
        character.spells.map((spell, index) => {
          return (
            <Button
              key={`index-${index}`}
              onClick={() => handleSpellUse(spell.id)}
              className={`${spell.type}-button`}
              label={spell.name}
              spell={spell}
            />
          );
        })}
    </div>
  );
};

export default CharacterComponent;
