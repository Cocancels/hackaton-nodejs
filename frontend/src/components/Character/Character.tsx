import { Character } from "../../interfaces/Character";
import Button from "../Button/Button";
import HealthBar from "../HealthBar/HealthBar";
import "./Character.css";

const CharacterComponent = (props: { character: Character }) => {
  const { character } = props;
  const defaultImage =
    "https://3.bp.blogspot.com/-14UwUPZwa48/V1N5VPAv03I/AAAAAAAAFhk/QABZnaexs8Yv8tidLAqv-Sh8nI72I4dzgCLcB/s1600/Harry%252BPotter%252Brender1.png";

  return (
    <div className="character">
      <img src={defaultImage} />
      <div>
        <h2>
          {character.firstName} {character.lastName}
        </h2>
        <HealthBar health={character.health} maxHealth={character.maxHealth} />
      </div>
      {character.spells &&
        character.spells.map((spell, index) => {
          return (
            <Button
              key={`index-${index}`}
              onClick={() => console.log(spell)}
              className={spell.type}
              label={spell.name}
            />
          );
        })}
    </div>
  );
};

export default CharacterComponent;
