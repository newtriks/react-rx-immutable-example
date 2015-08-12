import React, {PropTypes} from 'react';
import classNames from 'classnames';
// CSS imports
import './Search.styl';

export default class SelectedResults {

  static propTypes = {
    selectedResults: PropTypes.object,
    remove: PropTypes.func.isRequired,
    undo: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
    canUndo: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired
  }

  renderSelections() {
    const {selectedResults, remove, undo, redo, canUndo, canRedo} = this.props;
    const classes = {
      undo: classNames('button button-outlined-neutral'),
      redo: classNames('button button-outlined'),
    };
    return (
      <div className="container">
        <button className={classes.undo} onClick={undo.bind(this, {action: 'undo'})} disabled={!canUndo}>Undo</button>
        <button className={classes.redo} onClick={redo.bind(this, {action: 'redo'})} disabled={!canRedo}>Redo</button>
        <ul className="selected-results">
          {selectedResults.map((result, n) =>
            <li key={`_${n}`} className="message message-success message-dismissable message-full-width">
              {result.get('selection').name}
              <a onClick={remove.bind(this, {...result.get('selection'), index: result.get('selection').id, action: 'remove'})} className='close' title='close'>×</a>
            </li>
          )}
        </ul>
      </div>
    );
  }

  render() {
    if (!this.props.selectedResults.count()) {
      return <p>No selected heroes yet...</p>;
    } else {
      return this.renderSelections();
    }
  }
}