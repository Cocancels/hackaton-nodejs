const ManaBar = (props: { mana: number; maxMana: number }) => {
  const { mana, maxMana } = props;
  const style = {
    width: `${mana}%`,
    backgroundColor: `rgb(0, 93, 255, ${mana / 100})`,
    height: "20px",
    transition: "width 0.2s ease-in-out",
    borderRadius: "20px",
    paddingLeft: "10px",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div style={style}>
      <p>
        <img src="https://i.ibb.co/f1N34X6/mana.png" alt="" style={{ 
          width: '30px',
          background: `rgb(0, 93, 255, ${mana / 100})`,
          borderRadius: '50%',
          marginRight: '5px',
          }} />
        {mana} / {maxMana}
      </p>
    </div>
  );
};

export default ManaBar;
