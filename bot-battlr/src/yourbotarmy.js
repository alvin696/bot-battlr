import React from "react";

class YourBotArmy extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveBot = this.handleRemoveBot.bind(this);
  }

  handleRemoveBot(botId) {
    this.props.onRemoveBot(botId);
  }

  render() {
    const botList = this.props.bots && this.props.bots.length ? this.props.bots.map(bot => (
      <div key={bot.id}>
        <h3>{bot.name}</h3>
        <p>{bot.class}</p>
        <p>Health: {bot.health}</p>
        <p>Damage: {bot.damage}</p>
        <p>Armor: {bot.armor}</p>
        <button onClick={() => this.handleRemoveBot(bot.id)}>x</button>
        <hr />
      </div>
    )) : null;

    return (
      <div>
        <h2>Your Bot Army</h2>
        {botList}
      </div>
    );
  }
}

export default YourBotArmy;
