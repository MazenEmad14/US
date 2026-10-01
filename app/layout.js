import "./globals.css";

export const metadata = {
  title: "حكايتنا",
  description: "حكاية صغيرة عننا."
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
