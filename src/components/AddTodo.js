import React from 'react';

export class AddTodo extends React.Component {
    state = {
        title: ''
    }
    
    onSubmit = (ev) => {
        ev.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title: ''});
    }
    
    onChange = (ev) => {
        this.setState({ title: ev.target.value });
    }
    
    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <input
                    type="text"
                    name="title"
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Add Todo ..."
                    value={this.state.title}
                    onChange={this.onChange}
                />
                <input
                    type="submit"
                    value="Submit"
                    className="btn"
                    style={{ flex: '1' }}
                />
            </form>
        )
    }
}

export default AddTodo;