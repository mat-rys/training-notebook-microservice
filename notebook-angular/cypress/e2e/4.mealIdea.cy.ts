describe('Dodawanie nowego posiłku, sprawdzanie listy produktów, usuwanie posiłku i weryfikacja totalów', () => {
  const baseUrl = 'http://localhost:4200'; // Adres aplikacji Angular

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);

    cy.get('input.username-field').type('testuser'); // Podajemy istniejące dane logowania
    cy.get('input.password-field').type('TestPassword123!');
    cy.get('button.login-button').click();

    cy.url().should('include', '/nutrition');
  });

  it('should allow the user to generate, add, and save a meal with additional options', () => {
    // Krok 1: Przejście do sekcji cooking
    cy.visit('/cooking');

    // Krok 2: Wyszukiwanie "Brokuła" w liście produktów
  cy.get('.product-list input[type="text"]')  // Znajdź pole wyszukiwania
  .type('Brokuł');  // Wpisz tekst do wyszukania

  // Krok 3: Upewnij się, że "Brokuł" jest widoczny na liście
  cy.get('.product-list')  // Sprawdź, czy lista produktów zawiera "Brokuł"
    .contains('Brokuł')  // Upewnij się, że "Brokuł" znajduje się na liście
    .should('exist')  // Sprawdź, czy element jest obecny w DOM
    .scrollIntoView();  // Przewiń do elementu "Brokuł"

  // Krótkie oczekiwanie, aby upewnić się, że elementy się załadowały
  cy.wait(1000);  // Czekaj 1 sekundę (1000 ms)

  // Krok 4: Kliknij na "Brokuł", a nie inne elementy
  cy.get('.product-list')  // Zlokalizuj listę produktów
    .contains('Brokuł')  // Upewnij się, że "Brokuł" jest na liście
    .parent()  // Wejdź do elementu nadrzędnego, w którym znajduje się "Brokuł"
    .find('.checkmark')  // Znajdź ikonę "checkmark" (zaznaczenia)
    .first()  // Kliknij tylko na pierwszy znaleziony element
    .click({ force: true });  // Kliknij na "checkmark", aby dodać do listy

  // Krok 5: Sprawdź, czy "Brokuł" pojawił się na liście wybranych produktów
  cy.get('.selected-products ul')  // Zlokalizuj listę wybranych produktów
    .contains('Brokuł')  // Upewnij się, że na liście wybranych produktów znajduje się "Brokuł"
    .should('exist');  // Sprawdź, czy "Brokuł" pojawił się na liście

    // Krok 3: Wybór "Obiad" z listy typów posiłków
    cy.get('#mealTimes') // Znajdujemy select
      .select('lunch') // Wybieramy opcję "Obiad"
      .should('have.value', 'lunch'); // Sprawdzamy, czy wartość została poprawnie wybrana
  
   // Krok 2: Czekaj na załadowanie checkboxa "Posiłek ma być zdrowy"
 // Krok 2: Czekaj na załadowanie checkboxa "Posiłek ma być zdrowy"
    cy.contains('Posiłek ma być zdrowy')  // Znajdź etykietę
    .parent()  // Wejdź do rodzica (div z checkboxem)
    .find('input[type="checkbox"]')  // Znajdź input typu checkbox
    .should('exist')  // Upewnij się, że checkbox istnieje
    .check()  // Zaznacz checkbox
    .should('be.checked');  // Sprawdź, czy checkbox jest zaznaczony

  
    // Krok 6: Generowanie porady o posiłku
    cy.get('button').contains('Generuj poradę o posiłku').click(); // Klikamy przycisk generowania porady
  
    cy.wait(7000);

    // Krok 7: Sprawdzamy, czy porada o posiłku została wygenerowana
    cy.get('.advice-text').should('not.be.empty'); // Sprawdzamy, czy porada nie jest pusta
  
    // Krok 11: Dodanie posiłku do dzisiejszego dnia o wybranej godzinie
    const now = new Date();
    const currentTime = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`; // Godzina w formacie HH:mm

       // Sprawdzamy, czy przycisk "Dodaj do posiłków" jest widoczny
  cy.get('.meal-advice').should('exist'); // Czekamy na istnienie kontenera porady

  // Poczekaj na załadowanie przycisku, sprawdź czy przycisk istnieje i jest widoczny
  cy.get('.meal-advice button')
    .should('be.visible')  // Czekamy, aż przycisk będzie widoczny
    .click(); // Klikamy przycisk "Dodaj do posiłków"

  // Krok 12: Wybieranie daty (dzisiejsza data)
  cy.get('#mealDate').clear().type(now.toISOString().split('T')[0]); // Wybieramy dzisiejszą datę

  // Wybieramy bieżącą godzinę
  cy.get('#mealTime').clear().type(currentTime); // Ustawiamy bieżącą godzinę

  // Krok 13: Zapisanie posiłku
  cy.get('.save-button').click(); // Klikamy przycisk zapisu

  cy.wait(3000);
    // Krok 13: Przechodzimy do listy posiłków
  cy.visit('/nutrition'); // Zakładając, że posiłki są wyświetlane na tej stronie
  cy.reload();
  cy.wait(1000);

  cy.get('.meal').should('exist');  // Upewniamy się, że jakiś posiłek istnieje na liście

  cy.get('.nutrition-table').within(() => {
    cy.get('#calories')
      .should('not.be.empty') // Sprawdzamy, że tekst nie jest pusty
    cy.get('#fat')
      .should('not.be.empty') // Sprawdzamy, że tekst nie jest pusty  
    cy.get('#protein')
      .should('not.be.empty') // Sprawdzamy, że tekst nie jest pusty
    cy.get('#carbs')
      .should('not.be.empty') // Sprawdzamy, że tekst nie jest pusty
  });
  });
});
