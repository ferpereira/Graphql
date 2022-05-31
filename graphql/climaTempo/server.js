var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
 
var schema = buildSchema(`
 
  type Cidade {
    id: Int
    cidade: String
    temperatura: String
    temperaturaMinima: String
    temperaturaMaxima:  String
    data: String
  }

  type Query {
    getCidade(id: ID!): Cidade
    getCidadePorNome(cidade: String): Cidade
    getCidadesPorNome(cidade: String): [Cidade]
  }
`);
class Cidade {
  constructor(id, cidade, temperatura, temparaturaMa, temparaturaMi, data) {
    this.id = id;
    this.cidade = cidade;
    this.temperatura = temperatura;
    this.temperaturaMinima = temparaturaMa;
    this.temperaturaMaxima = temparaturaMi;
    this.data = data;
  }
}
 
let listCidades = [
  {
    id: 1,
    cidade: 'Curitiba',
    temperatura: "12",
    temperaturaMinima: '0',
    temperaturaMaxima: '29',
    data: '30/05/2022'
  },
  {
    id: 2,
    cidade: 'Curitiba',
    temperatura: "13",
    temperaturaMinima: '5',
    temperaturaMaxima: '21',
    data: '29/05/2022'
  },
  {
    id: 3,
    cidade: 'Curitiba',
    temperatura: "15",
    temperaturaMinima: '3',
    temperaturaMaxima: '19',
    data: '28/05/2022'
  },
  {
    id: 4,
    cidade: 'Florianopolis',
    temperatura: "16",
    temperaturaMinima: '12',
    temperaturaMaxima: '22',
    data: '27/05/2022'
  },
]

var root = {
  getCidade: ({ id }) => {
    let cid = listCidades.find(post => post.id === +id);
    return new Cidade(
      cid.id,
      cid.cidade,
      cid.temperatura,
      cid.temperaturaMinima,
      cid.temperaturaMaxima,
      cid.data,
    );
  },
  getCidadePorNome: ({ cidade }) => {
    let cid = listCidades.find(post => post.cidade === cidade);
    return new Cidade(
      cid.id,
      cid.cidade,
      cid.temperatura,
      cid.temperaturaMinima,
      cid.temperaturaMaxima,
      cid.data,
    );
  },
  getCidadesPorNome: ({ cidade }) => {
    let listaCidades = [];
    for (let index = 0; index < listCidades.length; index++) {
      const cidade = new Cidade(
        listCidades[index].id,
        listCidades[index].cidade,
        listCidades[index].temperatura,
        listCidades[index].temperaturaMaxima,
        listCidades[index].temperaturaMaxima, listCidades[index].data);
      listaCidades.push(cidade);
    }
    return listaCidades.filter(post => post.cidade === cidade);
  },
};

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});