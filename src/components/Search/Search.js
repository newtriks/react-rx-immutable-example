import React, {PropTypes} from 'react';
// CSS imports
import './Search.styl';

export default class Search {

  static propTypes = {
    searchText: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired
  }

  render() {
    const {searchText, search} = this.props;
    return (
        <form className="form-inline form-no-labels">
          <fieldset>
            <input  ref="search"
                    type="text"
                    className="form-element form-input search"
                    placeholder="Enter a hero name..."
                    autoComplete="off"
                    onChange={search}
                    value={searchText}/>
          </fieldset>
        </form>
    );
  }
}