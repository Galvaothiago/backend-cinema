<h1>Desafio Técnico - Backend em Node + Express</<h2>
<br />

<h2>📋 Descrição</h2>
<p>Projeto desenvolvido para vaga de Desenvolvedor Full Stack, com o intuito de mostrar o conhecimento em NodeJs + Express. 
Temos uma API simples, onde podemos realizar as operações para cadastrar, atualizar e deletar  os filmes, cinemas e sessões, 
onde as sessões estão relacionadas com os filmes e cinemas</p>
<br />

<h2>🔧 Instalação do projeto</h2>
<p>Para rodar o projeto podemos clonar este repositório e instalar as devidas dependências:</p>
<br />

clonar repositorio:
      
      git clone https://github.com/Galvaothiago/backend-cinema.git
      
instalar dependências:
      
      yarn
      
ou
      
      npm install


<br/>
 <h2>✈️ rodando o projeto</h2>
<br/>
      
modo desenvolvimento (a cada alteração o servidor reiniciará para mostrar as mudanças):
      
      yarn dev
      
modo "produção" (as alterações no código não vão refletir no servidor, sendo necessário reiniciar manualmente):
      
      yarn start 
 
      
<br/>
<h2>🔧 Tecnologias utilizadas</h2>
      
- [NodeJS](https://nodejs.org/api/fs.html)
      <br />
- [Express](https://expressjs.com)
      <br />
- [momentJs](https://momentjs.com/)
      <br />
- [mongoose](https://mongoosejs.com/)
      <br />
- [mongoBD](https://www.mongodb.com/)
      <br />
- [nodemon](https://nodemon.io/)
      

<h2>Endpoints</h2>
<br/>
<p>Seguindo os padrões de uma Rest API, onde em cima de um endpoints aplicamos os verbos 'http' para realizar as operações basicas de cadatro, atualização e deleção </p>
      
<br/>
<h3>/movies</h3>
<p> quando realizamos um 'get' no endpoint citado, estamos com a intenção de obter dados. Segue um exemplo da estrutura de dados fornecida pela API quando realizado esta operação:
        
<img width="544" alt="image" src="https://user-images.githubusercontent.com/72774408/166744477-661cf571-f267-46ab-903a-40aa5e9d3ce4.png">

