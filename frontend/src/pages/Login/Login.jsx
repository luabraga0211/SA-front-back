import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router";

const Login = () => {

    const [name, setName] = useState("");
    const [senha, setSenha] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const navigate = useNavigate()

    const handleSubmit = () => {
        if (name === "admin" && senha === "admin@123") {
            return navigate("/iniciologado")
        }
        setErrorMessage("Credenciais inválidas")
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Seja Bem Vindo(a) á ATSoluctions</h1> 
                <br></br><p>Para começar, realize seu login de administrador.</p>
                <div className="input-campo">
                    <input type="name" placeholder="Coloque o seu nome" onChange={(e) => setName(e.target.value)} />
                    <FaUser className="icon" />
                </div>
                <div className="input-campo">
                    <input type="password" placeholder="Coloque sua Senha" onChange={(e) => setSenha(e.target.value)} />
                    <FaLock className="icon" />
                </div>
                <div className="error-msg">
                {errorMessage && <p>{errorMessage}</p>}
                </div>
                <div className="recall-forget">
                    <label>
                        <input type="checkbox" />
                        Lembre de mim
                    </label>
                    <a href="">Esqueceu a senha</a>
                </div>

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;