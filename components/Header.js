export default function Header({ onAddClick }) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900 text-white px-2.5 py-1 text-sm font-mono font-bold tracking-tight">
            RP
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-zinc-900 uppercase">
              Reno Platforms
            </h1>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider font-semibold">
              Announcement Board
            </p>
          </div>
        </div>
        <button 
          onClick={onAddClick}
          className="bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase font-bold py-2 px-4 rounded-none border border-zinc-950 transition-colors duration-150"
        >
          Add Notice
        </button>
      </div>
    </header>
  );
}
