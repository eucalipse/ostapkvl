export default function(C,{text,rect,arrow,svg}) {
 const p='an-expensive-planner-a-cheaper-executor/';
 const palette=[C.accent,'#456C86','#9C844D',C.green,C.red];
 return {
 [p+'workflow']:()=>{
 let b='';
 const nodes=[['PLAN','Decisions + invariants',65,175],['HANDOFF','Revision + acceptance',430,175],['IMPLEMENT','Bounded code change',795,175],['REVIEW','Diff + independent checks',795,405],['ACCEPT','Verified task outcome',430,405]];
 for(const [a,c,x,y] of nodes) b+=rect(x,y,300,115,{fill:C.soft})+text(x+22,y+35,a,{size:16,fill:C.accent,weight:700})+text(x+22,y+77,c,{size:19});
 b+=arrow(365,230,423,230)+arrow(730,230,788,230)+arrow(945,290,945,398)+arrow(795,460,737,460);
 b+=`<path d="M945 520 V570 H215 V298" fill="none" stroke="${C.red}" stroke-width="2" stroke-dasharray="7 5"/>`+arrow(215,320,215,298,{color:C.red});
 b+=text(370,600,'Failed assumption → replan • local failure → bounded repair',{size:20,fill:C.red});
 return svg('A cheaper executor needs a clear boundary',b,{subtitle:'Proposed workflow · review the evidence, including whether the plan was right'});
 },
 [p+'cost']:()=>{
 let b='';const labels=['Plan','Implement','Handoff','Verify','Repair'];
 labels.forEach((s,i)=>{b+=rect(55+i*220,125,16,16,{fill:palette[i],stroke:palette[i],r:2})+text(80+i*220,139,s,{size:17});});
 const rows=[['Single model',[3,7,0,2,0]],['Mixed models',[3,2,1,2,0]],['Mixed + repair',[3,2,1,2,6]]];
 rows.forEach(([label,vals],j)=>{let x=260;let y=205+j*125;b+=text(50,y+43,label,{size:20});vals.forEach((v,i)=>{if(v){b+=rect(x,y,v*55,65,{fill:palette[i],stroke:C.paper,r:0})+text(x+v*27.5,y+42,String(v),{fill:'#fff',size:22,anchor:'middle'});x+=v*55;}});b+=text(x+16,y+42,String(vals.reduce((a,v)=>a+v,0)),{weight:700,size:24});});
 b+=text(260,595,'Illustrative cost units · all stages included · lower total is cheaper',{size:19,fill:C.muted});
 return svg('The repair bill can erase the saving',b,{subtitle:'Synthetic example, not measured results or current model prices'});
 },
 [p+'break-even']:()=>{
 let b='';const X=v=>160+v*140,Y=v=>555-(v-6)*37;
 for(let v=6;v<=14;v+=2)b+=`<line x1="160" x2="1000" y1="${Y(v)}" y2="${Y(v)}" stroke="${C.line}"/>`+text(135,Y(v)+6,String(v),{anchor:'end',size:18});
 for(let v=0;v<=6;v++)b+=text(X(v),585,String(v),{anchor:'middle',size:18});
 b+=`<path d="M160 ${Y(12)} H1000" fill="none" stroke="${C.muted}" stroke-width="3" stroke-dasharray="8 6"/><path d="M160 ${Y(8)} L1000 ${Y(14)}" fill="none" stroke="${C.accent}" stroke-width="4"/><circle cx="${X(4)}" cy="${Y(12)}" r="8" fill="${C.accent}"/>`;
 b+=text(165,145,'Total cost units',{size:19,fill:C.muted})+text(780,220,'Mixed: 8 + repair',{size:20,fill:C.accent})+text(175,Y(12)-15,'Single-model baseline: 12',{size:19,fill:C.muted})+text(X(4)-20,Y(12)+40,'Break-even: 4',{size:20,anchor:'end',fill:C.accent})+text(580,623,'Additional mixed-workflow repair cost',{size:20,anchor:'middle'});
 return svg('How much repair can the saving absorb?',b,{subtitle:'Synthetic sensitivity analysis · baseline held fixed for this example'});
 }
 };
}
