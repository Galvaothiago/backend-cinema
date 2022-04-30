'use strict';

const db = require('./db');
const Movie = require('./models/Movie');
const api = require('./api');
const http = require('http');
const Cinema = require('./models/Cinema');
const Session = require('./models/Session');

const port = 8080
const timeout = 60 * 60 * 1000 // 1 hour

db.connect()
    .then(() => {
      Movie.create([
        { nome: 'Aladdin', genero: 'Fantasia, Romance', duracao: 130, classificacao: 10, lancamento: new Date(2019, 5, 23), sinopse: 'Um jovem humilde descobre uma lâmpada mágica' },
        { nome: 'Brightburn - Filho das Trevas', genero: 'Drama, Ficção Científica', duracao: 91, classificacao: 16 , lancamento: new Date(2019, 5, 23), sinopse: 'Quando uma criança alienígena cai no terreno de um casal da parte rural dos Estados Unidos' },
        { nome: 'Godzilla II: Rei dos Monstros', genero: 'Fantasia, Ficção Científica', duracao: 132, classificacao: 12, lancamento: new Date(2019, 5, 30), sinopse: 'Na sequência do sucesso mundial de "Godzilla" e "Kong: A Ilha da Caveira"' },
        { nome: 'Hellboy', genero: 'Supernatural, Fantasia', duracao: 148, classificacao: 16, lancamento: new Date(2019, 5, 16), sinopse: 'Uma antiga feiticeira volta à vida decidida a vingar-se de uma traição do passado. Dividido entre o mundo sobrenatural e humano' },
        { nome: 'Kardec: A História por Trás do Nome', genero: 'Drama, Religião', duracao: 110, classificacao: 12, lancamento: new Date(2019, 5, 16), sinopse: 'A história do educador francês Hypolite Leon Denizard Rivail' },
        { nome: 'Rocketman', genero: 'Drama / Biografia', duracao: 121, classificacao: 16, lancamento: new Date(2019, 5, 30), sinopse: 'Extremamente talentoso mas muito tímido' },
        { nome: 'Vingadores: Ultimato', genero: 'Fantasia / Filme', duracao: 182, classificacao: 12, lancamento: new Date(2019, 4, 25), sinopse: 'Após Thanos eliminar metade das criaturas vivas' }]);
        
      Cinema.create([
        { name: 'CineMax', city: 'Campinas', state: 'São Paulo',},
        {name: 'CineMax1', city: 'Campinas', state: 'São Paulo'},
        {name: 'CineMax2', city: 'Campinas', state: 'São Paulo'},
        {name: 'CineMax3', city: 'Campinas', state: 'São Paulo'}
      ]);
      Session.create([
        { dayWeek: 'Domingo', schedule: '18:00', movie: '626c9fee58c2e0213bba43ff', cinema: '626cc34e4283a564330b3def'},
        { dayWeek: 'Segunda-feira', schedule: '18:00', movie: '626c9fee58c2e0213bba4400', cinema: '626cc34e4283a564330b3df0'},
        { dayWeek: 'Terça-feira', schedule: '19:00', movie: '626c9fee58c2e0213bba4401', cinema: '626c9fee58c2e0213bba4408'},
        { dayWeek: 'Quarta-feira', schedule: '18:00', movie: '626c9fee58c2e0213bba4402', cinema: '626c9fee58c2e0213bba4409'},
        { dayWeek: 'Quinta-feira', schedule: '20:00', movie: '626c9fee58c2e0213bba4403', cinema: '626c9fee58c2e0213bba4406'},
        { dayWeek: 'Sexta-feira', schedule: '22:00', movie: '626c9fee58c2e0213bba4404', cinema: '626c9fee58c2e0213bba4407'},
        { dayWeek: 'Sabado', schedule: '19:00', movie: '626c9fee58c2e0213bba4405', cinema: '626c9fee58c2e0213bba4408'}
      ])
      });

const server = http.createServer(api);
server.setTimeout(timeout);
server.listen(port);
