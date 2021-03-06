import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // initial state
      fishes: {},
      order: {},
    };
    this.addFish = this.addFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });

    // Check if there's any data in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addFish(fish) {
    // create a fishes copy and loading our current state
    const fishes = { ...this.state.fishes };
    const timestamp = Date.now();

    // adding the timestamp to fishes and loading new state
    fishes[`fish-${timestamp}`] = fish;
    this.setState({ fishes });
  }

  updateFish(key, updatedFish) {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes,
    });
  }

  addToOrder(key) {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object
              .keys(this.state.fishes)
              .map((key) => <Fish key={key} details={this.state.fishes[key]}
              addToOrder={this.addToOrder} index={key} />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} params={this.props.params} />
        <Inventory addFish={this.addFish} removeFish={this.removeFish} updateFish={this.updateFish} loadSamples={this.loadSamples} fishes={this.state.fishes} />
      </div>
    );
  }
}

App.propTypes = {
  params: PropTypes.object,
};

export default App;
