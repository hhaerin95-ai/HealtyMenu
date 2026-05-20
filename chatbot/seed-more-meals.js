// seed-more-meals.js
// Run: node seed-more-meals.js
// Adds MANY more meals to ensure 7-day plan always has complete meals

const pool = require('./db');

const moreMeals = [

  // ============================================================
  // LOCAL PCOS-FRIENDLY - BREAKFAST (Many options)
  // ============================================================
  { name: "Roti Canai with Curry", name_ms: "Roti Canai dengan Kari", category: "breakfast", bmi_category: "Underweight", calories: 480, protein: 14, carbs: 60, fat: 18, price_rm: 4.50, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Roti canai dengan kuah kari." },
  { name: "Nasi Lemak (Kurang Santan)", name_ms: "Nasi Lemak Sihat", category: "breakfast", bmi_category: "Underweight", calories: 420, protein: 14, carbs: 58, fat: 14, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Nasi lemak kurang santan dengan sambal." },
  { name: "Bubur Ayam", name_ms: "Bubur Ayam", category: "breakfast", bmi_category: "Underweight", calories: 380, protein: 16, carbs: 56, fat: 8, price_rm: 5.50, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Bubur nasi dengan ayam dan halia." },
  { name: "Teh Tarik with Roti Jala", name_ms: "Teh Tarik dengan Roti Jala", category: "breakfast", bmi_category: "Underweight", calories: 360, protein: 10, carbs: 52, fat: 12, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Teh tarik dengan roti jala." },
  { name: "Kuih Lapis", name_ms: "Kuih Lapis", category: "breakfast", bmi_category: "Underweight", calories: 340, protein: 6, carbs: 50, fat: 12, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Kuih lapis tradisional." },
  { name: "Apam Balik", name_ms: "Apam Balik", category: "breakfast", bmi_category: "Underweight", calories: 400, protein: 8, carbs: 58, fat: 14, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Apam balik dengan inti peanut." },
  { name: "Roti Tissue with Jam", name_ms: "Roti Tissue dengan Jam", category: "breakfast", bmi_category: "Underweight", calories: 320, protein: 6, carbs: 48, fat: 10, price_rm: 3.50, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Roti tissue dengan jam dan minyak." },
  { name: "Mee Rebus Pagi", name_ms: "Mee Rebus Pagi", category: "breakfast", bmi_category: "Underweight", calories: 390, protein: 12, carbs: 56, fat: 12, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Mee dalam kuah keledek." },
  { name: "Putu Mayam", name_ms: "Putu Mayam", category: "breakfast", bmi_category: "Underweight", calories: 360, protein: 8, carbs: 52, fat: 12, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Putu mayam dengan gula melaka." },
  { name: "Nasi Goreng Sihat Pagi", name_ms: "Nasi Goreng Sihat", category: "breakfast", bmi_category: "Underweight", calories: 450, protein: 16, carbs: 62, fat: 14, price_rm: 6.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Nasi goreng dengan ikan bilis sikit." },

  // ============================================================
  // LOCAL PCOS-FRIENDLY - LUNCH (Many options)
  // ============================================================
  { name: "Nasi Kunyit dengan Rendang", name_ms: "Nasi Kunyit dengan Rendang", category: "lunch", bmi_category: "Underweight", calories: 520, protein: 28, carbs: 58, fat: 18, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Nasi kunyit dengan rendang ayam." },
  { name: "Ikan Bakar Kunyit", name_ms: "Ikan Bakar Kunyit", category: "lunch", bmi_category: "Underweight", calories: 480, protein: 36, carbs: 32, fat: 18, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Ikan bakar dengan sambal matah." },
  { name: "Sayur Lodeh", name_ms: "Sayur Lodeh", category: "lunch", bmi_category: "Underweight", calories: 380, protein: 14, carbs: 44, fat: 16, price_rm: 6.50, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Sayur dalam santan sikit." },
  { name: "Asam Pedas Ikan", name_ms: "Asam Pedas Ikan", category: "lunch", bmi_category: "Underweight", calories: 420, protein: 34, carbs: 30, fat: 16, price_rm: 8.50, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Ikan dalam kuah asam pedas." },
  { name: "Ulam-ulam dengan Sambal", name_ms: "Ulam-ulam dengan Sambal", category: "lunch", bmi_category: "Underweight", calories: 340, protein: 10, carbs: 38, fat: 14, price_rm: 6.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Pucuk ulam segar dengan sambal belacan." },
  { name: "Nasi Kandar Sihat", name_ms: "Nasi Kandar Sihat", category: "lunch", bmi_category: "Underweight", calories: 500, protein: 24, carbs: 62, fat: 16, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Nasi dengan lauk berkari." },
  { name: "Laksa Penang Sihat", name_ms: "Laksa Penang", category: "lunch", bmi_category: "Underweight", calories: 480, protein: 22, carbs: 56, fat: 16, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Mi dalam kuah asam pedas dengan ikan." },
  { name: "Gadon-Gadon", name_ms: "Gadon-Gadon", category: "lunch", bmi_category: "Underweight", calories: 420, protein: 18, carbs: 48, fat: 16, price_rm: 7.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Sayur rebus dengan tauhu dalam kuah kacang." },
  { name: "Nasi Briyani Sihat", name_ms: "Nasi Briyani", category: "lunch", bmi_category: "Underweight", calories: 540, protein: 26, carbs: 64, fat: 18, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Nasi briyani dengan daging atau ayam." },
  { name: "Tempoyak Ikan", name_ms: "Tempoyak Ikan", category: "lunch", bmi_category: "Underweight", calories: 460, protein: 32, carbs: 32, fat: 20, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Ikan dengan tempoyak durian." },

  // ============================================================
  // LOCAL PCOS-FRIENDLY - DINNER (Many options)
  // ============================================================
  { name: "Ayam Goreng Berempah", name_ms: "Ayam Goreng Berempah", category: "dinner", bmi_category: "Underweight", calories: 500, protein: 36, carbs: 36, fat: 20, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Ayam goreng dengan rempah kaya." },
  { name: "Sup Tulang", name_ms: "Sup Tulang", category: "dinner", bmi_category: "Underweight", calories: 420, protein: 30, carbs: 34, fat: 16, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Sup tulang dengan sayur lengkap." },
  { name: "Gulai Ayam", name_ms: "Gulai Ayam", category: "dinner", bmi_category: "Underweight", calories: 480, protein: 34, carbs: 32, fat: 20, price_rm: 9.50, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Gulai ayam dengan rempah lengkap." },
  { name: "Ikan Kukus Halia", name_ms: "Ikan Kukus Halia", category: "dinner", bmi_category: "Underweight", calories: 380, protein: 34, carbs: 24, fat: 14, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Ikan kukus dengan halia dan daun bawang." },
  { name: "Kailan Goreng Bawang", name_ms: "Kailan Goreng Bawang", category: "dinner", bmi_category: "Underweight", calories: 280, protein: 12, carbs: 20, fat: 14, price_rm: 5.50, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Kailan tumis dengan bawang putih banyak." },
  { name: "Sambal Ikan Bilis dengan Sayur", name_ms: "Sambal Ikan Bilis", category: "dinner", bmi_category: "Underweight", calories: 360, protein: 18, carbs: 34, fat: 16, price_rm: 7.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Ikan bilis dalam sambal dengan sayur." },
  { name: "Sayur Kuah Lemak", name_ms: "Sayur Kuah Lemak", category: "dinner", bmi_category: "Underweight", calories: 400, protein: 16, carbs: 46, fat: 16, price_rm: 6.50, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Sayur dalam kuah santan sikit." },
  { name: "Otak-otak", name_ms: "Otak-otak", category: "dinner", bmi_category: "Underweight", calories: 380, protein: 22, carbs: 32, fat: 16, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Otak-otak daun kelapa dengan ikan." },
  { name: "Rendang Daging Sihat", name_ms: "Rendang Daging", category: "dinner", bmi_category: "Underweight", calories: 520, protein: 36, carbs: 38, fat: 22, price_rm: 12.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Rendang daging dengan rempah lengkap." },
  { name: "Ikan Goreng Kunyit Sihat", name_ms: "Ikan Goreng Kunyit", category: "dinner", bmi_category: "Underweight", calories: 440, protein: 32, carbs: 36, fat: 16, price_rm: 8.50, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Ikan goreng dengan perap kunyit." },

  // ============================================================
  // LOCAL PCOS-FRIENDLY - SNACKS (Many options)
  // ============================================================
  { name: "Soto Ayam", name_ms: "Soto Ayam", category: "snack", bmi_category: "Underweight", calories: 220, protein: 14, carbs: 26, fat: 8, price_rm: 4.50, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Soto ayam dengan kunyit." },
  { name: "Kuih Talam", name_ms: "Kuih Talam", category: "snack", bmi_category: "Underweight", calories: 240, protein: 6, carbs: 32, fat: 10, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Kuih talam dengan pandan." },
  { name: "Popiah Goreng", name_ms: "Popiah Goreng", category: "snack", bmi_category: "Underweight", calories: 280, protein: 10, carbs: 36, fat: 11, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Popiah dengan isi lobak dan tauhu." },
  { name: "Kuih Peria", name_ms: "Kuih Peria", category: "snack", bmi_category: "Underweight", calories: 260, protein: 8, carbs: 36, fat: 10, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Kuih dengan inti peria manis." },
  { name: "Cendol", name_ms: "Cendol", category: "snack", bmi_category: "Underweight", calories: 320, protein: 4, carbs: 64, fat: 8, price_rm: 3.50, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Cendol dengan santan dan gula melaka." },
  { name: "Appam", name_ms: "Appam", category: "snack", bmi_category: "Underweight", calories: 240, protein: 8, carbs: 38, fat: 6, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Appam dengan kuah curry." },
  { name: "Tosai", name_ms: "Tosai", category: "snack", bmi_category: "Underweight", calories: 280, protein: 12, carbs: 42, fat: 8, price_rm: 3.50, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Tosai dengan sambal dan kuah." },

  // ============================================================
  // WESTERN PCOS-FRIENDLY - LUNCH (Many options)
  // ============================================================
  { name: "Grilled Chicken with Salad", name_ms: "Ayam Panggang dengan Salad", category: "lunch", bmi_category: "Underweight", calories: 420, protein: 42, carbs: 20, fat: 16, price_rm: 11.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Grill chicken dengan salad hijau." },
  { name: "Tuna Salad No Mayo", name_ms: "Salad Tuna Tanpa Mayo", category: "lunch", bmi_category: "Underweight", calories: 380, protein: 38, carbs: 22, fat: 12, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Tuna dengan salad dan lemon dressing." },
  { name: "Baked Fish with Vegetables", name_ms: "Ikan Bakar dengan Sayur", category: "lunch", bmi_category: "Underweight", calories: 400, protein: 40, carbs: 24, fat: 14, price_rm: 12.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Ikan putih bakar dengan sayur rebus." },
  { name: "Grilled Turkey Breast", name_ms: "Dada Kalkun Panggang", category: "lunch", bmi_category: "Underweight", calories: 380, protein: 44, carbs: 16, fat: 12, price_rm: 11.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Panggang dada kalkun tanpa minyak." },
  { name: "Chicken Caesar Salad", name_ms: "Salad Caesar Ayam", category: "lunch", bmi_category: "Underweight", calories: 420, protein: 40, carbs: 18, fat: 18, price_rm: 12.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Salad dengan grilled chicken dan dressing rendah lemak." },

  // ============================================================
  // WESTERN PCOS-FRIENDLY - DINNER (Many options)
  // ============================================================
  { name: "Baked Salmon with Broccoli", name_ms: "Salmon Bakar dengan Brokoli", category: "dinner", bmi_category: "Underweight", calories: 460, protein: 40, carbs: 24, fat: 18, price_rm: 16.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Salmon bakar dengan brokoli kukus." },
  { name: "Grilled Lean Beef with Green Beans", name_ms: "Daging Lembu Panggang dengan Kacang", category: "dinner", bmi_category: "Underweight", calories: 440, protein: 44, carbs: 16, fat: 18, price_rm: 14.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Steak lean beef dengan kacang panjang rebus." },
  { name: "Grilled Fish Fillet with Vegetables", name_ms: "Fillet Ikan Panggang dengan Sayur", category: "dinner", bmi_category: "Underweight", calories: 390, protein: 38, carbs: 20, fat: 14, price_rm: 13.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Fillet ikan putih panggang dengan sayur." },
  { name: "Egg White Omelette with Mushroom", name_ms: "Omelette Putih Telur dengan Jamur", category: "dinner", bmi_category: "Underweight", calories: 320, protein: 28, carbs: 14, fat: 12, price_rm: 7.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Omelette dari putih telur dengan jamur." },
  { name: "Steamed Chicken Breast with Rice", name_ms: "Dada Ayam Kukus dengan Nasi", category: "dinner", bmi_category: "Underweight", calories: 420, protein: 42, carbs: 48, fat: 10, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Ayam kukus dengan nasi putih dan sayur." },

  // ============================================================
  // WESTERN PCOS-FRIENDLY - SNACKS (Many options)
  // ============================================================
  { name: "Grilled Chicken Skewer", name_ms: "Tusuk Ayam Panggang", category: "snack", bmi_category: "Underweight", calories: 240, protein: 28, carbs: 8, fat: 10, price_rm: 6.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Tusuk ayam panggang tanpa kacang." },
  { name: "Mixed Nuts (Unsalted)", name_ms: "Kacang Campur Tanpa Garam", category: "snack", bmi_category: "Underweight", calories: 260, protein: 10, carbs: 14, fat: 20, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Kacang almond, walnut, sunflower seeds." },
  { name: "Hard Boiled Eggs", name_ms: "Telur Rebus", category: "snack", bmi_category: "Underweight", calories: 180, protein: 18, carbs: 4, fat: 12, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "2 biji telur rebus saja." },
  { name: "Cheese and Apple", name_ms: "Keju dan Epal", category: "snack", bmi_category: "Underweight", calories: 220, protein: 14, carbs: 28, fat: 8, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Keju rendah lemak dengan epal segar." },

];

const run = async () => {
  let inserted = 0;
  let skipped = 0;

  for (const m of moreMeals) {
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