import logoImg from "@/app/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#0d0f10] py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white font-black tracking-wider text-sm">
          <img
            src={logoImg.src}
            alt="FitLog Logo"
            className="w-4 h-4 object-contain"
          />
          <span>FITLOG</span>
        </div>
        <p className="text-xs text-zinc-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}