import { defineConfig } from "cypress";
import * as fs from "fs";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // Tablica do przechowywania logów
      const logData: Array<object> = [];

      on("task", {
        logToFile(log) {
          // Zbieranie tylko logów XHR i asercji
          if (log.name === "xhr" || log.name === "assert") {
            logData.push(log); // Dodajemy log do tablicy
          }
          return null; // Nie zwracamy nic, aby zakończyć task
        },
      });

      // Po zakończeniu testów zapisujemy logi do pliku
      on("after:run", () => {
        fs.writeFileSync(
          "cypress/results/filtered-log.json",
          JSON.stringify(logData, null, 2)
        );
        console.log("Logi zapisane w cypress/results/filtered-log.json");
      });

      return config;
    },

    // Wyłączamy nagrywanie wideo oraz screenshoty w przypadku niepowodzenia testów
    video: false,
    screenshotOnRunFailure: false,

    reporter: "mochawesome", // Wybór reportera
    reporterOptions: {
      reportDir: "cypress/results", // Określenie folderu na raporty
      overwrite: true,              // Nadpisanie istniejących plików raportów
      html: true,                   // Generowanie raportu w HTML
      json: true,                   // Generowanie raportu w JSON
    },
  },
});
