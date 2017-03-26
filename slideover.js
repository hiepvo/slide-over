/**
 * Created by hiepvo on 2/23/17.
 */
(function(){
  var init = {};

  var links = document.querySelectorAll('.slideover-text');

  for(var i = 0; i < links.length; i++){
    links[i].addEventListener('mouseenter', openSlideOver, false);
  }

  function closeSlideOver(e){
    var el = e.target;
    hide(el, 0);
    var animatedHeight        = document.querySelector('#' + el.id + ' .slideover__content');
    var caption        = document.querySelector('#' + el.id + ' .slideover__content + span');
    var content           = document.querySelector('#' + el.id + ' .slideover__content div');
    removeClass(animatedHeight, 'animated-height');
    removeClass(caption,'slideover__caption--visible');
    removeClass(content, 'slideover__content--visible');
    addClass(content, 'slideover__content--invisible');
  }

  function openSlideOver(e){
    var rect = getElemPos(this);
    var el   = document.getElementById(this.htmlFor);
    el.addEventListener('mouseleave', closeSlideOver, false);
    var animatedHeight = document.querySelector('#' + this.htmlFor + ' .slideover__content');
    var caption = document.querySelector('#' + this.htmlFor + ' .slideover__content + span');
    var content    = document.querySelector('#' + this.htmlFor + ' .slideover__content div');
    placeEl(el, rect.left, rect.top - 10);
    show(el, 0);
    addClass(animatedHeight, 'animated-height');
    addClass(caption, 'slideover__caption--visible');

    removeClass(content, 'slideover__content--invisible');
    addClass(content, 'slideover__content--visible');

  }

  //place element in specific cords
  function placeEl(el, x_pos, y_pos){
    el.style.left = x_pos - el.offsetWidth / 3 + 'px';
    el.style.top  = y_pos + 'px';
  }


  function hide(el, time){
    setTimeout(function(){
      addClass(el, 'hide');
    }, time);
  }

  function show(el, time){
    setTimeout(function(){
      removeClass(el, 'hide');
    }, time);
  }

  /*********** Helpers ***************/
  function getElemPos(elem){
    // (1) Get the enclosing rectangle
    var box  = elem.getBoundingClientRect();
    var body = document.body;
    var doc  = document.documentElement;
    // (2) Calculate the page scroll.
    // All browsers except IE<9 support `pageXOffset/pageYOffset`, and in IE when DOCTYPE is set,
    // the scroll can be taken from documentElement(<html>), otherwise from `body` - so we take what we can.
    var scrollTop  = window.pageYOffset || doc.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || doc.scrollLeft || body.scrollLeft;
    // (3) The document (`html` or `body`) can be shifted from left-upper corner in IE. Get the shift.
    var clientTop  = doc.clientTop || body.clientTop || 0;
    var clientLeft = doc.clientLeft || body.clientLeft || 0;
    // (4) Add scrolls to window-relative coordinates
    // and subtract the shift of `html/body` to get coordinates in the whole document.
    var top  = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    return {
      top: Math.round(top),
      left: Math.round(left)
    };
  }

  function hasClass(el, className){
    if(el.classList)
      return el.classList.contains(className);
    else
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }

  function addClass(el, className){
    if(el.classList)
      el.classList.add(className);
    else if(!hasClass(el, className)) el.className += " " + className
  }

  function removeClass(el, className){
    if(el.classList)
      el.classList.remove(className);
    else if(hasClass(el, className)){
      var reg      = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ')
    }
  }

  /*-------------------------------*/

  window.init = init;

})(window);

