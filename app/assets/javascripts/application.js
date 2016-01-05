// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui/jquery-ui
//= require bootstrap-sass-official/assets/javascripts/bootstrap-sprockets

//= require angular/angular
//= require angular-devise
//= require angular-rails-templates
//= require angular-xeditable
//= require angular-resource/angular-resource
//= require lodash/lodash
//= require angular-ui-router
//= require angular-ui-sortable/sortable
//= require angular-bootstrap/ui-bootstrap-tpls.min.js
//= require bootstrap-ui-datetime-picker/dist/datetime-picker.min.js
//= require ng-file-upload
//= require ng-file-upload-shim

//= require_tree .

$('#newProject').animate({scrollTop: $('#newProject').prop("scrollHeight")}, 500);
