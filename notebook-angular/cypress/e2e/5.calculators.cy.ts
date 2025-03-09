describe('Dodawanie nowego posiłku, sprawdzanie listy produktów, usuwanie posiłku i weryfikacja totalów', () => {
  const baseUrl = 'http://localhost:4200'; // Adres aplikacji Angular

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);

    cy.get('input.username-field').type('testuser'); // Podajemy istniejące dane logowania
    cy.get('input.password-field').type('TestPassword123!');
    cy.get('button.login-button').click();

    cy.url().should('include', '/nutrition');
  });

  it('Oblicza BMI, BMR i procent tłuszczu w organizmie', () => {
    cy.visit('/bmi-chart');
    
    // Testowanie kalkulatora BMI
    cy.get('.bmi input[name="weight"]').scrollIntoView({ offset: { top: -50, left: 0 } }).type('70', { force: true }); // Waga
    cy.get('.bmi input[name="height"]').scrollIntoView({ offset: { top: -50, left: 0 } }).type('175', { force: true }); // Wzrost
    cy.get('.bmi .calculate-button').click({ force: true }); // Kliknij oblicz BMI
    
    // Sprawdź, czy wynik BMI jest poprawnie obliczony
    cy.get('#bmiResult')
      .invoke('text') // Pobierz tekst
      .then((resultText) => {
        const bmi = parseFloat(resultText.trim()); // Konwertujemy na liczbę i usuwamy ewentualne spacje
        expect(bmi).to.be.a('number'); // Sprawdzamy, czy wynik jest liczbą
        expect(bmi).to.be.greaterThan(0); // Sprawdzamy, czy BMI jest większe niż 0
        expect(bmi).to.be.lessThan(100); // Sprawdzamy, czy BMI jest mniejsze niż 100 (możesz dostosować ten zakres)
      });
  
    // Testowanie kalkulatora BMR
    cy.get('.bmr input[name="weightBMR"]').scrollIntoView({ offset: { top: -50, left: 0 } }).type('70', { force: true }); // Waga
    cy.get('.bmr input[name="heightBMR"]').scrollIntoView({ offset: { top: -50, left: 0 } }).type('175', { force: true }); // Wzrost
    cy.get('.bmr input[name="age"]').scrollIntoView({ offset: { top: -50, left: 0 } }).type('25', { force: true }); // Wiek
    cy.get('.bmr input[name="gender"]').check('male', { force: true }); // Płeć
    cy.get('.bmr .calculate-button').click({ force: true }); // Kliknij oblicz BMR
    
    // Sprawdź, czy wynik BMR jest poprawny
    cy.get('#bmrResult')
      .should('not.be.empty') // Sprawdzamy, czy wynik nie jest pusty
      .invoke('text') // Pobierz tekst z wyniku
      .then((resultText) => {
        const bmr = parseFloat(resultText.trim()); // Konwertujemy wynik na liczbę
        expect(bmr).to.be.a('number'); // Sprawdzamy, czy wynik jest liczbą
        expect(bmr).to.be.greaterThan(0); // Sprawdzamy, czy BMR jest większe niż 0
        expect(bmr).to.be.lessThan(5000); // Sprawdzamy, czy BMR jest mniejsze niż 5000 (możesz dostosować ten zakres)
      });
  
    // Testowanie kalkulatora procentu tłuszczu
    cy.get('.body-fat input[name="waist"]').scrollIntoView({ offset: { top: -50, left: 0 } }).type('80', { force: true }); // Talia
    cy.get('.body-fat input[name="hips"]').scrollIntoView({ offset: { top: -50, left: 0 } }).type('90', { force: true }); // Biodra
    cy.get('.body-fat input[name="neck"]').scrollIntoView({ offset: { top: -50, left: 0 } }).type('40', { force: true }); // Szyja
    cy.get('.body-fat input[name="heightBodyFat"]').scrollIntoView({ offset: { top: -50, left: 0 } }).type('175', { force: true }); // Wzrost
    cy.get('.body-fat input[name="genderBodyFat"]').check('male', { force: true }); // Płeć
    cy.get('.body-fat .calculate-button').click({ force: true }); // Kliknij oblicz procent tłuszczu
  
    // Poczekaj na wynik procentu tłuszczu, jeśli to konieczne
    cy.get('#bodyFatResult')
      .should('not.be.empty') // Sprawdzamy, czy wynik nie jest pusty
      .invoke('text') // Pobierz tekst z wyniku
      .then((resultText) => {
        const bodyFat = parseFloat(resultText.trim()); // Konwertujemy wynik na liczbę
        expect(bodyFat).to.be.a('number'); // Sprawdzamy, czy wynik jest liczbą
        expect(bodyFat).to.be.greaterThan(0); // Sprawdzamy, czy wynik procentu tłuszczu jest większy niż 0
        expect(bodyFat).to.be.lessThan(100); // Sprawdzamy, czy wynik jest mniejszy niż 100
      });
  });
  
  
});
