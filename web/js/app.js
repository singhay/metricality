var CounterList = React.createClass({
  render: function() {
    var _this = this;
    var createItem = function(item, index) {
      return (
        <tr key={ index }>
          <td>
            { item.text }
          </td>
          <td>
            { item.count }
          </td>
          <td>
            <button onClick={ () => _this.props.addCount(item) }>+</button>
            <button onClick={ () => _this.props.subCount(item) }>-</button>
            <button onClick={ () => _this.props.resetCount(item) }>Reset</button>
            <button onClick={ () => _this.props.removeItem(item['.key']) }>x</button>
          </td>
        </tr>
      );
    };
    return <table>{ this.props.items.map(createItem) }</table>;
  }
});

var App = React.createClass({
  mixins: [ReactFireMixin],

  componentWillMount: function() {
    var firebaseRef = firebase.database().ref('counters');
    this.bindAsArray(firebaseRef.limitToLast(25), 'items');
  },

  onChange: function(e) {
    this.setState({text: e.target.value, count: 1});
  },

  resetAll: function(e) {
    this.firebaseRefs['items']
    .once('value')
    .then(snapshot => {
      snapshot.forEach(item => {
        this.firebaseRefs['items']
        .child(item.key)
        .update({
          text: item.val().text,
          count: 0
        });
      })
    })
  },

  removeItem: function(key) {
    var firebaseRef = firebase.database().ref('counters');
    firebaseRef.child(key).remove();
  },

  addCount: function(item) {
    var firebaseRef = firebase.database().ref('counters');
    firebaseRef.child(item['.key']).update({
      text: item.text,
      count: ++item.count
    });
  },

  subCount: function(item) {
    var firebaseRef = firebase.database().ref('counters');
    firebaseRef.child(item['.key']).update({
      text: item.text,
      count: --item.count
    });
  },

  resetCount: function(item) {
    var firebaseRef = firebase.database().ref('counters');
    firebaseRef.child(item['.key']).update({
      text: item.text,
      count: 0
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.text && this.state.text.trim().length !== 0) {
      this.firebaseRefs['items'].push({
        text: this.state.text,
        count: 1
      });
      this.setState({
        text: this.state.text,
        count: 1
      });
    }
  },

  render: function() {
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.onChange } value={ this.state.text } autofocus="true" />
          <button>{ 'Add #' + (this.state.items.length + 1) }</button>
          <button type='reset' onClick={ this.resetAll }>{ 'Reset All' }</button>
        </form>
        <CounterList 
          items={ this.state.items } 
          removeItem={ this.removeItem } 
          addCount={ this.addCount } 
          subCount={ this.subCount }
          resetCount={ this.resetCount }/>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
