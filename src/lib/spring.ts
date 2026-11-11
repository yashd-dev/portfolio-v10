export const springStep = (
  x: number,
  v: number,
  target: number,
  stiffness: number,
  damping: number,
  mass: number,
  dt: number
): [number, number] => {
  const a = (-stiffness * (x - target) - damping * v) / mass;
  const nv = v + a * dt;
  return [x + nv * dt, nv];
};

export const wait = (ms: number) => {
  const { promise, resolve } = Promise.withResolvers<undefined>();
  setTimeout(() => resolve(undefined), ms);
  return promise;
};

export const springMotion = (
  stiffness: number,
  damping: number,
  mass: number
) => {
  const dt = 1 / 240;
  let x = 0;
  let v = 0;
  let t = 0;
  const points: number[][] = [[0, 0]];
  while (t < 4) {
    [x, v] = springStep(x, v, 1, stiffness, damping, mass, dt);
    t += dt;
    if (points.length === 0 || t - (points.at(-1)?.[0] ?? 0) >= 1 / 60) {
      points.push([t, x]);
    }
    if (Math.abs(x - 1) < 0.001 && Math.abs(v) < 0.001) {
      break;
    }
  }
  const duration = Math.round(t * 1000);
  const easing = `linear(${points
    .map(([pt, px]) => `${px.toFixed(4)} ${((pt / t) * 100).toFixed(2)}%`)
    .join(", ")}, 1 100%)`;
  return { duration, easing };
};
