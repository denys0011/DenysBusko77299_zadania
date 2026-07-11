# Kolejka — lista filmów i seriali

Prosta aplikacja webowa do zarządzania listą filmów i seriali do obejrzenia.

## Opis aplikacji

Aplikacja pozwala użytkownikowi dodawać tytuły filmów i seriali, które chce obejrzeć, oznaczać je jako obejrzane oraz usuwać z listy. Każda pozycja zawiera tytuł, typ (film/serial), gatunek, rok produkcji, priorytet obejrzenia oraz status (obejrzane / do obejrzenia). Listę można filtrować po typie i statusie.

## Zastosowane technologie

- HTML5
- CSS3 (bez frameworków, własne style)
- Vanilla JavaScript (bez bibliotek zewnętrznych)
- `localStorage` jako trwały mechanizm zapisu danych po stronie przeglądarki

## Główne funkcjonalności

- Dodawanie nowej pozycji przez formularz (tytuł, typ, gatunek, rok, priorytet, checkbox „obejrzane”)
- Wyświetlanie listy pozycji w formie kart
- Usuwanie pozycji z listy
- Filtrowanie listy po typie (Film/Serial) i statusie (obejrzane/do obejrzenia)
- Walidacja formularza (wymagane pola, poprawny zakres roku, minimalna długość tytułu i gatunku) z komunikatami błędów przy polach
- Komunikaty (toast) informujące o dodaniu i usunięciu pozycji oraz o błędach walidacji
- Dane zapisywane trwale w `localStorage` — nie znikają po odświeżeniu strony
- Responsywny układ (działa na telefonie)

Aplikacja **nie** pozwala na edycję istniejących elementów (wersja na ocenę 3,0).

## Instrukcja uruchomienia

### Lokalnie
1. Pobierz plik `index.html`.
2. Otwórz go w dowolnej przeglądarce (podwójne kliknięcie lub `File > Open`).

Aplikacja nie wymaga instalacji żadnych zależności ani serwera — działa w całości po stronie przeglądarki.

### Wersja online
Aplikacja dostępna jest publicznie pod adresem: **[TU WKLEIĆ LINK PO WDROŻENIU NA GITHUB PAGES]**

## Struktura kodu (plik `index.html`)

Cała logika znajduje się w jednym pliku `index.html`, w sekcji `<script>`:

- **Zapis/odczyt danych** — funkcje `loadItems()` i `saveItems()` (localStorage)
- **Dodawanie pozycji** — listener na `#addForm` (`submit`), tworzy obiekt pozycji i wywołuje `saveItems()`
- **Walidacja** — funkcja `validate()` oraz `setError()`, sprawdzają poprawność danych z formularza przed dodaniem
- **Usuwanie pozycji** — funkcja `deleteItem(id)`
- **Filtrowanie i renderowanie listy** — funkcje `render()` i `renderTicket()`
- **Komunikaty dla użytkownika** — funkcja `showToast()`

Style CSS znajdują się w sekcji `<style>` tego samego pliku (zmienne kolorów w `:root`).
