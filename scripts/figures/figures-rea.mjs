export default function(C, {text, rect, arrow, svg}) {
  const label=(x,y,s)=>text(x,y,s,{size:14,fill:C.muted});
  return {
    "before-the-agent-rewrites-it/evidence":()=>{
      let b=rect(48,130,430,410)+text(72,168,"OBSERVATION / fixture A",{size:16,fill:C.accent});
      b+=label(72,213,"Input field")+text(72,250,"Acme, Inc.",{size:28});
      b+=label(72,306,"Exported field")+text(72,343,'"Acme, Inc."',{size:28});
      b+=text(72,407,"One observation.",{size:22})+text(72,440,"Two possible explanations.",{size:22});
      b+=arrow(478,265,562,220)+arrow(478,340,562,370);
      b+=rect(580,145,570,120)+text(604,181,"Hypothesis A",{size:17,fill:C.accent})+text(604,219,"The exporter quotes every field.",{size:23});
      b+=rect(580,300,570,120)+text(604,336,"Hypothesis B",{size:17,fill:C.accent})+text(604,374,"It quotes fields containing delimiters.",{size:23});
      b+=rect(580,460,570,115,{fill:C.soft})+text(604,496,"NEXT PROBE: a plain name",{size:17,fill:C.accent})+text(604,536,'A predicts "Acme"     B predicts Acme',{size:21});
      b+=label(48,599,"Keep both hypotheses until an observation distinguishes them.");
      return svg("A plausible explanation still needs a distinguishing test",b,{subtitle:"Synthetic CSV investigation · evidence and interpretation stay separate"});
    },
    "before-the-agent-rewrites-it/comparison":()=>{
      let b=rect(48,135,250,160,{fill:C.soft})+text(70,175,"Shared fixtures",{size:25})+label(70,214,"Input + version + state")+label(70,245,"Same conditions for both");
      b+=arrow(298,185,405,170)+arrow(298,245,405,295);
      b+=rect(422,130,320,80)+text(446,179,"Original exporter",{size:24});
      b+=rect(422,255,320,80)+text(446,304,"Proposed replacement",{size:24});
      b+=arrow(742,170,865,212)+arrow(742,295,865,245);
      b+=rect(880,180,270,105,{fill:C.soft})+text(901,222,"Compare outputs",{size:22})+label(901,254,"Preserve any difference");
      b+=rect(48,385,1102,205);
      const cols=[72,380,665,965];
      ["Fixture","Original","Replacement","Result"].forEach((s,i)=>b+=label(cols[i],421,s));
      [["Plain name","Acme","Acme","MATCH",C.green],["Name with comma",'"Acme, Inc."',"Acme, Inc.","DIFF",C.red],["Other locale","Not run","Not run","UNKNOWN",C.muted]].forEach((r,i)=>{let y=466+i*47; r.slice(0,4).forEach((s,j)=>b+=text(cols[j],y,s,{size:20,fill:j===3?r[4]:C.ink}));});
      return svg("An explanation is a starting point for comparison",b,{subtitle:"Proposed workflow · illustrative outcomes, not measured REA results"});
    }
  };
}
