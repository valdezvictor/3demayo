"use client"
import { useState } from "react"
export default function RegisterPage(){
  const [email,setEmail]=useState("")
  const [name,setName]=useState("")
  const [status,setStatus]=useState<"idle"|"loading"|"ok"|"err">("idle")
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();setStatus("loading")
    try{
      const r=await fetch("/api/subscribe",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,name,source:"register-page"})})
      setStatus(r.ok?"ok":"err")
    }catch{setStatus("err")}
  }
  return(
    <main style={{maxWidth:500,margin:"4rem auto",padding:"0 1rem"}}>
      <div style={{background:"white",border:"1px solid #e2d5c0",borderRadius:16,padding:"2.5rem"}}>
        {status==="ok"?(
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🎉</div>
            <h1 style={{fontSize:"1.75rem",fontWeight:800,color:"#b45309",marginBottom:"1rem"}}>Ya eres parte de la comunidad!</h1>
            <p style={{color:"#555",lineHeight:1.6}}>Recibiras articulos, recetas y guias sobre mezcal artesanal.</p>
          </div>
        ):(
          <>
            <h1 style={{fontSize:"1.75rem",fontWeight:800,marginBottom:"0.5rem"}}>Unete a la comunidad 3deMayo</h1>
            <p style={{color:"#555",marginBottom:"2rem",lineHeight:1.6}}>Articulos sobre agaves, mezcaleros, recetas y cultura del mezcal. Sin spam.</p>
            <form onSubmit={submit}>
              <div style={{marginBottom:"1rem"}}>
                <label style={{display:"block",fontWeight:600,marginBottom:"0.35rem"}}>Nombre (opcional)</label>
                <input value={name} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)} placeholder="Tu nombre" style={{width:"100%",padding:"0.75rem 1rem",border:"2px solid #e2d5c0",borderRadius:8,fontSize:"1rem",boxSizing:"border-box"}}/>
              </div>
              <div style={{marginBottom:"1.5rem"}}>
                <label style={{display:"block",fontWeight:600,marginBottom:"0.35rem"}}>Correo electronico</label>
                <input value={email} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} type="email" required placeholder="tu@correo.com" style={{width:"100%",padding:"0.75rem 1rem",border:"2px solid #e2d5c0",borderRadius:8,fontSize:"1rem",boxSizing:"border-box"}}/>
              </div>
              {status==="err"&&<p style={{color:"#ef4444",marginBottom:"1rem",fontSize:"0.9rem"}}>Hubo un error. Intenta de nuevo.</p>}
              <button type="submit" disabled={status==="loading"} style={{width:"100%",padding:"0.9rem",background:"#b45309",color:"white",border:"none",borderRadius:8,fontSize:"1rem",fontWeight:700,cursor:"pointer"}}>{status==="loading"?"Enviando...":"Suscribirme gratis"}</button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
