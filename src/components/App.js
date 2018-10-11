import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    //ref is reference to piece of data to DB
    const { params } = this.props.match;
    //first reinstate our localstorage
    const localStorageRef = localStorage.getItem(params.storeID);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeID}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeID,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    //make a copy of existing state
    const fishes = { ...this.state.fishes };
    //add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    //set the new fishes object to state
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    //take copy of current state
    const fishes = { ...this.state.fishes };
    //update state
    fishes[key] = updatedFish;
    //set that to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    //copy state
    const fishes = { ...this.state.fishes };
    //remove items from state
    fishes[key] = null;
    //update state
    this.setState({ fishes });
  };

  addToOrder = key => {
    //make a copy of state
    const order = { ...this.state.order };
    //add to or update the order
    order[key] = order[key] + 1 || 1;
    //call setstate to update our state object
    this.setState({
      order: order
    });
  };

  removeFromOrder = key => {
    //make a copy of state
    const order = { ...this.state.order };
    //remove or update the order
    delete order[key];
    //call setstate to update our state object
    this.setState({
      order: order
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
