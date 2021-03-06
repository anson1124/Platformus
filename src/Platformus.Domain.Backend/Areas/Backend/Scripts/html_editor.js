﻿// Copyright © 2015 Dmitry Sikorsky. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

(function (platformus) {
  platformus.editors = platformus.editors || [];
  platformus.editors.html = {};
  platformus.editors.html.create = function (container, member) {
    createField(member).appendTo(container);
  };

  function createField(member) {
    var field = $("<div>").addClass("form__field").addClass("field");

    platformus.editors.base.createLabel(member).appendTo(field);

    if (member.isPropertyLocalizable) {
      field.addClass("field--multilingual")

      for (var i = 0; i < member.property.localizations.length; i++) {
        var localization = member.property.localizations[i];

        if (localization.culture.code != "__") {
          platformus.editors.base.createCulture(localization).appendTo(field);
          createTextArea(member, localization).appendTo(field);
          platformus.ui.initializeTinyMce(platformus.editors.base.getIdentity(member, localization));

          if (i != member.property.localizations.length - 1) {
            platformus.editors.base.createMultilingualSeparator().appendTo(field);
          }
        }
      }
    }

    else {
      for (var i = 0; i < member.property.localizations.length; i++) {
        var localization = member.property.localizations[i];

        if (localization.culture.code == "__") {
          createTextArea(member, localization).appendTo(field);
          platformus.ui.initializeTinyMce(platformus.editors.base.getIdentity(member, localization));
        }
      }
    }

    return field;
  }

  function createTextArea(member, localization) {
    var identity = platformus.editors.base.getIdentity(member, localization);
    var textArea = $("<textarea>").addClass("field__text-area");

    if (localization.culture.code != "__") {
      textArea.addClass("field__text-area--multilingual");
    }

    return textArea
      .addClass("text-area")
      .attr("id", identity)
      .attr("name", identity)
      .attr("data-culture", localization.culture.code)
      .html(localization.value);
  }
})(window.platformus = window.platformus || {});