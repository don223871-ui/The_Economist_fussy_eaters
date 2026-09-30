const W=[
["ARTICLE RECALL & LEARNING CHECK.md","Article Recall & Learning Check","ARTICLE RECALL & LEARNING CHECK_ANSWER KEY.md"],
["01_Grammar_in_Context_Core.md","01 · Grammar in Context · Core","01_Grammar_in_Context_Core_ANSWER KEY.md"],
["02_Grammar_in_Context_Advanced.md","02 · Grammar in Context · Advanced","02_Grammar_in_Context_Advanced_ANSWER KEY.md"],
["03_Grammar_in_Context_Cambridge_Style.md","03 · Grammar in Context · Cambridge-Style","03_Grammar_in_Context_Cambridge_Style_ANSWER KEY.md"],
["04_Grammar_Pattern_Progression_A2_to_C3Plus.md","04 · Grammar Pattern Progression · A2 → C3+","04_Grammar_Pattern_Progression_A2_to_C3Plus_ANSWER KEY.md"],
["05_Sentence_Building_Progression_A2_to_C3Plus.md","05 · Sentence-Building Progression · A2 → C3+","05_Sentence_Building_Progression_A2_to_C3Plus_ANSWER KEY.md"],
["06_Vocabulary_in_Context_A2_to_C3Plus.md","06 · Vocabulary in Context · A2 → C3+","06_Vocabulary_in_Context_A2_to_C3Plus_ANSWER KEY.md"]
];
const p=new URLSearchParams(location.search),f=p.get("file"),i=W.findIndex(x=>x[0]===f),c=document.getElementById("content"),m=document.getElementById("meta");
const ap=document.getElementById("answerLinkTop");
const ab=document.getElementById("answerLinkBottom");
const pv=[document.getElementById("prevLinkTop"),document.getElementById("prevLinkBottom")];
const nx=[document.getElementById("nextLinkTop"),document.getElementById("nextLinkBottom")];
const pt=[document.getElementById("prevTitleTop"),document.getElementById("prevTitleBottom")];
const nt=[document.getElementById("nextTitleTop"),document.getElementById("nextTitleBottom")];
const top=document.getElementById("toTop");
if(i<0){c.innerHTML="<p>Worksheet not found.</p>";document.querySelectorAll(".answer-bar").forEach(x=>x.style.display="none");}
else{
 const x=W[i];m.textContent=x[1];document.title=x[1]+" · Authentic English";
 fetch(x[0]).then(r=>r.ok?r.text():Promise.reject()).then(t=>c.innerHTML=marked.parse(t,{gfm:true,breaks:false})).catch(()=>c.innerHTML="<p>Unable to load this worksheet.</p>");
 const answer="worksheet.html?file="+encodeURIComponent(x[2]);ap.href=answer;ab.href=answer;
 if(i>0){const u="worksheet.html?file="+encodeURIComponent(W[i-1][0]);pv.forEach((e,n)=>{e.href=u;pt[n].textContent=W[i-1][1];});}
 else{pv.forEach((e,n)=>{e.style.opacity=".35";e.style.pointerEvents="none";pt[n].textContent="Start";});}
 if(i<W.length-1){const u="worksheet.html?file="+encodeURIComponent(W[i+1][0]);nx.forEach((e,n)=>{e.href=u;nt[n].textContent=W[i+1][1];});}
 else{nx.forEach((e,n)=>{e.style.opacity=".35";e.style.pointerEvents="none";nt[n].textContent="End";});}
}
window.addEventListener("scroll",()=>top.classList.toggle("show",scrollY>500));
top.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));