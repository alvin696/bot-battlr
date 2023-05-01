import React, { Component } from 'react';
import BotCollection from "./botcollection";
import YourBotArmy from "./yourbotarmy";
import BotSpecs from "./botspecs";
import SortBar from "./sortbar";
 // eslint-disable-next-line
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bots: [],
      army: [],
      selectedBot: null,
      sortBy: null,
      filterBy: null
    };
  }

  componentDidMount() {
    const url = 'http://localhost:3000/bots';
    axios
      .get(url)
      .then(response => this.setState({ bots: response.data }))
      .catch(error => console.log(error));
  }
  selectBot = (bot) => {
    this.setState({ selectedBot: bot });
  }

  addToArmy = (bot) => {
    if (this.state.army.length >= 5) {
      alert("You can only have 5 bots in your army!");
      return;
    }

    this.setState({ army: [...this.state.army, bot] });
  }

  removeFromArmy = (bot) => {
    const index = this.state.army.indexOf(bot);
    if (index !== -1) {
      const newArmy = [...this.state.army];
      newArmy.splice(index, 1);
      this.setState({ army: newArmy });
    }
  }

  sortBots = (sortBy) => {
    this.setState({ sortBy });
  }

  filterBots = (filterBy) => {
    this.setState({ filterBy });
  }

  render() {
    const { bots, army, selectedBot, sortBy, filterBy } = this.state;

    let filteredBots = bots;
    if (filterBy !== null) {
      filteredBots = bots.filter(bot => bot.class === filterBy);
    }

    if (sortBy !== null) {
      filteredBots.sort((a, b) => b[sortBy] - a[sortBy]);
    }

    return (
      <div className="App">
        <SortBar sortBots={this.sortBots} filterBots={this.filterBots} />
        <div className="container">
          <div className="row">
            <div className="col-6">
              <BotCollection bots={filteredBots} selectBot={this.selectBot} />
            </div>
            <div className="col-6">
              <YourBotArmy army={army} removeFromArmy={this.removeFromArmy} />
            </div>
          </div>
        </div>
        {selectedBot !== null && <BotSpecs bot={selectedBot} addToArmy={this.addToArmy} />}
      </div>
    );
  }
}

export default App;

