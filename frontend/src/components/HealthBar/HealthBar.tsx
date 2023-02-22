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
        <img
          src="https://i.ibb.co/GxrMrZg/tournoi.png"
          alt=""
          style={{
            width: "30px",
            background:
              health > 70
                ? "rgb(70, 164, 126)"
                : health > 30
                ? "rgb(247, 141, 90)"
                : "rgb(207, 0, 1)",
            borderRadius: "50%",
            marginRight: "5px",
          }}
        />
        {health} / {maxHealth}
      </p>
    </div>
  );
};

export default HealthBar;
