export default function Ratio(props:{yes: BigInt, no: BigInt}) {
  const ratio = calculateRatio(props.yes, props.no);
  switch (ratio) {
    case 1:
      return (
        <div className="flex">
          <div className="bg-red-100 text-white w-4">Yes</div>
          <div className="bg-blue-100 text-white w-36 text-right">No</div>
        </div>
      );
    case 2:
      return (
        <div className="flex">
          <div className="bg-red-100 text-white w-8">Yes</div>
          <div className="bg-blue-100 text-white w-32 text-right">No</div>
        </div>
      );
    case 3:
      return (
        <div className="flex">
          <div className="bg-red-100 text-white w-12">Yes</div>
          <div className="bg-blue-100 text-white w-28 text-right">No</div>
        </div>
      );
    case 4:
      return (
        <div className="flex">
          <div className="bg-red-100 text-white w-16">Yes</div>
          <div className="bg-blue-100 text-white w-24 text-right">No</div>
        </div>
      );
    case 5:
      return (
        <div className="flex">
          <div className="bg-red-100 text-white w-20">Yes</div>
          <div className="bg-blue-100 text-white w-20 text-right">No</div>
        </div>
      );
    case 6:
      return (
        <div className="flex">
          <div className="bg-red-100 text-white w-24">Yes</div>
          <div className="bg-blue-100 text-white w-16 text-right">No</div>
        </div>
      );
    case 7:
      return (
        <div className="flex">
          <div className="bg-red-100 text-white w-28">Yes</div>
          <div className="bg-blue-100 text-white w-12 text-right">No</div>
        </div>
      );
    case 8:
      return (
        <div className="flex">
          <div className="bg-red-100 text-white w-32">Yes</div>
          <div className="bg-blue-100 text-white w-8 text-right">No</div>
        </div>
      );
    default:
      return (
        <div className="flex">
          <div className="bg-red-100 text-white w-36">Yes</div>
          <div className="bg-blue-100 text-white w-4 text-right">No</div>
        </div>
      );
  }
}

function calculateRatio(yes: BigInt, no: BigInt) {
  const yesNum = Number(yes);
  const noNum = Number(no);
  if (yesNum + noNum == 0) return 5;
  const ratio = yesNum / (yesNum + noNum);
  if (ratio < 0.15) return 1;
  if (ratio < 0.25) return 2;
  if (ratio < 0.35) return 3;
  if (ratio < 0.45) return 4;
  if (ratio < 0.55) return 5;
  if (ratio < 0.65) return 6;
  if (ratio < 0.75) return 7;
  if (ratio < 0.85) return 8;
  return 9;
}
