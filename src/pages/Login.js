import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

import styled from 'styled-components';
import styles from './Login.Module.css';

const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #f0f4ff, #dfe9f3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      localStorage.setItem('username', res.data.username);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed.');
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <input
          className={styles.input} name="username" onChange={handleChange} placeholder="Username" required/>
        <input
          className={styles.input}
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button className={styles.button} type="submit">Login</button>

      </Form>
    </Container>
  );
};

export default Login;