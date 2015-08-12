import React, {Component} from 'react';
import Rx, {Observable} from 'rx';
import RxFunc from '../../lib/RxFuncSubject';
import {postSuperHeroes} from '../../lib/SuperHeroAPI';
import {setSearchText,
        getSearchText,
        setSearchResults,
        getSearchResults,
        setSelectedResults,
        getSelectedResults,
        removeSelectedResults,
        undoSelection,
        redoSelection,
        getState} from './State';
// Components
import Search from '../Search/Search';
import SearchResults from '../Search/SearchResults';
import SelectedResults from '../Search/SelectedResults';
// CSS imports
import './App.styl';

export default class App extends Component {

  constructor(props) {
    super(props);
    // Set default state
    this.state = {
      searchText: getSearchText(),
      searchResults: getSearchResults(),
      selectedResults: getSelectedResults(),
      canUndo: false,
      canRedo: false
    };
    // Set Rx handlers
    this.handlers = {
      search: RxFunc(),
      select: RxFunc(),
      remove: RxFunc(),
      undo: RxFunc(),
      redo: RxFunc()
    };
    // Create streams
    this.createStreams();
  }

  componentDidMount() {
    // Subscribe to streams
    this.subscribeToStreams();
  }

  createStreams() {
    this.searchStream = this.createSearchStream();
    this.selectStream = this.createSelectStream();
  }

  subscribeToStreams() {
    this.searchStream.subscribe(this.handleSearchResult);
    this.selectStream.subscribe(this.handleSelect);
  }

  createSearchStream() {
    const {search} = this.handlers;
    return search
            .pluck('target', 'value')
            .do(this.updateSearchState)
            .filter(val => val.length > 2)
            .debounce(250)
            .distinctUntilChanged()
            .flatMapLatest(postSuperHeroes)
            .map(({response}) => response);
  }

  createSelectStream() {
    const {select, remove, undo, redo} = this.handlers;
    return Observable.merge(select, remove, undo, redo);
  }

  // Stream subscription handlers
  handleSearchResult = (res) => {
    this.updateSearchResults(res);
  }

  handleSelect = (result) => {
    switch(result.action) {
      case 'select':
        setSelectedResults(result);
        this.updateSelectedResults();
        break;
      case 'remove':
        removeSelectedResults(result.index);
        this.updateSelectedResults();
        break;
      case 'undo':
        undoSelection();
        this.updateSelectedResults();
        break;
      case 'redo':
        redoSelection();
        this.updateSelectedResults();
        break;
    }
  }

  // Update state
  updateSearchState = (str) => {
    this.updateSearchResults();
    return this.updateSearchString(str);
  }

  updateSearchString(str='') {
    setSearchText(str);
    return this.setState({searchText: getSearchText()});
  }

  updateSearchResults(results=[]) {
    setSearchResults(results);
    this.setState({searchResults: getSearchResults()});
  }

  updateSelectedResults() {
    this.setState({...getState(), selectedResults: getSelectedResults()});
  }

  // Render
  render() {
    const props = {...this.handlers, ...this.state};
    return (
        <div className='grid-flex-container search'>
          <div className="grid-flex-cell grid-flex-cell-1of3">
            <Search {...props}/>
          </div>
          <div className="grid-flex-cell grid-flex-cell-2of3">
            <SearchResults {...props}/>
          </div>
          <div className="grid-flex-cell grid-flex-cell-3of3">
            <SelectedResults {...props}/>
          </div>
        </div>
    );
  }

};