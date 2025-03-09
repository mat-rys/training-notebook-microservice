describe('Dodawanie nowego posiłku, sprawdzanie listy produktów, usuwanie posiłku i weryfikacja totalów', () => {
  const baseUrl = 'http://localhost:4200'; // Adres aplikacji Angular
  const newMeal = {
    title: 'meal1',
    day: new Date().toISOString().split('T')[0], // Dzisiejsza data w formacie YYYY-MM-DD
    mealTime: '12:00' // Przykładowa godzina posiłku
  };

  const brokul = {
    title: 'Brokuł',
    calories: 50,
    grams: 100,
    carbs: 6,
    protein: 2.5,
    fat: 0.3
  };

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);

    cy.get('input.username-field').type('testuser'); // Podajemy istniejące dane logowania
    cy.get('input.password-field').type('TestPassword123!');
    cy.get('button.login-button').click();

    cy.url().should('include', '/nutrition');
  });

  it('Powinno dodać nowy posiłek, sprawdzić listę produktów, usunąć posiłek i zweryfikować total', () => {
    // Kliknięcie przycisku "Dodaj nowy posiłek"
    cy.get('.add-meal-button button').click();

    // Wypełnienie formularza
    cy.get('input#title').type(newMeal.title); // Wpisz nazwę posiłku
    cy.get('input#day').type(newMeal.day); // Wpisz dzisiejszą datę
    cy.get('input#mealTime').type(newMeal.mealTime); // Wpisz godzinę posiłku

    // Kliknięcie przycisku "Utwórz posiłek"
    cy.get('button.submit-button').click();

    // Weryfikacja, czy posiłek został utworzony
    cy.contains(newMeal.title)
      .should('exist') // Upewnij się, że nazwa posiłku istnieje
      .parents('.meal') // Znajdź rodzica o klasie .meal
      .within(() => {
        // Przejdź do kontekstu tego posiłku
        cy.get('.add-button') // Znajdź przycisk "Dodaj produkty"
          .should('exist') // Upewnij się, że istnieje
          .click(); // Kliknij
      });

    // Sprawdź, czy zostałeś przekierowany do sekcji dodawania produktów
    cy.url().should('include', '/nutrition/meal-add-products');

    // Dodanie produktu "Brokuł"
    cy.get('.search-bar input') // Znajdź pole wyszukiwania
      .type('Brokuł'); // Wpisz "Brokuł" w wyszukiwarkę

    cy.contains('.product-item', 'Brokuł') // Znajdź element z nazwą "Brokuł"
      .within(() => {
        cy.window().then(win => {
          cy.stub(win, 'prompt').returns('100'); // Stubuj prompt i wpisz "100"
          cy.get('.add-button').click(); // Kliknij przycisk "Dodaj"
        });
      });

    // Weryfikacja, że "Brokuł" pojawił się w sekcji dodanych produktów
    cy.get('.added-products ul')
      .contains('Brokuł (100 g)')
      .should('exist');

    // Weryfikacja wartości makroskładników w tabeli
    cy.get('.totals').within(() => {
      cy.get('tr:nth-child(2) td:nth-child(1)').should('have.text', `${brokul.calories} kcal`); // Kalorie
      cy.get('tr:nth-child(2) td:nth-child(2)').should('have.text', `${brokul.fat} g`); // Tłuszcz
      cy.get('tr:nth-child(2) td:nth-child(3)').should('have.text', `${brokul.protein} g`); // Białko
      cy.get('tr:nth-child(2) td:nth-child(4)').should('have.text', `${brokul.carbs} g`); // Węglowodany
    });

    // Powrót do sekcji Nutrition i weryfikacja podsumowania wartości
    cy.visit(`${baseUrl}/nutrition`);

    cy.get('.nutrition-table').within(() => {
      cy.get('#calories').should('have.text', '50 kcal'); // Kalorie
      cy.get('#fat').should('have.text', '0.3g'); // Tłuszcz
      cy.get('#protein').should('have.text', '2.5g'); // Białko
      cy.get('#carbs').should('have.text', '6g'); // Węglowodany
    });

    // Usunięcie posiłku
    cy.contains(newMeal.title)
      .should('exist') // Upewnij się, że posiłek istnieje
      .parents('.meal') // Znajdź rodzica o klasie .meal
      .within(() => {
        cy.get('.delete-button').click(); // Kliknij przycisk "Usuń"
      });

    // Sprawdź, czy posiłek został usunięty
    cy.contains(newMeal.title).should('not.exist');

  });
});
