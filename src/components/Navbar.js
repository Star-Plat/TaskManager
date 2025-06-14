import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react'; // Optional: replace with emoji if you don't use lucide

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.navbar};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.navText};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const UserInfo = styled.div`
  color: ${({ theme }) => theme.navText};
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.navText};
  color: ${({ theme }) => theme.navText};
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255,255,255,0.1);
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.navText};
  font-size: 1.2rem;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('username');
    if (stored) setUsername(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
    navigate('/login');
  };

  const token = localStorage.getItem('token');

  return (
    <Nav>
      <StyledLink to="/"><h3>Task Manager</h3></StyledLink>
      <NavLinks>
        {!token ? (
          <>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/register">Register</StyledLink>
          </>
        ) : (
          <UserInfo>
            <span>Hey, {username || 'Guest'}</span>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserInfo>
        )}
        <ThemeToggle onClick={() => setDarkMode((prev) => !prev)}>
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </ThemeToggle>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;