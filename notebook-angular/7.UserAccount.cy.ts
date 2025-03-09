// describe('Zmiana wartości w Profile Body z widocznymi przyciskami po najechaniu', () => {
//   const baseUrl = 'http://localhost:4200'; // Adres aplikacji Angular

//   beforeEach(() => {
//     // Logowanie do aplikacji
//     cy.visit(`${baseUrl}/login`);

//     cy.get('input.username-field').type('testuser'); // Podajemy dane logowania
//     cy.get('input.password-field').type('TestPassword123!');
//     cy.get('button.login-button').click();

//     // Sprawdzamy, czy poprawnie przekierowano na stronę główną
//     cy.url().should('include', '/nutrition');
//   });

//   it('Zmiana wartości w sekcji Informacje Personalne', () => {
//     // Przejdź do sekcji profilu użytkownika
//     cy.visit(`${baseUrl}/account`);

//     // Aktualizacja wagi
//     cy.get('.profile-row').contains('Waga:').parent().find('.change-button')
//       .invoke('show') // Wymuszenie wyświetlenia przycisku (zmiana stylu na display: block)
//       .click({ force: true }); // Kliknięcie, nawet jeśli przycisk jest niewidoczny
//     cy.get('input[placeholder="Nowa waga"]').clear().type('70');
//     cy.get('button').contains('Zapisz').click();
//     cy.get('.profile-row').contains('Waga:').parent().find('.profile-value').should('contain', '70 kg');

//     // Aktualizacja wzrostu
//     cy.get('.profile-row').contains('Wzrost:').parent().find('.change-button')
//       .invoke('show')
//       .click({ force: true });
//     cy.get('input[placeholder="Nowy wzrost"]').clear().type('180');
//     cy.get('button').contains('Zapisz').click();
//     cy.get('.profile-row').contains('Wzrost:').parent().find('.profile-value').should('contain', '180 cm');

//     // Aktualizacja płci
//     cy.get('.profile-row').contains('Płeć:').parent().find('.change-button')
//       .invoke('show')
//       .click({ force: true });
//     cy.get('select').select('Mężczyzna');
//     cy.get('button').contains('Zapisz').click();
//     cy.get('.profile-row').contains('Płeć:').parent().find('.profile-value').should('contain', 'Mężczyzna');

//     // Aktualizacja wieku
//     cy.get('.profile-row').contains('Wiek:').parent().find('.change-button')
//       .invoke('show')
//       .click({ force: true });
//     cy.get('input[placeholder="Nowy wiek"]').clear().type('25');
//     cy.get('button').contains('Zapisz').click();
//     cy.get('.profile-row').contains('Wiek:').parent().find('.profile-value').should('contain', '25');

//     // Aktualizacja celów
//     cy.get('.profile-row').contains('Cel:').parent().find('.change-button')
//       .invoke('show')
//       .click({ force: true });
//     cy.get('input[placeholder="Nowe cele"]').clear().type('Zbudować masę mięśniową');
//     cy.get('button').contains('Zapisz').click();
//     cy.get('.profile-row').contains('Cel:').parent().find('.profile-value').should('contain', 'Zbudować masę mięśniową');

//         // Aktualizacja imienia
//         cy.get('.profile-row').contains('Imie:').parent().find('.change-button')
//         .invoke('show') // Wymuszenie wyświetlenia przycisku
//         .click({ force: true });
//       cy.get('input[placeholder="Nowe imie"]').clear().type('NoweImie');
//       cy.get('button').contains('Zapisz').click();
//       cy.reload();
//       cy.get('.profile-row').contains('Imie:').parent().find('.profile-value').should('contain', 'NoweImie');
  
      
//       // Aktualizacja nazwiska
//       cy.get('.profile-row').contains('Nazwisko:').parent().find('.change-button')
//         .invoke('show') // Wymuszenie wyświetlenia przycisku
//         .click({ force: true });
//       cy.get('input[placeholder="Nowe nazwisko"]').clear().type('NoweNazwisko');
//       cy.get('button').contains('Zapisz').click();
//       cy.reload();
//       cy.get('.profile-row').contains('Nazwisko:').parent().find('.profile-value').should('contain', 'NoweNazwisko');

//         // Aktualizacja loginu
//         cy.get('.profile-row').contains('Login:').parent().find('.change-button')
//         .invoke('show') // Wymuszenie wyświetlenia przycisku
//         .click({ force: true });
//         cy.get('input[placeholder="Nowy login"]').clear().type('nowyLogin123');
//         cy.get('button').contains('Zapisz').click();
//         cy.reload();
//         cy.get('.profile-row').contains('Login:').parent().find('.profile-value').should('contain', 'nowyLogin123');
        
 
//     //      // Wylogowanie się z aplikacji
//     // cy.get('a[href="/login"]').click(); // Kliknięcie na link "Wyloguj się"
//     // cy.url().should('include', '/login'); // Sprawdzenie, czy jesteśmy na stronie logowania

//     // // Logowanie z nowym loginem
//     // cy.get('input.username-field').clear().type('nowyLogin123'); // Podanie nowego loginu
//     // cy.get('input.password-field').type('TestPassword123!'); // Podanie hasła
//     // cy.get('button.login-button').click(); // Zalogowanie

//     // // Sprawdzamy, czy użytkownik jest przekierowany do sekcji profilu
//     // cy.url().should('include', '/nutrition');

//     // // Sprawdzenie, czy login został zaktualizowany po ponownym zalogowaniu
//     // cy.get('.profile-row').contains('Login:').parent().find('.profile-value').should('contain', 'nowyLogin123');
//   });
// });
