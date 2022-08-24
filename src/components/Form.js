import React from 'react';

export default function Form({handleSubmit, setValue, value}) {
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return (<div>
            <form className="flex" onSubmit={handleSubmit}>
                <input className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow" type="text" name="value" placeholder="해야 할 일을 입력하세요."
                       value={value} onChange={handleChange}/>
                <input className="text-blue-400 p-2 border-2 rounded hover:text-white hover:bg-blue-200" type="submit" value="추가"/>
            </form>
        </div>);
}
