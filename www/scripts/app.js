var myApp = angular.module('tasksApp', ['ionic', 'firebase'])
   .constant('FIREBASE_URL', 'https://mailmemylist.firebaseio.com/');


myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tasks', {
    url: '/tasks',
    // abstract: true,
    templateUrl: 'templates/tasks.html',
    controller: 'TasksController'
  })

  .state('addTask', {
    url: '/addTask',
    // abstract: true,
    templateUrl: 'templates/addTask.html',
    controller: 'addTaskController'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AccountController'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegistrationController'
  })

  .state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'AccountController'
  })

  $urlRouterProvider.otherwise('login');
});

// to do:
// Add daily email functionality
// Add more attractive task completion.
// Add google and facebook login/signup functionality.
// Add sms functionality.
// Add email frequency and sms frequency customization to functionality.
// add alarms

// click outside of task.html in order to go back to tasklist

// Add google and facebook login/signup functionality.

// link to edit email template.
// https://dashboard.emailjs.com/templates/id:template_p0t0rcn6

// to add to email functionality
// allow user to edit options for frequency of emails.

// change the icon and splash screen in ihpone release

