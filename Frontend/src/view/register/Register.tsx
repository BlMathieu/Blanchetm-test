import { useState } from "react";
import AuthenticationRequest from "../../request/AuthenticationRequest";
import UserAccountEntity from "../../entity/UserAccountEntity";
import { useDispatch, useSelector } from 'react-redux';
import { setRegisterWindow } from "../../reducer/WindowReducer";
import { Button } from "@mui/material";

function Register() {
    const dispatch = useDispatch();
    const window = useSelector(state => state.windowReducer.registerWindow);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    if (window) {
        return (
            <>
                <section className="window">
                    <h3>Enregistrement</h3>
                    <form onSubmit={async (event) => {
                        event.preventDefault();
                        if (password === confirmPassword) {
                            const userAccount: UserAccountEntity = { login: username, password: password };
                            await AuthenticationRequest.createAccount(userAccount);
                            dispatch(setRegisterWindow(false))
                        }
                    }}>
                        <div>
                            <label htmlFor="username">Nom d'utilisateur</label>
                            <input id="username" type="text" value={username} onChange={(event) => { setUsername(event.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe</label>
                            <input id="password" type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirmer mot de passe</label>
                            <input id="confirmPassword" type="password" value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value) }} />
                        </div>
                        <div>
                            <div>
                                <Button variant="outlined" type="submit">S'enregister</Button>
                            </div>
                            <div>
                                <Button variant="outlined" onClick={() => {
                                    dispatch(setRegisterWindow(false))
                                }}>Annuler</Button>
                            </div>  
                        </div>
                    </form>
                </section>
            </>
        );
    }

}

export default Register;