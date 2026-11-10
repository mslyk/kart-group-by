import {Resend} from 'resend';
import initSqlJs from 'sql.js';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {tasks,fixtures,grade} from './assessment.js';
const require=createRequire(import.meta.url);
let sqlPromise;
function sqlEngine(){if(!sqlPromise){const wasm=readFileSync(require.resolve('sql.js/dist/sql-wasm.wasm'));sqlPromise=initSqlJs({wasmBinary:wasm});}return sqlPromise;}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function cleanSql(raw){
 if(typeof raw!=='string'||raw.length>2500)throw Error('Zapytanie jest za długie lub nieprawidłowe.');
 const cleaned=raw.trim().replace(/;+\s*$/,'');
 if(!/^select\s/i.test(cleaned))throw Error('Dozwolone są tylko zapytania SELECT.');
 // SQL keywords in comments are disallowed and only one statement may be run.
 if(/;|--|\/\*|\*\//.test(cleaned))throw Error('Wpisz jedno zapytanie SELECT bez komentarzy.');
 if(!/\bgroup\s+by\b/i.test(cleaned))throw Error('W tym zadaniu należy użyć GROUP BY.');
 if(!/\b(count|sum|avg|max|min)\s*\(/i.test(cleaned))throw Error('Użyj funkcji agregującej.');
 return cleaned;
}
function makeDb(SQL,fixture){let db=new SQL.Database();db.run('CREATE TABLE zamowienia (id INTEGER PRIMARY KEY, dzial TEXT, kwota INTEGER, status TEXT)');const stmt=db.prepare('INSERT INTO zamowienia(id,dzial,kwota,status) VALUES(?,?,?,?)');fixture.forEach((r,i)=>stmt.run([i+1,...r]));stmt.free();return db;}
function getRows(db,sql){const out=db.exec(sql);if(out.length!==1)return [];return out[0].values;}
const cmp=(a,b)=>typeof a==='number'&&typeof b==='number'?Math.abs(a-b)<1e-7:String(a)===String(b);
function sameRows(actual,expected){if(actual.length!==expected.length)return false;const remaining=actual.map(r=>r.slice());for(const expectedRow of expected){const pos=remaining.findIndex(r=>r.length===expectedRow.length&&r.every((cell,i)=>cmp(cell,expectedRow[i])));if(pos===-1)return false;remaining.splice(pos,1);}return true;}
function evaluate(SQL,task,answer){
 let sql;try{sql=cleanSql(answer);}catch(e){return {points:0,feedback:e.message};}
 let passed=0;
 for(const fixture of fixtures){let db;try{db=makeDb(SQL,fixture);const actual=getRows(db,sql),expected=getRows(db,task.solution);if(sameRows(actual,expected))passed++;}catch(e){return {points:0,feedback:'Zapytanie nie działa poprawnie: '+String(e.message).slice(0,180)};}finally{db?.close();}}
 return {points:passed===3?4:passed>0?2:0,feedback:passed===3?'Wynik zapytania jest poprawny.':passed>0?'Zapytanie działa, ale zwraca poprawny wynik tylko dla części zestawów danych.':'Zapytanie działa, ale zwraca nieprawidłowe dane.'};
}
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'Metoda niedozwolona'});
 try{
  const {name,group,answers,startedAt,events,submissionId}=req.body||{};
  if(typeof name!=='string'||name.trim().length<4||name.length>120||typeof group!=='string'||!group.trim()||group.length>80||!Array.isArray(answers)||answers.length!==tasks.length||answers.some(a=>typeof a!=='string'||a.length>2500))return res.status(400).json({error:'Brak kompletnych danych kartkówki.'});
  if(!process.env.RESEND_API_KEY)return res.status(503).json({error:'Dodaj RESEND_API_KEY w ustawieniach Vercel.'});
  const SQL=await sqlEngine();
  const details=tasks.map((task,i)=>({id:task.id,title:task.title,answer:answers[i],solution:task.solution,max:task.points,...evaluate(SQL,task,answers[i])}));
  const total=details.reduce((sum,d)=>sum+d.points,0),max=tasks.reduce((sum,q)=>sum+q.points,0),percent=Math.round(total/max*100),mark=grade(percent);
  const safeEvents=Array.isArray(events)?events.slice(0,1500).filter(e=>e&&typeof e==='object').map(e=>({at:String(e.at||'').slice(0,36),elapsedMs:Number.isFinite(e.elapsedMs)?Math.max(0,Math.round(e.elapsedMs)):0,task:Number(e.task)||0,type:String(e.type||'').slice(0,80),details:String(e.details||'').slice(0,160)})):[];
  const eventCounts={};for(const e of safeEvents)eventCounts[e.type]=(eventCounts[e.type]||0)+1;
  const eventReport=`<h2>Raport aktywności (${safeEvents.length} zdarzeń)</h2><p><b>Identyfikator podejścia:</b> ${escapeHtml(submissionId||'brak')}</p><p>${Object.entries(eventCounts).map(([key,value])=>`${escapeHtml(key)}: <b>${value}</b>`).join(' · ')||'Brak zdarzeń'}</p><table border="1" cellspacing="0" cellpadding="5"><thead><tr><th>Czas</th><th>Zadanie</th><th>Zdarzenie</th><th>Szczegóły</th></tr></thead><tbody>${safeEvents.map(e=>`<tr><td>${escapeHtml(e.at)}</td><td>${e.task}</td><td>${escapeHtml(e.type)}</td><td>${escapeHtml(e.details)}</td></tr>`).join('')}</tbody></table><p>Uwaga: zdarzenia przeglądarkowe stanowią wskazówki, nie dowód niesamodzielności. Monitorowanie nie obejmuje zdarzeń poza działającą stroną, ani treści schowka.</p>`;
  const html=`<h2>Kartkówka SQL: GROUP BY — pisanie zapytań</h2><p><b>Uczeń:</b> ${escapeHtml(name)}<br><b>Klasa:</b> ${escapeHtml(group)}<br><b>Punkty:</b> ${total}/${max} (${percent}%)<br><b>Ocena:</b> ${escapeHtml(mark)}<br><b>Rozpoczęto (czas przeglądarki):</b> ${escapeHtml(startedAt)}<br><b>Otrzymano:</b> ${new Date().toISOString()}</p>${eventReport}${details.map(d=>`<hr><h3>${d.id}. ${escapeHtml(d.title)} — ${d.points}/${d.max} pkt</h3><p><b>Zapytanie ucznia:</b></p><pre style="white-space:pre-wrap">${escapeHtml(d.answer||'(pominięte)')}</pre><p><b>Przykładowe poprawne rozwiązanie:</b></p><pre>${escapeHtml(d.solution)}</pre><p>${escapeHtml(d.feedback)}</p>`).join('')}`;
  const resend=new Resend(process.env.RESEND_API_KEY);
  const {error}=await resend.emails.send({from:process.env.RESEND_FROM||'Kartkówki <onboarding@resend.dev>',to:['magdalena.slyk@zstil.pl'],subject:`GROUP BY · ${name.trim().replace(/[\r\n]/g,' ')} · ${mark} · ${total}/${max}`,html});
  if(error){console.error('Resend delivery error:',error);return res.status(502).json({error:'Resend nie wysłał wiadomości. Sprawdź, czy magdalena.slyk@zstil.pl jest adresem konta Resend lub czy domena nadawcy jest zweryfikowana.'});}
  return res.status(200).json({total,max,percent,grade:mark,details});
 }catch(e){console.error('Submit SQL quiz:',e);return res.status(500).json({error:'Błąd sprawdzania lub wysyłki wyników. Sprawdź konfigurację serwera.'});}
}
