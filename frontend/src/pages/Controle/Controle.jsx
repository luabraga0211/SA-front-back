import {useState} from "react";
import {useEffect} from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faList, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Controle.css';

const Entradasaida = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3333/entradasaida');
                setData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    return (
    <div>
        <div className='navbar'>
                <Link to="/cadastro">
                <button>Ver Cadastros
                    <FontAwesomeIcon icon={faList} />
                </button>
                </Link>
                    <Link to="/controle">
                   <button> Controle de Entrada e Saída
                    <FontAwesomeIcon icon={faSignInAlt} />
                </button>
                </Link>
                <Link to="/iniciologado">
                    <button>Voltar Inicio
                        <FontAwesomeIcon icon={faList} />
                    </button>
                </Link>
            </div>
            <div className="icons">
                <FontAwesomeIcon icon={faUserCircle} className="icon" />
                <Link to="/">
                    <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                </Link>
            </div>
        <div className="controle-container">
            <h2 className="controle-heading">Entradas e Saídas</h2>
            <table className="controle-table">
                <thead>
                    <tr>
                        <th>Nome do Funcionário</th>
                        <th>Data</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{new Date(item.data).toLocaleString()}</td>
                            <td>{item.tipo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default Entradasaida;