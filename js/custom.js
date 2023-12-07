let currentStepIndex = 0;
const minStep = 0;
let maxStep = $(".step").length - 1;

let canScroll = true;
const freezeScrollMs = 100;
let touchStartY = 0;

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
  console.log("newStep", newStep);
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

  function handleMouseWheel(event) {
    // 上一步
    if (currentStepIndex < 3 && event.deltaY === 1) {
      handleGoToStepIndex(currentStepIndex - 1);
    }

    if (currentStepIndex > 1) return;

    // 下一步
    if (event.deltaY === -1) {
      handleGoToStepIndex(currentStepIndex + 1);
    }
  }

  function handleTouchMove(event) {
    const deltaY = event.originalEvent.touches[0].clientY - touchStartY;

    // 上一步
    if (currentStepIndex < 3 && deltaY > 0) {
      handleGoToStepIndex(currentStepIndex - 1);
    }

    if (currentStepIndex > 1) return;

    // 下一步
    if (deltaY < 0) {
      handleGoToStepIndex(currentStepIndex + 1);
    }
  }

  $("#main").on("mousewheel", function (event) {
    if (window.innerWidth >= 768) {
      handleMouseWheel(event);
    }
  });

  $("#main").on("touchstart", (event) => {
    touchStartY = event.originalEvent.touches[0].clientY;
  });

  $("#main").on("touchmove", function (event) {
    if (window.innerWidth < 768) {
      handleTouchMove(event);
    }
  });

  // 保留原有的 mousewheel 行為
  $(document).on("touchmove", function () {
    if (window.innerWidth >= 768) {
      $(document).trigger("mousewheel");
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
            alert("Completely submit")
          }
      });
  });
});
