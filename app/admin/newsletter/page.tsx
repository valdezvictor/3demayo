"use client"
import { useEffect, useState } from "react"
type Tab="articles"|"cocktails"|"subscribers"
export default function NewsletterAdmin(){
  const [tab,setTab]=useState<Tab>("articles")
  const [data,setData]=useState<Record<string,any>>({})
  const [loading,setLoading]=useState(false)
  const load=async(t:Tab)=>{
    setLoading(true)
    const r=await fetch("/api/admin/newsletter?type="+t)
    const d=await r.json()
    setData((prev:Record<string,any>)=>({...prev,[t]:d}));setLoading(false)
  }
  useEffect(()=>{load(tab)},[tab])
  const toggle=async(table:string,id:number,field:string,cur:boolean)=>{
    await fetch("/api/admin/newsletter",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({table,id,field,value:!cur})})
    load(tab)
  }
  const TABS=[{key:"articles" as Tab,label:"Articulos"},{key:"cocktails" as Tab,label:"Cocteles"},{key:"subscribers" as Tab,label:"Suscriptores"}]
  const articles:any[]=(data as any).articles?.articles||[]
  const cocktails:any[]=(data as any).cocktails?.cocktails||[]
  const subscribers:any[]=(data as any).subscribers?.subscribers||[]
  return(
    <main style={{padding:"2rem"}}>
      <h1 style={{fontSize:"1.75rem",fontWeight:800,marginBottom:"1.5rem"}}>Newsletter Admin</h1>
      <div style={{display:"flex",gap:"1rem",marginBottom:"2rem",borderBottom:"2px solid #e2d5c0"}}>
        {TABS.map(t=>(<button key={t.key} onClick={()=>setTab(t.key)} style={{padding:"0.6rem 1.5rem",border:"none",background:"none",cursor:"pointer",fontWeight:600,borderBottom:tab===t.key?"3px solid #b45309":"3px solid transparent",color:tab===t.key?"#b45309":"#666",marginBottom:-2,fontSize:"0.95rem"}}>{t.label}</button>))}
      </div>
      {loading?<p style={{color:"#999"}}>Cargando...</p>:(
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.9rem"}}>
          <tbody>
            {tab==="articles"&&articles.map((a:any)=>(
              <tr key={a.id} style={{borderBottom:"1px solid #f5efe6"}}>
                <td style={{padding:"0.75rem",color:"#888",fontSize:"0.8rem"}}>{a.slug}</td>
                <td style={{padding:"0.75rem",fontWeight:500}}>{a.title_es}</td>
                <td style={{padding:"0.75rem"}}><button onClick={()=>toggle("dm_articles",a.id,"is_published",a.is_published)} style={{padding:"0.3rem 0.9rem",borderRadius:4,border:"none",cursor:"pointer",fontWeight:500,background:a.is_published?"#22c55e":"#94a3b8",color:"white"}}>{a.is_published?"Publicado":"Borrador"}</button></td>
              </tr>
            ))}
            {tab==="cocktails"&&cocktails.map((c:any)=>(
              <tr key={c.id} style={{borderBottom:"1px solid #f5efe6"}}>
                <td style={{padding:"0.75rem",color:"#888",fontSize:"0.8rem"}}>{c.slug}</td>
                <td style={{padding:"0.75rem",fontWeight:500}}>{c.name_es}</td>
                <td style={{padding:"0.75rem"}}><button onClick={()=>toggle("dm_cocktails",c.id,"is_published",c.is_published)} style={{padding:"0.3rem 0.9rem",borderRadius:4,border:"none",cursor:"pointer",fontWeight:500,background:c.is_published?"#22c55e":"#94a3b8",color:"white"}}>{c.is_published?"Publicado":"Oculto"}</button></td>
              </tr>
            ))}
            {tab==="subscribers"&&subscribers.map((s:any)=>(
              <tr key={s.id} style={{borderBottom:"1px solid #f5efe6"}}>
                <td style={{padding:"0.75rem",fontWeight:500}}>{s.email}</td>
                <td style={{padding:"0.75rem",color:"#888"}}>{s.name||"—"}</td>
                <td style={{padding:"0.75rem",color:"#888"}}>{s.source}</td>
                <td style={{padding:"0.75rem"}}><button onClick={()=>toggle("subscribers",s.id,"is_active",s.is_active)} style={{padding:"0.3rem 0.9rem",borderRadius:4,border:"none",cursor:"pointer",fontWeight:500,background:s.is_active?"#22c55e":"#94a3b8",color:"white"}}>{s.is_active?"Activo":"Inactivo"}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}
