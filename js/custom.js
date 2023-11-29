let currentStepIndex = 0;
const minStep = 0;
let maxStep = $(".step").length - 1;

let canScroll = true;
const freezeScrollMs = 100;

function _getNextStep(_newStep) {
  if (_newStep < minStep) return minStep;
  if (_newStep > maxStep) return maxStep;

  return _newStep;
}
function _changeStep(_newStep) {
  const targetStep = _newStep * -1;

  $("#wrapper").css("transform", `translate3d(0, ${targetStep * 100}vh, 0)`);
}

function handleGoToStepIndex(_newStep, _bifurcationClassName) {
  if (!canScroll) return;
  if (_bifurcationClassName) {
    $(".bifurcation").hide();
    $(`.${_bifurcationClassName}`).show();
  }

  canScroll = false;
  $(".nextButton").attr("disabled", true);
  setTimeout(() => {
    canScroll = true;
    $(".nextButton").attr("disabled", false);
  }, freezeScrollMs);

  const newStep = _getNextStep(_newStep);
  console.log("newStep",newStep)
  currentStepIndex = newStep;
  _changeStep(newStep);
}

function handleReStart() {
  currentStepIndex = 0;
  canScroll = true;
  $(".bifurcation").hide();

  $("#wrapper").css("transition", "transform 0s");
  handleGoToStepIndex(currentStepIndex);
  setTimeout(() => {
    $("#wrapper").css("transition", "transform 0.1s");
  }, 0);
}

$(document).ready(() => {
    maxStep = $(".step").length - 1;
  $("#main").on("mousewheel", (event) => {
    // prev step
    if (currentStepIndex < 3 && event.deltaY === 1) {
      handleGoToStepIndex(currentStepIndex - 1);
    }

    if (currentStepIndex > 1) return;
    // next step
    if (event.deltaY === -1) {
      handleGoToStepIndex(currentStepIndex + 1);
    }
  });
});

//form
$(function () {
  $('#submit').on('click', function() {
      var name = $('#demo_name').val() || '未填寫';
      var email = $('#demo_email').val() || '未填寫';
      var country = $('#demo_country').val() || '未填寫';

      // post
      var data = {
          'entry.238376280': name,
          'entry.291636501': email,
          'entry.1520402620': country,
      };

      $.ajax({
          type: 'POST',
          url: 'https://docs.google.com/forms/d/e/1FAIpQLSe-Kyj52sOAGjf6GXo-xSHAAHHK1kQ5Rgpt4kKgdLsl5LLT0g/formResponse',
          data: data,
          complete: function() {
            $("#demo_name").val("");
            $("#demo_email").val("");
            $("#demo_country").val("");
            alert("資料已送出")
            //alert("Information has been sent!");
          }
      });
  });
});
