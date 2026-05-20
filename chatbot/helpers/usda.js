const axios = require("axios");

const USDA_KEY = process.env.USDA_API_KEY;

async function getCaloriesFromUSDA(foodName) {
  if (!USDA_KEY) return 0; // 🛑 elak crash kalau API key tak ada

  try {
    const res = await axios.get(
      "https://api.nal.usda.gov/fdc/v1/foods/search",
      {
        params: {
          api_key: USDA_KEY,
          query: foodName,
          pageSize: 1
        }
      }
    );

    const food = res.data.foods?.[0];
    if (!food) return 0;

    const nutrient = food.foodNutrients.find(
      n => n.nutrientName === "Energy"
    );

    return nutrient ? Math.round(nutrient.value) : 0;
  } catch (err) {
    console.error("USDA error:", err.message);
    return 0; // 🛡️ fallback
  }
}

module.exports = {
  getCaloriesFromUSDA: async () => 0
};

