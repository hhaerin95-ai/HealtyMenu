// seed-pcos-western-meals.js
// Run: node seed-pcos-western-meals.js
// Adds PCOS-friendly WESTERN meals for all BMI categories

const pool = require('./db');

const pcsosWesternMeals = [

  // ============================================================
  // UNDERWEIGHT + PCOS-FRIENDLY WESTERN
  // ============================================================
  
  { name: "Grilled Chicken Breast with Salad", name_ms: "Dada Ayam Panggang dengan Salad", category: "lunch", bmi_category: "Underweight", calories: 380, protein: 40, carbs: 18, fat: 14, price_rm: 11.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Grill chicken breast dengan minimal oil. Serve dengan mixed green salad dan olive oil dressing." },
  
  { name: "Baked Salmon with Broccoli", name_ms: "Salmon Bakar dengan Brokoli", category: "dinner", bmi_category: "Underweight", calories: 420, protein: 38, carbs: 22, fat: 16, price_rm: 16.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Bakar salmon 200°C 15 minit. Serve dengan brokoli kukus dan lemon." },
  
  { name: "Turkey Breast Sandwich (Wholemeal)", name_ms: "Sandwich Dada Kalkun (Wholemeal)", category: "lunch", bmi_category: "Underweight", calories: 360, protein: 32, carbs: 35, fat: 10, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Daging kalkun rebus dalam roti wholemeal dengan sayuran segar." },
  
  { name: "Grilled Fish Fillet with Vegetables", name_ms: "Fillet Ikan Panggang dengan Sayur", category: "dinner", bmi_category: "Underweight", calories: 340, protein: 36, carbs: 16, fat: 12, price_rm: 13.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Panggang ikan white fish dengan sayur rebus. Minimal oil." },
  
  { name: "Egg White Omelette with Vegetables", name_ms: "Omelette Putih Telur dengan Sayur", category: "breakfast", bmi_category: "Underweight", calories: 240, protein: 24, carbs: 12, fat: 8, price_rm: 6.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Omelette dari putih telur dengan bawang, tomato, cili." },
  
  { name: "Grilled Lean Beef with Green Beans", name_ms: "Daging Lembu Tanpa Lemak dengan Kacang Panjang", category: "dinner", bmi_category: "Underweight", calories: 400, protein: 42, carbs: 14, fat: 15, price_rm: 14.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Steak lean beef panggang tanpa minyak. Serve dengan kacang panjang rebus." },

  // ============================================================
  // NORMAL + PCOS-FRIENDLY WESTERN
  // ============================================================
  
  { name: "Chicken Fillet with Quinoa", name_ms: "Fillet Ayam dengan Quinoa", category: "lunch", bmi_category: "Normal", calories: 420, protein: 38, carbs: 40, fat: 12, price_rm: 12.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Grill chicken fillet. Masak quinoa. Serve dengan steamed veg." },
  
  { name: "Tuna Salad (No Mayo)", name_ms: "Salad Tuna (Tanpa Mayo)", category: "lunch", bmi_category: "Normal", calories: 340, protein: 35, carbs: 20, fat: 10, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Tuna tin dengan salad hijau, tomato, lemon dressing." },
  
  { name: "Baked White Fish with Sweet Potato", name_ms: "Ikan Putih Bakar dengan Keledek", category: "dinner", bmi_category: "Normal", calories: 380, protein: 32, carbs: 32, fat: 11, price_rm: 12.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Bakar white fish. Serve dengan keledek kukus dan sayur." },
  
  { name: "Lean Beef Burger (No Bun)", name_ms: "Beef Burger Tanpa Roti", category: "lunch", bmi_category: "Normal", calories: 380, protein: 40, carbs: 8, fat: 18, price_rm: 11.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Beef patty lean tanpa roti. Serve dengan salad." },
  
  { name: "Grilled Chicken Thigh (Skinless) with Rice", name_ms: "Paha Ayam Panggang (Tanpa Kulit) dengan Nasi", category: "dinner", bmi_category: "Normal", calories: 450, protein: 42, carbs: 48, fat: 10, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Grill chicken thigh tanpa kulit. Brown rice. Sayur rebus." },

  // ============================================================
  // OVERWEIGHT + PCOS-FRIENDLY WESTERN (Regular, not PCOS)
  // But include some lighter options
  // ============================================================
  
  { name: "Grilled Chicken with Brown Rice", name_ms: "Ayam Panggang dengan Nasi Perang", category: "lunch", bmi_category: "Overweight", calories: 420, protein: 36, carbs: 48, fat: 10, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Chicken panggang dengan nasi perang. Sayur rebus." },
  
  { name: "Fish Fillet with Vegetables", name_ms: "Fillet Ikan dengan Sayur", category: "dinner", bmi_category: "Overweight", calories: 360, protein: 34, carbs: 28, fat: 11, price_rm: 11.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Ikan putih panggang dengan sayur rebus minimal minyak." },

  // ============================================================
  // OBESE + PCOS-FRIENDLY WESTERN (Regular, not PCOS)
  // ============================================================
  
  { name: "Steamed Chicken Breast with Salad", name_ms: "Dada Ayam Kukus dengan Salad", category: "lunch", bmi_category: "Obese", calories: 320, protein: 38, carbs: 18, fat: 8, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Ayam kukus tanpa kulit. Serve dengan salad hijau, lemon dressing." },
  
  { name: "Grilled Fish with Steamed Vegetables", name_ms: "Ikan Panggang dengan Sayur Kukus", category: "dinner", bmi_category: "Obese", calories: 300, protein: 32, carbs: 16, fat: 9, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Ikan white fish panggang. Sayur kukus. Rendah kalori." },

];

const run = async () => {
  let inserted = 0;
  let skipped = 0;

  for (const m of pcsosWesternMeals) {
    const check = await pool.query(
      `SELECT id FROM recipes WHERE name = $1 AND bmi_category = $2 AND cuisine_type = $3`,
      [m.name, m.bmi_category, m.cuisine_type || null]
    );
    if (check.rows.length > 0) { skipped++; continue; }

    await pool.query(
      `INSERT INTO recipes (name, name_ms, category, bmi_category, calories, protein, carbs, fat, price_rm, budget_category, is_pcos_friendly, is_low_gi, cuisine_type, recipe)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [m.name, m.name_ms, m.category, m.bmi_category, m.calories, m.protein, m.carbs, m.fat, m.price_rm, m.budget_category, m.is_pcos_friendly, m.is_low_gi, m.cuisine_type || null, m.recipe]
    );
    inserted++;
    console.log(`✅ ${m.name}`);
  }
  console.log(`\nDone: ${inserted} inserted, ${skipped} skipped`);
  process.exit(0);
};

run().catch(e => { console.error('❌', e.message); process.exit(1); });