import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
const CreateUserForm = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");
    const [house, setHouse] = useState("Griffondord");

    const [errorMessage, setErrorMessage] = useState("");
    const [displayLoginContainer, setDisplayLoginContainer] = useState(false);

    const sendForm = (event :any) => {
        let user = {
            firstName,
            lastName,
            house,
            nickName,
            password
        }

        if(firstName === "" || lastName === "" || house === "" || nickName === "" || password === ""){
            setErrorMessage("Merci de remplir tous les champs")
        }else{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
            setErrorMessage("")
            fetch('http://localhost:3001/register', requestOptions)
                .then(async response => {
                    const data = await response.json();

                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }else{
                        console.log(user)
                        setDisplayLoginContainer(true)
                    }

                })
                .catch(error => {
                    setErrorMessage(error.toString())
                });
        }

        event.preventDefault();
    };

    return (
        <div>
            <Link to="/">Retour</Link>

            <p>Register</p>


            <form onSubmit={sendForm}>
                <label>
                    First name :
                    <input type="text" name="firstName" onChange={e => setFirstName(e.target.value)}/>
                </label>
                <br/><br/>
                <label>
                    Last name :
                    <input type="text" name="lastName" onChange={e => setLastName(e.target.value)}/>
                </label>
                <br/><br/>
                <label>
                    Nickname :
                    <input type="text" name="nickName" onChange={e => setNickName(e.target.value)}/>
                </label>
                <br/><br/>
                <label>
                    Password :
                    <input type="text" name="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <br/><br/>
                <label>
                    House :
                    <select name="house" onChange={e => setHouse(e.target.value)}>
                        <option selected={true} value="Griffondord">Griffondord</option>
                        <option value="Serpentard">Serpentard</option>
                        <option value="Pouffsouffle">Pouffsouffle</option>
                        <option value="Serdaigle">Serdaigle</option>
                    </select>
                </label>
                <br/><br/>
                <input type="submit" value="Submit" />

                <p>{errorMessage}</p>

                { displayLoginContainer ?
                    <div>
                        <p>Merci pour votre inscription { firstName } !</p>
                        <Link to="/login">Se connecter</Link>
                    </div>
                :   <Link to="/login">Se connecter</Link>
                }

            </form>

        </div>
    );
}

export default CreateUserForm;
