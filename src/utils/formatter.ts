export function formatTemporalidade(temporalidade: number): string | null{

  let anos = temporalidade / 365;

  
  return Number.isInteger(anos) ? `${anos} anos` : `${anos.toFixed(1)} anos` ;
}