/**
Core script to handle the entire theme and core functions
**/
var Quickuser = (function () {
  // Handles quick sidebar toggler
  var handleQuickuserToggler = function () {
    // quick sidebar toggler
    $(
      ".dropdown-quick-sidebar-toggler a, .page-quick-sidebar-toggler, .quick-sidebar-toggler"
    ).click(function (e) {
      $("body").toggleClass("page-quick-sidebar-open");
    });
  };

  // Handles quick sidebar chats
  var handleQuickuserChat = function () {
    var wrapper = $(".page-quick-sidebar-wrapper");
    var wrapperChat = wrapper.find(".page-quick-sidebar-chat");

    var initChatSlimScroll = function () {
      var chatUsers = wrapper.find(".page-quick-sidebar-chat-users");
      var chatUsersHeight;

      chatUsersHeight =
        wrapper.height() - wrapper.find(".nav-tabs").outerHeight(true);

      // chat user list
      App.destroySlimScroll(chatUsers);
      chatUsers.attr("data-height", chatUsersHeight);
      App.initSlimScroll(chatUsers);

      var chatMessages = wrapperChat.find(
        ".page-quick-sidebar-chat-user-messages"
      );
      var chatMessagesHeight =
        chatUsersHeight -
        wrapperChat
          .find(".page-quick-sidebar-chat-user-form")
          .outerHeight(true);
      chatMessagesHeight =
        chatMessagesHeight -
        wrapperChat.find(".page-quick-sidebar-nav").outerHeight(true);

      // user chat messages
      App.destroySlimScroll(chatMessages);
      chatMessages.attr("data-height", chatMessagesHeight);
      App.initSlimScroll(chatMessages);
    };

    initChatSlimScroll();
    App.addResizeHandler(initChatSlimScroll); // reinitialize on window resize

    wrapper
      .find(".page-quick-sidebar-chat-users .media-list > .media")
      .click(function () {
        wrapperChat.addClass("page-quick-sidebar-content-item-shown");
      });

    wrapper
      .find(".page-quick-sidebar-chat-user .page-quick-sidebar-back-to-list")
      .click(function () {
        wrapperChat.removeClass("page-quick-sidebar-content-item-shown");
      });

    var handleChatMessagePost = function (e) {
      e.preventDefault();

      var chatContainer = wrapperChat.find(
        ".page-quick-sidebar-chat-user-messages"
      );
      var input = wrapperChat.find(
        ".page-quick-sidebar-chat-user-form .form-control"
      );

      var text = input.val();
      if (text.length === 0) {
        return;
      }

      var preparePost = function (dir, time, name, avatar, message) {
        var tpl = "";
        tpl += '<div class="post ' + dir + '">';
        tpl +=
          '<img class="avatar" alt="" src="' +
          Layout.getLayoutImgPath() +
          avatar +
          '.jpg"/>';
        tpl += '<div class="message">';
        tpl += '<span class="arrow"></span>';
        tpl += '<a href="#" class="name">Bob Nilson</a>&nbsp;';
        tpl += '<span class="datetime">' + time + "</span>";
        tpl += '<span class="body">';
        tpl += message;
        tpl += "</span>";
        tpl += "</div>";
        tpl += "</div>";

        return tpl;
      };

      // handle post
      var time = new Date();
      var message = preparePost(
        "out",
        time.getHours() + ":" + time.getMinutes(),
        "Bob Nilson",
        "avatar3",
        text
      );
      message = $(message);
      chatContainer.append(message);

      chatContainer.slimScroll({
        scrollTo: "1000000px",
      });

      input.val("");

      // simulate reply
      setTimeout(function () {
        var time = new Date();
        var message = preparePost(
          "in",
          time.getHours() + ":" + time.getMinutes(),
          "Ella Wong",
          "avatar2",
          "Lorem ipsum doloriam nibh..."
        );
        message = $(message);
        chatContainer.append(message);

        chatContainer.slimScroll({
          scrollTo: "1000000px",
        });
      }, 3000);
    };

    wrapperChat
      .find(".page-quick-sidebar-chat-user-form .btn")
      .click(handleChatMessagePost);
    wrapperChat
      .find(".page-quick-sidebar-chat-user-form .form-control")
      .keypress(function (e) {
        if (e.which == 13) {
          handleChatMessagePost(e);
          return false;
        }
      });
  };

  // Handles quick sidebar tasks
  var handleQuickuserAlerts = function () {
    var wrapper = $(".page-quick-sidebar-wrapper");

    var initAlertsSlimScroll = function () {
      var alertList = wrapper.find(".page-quick-sidebar-alerts-list");
      var alertListHeight;

      alertListHeight =
        wrapper.height() -
        80 -
        wrapper.find(".nav-justified > .nav-tabs").outerHeight();

      // alerts list
      App.destroySlimScroll(alertList);
      alertList.attr("data-height", alertListHeight);
      App.initSlimScroll(alertList);
    };

    initAlertsSlimScroll();
    App.addResizeHandler(initAlertsSlimScroll); // reinitialize on window resize
  };

  // Handles quick sidebar settings
  var handleQuickuserSettings = function () {
    var wrapper = $(".page-quick-sidebar-wrapper");

    var initSettingsSlimScroll = function () {
      var settingsList = wrapper.find(".page-quick-sidebar-settings-list");
      var settingsListHeight;

      settingsListHeight =
        wrapper.height() -
        80 -
        wrapper.find(".nav-justified > .nav-tabs").outerHeight();

      // alerts list
      App.destroySlimScroll(settingsList);
      settingsList.attr("data-height", settingsListHeight);
      App.initSlimScroll(settingsList);
    };

    initSettingsSlimScroll();
    App.addResizeHandler(initSettingsSlimScroll); // reinitialize on window resize
  };

  return {
    init: function () {
      //layout handlers
      handleQuickuserToggler(); // handles quick sidebar's toggler
      handleQuickuserChat(); // handles quick sidebar's chats
      handleQuickuserAlerts(); // handles quick sidebar's alerts
      handleQuickuserSettings(); // handles quick sidebar's setting
    },
  };
})();

if (App.isAngularJsApp() === false) {
  jQuery(document).ready(function () {
    Quickuser.init(); // init metronic core componets
  });
}
