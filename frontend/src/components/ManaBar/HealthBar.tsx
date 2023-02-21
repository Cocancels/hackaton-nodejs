const ManaBar = (props: { mana: number; maxMana: number }) => {
  const { mana, maxMana } = props;
  const style = {
    width: `${mana}%`,
    backgroundColor: `rgb(0, 93, 255, ${mana / 100})`,
    height: "20px",
    transition: "width 0.2s ease-in-out",
    borderRadius: "20px",
  };

  return (
    <div>
      <div style={style}></div>
      <p>
        {mana} / {maxMana}
      </p>
    </div>
  );
};

export default ManaBar;
