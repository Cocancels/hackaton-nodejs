import "./HealthBar.css";

const HealthBar = (props: { health: number; maxHealth: number }) => {
  const { health, maxHealth } = props;
  const style = {
    width: `${health}%`,
    backgroundColor: `rgb(66, 196, 27, ${health / 100})`,
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
      <p className="health-bar-text">
        {health} / {maxHealth}
      </p>
    </div>
  );
};

export default HealthBar;
