export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-zinc-200 py-5 mt-auto">
      <div className="max-w-6xl mx-auto px-6 text-center text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
        © {new Date().getFullYear()} Reno Platforms. All rights reserved.
      </div>
    </footer>
  );
}
