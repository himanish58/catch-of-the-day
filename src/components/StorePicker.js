import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

  goToStore(event) {
    event.preventDefault();
    const storeId = this.StoreInput.value;
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please Enter A Store</h2>
        <input type="text" placeholder="Store Name" defaultValue={getFunName()}
          ref={(input) => {this.StoreInput = input;}} required />

        <button type="submit">Visit Store &rarr;</button>
      </form>
    );
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object,
};

export default StorePicker;
