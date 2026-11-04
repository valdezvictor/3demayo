"use client"
import { useEffect, useState } from "react"
export default function CocktailsPage(){
  const [cocktails,setCocktails]=useState<any[]>([])
  const [active,setActive]=useState<any>(null)
  useEffect(()=>{fetch("/api/cocktails").then(r=>r.json()).then((d:any)=>{if(Array.isArray(d)){setCocktails(d);if(d.length)setActive(d[0])}})},[active])
  return(
    <main style={{maxWidth:1100,margin:"0 auto",padding:"2rem 1rem"}}>
      <h1 style={{fontSize:"2.2rem",fontWeight:700,marginBottom:"0.5rem"}}>Cocteleria con Mezcal</h1>
      <p style={{color:"#666",marginBottom:"2rem"}}>Recetas inspiradas en la tradicion mezcalera artesanal</p>
      <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:"2rem",alignItems:"start"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>
          {cocktails.map((c:any)=>(
            <div key={c.slug} onClick={()=>setActive(c)} style={{padding:"1rem 1.25rem",border:"2px solid",borderRadius:10,cursor:"pointer",borderColor:active&&active.slug===c.slug?"#b45309":"#e2d5c0",background:active&&active.slug===c.slug?"#fef9f0":"white"}}>
              <div style={{fontWeight:700}}>{c.name_es}</div>
              <div style={{fontSize:"0.8rem",color:"#888",marginTop:"0.25rem"}}>{c.agave_base}</div>
            </div>
          ))}
        </div>
        {active&&(
          <div style={{border:"1px solid #e2d5c0",borderRadius:12,padding:"2rem",background:"white"}}>
            <h2 style={{fontSize:"1.8rem",fontWeight:800,marginBottom:"0.5rem"}}>{active.name_es}</h2>
            <p style={{color:"#555",lineHeight:1.6,marginBottom:"1.5rem"}}>{active.description_es}</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem"}}>
              <div>
                <h3 style={{fontWeight:700,color:"#b45309",marginBottom:"0.75rem",fontSize:"1rem"}}>Ingredientes</h3>
                <ul style={{listStyle:"none",padding:0,margin:0}}>
                  {(active.ingredients_es||[]).map((ing:string,i:number)=>(<li key={i} style={{padding:"0.4rem 0",borderBottom:"1px solid #f5efe6",fontSize:"0.95rem"}}>{ing}</li>))}
                </ul>
              </div>
              <div>
                <h3 style={{fontWeight:700,color:"#b45309",marginBottom:"0.75rem",fontSize:"1rem"}}>Preparacion</h3>
                <ol style={{paddingLeft:"1.25rem",margin:0}}>
                  {(active.steps_es||[]).map((s:string,i:number)=>(<li key={i} style={{marginBottom:"0.6rem",fontSize:"0.95rem",lineHeight:1.5}}>{s}</li>))}
                </ol>
              </div>
            </div>
            <div style={{marginTop:"1.5rem",padding:"1rem 1.25rem",background:"#fef9f0",borderRadius:8,display:"flex",gap:"1.5rem",flexWrap:"wrap",fontSize:"0.9rem"}}>
              <span><strong>Copa:</strong> {active.glass_type}</span>
              <span><strong>Tiempo:</strong> {active.prep_time_min} min</span>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
