import React from "react";

const HealthBar = (props: { health: number; maxHealth: number }) => {
  const { health, maxHealth } = props;
  const style = {
    width: `${health}%`,
    backgroundColor: health > 70 ? "green" : health > 30 ? "yellow" : "red",
    height: "20px",
    transition: "width 0.2s ease-in-out",
    borderRadius: "20px",
  };

  return (
    <div>
      <div style={style}></div>
      <p>
        {health} / {maxHealth}
      </p>
    </div>
  );
};

export default HealthBar;
