define(
[ 'aloha/core', 'aloha/plugin', 'jquery', 'aloha/command',
  'aloha/console' ],
function ( Aloha, Plugin, jQuery, Commands, console ) {
  "use strict";

  return Plugin.create( 'linebreaks', {
    settings: {
      preventEnter: false
    },

    init: function() {
      this.subscribeEvents();
    },

    subscribeEvents: function() {
      var self = this;
      Aloha.bind('aloha-editable-created', function(e, editable){
        self.bindKeys.apply(self, arguments);
      });
    },

    bindKeys: function(e, editable) {
      var ed = editable;
      var self = this;
      ed.obj.bind('keydown', function(e){
        if (ed.keyCodeMap[e.keyCode] == 'Enter' && !e.shiftKey) {
          if (self.settings.editables) {
            for (var sel in self.settings.editables) {
              if (jQuery(this).is(sel) && self.settings.editables[sel].preventEnter == true) {
                e.preventDefault();
                e.stopImmediatePropagation();
                ed.blur();
                return false;
              }
            }
          }
          if (self.settings.preventEnter) {
            e.preventDefault();
            e.stopImmediatePropagation();
            ed.blur();
            return false;
          }
        }
      });
      // make sure this keydown event happens before aloha's
      var evt = ed.obj.data('events').keydown.pop();
      ed.obj.data('events').keydown.unshift(evt);
    }
  });
});