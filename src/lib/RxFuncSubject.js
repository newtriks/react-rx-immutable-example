import Rx from 'rx';
// Props to http://www.mrspeaker.net/2015/08/03/functions-as-rxjs-subjects/
/*
  Plain functions as Subjects. When invoked, it calls the internal
  Subject's `onNext` method:

    const clicker = RxFuncSubject();
    clicker.subscribe(() => console.log('clicked!'));
    clicker(); // clicked!

  Made to be used in a react component, without using real DOM events:

    <MyComponent onClick={clicker} />
*/
const RxFuncSubject = () => {
  const subject = Object.assign(
    (...args) => subject.onNext(...args),
    Rx.Observable.prototype,
    Rx.Subject.prototype);

  Rx.Subject.call(subject);

  return subject;
};

export default RxFuncSubject;
