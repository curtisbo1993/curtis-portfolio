export default function PaletteDemo() {
  const scales = ['50','100','200','300','400','500','600','700','800','900']
  return (
    <div className="min-h-[40vh] bg-bg text-fg p-6 space-y-6">
      <div className="text-xl font-semibold">Brand Colors</div>
      <div className="grid grid-cols-10 gap-2">
        {scales.map(s => (
          <div key={`b-${s}`} className={`h-10 rounded border border-border bg-brand-${s}`} />
        ))}
      </div>

      <div className="text-xl font-semibold mt-6">Neutral Colors</div>
      <div className="grid grid-cols-10 gap-2">
        {scales.map(s => (
          <div key={`n-${s}`} className={`h-10 rounded border border-border bg-neutral-${s}`} />
        ))}
      </div>

      <div className="text-xl font-semibold mt-6">Gradients</div>
      <div className="h-16 rounded gradient-brand shadow-soft" />
      <div className="h-16 rounded gradient-brand-soft border border-border" />
    </div>
  )
}
