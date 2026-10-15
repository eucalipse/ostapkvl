export default function(C,h) {
 const {text,rect,lines,svg,arrow}=h, f={}, prefix='human-attention-is-the-bottleneck/';
 const t=(x,y,s,size=24,fill=C.ink)=>text(x,y,s,{size,fill});
 const box=(x,y,w,hgt,fill='#fff',stroke=C.line)=>rect(x,y,w,hgt,{fill,stroke,r:14});
 const badge=(x,y,label,color)=>box(x,y,180,36,C.paper,color)+t(x+14,y+25,label,18,color);
 f[prefix+'attention-budget']=()=>{
  let b='';
  for(const x of [48,618]) b+=box(x,125,534,680);
  b+=t(76,167,'A. Everything looks equally important',24)+t(646,167,'B. Decisions come first',24);
  b+=t(76,205,'Supplier request · example',19,C.muted)+t(646,205,'Supplier request · example',19,C.muted);
  const rows=[['Supplier','Northstar Supply'],['Contact','Alex Morgan'],['Currency','USD'],['Terms','Net 30'],['Start date','November 1'],['Delivery','Main warehouse'],['Bank record','…4821']];
  rows.forEach(([a,v],i)=>{let y=235+i*61;b+=box(72,y,486,51,C.paper)+t(88,y+32,a,20,C.muted)+t(280,y+32,v,21);});
  b+=box(72,696,486,66,C.soft)+t(92,736,'Approve all fields',23,C.muted);
  b+=box(642,235,486,176,'#FFF0E9',C.accent)+badge(662,253,'CONFLICT',C.accent)+t(662,321,'Bank details do not agree',26)+t(662,357,'Email: …4821   /   Record: …9017',21)+t(662,387,'Open both sources before deciding',19,C.muted);
  b+=box(642,429,486,151,'#FCF5DF',C.amber)+badge(662,447,'NEEDS A DATE',C.amber)+t(662,513,'“Early next month” is ambiguous',23)+t(662,550,'Ask for a date; do not invent one',20,C.muted);
  b+=box(642,598,486,69,C.soft)+t(662,627,'Source-matched fields',22)+t(662,653,'Expand to inspect evidence →',18,C.muted);
  b+=box(642,696,486,66,'#F9E8E5',C.red)+t(662,736,'Saving blocked until resolved',23,C.red);
  b+=t(48,855,'The difference is what the screen asks a person to decide.',26);
  return svg('Same request. A different use of attention.',b,{h:930,subtitle:'Illustrative interface comparison · synthetic supplier and values'});
 };
 f[prefix+'risk-matrix']=()=>{
  let b='';
  const cells=[
   [150,155,'HIGH IMPACT','Payment recipient','Verified source, still needs','independent approval.',C.red],
   [650,155,'HIGH IMPACT','Conflicting bank details','Do not pick a winner.','Verify before authorizing.',C.red],
   [150,440,'LOW IMPACT','Internal email label','Clear routing rule.','Apply and log the result.',C.green],
   [650,440,'LOW IMPACT','Ambiguous internal tag','Reversible classification.','Sample or ask when needed.',C.amber]
  ];
  cells.forEach(([x,y,k,title,l1,l2,c])=>{b+=box(x,y,465,255,C.paper,c)+t(x+26,y+43,k,18,c)+t(x+26,y+91,title,26)+t(x+26,y+143,l1,22)+t(x+26,y+176,l2,22)+t(x+26,y+224,x===150?'Evidence agrees':'Evidence incomplete / conflicting',18,C.muted)});
  b+=arrow(130,715,1130,715)+t(150,753,'Lower uncertainty',23,C.muted)+t(855,753,'Higher uncertainty',23,C.muted);
  b+=`<text x="80" y="460" transform="rotate(-90 80 460)" font-family="Helvetica,Arial,sans-serif" font-size="24" fill="${C.muted}">Cost of a mistake →</text>`;
  b+=t(150,812,'Policy can require approval even when the evidence is clear.',24);
  return svg('Confidence is only half the decision.',b,{h:890,subtitle:'Illustrative placements · impact depends on your product and controls'});
 };
 f[prefix+'request-evidence']=()=>{
  let b=box(48,130,1104,150,C.soft)+t(74,172,'01 / INCOMING REQUEST',19,C.accent)+t(74,216,'“Please start early next month. Use the bank details attached.”',25)+t(74,253,'Synthetic supplier email · attachment is a separate source',19,C.muted);
  b+=arrow(600,286,600,320);
  b+=box(48,330,534,230)+box(618,330,534,230);
  b+=t(74,372,'02 / WHAT THE AGENT PROPOSED',18,C.accent)+t(74,420,'Start date: November 1',26)+t(74,462,'Bank account: …4821',26)+t(74,520,'Both require evidence checks',20,C.muted);
  b+=t(644,372,'03 / WHAT THE EVIDENCE SUPPORTS',18,C.accent)+t(644,420,'Date: not specified precisely',24)+t(644,462,'Existing record: …9017',24)+t(644,520,'A proposal is not a verified value',20,C.muted);
  b+=arrow(600,570,600,608)+box(48,620,1104,173,'#FFF0E9',C.accent);
  b+=t(74,665,'04 / THE HUMAN DECISION',19,C.accent)+t(74,711,'Confirm the intended date. Independently verify the account change.',25)+t(74,758,'Saving remains blocked. Resolving the conflict does not itself authorize payment.',21,C.muted);
  return svg('Follow the evidence to the decision.',b,{h:870,subtitle:'One request, two uncertainties · illustrative example, not production data'});
 };
 f[prefix+'attention-routing']=()=>{
  let b=box(260,125,680,90,C.soft)+t(290,163,'INCOMING WORK',18,C.accent)+t(290,195,'Check evidence, permissions, impact and uncertainty',23);
  const rows=[['ROUTINE + REVERSIBLE','Policy allows execution','Log result; sample for quality',C.green],['UNCERTAIN + LOW IMPACT','Prepare or classify cautiously','Sample, clarify, or escalate',C.amber],['HIGH IMPACT OR CONFLICT','Prepare a decision packet','Human verifies and authorizes',C.red]];
  rows.forEach(([tag,title,desc,c],i)=>{let y=270+i*145;b+=box(90,y,1020,118,'#fff',c)+t(118,y+34,tag,18,c)+t(118,y+73,title,26)+t(600,y+73,desc,22);});
  b+=arrow(600,219,600,254)+box(90,745,1020,75,C.soft)+t(116,778,'Monitoring can send any category back to review.',24)+t(116,805,'A routing policy is revisable; autonomy is not permanent.',19,C.muted);
  return svg('Route work. Protect the scarce attention.',b,{h:900,subtitle:'Qualitative policy map · no percentages or throughput claims'});
 };
 return f;
}
