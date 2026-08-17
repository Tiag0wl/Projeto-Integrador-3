export function generateRealisticLikes(
  reportsCount: number,
  severity: string
): number {
  const maxLikes = Math.min(reportsCount * 10, 500);
  const minLikes = Math.max(reportsCount * 2, 5);

  // Ocorrências mais graves tendem a ter mais engajamento
  const severityMultiplier =
    severity === "Perigo Alto"
      ? 1.5
      : severity === "Perigo Médio"
        ? 1.2
        : 1.0;

  const adjustedMax = Math.min(maxLikes * severityMultiplier, 500);

  return Math.floor(
    Math.random() * (adjustedMax - minLikes + 1)
  ) + minLikes;
}