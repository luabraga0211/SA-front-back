import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import './Entradasaida.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faList, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Entradasaida = () => {    
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [tipo, setTipo] = useState('entrada');
    const [isModalOpen, setIsModalOpen] = useState(false); // Adicionando estado para o modal

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3333/entradasaida', { name, tipo });
            setName('');
            setTipo('entrada');
            const response = await axios.get('http://localhost:3333/entradasaida');
            setData(response.data);
        } catch (error) {
            console.error('Erro ao registrar entrada/saída:', error);
        }
    };

    return (
        <div>
            <div className='navbar'>
                <button onClick={() => setIsModalOpen(true)}>
                    Ver Cadastros
                    <FontAwesomeIcon icon={faList} />
                </button>
                <button onClick={() => { /* Adicione sua lógica de navegação aqui */ }}>
                    Controle de Entrada e Saída
                    <FontAwesomeIcon icon={faSignInAlt} />
                </button>
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
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome do Funcionário"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="entrada">Entrada</option>
                        <option value="saida">Saída</option>
                    </select>
                    <button type="submit">Registrar</button>
                </form>
                <h2>Entradas e Saídas</h2>
                <table>
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
            {isModalOpen && (
                <div className="modal">
                    {/* Aqui você pode adicionar o conteúdo do modal */}
                    <button onClick={() => setIsModalOpen(false)}>Fechar</button>
                </div>
            )}
        </div>
    );
}

export default Entradasaida;