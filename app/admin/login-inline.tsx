"use client"
import { useState } from "react"

export default function AdminLoginInline() {
  const [pw, setPw] = useState("")
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErr("")
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) {
      window.location.reload()
    } else {
      setErr("Contraseña incorrecta")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="w-full max-w-sm px-8">
        <div className="mb-8 text-center">
          <p className="text-amber-500 text-xs font-mono tracking-widest mb-2">3DE MAYO</p>
          <h1 className="text-stone-100 text-2xl font-serif">Panel de Administración</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Contraseña"
            autoFocus
            className="w-full bg-[#111] border border-[#2a2a2a] text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-amber-500/50"
          />
          {err && <p className="text-red-400 text-xs">{err}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs tracking-widest py-3 transition-colors disabled:opacity-50"
          >
            {loading ? "VERIFICANDO..." : "ENTRAR"}
          </button>
        </form>
      </div>
    </div>
  )
}
