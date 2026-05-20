const baseFoods = {
  chicken: { calories: 250, protein: 30, carbs: 10, fat: 8 },
  beef: { calories: 300, protein: 28, carbs: 5, fat: 20 },
  fish: { calories: 200, protein: 26, carbs: 0, fat: 5 },
  rice: { calories: 180, protein: 4, carbs: 40, fat: 1 },
  pasta: { calories: 220, protein: 7, carbs: 45, fat: 2 },
  salad: { calories: 120, protein: 3, carbs: 10, fat: 5 },
  default: { calories: 250, protein: 15, carbs: 30, fat: 10 }
};

function estimateNutrition(name, bmi) {
  let calories = 600;

  if (/salad|soup|fish|vegetable/i.test(name)) calories = 350;
  if (/chicken|rice/i.test(name)) calories = 500;
  if (/beef|fried|cheese/i.test(name)) calories = 700;

  if (bmi < 18.5) calories += 150;
  if (bmi >= 30) calories -= 100;

  return {
    calories,
    carbs: Math.round(calories * 0.5 / 4),
    protein: Math.round(calories * 0.25 / 4),
    fat: Math.round(calories * 0.25 / 9)
  };
}

module.exports = { estimateNutrition };
