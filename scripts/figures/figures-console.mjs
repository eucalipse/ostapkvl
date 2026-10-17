export default function(C,{text,rect,arrow,svg}) {
const small=(x,y,s)=>text(x,y,s,{size:17,fill:C.muted});
return {
"the-agent-is-waiting-for-you/inbox":()=>{
let b=rect(48,135,1104,435)+small(74,173,"DECISION INBOX")+small(820,173,"WHY IT NEEDS ATTENTION");
const rows=[['QUESTION','Preserve the old supplier field?','Import migration is blocked',C.amber],['REVIEW','Copy update ready','Patch and checks available',C.green],['UNKNOWN','Reporter disconnected','Last observed state is stale',C.red]];
rows.forEach((r,i)=>{let y=205+i*112;b+=rect(70,y,1060,92,{fill:i===0?C.soft:'#fff'})+text(90,y+35,r[0],{size:14,fill:r[3]})+text(240,y+36,r[1],{size:23})+small(240,y+66,r[2]);});
return svg('Show the decision before the wall of agents',b,{subtitle:'Proposed interface · synthetic tasks · no measured performance data'});
},
"the-agent-is-waiting-for-you/freshness":()=>{
let b=rect(480,160,330,340,{fill:C.soft,dash:'7 6'})+text(510,201,'UNKNOWN INTERVAL',{size:18,fill:C.amber});
b+=arrow(80,360,1120,360);
[[160,'Observed','Running',C.green],[455,'Connection lost','Last known: running',C.amber],[860,'Snapshot received','Reconcile current state',C.green]].forEach(([x,a,d,c])=>{b+=`<circle cx="${x}" cy="360" r="10" fill="${c}"/>`+text(x,295,a,{size:21,anchor:'middle'})+text(x,410,d,{size:17,anchor:'middle',fill:C.muted});});
b+=text(515,455,'Silence does not mean done.',{size:19})+small(80,570,'After reconnect: replace assumptions with a current snapshot.');
return svg('A stale status should become uncertainty',b,{subtitle:'Schematic timeline · spacing is illustrative'});
},
"when-an-agent-dashboard-can-act/approval":()=>{
let b=rect(48,140,430,375)+text(75,181,'REQUEST TO REVIEW',{size:17,fill:C.accent});
['Request: q-17','Session generation: 3','Payload: revision A','State: awaiting response'].forEach((s,i)=>b+=text(75,240+i*55,s,{size:23}));
b+=arrow(478,265,590,265)+rect(610,140,540,160)+text(635,181,'Still the same request?',{size:25})+small(635,224,'Identity, payload, expiry, unresolved state')+small(635,261,'Runtime checks before accepting a response');
b+=rect(610,350,540,165,{fill:C.soft})+text(635,391,'Revision changed or already resolved',{size:23,fill:C.red})+small(635,435,'Reject the stale response.')+small(635,472,'Refresh the request before another decision.');
return svg('Bind an answer to the request that was reviewed',b,{subtitle:'Proposed control boundary · synthetic identifiers'});
},
"when-an-agent-dashboard-can-act/delivery":()=>{
let b='';const xs=[130,435,745,1060];['Browser','Server','Runtime','Action receipt'].forEach((s,i)=>{b+=text(xs[i],165,s,{size:22,anchor:'middle'})+`<line x1="${xs[i]}" y1="190" x2="${xs[i]}" y2="550" stroke="${C.line}" stroke-width="2"/>`;});
b+=arrow(130,240,435,240)+small(160,222,'Submit response')+arrow(435,300,745,300)+small(467,282,'Deliver request')+arrow(745,360,435,360)+small(470,342,'Accepted by runtime')+arrow(745,430,1060,430)+small(774,412,'Execution result');
b+=rect(120,505,980,75,{fill:C.soft})+text(145,550,'No execution receipt? Show unknown, not completed.',{size:25,fill:C.amber});
return svg('Delivery is not proof that an action happened',b,{subtitle:'Proposed message flow · retries must preserve request identity'});
}
};
}
