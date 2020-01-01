# Slogger

Slogger é um gerente de log inteligente, possibilita salvar os logs em um arquivo slogger.json na raiz do projeto. Integração com express e interface web protegida com credencial para visualização dos logs.

## Guia de conteúdo
- [Configuração](#configuração)
- [Uso](#uso)
- [Express](#express)
  - [Configuração](#configuração-1)
  - [Conexão com interface web](#conexão-com-a-interface-web)
- [Request](#request)
- [Contribuições](#contribuiçoes)
- [Licensa](#licensa)

## Configuração

Primeiro instale o pacote do Slogger
- Via NPM(Gerenciador de Pacotes do Node):
```
npm install slogger
```
- Via yarn:
```
yarn add slogger
```

Depois importe o Slogger em seu projeto:
```js
const slogger = require("slogger")({
    __filename
})
```
O código acima é o suficiente para o Slogger funcionar. O parâmetro `__filename` é uma variável própria do Node, que diz em qual arquivo está sendo rodado aquele código.

## Uso

Após a configuração ser um sucesso. O slogger retornará algumas funções.
- [slogger.log()](#sloggerlog)
- [slogger.request()](#request)
- [slogger.appStart()](#sloggerappstart)
### slogger.log()
Parecida com a função `console.log()` ela recebe inúmeros parâmetros. E salvará no array de logs do slogger.json assim:
```js
{
    date:"2019-12-11 10:12:12",
    type:"log",
    filename:"index.js",
    log:["Olá","Mundo"] //array de argumentos
}
```
E exibirá no console:

<span style="background-color:blue;color:Black;">LOG</span> Olá Mundo
### slogger.appStart()
Útil para saber quando seu app foi iniciado.
No slogger.json:
```js
{
    filename:"index.js",
    type:"appStart",
    date:"2019-12-11 10:12:12"
}
```
E não exibirá nada no console.

## Express

O Slogger usa middleware do express para interceptar as requisições e salvar o método http, código de status e a URL.
Por padrão as informações só serão salvas no final da requisição.
> Não obrigatório o uso do Express.
### Configuração
```js
const express = require("express")
const app = express()
const slogger = require("slogger")({
    __filename,
    express:app
})
```
Serão exibidos mensagens no console:

<span style='background-color:#ffe846; color:black;'>Express</span> Start GET /oi 

<span style='background-color:#ffe846; color:black;'>Express</span> End GET /oi 200

Start significa que a requisição foi recebida.
End significa que a requisição foi terminada.
> No futuro com a implementação do trace será mais fácil monitorar os logs que aconteceram em uma requisição.
### Conexão com a interface web

O Slogger disponibiliza uma interface web para visualizar os logs de forma simples e segura.
Para configurar essa interface é necessária a configuração de uma variável da ambiente, então você pode criar o arquivo `.env` na raiz:
```
SLOGGER_KEY=exemplo
```
Ao criar esse arquivo o Slogger usa o [dotenv](https://www.npmjs.com/package/dotenv) para ler. Então é só acessar a url: http://mydomin.com/slogger?credential=exemplo

## Request

O `slogger.request(req)` recebe como paramentro o req do request:
```js
request("google.com",{
	time:true //Passando o time:true ele salvará o elapsedTime
},(err,req,body)=>{
	slogger.request(req)
})
```
E exibirá no console:

<span style='background-color:#ff2eff; color:black;'>Request</span> GET 200 google.com

## Contribuições

Leia [CONTRIBUTING.md](CONTRIBUTING.md) para obter detalhes sobre nosso código de conduta e o processo para enviar solicitações pull para nós.

## Licensa

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes
