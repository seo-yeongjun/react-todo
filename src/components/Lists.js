import React from 'react'
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(({todoData, setTodoData, handleClick}) => {
    const handleCompleteChange = (id) => {
        let newData = todoData.map((data) => {
            if (data.id === id) {
                data.completed = !data.completed

            }
            return data
        })
        setTodoData(newData)
        localStorage.setItem('todoData', JSON.stringify( newData))

    }

    const handleEnd = (result) => {
        if (!result.destination) return
        const newTodoData = todoData
        const [item] = newTodoData.splice(result.source.index, 1)
        newTodoData.splice(result.destination.index, 0, item)
        setTodoData(newTodoData)
        localStorage.setItem('todoData', JSON.stringify( newTodoData))

    }
    return (<DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
            {(provided) => (<div {...provided.droppableProps} ref={provided.innerRef}>
                {todoData.map((data, index) => (<Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                    {(provided, snapshot) => (<div key={data.id} {...provided.draggableProps}
                                                   ref={provided.innerRef} {...provided.dragHandleProps}>
                        <List data={data} todoData={todoData} setTodoData={setTodoData} snapshot={snapshot} handleCompleteChange={handleCompleteChange}
                              handleClick={handleClick}></List>
                    </div>)}
                </Draggable>))}
                {provided.placeholder}
            </div>)}
        </Droppable>
    </DragDropContext>)
})

export default Lists
