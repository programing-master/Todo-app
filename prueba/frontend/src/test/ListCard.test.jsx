import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTask } from '../hooks/useTask';
import ListCard from '../components/ListCard';

vi.mock('../hooks/useTask');
vi.mock('../components/CardTask', () => {
  return {
    default: ({ item }) => <li>{item.name}</li>, 
  };
});

describe('ListCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should call getTasks on mount', () => {
    const getTasksMock = vi.fn();
    
    useTask.mockReturnValue({
      task: [],
      getTasks: getTasksMock,
    });

    render(<ListCard />);

    expect(getTasksMock).toHaveBeenCalledTimes(1);
  });

  test('should render tasks when available', () => {
    const mockTasks = [
      { name: 'Task 1' },
      { name: 'Task 2' },
      { name: 'Task 3' },
    ];

    useTask.mockReturnValue({
      task: mockTasks,
      getTasks: vi.fn(),
    });

    render(<ListCard />);

    mockTasks.forEach(task => {
      expect(screen.getByText(task.name)).toBeInTheDocument();
    });
  });

  test('should not render any tasks when task array is empty', () => {
    useTask.mockReturnValue({
      task: [],
      getTasks: vi.fn(),
    });

    render(<ListCard />);

    expect(screen.queryByRole('list')).toBeEmptyDOMElement();
  });
});
