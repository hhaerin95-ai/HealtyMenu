const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const allMeals = [
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
  { name: "Gulai Ayam Sihat", name_ms: "Gulai Ayam Sihat", category: "dinner", bmi_category: "Obese", calories: 400, protein: 28, carbs: 40, fat: 12, price_rm: 8.50, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "local", recipe: "Gulai ayam dengan santan rendah lemak, rempah berkaya. Serve dengan nasi sikit." },,
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
  { name: "Cheese and Apple", name_ms: "Keju dan Epal", category: "snack", bmi_category: "Underweight", calories: 220, protein: 14, carbs: 28, fat: 8, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Keju rendah lemak dengan epal segar." },,
// ============================================================
  // UNDERWEIGHT + PCOS (is_pcos_friendly = 1, is_low_gi = 1)
  // ============================================================

  // breakfast
  { name: "Oat Porridge with Banana", name_ms: "Bubur Oat dengan Pisang", category: "breakfast", bmi_category: "Underweight", calories: 320, protein: 12, carbs: 52, fat: 7, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Masak oat dengan susu. Hiris pisang di atas. Taburkan biji chia." },
  { name: "Whole Grain Toast with Avocado & Egg", name_ms: "Roti Bijirin dengan Avokado & Telur", category: "breakfast", bmi_category: "Underweight", calories: 380, protein: 16, carbs: 38, fat: 18, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Bakar roti bijirin. Lenyek avokado, letak atas roti. Goreng telur, letak atas sekali." },
  { name: "Greek Yogurt with Mixed Berries", name_ms: "Yogurt Greek dengan Beri Campur", category: "breakfast", bmi_category: "Underweight", calories: 290, protein: 18, carbs: 35, fat: 6, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Masukkan yogurt Greek dalam mangkuk. Tabur beri campur dan madu sikit." },
  { name: "Smoothie Bowl (Spinach & Banana)", name_ms: "Mangkuk Smoothie Bayam & Pisang", category: "breakfast", bmi_category: "Underweight", calories: 350, protein: 10, carbs: 58, fat: 8, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Blend bayam, pisang, susu badam. Tuang dalam mangkuk. Hiaskan dengan granola dan buah." },
  { name: "Roti Wholemeal with Peanut Butter", name_ms: "Roti Wholemeal dengan Mentega Kacang", category: "breakfast", bmi_category: "Underweight", calories: 340, protein: 14, carbs: 42, fat: 13, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Sapu mentega kacang semula jadi atas roti wholemeal. Boleh tambah hirisan pisang." },

  // lunch
  { name: "Brown Rice with Grilled Chicken & Veg", name_ms: "Nasi Perang dengan Ayam Panggang & Sayur", category: "lunch", bmi_category: "Underweight", calories: 480, protein: 35, carbs: 52, fat: 10, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Grill ayam dengan rempah. Masak nasi perang. Serve dengan sayur rebus." },
  { name: "Quinoa Salad with Tuna", name_ms: "Salad Quinoa dengan Tuna", category: "lunch", bmi_category: "Underweight", calories: 420, protein: 32, carbs: 44, fat: 11, price_rm: 12.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Masak quinoa. Campurkan tuna tin, timun, tomato. Perasakan dengan lemon dan minyak zaitun." },
  { name: "Soba Noodle with Tofu & Veg", name_ms: "Mi Soba dengan Tauhu & Sayur", category: "lunch", bmi_category: "Underweight", calories: 400, protein: 20, carbs: 55, fat: 9, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Rebus mi soba. Goreng tauhu dan sayur dengan sos kicap rendah sodium." },
  { name: "Lentil Soup with Wholemeal Bread", name_ms: "Sup Lentil dengan Roti Wholemeal", category: "lunch", bmi_category: "Underweight", calories: 390, protein: 22, carbs: 58, fat: 6, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Rebus lentil dengan bawang, tomato, rempah. Serve dengan roti wholemeal." },
  { name: "Grilled Fish with Brown Rice & Ulam", name_ms: "Ikan Bakar dengan Nasi Perang & Ulam", category: "lunch", bmi_category: "Underweight", calories: 450, protein: 38, carbs: 48, fat: 8, price_rm: 11.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Perap ikan dengan kunyit, garam. Bakar hingga masak. Serve dengan nasi perang dan ulam segar." },

  // dinner
  { name: "Steamed Chicken with Veg & Brown Rice", name_ms: "Ayam Kukus dengan Sayur & Nasi Perang", category: "dinner", bmi_category: "Underweight", calories: 460, protein: 36, carbs: 50, fat: 9, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Kukus ayam dengan halia dan bawang putih. Rebus sayur. Serve dengan nasi perang." },
  { name: "Baked Salmon with Sweet Potato", name_ms: "Salmon Bakar dengan Keledek", category: "dinner", bmi_category: "Underweight", calories: 520, protein: 40, carbs: 42, fat: 16, price_rm: 18.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Perap salmon dengan lemon dan herbs. Bakar 200°C selama 15 minit. Serve dengan keledek bakar." },
  { name: "Stir Fry Tofu with Broccoli & Brown Rice", name_ms: "Tauhu Goreng dengan Brokoli & Nasi Perang", category: "dinner", bmi_category: "Underweight", calories: 410, protein: 22, carbs: 52, fat: 11, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Goreng tauhu hingga keemasan. Masak brokoli dengan bawang putih. Campurkan, serve dengan nasi perang." },
  { name: "Chicken Soup with Vegetables", name_ms: "Sup Ayam dengan Sayur-sayuran", category: "dinner", bmi_category: "Underweight", calories: 380, protein: 30, carbs: 32, fat: 10, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Rebus ayam dengan lobak, saderi, bawang. Perasakan dengan garam dan lada." },
  { name: "Whole Wheat Pasta with Grilled Chicken", name_ms: "Pasta Gandum Penuh dengan Ayam Panggang", category: "dinner", bmi_category: "Underweight", calories: 490, protein: 34, carbs: 58, fat: 12, price_rm: 14.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Rebus pasta gandum penuh. Grill ayam. Campurkan dengan sos tomato rendah sodium dan sayur." },

  // snack
  { name: "Apple with Almond Butter", name_ms: "Epal dengan Mentega Badam", category: "snack", bmi_category: "Underweight", calories: 200, protein: 5, carbs: 28, fat: 9, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Hiris epal. Serve dengan 1 sudu mentega badam." },
  { name: "Mixed Nuts & Seeds", name_ms: "Kacang & Biji Campur", category: "snack", bmi_category: "Underweight", calories: 220, protein: 7, carbs: 12, fat: 18, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Campurkan badam, walnut, biji labu dan biji bunga matahari." },
  { name: "Chia Seed Pudding", name_ms: "Puding Biji Chia", category: "snack", bmi_category: "Underweight", calories: 240, protein: 8, carbs: 30, fat: 10, price_rm: 6.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Rendam biji chia dalam susu badam semalaman. Tambah madu dan buah segar sebelum makan." },
  { name: "Edamame", name_ms: "Edamame", category: "snack", bmi_category: "Underweight", calories: 180, protein: 14, carbs: 16, fat: 6, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Rebus edamame dengan sedikit garam. Serve suam atau sejuk." },
  { name: "Hummus with Carrot Sticks", name_ms: "Hummus dengan Lobak Merah", category: "snack", bmi_category: "Underweight", calories: 190, protein: 7, carbs: 24, fat: 8, price_rm: 7.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Blend chickpeas dengan tahini, lemon, bawang putih. Serve dengan lobak merah hiris." },

  // ============================================================
  // NORMAL + PCOS — tambah lagi (existing 6, add 14 more)
  // ============================================================

  { name: "Oat with Chia & Blueberry", name_ms: "Oat dengan Chia & Blueberry", category: "breakfast", bmi_category: "Normal", calories: 300, protein: 11, carbs: 48, fat: 7, price_rm: 7.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Masak oat. Tambah biji chia dan blueberry segar. Drizzle madu." },
  { name: "Scrambled Egg with Wholemeal Toast", name_ms: "Telur Scramble dengan Roti Wholemeal", category: "breakfast", bmi_category: "Normal", calories: 320, protein: 18, carbs: 34, fat: 12, price_rm: 6.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Pukul 2 biji telur. Masak perlahan dengan sedikit mentega. Serve dengan roti wholemeal." },
  { name: "Banana Oat Smoothie", name_ms: "Smoothie Oat Pisang", category: "breakfast", bmi_category: "Normal", calories: 280, protein: 10, carbs: 50, fat: 5, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Blend pisang, oat, susu rendah lemak dan sedikit madu." },

  { name: "Brown Rice with Grilled Fish & Ulam", name_ms: "Nasi Perang dengan Ikan Bakar & Ulam", category: "lunch", bmi_category: "Normal", calories: 430, protein: 34, carbs: 46, fat: 9, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Bakar ikan kembung dengan kunyit. Masak nasi perang. Serve dengan ulam dan sambal belacan sikit." },
  { name: "Chicken & Veg Stir Fry with Brown Rice", name_ms: "Ayam & Sayur Goreng dengan Nasi Perang", category: "lunch", bmi_category: "Normal", calories: 410, protein: 30, carbs: 48, fat: 10, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Goreng ayam dengan bawang, capsicum, brokoli. Guna sos tiram rendah sodium. Serve dengan nasi perang." },
  { name: "Tuna Salad Wrap (Wholemeal)", name_ms: "Wrap Salad Tuna (Wholemeal)", category: "lunch", bmi_category: "Normal", calories: 370, protein: 28, carbs: 38, fat: 10, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Campurkan tuna, timun, tomato, yogurt greek. Balut dalam tortilla wholemeal." },

  { name: "Grilled Chicken with Salad & Quinoa", name_ms: "Ayam Panggang dengan Salad & Quinoa", category: "dinner", bmi_category: "Normal", calories: 420, protein: 36, carbs: 38, fat: 11, price_rm: 13.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Grill ayam. Masak quinoa. Serve dengan salad hijau dan dressing lemon." },
  { name: "Steamed Fish with Tofu & Veg", name_ms: "Ikan Kukus dengan Tauhu & Sayur", category: "dinner", bmi_category: "Normal", calories: 350, protein: 32, carbs: 22, fat: 9, price_rm: 11.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Kukus ikan siakap dengan halia, daun bawang. Serve dengan tauhu kukus dan sayur rebus." },
  { name: "Vegetable Curry with Brown Rice", name_ms: "Kari Sayur dengan Nasi Perang", category: "dinner", bmi_category: "Normal", calories: 380, protein: 14, carbs: 58, fat: 10, price_rm: 7.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Masak kari sayur campur — lobak, kentang, kacang buncis dengan santan rendah lemak. Serve dengan nasi perang." },

  { name: "Greek Yogurt with Flaxseed", name_ms: "Yogurt Greek dengan Biji Flax", category: "snack", bmi_category: "Normal", calories: 160, protein: 12, carbs: 16, fat: 5, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Masukkan yogurt greek dalam mangkuk. Taburkan biji flax dan sedikit madu." },
  { name: "Roasted Chickpeas", name_ms: "Chickpeas Bakar", category: "snack", bmi_category: "Normal", calories: 190, protein: 10, carbs: 28, fat: 5, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, recipe: "Perap chickpeas dengan minyak zaitun dan rempah. Bakar 200°C selama 25 minit." },

  // ============================================================
  // OVERWEIGHT + REGULAR (is_pcos_friendly = 0)
  // ============================================================

  { name: "Nasi Lemak Biasa", name_ms: "Nasi Lemak Biasa", category: "breakfast", bmi_category: "Overweight", calories: 400, protein: 12, carbs: 55, fat: 15, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Nasi lemak standard dengan sambal, telur rebus, ikan bilis dan timun." },
  { name: "Roti Canai with Dhal", name_ms: "Roti Canai dengan Dhal", category: "breakfast", bmi_category: "Overweight", calories: 380, protein: 10, carbs: 60, fat: 12, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Roti canai panas dengan kuah dhal dan kuah kari." },
  { name: "Nasi Goreng Ayam", name_ms: "Nasi Goreng Ayam", category: "breakfast", bmi_category: "Overweight", calories: 450, protein: 18, carbs: 58, fat: 16, price_rm: 6.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Goreng nasi semalam dengan ayam, telur, sos tiram dan kicap." },
  { name: "Mihun Goreng", name_ms: "Mihun Goreng", category: "breakfast", bmi_category: "Overweight", calories: 390, protein: 14, carbs: 56, fat: 13, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Goreng mihun dengan udang, telur, sayur dan sos." },
  { name: "Toast with Kaya & Butter", name_ms: "Roti Bakar dengan Kaya & Mentega", category: "breakfast", bmi_category: "Overweight", calories: 320, protein: 7, carbs: 48, fat: 11, price_rm: 3.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Bakar roti. Sapu kaya dan mentega. Minum dengan teh tarik." },

  { name: "Nasi Campur (1 lauk)", name_ms: "Nasi Campur (1 lauk)", category: "lunch", bmi_category: "Overweight", calories: 480, protein: 20, carbs: 62, fat: 14, price_rm: 7.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Nasi putih dengan 1 lauk pilihan dan sayur." },
  { name: "Mee Goreng Mamak", name_ms: "Mee Goreng Mamak", category: "lunch", bmi_category: "Overweight", calories: 520, protein: 18, carbs: 70, fat: 18, price_rm: 6.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Goreng mee kuning dengan udang, tauhu, telur dan sos mamak." },
  { name: "Nasi Ayam", name_ms: "Nasi Ayam", category: "lunch", bmi_category: "Overweight", calories: 500, protein: 28, carbs: 58, fat: 15, price_rm: 7.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Nasi ayam hainan standard dengan sup, sos halia dan sos cili." },
  { name: "Laksa Asam", name_ms: "Laksa Asam", category: "lunch", bmi_category: "Overweight", calories: 460, protein: 20, carbs: 64, fat: 12, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Mi laksa dalam kuah asam pedas dengan ikan, timun dan daun kesum." },
  { name: "Chicken Chop with Rice", name_ms: "Chicken Chop dengan Nasi", category: "lunch", bmi_category: "Overweight", calories: 580, protein: 32, carbs: 55, fat: 22, price_rm: 12.00, budget_category: "premium", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Goreng chicken chop. Serve dengan nasi, coleslaw dan sos mushroom." },

  { name: "Nasi Goreng Kampung", name_ms: "Nasi Goreng Kampung", category: "dinner", bmi_category: "Overweight", calories: 470, protein: 16, carbs: 60, fat: 17, price_rm: 6.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Goreng nasi dengan ikan bilis, cili, telur dan sayur." },
  { name: "Sup Tulang with Nasi", name_ms: "Sup Tulang dengan Nasi", category: "dinner", bmi_category: "Overweight", calories: 520, protein: 30, carbs: 50, fat: 18, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Rebus tulang lembu dengan rempah dan sayur. Serve dengan nasi." },
  { name: "Ayam Masak Merah with Nasi", name_ms: "Ayam Masak Merah dengan Nasi", category: "dinner", bmi_category: "Overweight", calories: 540, protein: 28, carbs: 58, fat: 18, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Masak ayam dengan sos tomato pedas manis. Serve dengan nasi." },
  { name: "Ikan Goreng with Nasi & Sayur", name_ms: "Ikan Goreng dengan Nasi & Sayur", category: "dinner", bmi_category: "Overweight", calories: 490, protein: 30, carbs: 52, fat: 14, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Goreng ikan dengan kunyit dan garam. Serve dengan nasi dan sayur tumis." },
  { name: "Mee Rebus", name_ms: "Mee Rebus", category: "dinner", bmi_category: "Overweight", calories: 440, protein: 18, carbs: 62, fat: 12, price_rm: 6.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Mee kuning dalam kuah keledek pekat dengan telur rebus dan tauhu." },

  { name: "Pisang Goreng", name_ms: "Pisang Goreng", category: "snack", bmi_category: "Overweight", calories: 220, protein: 2, carbs: 38, fat: 8, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Celup pisang dalam tepung. Goreng hingga keemasan." },
  { name: "Keropok Lekor", name_ms: "Keropok Lekor", category: "snack", bmi_category: "Overweight", calories: 200, protein: 6, carbs: 32, fat: 6, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Keropok lekor goreng atau rebus. Serve dengan sos cili." },
  { name: "Cendol", name_ms: "Cendol", category: "snack", bmi_category: "Overweight", calories: 250, protein: 3, carbs: 52, fat: 5, price_rm: 3.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Cendol dengan santan, gula melaka dan ais." },
  { name: "Curry Puff (2pcs)", name_ms: "Karipap (2 biji)", category: "snack", bmi_category: "Overweight", calories: 280, protein: 6, carbs: 36, fat: 13, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Karipap inti kentang dan ayam. Goreng atau bakar." },
  { name: "Roti John", name_ms: "Roti John", category: "snack", bmi_category: "Overweight", calories: 320, protein: 14, carbs: 38, fat: 12, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Roti baguette dengan telur, daging cincang dan sos." },

  // ============================================================
  // OBESE + REGULAR (is_pcos_friendly = 0)
  // ============================================================

  { name: "Oat with Low Fat Milk", name_ms: "Oat dengan Susu Rendah Lemak", category: "breakfast", bmi_category: "Obese", calories: 280, protein: 10, carbs: 46, fat: 5, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Masak oat dengan susu rendah lemak. Boleh tambah pisang atau madu." },
  { name: "Roti Wholemeal with Egg", name_ms: "Roti Wholemeal dengan Telur", category: "breakfast", bmi_category: "Obese", calories: 300, protein: 16, carbs: 36, fat: 10, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Bakar roti wholemeal. Goreng telur separuh masak. Serve bersama." },
  { name: "Congee with Chicken (Bubur Ayam)", name_ms: "Bubur Ayam", category: "breakfast", bmi_category: "Obese", calories: 320, protein: 18, carbs: 48, fat: 6, price_rm: 6.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Masak bubur beras dengan ayam. Perasakan dengan halia dan daun bawang." },
  { name: "Vegetable Soup with Bread", name_ms: "Sup Sayur dengan Roti", category: "breakfast", bmi_category: "Obese", calories: 290, protein: 10, carbs: 44, fat: 7, price_rm: 5.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Sup sayur campur dengan lobak, celery dan bawang. Serve dengan roti." },
  { name: "Nasi Lemak Sihat (Kurang Santan)", name_ms: "Nasi Lemak Sihat", category: "breakfast", bmi_category: "Obese", calories: 350, protein: 14, carbs: 50, fat: 10, price_rm: 5.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Nasi lemak dengan santan sikit, sambal kurang minyak, telur rebus dan timun." },

  { name: "Nasi + Sayur + Ikan Kukus", name_ms: "Nasi + Sayur + Ikan Kukus", category: "lunch", bmi_category: "Obese", calories: 420, protein: 32, carbs: 50, fat: 8, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Nasi putih dengan ikan kukus dan sayur rebus. Rendah minyak." },
  { name: "Grilled Chicken Rice", name_ms: "Nasi Ayam Panggang", category: "lunch", bmi_category: "Obese", calories: 440, protein: 34, carbs: 48, fat: 9, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Ayam panggang tanpa kulit. Serve dengan nasi dan sup." },
  { name: "Yong Tau Foo (soup based)", name_ms: "Yong Tau Foo (berkuah)", category: "lunch", bmi_category: "Obese", calories: 360, protein: 20, carbs: 44, fat: 8, price_rm: 7.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Pilih tauhu dan sayur. Minta kuah sup. Elak sos manis berlebihan." },
  { name: "Wan Tan Mee (soup)", name_ms: "Wantan Mee (berkuah)", category: "lunch", bmi_category: "Obese", calories: 380, protein: 18, carbs: 52, fat: 9, price_rm: 7.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Mee dalam kuah sup dengan wantan dan sayur hijau." },
  { name: "Mixed Veg with Tofu & Brown Rice", name_ms: "Sayur Campur Tauhu & Nasi Perang", category: "lunch", bmi_category: "Obese", calories: 380, protein: 18, carbs: 52, fat: 8, price_rm: 7.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Tumis sayur dengan tauhu. Guna minyak sedikit. Serve dengan nasi perang." },

  { name: "Steamed Fish with Veg", name_ms: "Ikan Kukus dengan Sayur", category: "dinner", bmi_category: "Obese", calories: 340, protein: 32, carbs: 20, fat: 8, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Kukus ikan dengan halia, kicap rendah sodium. Serve dengan sayur rebus." },
  { name: "Chicken Soup Rice", name_ms: "Nasi Sup Ayam", category: "dinner", bmi_category: "Obese", calories: 380, protein: 28, carbs: 44, fat: 8, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Sup ayam dengan sayur. Serve dengan nasi putih atau nasi perang." },
  { name: "Stir Fry Vegetable with Chicken", name_ms: "Sayur Goreng dengan Ayam", category: "dinner", bmi_category: "Obese", calories: 350, protein: 26, carbs: 24, fat: 14, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Tumis ayam dengan brokoli, kailan, bawang putih. Guna minyak sedikit." },
  { name: "Porridge with Fish", name_ms: "Bubur Ikan", category: "dinner", bmi_category: "Obese", calories: 320, protein: 22, carbs: 42, fat: 5, price_rm: 7.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Masak bubur dengan ikan dan halia. Rendah lemak dan mudah hadam." },
  { name: "Tomato Soup with Wholemeal Bread", name_ms: "Sup Tomato dengan Roti Wholemeal", category: "dinner", bmi_category: "Obese", calories: 300, protein: 10, carbs: 46, fat: 7, price_rm: 7.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Blend tomato masak dengan bawang dan herbs. Serve dengan roti wholemeal." },

  { name: "Buah-buahan Segar", name_ms: "Buah-buahan Segar", category: "snack", bmi_category: "Obese", calories: 120, protein: 1, carbs: 30, fat: 0, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Pilih buah-buahan rendah kalori seperti tembikai, betik atau epal." },
  { name: "Low Fat Yogurt", name_ms: "Yogurt Rendah Lemak", category: "snack", bmi_category: "Obese", calories: 140, protein: 8, carbs: 20, fat: 2, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Yogurt rendah lemak tanpa perisa. Boleh tambah sedikit buah." },
  { name: "Boiled Corn", name_ms: "Jagung Rebus", category: "snack", bmi_category: "Obese", calories: 160, protein: 4, carbs: 34, fat: 2, price_rm: 2.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Rebus jagung dengan sedikit garam. Tanpa mentega." },
  { name: "Cucumber & Tomato Salad", name_ms: "Salad Timun & Tomato", category: "snack", bmi_category: "Obese", calories: 80, protein: 2, carbs: 16, fat: 1, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Hiris timun dan tomato. Perasakan dengan lemon dan sedikit garam." },
  { name: "Unsalted Crackers with Low Fat Cheese", name_ms: "Krekker Tanpa Garam dengan Keju Rendah Lemak", category: "snack", bmi_category: "Obese", calories: 180, protein: 7, carbs: 24, fat: 6, price_rm: 4.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, recipe: "Letak keju rendah lemak atas krekker tanpa garam." },,
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

const seedRecipes = async () => {
  const client = await pool.connect();
  try {
    let inserted = 0;
    let skipped = 0;

    for (const m of allMeals) {
      const existing = await client.query(
        `SELECT id FROM recipes WHERE name = $1 AND bmi_category = $2 AND is_pcos_friendly = $3`,
        [m.name, m.bmi_category, m.is_pcos_friendly]
      );

      if (existing.rows.length > 0) {
        skipped++;
        continue;
      }

      await client.query(
        `INSERT INTO recipes 
         (name, name_ms, category, bmi_category, calories, protein, carbs, fat, price_rm, budget_category, is_pcos_friendly, is_low_gi, cuisine_type, recipe)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
        [m.name, m.name_ms, m.category, m.bmi_category, m.calories, m.protein, m.carbs, m.fat,
         m.price_rm, m.budget_category, m.is_pcos_friendly, m.is_low_gi, m.cuisine_type, m.recipe]
      );
      inserted++;
    }

    console.log(`🎉 Seed done! Inserted: ${inserted}, Skipped: ${skipped}`);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
  } finally {
    client.release();
    pool.end();
  }
};

seedRecipes();