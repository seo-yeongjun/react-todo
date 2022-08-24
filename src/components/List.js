import React, {useState} from 'react';

const List = React.memo(({data, handleCompleteChange, handleClick, snapshot, todoData, setTodoData}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(data.title)

    const handleEditChange = (e) => {
        setEditedTitle(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let newTodoData = todoData.map(todoData => {
            if (todoData.id === data.id) {
                todoData.title = editedTitle
            }
            return todoData
        })
        setTodoData(newTodoData)
        localStorage.setItem('todoData', JSON.stringify( newTodoData))

        setIsEditing(false)
    }
    if (isEditing) {
        return (
            <div
                className={`${snapshot.isDragging ? 'bg-blue-400' : 'bg-gray-100'} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded`}>
                <div className="items-center">
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={editedTitle} onChange={handleEditChange}
                               className="w-full px-3 py-2 mr-4 text-gray-500 rounded"></input>
                    </form>
                </div>
                <div>
                    <button className="px-4 py-2 float-right" type="submit" onClick={handleSubmit}>save</button>
                    <button className="px-4 py-2 float-right" onClick={() => setIsEditing(false)}>x</button>
                </div>
            </div>
        )
    }

    return (
        <div
            className={`${snapshot.isDragging ? 'bg-blue-400' : 'bg-gray-100'} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded`}>
            <div className="items-center">
                <input type="checkbox" defaultChecked={false}
                       onChange={() => handleCompleteChange(data.id)}/>
                <span
                    className={data.completed ? "line-through" : undefined}>{data.title}</span>
            </div>
            <div>
                <button className="px-4 py-2 float-right" onClick={() => handleClick(data.id)}>x</button>
                <button className="px-4 py-2 float-right" onClick={() => setIsEditing(true)}>edit</button>
            </div>
        </div>
    );
});

export default List;
