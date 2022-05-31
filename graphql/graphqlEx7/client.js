var autor = 'andy' ; 
var content = 'esperança é uma coisa boa' ; 
var query = `mutation CreateMessage($input: MessageInput) { 
  createMessage(input: $input) {
    Eu iria
  }
}` ;

buscar ( '/graphql' , { 
  método : 'POST' , 
  cabeçalhos : { 
    'Content-Type' : 'application/json' , 
    'Aceitar' : 'aplicativo/json' , 
  } ,
  corpo : JSON . stringificar ( {
    consulta ,
    variáveis : { 
      entrada : { 
        autor ,
        conteúdo ,
      }
    }
  } )
} )
  . então ( r => r . json ( ) )
  . then ( data => console . log ( 'data return:' , data ) ) ;