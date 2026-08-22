// import { useState } from "react";
// import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

// const trajectoryDefs = [
//   ["Accelerating", "Revenue has grown every year, and the most recent year grew faster than the average of earlier years."],
//   ["Steady Growth", "Revenue has grown every year, at a steady (not accelerating) pace."],
//   ["Declining", "Revenue has dropped every year in a row."],
//   ["Flat / Inconsistent", "Revenue has gone up and down — no consistent direction."],
//   ["Insufficient History", "Not enough qualifying years of data to judge a trend (either too few years, or years too small to trust)."],
// ];

// const momentumDefs = [
//   ["Up", "Revenue in the current partial year is at least 15% higher than the same period last year."],
//   ["Down", "Revenue in the current partial year is at least 15% lower than the same period last year."],
//   ["Flat", "Revenue in the current partial year is within 15% of the same period last year."],
//   ["New This Year", "No activity in this window last year, but active this year — likely a new or reactivated franchise."],
//   ["Dormant — No Recent Activity", "Had activity in this window last year, but none this year."],
//   ["Insufficient Data", "Too few bills in one or both windows to trust a comparison."],
// ];

// const readinessFlagDefs = [
//   ["High Confidence — Scaled & Accelerating", "A large, top-ranked franchise whose revenue is genuinely accelerating."],
//   ["Established — Currently Strong", "A large, top-ranked franchise with a mixed long-term trend, but clearly growing right now."],
//   ["Stable Core Performer", "A large, top-ranked franchise with steady, reliable growth."],
//   ["Growing — Smaller Scale", "A smaller franchise with steady growth — not yet a top performer, but on a solid path."],
//   ["Rising — Accelerating but Smaller Scale", "A smaller franchise with genuinely accelerating growth."],
//   ["Recent Turnaround Signal (watch)", "Historically inconsistent, but currently trending up — worth watching, not yet confirmed."],
//   ["At Risk — Declining", "Revenue is trending down, or currently down after a mixed history."],
//   ["Mixed Signal — No Clear Read", "History is inconsistent and current momentum doesn't clarify the picture either — genuinely ambiguous, not a data gap."],
//   ["New Hire — No Trajectory Yet", "New or reactivated this year — too early to judge a trend."],
//   ["Insufficient Data Overall", "Not enough history or current activity to classify with confidence."],
// ];

// function DefList({ title, items }) {
//   return (
//     <div>
//       <h4 className="font-semibold text-gray-700 mb-2">{title}</h4>
//       <dl className="space-y-2">
//         {items.map(([term, def]) => (
//           <div key={term}>
//             <dt className="font-medium text-gray-800 text-sm">{term}</dt>
//             <dd className="text-gray-500 text-sm">{def}</dd>
//           </div>
//         ))}
//       </dl>
//     </div>
//   );
// }

// export default function ReadinessGlossary() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6">
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center justify-between w-full text-left"
//       >
//         <span className="flex items-center gap-2 text-xl font-bold">
//           <HelpCircle size={20} className="text-teal-600" />
//           What do these labels mean?
//         </span>
//         {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//       </button>

//       {open && (
//         <div className="grid md:grid-cols-3 gap-8 mt-6">
//           <DefList title="Trajectory (long-term history)" items={trajectoryDefs} />
//           <DefList title="Momentum (this year vs. last year)" items={momentumDefs} />
//           <DefList title="Readiness Flag (combined verdict)" items={readinessFlagDefs} />
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";

const trajectoryDefs = [
  ["Accelerating", "Revenue has grown every year, and the most recent year grew faster than the average of earlier years."],
  ["Steady Growth", "Revenue has grown every year, at a steady (not accelerating) pace."],
  ["Declining", "Revenue has dropped every year in a row."],
  ["Flat / Inconsistent", "Revenue has gone up and down — no consistent direction."],
  ["Insufficient History", "Not enough qualifying years of data to judge a trend (either too few years, or years too small to trust)."],
];

const momentumDefs = [
  ["Up", "Revenue in the current partial year is at least 15% higher than the same period last year."],
  ["Down", "Revenue in the current partial year is at least 15% lower than the same period last year."],
  ["Flat", "Revenue in the current partial year is within 15% of the same period last year."],
  ["New This Year", "No activity in this window last year, but active this year — likely new or reactivated."],
  ["Dormant — No Recent Activity", "Had activity in this window last year, but none this year."],
  ["Insufficient Data", "Too few bills in one or both windows to trust a comparison."],
];

const readinessFlagDefs = [
  ["High Confidence — Scaled & Accelerating", "A large, top-ranked performer whose revenue is genuinely accelerating."],
  ["Established — Currently Strong", "A large, top-ranked performer with a mixed long-term trend, but clearly growing right now."],
  ["Stable Core Performer", "A large, top-ranked performer with steady, reliable growth."],
  ["Growing — Smaller Scale", "A smaller performer with steady growth — not yet top-ranked, but on a solid path."],
  ["Rising — Accelerating but Smaller Scale", "A smaller performer with genuinely accelerating growth."],
  ["Recent Turnaround Signal (watch)", "Historically inconsistent, but currently trending up — worth watching, not yet confirmed."],
  ["At Risk — Declining", "Revenue is trending down, or currently down after a mixed history."],
  ["Mixed Signal — No Clear Read", "History is inconsistent and current momentum doesn't clarify the picture either — genuinely ambiguous, not a data gap."],
  ["New Hire — No Trajectory Yet", "New or reactivated this year (franchise-specific label) — too early to judge a trend."],
  ["New — No Trajectory Yet", "New or reactivated this year (BD/TL-specific label) — too early to judge a trend."],
  ["Insufficient Data Overall", "Not enough history or current activity to classify with confidence."],
  ["Needs Review", "A combination of signals that didn't fit any specific rule — flagged for manual review rather than guessed at."],
  ["Not Applicable (Unattributed)", "Revenue recorded with no BD/TL name attached — a data-entry gap, not a real performer."],
];

function DefBlock({ accentColor, title, subtitle, items }) {
  return (
    <div>
      <div className={`border-l-4 ${accentColor} pl-4 mb-4`}>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
      <dl className="space-y-3">
        {items.map(([term, def]) => (
          <div key={term}>
            <dt className="font-medium text-gray-700 text-sm">{term}</dt>
            <dd className="text-gray-500 text-sm leading-snug mt-0.5">{def}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function ReadinessGlossary() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left px-6 py-5 hover:bg-gray-50 transition"
      >
        <span className="flex items-center gap-3">
          <span className="bg-teal-100 text-teal-700 p-2 rounded-lg">
            <BookOpen size={18} />
          </span>
          <span>
            <span className="block text-lg font-bold text-gray-800">Readiness Glossary</span>
            <span className="block text-xs text-gray-400">What each label means, in plain language</span>
          </span>
        </span>
        {open ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>

      {open && (
        <div className="border-t px-6 py-6">
          <div className="grid md:grid-cols-3 gap-10">
            <DefBlock
              accentColor="border-sky-400"
              title="Trajectory"
              subtitle="Long-term revenue history"
              items={trajectoryDefs}
            />
            <DefBlock
              accentColor="border-amber-400"
              title="Momentum"
              subtitle="This year vs. same period last year"
              items={momentumDefs}
            />
            <DefBlock
              accentColor="border-teal-500"
              title="Readiness Flag"
              subtitle="Combined verdict — the label shown in the table"
              items={readinessFlagDefs}
            />
          </div>
        </div>
      )}
    </div>
  );
}