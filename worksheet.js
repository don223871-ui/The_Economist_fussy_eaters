const params=new URLSearchParams(location.search);
const file=params.get("file");
const content=document.getElementById("content");
const meta=document.getElementById("meta");
if(!file){content.innerHTML="<p>Worksheet not found.</p>";}
else{
  const safeFile=file.split("/").pop();
  meta.textContent=safeFile.replace(/\.md$/i,"").replace(/_/g," ");
  document.title=meta.textContent+" · Authentic English";
  fetch(safeFile)
    .then(r=>{if(!r.ok) throw new Error("Unable to load worksheet"); return r.text();})
    .then(md=>{content.innerHTML=marked.parse(md,{gfm:true,breaks:false});})
    .catch(()=>{content.innerHTML="<p>Unable to load this worksheet.</p>";});
}