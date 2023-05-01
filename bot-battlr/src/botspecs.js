import React from "react";

class BotSpecs extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.bot.name}</h2>
        <p>{this.props.bot.class}</p>
        <p>Health: {this.props.bot.health}</p>
        <p>Damage: {this.props.bot.damage}</p>
        <p>Armor: {this.props.bot.armor}</p>
        <button onClick={this.props.onBackToList}>Back to List</button>
        <button onClick={() => this.props.onEnlist(this.props.bot)}>Enlist</button>
      </div>
    );
  }
}

export default BotSpecs;
