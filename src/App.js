import React, {
    Component
} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';

class App extends Component {
    state = {
        todos: []
    }
    
    componentDidMount() {
        const endpoint = 'https://jsonplaceholder.typicode.com/todos?_limit=10';
        axios.get(endpoint)
        .then(res => this.setState({ todos: res.data }));
    }
    
    markComplete = (id) => {
        this.setState({ todos: this.state.todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        }) });
    }
    
    delTodo = (id) => {
        const endpoint = 'https://jsonplaceholder.typicode.com/todos';
        
        axios.delete(`${endpoint}/${id}`)
        .then(res => this.setState({ 
            todos: [...this.state.todos.filter(todo => todo.id !== id)]
        }));
        
        
    }
    
    addTodo = (title) => {
        const endpoint = 'https://jsonplaceholder.typicode.com/todos';
        axios.post(endpoint, {
            title: title,
            completed: false
        })
        .then(res => this.setState({
            todos: [...this.state.todos, res.data]
        }))
    }
    
    render() {
        return (
            <Router>
                <div className = "App" >
                    <div className="container">
                        <Header />
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <React.Fragment>
                                    <AddTodo
                                        addTodo={this.addTodo}
                                    />
                                    <Todos
                                        todos={this.state.todos}
                                        markComplete={this.markComplete}
                                        delTodo={this.delTodo}
                                    />
                                </React.Fragment>
                            )}
                        />
                        <Route
                            path='/about'
                            component={About}
                        />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
