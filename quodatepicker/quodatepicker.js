// Generated by CoffeeScript 1.3.3
/*
  QuoDatePicker
  (c) 2011, 2012 Iñigo Gonzalez Vazquez (@haas85)
  http://ingonza.com
*/

var quoDatePicker;

quoDatePicker = (function(quo) {
  var changeDate, init, launcherInput, names, onButtonTap, onFieldTap, pad, removePicker, selectedDate, setDate, setPosition, setSize, showDate, showDatePicker, unpad, widthChange;
  launcherInput = {};
  window.mq = {};
  names = {
    days: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  };
  selectedDate = {};
  init = function() {
    var mq;
    quo('input.quoDatePicker').tap(onFieldTap);
    window.quomobile = false;
    if (matchMedia) {
      mq = window.matchMedia("(max-width: 980px)");
      mq.addListener(widthChange);
      return widthChange(mq);
    }
  };
  widthChange = function(mq) {
    if (mq.matches) {
      return window.quomobile = true;
    } else {
      return window.quomobile = false;
    }
  };
  showDatePicker = function(input) {
    var accept, datebutton, picker, re;
    launcherInput = input;
    removePicker();
    picker = document.createElement('div');
    picker.id = "quoDatePicker";
    picker.innerHTML = '<div class="dateContainer">'+
                          '<div class="actualDate"></div>'+
                          '<div class="dcontainer">'+
                          '<p id="plusd" class="plusdate datebutton">+</p>'+
                          '<input class="tdays dateinput"  maxlength="2" type="number" max="31" min="1" format="[0-9]*"/>'+
                          '<span>/</span>'+
                          '<div style="clear:both"></div>'+
                          '<p id="minusd" class="minusdate datebutton">-</p>'+
                        '</div>'+
                        '<div class="mcontainer">'+
                          '<p id="plusm" class="plusdate datebutton">+</p>'+
                          '<input class="tmonths dateinput" size="2" maxlength="2" type="number" max="12" min="1" format="[0-9]*"/>'+
                          '<span>/</span>'+
                          '<div style="clear:both"></div>'+
                          '<p id="minusm" class="minusdate datebutton">-</p>'+
                        '</div>'+
                        '<div class="ycontainer">'+
                          '<p id="plusy" class="plusdate datebutton">+</p>'+
                          '<input class="tyears dateinput" size="4" maxlength="4" type="number" max="9999" min="00" format="[0-9]*"/>'+
                          '<div style="clear:both"></div>'+
                          '<p id="minusy" class="minusdate datebutton">-</p>'+
                        '</div>'+
                        '<div class="accept action-button blue">OK</div>'+
                      '</div>';
    input.parentNode.insertBefore(picker);
    setSize();
    setPosition(input);
    datebutton = quo('.datebutton');
    accept = quo('.accept');
    datebutton.off('tap');
    accept.off('tap');
    datebutton.on('tap', onButtonTap);
    accept.on('tap', setDate);
    re = new RegExp("[0-9][0-9]/[0-9][0-9]/[0-9][0-9][0-9][0-9]", "i");
    if (!input.value.match(re)) {
      selectedDate = new Date();
    } else {
      selectedDate.setDate(input.value.split('/')[0]);
      selectedDate.setMonth(parseInt(input.value.split('/')[1] - 1));
      selectedDate.setYear(input.value.split('/')[2]);
    }
    return showDate();
  };
  setSize = function() {
    var buttonwidth, containerWidth, inputwidth;
    if (!window.quomobile) {
      buttonwidth = (400 / 3) - 3;
      inputwidth = buttonwidth - 20;
      quo('.datebutton').style('width', "" + buttonwidth + "px");
      return quo('input.dateinput').style('width', "" + inputwidth + "px");
    } else {
      containerWidth = Quo.environment().screen.width - 60;
      $$('.dateContainer').style('width', "" + containerWidth + "px");
      buttonwidth = (containerWidth / 3) - 3;
      $$('.datebutton').style('width', "" + buttonwidth + "px");
      return $$('input.dateinput').style('width', "" + (buttonwidth - 18) + "px");
    }
  };
  setPosition = function(input) {
    var bgr, bodywidth, margLeft, margTop, pickerwidth, pickwin;
    bgr = quo('#quoDatePicker');
    if (window.quomobile) {
      pickwin = bgr.children('.dateContainer');
      pickwin.style('margin-left', "" + ((bgr[0].offsetWidth - pickwin[0].offsetWidth) / 2) + "px");
      return pickwin.style('margin-top', "" + ((bgr[0].offsetHeight - pickwin[0].offsetHeight) / 2) + "px");
    } else {
      margLeft = input.offsetLeft;
      margTop = input.offsetTop;
      bodywidth = quo('body')[0].offsetWidth;
      pickerwidth = quo('#quoDatePicker .dateContainer')[0].offsetWidth;
      if (margLeft + pickerwidth < bodywidth) {
        return bgr.style('margin-left', margLeft);
      } else {
        return bgr.style('margin-left', bodywidth - pickerwidth);
      }
    }
  };
  onFieldTap = function() {
    return showDatePicker(this);
  };
  onButtonTap = function() {
    var id;
    id = this.id;
    switch (id) {
      case "plusd":
        return changeDate("PLUS", 'DAY');
      case "minusd":
        return changeDate("MINUS", 'DAY');
      case "plusm":
        return changeDate("PLUS", 'MONTH');
      case "minusm":
        return changeDate("MINUS", 'MONTH');
      case "plusy":
        return changeDate("PLUS", 'YEAR');
      case "minusy":
        return changeDate("MINUS", 'YEAR');
    }
  };
  changeDate = function(action, type) {
    if (type === 'DAY') {
      switch (action) {
        case 'PLUS':
          selectedDate.setDate(selectedDate.getDate() + 1);
          break;
        case 'MINUS':
          selectedDate.setDate(selectedDate.getDate() - 1);
      }
    } else if (type === 'MONTH') {
      switch (action) {
        case 'PLUS':
          selectedDate.setMonth(selectedDate.getMonth() + 1);
          break;
        case 'MINUS':
          selectedDate.setMonth(selectedDate.getMonth() - 1);
      }
    } else if (type === 'YEAR') {
      switch (action) {
        case 'PLUS':
          selectedDate.setFullYear(selectedDate.getFullYear() + 1);
          break;
        case 'MINUS':
          selectedDate.setFullYear(selectedDate.getFullYear() - 1);
      }
    }
    return showDate();
  };
  showDate = function() {
    quo('.tdays')[0].value = selectedDate.getDate();
    quo('.tmonths')[0].value = selectedDate.getMonth() + 1;
    quo('.tyears')[0].value = selectedDate.getFullYear();
    return quo('.actualDate').html(" " + names['days'][selectedDate.getDay()] + " " + (selectedDate.getDate()) + " de " + names['months'][selectedDate.getMonth()] + " de " +  (selectedDate.getFullYear()));
  };
  pad = function(num) {
    var str;
    str = '' + num;
    while (str.length !== 2) {
      str = '0' + str;
    }
    return str;
  };
  unpad = function(num) {
    if (num[0] === '0') {
      return num[1];
    } else {
      return num;
    }
  };
  setDate = function() {
    var days, months, years;
    days = quo('.tdays')[0];
    months = quo('.tmonths')[0];
    years = quo('.tyears')[0];
    if (!isNaN(days.value && days.value !== "" && !isNaN(months.value && months.value !== "" && !isNaN(years.value && years.value !== "")))) {
      launcherInput.value = "" + (pad(days.value)) + "/" + (pad(months.value)) + "/" + years.value;
      return removePicker();
    }
  };
  removePicker = function() {
    var prev;
    prev = document.querySelectorAll('#quoDatePicker');
    if (prev.length !== 0) {
      return prev[0].parentNode.removeChild(prev[0]);
    }
  };
  return {
    init: init
  };
})(Quo);

quoDatePicker.init();