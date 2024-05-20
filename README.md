# Desafio de Frontend do Zenklub

Este é um projeto desenvolvido em React para atender ao desafio proposto pela Zenklub, sendo uma simulação do front-end da aplicação de agendamento de sessões com profissionais de saúde mental.

## Tecnologias usadas

- React: Utilizado como o framework frontend principal para o desenvolvimento da aplicação.
- React-Slick: Biblioteca utilizada para criar o carousel de slide de dias no calendário.
- Date-fns: Biblioteca para manipulação de datas, utilizada para automatizar a geração dos dias no calendário.
- Express: Framework utilizado para criar o servidor web simulado que fornece os dados da API.

## Como executar o projeto
* Antes de tudo, certifique-se de ter o Node.js versão v20.3.0 instalado em sua máquina para poder rodar o projeto.

    1.  Clone o repositório:

        ```sh
        git clone https://github.com/olstayna/desafio-zenklub.git
        ```

    2.  Instale as dependências:
    ```sh
    cd desafio-zenklub
    npm install
    ```

    3.  Inicie o servidor simulado:
    ```sh
    cd src/services
    node schedule.service.js
    ```

    4.  Abra um novo terminal e inicie a aplicação na pasta raiz:
    ```sh
    npm start
    ```

    5.  Acesse a aplicação através do endereço:
    ```sh
    http://localhost:3000
    ```

## Testes
Rode o comando abaixo pra rodar os testes:

    npm test