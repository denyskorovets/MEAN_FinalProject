console.log('NewController is here');
app.controller('newController', ['$scope', '$location', 'friendsFactory', function ($scope, $location, friendsFactory) {
    /*
     THIS INDEX METHOD ACCESSES THE FRIENDS FACTORY AND RUNS THE FRIENDS INDEX.
     WE MIGHT RE USE INDEX A FEW TIMES, SO TO MINIMIZE REPETITION WE SET IT AS A VARIABLE.
     */
    var index = function () {
        $scope.tester = 0;
        $scope.test = function() {
            console.log($location);
        };

        friendsFactory.index(function (returnedData) {
            for (var i = 0; i < returnedData.friends.length; i++) {
                var date = new Date(returnedData.friends[i]["birthday"]);
                if ((date.getDate() < 10) || (date.getMonth() < 10)) {
                    console.log(">>>>>>>>IF1");
                    if ((date.getDate() < 10) && (date.getMonth() < 10)) {
                        returnedData.friends[i]["birthday"] = "0" + (date.getMonth() + 1) + ".0" + date.getDate() + "." + date.getFullYear();
                    }
                    else if (date.getDate() < 10) {
                        returnedData.friends[i]["birthday"] = (date.getMonth() + 1) + ".0" + date.getDate() + "." + date.getFullYear();
                    }
                    else {
                        returnedData.friends[i]["birthday"] = "0" + (date.getMonth() + 1) + "." + date.getDate() + "." + date.getFullYear();
                    }
                }
                else {
                    console.log(">>>>>>>>ELSE");
                    returnedData.friends[i]["birthday"] = (date.getMonth() + 1) + "." + date.getDate() + "." + date.getFullYear();
                }
            }
            $scope.friends = returnedData;
            console.log($scope.friends);
        });
    };
    index();

    $scope.addFriend = function () {

        console.log("ADDING FRIEND", $scope.newFriend);
        friendsFactory.create($scope.newFriend, function (data) {
            console.log(data, " has been created!");
            index();
        });
        $scope.newFriend = {};
        $location.url('/');
    };

    $scope.removeFriend = function (friend) {
        console.log("REMOVING FRIEND", friend._id);
        if (confirm("DO you want to delete " + friend.first_name + " " + friend.last_name + "?")) {
            friendsFactory.delete(friend._id, function () {
                console.log(friend, " has been deleted!");
            });
            index();
        }
        else {
            console.log("CANCELLED");
            $location.url('/');
        }
    };

    /*
     OUR $scope.create function goes here <-- $scope because we need to access this method
     with ng-submit or ng-click (from the form in the previous assignment).
     Want to all of the friends when we get back?  We can re-run index.
     */
}]);
