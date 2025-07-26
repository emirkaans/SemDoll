import "../globals.css";

export default async function RootLayout({ children }) {
  return (
    <html>
      <body className="flex min-h-dvh flex-col">
        <main className="grow">{children}</main>
      </body>
    </html>
  );
}
