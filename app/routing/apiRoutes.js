var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        friends.push(req.body);

        //console.log(req.body);
        //console.log(friends);


        var friSum;
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
    });


};