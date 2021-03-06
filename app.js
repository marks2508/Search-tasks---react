import React, { Component } from 'react';
import ReactDom from 'react-dom';
import 'bulma/bulma';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        'Go to the store',
        'Wash the dishes',
        'Learn some code'
      ]
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(e) {
    e.preventDefault();
    const list = this.state.list;
    const newItem = document.getElementById('addInput');
    const form = document.getElementById('addItemForm');
    if (newItem.value !== '') {
      list.push(newItem.value);
      this.setState({
        list: list
      });
      newItem.classList.remove('is-danger');
      form.reset();
    } else {
      newItem.classList.add('is-danger');
    }
  }

  removeItem(item) {
    const list = this.state.list.slice();
    list.some((el, i) => {
      if (el === item) {
        list.splice(i, 1);
        return true;
      }
    });
    this.setState({
      list: list
    });
  }

  render() {
    return (
      <div className="content">
        <div className="container">
          <section className="section">
            <List items={this.state.list} delete={this.removeItem} />
          </section>
          <hr />
          <section className="section">
            <form className="form" id="addItemForm">
              <input
                type="text"
                className="input"
                id="addInput"
                placeholder="Something that needs ot be done..."
              />
              <button className="button is-info" onClick={this.addItem}>
                Add Item
              </button>
            </form>
          </section>
        </div>
      </div>
    );
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.items
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items
    });
  }

  handleChange(e) {
    let currentList = [];
    let newList = [];
    if (e.target.value !== '') {
      currentList = this.props.items;
      newList = currentList.filter(item => {
        const lc = item.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.items;
    }
    this.setState({
      filtered: newList
    });
  }

  render() {
    return (
      <div>
        <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
        <ul>
          {this.state.filtered.map(item => (
            <li key={item}>
              {item} &nbsp;
              <span
                className="delete"
                onClick={() => this.props.delete(item)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
