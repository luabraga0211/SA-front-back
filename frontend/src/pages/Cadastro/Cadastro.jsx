import {useState} from "react";
import {useEffect} from "react";
import './Cadastro.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faList, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cadastro = () => {
    const [novoFuncionario, setNovoFuncionario] = useState({
        name: '',
        senha: '',
    });
    const [cadastros, setCadastros] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [funcionarioEditando, setFuncionarioEditando] = useState(null); // Estado para o funcionário que está sendo editado

    const salvarFuncionario = async () => {
        try {
            if (funcionarioEditando) {
                // Atualiza funcionário existente
                await axios.put(`http://localhost:3333/funcionarios/${funcionarioEditando.matricula}`, novoFuncionario);
                setFuncionarioEditando(null); // Limpa o estado de edição
            } else {
                // Cria novo funcionário
                await axios.post('http://localhost:3333/funcionarios', novoFuncionario);
            }
            setNovoFuncionario({ name: '', senha: '' });
            fetchCadastros(); // Atualiza a lista
        } catch (error) {
            console.error('Erro ao salvar um novo funcionário:', error);
        }
    };

    const fetchCadastros = async () => {
        try {
            const response = await axios.get('http://localhost:3333/funcionarios');
            setCadastros(response.data);
        } catch (error) {
            console.error('Erro ao buscar cadastros:', error);
        }
    };

    const editarFuncionario = (funcionario) => {
        setNovoFuncionario({ name: funcionario.name, senha: funcionario.senha });
        setFuncionarioEditando(funcionario); // Define o funcionário que está sendo editado
        setIsModalOpen(false)
    };

    const excluirFuncionario = async (matricula) => {
        try {
            await axios.delete(`http://localhost:3333/funcionarios/${matricula}`);
            fetchCadastros(); // Atualiza a lista após a exclusão
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
        }
    };

    useEffect(() => {
        fetchCadastros();
    }, []);
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
                <div className='formulario'>
                    <img alt="User-icon" height="180" src="https://storage.googleapis.com/a1aa/image/fOYOouqdysSdSixgJPyqtwLky7fTbYB3g7H1ljRr6Nab4V0TA.jpg" width="100" />
                    <div>
                        <label htmlFor="funcionario">
                            Nome:
                        </label>
                        <input
                            placeholder="Insira seu nome"
                            value={novoFuncionario.name}
                            onChange={(e) => setNovoFuncionario({ ...novoFuncionario, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="senha">
                            Senha:
                        </label>
                        <input
                            type="password"
                            placeholder="Insira sua senha"
                            value={novoFuncionario.senha}
                            onChange={(e) => setNovoFuncionario({ ...novoFuncionario, senha: e.target.value })}
                        />
                    </div>
                    <button onClick={salvarFuncionario}>Salvar</button>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-conteudo">
                        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h2>Cadastros</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome do Funcionário</th>
                                    <th>Senhas Do Funcionário</th>
                                    <th>Editar/Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cadastros.map((funcionario, index) => (
                                    <tr key={index}>
                                        <td>{funcionario.name}</td>
                                        <td>{funcionario.senha}</td>
                                        <td className="action-buttons">
                                        <button onClick={() => editarFuncionario(funcionario)}>Editar</button>
                                        <button onClick={() => excluirFuncionario(funcionario.matricula)}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cadastro;