import './App.css';
import {Component} from "react";

export default class App extends Component {
    bntStyle = {
        color: "#fff", border: "none", padding: "5px 9px", borderRadius: "50%", cursor: "pointer", float: "right"
    }
    getStyle = () => {
        return {
            padding: "10px", borderBottom: "1px #ccc dotted", textDecoration: "none"
        }
    }
    state = {
        todoData: [{
            id: "1", title: "공부하기", completed: false
        }, {
            id: "2", title: "청소하기", completed: false
        }],
        value: ""
    }
    handleClick = (dataId) => {
        let newData = this.state.todoData.filter((data) => data.id != dataId)
        this.setState({todoData: newData})
    }
    handleChange = (e) => {
        this.setState({value: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let newData = {
            id: Date.now(),
            title: this.state.value,
            completed: false
        }
        this.setState({todoData: [...this.state.todoData, newData]})
        this.setState({value: ""})
    }


    render() {
        return (<div className="container">
            <div className="todoBlock">
                <div className="title">
                    <h1>할 일 목록</h1>
                </div>
                {this.state.todoData.map((data) =>
                    (<div style={this.getStyle()} key={data.id}>
                        <input type="checkbox" defaultChecked={false}/>
                        {data.title}
                        <button style={this.bntStyle} onClick={() => this.handleClick(data.id)}>x</button>
                    </div>))}
                <form style={{display: "flex", marginTop: "10px"}} onSubmit={this.handleSubmit}>
                    <input type="text" name="value" style={{flex: '10', padding: '5'}} placeholder="해야 할 일을 입력하세요."
                           value={this.state.value} onChange={this.handleChange}/>
                    <input type="submit" value="추가" className="btn" style={{flex: '1'}}/>
                </form>
            </div>
        </div>);
    }
}
