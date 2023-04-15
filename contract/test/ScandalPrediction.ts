import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

describe("ScandalPrediction", function () {
  async function deployBasicFixture() {
    const prediction0: {
      title: string;
      description: string;
      minimum: number;
      predictionPeriod: BigNumber;
      votingPeriod: BigNumber;
      yesAmount: BigNumber;
      noAmount: BigNumber;
      result: number;
    } = {
      title: "title",
      description: "description",
      minimum: 100,
      predictionPeriod: BigNumber.from(1681570800),
      votingPeriod: BigNumber.from(1681484400),
      yesAmount: BigNumber.from(0),
      noAmount: BigNumber.from(0),
      result: 0,
    };

    const [owner, otherAccount] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("ScandalPrediction");
    const contract = await Contract.deploy();

    return { contract, owner, otherAccount, prediction0 };
  }

  describe("addPrediction", function () {
    it("add prediction", async function () {
      const { contract, prediction0 } = await loadFixture(deployBasicFixture);

      await contract.addPrediction(
        prediction0.title,
        prediction0.description,
        prediction0.minimum,
        prediction0.predictionPeriod,
        prediction0.votingPeriod
      );
      const prediction = await contract.predictions(0);
      await expect(prediction.title).to.equal(prediction0.title);
      await expect(prediction.result).to.equal(prediction0.result);
    });
  });
});
