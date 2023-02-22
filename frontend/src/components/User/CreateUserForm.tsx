import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
const CreateUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [house, setHouse] = useState(1);
  const [housesChoices, setHousesChoices] = useState([{id : 0, name : ""}]);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayLoginContainer, setDisplayLoginContainer] = useState(false);
  const [registeredUser, setRegisteredUser] = useState({house : {name : ''}, name : ''});

  const createUserOnExternalApi = () =>{
    //registration on external api
    let user = {
      name : nickName,
      password : password,
      houseId : house,
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    fetch("https://hp-api-iim.azurewebsites.net/auth/register", requestOptions)
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          } else {
            setRegisteredUser(data)
            setDisplayLoginContainer(true);
          }
        })
        .catch((error) => {
          setErrorMessage("Cet utilisateur existe déjà, veuillez vous connecter.")
        });
  }
  const sendForm = (event: any) => {
    createUser()
    createUserOnExternalApi()
    event.preventDefault();
  };
  const createUser = () => {
    let user = {
      firstName,
      lastName,
      house,
      nickName,
      password,
    };
    if (
        firstName === "" ||
        lastName === "" ||
        nickName === "" ||
        password === ""
    ) {
      setErrorMessage("Merci de remplir tous les champs");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      };
      setErrorMessage("");
      fetch("http://localhost:3001/register", requestOptions)
          .then(async (response) => {
            const data = await response.json();
          })
    }
  }
  const getHousesChoices = () => {
    fetch("https://hp-api-iim.azurewebsites.net/houses")
        .then(async (response) => {
          const data = await response.json();
          setHousesChoices(data)
        })
  }

  useEffect(() => {
    getHousesChoices()
  }, [])

  return (
    <div>
      <Link to="/">Retour</Link>

      <p>Register</p>

      <form onSubmit={sendForm}>
        <label>
          First name :
          <input
            type="text"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Last name :
          <input
            type="text"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Nickname :
          <input
            type="text"
            name="nickName"
            onChange={(e) => setNickName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Password :
          <input
            type="text"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          House :
          <span>{house}</span>
          <select
              value={house}
              onChange={(e) => setHouse(parseInt(e.target.value))}
          >
            {housesChoices.map((house, index) => <option key={index} value={house.id} >{house.name}</option>)}
          </select>

        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />

        <p>{errorMessage}</p>

        {displayLoginContainer ? (
          <div>
            <p>Bienvenue chez {registeredUser.house.name}, {registeredUser.name} !</p>
            <Link to="/login">Se connecter</Link>
          </div>
        ) : (
          <Link to="/login">Se connecter</Link>
        )}
      </form>
    </div>
  );
};

export default CreateUserForm;
