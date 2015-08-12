import {DOM} from 'rx-dom';

export default {
  postSuperHeroes(body) {
    return DOM.ajax({
      method: 'POST',
      url: 'http://localhost:8000/api/superheroes',
      responseType: 'json',
      body: body
    });
  }
}
