import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from '../Task/Task';
import { TaskType } from '../types';

interface TaskBoardProps {
  tasks: TaskType[];
  onMoveTask: (sourceIndex: number, destinationIndex: number, list: TaskType['list']) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onMoveTask }) => {
  const todayTasks = tasks.filter((task) => task.list === 'today');
  const thisWeekTasks = tasks.filter((task) => task.list === 'this week');

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    onMoveTask(source.index, destination.index, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '1rem' }}>
          <h3>Today</h3>
          <Droppable droppableId="today">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {todayTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Task task={task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div>
          <h3>This Week</h3>
          <Droppable droppableId="this week">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {thisWeekTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Task task={task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
