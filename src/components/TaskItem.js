import React, { useState } from 'react';
import styled from 'styled-components';
import styles from './TaskItem.module.css';
import {
  Pencil,
  Check,
  X,
  Trash2,
  CheckCircle,
  Undo2,
} from 'lucide-react'; // icons

const Item = styled.li`
  background-color: ${(props) => (props.completed ? '#f5f5f5' : '#ffffff')};
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
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const Input = styled.input`
  font-size: 1rem;
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background-color: #eee;
  }
`;

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleToggle = () => {
    onUpdate(task.id, { ...task, completed: !task.completed });
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleSave = () => {
    if (newTitle.trim()) {
      onUpdate(task.id, { ...task, title: newTitle });
      setIsEditing(false);
    }
  };

  return (
    <Item completed={task.completed}>
      {isEditing ? (
        <>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
          <ButtonGroup>
            <IconButton onClick={handleSave} title="Save">
              <Check size={20} color="#4caf50" />
            </IconButton>
            <IconButton onClick={() => setIsEditing(false)} title="Cancel">
              <X size={20} color="#f44336" />
            </IconButton>
          </ButtonGroup>
        </>
      ) : (
        <>
          <Title completed={task.completed}>{task.title}</Title>
          <ButtonGroup>
            <IconButton onClick={() => setIsEditing(true)} title="Edit">
              <Pencil size={20} />
            </IconButton>
            <IconButton onClick={handleToggle} title={task.completed ? 'Undo' : 'Complete'}>
              {task.completed ? (
                <Undo2 size={20} />
              ) : (
                <CheckCircle size={20} color="#4a90e2" />
              )}
            </IconButton>
            <IconButton onClick={handleDelete} title="Delete">
              <Trash2 size={20} color="#d32f2f" />
            </IconButton>
          </ButtonGroup>
        </>
      )}
    </Item>
  );
};

export default TaskItem;