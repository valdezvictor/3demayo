import { getPool } from "@/app/lib/db"
import Link from "next/link"
export default async function ArticlePage({params}:{params:{slug:string}}){
  let article:any=null
  try{
    const {rows}=await getPool().query("SELECT * FROM dm_articles WHERE slug=$1 AND is_published=true",[params.slug])
    article=rows[0]||null
  }catch(e){console.error(e)}
  if(!article) return(<main style={{padding:"4rem",textAlign:"center"}}><h1>Articulo no encontrado</h1><Link href="/blog" style={{color:"#b45309"}}>volver al blog</Link></main>)
  const paragraphs:string[]=(article.body_es||"Sin contenido").split("\n\n").filter(Boolean)
  return(
    <main style={{maxWidth:800,margin:"0 auto",padding:"2rem 1rem"}}>
      <Link href="/blog" style={{color:"#b45309",textDecoration:"none",fontSize:"0.9rem",fontWeight:500}}>Regresar al blog</Link>
      <article style={{marginTop:"1.5rem"}}>
        <span style={{fontSize:"0.75rem",color:"#b45309",fontWeight:700,textTransform:"uppercase"}}>{article.category}</span>
        <h1 style={{fontSize:"2rem",fontWeight:800,lineHeight:1.2,margin:"0.5rem 0 1rem"}}>{article.title_es}</h1>
        {article.excerpt_es&&<p style={{fontSize:"1.1rem",color:"#555",fontStyle:"italic",lineHeight:1.6,marginBottom:"1.5rem"}}>{article.excerpt_es}</p>}
        <div style={{display:"flex",gap:"1rem",fontSize:"0.85rem",color:"#999",marginBottom:"2rem"}}>
          <span>{article.author}</span>
        </div>
        <hr style={{borderColor:"#e2d5c0",marginBottom:"2rem",border:"none",borderTop:"1px solid #e2d5c0"}}/>
        <div style={{fontSize:"1.05rem",lineHeight:1.85,color:"#333"}}>
          {paragraphs.map((p:string,i:number)=>(<p key={i} style={{marginBottom:"1.25rem"}}>{p}</p>))}
        </div>
      </article>
    </main>
  )
}
