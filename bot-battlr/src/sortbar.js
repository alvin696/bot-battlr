import React from "react";

class SortBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "",
    };
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(event) {
    this.setState({ sortBy: event.target.value });
    if (this.props.onSortChange) {
      this.props.onSortChange(event.target.value);
    }
  }

  render() {
    return (
      <div>
        <label htmlFor="sort-by">Sort by:</label>
        <select
          id="sort-by"
          value={this.state.sortBy}
          onChange={this.handleSortChange}
        >
          <option value="">None</option>
          <option value="health">Health</option>
          <option value="damage">Damage</option>
          <option value="armor">Armor</option>
        </select>
      </div>
    );
  }
}

export default SortBar;
