export function sumTotal(transactions) {
  let total = 0;
  transactions.forEach((t) => {
    const value = parseFloat(t.amount);
    if (t.typebalance === "saida") {
      total -= value;
    } else {
      total += value;
    }
  })
  return total;
}