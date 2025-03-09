describe('Dodawanie nowej notatki w dzisiejszym dniu', () => {
  const baseUrl = 'http://localhost:4200'; // Adres aplikacji Angular

  beforeEach(() => {
    // Logowanie do aplikacji
    cy.visit(`${baseUrl}/login`);

    cy.get('input.username-field').type('testuser'); // Podajemy dane logowania
    cy.get('input.password-field').type('TestPassword123!');
    cy.get('button.login-button').click();

    // Sprawdzamy, czy poprawnie przekierowano na stronę główną
    cy.url().should('include', '/nutrition');
  });

  it('Dodanie nowej notatki w dzisiejszym dniu między 20:00 a 21:00', () => {
    // Przejście na stronę dodawania notatek
    cy.visit(`${baseUrl}/notes/notes-add`);
  
    // Wpisywanie danych do formularza
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setHours(21, 0, 0, 0); // Ustawienie godziny na 20:00
  
    const endDate = new Date(startDate);
    endDate.setHours(22, 0, 0, 0); // Ustawienie godziny na 21:00
  
    const noteTitle = 'Moja nowa notatka';
    const activityType = '🏃‍♂️ Bieganie';
    const noteDescription = 'Długa i satysfakcjonująca aktywność fizyczna.';
  
    // Wpisanie tytułu
    cy.get('input.title').type(noteTitle, { force: true });
  
    // Wybór typu aktywności
    cy.get('select.activity').select(activityType, { force: true });
  
    // Wpisanie opisu
    cy.get('textarea.description').type(noteDescription, { force: true });
  
    // Wpisanie daty i godziny rozpoczęcia
    cy.get('input.datetime-start').type(startDate.toISOString().slice(0, 16), { force: true });
  
    // Wpisanie daty i godziny zakończenia
    cy.get('input.datetime-end').type(endDate.toISOString().slice(0, 16), { force: true });
  
    // Kliknięcie przycisku zatwierdzenia
    cy.get('button.submit-button').click();

    cy.wait(3000);

    // Sprawdzenie, czy dodana notatka jest widoczna na liście
    cy.url().should('include', '/notes'); // Upewnienie się, że nastąpiło przekierowanie
    cy.get('.note-card').should('contain', noteTitle);
    cy.get('.note-card').should('contain', activityType);
    cy.get('.note-card').should('contain', '20:00');
    cy.get('.note-card').should('contain', '21:00');
    cy.get('.note-card').should('contain', noteDescription);
  });
});
