import HeaderMain from "@/components/header/HeaderMain";
import "../globals.css";
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <HeaderMain />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
