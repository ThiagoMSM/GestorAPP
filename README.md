# 📱 **GestorAPP**

GestorAPP é um aplicativo mobile desenvolvido com **React Native** que visa facilitar a gestão de usuários e empresas, além de permitir funcionalidades como autenticação, leitura de QR Codes e integração com o Firebase para armazenamento e consulta de dados.

## 📂 **Estrutura do Projeto**

A organização das pastas é a seguinte:

```bash
GestorAPP/
├── .expo/                 # Arquivos de configuração do Expo
├── assets/                # Recursos estáticos como imagens e ícones
├── node_modules/          # Dependências instaladas via npm
├── src/                   # Código-fonte do aplicativo
│   ├── BD/                # Integração com banco de dados (Firebase)
│   │   └── Firebase.js    # Configurações e funções do Firebase
│   ├── fonts/             # Arquivos de fontes personalizadas
│   │   └── JetBrainsMono-*.ttf # Fontes JetBrains Mono usadas no projeto
│   ├── mensagens/         # Módulo de gerenciamento de mensagens do app
│   │   └── Msg.js
│   ├── screens/           # Telas do aplicativo
│   │   ├── home/          # Telas principais
│   │   │   ├── Indexador.js    # Componente de navegação inicial
│   │   │   ├── PaginaInicial.js # Tela inicial do app
│   │   │   └── PaginaLogado.js  # Tela após o login
│   │   ├── SingIn/        # Tela de login
│   │   │   └── Login.js
│   │   ├── SingUp/        # Telas de cadastro de usuários
│   │   │   ├── CadastroEmpresa.js # Tela de cadastro de empresa
│   │   │   └── CadastroGestor.js  # Tela de cadastro de gestores
│   ├── servicos/          # Funções de serviço e utilitários
│   │   ├── Autenticacao.js # Autenticação de usuários (Firebase Auth)
│   │   ├── Consulta.jsx    # Consulta de dados no Firebase
│   │   ├── Funcoes.js      # Funções auxiliares e genéricas
│   │   ├── Scanner.js      # Leitura de QR Codes
│   │   └── ServicosBD.js   # Serviços para comunicação com o banco de dados
├── .gitignore             # Arquivos/diretórios ignorados pelo Git
├── App.js                 # Componente raiz do aplicativo
├── app.json               # Configurações do aplicativo para o Expo
├── babel.config.js        # Configurações do Babel
├── package.json           # Configurações e dependências do projeto
└── package-lock.json      # Versões bloqueadas das dependências

