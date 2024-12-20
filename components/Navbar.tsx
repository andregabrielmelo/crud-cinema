import Link from "next/link";
import React from "react";
import { Clapperboard } from "lucide-react";

const Navbar = () => {
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Clapperboard size={36} color="#38BDF8" />
        </Link>
        <div className="flex items-center gap-5 text-black">
          <Link href="/">
            <span className="nav-link">Home</span>
          </Link>
          <Link href="/ingressos">
            <span className="nav-link">Ingressos</span>
          </Link>
          <Link href="/vendas">
            <span className="nav-link">Vendas</span>
          </Link>
          <Link href="/gerenciamento">
            <span className="nav-link">Gerenciamento</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
