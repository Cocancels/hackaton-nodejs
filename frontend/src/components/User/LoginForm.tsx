import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
const CreateUserForm = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [errorMessage, setErrorMessage] = useState();

    return (
        <div>
            <Link to="/">Retour</Link>

            <p>Login</p>


            <form>
                <label>
                    First name:
                    <input type="text" name="firstName" onChange={e => setFirstName(e.target.value)}/>
                </label>
                <br/><br/>
                <label>
                    Password:
                    <input type="password" name="password"/>
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
