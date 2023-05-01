import React from "react";
import axios from "axios";

class BotCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bots: [],
    };
    this.handleAddBot = this.handleAddBot.bind(this);
    this.handleRemoveBot = this.handleRemoveBot.bind(this);
  }

  componentDidMount() {
    axios.get('/bots')
      .then(response => {
        this.setState({ bots: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleAddBot(bot) {
    this.setState(prevState => ({
      bots: [...prevState.bots, bot]
    }));
  }

  handleRemoveBot(botId) {
    axios.delete(`/bots/${botId}`)
      .then(response => {
        this.setState(prevState => ({
          bots: prevState.bots.filter(bot => bot.id !== botId)
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const botList = this.state.bots.map(bot => (
      <div key={bot.id}>
        <h3>{bot.name}</h3>
        <p>{bot.class}</p>
        <p>Health: {bot.health}</p>
        <p>Damage: {bot.damage}</p>
        <p>Armor: {bot.armor}</p>
        <button onClick={() => this.handleAddBot(bot)}>Add to Army</button>
        <hr />
      </div>
    ));

    return (
      <div>
        <h2>Bots</h2>
        {botList}
      </div>
    );
  }
}

export default BotCollection;
