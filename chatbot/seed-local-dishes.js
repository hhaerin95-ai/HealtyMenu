// seed-local-dishes.js
// Run: node seed-local-dishes.js
// Adds authentic LOCAL Malaysian dishes for all PCOS & BMI combinations

const db = require('./db');

const localDishes = [
  
  // ============================================================
  // UNDERWEIGHT + PCOS-FRIENDLY (Local Dishes)
  // ============================================================
  
  // breakfast
  { name: "Roti Canai with Curry", name_ms: "Roti Canai dengan Kari", category: "breakfast", bmi_category: "Underweight", calories: 380, protein: 14, carbs: 48, fat: 14, price_rm: 4.50, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Roti canai gosok dengan kuah kari ayam. Kurang minyak, kari berkuah sikit." },
  { name: "Nasi Lemak (Kurang Santan)", name_ms: "Nasi Lemak (Kurang Santan)", category: "breakfast", bmi_category: "Underweight", calories: 380, protein: 12, carbs: 52, fat: 12, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Nasi lemak dengan santan sikit, sambal berkurang minyak, telur rebus, ikan bilis, timun." },
  { name: "Bubur Ayam", name_ms: "Bubur Ayam", category: "breakfast", bmi_category: "Underweight", calories: 340, protein: 16, carbs: 50, fat: 7, price_rm: 5.50, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Bubur beras dengan daging ayam, halia, daun bawang. Kuah berkurang minyak." },
  { name: "Teh Tarik with Roti Jala", name_ms: "Teh Tarik dengan Roti Jala", category: "breakfast", bmi_category: "Underweight", calories: 320, protein: 10, carbs: 46, fat: 10, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Teh tarik kurang gula dengan roti jala. Kurang minyak dalam roti." },
  { name: "Kuih Lapis", name_ms: "Kuih Lapis", category: "breakfast", bmi_category: "Underweight", calories: 300, protein: 6, carbs: 44, fat: 10, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Kuih lapis tradisional dengan lapisan pandan dan santan. Potong kecil untuk kawalan kalori." },

  // lunch
  { name: "Nasi Kunyit dengan Rendang", name_ms: "Nasi Kunyit dengan Rendang", category: "lunch", bmi_category: "Underweight", calories: 480, protein: 28, carbs: 52, fat: 16, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Nasi kunyit dengan rendang ayam atau daging. Kurang kelapa, fokus pada rempah." },
  { name: "Ulam-ulam dengan Sambal Belacan", name_ms: "Ulam-ulam dengan Sambal Belacan", category: "lunch", bmi_category: "Underweight", calories: 280, protein: 8, carbs: 32, fat: 12, price_rm: 6.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Pucuk ulam, pegaga, mangga muda dengan sambal belacan berkurang minyak." },
  { name: "Ikan Bakar Kunyit", name_ms: "Ikan Bakar Kunyit", category: "lunch", bmi_category: "Underweight", calories: 420, protein: 35, carbs: 28, fat: 18, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Ikan kembung atau tenggiri bakar dengan perap kunyit, garam, cili. Serve dengan sambal matah." },
  { name: "Sayur Lodeh", name_ms: "Sayur Lodeh", category: "lunch", bmi_category: "Underweight", calories: 320, protein: 12, carbs: 38, fat: 13, price_rm: 6.50, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Sayur lodeh dengan terung, labu, tauge, tauhu dalam santan sikit dengan rempah." },
  { name: "Asam Pedas Ikan", name_ms: "Asam Pedas Ikan", category: "lunch", bmi_category: "Underweight", calories: 360, protein: 32, carbs: 24, fat: 14, price_rm: 8.50, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Ikan dalam kuah asam pedas dengan nanas, timun, tomato, cili. Kurang minyak." },

  // dinner
  { name: "Ayam Goreng Berempah", name_ms: "Ayam Goreng Berempah", category: "dinner", bmi_category: "Underweight", calories: 450, protein: 34, carbs: 32, fat: 18, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Ayam goreng dengan berempah kunyit, halia, cili. Serve dengan nasi putih/perang dan ulam." },
  { name: "Sup Tulang", name_ms: "Sup Tulang", category: "dinner", bmi_category: "Underweight", calories: 380, protein: 28, carbs: 30, fat: 14, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Sup tulang dengan lobak, wortel, saderi, halia. Kurang lemak, penuh rempah." },
  { name: "Kailan Goreng Bawang", name_ms: "Kailan Goreng Bawang", category: "dinner", bmi_category: "Underweight", calories: 220, protein: 10, carbs: 18, fat: 12, price_rm: 5.50, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Kailan tumis dengan bawang putih banyak, sedikit minyak, kicap rendah sodium." },
  { name: "Gulai Ayam", name_ms: "Gulai Ayam", category: "dinner", bmi_category: "Underweight", calories: 420, protein: 32, carbs: 28, fat: 18, price_rm: 9.50, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Gulai ayam dengan rempah kaya - kunyit, ketumbar, jintan. Santan rendah lemak." },

  // snack
  { name: "Kuih Talam", name_ms: "Kuih Talam", category: "snack", bmi_category: "Underweight", calories: 200, protein: 4, carbs: 28, fat: 8, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Kuih talam dengan pandan dan santan. Potong kecil, kurang manis." },
  { name: "Popiah Goreng", name_ms: "Popiah Goreng", category: "snack", bmi_category: "Underweight", calories: 240, protein: 8, carbs: 32, fat: 9, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Popiah dengan isi lobak, tauhu, sayur, goreng kurang minyak. Kuah kurang manis." },
  { name: "Soto Ayam", name_ms: "Soto Ayam", category: "snack", bmi_category: "Underweight", calories: 180, protein: 12, carbs: 22, fat: 6, price_rm: 4.50, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Soto ayam dengan kunyit, kurang minyak. Serve dengan nasi putih atau roti." },

  // ============================================================
  // NORMAL + PCOS-FRIENDLY (Local Dishes)
  // ============================================================
  
  // breakfast
  { name: "Nasi Lemak Kampung", name_ms: "Nasi Lemak Kampung", category: "breakfast", bmi_category: "Normal", calories: 360, protein: 14, carbs: 48, fat: 12, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Nasi lemak tradisional dengan santan sikit, sambal berkurang minyak, telur rebus." },
  { name: "Roti Pratha dengan Dhal", name_ms: "Roti Pratha dengan Dhal", category: "breakfast", bmi_category: "Normal", calories: 340, protein: 12, carbs: 46, fat: 11, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Roti pratha kurang minyak dengan kuah dhal. Kuah kari sikit." },
  { name: "Bubur Ubi Kuning", name_ms: "Bubur Ubi Kuning", category: "breakfast", bmi_category: "Normal", calories: 300, protein: 8, carbs: 50, fat: 7, price_rm: 4.50, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Bubur ubi kuning dengan santan sikit, gula sikit. Kurang minyak." },

  // lunch
  { name: "Nasi Kuning Lengkap", name_ms: "Nasi Kuning Lengkap", category: "lunch", bmi_category: "Normal", calories: 420, protein: 24, carbs: 50, fat: 14, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Nasi kuning dengan rendang daging atau ayam, timun, telur rebus, kacang. Kurang santan." },
  { name: "Gadon-Gadon", name_ms: "Gadon-Gadon", category: "lunch", bmi_category: "Normal", calories: 380, protein: 16, carbs: 42, fat: 14, price_rm: 7.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Sayur rebus dengan tauhu goreng, telur rebus, timun dalam kuah kacang berkurang minyak." },
  { name: "Ikan Asap", name_ms: "Ikan Asap", category: "lunch", bmi_category: "Normal", calories: 380, protein: 32, carbs: 24, fat: 16, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Ikan asap dengan sambal matah, timun, cili. Serve dengan nasi atau roti." },
  { name: "Tempoyak Ikan", name_ms: "Tempoyak Ikan", category: "lunch", bmi_category: "Normal", calories: 400, protein: 30, carbs: 28, fat: 18, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Ikan dengan tempoyak durian fermentasi, cili, santan sikit. Kurang minyak." },

  // dinner
  { name: "Sambal Ikan Bilis dengan Sayur", name_ms: "Sambal Ikan Bilis dengan Sayur", category: "dinner", bmi_category: "Normal", calories: 320, protein: 16, carbs: 30, fat: 14, price_rm: 7.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Ikan bilis dalam sambal matah dengan banyak sayur hijau. Kurang minyak." },
  { name: "Sayur Kuah Lemak", name_ms: "Sayur Kuah Lemak", category: "dinner", bmi_category: "Normal", calories: 360, protein: 14, carbs: 42, fat: 15, price_rm: 6.50, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Sayur kuah lemak dengan tauhu, kacang buncis, terung dalam santan sikit." },
  { name: "Otak-otak", name_ms: "Otak-otak", category: "dinner", bmi_category: "Normal", calories: 340, protein: 20, carbs: 28, fat: 14, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "local", recipe: "Otak-otak daun kelapa dengan ikan, santan sikit, rempah. Panggang atau bakar." },

  // ============================================================
  // OVERWEIGHT + REGULAR (NOT PCOS) - Local Dishes
  // ============================================================
  
  // breakfast
  { name: "Nasi Lemak Standard", name_ms: "Nasi Lemak Standard", category: "breakfast", bmi_category: "Overweight", calories: 420, protein: 14, carbs: 56, fat: 16, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Nasi lemak standard dengan sambal, telur rebus, ikan bilis, timun." },
  { name: "Roti Canai Biasa", name_ms: "Roti Canai Biasa", category: "breakfast", bmi_category: "Overweight", calories: 380, protein: 10, carbs: 50, fat: 16, price_rm: 3.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Roti canai dengan kuah kari atau dhal standard." },
  { name: "Nasi Goreng Kampung Pagi", name_ms: "Nasi Goreng Kampung Pagi", category: "breakfast", bmi_category: "Overweight", calories: 480, protein: 16, carbs: 62, fat: 18, price_rm: 6.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Nasi goreng dengan ikan bilis, telur, cili, sos kicap dan tiram." },
  { name: "Mee Goreng Mamak Pagi", name_ms: "Mee Goreng Mamak Pagi", category: "breakfast", bmi_category: "Overweight", calories: 520, protein: 18, carbs: 70, fat: 18, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Mee kuning goreng dengan udang, tauhu, telur, sos mamak." },

  // lunch
  { name: "Nasi Campur Mamak", name_ms: "Nasi Campur Mamak", category: "lunch", bmi_category: "Overweight", calories: 500, protein: 22, carbs: 64, fat: 16, price_rm: 7.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Nasi putih dengan 2-3 lauk pilihan dari mamak - rendang, sambal, telur, ikan." },
  { name: "Laksa Penang", name_ms: "Laksa Penang", category: "lunch", bmi_category: "Overweight", calories: 480, protein: 20, carbs: 62, fat: 16, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Mi dalam kuah asam pedas dengan ikan, timun, daun kesum, nanas." },
  { name: "Laksa Kuah", name_ms: "Laksa Kuah", category: "lunch", bmi_category: "Overweight", calories: 460, protein: 18, carbs: 58, fat: 18, price_rm: 7.50, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Mi dengan kuah santan, kari, bawang. Ikan, telur rebus, tauhu, tauge." },
  { name: "Satay with Peanut Sauce", name_ms: "Satai", category: "lunch", bmi_category: "Overweight", calories: 420, protein: 28, carbs: 32, fat: 18, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Satai ayam atau daging dengan kuah kacang kaya. Serve dengan ketupat atau roti." },

  // dinner
  { name: "Ayam Masak Merah", name_ms: "Ayam Masak Merah", category: "dinner", bmi_category: "Overweight", calories: 540, protein: 28, carbs: 56, fat: 18, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Ayam dalam sos tomato manis pedas dengan bawang, cili, serai. Serve dengan nasi." },
  { name: "Rendang Daging", name_ms: "Rendang Daging", category: "dinner", bmi_category: "Overweight", calories: 520, protein: 32, carbs: 42, fat: 20, price_rm: 12.00, budget_category: "premium", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Daging dalam kuah rendang kaya dengan santan, rempah berkaya - kunyit, halia, ketumbar." },
  { name: "Sup Tulang Biasa", name_ms: "Sup Tulang Biasa", category: "dinner", bmi_category: "Overweight", calories: 480, protein: 28, carbs: 48, fat: 16, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Sup tulang dengan lobak, wortel, saderi, halia. Standard recipe." },
  { name: "Ikan Goreng Kunyit", name_ms: "Ikan Goreng Kunyit", category: "dinner", bmi_category: "Overweight", calories: 480, protein: 30, carbs: 42, fat: 16, price_rm: 8.50, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Ikan goreng dengan perap kunyit, garam, cili. Serve dengan nasi dan sambal." },

  // snack
  { name: "Kueh Lapis Sarawak", name_ms: "Kueh Lapis Sarawak", category: "snack", bmi_category: "Overweight", calories: 260, protein: 4, carbs: 38, fat: 10, price_rm: 3.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Kueh lapis dengan lapisan pandan, santan. Tradisional dan lazat." },
  { name: "Kuih Peria", name_ms: "Kuih Peria", category: "snack", bmi_category: "Overweight", calories: 220, protein: 6, carbs: 32, fat: 8, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Kuih dengan inti peria manis, bungkus tepung. Tradisional." },
  { name: "Apam Balik", name_ms: "Apam Balik", category: "snack", bmi_category: "Overweight", calories: 300, protein: 6, carbs: 44, fat: 10, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Apam dengan inti kacang, jagung, gula melaka. Goreng kurang minyak." },
  { name: "Cendol Kampung", name_ms: "Cendol Kampung", category: "snack", bmi_category: "Overweight", calories: 280, protein: 3, carbs: 56, fat: 6, price_rm: 3.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Cendol dengan santan, gula melaka, ais. Standard recipe." },

  // ============================================================
  // OBESE + REGULAR (NOT PCOS) - Local Dishes
  // ============================================================
  
  // breakfast
  { name: "Bubur Nasi Sihat", name_ms: "Bubur Nasi Sihat", category: "breakfast", bmi_category: "Obese", calories: 300, protein: 12, carbs: 44, fat: 7, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Bubur nasi dengan ayam, halia, daun bawang. Kurang minyak, mudah hadam." },
  { name: "Roti Tissue Sihat", name_ms: "Roti Tissue Sihat", category: "breakfast", bmi_category: "Obese", calories: 280, protein: 8, carbs: 40, fat: 9, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Roti tissue dengan sedikit gula, kurang santan. Goreng kurang minyak." },
  { name: "Bubur Ayam Biasa", name_ms: "Bubur Ayam Biasa", category: "breakfast", bmi_category: "Obese", calories: 320, protein: 16, carbs: 46, fat: 8, price_rm: 5.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Bubur ayam tradisional dengan halia, daun bawang, sos kicap." },

  // lunch
  { name: "Nasi Kuning Ringkas", name_ms: "Nasi Kuning Ringkas", category: "lunch", bmi_category: "Obese", calories: 400, protein: 14, carbs: 56, fat: 11, price_rm: 7.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Nasi kuning dengan 1 lauk rendang atau ayam. Kurang santan, sihat." },
  { name: "Yong Tau Foo Kuah", name_ms: "Yong Tau Foo Kuah", category: "lunch", bmi_category: "Obese", calories: 360, protein: 18, carbs: 42, fat: 10, price_rm: 6.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Tauhu goreng, terung, cili dengan kuah sup. Elak sos manis berlebihan." },
  { name: "Nasi Campur Ayam Rebus", name_ms: "Nasi Campur Ayam Rebus", category: "lunch", bmi_category: "Obese", calories: 380, protein: 26, carbs: 48, fat: 8, price_rm: 7.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Nasi dengan ayam rebus, sayur, telur rebus. Kurang lemak, rendah kalori." },
  { name: "Kuah Kuning Ikan", name_ms: "Kuah Kuning Ikan", category: "lunch", bmi_category: "Obese", calories: 340, protein: 28, carbs: 28, fat: 9, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Ikan dalam kuah kuning berkurang santan. Penuh rempah kunyit, halia." },

  // dinner
  { name: "Sayur Dalam Kuah Sihat", name_ms: "Sayur Dalam Kuah Sihat", category: "dinner", bmi_category: "Obese", calories: 280, protein: 10, carbs: 38, fat: 8, price_rm: 5.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Sayur dalam kuah ringan dengan kunyit, garam. Tauhu, talam, kacang buncis." },
  { name: "Ikan Kukus Halia", name_ms: "Ikan Kukus Halia", category: "dinner", bmi_category: "Obese", calories: 320, protein: 30, carbs: 18, fat: 10, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Ikan kukus dengan halia, kicap rendah sodium, daun bawang. Sihat dan rendah kalori." },
  { name: "Sup Sayur Tradisional", name_ms: "Sup Sayur Tradisional", category: "dinner", bmi_category: "Obese", calories: 260, protein: 8, carbs: 36, fat: 6, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Sup dengan lobak, wortel, bawang, kunyit. Rendah lemak, mudah hadam." },
  { name: "Gulai Ayam Sihat", name_ms: "Gulai Ayam Sihat", category: "dinner", bmi_category: "Obese", calories: 400, protein: 28, carbs: 40, fat: 12, price_rm: 8.50, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Gulai ayam dengan santan rendah lemak, rempah berkaya. Serve dengan nasi sikit." },

];

// ── INSERT ALL ──
const stmt = db.prepare(`
  INSERT INTO recipes 
  (name, name_ms, category, bmi_category, calories, protein, carbs, fat, price_rm, budget_category, is_pcos_friendly, is_low_gi, cuisine_type, recipe)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

let inserted = 0;
let skipped  = 0;

localDishes.forEach(m => {
  db.get(
    `SELECT id FROM recipes WHERE name = ? AND bmi_category = ? AND is_pcos_friendly = ?`,
    [m.name, m.bmi_category, m.is_pcos_friendly],
    (err, row) => {
      if (row) {
        skipped++;
        console.log(`⏭️  [${m.bmi_category}][PCOS:${m.is_pcos_friendly}] ${m.name} - Already exists`);
        return;
      }
      stmt.run(
        m.name, m.name_ms, m.category, m.bmi_category,
        m.calories, m.protein, m.carbs, m.fat,
        m.price_rm, m.budget_category, m.is_pcos_friendly, m.is_low_gi, m.cuisine_type,
        m.recipe,
        function(err) {
          if (err) {
            console.error(`❌ Failed: ${m.name}`, err.message);
          } else {
            inserted++;
            console.log(`✅ [${m.bmi_category}][PCOS:${m.is_pcos_friendly}] ${m.name}`);
          }
        }
      );
    }
  );
});

