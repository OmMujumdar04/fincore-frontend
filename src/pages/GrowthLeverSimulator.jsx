



// import { GrowthProvider } from "../context/GrowthContext";

// import TargetRevenueCard from "../components/growth/TargetRevenueCard";
// import Lever1Card from "../components/growth/Lever1Card";
// import Lever2ComingSoon from "../components/growth/Lever2ComingSoon";
// import Lever3Card from "../components/growth/Lever3Card";
// import CombinedRevenueCard from "../components/growth/CombinedRevenueCard";
// import NxFitPanel from "../components/growth/NxFitPanel";

// function GrowthLeverSimulatorContent() {

//   return (

//     <div className="space-y-10">

//       {/* PAGE HEADER */}

//       <div>

//         <h1 className="text-4xl font-bold text-gray-800">
//           Growth Lever Simulator
//         </h1>

//         <p className="text-gray-500 mt-2">
//           Simulate revenue impact through strategic growth levers.
//         </p>

//       </div>

//       {/* GOAL SETTING */}

//       <TargetRevenueCard />

//       {/* GROWTH LEVERS */}

//       <div className="grid lg:grid-cols-3 gap-8">

//         <Lever1Card />

//         <Lever2ComingSoon />

//         <Lever3Card />

//       </div>

//       {/* COMBINED RESULTS */}

//       <CombinedRevenueCard />

//       {/* NX FIT PANEL */}

//       <NxFitPanel />

//     </div>

//   );

// }

// export default function GrowthLeverSimulator() {

//   return (

//     <GrowthProvider>

//       <GrowthLeverSimulatorContent />

//     </GrowthProvider>

//   );

// }




import { GrowthProvider } from "../context/GrowthContext";

import TargetRevenueCard from "../components/growth/TargetRevenueCard";
import Lever1Card from "../components/growth/Lever1Card";
import Lever2Card from "../components/growth/Lever2Card";
import Lever3Card from "../components/growth/Lever3Card";
import CombinedRevenueCard from "../components/growth/CombinedRevenueCard";
import NxFitPanel from "../components/growth/NxFitPanel";
import FairSharePanel from "../components/growth/FairSharePanel";

function GrowthLeverSimulatorContent() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Growth Lever Simulator</h1>
        <p className="text-gray-500 mt-2">Simulate revenue impact through strategic growth levers.</p>
      </div>

      <TargetRevenueCard />

      <div className="grid lg:grid-cols-3 gap-8">
        <Lever1Card />
        <Lever2Card />
        <Lever3Card />
      </div>

      <CombinedRevenueCard />
      <NxFitPanel />
      <FairSharePanel />
    </div>
  );
}

export default function GrowthLeverSimulator() {
  return (
    <GrowthProvider>
      <GrowthLeverSimulatorContent />
    </GrowthProvider>
  );
}