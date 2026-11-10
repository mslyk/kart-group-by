# DATA/LAB – GROUP BY – dwie grupy na jednej stronie

## Publikacja
1. Prześlij **całą zawartość tego katalogu** do repozytorium GitHub i wdroż na Vercel. Nie podmieniaj wyłącznie index.html, ponieważ potrzebne są również nowe `api/auth.js` i `api/submit.js`.
2. W Settings → Environment Variables ustaw **RESEND_API_KEY**, a następnie wykonaj Redeploy.
3. Otwórz adres strony. Na pierwszym ekranie są dwie grupy, każda zabezpieczona osobnym hasłem.

## Hasła – przekazuj tylko właściwej grupie
- Grupa 1: **SQL-5184**
- Grupa 2: **SQL-7296**

Hasła znajdują się **wyłącznie po stronie serwera** w pliku `api/auth.js`; są stałe, więc można je w przyszłości zmienić w tym pliku. Nie wymagają dodatkowych zmiennych Vercel. Uwaga: są widoczne dla osób z dostępem do kodu repozytorium; użyj prywatnego repozytorium, jeśli chcesz utrudnić ich podejrzenie.

## Wyniki i uwagi
- Obydwie grupy: 8 zadań za 32 pkt, niezależne polecenia i dane, ocenianie według wyników SQL na 3 zestawach danych, skala ocen bez zmian, bez HAVING.
- Wysyłka do `magdalena.slyk@zstil.pl`. Jeśli nadawca Resend wymaga weryfikacji domeny, nadal obowiązują zasady Resend.
- E-mail zawiera grupę, zapytania ucznia, rozwiązania, punkty, ocenę i rejestr zdarzeń.
- Pełny ekran i monitorowanie aktywności są ograniczone możliwościami przeglądarki; nie dowodzą samodzielności ani nie wykrywają aktywności poza stroną.
- Hasło wydaje token ważny 3 godziny. Wymagana jest aktywna funkcja serverless Vercel. Przed sprawdzianem przetestuj obie grupy i dostarczenie e-maila.
