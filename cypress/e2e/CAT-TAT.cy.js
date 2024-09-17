/// <reference types="cypress" />



describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {

    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    const LongText = Cypress._.repeat('Texto_Longo__', 200)

    cy.get('#firstName').type('Samuel')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('samuel@gmail.com')
    cy.get('#phone').type('123456789')
    cy.get('#open-text-area').type(LongText, {delay: 0}) //adiciona um delay no comando type, caso eu use zero, ele não perde tempo digitando.
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')

  }) 
  
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    //Ações
    cy.get('#firstName').type('Samuel')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('samuel@@gmail.com')
    cy.get('#phone').type('teste')
    cy.get('#open-text-area').type('Texto de teste')
    cy.get('button[type="submit"]').click()

    //Validações
    cy.get('#phone').should('have.value', '')
    cy.get('.error').should('be.visible')
  });

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    //Ações
    cy.get('#firstName').type('Samuel')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('samuel@@gmail.com')
    cy.get('#open-text-area').type('Texto de teste')  
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()

    //Validações
    cy.get('.error').should('be.visible')
  });

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Samuel')
      .should('have.value', 'Samuel')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Oliveira')
      .should('have.value', 'Oliveira')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('samuel@gmail.com')
      .should('have.value', 'samuel@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')

    cy.get('#open-text-area')
      .type('texto teste')
      .should('have.value', 'texto teste')
      .clear()
      .should('have.value', '')


    cy.get('button[type="submit"]').click()
  });

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()


    cy.get('.error').should('be.visible')
  });

  it('Envia o formuário com sucesso usando um comando customizado', () => {
    const dadosTeste = {
      firstName: 'Samuel',
      lastName: 'Oliveira',
      email: 'samuel@teste.com',
      telefone: '123456',
      text: 'teste teste'
    }

    cy.fillMandatoryFieldsAndSubmit() //comando customizado com dados hard code

    cy.get('.success').should('be.visible')

    cy.CustomCommandsWithObject(dadosTeste) //comando customizado com objeto passando os dados

    cy.get('.success').should('be.visible')
  });
  
  it('Usando o cy.contains no lugar do cy.get', () => { 
    cy.get('#firstName').type('Samuel')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('samuel@gmail.com')
    cy.get('#phone').type('123456789')
    cy.get('#open-text-area').type('teste do cy.contains') //adiciona um delay no comando type, caso eu use zero, ele não perde tempo digitando.
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

  })

  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  });

  it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  });

  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  });

  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  });

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"][value="ajuda"]')
      .check()
      .should('be.checked')
  
    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')

    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  });

  it('Marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
  });

  it('Seleciona um arquivo da pasta fixtures', () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')
        .should((input) => { //O Should está recebendo uma função de callback que foi chamada de 'input' pois é exatamente o campo do cy.get que pegou o seletor para suybir o arquivo
          expect(input[0].files[0].name).to.equal('example.json')
        })//O Should usou uma função de callback para pegar o retorno da aplicação e validar se o nome do arquivo está lá
  });

  it('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
    })
  });

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("example.json").as('arquivo')
    cy.get('#file-upload')
      .selectFile('@arquivo')
      .should((input) => { //O Should está recebendo uma função de callback que foi chamada de 'input' pois é exatamente o campo do cy.get que pegou o seletor para subir o arquivo
        expect(input[0].files[0].name).to.equal('example.json')
    })
  });

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade')
        .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank')
  });

  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target') // remove o atributo target, primeiro invocou ele e depois removeu
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  });
})