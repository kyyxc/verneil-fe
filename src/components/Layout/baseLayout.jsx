export default function BaseLayout({ children }) {
  return (
    <div className="flex flex:col sm:flex-row font-apple h-full bg-black text-slate-100">
      {children}
    </div>
  );
}
