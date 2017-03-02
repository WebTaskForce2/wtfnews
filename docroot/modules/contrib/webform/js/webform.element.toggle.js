/**
 * @file
 * Javascript behaviors for toggle integration.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Initialize toggle element using Toggles.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.webformToggle = {
    attach: function (context) {
      $(context).find('.js-webform-toggle').once('webform-toggle').each(function () {
        var $toggle = $(this);
        var $wrapper = $toggle.parent();
        var $checkbox = $wrapper.find('input[type="checkbox"]');
        var $label = $wrapper.find('label');

        $toggle.toggles({
          checkbox: $checkbox,
          on: $checkbox.is(':checked'),
          clicker: $label,
          text: {
            on: $toggle.attr('data-toggle-text-on') || '',
            off: $toggle.attr('data-toggle-text-off') || ''
          }
        });

        // If checkbox is disabled then add the .disabled class to the toggle.
        if ($checkbox.attr('disabled') || $checkbox.attr('readonly')) {
          $toggle.addClass('disabled');
        }

        // Add .clearfix to the wrapper.
        $wrapper.addClass('clearfix')

      });
    }
  };

  // Track the disabling of a toggle's checkbox using states.
  $(document).on('state:disabled', function (event) {
    $('.js-webform-toggle').each(function () {
      var $toggle = $(this);
      var $wrapper = $toggle.parent();
      var $checkbox = $wrapper.find('input[type="checkbox"]');
      var isDisabled = ($checkbox.attr('disabled') || $checkbox.attr('readonly'));
      (isDisabled) ? $toggle.addClass('disabled') : $toggle.removeClass('disabled');
    });
  });

})(jQuery, Drupal);
