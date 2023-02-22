import "./ManaBar.css";

const ManaBar = (props: { mana: number; maxMana: number }) => {
  const { mana, maxMana } = props;
  const style = {
    width: `${mana}%`,
    backgroundColor: `rgb(0, 93, 255, ${mana / 100})`,
    height: "40px",
    transition: "width 0.2s ease-in-out",
    border: "2px solid black",
    borderRadius: "10px",
    paddingLeft: "10px",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div style={style}>
      <p className="mana-bar-text">
        {mana} / {maxMana}
      </p>
    </div>
  );
};

export default ManaBar;
