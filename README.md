# Kartkówka SQL – GROUP BY, bez HAVING

8 zadań praktycznych (32 pkt), w tym łatwiejsze zadanie 8: liczba zamówień według statusu. Automatyczne ocenianie po stronie serwera, wyniki i raport aktywności na e-mail.

## Wdrożenie na Vercel

1. Prześlij zawartość folderu do repozytorium GitHub.
2. Zaimportuj repozytorium do Vercel (framework: Other).
3. Dodaj **jedną** zmienną środowiskową: `RESEND_API_KEY` z prawidłowym kluczem API Resend.
4. Wykonaj Deploy i przetestuj kompletną kartkówkę.

Odbiorca wpisany jest na stałe w `api/submit.js`: **magdalena.slyk@zstil.pl**. Nadawca domyślny: `Kartkówki <onboarding@resend.dev>`. Resend w trybie testowym pozwala wysyłać na adres właściciela konta Resend; jeśli podany odbiorca nie jest adresem konta, trzeba zweryfikować własną domenę nadawczą (i wtedy odpowiednio zmienić `from` w `api/submit.js` lub użyć opcjonalnego `RESEND_FROM`). Sam klucz API nie omija ograniczeń wysyłki Resend.

## Raport i prywatność

Po kliknięciu Rozpocznij aplikacja próbuje uruchomić pełny ekran. Rejestrowane są: start i koniec, zatwierdzanie zadań, wejście/wyjście z pełnego ekranu, błędy lub odmowa trybu pełnoekranowego, ukrycie/powrót karty, utrata/powrót focusu okna oraz kopiowanie, wycinanie i wklejanie (tylko typ i kontekst zdarzenia — nie treść schowka). Dane z dziennika są wysyłane **dopiero przy oddaniu kartkówki**. Jeżeli uczeń zamknie stronę bez oddania, ten wariant nie zapewnia doręczenia raportu. Zdarzenia nie są wiarygodnym dowodem korzystania z niedozwolonych pomocy.

Przed rozpoczęciem uczniowie widzą informację o monitorowaniu. Nauczyciel powinien ustalić szkolną podstawę przetwarzania danych i politykę retencji raportów.

## Ocenianie

Zapytania SELECT są wykonywane na 3 zestawach danych: 4 pkt za komplet poprawnych wyników, 2 pkt za część poprawnych zestawów, 0 pkt w pozostałych przypadkach. Wysyłka wymaga środowiska serwerowego Vercel; lokalny plik `index.html` nie wyśle e-maila.
# kart-group-by
