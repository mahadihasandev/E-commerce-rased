import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import MobileMenu from "./MobileMenu";
import AuthNav from "./AuthNav";

const Header = () => {
  return (
    <header className="bg-white/80 sticky top-0 z-50 backdrop-blur-xl border-b border-slate-100 shadow-xs transition-all duration-300">
      <Container className="flex justify-between items-center py-3.5">
        <div className="w-auto md:w-1/4 flex items-center justify-start gap-3">
          <MobileMenu />
          <Logo />
        </div>
        <div className="hidden md:flex justify-center flex-1">
          <HeaderMenu />
        </div>

        <div className="w-auto md:w-1/3 flex items-center justify-end gap-3 md:gap-4">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <AuthNav />
        </div>
      </Container>
    </header>
  );
};

export default Header;