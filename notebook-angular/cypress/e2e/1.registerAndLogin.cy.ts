describe('Rejestracja i logowanie użytkownika', () => {
  const baseUrl = 'http://localhost:4200';
  const testUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    username: 'testuser',
    password: 'TestPassword123!'
  };

  it('Powinna zarejestrować użytkownika', () => {
    cy.visit(`${baseUrl}/registration`);
    cy.log('Otwieram stronę rejestracji');

    // Wypełnienie formularza rejestracji
    cy.get('input.firstname').type(testUser.firstName);
    cy.get('input.lastname').type(testUser.lastName);
    cy.get('input.email').type(testUser.email);
    cy.get('input.username').type(testUser.username);
    cy.get('input.password').type(testUser.password);
    cy.log('Formularz rejestracji został wypełniony');

    // Kliknięcie przycisku "Zarejestruj"
    cy.get('button.login-button').click();
    cy.log('Kliknięto przycisk rejestracji');

    // Weryfikacja przekierowania do strony logowania
    cy.url().should('include', '/login');
    cy.log('Użytkownik został poprawnie przekierowany na stronę logowania');
  });

  it('Powinno zalogować użytkownika', () => {
    cy.visit(`${baseUrl}/login`);
    cy.log('Otwieram stronę logowania');

    // Wypełnienie formularza logowania
    cy.get('input.username-field').type(testUser.username);
    cy.get('input.password-field').type(testUser.password);
    cy.log('Formularz logowania został wypełniony');

    // Kliknięcie przycisku "Zaloguj"
    cy.get('button.login-button').click();
    cy.log('Kliknięto przycisk logowania');

    // Weryfikacja przekierowania do panelu użytkownika
    cy.url().should('include', '/nutrition');
    cy.log('Użytkownik został poprawnie przekierowany do panelu użytkownika');
  });
});
