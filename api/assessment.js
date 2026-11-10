export const tasks = [
 {id:1,points:4,title:'Liczba zamówień w każdym dziale',instruction:'Wyświetl nazwę działu oraz liczbę zamówień w tym dziale. Wynik: 2 kolumny (dzial, liczba).',solution:'SELECT dzial, COUNT(*) AS liczba FROM zamowienia GROUP BY dzial;'},
 {id:2,points:4,title:'Suma wartości zamówień',instruction:'Wyświetl nazwę działu oraz sumę kwot wszystkich jego zamówień. Wynik: 2 kolumny (dzial, suma).',solution:'SELECT dzial, SUM(kwota) AS suma FROM zamowienia GROUP BY dzial;'},
 {id:3,points:4,title:'Średnia kwota zamówienia',instruction:'Oblicz średnią kwotę zamówienia w każdym dziale. Wynik: 2 kolumny (dzial, srednia). Nie zaokrąglaj średniej.',solution:'SELECT dzial, AVG(kwota) AS srednia FROM zamowienia GROUP BY dzial;'},
 {id:4,points:4,title:'Największe zamówienie',instruction:'Dla każdego działu wyświetl jego nazwę i największą kwotę pojedynczego zamówienia. Wynik: 2 kolumny (dzial, maksimum).',solution:'SELECT dzial, MAX(kwota) AS maksimum FROM zamowienia GROUP BY dzial;'},
 {id:5,points:4,title:'Grupowanie z warunkiem WHERE',instruction:'Policz zamówienia o kwocie CO NAJMNIEJ 100 zł osobno dla każdego działu. Działy bez takich zamówień mają się nie pojawić. Wynik: 2 kolumny (dzial, liczba).',solution:'SELECT dzial, COUNT(*) AS liczba FROM zamowienia WHERE kwota >= 100 GROUP BY dzial;'},
 {id:6,points:4,title:'Suma dla wybranego statusu',instruction:"Dla zamówień o statusie 'zrealizowane' oblicz sumę kwot w każdym dziale. Działy bez zrealizowanych zamówień pomiń. Wynik: 2 kolumny (dzial, suma).",solution:"SELECT dzial, SUM(kwota) AS suma FROM zamowienia WHERE status = 'zrealizowane' GROUP BY dzial;"},
 {id:7,points:4,title:'Suma według statusu dla większych zamówień',instruction:'Dla zamówień o kwocie CO NAJMNIEJ 100 zł oblicz sumę kwot osobno dla każdego statusu. Statusy bez takich zamówień pomiń. Wynik: 2 kolumny (status, suma).',solution:'SELECT status, SUM(kwota) AS suma FROM zamowienia WHERE kwota >= 100 GROUP BY status;'},
 {id:8,points:4,title:'Liczba zamówień według statusu',instruction:'Policz, ile zamówień ma każdy status. Wynik: 2 kolumny (status, liczba).',solution:'SELECT status, COUNT(*) AS liczba FROM zamowienia GROUP BY status;'}
];

export const tasksGroup2 = [
 {id:1,points:4,title:'Najmniejsza kwota w dziale',instruction:'Wyświetl nazwę każdego działu oraz kwotę jego najtańszego zamówienia. Wynik: 2 kolumny (dzial, minimum).',solution:'SELECT dzial, MIN(kwota) AS minimum FROM zamowienia GROUP BY dzial;'},
 {id:2,points:4,title:'Liczba nowych zamówień',instruction:"Policz zamówienia o statusie 'nowe' osobno dla każdego działu. Pokaż tylko działy, które mają takie zamówienia. Wynik: 2 kolumny (dzial, liczba).",solution:"SELECT dzial, COUNT(*) AS liczba FROM zamowienia WHERE status = 'nowe' GROUP BY dzial;"},
 {id:3,points:4,title:'Suma według statusu',instruction:'Wyświetl status zamówienia i sumę kwot wszystkich zamówień o tym statusie. Wynik: 2 kolumny (status, suma).',solution:'SELECT status, SUM(kwota) AS suma FROM zamowienia GROUP BY status;'},
 {id:4,points:4,title:'Średnia zrealizowanych zamówień',instruction:"Oblicz średnią kwotę zamówień o statusie 'zrealizowane' w każdym dziale. Działy bez takich zamówień pomiń. Nie zaokrąglaj wyniku. Wynik: 2 kolumny (dzial, srednia).",solution:"SELECT dzial, AVG(kwota) AS srednia FROM zamowienia WHERE status = 'zrealizowane' GROUP BY dzial;"},
 {id:5,points:4,title:'Największa kwota według statusu',instruction:'Dla każdego statusu wyświetl jego nazwę i największą kwotę pojedynczego zamówienia o tym statusie. Wynik: 2 kolumny (status, maksimum).',solution:'SELECT status, MAX(kwota) AS maksimum FROM zamowienia GROUP BY status;'},
 {id:6,points:4,title:'Liczba zamówień powyżej 150 zł',instruction:'Policz zamówienia o kwocie WIĘKSZEJ NIŻ 150 zł osobno dla każdego działu. Działy bez takich zamówień pomiń. Wynik: 2 kolumny (dzial, liczba).',solution:'SELECT dzial, COUNT(*) AS liczba FROM zamowienia WHERE kwota > 150 GROUP BY dzial;'},
 {id:7,points:4,title:'Suma mniejszych zamówień',instruction:'Dla zamówień o kwocie MNIEJSZEJ NIŻ 150 zł oblicz sumę kwot w każdym dziale. Działy bez takich zamówień pomiń. Wynik: 2 kolumny (dzial, suma).',solution:'SELECT dzial, SUM(kwota) AS suma FROM zamowienia WHERE kwota < 150 GROUP BY dzial;'},
 {id:8,points:4,title:'Liczba zamówień w dziale',instruction:'Dla każdego działu podaj jego nazwę i liczbę zamówień. Wynik: 2 kolumny (dzial, liczba).',solution:'SELECT dzial, COUNT(*) AS liczba FROM zamowienia GROUP BY dzial;'}
];

export const fixtures = [
 [ ['Sprzedaż',120,'zrealizowane'],['Serwis',80,'nowe'],['Sprzedaż',200,'nowe'],['Serwis',50,'zrealizowane'],['Magazyn',100,'nowe'],['Sprzedaż',60,'zrealizowane'],['Magazyn',210,'zrealizowane'],['Serwis',150,'zrealizowane'],['Sprzedaż',190,'zrealizowane'],['Magazyn',75,'nowe'] ],
 [ ['Serwis',300,'nowe'],['Serwis',20,'zrealizowane'],['Marketing',85,'nowe'],['Marketing',115,'zrealizowane'],['Sprzedaż',100,'nowe'],['Sprzedaż',90,'zrealizowane'],['Sprzedaż',240,'zrealizowane'],['Sprzedaż',40,'nowe'],['Sprzedaż',70,'zrealizowane'] ],
 [ ['Magazyn',45,'nowe'],['Magazyn',65,'nowe'],['Magazyn',95,'zrealizowane'],['Magazyn',145,'zrealizowane'],['Serwis',100,'nowe'],['Serwis',100,'zrealizowane'],['Sprzedaż',5,'zrealizowane'],['Sprzedaż',180,'nowe'],['Sprzedaż',220,'zrealizowane'],['Sprzedaż',110,'nowe'],['Sprzedaż',130,'nowe'] ]
];
export const exampleRows=fixtures[0].map((r,i)=>[i+1,...r]);
export function grade(p){return p>=95?'6 – celujący':p>=90?'5 – bardzo dobry':p>=75?'4 – dobry':p>=51?'3 – dostateczny':p>=36?'2 – dopuszczający':'1 – niedostateczny';}
