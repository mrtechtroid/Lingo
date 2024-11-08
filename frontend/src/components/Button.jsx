export default function Button({ children, variant = "solid", className }) {
  return (
    <button
      className={`rounded-2xl border-2 border-b-4 border-[#042c60] bg-[#235390] px-8 py-3 font-bold uppercase transition hover:bg-[#204b82] ${className}`}
    >
      {children}
    </button>
  )
}