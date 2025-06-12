import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #4a90e2;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const UserInfo = styled.div`
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username'); // Store this on login

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

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
            <span>👤 {username}</span>
            <button onClick={handleLogout} style={{
              background: 'transparent',
              border: '1px solid white',
              color: 'white',
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              Logout
            </button>
          </UserInfo>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;