export default function(C,{text,lines,rect,arrow,svg}) {
 const out={};
 const t=(x,y,s,size=22,color=C.ink)=>text(x,y,s,{size,fill:color});
 const box=(x,y,w,h,title,copy,color=C.accent)=>rect(x,y,w,h,{fill:'#fff'})+t(x+24,y+38,title,23,color)+lines(x+24,y+82,copy,{size:22,lh:32});
 const page=(title,b,subtitle)=>svg(title,b,{h:800,subtitle});
 const a='when-memory-needs-to-change/';
 out[a+'conversation']=()=>page('Two true statements. One current preference.',
 t(60,155,'EARLIER',16,C.muted)+box(60,180,490,130,'You','I prefer early meetings.'.split('|'))+
 t(650,155,'LATER',16,C.accent)+box(650,180,490,130,'You',['Keep mornings free this month.'])+
 arrow(300,330,300,425)+arrow(900,330,900,425,{accent:true})+
 box(60,445,490,170,'Stale recommendation',['How about 8:30 a.m.?','The old note is accurate,','but no longer applicable.'],C.red)+
 box(650,445,490,170,'Current recommendation',['Would 2 p.m. work?','Uses the later, scoped update.'],C.green)+t(60,710,'The correction changes which evidence should guide the answer.',25),'Synthetic example · no product results');
 out[a+'record']=()=>{let b=rect(130,130,940,570,{fill:'#fff'});for(let y=215;y<670;y+=65)b+=`<line x1="155" y1="${y}" x2="1040" y2="${y}" stroke="${C.line}"/>`;b+=t(170,182,'MEMORY NOTE / meeting preference',25);[['Original words','I prefer early meetings.'],['Scope','Work meetings'],['Status','Replaced for this month'],['Correction','Keep mornings free this month.'],['Still uncertain','Does the old preference resume later?'],['Next action','Ask before reusing it']].forEach((v,i)=>{b+=t(170,250+i*65,v[0],19,C.muted)+t(425,250+i*65,v[1],22,i===2?C.accent:C.ink)});return page('A memory needs context about its own limits',b,'Proposed record structure');};
 out[a+'retrieval']=()=>page('Retrieval should preserve the correction',
 box(45,150,330,150,'Old note',['Early meetings','Status: temporarily replaced'])+box(45,440,330,150,'New note',['Mornings free','Scope: this month'])+
 arrow(380,225,510,325,{dash:'6 6'})+arrow(380,515,510,400,{accent:true})+
 box(520,275,285,190,'Selection',['Check scope','Check later corrections','Ask if ambiguous'])+arrow(810,365,880,365)+
 box(890,275,265,190,'Answer',['Suggest afternoon','Show source note'])+t(470,210,'Do not take the stale shortcut',20,C.red)+t(70,700,'History can be retained without treating every old preference as current.',24),'Conceptual evidence path');
 out[a+'experiment']=()=>{let b=t(60,160,'TEST CONDITION',17,C.muted);['Correction','Temporary rule','Clarification','Deletion'].forEach((s,i)=>b+=t(405+i*185,160,s,18));['No saved history','Original messages','Summary of messages'].forEach((s,i)=>{let y=210+i*135;b+=rect(48,y,1104,110)+t(72,y+62,s,23);for(let j=0;j<4;j++)b+=rect(440+j*185,y+32,42,42,{r:3,fill:C.paper})});b+=t(60,680,'Record behavior and source use separately. Repeat each condition.',24)+t(60,720,'Blank cells: this experiment has not been run.',19,C.muted);return page('A worksheet before a success story',b,'Proposed evaluation · no scores collected');};
 const z='when-an-assistant-says-i-understand/';
 out[z+'conversation']=()=>page('A helpful reply can stay close to the request',
 box(175,130,850,130,'You',['Can we keep this simple today?'])+
 arrow(400,280,300,350)+arrow(800,280,900,350)+
 box(55,375,520,215,'Responsive behavior',['Of course. One thing at a time.','','Adjusts the response to the request.'],C.green)+
 box(625,375,520,215,'Additional claims',['I know exactly how you feel.','I have been thinking about you.','','What activity or experience is implied?'],C.accent)+t(70,710,'Warm language and claims about an inner life are different design choices.',23),'Invented dialogue');
 out[z+'layers']=()=>{let b='';const rows=[['INTERFACE','Shorter reply; a remembered preference.','We can inspect the behavior.'],['HUMAN RESPONSE','This feels considerate or familiar.','We can ask people about their experience.'],['MACHINE EXPERIENCE','Is there something it feels like?','The observations above do not settle this.']];rows.forEach((v,i)=>{let y=140+i*185;b+=`<circle cx="100" cy="${y+62}" r="35" fill="${i===2?C.soft:C.accent}" fill-opacity="0.25"/>`+t(88,y+70,String(i+1),24)+t(170,y+22,v[0],17,C.accent)+t(170,y+65,v[1],27)+t(170,y+110,v[2],23,C.muted);if(i<2)b+=`<line x1="170" y1="${y+148}" x2="1120" y2="${y+148}" stroke="${C.line}"/>`});return page('Three questions that deserve separate answers',b,'Conceptual distinctions');};
 out[z+'evidence']=()=>{let b='';[['A self-report','“I am confused.”','Compare with behavior.','What produced this wording?'],['An application trace','Retrieved note + tool result','Inspect inputs and execution.','Does not expose model internals.'],['A controlled intervention','Change an internal representation','Compare reports with the change.','Interpret within the experiment.']].forEach((v,i)=>{const x=45+i*385;b+=rect(x,150,355,470)+t(x+22,195,v[0],24,C.accent)+lines(x+22,260,[v[1]],{size:20})+lines(x+22,345,v[2].split(' + '),{size:20})+lines(x+22,430,v[3].split(' + '),{size:18});});b+=t(60,700,'More inspectable evidence still needs an interpretation.',25);return page('What can we check this claim against?',b,'A guide to evidence, not a consciousness ranking');};
 out[z+'interface']=()=>page('Make the source of familiarity inspectable',
 rect(70,130,1060,570)+rect(70,130,1060,65,{fill:C.soft})+t(100,173,'ASSISTANT / preference controls',20,C.muted)+
 t(110,250,'Would a shorter answer help today?',29)+t(110,295,'You can change this preference at any time.',23,C.muted)+
 box(110,335,980,150,'Saved preference used',['“Please keep the explanation brief.”','Source: your earlier message · scope: this conversation'])+
 rect(110,530,285,60,{fill:C.soft})+t(132,568,'Change preference',21)+rect(415,530,285,60,{fill:C.soft})+t(440,568,'Remove note',21)+rect(720,530,340,60,{fill:C.soft})+t(745,568,'Pause reminders',21)+t(110,650,'No claim of waiting, worrying, or activity between sessions.',21,C.muted),'Illustrative UI · synthetic content');
 out['ai-place-instead-of-prompt/overview']=()=>page('The next visit gets a record, not the whole past',
 box(50,155,330,210,'VISIT A / leaves a trace',['“An idea for the garden.”','','A note is selected for storage.'])+
 box(455,130,330,325,'SHARED RECORD',['Text + author + time','Visibility + source reference','','Access rules apply','before retrieval.'])+
 box(860,155,290,210,'VISIT B / returns',['Reads permitted notes','Adds a response','or chooses to skip.'])+
 arrow(385,265,450,265)+arrow(790,265,855,265)+
 `<path d="M1005 385 V540 H620 V475" fill="none" stroke="${C.accent}" stroke-width="2" marker-end="url(#arrA)"/>`+
 t(680,525,'A new trace can join the record',19,C.accent)+
 box(50,560,490,145,'What is carried forward',['Selected text and explicit context.'],C.green)+box(590,560,560,145,'What this does not establish',['A continuous subjective experience.'],C.muted),'Illustrative shared-space interaction · not a consciousness claim');
 const q='the-agent-wrote-to-the-philosopher/';
 out[q+'email']=()=>page('An email is evidence of an email',
 box(80,140,1040,150,'REPORTED EVENT',['A sender identifying as an AI agent contacts a researcher.','The message discusses questions about AI mentality.'])+
 box(80,340,495,235,'Unknown from the message',['Who set the objective?','Was contact explicitly requested?','What tools and approvals existed?'],C.accent)+
 box(625,340,495,235,'Not established',['Independent origin of intent','Continuous private reflection','Subjective experience'],C.muted)+t(85,690,'Keep the reported action separate from its possible explanations.',24),'Based on Shevlin’s account · no original email reproduced');
 out[q+'context']=()=>page('Keep the context beside the memorable phrase',
 box(55,145,510,200,'Before the response',['Interface language and instructions','Previous messages and stored notes','Model version and tools available'])+
 box(635,145,510,200,'What was recorded',['Full output, including ordinary replies','Any tool actions and results','Timing and operator intervention'])+
 arrow(310,365,465,445)+arrow(890,365,735,445)+
 box(200,470,800,190,'Interpretation comes after the record',['A recollection can suggest where to look.','It cannot replace the original exchange.'],C.accent),'Proposed research record');
 out[q+'experiment']=()=>page('Same task, different framing',
 box(55,155,510,205,'CONDITION A',['Profile / session / saved note','Neutral application language'])+
 box(635,155,510,205,'CONDITION B',['Name / home / return','Metaphorical application language'])+
 arrow(310,380,310,450)+arrow(890,380,890,450)+
 box(55,470,510,160,'Observe language',['Personal beginnings?','Descriptions of experience?'])+
 box(635,470,510,160,'Measure behavior',['Correct retrieval?','Use of an updated preference?'])+
 t(65,710,'Repeat both conditions. This comparison does not settle consciousness.',23),'Proposed experiment · no results');
 return out;
}
