import React from 'react';
import styled from 'styled-components';
import styles from './TaskItem.module.css';

const Item = styled.li`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.span`
  font-size: 1rem;
  color: #333;
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const handleToggle = () => {
    onUpdate(task.id, { ...task, completed: !task.completed });
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <Item>
      <Title style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </Title>
      <ButtonGroup>
        <button className={styles.button} onClick={handleToggle}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>
      </ButtonGroup>
    </Item>
  );
};

export default TaskItem;