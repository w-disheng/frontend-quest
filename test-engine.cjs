const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const E=require('./dist/engine.js');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync('./dist/questions.js','utf8'),ctx);const Q=ctx.window.QUESTIONS;
assert.equal(Q.length,61);assert.equal(new Set(Q.map(q=>q.id)).size,61);
for(const q of Q){assert.ok(q.title&&q.answer&&q.english&&q.page);assert.equal(q.points.length,3);if(q.kind==='quiz'){assert.equal(q.choices.length,4);assert.equal(new Set(q.choices).size,4);assert.equal(q.correct,0);}}
let s=E.fresh(),t=new Date(2026,9,27,12).getTime();
assert.equal(E.rate(s,'J1',2,t),20);assert.equal(s.records.J1.level,1);assert.equal(E.rate(s,'J1',2,t+1000),0);assert.equal(s.records.J1.level,1);
t+=E.DAY+1;E.rate(s,'J1',2,t);assert.equal(s.records.J1.level,2);assert.equal(s.records.J1.due,t+3*E.DAY);
t+=3*E.DAY+1;E.rate(s,'J1',2,t);assert.equal(s.records.J1.level,3);
E.rate(s,'J1',0,t+1);assert.equal(s.records.J1.wrong,true);assert.equal(s.records.J1.level,2);assert.equal(s.records.J1.due,t+1+600000);
E.rate(s,'J1',2,t+2);assert.equal(s.records.J1.level,2);assert.equal(s.records.J1.wrong,false);
const ids=E.daily(s,Q,t);assert.equal(ids.length,6);assert.equal(ids.filter(id=>id.startsWith('J')).length,3);assert.deepEqual(E.daily(s,Q,t),ids);
const imported=E.validate(JSON.parse(JSON.stringify(s)),Q.map(q=>q.id));assert.deepEqual(imported.records,s.records);assert.equal(imported.xp,s.xp);
assert.throws(()=>E.validate({version:1,xp:-1},Q.map(q=>q.id)));
s=E.fresh();for(let n=0;n<3;n++){const d=new Date(2026,9,27+n,12);E.rate(s,'J1',1,d.getTime());}assert.equal(E.streak(s,new Date(2026,9,29,15)),3);
console.log('PASS: 61 content records, spaced intervals, same-day mastery/XP protection, mistake recovery, daily selection, import validation, streak.');
