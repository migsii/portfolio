export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 py-6 text-center text-xs text-brand-muted">
      <p>
        &copy; {new Date().getFullYear()} Mark Miguel Manalastas. Built with
        Next.js & Tailwind CSS v4.
      </p>
    </footer>
  );
}
