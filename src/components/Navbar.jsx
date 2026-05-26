import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ChefHat,
  Home,
  PlusCircle,
  Heart,
  Search,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/add-recipe', label: 'Add Recipe', icon: PlusCircle },
  { to: '/favorites', label: 'Favorites', icon: Heart },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const openLogoutConfirm = () => {
    setMenuOpen(false);
    setShowLogoutConfirm(true);
  };

  const closeLogoutConfirm = () => {
    setShowLogoutConfirm(false);
  };

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    navigate('/login');
  };

  /* ---- Close mobile menu on route change ---- */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* ---- Lock body scroll when menu is open ---- */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /* ---- Track scroll for sticky shadow ---- */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar__container">
        {/* ---- Logo ---- */}
        <Link to="/" className="navbar__logo" aria-label="Recipe Vault Home">
          <span className="navbar__logo-icon">
            <ChefHat size={20} strokeWidth={2.2} />
          </span>
          <span className="navbar__logo-text">Recipe Vault</span>
        </Link>

        {/* ---- Desktop Nav Links ---- */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' active' : ''}`
              }
            >
              <Icon className="navbar__link-icon" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ---- Desktop Action Icons ---- */}
        <div className="navbar__actions">
          <span className="navbar__divider" aria-hidden="true" />
          <button
            className="navbar__action-btn"
            aria-label="Search recipes"
            type="button"
          >
            <Search />
          </button>
          {isAuthenticated && (
            <button
              className="navbar__action-btn navbar__action-btn--profile"
              aria-label="Logout"
              type="button"
              onClick={openLogoutConfirm}
            >
              <LogOut />
            </button>
          )}
        </div>

        {/* ---- Hamburger Button (mobile) ---- */}
        <button
          className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          type="button"
        >
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
        </button>
      </div>

      {/* ---- Mobile Overlay ---- */}
      <div
        className={`navbar__mobile-overlay${menuOpen ? ' visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ---- Mobile Slide-in Menu ---- */}
      <aside
        className={`navbar__mobile-menu${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
      >
        <nav className="navbar__mobile-nav">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__mobile-link${isActive ? ' active' : ''}`
              }
              onClick={closeMenu}
            >
              <Icon className="navbar__mobile-link-icon" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__mobile-divider" />

        <div className="navbar__mobile-actions">
          <button
            className="navbar__mobile-action-btn"
            aria-label="Search recipes"
            type="button"
          >
            <Search />
          </button>
          {isAuthenticated && (
            <button
              className="navbar__mobile-action-btn"
              aria-label="Logout"
              type="button"
              onClick={openLogoutConfirm}
            >
              <LogOut />
            </button>
          )}
        </div>
      </aside>

      {showLogoutConfirm && (
        <div className="navbar__confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="logout-confirm-title">
          <div className="navbar__confirm-dialog">
            <h2 id="logout-confirm-title">Are you sure?</h2>
            <p>Do you want to log out and return to the login page?</p>
            <div className="navbar__confirm-actions">
              <button className="navbar__confirm-btn navbar__confirm-btn--yes" type="button" onClick={handleLogout}>
                Yes
              </button>
              <button className="navbar__confirm-btn navbar__confirm-btn--no" type="button" onClick={closeLogoutConfirm}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
