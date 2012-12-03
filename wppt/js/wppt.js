var wppt_chart;
var wppt_result = {
  r: 0,
  i: 0,
  a: 0,
  s: 0,
  e: 0,
  c: 0
};
var wppt_score = {
  r: 0,
  i: 0,
  a: 0,
  s: 0,
  e: 0,
  c: 0
};
// functions
var wppt_content, wppt_report, wppt_questionnaire_done, wppt_display_score;

jQuery(document).ready(function($){
  wppt_chart = {
    bar1: $('.graph-container > li:nth-child(1) .bar-inner'),
    bar2: $('.graph-container > li:nth-child(2) .bar-inner'),
    bar3: $('.graph-container > li:nth-child(3) .bar-inner'),
    bar4: $('.graph-container > li:nth-child(4) .bar-inner'),
    bar5: $('.graph-container > li:nth-child(5) .bar-inner'),
    bar6: $('.graph-container > li:nth-child(6) .bar-inner')
  };
  $('.wppt-start').click(function(e){
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
    wppt_data.name = $('.userdata-name').val();
    $('.report-userdata-name').text(wppt_data.name);
    $('.content-userdata-name').text(wppt_data.name);

    Avgrund.hide();
    wppt_content();
  });

  $('.wppt-finish').click(function(e){
    e.preventDefault();
    if(!wppt_questionnaire_done()){
      alert('Please complete the questionnaire!');
      return;
    }

    wppt_report();
  });

  wppt_questionnaire_done = function(){
    for (var i = $('#qa-list .qa-item').length - 1; i >= 0; i--) {
      if(!$('input[type="radio"]:checked', $('#qa-list .qa-item')[i]).length){
        return false;
      }
    };

    return true;
  }

  var reset_chart = function(){
    wppt_chart.bar1.css({'height': 0, 'bottom': '-2.5em'});
    wppt_chart.bar2.css({'height': 0, 'bottom': '-2.5em'});
    wppt_chart.bar3.css({'height': 0, 'bottom': '-2.5em'});
    wppt_chart.bar4.css({'height': 0, 'bottom': '-2.5em'});
    wppt_chart.bar5.css({'height': 0, 'bottom': '-2.5em'});
    wppt_chart.bar6.css({'height': 0, 'bottom': '-2.5em'});
  }

  wppt_content = function(){
    $('#wppt-intro').removeClass('show-step').addClass('hide-step');
    $('#wppt-content').removeClass('hide-step').addClass('show-step');
    $('html, body').animate({ scrollTop: $("#wppt-content").offset().top - 80 }, 500);
  }

  wppt_display_score = function(){
    wppt_chart.bar1.css({'height': wppt_score.r + '%', 'bottom': (wppt_score.r == 0?'-2.5em':0)});
    wppt_chart.bar2.css({'height': wppt_score.i + '%', 'bottom': (wppt_score.i == 0?'-2.5em':0)});
    wppt_chart.bar3.css({'height': wppt_score.a + '%', 'bottom': (wppt_score.a == 0?'-2.5em':0)});
    wppt_chart.bar4.css({'height': wppt_score.s + '%', 'bottom': (wppt_score.s == 0?'-2.5em':0)});
    wppt_chart.bar5.css({'height': wppt_score.e + '%', 'bottom': (wppt_score.e == 0?'-2.5em':0)});
    wppt_chart.bar6.css({'height': wppt_score.c + '%', 'bottom': (wppt_score.c == 0?'-2.5em':0)});
  }

  wppt_report = function(){
    // calculate result
    var nqa = $('#qa-list .qa-item').length;
    for(component in wppt_result){
      wppt_result[component] = $('#qa-list .qa-item input[value="' + component + '"]:checked').length;
    }

    // setup chart
    reset_chart();

    wppt_score = {
      r: ((wppt_result.r > 0)?(Math.floor(wppt_result.r / nqa * 100)):0),
      i: ((wppt_result.i > 0)?(Math.floor(wppt_result.i / nqa * 100)):0),
      a: ((wppt_result.a > 0)?(Math.floor(wppt_result.a / nqa * 100)):0),
      s: ((wppt_result.s > 0)?(Math.floor(wppt_result.s / nqa * 100)):0),
      e: ((wppt_result.e > 0)?(Math.floor(wppt_result.e / nqa * 100)):0),
      c: ((wppt_result.c > 0)?(Math.floor(wppt_result.c / nqa * 100)):0)
    };

    // presentate result value
    $('.graph-container > li:nth-child(1) .component-result').text( wppt_score.r + '%');
    $('.graph-container > li:nth-child(2) .component-result').text( wppt_score.i + '%');
    $('.graph-container > li:nth-child(3) .component-result').text( wppt_score.a + '%');
    $('.graph-container > li:nth-child(4) .component-result').text( wppt_score.s + '%');
    $('.graph-container > li:nth-child(5) .component-result').text( wppt_score.e + '%');
    $('.graph-container > li:nth-child(6) .component-result').text( wppt_score.c + '%');

    // disable inputs
    $('#qa-list .qa-item').css({'color': 'gray'});
    $('#qa-list .qa-item input').attr('disabled','disabled');
    $('#wppt-report').removeClass('hide-step').removeClass('hidden').addClass('show-step');
    $('html, body').animate({ scrollTop: ($("#wppt-report").offset().top - 40) }, 500);
    setTimeout('wppt_display_score();', 1500);
  }
});