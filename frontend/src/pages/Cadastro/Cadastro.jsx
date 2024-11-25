import React, { useState, useEffect } from 'react';
import './Cadastro.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faUserPlus, faList, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Cadastro = () => {
    const [novoFuncionario, setNovoFuncionario] = useState({
        name: '',
        senha: '',
    });
    const [isAddingFuncionario, setIsAddingFuncionario] = useState(false);
    const [cadastros, setCadastros] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function adicionarFuncionario() {
        setIsAddingFuncionario(true);
    }

    const salvarFuncionario = async () => {
        try {
          await fetch('http://localhost:3000/funcionarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoFuncionario),
          });
          setIsAddingFuncionario(false);
          setNovoFuncionario({ name: '', senha: '' });
          fetchCadastros(); // Fetch the updated list of cadastros
        } catch (error) {
          console.error('Erro ao salvar um novo funcionario:', error);
        }
      };

    const fetchCadastros = async () => {
        try {
            const response = await fetch('http://localhost:3000/funcionarios');
            const data = await response.json();
            setCadastros(data);
        } catch (error) {
            console.error('Erro ao buscar cadastros:', error);
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
            <button onClick={() => { /* Add your navigation logic here */ }}>
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
                <img alt="User-icon" height="180" src="https://storage.googleapis.com/a1aa/image/fOYOouqdysSdSixgJPyqtwLky7fTbYB3g7H1ljRr6Nab4V0TA.jpg" width="100"/>
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
                                        <button>Editar</button>
                                        <button>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
    </div>
    )
}

export default Cadastro;