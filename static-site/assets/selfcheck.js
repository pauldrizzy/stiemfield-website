// Convergence Self-Check engine (moved out of index.html 2026-10-01). The scoring is
// unchanged; additions: the PDF report and the owner's completion/lead alerts.
const QS=[["S","Our strategy visibly governed this quarter's spending and priorities."],
["S","Leadership states the same top three priorities when asked separately."],
["T","Our core technology serves the stated strategy, not just operations."],
["T","Management reorganised around new systems rather than bypassing them."],
["I","Something moved from pilot to scaled operation in the last 12 months."],
["I","Ideas that fail are killed quickly and visibly."],
["E","Decisions made 90 days ago are fully operational today."],
["E","Most of last quarter's commitments shipped on time."],
["M","Leadership is aligned on what the strategy actually is."],
["M","We build capability that would outlast the current leaders."]];
const NAMES={S:"Strategy",T:"Technology",I:"Innovation",E:"Execution",M:"Management"};
const DESC={
 S:"Strategy isn't governing real decisions. Under pressure priorities blur and spend drifts from stated intent — the plan decorates a shelf instead of steering the quarter.",
 T:"Technology is deployed but bypassed. Systems exist that management never reorganised around, so the tools serve operations without ever serving the strategy.",
 I:"Innovation stalls before it scales. Pilots don't cross into operations, and failing ideas linger instead of being killed quickly and visibly.",
 E:"Execution is where the value leaks. The gap between decision and delivery is wide — 90-day-old decisions still aren't live, and commitments slip.",
 M:"Management alignment is thin. Leaders don't hold the same strategy, and the organisation isn't building capability that outlasts the current team."};
const MOVES={
 S:["Re-anchor this quarter's budget to your top three priorities — cut or defer whatever doesn't serve them.","Run a one-page strategy test: can each leader independently name the same three priorities?","Put a single owner and a clear decision-right on each priority, so strategy governs spend."],
 T:["Map every core system to the strategic outcome it is meant to serve; flag the ones being bypassed.","Reorganise one management process around the system instead of working around it.","Retire your biggest shadow workaround and move that work onto the system of record."],
 I:["Choose one stalled pilot and define its path to scale — owner, budget, and a single success metric.","Install a visible kill-rule so failing experiments end fast and free up capacity.","Move one proven pilot into standard operations before the quarter closes."],
 E:["Audit decisions made 90 days ago: how many are fully operational today? Make the list public.","Install one delivery cadence with weekly commitment tracking and named owners.","Cut work-in-progress — finish fewer things fully rather than starting more."],
 M:["Have each leader write the strategy independently, then reconcile the differences in one session.","Name the capability that must outlast the current leaders — and assign who builds it.","Close your single biggest alignment gap with a facilitated decision, not another memo."]};
const GAPS={
 "S,E":["The Strategy–Execution Gap","Strategy and Execution are your weakest pair — the most common and most costly convergence break. Good intentions don't survive the trip to delivery."],
 "T,M":["The Technology–Management Gap","Technology and Management are your weakest link — systems get bought but leadership never reorganises around them, so the investment never converts."],
 "I,E":["The Innovation–Execution Gap","Innovation and Execution lag together — ideas start but don't ship, and the pipeline clogs with unfinished pilots."],
 "S,M":["The Alignment Gap","Strategy and Management are weakest — leaders aren't holding the same plan, so nothing downstream can converge."],
 "T,I":["The Digital Stall","Technology and Innovation lag — you have systems, but they aren't compounding into new capability."]};
let i=0, answers=[];
function show(){
 document.getElementById('qp').textContent=QS[i][1];
 document.getElementById('qnow').textContent=(i+1);
 document.getElementById('qbar').style.width=(i/QS.length*100)+"%";
 document.getElementById('qback').style.display=i>0?"inline":"none";
}
function ans(v){answers[i]=v;i++;if(i<QS.length){show();}else{done();}}
function back(e){e.preventDefault();if(i>0){i--;show();}}
function done(){
 const s={S:0,T:0,I:0,E:0,M:0};
 QS.forEach((q,idx)=>{s[q[0]]+=answers[idx];});
 const order=["S","T","I","E","M"];
 let bars="";
 order.forEach(f=>{const v=s[f];
  bars+="<div style='margin:10px 0'><b>"+NAMES[f]+"</b><div class='bar'><span style='width:"+(v*10)+"%'></span><b>"+v+"/10</b></div></div>";});
 document.getElementById('bars').innerHTML=bars;
 // Convergence Index — identical arithmetic to the paid Fieldscan, deliberately.
 // Each force is answered by TWO questions, so s[f] is 2-10; rescale to the
 // canonical 1-5 and take the HARMONIC mean (the correct average for a chain
 // limited by its slowest stage, and the harshest on a weak force).
 // Before this fix the Self-Check used a geometric mean on the raw 2-10 scale
 // and read +14.1 points HIGHER than a Fieldscan, disagreeing on the band in
 // 53% of cases — a prospect scored "Converging" free, then "Exposed" on the
 // paid engagement. Now: bias -0.4 points, band mismatch 16.9% (residual is
 // the honest limit of asking two questions instead of interviewing).
 const H=5/order.reduce((a,f)=>a+1/(s[f]/2),0);
 const ci=Math.round(((H-1)/4)*100);
 document.getElementById('ciNum').textContent=ci;
 let band,color,txt;
 if(ci<25){band="Fragile";color="#B23A2E";txt="At least one force is near-zero and dragging the rest down. On our thesis forces are multiplicative — this is exactly where transformations quietly fail.";}
 else if(ci<50){band="Exposed";color="#C77D0A";txt="You have real strengths, but an imbalance is leaking most of their value. Convergence — not more effort — is the unlock.";}
 else if(ci<75){band="Converging";color="#B8901B";txt="The forces are starting to work together. Closing your weakest link would compound the strengths you already have.";}
 else{band="Aligned";color="#2E7D4F";txt="Strong, balanced convergence. The work now is protecting it from drift as you scale.";}
 const be=document.getElementById('ciBand');be.textContent=band;be.style.background=color;
 document.getElementById('ciText').textContent=txt;
 let low=order[0];order.forEach(f=>{if(s[f]<s[low])low=f;});
 document.getElementById('weakLine').innerHTML="<b>"+NAMES[low]+"</b> — "+s[low]+"/10";
 document.getElementById('weakDesc').textContent=DESC[low];
 const sorted=order.slice().sort((a,b)=>s[a]-s[b]);
 const two=[sorted[0],sorted[1]].sort((a,b)=>order.indexOf(a)-order.indexOf(b));
 const gap=GAPS[two[0]+","+two[1]]||["The "+NAMES[two[0]]+"–"+NAMES[two[1]]+" Gap","Your two weakest forces are "+NAMES[two[0]]+" and "+NAMES[two[1]]+" — where a strong force stands alone it produces nothing. The connection is the constraint."];
 document.getElementById('gapLine').innerHTML="<b>"+gap[0]+"</b>";
 document.getElementById('gapDesc').textContent=gap[1];
 document.getElementById('moves').innerHTML=MOVES[low].map(m=>"<li>"+m+"</li>").join("");
 document.getElementById('f_ci').value=ci;
 document.getElementById('f_weak').value=NAMES[low];
 document.getElementById('f_gap').value=gap[0];
 order.forEach(f=>{document.getElementById('f_'+f).value=s[f];});
 window.sgcReport={s:s,ci:ci,band:band,color:color,txt:txt,low:low,gap:gap};
 sgcEvent({type:'completed'});
 sgcMailStatus();
 ['qcard','qcount','qprogress','qintro'].forEach(id=>{document.getElementById(id).hidden=true;});
 document.getElementById('report').hidden=false;
 document.getElementById('report').scrollIntoView({behavior:'smooth'});
}
function printReport(e){
 e.preventDefault();
 const r=window.sgcReport;if(!r)return;
 // the PDF is for visitors who send their details (owner, 2026-10-01)
 if(!window.sgcLead){const f=document.getElementById('leadform');if(f)f.scrollIntoView({behavior:'smooth'});return;}
 const card=document.documentElement.getAttribute('data-card')||'ngn';
 const go=()=>window.sgcReportPdf(window.jspdf.jsPDF,r,{NAMES,DESC,MOVES,card,lead:window.sgcLead});
 const fail=()=>window.print();
 if(window.jspdf&&window.sgcReportPdf){go().catch(fail);return;}
 sgcLoad('/assets/vendor/jspdf.umd.min.js').then(()=>sgcLoad('/assets/report-pdf.js')).then(go).catch(fail);
}
function sgcLoad(src){return new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s);});}
// Self-Check alerts: the result (and, if they choose to send it, the visitor's details)
// is stored encrypted for the owner's Telegram alert. Nothing else leaves the browser.
function sgcFields(){const r=window.sgcReport;if(!r)return{};return{convergence_index:r.ci,band:r.band,weakest_force:NAMES[r.low],gap_pattern:r.gap[0],score_strategy:r.s.S,score_technology:r.s.T,score_innovation:r.s.I,score_execution:r.s.E,score_management:r.s.M};}
// the page promises email only while the firm's email sequence is live (the server's signed status)
function sgcMailStatus(){fetch('/.netlify/functions/selfcheck-event?status=1',{cache:'no-store'}).then(r=>r.json()).then(j=>{if(j&&j.mail){const b=document.getElementById('check-box');if(b)b.classList.add('mail-on');}}).catch(()=>{});}
function sgcEvent(extra){try{const b=new URLSearchParams(Object.assign(sgcFields(),extra)).toString();fetch('/.netlify/functions/selfcheck-event',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:b,keepalive:true}).catch(()=>{});}catch(e){}}
function sendLead(e){
 e.preventDefault();
 const form=e.target;
 const body=new URLSearchParams(new FormData(form)).toString();
 const opts={method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:body};
 const done=()=>{form.hidden=true;const t=document.getElementById('leadthanks');t.hidden=false;t.scrollIntoView({behavior:'smooth'});};
 // Our own endpoint mails the branded reply via Resend (needs RESEND_API_KEY).
 fetch("/.netlify/functions/lead",opts).catch(()=>{}).then(done);
 // Also archive in Netlify Forms if form detection is enabled. Failures ignored.
 fetch("/",opts).catch(()=>{});
 const fd=new FormData(form);
 window.sgcLead={name:String(fd.get('name')||'').trim(),organisation:String(fd.get('organisation')||'').trim(),role:String(fd.get('role')||'').trim()};
 if(!fd.get('bot-field'))sgcEvent({type:'lead',name:fd.get('name')||'',email:fd.get('email')||'',organisation:fd.get('organisation')||'',role:fd.get('role')||''});
 return false;
}
show();
