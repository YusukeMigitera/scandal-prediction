import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "@/utils/ScandalPrediction.json";
import Image from "next/image";
import Ratio from "@/components/Ratio";
const contractABI = abi.abi;

export default function Home() {
  const [predictions, setPredictions] = useState<
    {
      title: string;
      description: string;
      minimum: number;
      predictionPeriod: BigInt;
      votingPeriod: BigInt;
      yesAmount: BigInt;
      noAmount: BigInt;
      result: number;
    }[]
  >([]);
  useEffect(() => {
    getPredictions(setPredictions);
  }, []);
  return (
    <main className="min-h-screen p-16 bg-white text-black">
      <ul className="flex">
        {predictions.map((prediction, i) => (
          <li className="shadow rounded w-80 h-60 p-4" key={i}>
            <div className="flex mb-4">
              <Image
                src={
                  "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/2615.svg"
                }
                alt="prediction image"
                width={50}
                height={50}
              />
              <div className="pl-4">
                {prediction.result == 0 ? (
                  <span className="text-green-500">Open</span>
                ) : (
                  <span className="text-red-500">Close</span>
                )}
                <h2>{prediction.title}</h2>
              </div>
            </div>
            <p>betting deadline: {dateString(prediction.votingPeriod)}</p>
            <p>start: - - -</p>
            <p>now : - - -</p>
            <p>
              end : {dateString(prediction.predictionPeriod)} -{" "}
              {prediction.minimum.toString()}
            </p>
            <Ratio yes={prediction.yesAmount} no={prediction.noAmount} />
          </li>
        ))}
      </ul>
      <button onClick={() => addPrediction()}>add</button>
    </main>
  );
}

const getPredictions = async (setPredictions: (predictions: any) => void) => {
  try {
    const { ethereum } = window as any;
    if (ethereum) {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
        contractABI,
        await signer
      );
      const predictions = await contract.getPredictions();
      console.log(predictions);
      setPredictions(predictions);
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
};

const addPrediction = async () => {
  try {
    const { ethereum } = window as any;
    if (ethereum) {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
        contractABI,
        await signer
      );
      await contract.addPrediction(
        "title",
        "description",
        100,
        BigInt(1681570800),
        BigInt(1681484400)
      );
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
};

function dateString(period: BigInt) {
  const date = new Date(Number(period.toString()) * 1000);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
