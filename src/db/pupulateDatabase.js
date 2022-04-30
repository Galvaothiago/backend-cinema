const mongoose = require('mongoose');

const Cinema = require('../models/Cinema');
const Session = require('../models/Session');
const Movie = require('../models/Movie');

const sessions = [
    { dayWeek: 'Domingo', schedule: '18:00'},
    { dayWeek: 'Domingo', schedule: '19:00'},
    { dayWeek: 'Domingo', schedule: '20:00'},
    { dayWeek: 'Segunda-feira', schedule: '18:00'},
    { dayWeek: 'Segunda-feira', schedule: '19:00'},
    { dayWeek: 'Segunda-feira', schedule: '20:00'},
    { dayWeek: 'Terça-feira', schedule: '17:00'},
    { dayWeek: 'Terça-feira', schedule: '20:00'},
    { dayWeek: 'Terça-feira', schedule: '22:00'},
    { dayWeek: 'Quarta-feira', schedule: '18:30'},
    { dayWeek: 'Quarta-feira', schedule: '20:00'},
    { dayWeek: 'Quarta-feira', schedule: '22:00'},
    { dayWeek: 'Quinta-feira', schedule: '16:00'},
    { dayWeek: 'Quinta-feira', schedule: '18:00'},
    { dayWeek: 'Quinta-feira', schedule: '19:00'},
    { dayWeek: 'Sexta-feira', schedule: '21:00'},
    { dayWeek: 'Sexta-feira', schedule: '22:00'},
    { dayWeek: 'Sexta-feira', schedule: '00:00'},
    { dayWeek: 'Sabado', schedule: '18:00'},
    { dayWeek: 'Sabado', schedule: '20:00'},
    { dayWeek: 'Sabado', schedule: '00:00'},
]

const movie1 = new Movie({
    id: new mongoose.Types.ObjectId(),
    nome: 'Aladdin', 
    genero: 'Fantasia, Romance', 
    duracao: 130, 
    classificacao: 10, 
    lancamento: new Date(2019, 5, 23), 
    sinopse: 'Um jovem humilde descobre uma lâmpada mágica',
})

const movie2 = new Movie({
    id: new mongoose.Types.ObjectId(),
    nome: 'Brightburn - Filho das Trevas', 
    genero: 'Drama, Ficção Científica', 
    duracao: 91, classificacao: 16 , 
    lancamento: new Date(2019, 5, 23), 
    sinopse: 'Quando uma criança alienígena cai no terreno de um casal da parte rural dos Estados Unidos'
})

const movie3 = new Movie({
    id: new mongoose.Types.ObjectId(),
    nome: 'Brightburn - Filho das Trevas', 
    genero: 'Drama, Ficção Científica', 
    duracao: 91, classificacao: 16 , 
    lancamento: new Date(2019, 5, 23), 
    sinopse: 'Quando uma criança alienígena cai no terreno de um casal da parte rural dos Estados Unidos'
})

const movie4 = new Movie({
    id: new mongoose.Types.ObjectId(),
    nome: 'Hellboy', 
    genero: 'Supernatural, Fantasia', 
    duracao: 148, 
    classificacao: 16, 
    lancamento: new Date(2019, 5, 16), 
    sinopse: 'Uma antiga feiticeira volta à vida decidida a vingar-se de uma traição do passado. Dividido entre o mundo sobrenatural e humano'
})

const movie5 = new Movie({
    id: new mongoose.Types.ObjectId(),
    nome: 'Kardec: A História por Trás do Nome', 
    genero: 'Drama, Religião', 
    duracao: 110, 
    classificacao: 12, 
    lancamento: new Date(2019, 5, 16), 
    sinopse: 'A história do educador francês Hypolite Leon Denizard Rivail' 
})

const movie6 = new Movie({
    id: new mongoose.Types.ObjectId(),
    nome: 'Rocketman', 
    genero: 'Drama / Biografia', 
    duracao: 121, 
    classificacao: 16, 
    lancamento: new Date(2019, 5, 30), sinopse: 'Extremamente talentoso mas muito tímido'
})

const movie7 = new Movie({
    id: new mongoose.Types.ObjectId(),
    nome: 'Vingadores: Ultimato', 
    genero: 'Fantasia / Filme', 
    duracao: 182, 
    classificacao: 12, 
    lancamento: new Date(2019, 4, 25), 
    sinopse: 'Após Thanos eliminar metade das criaturas vivas' 
})

const cinema1 = new Cinema({
    name: 'Cinepolis', 
    city: 'Campinas', 
    state: 'São Paulo'
})

const cinema2 = new Cinema({
    name: 'Cinemark', 
    city: 'Campinas', 
    state: 'São Paulo'
})

const cinema3 = new Cinema({
    name: 'Playarte Cinema', 
    city: 'Diadema', 
    state: 'São Paulo'
})

const cinema4 = new Cinema({
    name: 'Grupo Cine Valinhos', 
    city: 'Valinhos', 
    state: 'São Paulo'
})

const cinema5 = new Cinema({
    name: 'Cinesala', 
    city: 'São Paulo', 
    state: 'São Paulo'
})

const allCinema = [
    cinema1,
    cinema2,
    cinema3,
    cinema4,
    cinema5
]

const allMovies = [
    movie1,
    movie2,
    movie3,
    movie4,
    movie5,
    movie6,
    movie7,
]

// function receive a model array and return a random model to create a association
const pickRandomModelToCreateRelationship = (arr) => {
    return arr[Math.round( Math.random() * (arr.length - 1))]
}

const saveModelOnDatabase = async (model) => {
    model.forEach((model) => {
        model.save((err) => {
            if(err) console.log("error when trying save on database")

            console.log("saved models")
        })
    })
}

const createRelationship = async (sessions, movies, cinemas) => {
    
    await saveModelOnDatabase(movies)
    await saveModelOnDatabase(cinemas)

    
    sessions.forEach((session) => {
        const randomMovie = pickRandomModelToCreateRelationship(movies)
        const randomCinema = pickRandomModelToCreateRelationship(cinemas)

        new Session({
            id: new mongoose.Types.ObjectId(),
            dayWeek: session.dayWeek,
            schedule: session.schedule,
            movie: randomMovie.id,
            cinema: randomCinema.id
        }).save((err) => {
            if(err) console.log(err)

            console.log('created sessions with your associations successfully!')
        })
    })
}

module.exports = async () => {
    createRelationship(sessions, allMovies, allCinema)
};