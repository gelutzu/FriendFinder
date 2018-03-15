var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });


    app.post("/api/friends", function(req, res) {


        // Empty array to push matched friend
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 100
        };
        // req.body is available since we're using the body-parser middleware
        var userData = req.body;
        var userScores = userData.scores;
        var totalDifference = 0;
        // Loop through friends object and compare
        for (var i = 0; i < friends.length; i++) {
            totalDifference = 0;
            // Loop through the scores of each friend
            for (var j = 0; j < friends[i].scores.length; j++) {
                // calculating the difference between each score and sum them into totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
            }
            // Find Best Match - The closest match will be the user with the least amount of difference.
            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
        }
        // Add new userData to friends array
        friends.push(userData);
        // Return Best Match
        res.json(bestMatch);
    });


    /*  var friSum;
        var sumArr = [];

        for (var i = 0; i < friends.length; i++) {

            friSum = friends[i].scores;
            console.log(friSum);

            var totalArr = friSum.reduce(function(a, b) { return parseInt(a) + parseInt(b); }, 0);
            console.log(totalArr);

            sumArr.push(totalArr);
            console.log(sumArr);

            // The last entry in the sum array is the one the user typed. We save it to compare it with the 
            //closest neighbor once we sort the array. The closest neighbor will be the best-match
            var newEntrySum = sumArr[i];

        }

        function bubbleSort(sumArr) {
            var swapped;
            do {
                swapped = false;
                for (var i = 0; i < sumArr.length - 1; i++) {
                    if (sumArr[i] > sumArr[i + 1]) {
                        var temp = sumArr[i];
                        sumArr[i] = sumArr[i + 1];
                        sumArr[i + 1] = temp;
                        swapped = true;
                    }
                }
            } while (swapped);
        }

        bubbleSort(sumArr);
        console.log(sumArr);


        for (var i = 0; i < sumArr.length; i++) {

            if (sumArr[i] = newEntrySum) {
                var bestMatch = sumArr[i + 1];
                if (bestMatch !== "undefined") {
                    console.log(bestMatch);
                } else { bestMatch = sumArr[i - 1]; }
                console.log(bestMatch);
            }
        }

        res


    });

    */


};
