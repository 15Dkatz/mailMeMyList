angular.module('tasks.controllers', [])

myApp.controller('TasksController', ['$scope', '$rootScope', '$window', 'Authentication', 'sharedTasks', '$ionicPopup', '$timeout', '$firebaseAuth', 'FIREBASE_URL',
  function($scope, $rootScope, $window, Authentication, sharedTasks, $ionicPopup, $timeout, $firebaseAuth, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);


    $scope.tasks = [];
    $scope.completedTasks = [];

    $scope.updateTasksList = function() {
        var tasksList = sharedTasks.getTasksList();
        $scope.tasks = tasksList;
        return tasksList;
    }


    $scope.addTask = function() {
        $window.location.href = '#/addTask';
    };

    auth.$onAuth(function(authUser) {
        if (authUser) {
          $scope.firstname = sharedTasks.getFirstname();
          $scope.lastname = sharedTasks.getLastname();

          console.log("firstname", $scope.firstname, "lastname", $scope.lastname);

          $scope.tasks = sharedTasks.getTasksList();
          $scope.completedTasks = sharedTasks.getCompletedTasksList();
          email = sharedTasks.getEmail();
        }
    })

    // var exerciseList;
    // var exerciseTimeLimit;
    
    // $scope.currentExercise;
    // $scope.exerciseList;

    // $scope.showStartButton = true;

    // $scope.initExList = function() {
    //     exerciseList = sharedTasks.getExerciseList();
    //     // $scope.showStartButton = sharedTasks.getStart
    // }

    // $scope.updateExerciseList = function() {
    //     exerciseList = sharedTasks.getExerciseList();
    //     if (exerciseList) {
    //         if (exerciseList.length>0) {
    //             $scope.currentExercise = exerciseList[0];
    //             exerciseTimeLimit = $scope.currentExercise["time"];
    //         }
    //     }
    //     $scope.exerciseList = exerciseList;
    //     return exerciseList;
    // }

    // var updateExerciseVariables = function() {
    //     $scope.exerciseList = sharedTasks.getExerciseList();
    //     $scope.currentExercise = $scope.exerciseList[0];

    //     // update firebase
    //     // var exerciseListRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/exercises');
    //     // // $scope.$apply(function() {
    //     // exerciseListRef.update({"exerciseList": $scope.exerciseList});
    //     // })
    // }

    // auth.$onAuth(function(authUser) {
    //     if (authUser) {
    //         exerciseList = sharedTasks.getExerciseList();
    //     }
    // })

    $scope.data = {
        showReordering: false,
        shouldShowDelete: false,
        // canSwipe: true
    }

    $scope.reorderItem = function(item, fromIndex, toIndex) {
        $scope.tasks.splice(fromIndex, 1)
        $scope.tasks.splice(toIndex, 0, item)
    }

    $scope.editTaskPlaceholder = "";

    $scope.editTask = function(index) {
        console.log("index", $scope.tasks[index].name);
        $scope.editTaskPlaceholder = $scope.tasks[index].name;
        $scope.newTask = {};
        var myPopup = $ionicPopup.show({
        template: "<input class='inputIndent' placeholder='{{editTaskPlaceholder}}' type='text' ng-model='newTask.name'>",
        title: 'Edit',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.newTask) {
                e.preventDefault();
              } else {
                if ($scope.newTask.name) {
                    $scope.tasks[index]["name"] = $scope.newTask.name;
                }
                sharedTasks.setTasksList($scope.tasks);
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });

      $timeout(function() {
         myPopup.close(); 
      }, 100000);
    }

    // var timer;
    // var exTime = 0;

    // var addTime = function() {
    //     // exTime=sharedTasks.getExTime();
    //     exerciseTimeLimit = $scope.currentExercise["time"];
    //     // console.log($scope.currentExercise["currentTime"], "currentTime");
    //     exTime+=1;
    //     // sharedTasks.setExTime(exTime);

    //     console.log("exTime", exTime)
    //     $scope.$apply(function() {
    //         updateExerciseVariables();
    //     });

    //     if (exTime>exerciseTimeLimit) {
    //         removeCurrentTask();
    //         exTime=0;
    //         // sharedTasks.setExTime(exTime);
    //         // updateExerciseVariables();
    //     }

    //     progressBarCircle.animate(exTime/exerciseTimeLimit, function() {
    //         progressBarCircle.setText(exTime);
    //     });



    // }

    // $scope.$on('builtNewSet', function(event, args) {
    //     console.log("receiving builtNewSet broadcast");
    //     progressBarCircle.animate(0, function() {
    //         progressBarCircle.setText(0);
    //     });
    //     exTime=0;
    // });

    $scope.removeTask = function(index) {
        $scope.tasks.splice(index, 1);
        sharedTasks.setTasksList($scope.tasks);

    }

    


    $scope.updateCompletedTasksList = function() {
        var completedTasksList = sharedTasks.getCompletedTasksList();
        $scope.completedTasks = completedTasksList;
        return completedTasksList;
    }


    $scope.completeTask = function(task, index) {
        console.log("completed", task, "completedTasks", $scope.completedTasks);
        // make into method - adding a task to completed Tasks?
        $scope.removeTask(index);

        $scope.completedTasks.unshift(task);
        sharedTasks.setCompletedTasksList($scope.completedTasks);
    }

    $scope.removeCompletedTask = function(index) {
        $scope.completedTasks.splice(index, 1);
        sharedTasks.setCompletedTasksList($scope.completedTasks);
    }


    // var removeCurrentTask = function() {
    //     $scope.exerciseList.shift();
    //     console.log($scope.exerciseList);
    //     sharedTasks.setExerciseList($scope.exerciseList);
    //     updateExerciseVariables(); 
    // }




    // $scope.startExercise = function() {
    //     // exerciseTimeLimit = $scope.currentExercise["time"];
    //     $scope.showStartButton = false;
    //     if (!timer) {
    //         timer = setInterval(addTime, 1000);
    //     }
    // }

    // $scope.pauseBtn = {
    //     'name': 'pause',
    //     'ionname': 'ion-pause'
    // }

    // $scope.pauseExercise = function() {
    //     clearInterval(timer);
    //     if ($scope.pauseBtn['name']=='pause') {
    //         $scope.pauseBtn['name']='resume';
    //         $scope.pauseBtn['ionname'] = 'ion-play';
    //     } else {
    //         timer = false;
    //         $scope.pauseBtn['name']='pause';
    //         $scope.pauseBtn['ionname'] = 'ion-pause';
    //         $scope.startExercise();
    //     }

    // }

    // $scope.addExercise = function() {
    //     // popup template for new Exercise
    //     $scope.newExercise = {};
    //     var myPopup = $ionicPopup.show({
    //     template: "<input class='inputIndent' placeholder='Name' type='text' ng-model='newExercise.exercise'><br><input type='number' class='inputIndent' placeholder='Time in seconds' ng-model='newExercise.time'>",
    //     title: 'New Exercise',
    //     scope: $scope,
    //     buttons: [
    //       { text: 'Cancel' },
    //       {
    //         text: '<b>Add</b>',
    //         type: 'button-positive',
    //         onTap: function(e) {
    //           if (!$scope.newExercise) {
    //             e.preventDefault();
    //           } else {
    //             $scope.exerciseList.push($scope.newExercise);
    //             sharedTasks.setExerciseList($scope.exerciseList);
    //             updateExerciseVariables();
    //           }
    //         }
    //       }
    //      ]
    //     });

    //     myPopup.then(function(res) {
    //       console.log('Tapped!', res);
    //     });

    //     $timeout(function() {
    //        myPopup.close(); 
    //     }, 10000);

    // }

    var email;

    emailjs.init("user_zIQJADXda9pwLf6zl91FS");

    var tasksEmailDisplay = "";
    // for (var t=0; t<$scope.tasks.length; t++) {
    //     tasksEmailDisplay += $scope.tasks[t].name + "\n";
    //     console.log(t);
    // }
    $scope.emailMessage = "";

    $scope.sendEmail = function() {
        for (var t=0; t<$scope.tasks.length; t++) {
            tasksEmailDisplay += $scope.tasks[t].name + "<br>";
        }
        // console.log(tasksEmailDisplay, $scope.tasks.length, $scope.tasks[1].name,  $scope.tasks[0]["name"]);
        emailjs.send("gmail", "template_p0t0rcn6", {"to_email": email, "to_name": $scope.firstname, "tasks": tasksEmailDisplay})
        .then(function(response) {
           console.log("SUCCESS. status=%d, text=%s", response.status, response.text);   
           $scope.$apply(function(){
                $scope.emailMessage = "Email sent successfully."
            });
        }, function(err) {
           console.log("FAILED. error=", err);
           $scope.$apply(function(){
                $scope.emailMessage = "Error sending email."
            });
        });
        setTimeout(function() {
            $scope.$apply(function(){
                $scope.emailMessage = "";
            });    
            console.log("changing email message to ", $scope.emailMessage);
        }, 5000);

        
    }


    var sms;

    // Twilio Credentials 
    var accountSid = 'ACccf2748672db916f65e7820dfcdf092a'; 
    var authToken = 'f42ea84e730739ba9f31284a4252b4ae'; 
     
    //require the Twilio module and create a REST client 
    
     
    

    $scope.sendText = function() {
    // client.messages.create({ 
    //     to: "+16518675309", 
    //     from: "+14158141829", 
    //     body: "Hey Jenny! Good luck on the bar exam!", 
    //     mediaUrl: "http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg",  
    // }, function(err, message) { 
    //     console.log(message.sid); 
    // });
    // client.messages.create({ 
    //     to: "+4159904947",
    //     from: "+12036016238",  
    //     body: "Your tasks..."  
    // }, function(err, message) { 
    //     console.log(message.sid); 
    // });
    }

    // email template template_p0t0rcn6

    $scope.printTasks = function() {
        // allow user to save a pdf formatted version of their tasks.
    }

    

}]); // Controller

// printTasks() function which allows user to save a pdf format of the file
// Implement a searchTasks method!
// Host web urgentTasks at 15Dkatz.github.io and use ChromeExtension for pageHighlight Task additions.
