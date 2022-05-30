describe('Cadastro de usuários', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('verifica mensagens validação', () => {
    cy.contains('a', 'Register now').click();

    cy.contains('button', 'Register').click();
    cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
    
    cy.contains('button', 'Register').click();
    cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
    cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
    cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
  });

  it('verifica mensagem de e-mail inválido', () => {
    cy.contains('a', 'Register now').click();

    cy.get('input[formcontrolname="email"]').type('jorge');
    cy.contains('button', 'Register').click();
    cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
  });

  it('verifica mensagem de senha com menos de 8 caracteres', () => {
    cy.contains('a', 'Register now').click();

    cy.get('input[formcontrolname="password"]').type('123');
    cy.contains('button', 'Register').click();
    cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
  });

  const usuarios = require('../../fixtures/usuarios.json');

  usuarios.forEach(({email, fullName, userName, password }) => {
    it(`registra novo usuário ${userName}`, () => {
      cy.contains('a', 'Register now').click();
      cy.contains('button', 'Register').click();
      cy.get('input[formcontrolname="email"]').type(email);
      cy.get('input[formcontrolname="fullName"]').type(fullName);
      cy.get('input[formcontrolname="userName"]').type(userName);
      cy.get('input[formcontrolname="password"]').type(password);
      cy.contains('button', 'Register').click();
    });
  });
});