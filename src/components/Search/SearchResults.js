import React, {PropTypes} from 'react';
// CSS imports
import './Search.styl';

export default class SearchResults {

  static propTypes = {
    searchResults: PropTypes.array,
    select: PropTypes.func.isRequired
  }

  renderResults() {
    const {searchResults, select} = this.props;
    return (
      <table className="table-outlined table-with-hover">
        <thead>
          <tr>
            <th className="small-column">#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((result, n) =>
            <tr key={`_${result.id}`} onClick={select.bind(this, {...result, action: 'select'})}>
              <td>{n}</td>
              <td>{result.name}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    if (!this.props.searchResults.length) {
      return <p>No search results yet...</p>;
    } else {
      return this.renderResults();
    }
  }
}