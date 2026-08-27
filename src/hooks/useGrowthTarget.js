import { useGrowth } from "../context/GrowthContext";

// "FY 2029-30" -> 2029
function parseFyStartYear(fyLabel) {
  if (!fyLabel) return null;
  const match = String(fyLabel).match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : null;
}

export default function useGrowthTarget() {
  const { baseRevenue, baseRevenueMeta, goalValue, goalUnit, goalFY } = useGrowth();

  const goalRevenue = goalUnit === "Cr" ? goalValue * 10000000 : goalValue * 100000;

  const targetMultiplier = baseRevenue > 0 ? goalRevenue / baseRevenue : null;

  const recentFullFyStart = parseFyStartYear(baseRevenueMeta?.recent_full_fy);
  const targetFyStart = parseFyStartYear(goalFY);

  // How many years out the goal FY is from the base revenue year — same anchor
  // the backend's Nx-Fit already uses (target_fy = recent_full_fy_start + horizon_years),
  // so this must be measured from the same starting point, not "today".
  const horizonYears =
    recentFullFyStart != null && targetFyStart != null
      ? Math.max(1, targetFyStart - recentFullFyStart)
      : null;

  const ready = targetMultiplier != null && horizonYears != null && !baseRevenueMeta?.loading;

  return { targetMultiplier, horizonYears, goalRevenue, goalFY, ready };
}