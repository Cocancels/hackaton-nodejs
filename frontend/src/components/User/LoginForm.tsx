import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
const CreateUserForm = () => {

    const [nickName, setFirstName] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const sendForm = (event :any) => {
        let body = {
            nickName,
            password
        }

        if(nickName === "" || password === ""){
            setErrorMessage("Merci de remplir tous les champs")
        }else{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
            setErrorMessage("")
            fetch('http://localhost:3001/login', requestOptions)
                .then(async response => {
                    const data = await response.json();

                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }else{
                        console.log("Vous etes co")
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

            <p>Login</p>

            <form onSubmit={sendForm}>
                <label>
                    Nick name:
                    <input type="text" name="nickName" onChange={e => setFirstName(e.target.value)}/>
                </label>
                <br/><br/>
                <label>
                    Password:
                    <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <br/><br/>

                <br/><br/>
                <input type="submit" value="Submit" />

                <p>{errorMessage}</p>

                <Link to="/register">S'inscrire</Link>


            </form>

        </div>
    );
}

export default CreateUserForm;
