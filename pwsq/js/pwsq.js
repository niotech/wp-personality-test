var pwsq_chart;
var pwsq_result = {
  r: 0,
  i: 0,
  a: 0,
  s: 0,
  e: 0,
  c: 0
};
var pwsq_score = {
  r: 0,
  i: 0,
  a: 0,
  s: 0,
  e: 0,
  c: 0
};
// functions
var pwsq_content, pwsq_report, pwsq_questionnaire_done, pwsq_display_score;

jQuery(document).ready(function($){
  pwsq_chart = {
    bar1: $('.graph-container > li:nth-child(1) .bar-inner'),
    bar2: $('.graph-container > li:nth-child(2) .bar-inner'),
    bar3: $('.graph-container > li:nth-child(3) .bar-inner'),
    bar4: $('.graph-container > li:nth-child(4) .bar-inner'),
    bar5: $('.graph-container > li:nth-child(5) .bar-inner'),
    bar6: $('.graph-container > li:nth-child(6) .bar-inner')
  };
  $('.pwsq-start').click(function(e){
    e.preventDefault();
    Avgrund.show('#acquire-user-data');

    $('html, body').animate({ scrollTop: (($(document).height() / 2) - ($('#acquire-user-data').height())) }, 500);
  })
  $('.close-popup').live('click', function(e){
    e.preventDefault();

    // check for user data validity
    if($('.userdata-name').val().length == 0){
      alert('Please enter your name!');
      $('.userdata-name').focus();
      return;
    }

    // store user data
    pwsq_data.name = $('.userdata-name').val();
    $('.report-userdata-name').text(pwsq_data.name);
    $('.content-userdata-name').text(pwsq_data.name);

    Avgrund.hide();
    pwsq_content();
  });

  $('.pwsq-finish').click(function(e){
    e.preventDefault();
    if(!pwsq_questionnaire_done()){
      alert('Please complete the questionnaire!');
      return;
    }

    pwsq_report();
  });

  pwsq_questionnaire_done = function(){
    for (var i = $('#qa-list .qa-item').length - 1; i >= 0; i--) {
      if(!$('input[type="radio"]:checked', $('#qa-list .qa-item')[i]).length){
        return false;
      }
    };

    return true;
  }

  var reset_chart = function(){
    pwsq_chart.bar1.css({'height': 0, 'bottom': '-2.5em'});
    pwsq_chart.bar2.css({'height': 0, 'bottom': '-2.5em'});
    pwsq_chart.bar3.css({'height': 0, 'bottom': '-2.5em'});
    pwsq_chart.bar4.css({'height': 0, 'bottom': '-2.5em'});
    pwsq_chart.bar5.css({'height': 0, 'bottom': '-2.5em'});
    pwsq_chart.bar6.css({'height': 0, 'bottom': '-2.5em'});
  }

  pwsq_content = function(){
    $('#pwsq-intro').removeClass('show-step').addClass('hide-step');
    $('#pwsq-content').removeClass('hide-step').addClass('show-step');
    $('html, body').animate({ scrollTop: $("#pwsq-content").offset().top - 80 }, 500);
  }

  pwsq_display_score = function(){
    pwsq_chart.bar1.css({'height': pwsq_score.r + '%', 'bottom': (pwsq_score.r == 0?'-2.5em':0)});
    pwsq_chart.bar2.css({'height': pwsq_score.i + '%', 'bottom': (pwsq_score.i == 0?'-2.5em':0)});
    pwsq_chart.bar3.css({'height': pwsq_score.a + '%', 'bottom': (pwsq_score.a == 0?'-2.5em':0)});
    pwsq_chart.bar4.css({'height': pwsq_score.s + '%', 'bottom': (pwsq_score.s == 0?'-2.5em':0)});
    pwsq_chart.bar5.css({'height': pwsq_score.e + '%', 'bottom': (pwsq_score.e == 0?'-2.5em':0)});
    pwsq_chart.bar6.css({'height': pwsq_score.c + '%', 'bottom': (pwsq_score.c == 0?'-2.5em':0)});
  }

  pwsq_report = function(){
    // calculate result
    var nqa = $('#qa-list .qa-item').length;
    for(component in pwsq_result){
      pwsq_result[component] = $('#qa-list .qa-item input[value="' + component + '"]:checked').length;
    }

    // setup chart
    reset_chart();

    pwsq_score = {
      r: ((pwsq_result.r > 0)?(Math.floor(pwsq_result.r / nqa * 100)):0),
      i: ((pwsq_result.i > 0)?(Math.floor(pwsq_result.i / nqa * 100)):0),
      a: ((pwsq_result.a > 0)?(Math.floor(pwsq_result.a / nqa * 100)):0),
      s: ((pwsq_result.s > 0)?(Math.floor(pwsq_result.s / nqa * 100)):0),
      e: ((pwsq_result.e > 0)?(Math.floor(pwsq_result.e / nqa * 100)):0),
      c: ((pwsq_result.c > 0)?(Math.floor(pwsq_result.c / nqa * 100)):0)
    };

    // presentate result value
    $('.graph-container > li:nth-child(1) .component-result').text( pwsq_score.r + '%');
    $('.graph-container > li:nth-child(2) .component-result').text( pwsq_score.i + '%');
    $('.graph-container > li:nth-child(3) .component-result').text( pwsq_score.a + '%');
    $('.graph-container > li:nth-child(4) .component-result').text( pwsq_score.s + '%');
    $('.graph-container > li:nth-child(5) .component-result').text( pwsq_score.e + '%');
    $('.graph-container > li:nth-child(6) .component-result').text( pwsq_score.c + '%');

    // disable inputs
    $('#qa-list .qa-item').css({'color': 'gray'});
    $('#qa-list .qa-item input').attr('disabled','disabled');
    $('#pwsq-report').removeClass('hide-step').removeClass('hidden').addClass('show-step');
    $('html, body').animate({ scrollTop: ($("#pwsq-report").offset().top - 40) }, 500);
    setTimeout('pwsq_display_score();', 1500);
  }
});