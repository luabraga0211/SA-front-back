import { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faList, faSignInAlt, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Controle.css';

const Controle = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3333/entradasaida');
            setData(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };
    console.log(data)
    const deleteEntradaSaida = async (idEntradaSaida) => {
        try {
            await axios.delete(`http://localhost:3333/entradasaida/${idEntradaSaida}`);
            fetchData(); // Atualiza a lista após a exclusão
        } catch (error) {
            console.error('Erro ao excluir essa entrada e saída:', error);
        }
    };

    const alterarTipo = async (idEntradaSaida, novoTipo) => {
        try {
            await axios.put(`http://localhost:3333/entradasaida/${idEntradaSaida}`, { tipo: novoTipo });
            fetchData(); // Atualiza a lista após a alteração
        } catch (error) {
            console.error('Erro ao alterar tipo:', error);
        }
    };

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
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{new Date(item.data).toLocaleString()}</td>
                                <td>{item.tipo}</td>
                                <td>
                                    <button onClick={() => alterarTipo(item.identradasaida, data.tipo === 'entrada' ? 'saida' : 'entrada')}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button onClick={() => deleteEntradaSaida(item.identradasaida)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Controle;