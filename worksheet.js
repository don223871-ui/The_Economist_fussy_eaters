const W=[
["ARTICLE RECALL & LEARNING CHECK.md","Article Recall & Learning Check","ARTICLE RECALL & LEARNING CHECK_ANSWER KEY.md"],
["01_Grammar_in_Context_Core.md","01 · Grammar in Context · Core","01_Grammar_in_Context_Core_ANSWER KEY.md"],
["02_Grammar_in_Context_Advanced.md","02 · Grammar in Context · Advanced","02_Grammar_in_Context_Advanced_ANSWER KEY.md"],
["03_Grammar_in_Context_Cambridge_Style.md","03 · Grammar in Context · Cambridge-Style","03_Grammar_in_Context_Cambridge_Style_ANSWER KEY.md"],
["04_Grammar_Pattern_Progression_A2_to_C3Plus.md","04 · Grammar Pattern Progression · A2 → C3+","04_Grammar_Pattern_Progression_A2_to_C3Plus_ANSWER KEY.md"],
["05_Sentence_Building_Progression_A2_to_C3Plus.md","05 · Sentence-Building Progression · A2 → C3+","05_Sentence_Building_Progression_A2_to_C3Plus_ANSWER KEY.md"],
["06_Vocabulary_in_Context_A2_to_C3Plus.md","06 · Vocabulary in Context · A2 → C3+","06_Vocabulary_in_Context_A2_to_C3Plus_ANSWER KEY.md"]
];

const params=new URLSearchParams(window.location.search);
const file=params.get("file")||"";
const worksheetIndex=W.findIndex(x=>x[0]===file);
const answerIndex=W.findIndex(x=>x[2]===file);
const isAnswer=answerIndex!==-1;
const index=isAnswer?answerIndex:worksheetIndex;

const $=id=>document.getElementById(id);
const content=$("content");
const meta=$("meta");
const toTop=$("toTop");

function page(file){
  return "worksheet.html?file="+encodeURIComponent(file);
}

function setNav(prev,next){
  const prevEls=[$("prevLinkTop"),$("prevLinkBottom")];
  const nextEls=[$("nextLinkTop"),$("nextLinkBottom")];
  const prevTitles=[$("prevTitleTop"),$("prevTitleBottom")];
  const nextTitles=[$("nextTitleTop"),$("nextTitleBottom")];

  prevEls.forEach((el,n)=>{
    if(prev){
      el.href=page(prev[0]);
      el.removeAttribute("aria-disabled");
      el.style.opacity="";
      el.style.pointerEvents="";
      prevTitles[n].textContent=prev[1];
    }else{
      el.href="#";
      el.setAttribute("aria-disabled","true");
      el.style.opacity=".35";
      el.style.pointerEvents="none";
      prevTitles[n].textContent="Start";
    }
  });

  nextEls.forEach((el,n)=>{
    if(next){
      el.href=page(next[0]);
      el.removeAttribute("aria-disabled");
      el.style.opacity="";
      el.style.pointerEvents="";
      nextTitles[n].textContent=next[1];
    }else{
      el.href="#";
      el.setAttribute("aria-disabled","true");
      el.style.opacity=".35";
      el.style.pointerEvents="none";
      nextTitles[n].textContent="End";
    }
  });
}

function renderMarkdown(text){
  if(window.marked && typeof window.marked.parse==="function"){
    return window.marked.parse(text,{gfm:true,breaks:false});
  }
  return "<pre class='markdown-fallback'>"+text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</pre>";
}

async function loadMarkdown(name){
  const rawUrl="https://raw.githubusercontent.com/don223871-ui/The_Economist_fussy_eaters/main/"+encodeURIComponent(name);
  let response=await fetch(rawUrl,{cache:"no-store"});
  if(response.ok) return response.text();

  response=await fetch("./"+encodeURIComponent(name),{cache:"no-store"});
  if(response.ok) return response.text();

  throw new Error("The worksheet file could not be loaded.");
}

function showError(message){
  content.innerHTML="<div class='load-error'><strong>"+message+"</strong><p>Please refresh the page once and try again.</p></div>";
}

async function init(){
  if(!content || !meta) return;

  if(index<0){
    meta.textContent="WORKSHEET";
    showError("Worksheet not found.");
    document.querySelectorAll(".answer-bar").forEach(el=>el.hidden=true);
    return;
  }

  const item=W[index];
  meta.textContent=isAnswer?item[1]+" · ANSWER KEY":item[1];
  document.title=(isAnswer?item[1]+" · Answer Key":item[1])+" · Authentic English";

  setNav(index>0?W[index-1]:null,index<W.length-1?W[index+1]:null);

  if(isAnswer){
    const worksheetUrl=page(item[0]);
    const labels=[$("answerLabelTop"),$("answerLabelBottom")];
    const prompts=[$("answerPromptTop"),$("answerPromptBottom")];
    const links=[$("answerLinkTop"),$("answerLinkBottom")];

    labels.forEach(el=>{if(el) el.textContent="WORKSHEET";});
    prompts.forEach(el=>{if(el) el.textContent="Return to the worksheet you are checking.";});
    links.forEach(el=>{
      if(!el) return;
      el.href=worksheetUrl;
      el.innerHTML='Open Worksheet <span>→</span>';
      el.classList.add("return-button");
    });
  }else{
    const answerUrl=page(item[2]);
    $("answerLinkTop").href=answerUrl;
    $("answerLinkBottom").href=answerUrl;
  }

  content.innerHTML="<p class='loading'>Loading worksheet…</p>";

  try{
    const text=await loadMarkdown(file);
    content.innerHTML=renderMarkdown(text);
  }catch(error){
    showError(error.message);
  }
}

window.addEventListener("scroll",()=>{
  if(toTop) toTop.classList.toggle("show",window.scrollY>500);
});

if(toTop){
  toTop.addEventListener("click",event=>{
    event.preventDefault();
    window.scrollTo({top:0,behavior:"smooth"});
  });
}

document.addEventListener("DOMContentLoaded",init);