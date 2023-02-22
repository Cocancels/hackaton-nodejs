import React from "react";

const HealthBar = (props: { health: number; maxHealth: number }) => {
  const { health, maxHealth } = props;
  const style = {
    width: `${health}%`,
    background: health > 70 ? "rgb(70, 164, 126)" : health > 30 ? "rgb(247, 141, 90)" : "rgb(207, 0, 1)",
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
        <img src="https://i.ibb.co/GxrMrZg/tournoi.png" alt="" style={{ 
          width: '30px',
          background: health > 70 ? "rgb(70, 164, 126)" : health > 30 ? "rgb(247, 141, 90)" : "rgb(207, 0, 1)",
          borderRadius: '50%',
          marginRight: '5px',
          }} />
       {health} / {maxHealth}
      </p>
    </div>
  );
};

export default HealthBar;
