import { OverlayTrigger, Popover } from "react-bootstrap";
import { Spell } from "../../interfaces/Spell";
import { translate } from "../../utils/translateType";
import "./Button.css";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  label: string;
  spell?: Spell;
}

function Button(props: ButtonProps) {
  const { onClick, className, label, spell } = props;

  const popover = (
    <Popover id="popover-basic">
      {spell && (
        <>
          <Popover.Header as="h3">
            {spell.name} - {translate(spell.type)}
          </Popover.Header>
          <Popover.Body>
            <ul>
              <li>
                <p className="spell-description">{spell.description}</p>
              </li>
              <li>
                <p className="spell-cost">
                  <span className="spell-cost-label">Coût : </span>
                  <span className="spell-cost-value">{spell.cost} mana</span>
                </p>
              </li>
              <li>
                <p className="spell-power">
                  <span className="spell-power-label">Puissance : </span>
                  <span className="spell-power-value">{spell.power}</span>
                </p>
              </li>
            </ul>
          </Popover.Body>
        </>
      )}
    </Popover>
  );

  return (
    <div className="button-relative-container">
      <OverlayTrigger
        placement="right"
        delay={{ show: 100, hide: 100 }}
        overlay={popover}
      >
        <button onClick={onClick} className={`button ${className}`}>
          {label}
        </button>
      </OverlayTrigger>
    </div>
  );
}

export default Button;
