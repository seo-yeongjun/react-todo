import './App.css';
import React, {useCallback, useState} from 'react'
import Lists from "./components/Lists";
import Form from "./components/Form";

const initialTodoData = localStorage.getItem('todoData')?JSON.parse(localStorage.getItem('todoData')):[]


export default function App() {
    const [todoData, setTodoData] = useState(initialTodoData)
    const [value, setValue] = useState('')

    const handleClick = useCallback((dataId) => {
        let newData = todoData.filter((data) => data.id !== dataId)
        setTodoData(newData)
        localStorage.setItem('todoData', JSON.stringify(newData))
    },[todoData])

    const handleSubmit = (e) => {
        e.preventDefault()
        let newData = {
            id: Date.now(), title: value, completed: false
        }
        setTodoData(prev => [...prev, newData])
        localStorage.setItem('todoData', JSON.stringify( [...todoData, newData]))
        setValue("")
    }

    const handleRemoveClick = () => {
        setTodoData([])
        localStorage.setItem('todoData', JSON.stringify( []))

    }

    return (<div className="flex items-center justify-center  w-screen h-screen bg-blue-100">
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4">
            <div className="flex justify-between mb-3">
                <h1>할 일 목록</h1>
                <button onClick={handleRemoveClick}>Delete All</button>
            </div>
            <Lists todoData={todoData} handleClick={handleClick} setTodoData={setTodoData}></Lists>
            <Form handleSubmit={handleSubmit} setValue={setValue} value={value}></Form>
        </div>
    </div>);
}
