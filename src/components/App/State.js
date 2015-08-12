import {List, Map} from 'immutable';

let searchText = '';
let searchResults = [];

let selections = [].concat(List([]));
let selectionsIndex = 0;

const operation = (fn) => {
    selections = selections.slice(0, selectionsIndex + 1);
    const val = fn(selections[selectionsIndex]);
    selections.push(val);
    selectionsIndex++;
    return val;
}

export default {
  setSearchText(text) {
    return searchText = text;
  },
  getSearchText() {
    return searchText || '';
  },
  setSearchResults(results) {
    searchResults = results;
  },
  getSearchResults() {
    return searchResults || [];
  },
  setSelectedResults(selection) {
    operation(state => state.push(Map({selection: selection})));
  },
  removeSelectedResults(n) {
    operation(state => state.filter(selection => selection.get('selection').id !== n));
  },
  getSelectedResults() {
    return selections[selectionsIndex];
  },
  undoSelection() {
    if(selectionsIndex > 0) selectionsIndex--;
  },
  redoSelection() {
    if(selectionsIndex < selections.length-1) selectionsIndex++;
  },
  getState() {
    return {canUndo: selectionsIndex > 0, canRedo: selectionsIndex < selections.length -1};
  }
}
