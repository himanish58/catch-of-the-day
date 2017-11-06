import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // initial state
      fishes: {},
      order: {},
    };
    this.addFish = this.addFish.bind(this);
  }

  addFish(fish) {
    // create a fishes copy and loading our current state
    const fishes = { ...this.state.fishes };
    const timestamp = Date.now();

    // adding the timestamp to fishes and loading new state
    fishes[`fish-${timestamp}`] = fish;
    this.setState({ fishes });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
