import Link from "next/link";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={36} height={7.5}></Image>
        </Link>
        <div className="flex items-center gap-5 text-black">
          <Link href="/">
            <span>Home</span>
          </Link>
          <Link href="/vendas">
            <span>Vendas</span>
          </Link>
          <Link href="/relatorios">
            <span>Relatórios</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
