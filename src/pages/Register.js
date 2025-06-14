import React, { useState } from 'react';
import { register } from '../api/auth';
import styled from 'styled-components';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
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

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form); // calls ../api/auth.js
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Create an Account</Title>
      <Form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          className={styles.button}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </Form>
    </Container>
  );
};

export default Register;