import { useState } from 'react';
import { Container, VStack, Input, Button, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaPlusCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: tasks.length, text: input }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, text: newText };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="100%">
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="lg"
        />
        <Button leftIcon={<FaPlusCircle />} colorScheme="blue" onClick={addTask} w="full">
          Add Task
        </Button>
        <List spacing={3} w="full">
          {tasks.map(task => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
              <span>{task.text}</span>
              <div>
                <IconButton
                  aria-label="Edit Task"
                  icon={<FaEdit />}
                  onClick={() => {
                    const newText = prompt('Edit your task:', task.text);
                    if (newText) {
                      editTask(task.id, newText);
                    }
                  }}
                />
                <IconButton
                  aria-label="Delete Task"
                  icon={<FaTrash />}
                  onClick={() => deleteTask(task.id)}
                  ml={2}
                />
              </div>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;