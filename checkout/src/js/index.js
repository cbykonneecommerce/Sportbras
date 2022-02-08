(function () {

  function init() {
    activeStepBar();
    addBlockWhenComplementIsEmpty();
  }

  function activeStepBar() {
    $(window).on('ready hashchange', function () {

      const hash = window.location.hash.replace('#/', '');

      const steps = [
        {
          name: 'cart',
        },
        {
          name: 'profile',
        },
        {
          name: 'shipping',
        },
        {
          name: 'payment',
        }
      ];

      const findIndex = steps.findIndex(item => item.name === hash);

      function activateStep(name) {
        const element = $(`#${name}`);
        element.addClass('active');
        $(`#${name} + span`).addClass('active');
      }

      function inactiveStep(name) {
        const element = $(`#${name}`);
        element.removeClass('active');
        $(`#${name} + span`).removeClass('active');
      }

      steps.forEach((item, index) => {

        if (index < findIndex) {
          activateStep(item.name);
        } else if (index > findIndex) {
          inactiveStep(item.name);
        }

        if (index === findIndex) {
          const element = $(`#${item.name}`);
          element.addClass('active');
          $(`#${item.name} + span`).removeClass('active');
        }
      });

    });
  }

  function addBlockWhenComplementIsEmpty() {
    $(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
      addBlockWhenComplement();
    });

    $(window).on('ready hashchange', function () {
      addBlockWhenComplement();
    });
  }

  function addBlockWhenComplement() {
    if (window.location.hash === '#/shipping') {

      const inputELement = $('input#ship-complement');

      if (inputELement.length) {
        inputELement.prop('placeholder', "Complemento");

        const buttonElement = $('button#btn-go-to-payment');

        if (inputELement.val() === "") {
          inputELement.css('border', '1px solid red');
          buttonElement.prop('disabled', true);
        }

        $('p.input.ship-complement').addClass('required');

        inputELement.on('input', function () {
          if (inputELement.val() === "") {
            inputELement.css('border', '1px solid red');
            buttonElement.prop('disabled', true);
          } else {
            inputELement.css('border', '2px solid #e0e0e0');
            buttonElement.prop('disabled', false);
          }
        });
      }
    }
  }

  init();

})();

$(document).ready(function() {
  setTimeout(() => {

    const linkToHome = "<a href='/' id='go-back-link'>Escolher mais produtos</a>"
    $('.coupon.summary-coupon').prepend(linkToHome)
    $('div#shipping-preview-container').prepend(linkToHome)
  }, 3000)
})