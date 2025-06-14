import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import styles from './Register.module.css'; // Reusing the same CSS module

const Container = styled.div`
  max-width: 500px;
  margin: 5rem auto;
  padding: 3rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Welcome to TaskManager</Title>
      <Subtitle>Manage your tasks effortlessly. Login or Register to begin.</Subtitle>
      <ButtonGroup>
        <button className={styles.button} onClick={() => navigate('/login')}>
          Login
        </button>
        <button className={styles.button} onClick={() => navigate('/register')}>
          Register
        </button>
      </ButtonGroup>
    </Container>
  );
};

export default Home;