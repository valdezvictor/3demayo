"use client"
import { useEffect, useState } from "react"
const CATS=[{key:"Todo",label:"Todo"},{key:"agave",label:"Agaves"},{key:"producer",label:"Productores"},{key:"region",label:"Regiones"},{key:"gastronomy",label:"Gastronomia"},{key:"editorial",label:"Editorial"}]
const ICONS:Record<string,string>={"agave":"🌵","producer":"🏭","region":"🗺️","gastronomy":"🍽️","editorial":"📝"}
export default function BlogPage(){
  const [articles,setArticles]=useState<any[]>([])
  const [cat,setCat]=useState("Todo")
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    setLoading(true)
    const q=cat&&cat!=="Todo"?"?category="+cat:""
    fetch("/api/blog"+q).then(r=>r.json()).then((d:any)=>{setArticles(d.articles||[]);setLoading(false)}).catch(()=>setLoading(false))
  },[cat])
  return(
    <main style={{maxWidth:1100,margin:"0 auto",padding:"2rem 1rem"}}>
      <h1 style={{fontSize:"2.2rem",fontWeight:700,marginBottom:"0.5rem"}}>Blog & Editorial</h1>
      <p style={{color:"#666",marginBottom:"2rem"}}>Historias, conocimiento y cultura del mezcal artesanal</p>
      <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap",marginBottom:"2rem"}}>
        {CATS.map(c=>(
          <button key={c.key} onClick={()=>setCat(c.key)} style={{padding:"0.5rem 1.25rem",borderRadius:"2rem",border:"2px solid",cursor:"pointer",fontWeight:500,borderColor:cat===c.key?"#b45309":"#e2d5c0",background:cat===c.key?"#b45309":"white",color:cat===c.key?"white":"#333"}}>{c.label}</button>
        ))}
      </div>
      {loading?<p style={{color:"#999"}}>Cargando...</p>:(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.5rem"}}>
          {articles.length===0&&<p style={{color:"#999"}}>No hay articulos.</p>}
          {articles.map((a:any)=>(
            <a key={a.slug} href={"/blog/"+a.slug} style={{textDecoration:"none",color:"inherit"}}>
              <div style={{border:"1px solid #e2d5c0",borderRadius:12,overflow:"hidden",background:"white"}}>
                <div style={{background:"linear-gradient(135deg,#fef3c7,#fde68a)",height:140,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"3.5rem"}}>{ICONS[a.category]||"📝"}</div>
                <div style={{padding:"1.25rem"}}>
                  <span style={{fontSize:"0.75rem",color:"#b45309",fontWeight:600,textTransform:"uppercase"}}>{a.category}</span>
                  <h2 style={{fontSize:"1.1rem",fontWeight:700,margin:"0.5rem 0",lineHeight:1.3}}>{a.title_es}</h2>
                  <p style={{fontSize:"0.9rem",color:"#555",lineHeight:1.5,margin:"0 0 0.75rem"}}>{a.excerpt_es}</p>
                  <p style={{fontSize:"0.8rem",color:"#999"}}>{a.author}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  )
}
