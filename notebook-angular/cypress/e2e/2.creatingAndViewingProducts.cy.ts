describe('Dodawanie, wyświetlanie i edytowanie produktu', () => {
  const baseUrl = 'http://localhost:4200'; // Adres aplikacji Angular
  const newProduct = {
    title: 'Brokuł',
    calories: 34,
    grams: 100,
    carbs: 7,
    protein: 3,
    fat: 0.4
  };
  const updatedProduct = {
    calories: 50, // Zwiększone kalorie
    grams: 100,   // Zwiększone gramy
    carbs: 6,     // Zmniejszone węglowodany
    protein: 2.5, // Zmniejszone białko
    fat: 0.3      // Zmniejszony tłuszcz
  };

  beforeEach(() => {
    // Zakładamy, że użytkownik jest już zalogowany przed rozpoczęciem testów
    cy.visit(`${baseUrl}/login`);

    cy.get('input.username-field').type('testuser');   // Podajemy istniejące dane logowania
    cy.get('input.password-field').type('TestPassword123!');
    cy.get('button.login-button').click();

    // Weryfikujemy, czy użytkownik jest na stronie "Nutrition"
    cy.url().should('include', '/nutrition');
  });

  it('Powinno dodać i edytować produkt', () => {
    // Dodanie nowego produktu
    cy.visit(`${baseUrl}/nutrition/product-add`);
    cy.get('input#title').type(newProduct.title);
    cy.get('input#calories').type(newProduct.calories.toString());
    cy.get('input#grams').type(newProduct.grams.toString());
    cy.get('input#carbs').type(newProduct.carbs.toString());
    cy.get('input#protein').type(newProduct.protein.toString());
    cy.get('input#fat').type(newProduct.fat.toString());
    cy.get('button.submit-button').click();

    // Weryfikacja komunikatu sukcesu
    cy.get('.product-created-message').should('contain', 'Produkt został pomyślnie utworzony');

    // Przejście do listy produktów
    cy.get('.products-list-button a button').click();
    cy.url().should('include', '/nutrition/products-list');

    // Znalezienie produktu na liście i kliknięcie "Edytuj"
    cy.contains(newProduct.title).parent().within(() => {
      cy.get('.edit-button').click();
    });

    // Edytowanie produktu
    cy.get('.edit-form').should('be.visible');

    // Wprowadzenie nowych wartości
    cy.get('input[placeholder="Kalorie"]').clear().type(updatedProduct.calories.toString());
    cy.get('input[placeholder="Gramy"]').clear().type(updatedProduct.grams.toString());
    cy.get('input[placeholder="Węglowodany"]').clear().type(updatedProduct.carbs.toString());
    cy.get('input[placeholder="Białko"]').clear().type(updatedProduct.protein.toString());
    cy.get('input[placeholder="Tłuszcz"]').clear().type(updatedProduct.fat.toString());

    cy.intercept('PUT', '**/nutrition/products/**').as('updateProduct');
    cy.intercept('GET', '**/nutrition/products').as('getProducts');

    // Kliknięcie przycisku "Aktualizuj"
    cy.contains('button', 'Aktualizuj').click();

    // Oczekiwanie na odpowiedź backendu
 
    cy.wait('@updateProduct');
    cy.wait('@getProducts');

    // Weryfikacja zaktualizowanych wartości na liście produktów
    cy.get('.product-details').should('contain', updatedProduct.calories.toString());
    cy.get('.product-details').should('contain', updatedProduct.grams.toString());
    cy.get('.product-details').should('contain', updatedProduct.carbs.toString());
    cy.get('.product-details').should('contain', updatedProduct.protein.toString());
    cy.get('.product-details').should('contain', updatedProduct.fat.toString());
  });
});
