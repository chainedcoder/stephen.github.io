var msg_container = [{
    msg: "Hey there...",
    erasor: 0,
    delay: 500,
    target: ""
  },
  {
    msg: "My name is Stephen",
    erasor: 7,
    delay: 500,
    target: ""
  },
  {
    msg: "Stephen Nyamweya",
    erasor: 0,
    delay: 500,
    target: ""
  },
  {
    msg: "I'm a Software Engineer",
    erasor: 0,
    delay: 500,
    target: ""
  },
  {
    msg: "I'm a christian",
    erasor: 0,
    delay: 500,
    target: ""
  },
  {
    msg: "I'm a hardworker",
    erasor: 0,
    delay: 500,
    target: ""
  },
  {
    msg: "I'm a relentless guy",
    erasor: 0,
    delay: 500,
    target: ""
  }, {
    msg: "I'm very dedicated",
    erasor: 0,
    delay: 500,
    target: ""
  },
  {
    msg: "But mostly...",
    erasor: 0,
    delay: 500,
    target: ""
  },
  {
    msg: "I'm just me.",
    erasor: 0,
    delay: 500,
    target: ""
  },
  {
    msg: "Check out some of my work below.",
    erasor: 0,
    delay: 500,
    target: ""
  }

];
var counter = {
  done: false
}
var oldstates = new Object();
var newstates = new Object();
newstates['typing'] = false;
newstates['next'] = false;
newstates['lock'] = false;
var msgindex = 0;

window.onload = function() {
  scheduler();
}

function scheduler() {
  (function looper(msgindex) {

    setTimeout(function() {
      function type() {
        if (!newstates['typing'] && !newstates['lock'] && !newstates['next']) {
          typer(msg_container[msgindex].msg, 'leadmsg');
        }
        if (newstates['next']) {
          oldstates = $.extend(true, {}, newstates);
          erase();
        }

        function erase() {
          if (!newstates['typing'] && !newstates['lock'] && newstates['next'] && !counter.done) {
            erasor(msg_container[msgindex].msg.length, 'char');
            msgindex += 1;
            if (msgindex === msg_container.length - 1) {
              counter.done = true;
            }
          }
        }

      }
      type();

      if (msgindex < msg_container.length) { //loops if loop times is not exausted. i.e i>0 then decrement
        looper(msgindex);
      }
    }, 1000);

  })(msgindex);
}


function typer(string, target) {
  newstates['next'] = false;
  newstates['typing'] = true;
  newstates['lock'] = true;
  var str_arr = string.split("");

  $('#' + target).addClass('active');

  (function looper(i) {
    setTimeout(function() {
      $('.last').removeClass('last');
      $('#' + target).before('<div class = "char last">' + str_arr[str_arr.length - i] + '</div>');
      if (--i) { //loops if loop times is not exausted. i.e i>0 then decrement
        looper(i);
      } else {
        $('#' + target).removeClass('active');
        $('.last').removeClass('last');
        newstates['next'] = true;
        newstates['typing'] = false;
        newstates['lock'] = false;
      }
    }, 150);
  })(str_arr.length);

}

function erasor(length, target) {
  newstates['next'] = false;
  newstates['typing'] = true;
  newstates['lock'] = true;
  setTimeout(function() {
    (function looper(len) {
      setTimeout(function() {
        $('.' + target).last().remove();
        if (--len) {
          looper(len);
        } else {
          newstates['next'] = false;
          newstates['typing'] = false;
          newstates['lock'] = false;

        }
      }, 100);
    })(length);
  }, 1000);
}
