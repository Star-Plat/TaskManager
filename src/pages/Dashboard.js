import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import TaskItem from '../components/TaskItem';

import styled from 'styled-components';
import styles from './Dashboard.module.css';

const Container = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: 2.5rem;
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
  text-align: center;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 2rem;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 250px;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4a90e2;
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ab8;
  }
`;

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await createTask({ title });
    setTitle('');
    fetchTasks();
  };

  const handleUpdate = async (id, updatedTask) => {
    await updateTask(id, updatedTask);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <Container>
      <Title>My Tasks</Title>
      <Form onSubmit={handleAdd}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Task"
          required
        />
        <Button type="submit">Add</Button>
      </Form>
      <TaskList>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </TaskList>
    </Container>
  );
};

export default Dashboard;