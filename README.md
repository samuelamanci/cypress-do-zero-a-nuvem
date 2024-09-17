# Cypress, do Zero a Núvem
Projeto simples com Cypress do zero a núvem, feito con base no curso da escola Talking Abouit Testing.

## Pré-requisitos

É necessário que você tenha o git, Node.js e npm instalados para clonar e rodar esse projeto.

Estou usando as versões `2.46.0`, `20.16.0` e `10.8.1` para o git, Node.js e npm respectivamente, sugiro que você use as mesmas versões ou as últimas versões LTS de cada um.

## Instalação

No seu terminal execute `npm install` para instalar as dev dependencies.

## Testes

Neste projeto você pode rodar os testes em um Desktop ou Mobile viewport.

## Desktop

No seu terminal execute `npx cypress open` para executar os testes no modo GUI (Usando a interface gráfica).

ou execute `npx cypress run` para executar os testes no modo headless (Sem a interface gráfica).

## Mobile

No seu terminal execute `npm run cy:test:mobile` para executar o teste no modo headlesse em uma viewport de mobile.

ou execute `npm run cy:open:mobile` para executar os testes no modelo de viewport mobile e interface gráfica ativa.