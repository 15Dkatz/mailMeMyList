// angular.module('tasks.services', [])


myApp.service('sharedTasks', ['FIREBASE_URL', '$rootScope', '$firebaseAuth', function(FIREBASE_URL, $rootScope, $firebaseAuth) {
  var tasksList = [];
  var completedTasksList = [];
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);
  var tasksListRef, userRef;
  var firstname, lastname, email;
  // var showLoginContent = true;
  // var exTime=0;

  auth.$onAuth(function(authUser) {
      if (authUser) {
        tasksListRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/tasks');
        if (tasksListRef) {
          tasksListRef.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  tasksList = snapshot.val()["tasksList"];
                  completedTasksList = snapshot.val()["completedTasksList"];
                  // userName = snapshot.val()[""]
                  // console.log("exerciseList:", $scope.exerciseList);
                  // showLoginContent = false;

              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
        }
        userRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + "/");
       	if (userRef) {
          userRef.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  // exerciseList = snapshot.val()["exerciseList"];
                  firstname = snapshot.val()["firstname"];
                  lastname = snapshot.val()["lastname"];
                  email = snapshot.val()["email"];
                  // console.log("exerciseList:", $scope.exerciseList);
              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
        }
      }
  })

  return {
    getTasksList: function() {
      
      return exerciseList;
    },

    getFirstname: function() {
      // console.log("attempting to grab first name");
    	return firstname;
    },

    getLastname: function() {
    	return lastname;
    },
    getEmail: function() {
      return email;
    },

 //    getShowLoginContent: function() {
	//  	return showLoginContent;
	// },
	getTasksList: function() {
		return tasksList;
	},

  setTasksList: function(newList) {
    console.log("newList", newList);
    tasksList = newList;
    tasksListRef.update({"tasksList": newList});
      
    // } else {
    //   tasksListRef.set({"tasksList": newList});
    // }
   
    // $rootScope.$broadcast('tasksListUpdated');
  },

  getCompletedTasksList: function() {
    return completedTasksList;
  },

  setCompletedTasksList: function(newList) {
    completedTasksList = newList;

    // console.log("completedTasksList state", completedTasksList);
    tasksListRef.update({"completedTasksList": newList});
    // $rootScope.$broadcast('tasksListUpdated');
  },

    updateAccountFirstname: function(newFirstname) {
    	userRef.update({"firstname": newFirstname});
    },

    updateAccountLastname: function(newLastname) {
    	userRef.update({"lastname": newLastname});
    },

    updateAccountEmail: function(newEmail) {
    	
    	userRef.update({"email": newEmail});
    },

    // getExTime: function() {
    // 	return exTime;
    // },

    // setExTime: function(newExtime) {
    // 	exTime = newExtime;
    // }

  }
}])
