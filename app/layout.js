
import "./globals.css";
import { cairo, El_Messiri, Scheherazade } from "./fonts/fonts";
export const metadata = {
  title: "قصة",
  description: "موقعة يقدم قصص العلماء الافضل.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" className={`${cairo.variable} ${El_Messiri.variable} ${Scheherazade.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />

      </head>
      <body
        dir="rtl"
        
      >
        {children}
      </body>
    </html>
  );
}
