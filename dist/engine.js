(function(root){
'use strict';
const DAY=86400000,KEY='frontend-quest-v1';
function dayKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function fresh(){return {version:1,xp:0,records:{},days:{},notes:{},bookmarks:[],daily:{},active:null,bossWins:0};}
function record(s,id){return s.records[id]||{seen:0,correct:0,level:0,due:0,lapses:0,lastDay:'',wrong:false};}
function rate(s,id,grade,now=Date.now()){
 const r=record(s,id),today=dayKey(new Date(now));
 const eligible=r.lastDay!==today && (r.due===0||r.due<=now);
 r.seen++; r.correct+=grade>0?1:0;
 if(grade===0){r.level=Math.max(0,r.level-1);r.lapses++;r.due=now+600000;r.wrong=true;}
 else if(grade===1){r.due=now+DAY;r.wrong=true;}
 else {if(eligible)r.level=Math.min(5,r.level+1);if(eligible||r.wrong||!r.due)r.due=now+[1,3,7,14,30][Math.max(0,r.level-1)]*DAY;r.wrong=false;}
 const d=s.days[today]||(s.days[today]={ids:[],xp:0,attempts:0});
 d.attempts++;
 const gain=d.ids.includes(id)?0:(grade===2?20:grade===1?12:5);
 if(!d.ids.includes(id))d.ids.push(id);
 s.xp+=gain;d.xp+=gain;r.lastDay=today;s.records[id]=r;
 return gain;
}
function priority(s,arr,now=Date.now()){return [...arr].sort((a,b)=>{
 const score=q=>{const r=record(s,q.id);return r.seen&&r.due<=now?0:!r.seen?1:r.wrong?2:3;};
 return score(a)-score(b)||record(s,a.id).due-record(s,b.id).due;
});}
function daily(s,qs,now=Date.now()){
 const key=dayKey(new Date(now));
 if(!s.daily[key])s.daily[key]=[...priority(s,qs.filter(q=>q.id.startsWith('J')),now).slice(0,3),...priority(s,qs.filter(q=>q.id.startsWith('R')||q.id.startsWith('G')&&q.chapter===3),now).slice(0,3)].map(q=>q.id);
 return s.daily[key];
}
function streak(s,now=new Date()){
 let date=new Date(now);if(!s.days[dayKey(date)])date.setDate(date.getDate()-1);
 let n=0;while(s.days[dayKey(date)]?.ids.length){n++;date.setDate(date.getDate()-1);}return n;
}
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function validate(input,ids){
 if(!input||input.version!==1||!Number.isFinite(input.xp)||input.xp<0||input.xp>10000000)throw Error('不是有效的冒险存档');
 const s=fresh(),allow=new Set(ids);s.xp=input.xp;
 if(!input.records||typeof input.records!=='object'||Array.isArray(input.records))throw Error('存档缺少学习记录');
 for(const [id,r] of Object.entries(input.records)){
  if(!allow.has(id))continue;
  if(!r||['seen','correct','level','due','lapses'].some(k=>!Number.isFinite(r[k])||r[k]<0)||r.level>5||r.correct>r.seen||typeof r.lastDay!=='string')throw Error('学习记录格式有误');
  s.records[id]={seen:r.seen,correct:r.correct,level:r.level,due:r.due,lapses:r.lapses,lastDay:r.lastDay,wrong:!!r.wrong};
 }
 for(const [id,v] of Object.entries(input.notes||{}))if(allow.has(id)&&typeof v==='string')s.notes[id]=v.slice(0,20000);
 s.bookmarks=Array.isArray(input.bookmarks)?input.bookmarks.filter(id=>allow.has(id)):[];
 for(const [d,v] of Object.entries(input.days||{}))if(/^\d{4}-\d{2}-\d{2}$/.test(d)&&Array.isArray(v?.ids)&&Number.isFinite(v.xp)&&Number.isFinite(v.attempts))s.days[d]={ids:[...new Set(v.ids.filter(id=>allow.has(id)))],xp:Math.max(0,v.xp),attempts:Math.max(0,v.attempts)};
 for(const [d,v] of Object.entries(input.daily||{}))if(/^\d{4}-\d{2}-\d{2}$/.test(d)&&Array.isArray(v))s.daily[d]=v.filter(id=>allow.has(id));
 s.bossWins=Number.isFinite(input.bossWins)?Math.max(0,input.bossWins):0;
 return s;
}
const api={DAY,KEY,dayKey,fresh,record,rate,priority,daily,streak,shuffle,validate};root.QuestEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
