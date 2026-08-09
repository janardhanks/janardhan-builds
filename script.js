const grid=document.getElementById("projectGrid"), filters=document.getElementById("filters");
const cats=["All",...new Set(PROJECTS.map(p=>p.category))];
filters.innerHTML=cats.map((c,i)=>`<button class="filter ${i===0?"active":""}" data-cat="${c}">${c}</button>`).join("");
function esc(s){return (s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function render(cat="All"){
  const list=cat==="All"?PROJECTS:PROJECTS.filter(p=>p.category===cat);
  grid.innerHTML=list.map((p,i)=>`<article class="project">
    <div class="cover" style="${p.image?`background-image:linear-gradient(135deg,rgba(12,12,12,.72),rgba(8,8,8,.9)),url('${esc(p.image)}');background-size:cover;background-position:center;`:""}">
      <span class="cover-number">${String(PROJECTS.indexOf(p)+1).padStart(2,"0")}</span><span class="cover-title">${esc(p.name)}</span>
    </div>
    <div class="project-body"><div class="project-top"><div><h3>${esc(p.name)}</h3></div><span class="status">${esc(p.status)}</span></div>
      <p>${esc(p.description)}</p><div class="tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join("")}</div>
      <div class="links">${p.live?`<a href="${esc(p.live)}" target="_blank" rel="noreferrer">Live Project ↗</a>`:""}${p.github?`<a href="${esc(p.github)}" target="_blank" rel="noreferrer">GitHub ↗</a>`:""}${!p.live&&!p.github?`<a href="https://github.com/janardhanks" target="_blank" rel="noreferrer">Project files ↗</a>`:""}</div>
    </div></article>`).join("");
}
filters.addEventListener("click",e=>{if(!e.target.matches(".filter"))return;document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));e.target.classList.add("active");render(e.target.dataset.cat)});
render();
