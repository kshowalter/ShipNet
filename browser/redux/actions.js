export const TICK = 'TICK';


export function tick(n){
  return {
    type: TICK,
    n: n
  };
}
