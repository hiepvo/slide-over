/**
 * Created by hiepvo on 2/23/17.
 */
(function(){
  var init = {};

  var links  = document.querySelectorAll('.slideover-text');
  var closes = document.querySelectorAll('.s-close');

  for(var i = 0; i < links.length; i++){
    links[i].addEventListener('click', openSlideOver, false);
    closes[i].addEventListener('click', closeSlideOver, false);
  }

  function clearPopup(e){
    var popups = document.querySelectorAll('.slideover');
    var i      = 0;
    for(i; i < popups.length; i++){
      if(popups[i].className.indexOf('hide') === -1){
        hide(popups[i], 0);
        removeClass(popups[i].children[0], 'animated-height');
        removeClass(popups[i].children[0].children[0], 'slideover__content--visible');
        addClass(popups[i].children[0].children[0], 'slideover__content--invisible');
      }
    }
  }

  function closeSlideOver(e){
    var el             = e.target;
    var contentWrapper = el.parentNode;
    var content        = contentWrapper.children[0];
    var caption = contentWrapper.nextElementSibling;

    removeClass(contentWrapper.parentNode, 'popout');
    removeClass(contentWrapper, 'animated-height');
    removeClass(content, 'slideover__content--visible');
    addClass(content, 'slideover__content--invisible');
    hide(contentWrapper.parentNode, 750);

    //removeClass(caption, 'popout');
  }

  function openSlideOver(e){
    clearPopup()
    var el   = document.getElementById(this.htmlFor);

    var animatedHeight = document.querySelector('#' + this.htmlFor + ' .slideover__content');
    var content        = document.querySelector('#' + this.htmlFor + ' .slideover__content>div');

    placeEl(el, this.offsetLeft, this.offsetTop - 10);
    show(el, 0);
    addClass(el, 'popout');
    addClass(animatedHeight, 'animated-height');
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

