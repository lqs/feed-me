define([
    'jquery',
    'knockout',
    'view-models/menu-view-model',
    'view-models/restaurants-view-model',
    'controllers/message-center',
    'view-models/order-view-model',
    'view-models/user-view-model',
    'view-models/alert-view-model',
    'bindings/delay-css'
  ], function(
    jQuery,
    Knockout,
    MenuViewModel,
    RestaurantsViewModel,
    MessageCenter,
    OrderViewModel,
    UserViewModel,
    Alert,
    BindingDelayCss
  ) {
'use strict';

// Data logic.
var rests = new RestaurantsViewModel();
var menu = new MenuViewModel();
var order = new OrderViewModel();
var userInfoModal = jQuery('#userinfo');

UserViewModel.nameAbsent.subscribe(function(value) {
  userInfoModal.modal(value ? 'show' : 'hide');
});

rests.on('change-menu', function(newURL) {
  menu.fetch(newURL);
});

menu.on('order', function(name, price) {
  order.addDish(name, rests.selectedRestName(), 1, price);
});

jQuery(document.body)
  .ajaxStart(function() {
    this.classList.add('loading');
  })
  .ajaxStop(function() {
    this.classList.remove('loading');
  })
  .tooltip({
    selector: "a[rel=tooltip]",
    placement: 'bottom'
  });

// Take off!!
UserViewModel.fetch()
  .pipe(function() {
    return rests.fetch();
  },function() {
    bindingContext.needSignIn(true);
  }).
  done(function() {
    // bindingContext.needSignIn(true);
    bindingContext.loaded(true);
  });

// rests.fetch();


var bindingContext = {
  loaded: Knockout.observable(false),
  needSignIn: Knockout.observable(false),
  user: UserViewModel,
  menu: menu,
  rests: rests,
  alert: Alert,
  order: Knockout.observable(order),
  newOrder: function() {
    this.order(order = new OrderViewModel());
  },
  makeOrder: function() {
    this.order().save().done(function() {
      Alert.message('订单保存成功！');
      this.newOrder();
    }.bind(this)).fail(function() {
      Alert.message('订单保存失败，再试一次？');
    });
  },
  confirmSignout: function(data, e) {
    if (!window.confirm('确定退出么？')) {
      e.preventDefault();
    }
  }
};
bindingContext.welcomeStatus = Knockout.computed(function() {
  return this.loaded() ? 'greeting' : this.needSignIn() ? 'signin' : 'loading';
}, bindingContext);

Knockout.applyBindings(bindingContext);

window.user = UserViewModel;
window.bc = bindingContext;
});