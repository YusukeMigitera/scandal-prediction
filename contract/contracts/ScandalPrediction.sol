// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ScandalPrediction {
    struct Vote {
        uint256 amount;
        address sender;
    }

    enum Result {
        Yet,
        Yes,
        No
    }

    struct Prediction {
        string title;
        string description;
        uint16 minimum;
        uint256 predictionPeriod;
        uint256 votingPeriod;
        uint256 yesAmount;
        uint256 noAmount;
        Vote[] yesVote;
        Vote[] noVote;
        Result result;
    }

    Prediction[] public predictions;

    function addPrediction(
        string memory title,
        string memory description,
        uint16 minimum,
        uint256 predictionPeriod,
        uint256 votingPeriod
    ) public {
        Prediction storage p = predictions.push();
        p.title = title;
        p.description = description;
        p.minimum = minimum;
        p.predictionPeriod = predictionPeriod;
        p.votingPeriod = votingPeriod;
    }

    function vote(uint256 predectionIndex, bool yes, uint256 amount) public {
        if (yes) {
            predictions[predectionIndex].yesAmount += amount;
            predictions[predectionIndex].yesVote.push(Vote(amount, msg.sender));
        } else {
            predictions[predectionIndex].noAmount += amount;
            predictions[predectionIndex].noVote.push(Vote(amount, msg.sender));
        }
    }

    function close(uint256 predectionIndex, bool yes) private {
        if (yes) {
            predictions[predectionIndex].result = Result.Yes;
        } else {
            predictions[predectionIndex].result = Result.No;
        }
    }
}
