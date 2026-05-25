import "./globals.css";

export const metadata = {
  title: "Mark Manalastas | Portfolio",
  description: "Web Developer & Business Analytics Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-brand-bg text-zinc-50">
        {children}
      </body>
    </html>
  );
}
