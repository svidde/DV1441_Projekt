/**
 * Helpers and tools to ease your JavaScript day.
 *
 * @author Mikael Roos (me@mikaelroos.se)
 */
window.Svidde = (function(window, document, undefined ) {
  var Svidde = {};

  /**
   * Dump own properties of an object
   * @param the object to show
   */
  Svidde.dump = function (obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        console.log(prop);
      }
    }
  };
  
 
  /**
   * Dump properties and values of an object
   * @param the object to show
   * @returns string
   */
  Svidde.dumpAsString = function (obj) {
    var s = '{\n';
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        s += prop + ' : ' + obj[prop];
      }
    }
    return s + '\n}';
  };
  
 
  /**
   * Delete cached LESS files from local storage.
   * @param regular expressen to search for, for example /style.less/
   */
  Svidde.deleteLESSFromLocalStorage = function (which) {
    for (var item in window.localStorage) {
      if (item.match(which)) {
        console.log('Deleted ' + item + ':' + (delete window.localStorage[item]));
      }
    }
  };
  
  /**
   * Generate a random number.
   * @param min the smallest possible number
   * @param max the largest possible number
   * @returns a random number where min >= number <= max
   */
  Svidde.random = function (min, max) {
    return Math.floor(Math.random()*(max-min)+min);
  };

  /**
   * Get the position of an element.
   * http://stackoverflow.com/questions/442404/dynamically-retrieve-html-element-x-y-position-with-javascript
   * @param el the element.
   */
  Svidde.getOffset = function ( el ) {
      var _x = 0;
      var _y = 0;
      while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
      }
      return { top: _y, left: _x };
  }
  //var x = getOffset( document.getElementById('yourElId') ).left; 

  // Expose public methods
  return Svidde;
  
})(window, window.document); 
