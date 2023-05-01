import React, { Component } from 'react';
import BotCollection from "./botcollection";
import YourBotArmy from "./yourbotarmy";
import BotSpecs from "./botspecs";
import SortBar from "./sortbar";
import axios from 'axios';
import './index.css'; // import the CSS file

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bots: [],
      army: [],
      selectedBot: null,
      sortBy: null,
      filterBy: null,
      enlistedClasses: new Set()
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

  enlistBot = (bot) => {
    if (this.state.army.length >= 5) {
      alert("You can only have 5 bots in your army!");
      return;
    }

    if (this.state.enlistedClasses.has(bot.class)) {
      alert(`You can only have one ${bot.class} bot in your army!`);
      return;
    }

    const newBots = this.state.bots.filter(b => b.id !== bot.id);
    const newArmy = [...this.state.army, bot];
    const newEnlistedClasses = new Set(this.state.enlistedClasses);
    newEnlistedClasses.add(bot.class);

    this.setState({
      bots: newBots,
      army: newArmy,
      enlistedClasses: newEnlistedClasses
    });
  }

  removeFromArmy = (bot) => {
    const index = this.state.army.indexOf(bot);
    if (index !== -1) {
      const newArmy = [...this.state.army];
      newArmy.splice(index, 1);
      const newEnlistedClasses = new Set(this.state.enlistedClasses);
      newEnlistedClasses.delete(bot.class);
      this.setState({
        army: newArmy,
        enlistedClasses: newEnlistedClasses
      });
    }
  }

  sortBots = (sortBy) => {
    this.setState({ sortBy });
  }

  filterBots = (filterBy) => {
    this.setState({ filterBy });
  }

  backToBotCollection = () => {
    this.setState({ selectedBot: null });
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
        {selectedBot === null ?
          <div>
            <SortBar sortBots={this.sortBots} filterBots={this.filterBots} />
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <BotCollection bots={filteredBots} selectBot={this.selectBot} enlistBot={this.enlistBot} />
                </div>
                <div className="col-6">
                  <YourBotArmy army={army} removeFromArmy={this.removeFromArmy} />
                </div>
              </div>
            </div>
          </div>
          :
          // eslint-disable-next-line no-whitespace-before-property
          <BotSpecs bot={selectedBot} backToBotCollection={this.backToBotCollection} enlistBot={this .enlistBot} />
        }
        </div>
        );
        }
        }
        
        export default App;
