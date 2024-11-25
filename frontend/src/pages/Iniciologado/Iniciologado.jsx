import './Iniciologado.css';
import logo from './logo.png'
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Iniciologado = () => {
    return (
        <div>
            <div className="navbar">
                <Link to="/cadastro">
                    <button>Ver Cadastros</button>
                </Link>
                <Link to="/controle">
                <button>Controle de Entrada e Saída</button>
                </Link>
            </div>
            <div className="icons">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <Link to="/">
                <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                </Link>
            </div>
            <div className="conteudo">
                <div className="text">
                    <p>Bem-vindo ao nosso site! Somos uma empresa especializada em controle de entrada e saída para empresas de tecnologia. Nosso objetivo é fornecer soluções eficientes e seguras para gerenciar o acesso de funcionários, visitantes e prestadores de serviços em sua empresa.</p>
                </div>
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Logo da AccessTrack Solutions" />
                    </Link>
                    <p>AccessTrack Solutions</p>
                </div>
            </div>
        </div>
    );
};

export default Iniciologado;