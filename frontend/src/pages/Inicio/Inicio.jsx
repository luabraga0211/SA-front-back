import './Inicio.css';  // Importa o arquivo CSS para estilização específica da página Inicio.
import logo from './logo.png';  // Importa o logo da aplicação.

import { Link } from 'react-router-dom';  // Importa o componente Link do React Router para navegação entre páginas.

// Componente funcional Inicio que representa a página inicial do site.
const Inicio = () => {
    return (
        <div>
        <div className="topo">  {/* Contêiner principal da página */}
           <Link className="botao-funcao" to="/login">Login</Link>  {/* Botão para redirecionar para a página de login */}
            <div className="conteudo">  {/* Contêiner para o conteúdo principal da página */}
                <div className="text">  {/* Div para o texto de boas-vindas */}
                        <p>Bem-vindo ao nosso site! Somos uma empresa especializada em controle de entrada e saída para empresas de tecnologia. Nosso objetivo é fornecer soluções eficientes e seguras para gerenciar o acesso de funcionários, visitantes e prestadores de serviços em sua empresa.</p>
                    </div>
                    <div className="logo">  {/* Div para o logo da empresa */}
                        <Link to="/">  {/* Link de navegação para a página inicial */}
                        <img src={logo} alt="Logo da AccessTrack Solutions" />  {/* Exibição do logo da empresa */}
                        </Link>
                        <p>AccessTrack Solutions</p>  {/* Nome da empresa */}
                    </div>
                </div>
           <Link className="botaofuncao2">Entre em Contato</Link>  {/* Botão para entrar em contato */}
                <p className="footer-text">Caso queira contratar nossos serviços entre em contato</p>  {/* Texto pequeno */}
            </div>
        </div>
    );
};

export default Inicio;  // Exporta o componente Inicio para ser utilizado em outros arquivos.