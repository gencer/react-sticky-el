var basicSelectors = {
  'body': document.body,
  'window': window,
  'document': document
};

var matchesMethodName = (() => {
  const body = document.body;
  return typeof(body.matches) === 'function' ? 'matches' :
    typeof(body.webkitMatchesSelector) === 'function' ? 'webkitMatchesSelector': //webkit
    typeof(body.mozMatchesSelector) === 'function' ? 'mozMatchesSelector': //mozilla
    typeof(body.msMatchesSelector) === 'function' ? 'msMatchesSelector': //ie
    typeof(body.oMatchesSelector) === 'function' ? 'oMatchesSelector': //old opera
    null
})();

export default function find(selector, el) {
  if (!selector) {
    return null;
  }

  if (basicSelectors.hasOwnProperty(selector)) {
    return basicSelectors[selector];
  }

  // select by id
  if (selector[0] === '#') {
    return window.getElementById(selector.slice(1));
  }

  if (!matchesMethodName) {
    return null;
  }

  // eslint-disable-next-line no-cond-assign
  while (el = el.parentElement) {
    if (el[matchesMethodName](selector)) {
      return el;
    }
  }

  // nothing has been found :(
  return null;
}
