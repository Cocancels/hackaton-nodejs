<<<<<<< HEAD
import { useState } from "react";
import { Link } from "react-router-dom";
=======
import React, {useEffect, useState} from 'react';
// import './App.css';
import {Link} from "react-router-dom";
>>>>>>> rooms
const CreateUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [house, setHouse] = useState("");
  const sendForm = (event: any) => {
    event.preventDefault();
    console.log(firstName, lastName, house);
  };

  return (
    <div>
      <Link to="/">Retour</Link>

      <p>create account</p>

      <form onSubmit={sendForm}>
        <label>
          First name:
          <input
            type="text"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Last name:
          <input
            type="text"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          House:
          <select name="house" onChange={(e) => setHouse(e.target.value)}>
            <option value="Griffondord">Griffondord</option>
            <option value="Serpentard">Serpentard</option>
            <option value="Pouffsouffle">Pouffsouffle</option>
            <option value="Serdaigle">Serdaigle</option>
          </select>
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateUserForm;
