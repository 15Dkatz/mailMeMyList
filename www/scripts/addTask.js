myApp.controller('addTaskController', ['$scope', '$rootScope', '$window', 'Authentication', 'sharedTasks', '$ionicPopup', '$timeout', '$firebaseAuth', 'FIREBASE_URL',
  function($scope, $rootScope, $window, Authentication, sharedTasks, $ionicPopup, $timeout, $firebaseAuth, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);


    // $scope.tasks = [];


    $scope.addTask = function(taskText) {
        // pull up a new window where the user can add a task
        if (taskText) {
            var newTasksList = [
                    {
                        name: taskText
                    }
                ].concat(sharedTasks.getTasksList());
            sharedTasks.setTasksList(newTasksList);
        }

        $window.location.href = '#/tasks';
    };

    $scope.addTaskByEnter = function($event, taskText) {
        if ($event.keyCode == 13) {
            $scope.addTask(taskText);
        }
    }

    // auth.$onAuth(function(authUser) {
    //     if (authUser) {
    //       $scope.firstname = sharedTasks.getFirstname();
    //       $scope.lastname = sharedTasks.getLastname();

    //       console.log("firstname", $scope.firstname, "lastname", $scope.lastname);

    //       $scope.tasks = sharedTasks.getTasksList();
    //     }
    // })

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

    // $scope.data = {
    //     showReordering: false,
    //     shouldShowDelete: false,
    //     canSwipe: true
    // }

    // $scope.reorderItem = function(item, fromIndex, toIndex) {
    //     $scope.tasks.splice(fromIndex, 1)
    //     $scope.tasks.splice(toIndex, 0, item)
    // }

    // // change color here later!
    // var progressBarCircle = new ProgressBar.Circle("#progressBarCircle", {
    //     color: '#FC752B',
    //     strokeWidth: 5
    // })


    // $scope.editExercise = function(index) {
    //     $scope.newExercise = {};
    //     var myPopup = $ionicPopup.show({
    //     template: "<input class='inputIndent' placeholder='Name' type='text' ng-model='newExercise.exercise'><br><input type='number' class='inputIndent' placeholder='Time' ng-model='newExercise.time'>",
    //     title: 'Edit Exercise',
    //     scope: $scope,
    //     buttons: [
    //       { text: 'Cancel' },
    //       {
    //         text: '<b>Save</b>',
    //         type: 'button-positive',
    //         onTap: function(e) {
    //           if (!$scope.newExercise) {
    //             e.preventDefault();
    //           } else {
    //             if ($scope.newExercise.exercise) {
    //                 $scope.exerciseList[index]["exercise"] = $scope.newExercise.exercise;
    //             }
    //             if ($scope.newExercise.time) {
    //                 $scope.exerciseList[index]["time"] = $scope.newExercise.time;  
    //             }
                
    //             sharedTasks.setExerciseList($scope.exerciseList);
    //             updateExerciseVariables();
    //           }
    //         }
    //       }
    //     ]
    //   });

    //   myPopup.then(function(res) {
    //     console.log('Tapped!', res);
    //   });

    //   $timeout(function() {
    //      myPopup.close(); 
    //   }, 10000);
    // }

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

    // $scope.removeTask = function(index) {
    //     $scope.tasks.splice(index, 1);
    //     sharedTasks.setTasksList($scope.tasks);
    //     // $scope.updateExerciseList();
    //     // $scope.exerciseList = $scope.updateExerciseList();
    //     // timer = false;
    //     // updateExerciseVariables();
    //     // exTime = $scope.currentExercise["time"];
    // }

    // $scope.skipExercise = function() {
    //     exTime=0;
    //     sharedTasks.setExTime(exTime);
    //     removeCurrentTask();
    // }


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


}]);