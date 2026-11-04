"use client"
import { useEffect, useState } from "react"
export default function AgavesPage(){
  const [agaves,setAgaves]=useState<any[]>([])
  const [q,setQ]=useState("")
  useEffect(()=>{fetch("/api/admin/agaves").then(r=>r.json()).then((d:any)=>Array.isArray(d)&&setAgaves(d))},[q])
  const filtered=agaves.filter((a:any)=>!q||(a.name||"").toLowerCase().includes(q.toLowerCase())||(a.scientific_name||"").toLowerCase().includes(q.toLowerCase()))
  return(
    <main style={{maxWidth:1100,margin:"0 auto",padding:"2rem 1rem"}}>
      <div style={{background:"linear-gradient(135deg,#92400e,#b45309)",borderRadius:16,padding:"3rem 2rem",color:"white",marginBottom:"2rem",textAlign:"center"}}>
        <h1 style={{fontSize:"2.5rem",fontWeight:800,marginBottom:"0.5rem"}}>Enciclopedia de Agaves</h1>
        <p style={{opacity:0.9,fontSize:"1.1rem"}}>{agaves.length} variedades documentadas</p>
      </div>
      <div style={{background:"#fef3c7",border:"2px solid #f59e0b",borderRadius:10,padding:"1rem 1.5rem",marginBottom:"2rem",display:"flex",alignItems:"center",gap:"1rem"}}>
        <span style={{fontSize:"1.5rem"}}>🚧</span>
        <div><strong>PROXIMAMENTE:</strong> Guias detalladas de cada agave. <a href="/register" style={{color:"#b45309",fontWeight:600}}>Registrate para ser el primero</a></div>
      </div>
      <input value={q} onChange={(e:any)=>setQ(e.target.value)} placeholder="Buscar agave..." style={{width:"100%",padding:"0.75rem 1rem",border:"2px solid #e2d5c0",borderRadius:8,fontSize:"1rem",marginBottom:"1.5rem",boxSizing:"border-box" as any}}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"1rem"}}>
        {filtered.map((a:any)=>(
          <div key={a.id} style={{border:"1px solid #e2d5c0",borderRadius:10,padding:"1.25rem",background:"white"}}>
            <h3 style={{fontWeight:700,fontSize:"1rem",margin:"0 0 0.5rem",lineHeight:1.3}}>{a.name}</h3>
            {a.scientific_name&&<p style={{fontSize:"0.8rem",color:"#888",fontStyle:"italic",margin:"0 0 0.5rem"}}>{a.scientific_name}</p>}
            {a.maturation_years&&<p style={{fontSize:"0.8rem",color:"#555",margin:"0 0 0.25rem"}}>{a.maturation_years} anos de maduracion</p>}
          </div>
        ))}
      </div>
      <p style={{textAlign:"center",color:"#999",marginTop:"2rem",fontSize:"0.9rem"}}>Mostrando {filtered.length} de {agaves.length} variedades</p>
    </main>
  )
}
