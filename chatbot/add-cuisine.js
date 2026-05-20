// add-cuisine.js
// Run: node add-cuisine.js
// 1) Adds cuisine_type column
// 2) Sets all existing meals to 'local'
// 3) Inserts western meals for all BMI categories

const db = require('./db');

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

const westernMeals = [

  // ============================================================
  // UNDERWEIGHT — WESTERN — REGULAR
  // ============================================================
  { name: "Pancakes with Maple Syrup", name_ms: "Penkek dengan Sirap Maple", category: "breakfast", bmi_category: "Underweight", calories: 420, protein: 10, carbs: 70, fat: 12, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Buat adunan penkek. Goreng hingga keemasan. Serve dengan maple syrup dan butter." },
  { name: "French Toast with Berries", name_ms: "Roti Perancis dengan Beri", category: "breakfast", bmi_category: "Underweight", calories: 390, protein: 14, carbs: 58, fat: 13, price_rm: 11.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Celup roti dalam telur dan susu. Goreng. Serve dengan beri segar dan serbuk gula." },
  { name: "Eggs Benedict", name_ms: "Eggs Benedict", category: "breakfast", bmi_category: "Underweight", calories: 450, protein: 20, carbs: 38, fat: 22, price_rm: 14.00, budget_category: "premium", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Poach telur. Letak atas English muffin dengan Canadian bacon dan hollandaise sauce." },
  { name: "Beef Burger with Fries", name_ms: "Burger Daging dengan Kentang Goreng", category: "lunch", bmi_category: "Underweight", calories: 680, protein: 32, carbs: 72, fat: 28, price_rm: 14.00, budget_category: "premium", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Patty daging lembu dengan sayur, sos dan bun. Serve dengan fries." },
  { name: "Spaghetti Bolognese", name_ms: "Spageti Bolognese", category: "lunch", bmi_category: "Underweight", calories: 580, protein: 28, carbs: 72, fat: 18, price_rm: 13.00, budget_category: "premium", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Masak daging cincang dengan sos tomato dan herbs. Serve atas spageti." },
  { name: "Club Sandwich", name_ms: "Club Sandwich", category: "lunch", bmi_category: "Underweight", calories: 480, protein: 26, carbs: 50, fat: 18, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "3 lapis roti dengan ayam, bacon, telur, tomato dan salad." },
  { name: "Grilled Steak with Mashed Potato", name_ms: "Stik Panggang dengan Kentang Lenyek", category: "dinner", bmi_category: "Underweight", calories: 620, protein: 42, carbs: 38, fat: 28, price_rm: 22.00, budget_category: "premium", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Grill steak medium well. Serve dengan mashed potato dan mushroom sauce." },
  { name: "Creamy Chicken Pasta", name_ms: "Pasta Ayam Berkrim", category: "dinner", bmi_category: "Underweight", calories: 560, protein: 30, carbs: 62, fat: 20, price_rm: 14.00, budget_category: "premium", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Masak pasta. Buat sos krim dengan ayam, bawang putih dan parmesan." },
  { name: "Chocolate Muffin", name_ms: "Muffin Coklat", category: "snack", bmi_category: "Underweight", calories: 280, protein: 5, carbs: 42, fat: 11, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Muffin coklat homemade atau kedai. Makan dengan susu." },
  { name: "Cheese & Crackers", name_ms: "Keju & Krekker", category: "snack", bmi_category: "Underweight", calories: 240, protein: 9, carbs: 26, fat: 12, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Letak hirisan keju cheddar atas krekker. Boleh tambah buah anggur." },

  // ============================================================
  // UNDERWEIGHT — WESTERN — PCOS
  // ============================================================
  { name: "Avocado Toast with Poached Egg", name_ms: "Roti Avokado dengan Telur Poach", category: "breakfast", bmi_category: "Underweight", calories: 380, protein: 16, carbs: 36, fat: 20, price_rm: 12.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Lenyek avokado atas roti wholegrain. Letak telur poach. Tabur lada dan lemon." },
  { name: "Veggie Omelette", name_ms: "Telur Dadar Sayur", category: "breakfast", bmi_category: "Underweight", calories: 300, protein: 18, carbs: 12, fat: 20, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Pukul telur. Masak dengan spinach, tomato, capsicum dan feta cheese." },
  { name: "Grilled Salmon Salad", name_ms: "Salad Salmon Panggang", category: "lunch", bmi_category: "Underweight", calories: 420, protein: 36, carbs: 18, fat: 22, price_rm: 18.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Grill salmon. Letak atas mixed greens, timun, tomato. Dressing lemon minyak zaitun." },
  { name: "Turkey & Veggie Wrap", name_ms: "Wrap Turki & Sayur", category: "lunch", bmi_category: "Underweight", calories: 380, protein: 28, carbs: 38, fat: 12, price_rm: 12.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Balut turkey slice, avokado, tomato dan salad dalam wholemeal tortilla." },
  { name: "Baked Cod with Roasted Veg", name_ms: "Ikan Kod Bakar dengan Sayur Bakar", category: "dinner", bmi_category: "Underweight", calories: 400, protein: 38, carbs: 28, fat: 14, price_rm: 18.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Bakar ikan kod dengan herbs dan lemon. Serve dengan sayur bakar — zucchini, capsicum, bawang." },
  { name: "Quinoa Buddha Bowl", name_ms: "Mangkuk Buddha Quinoa", category: "dinner", bmi_category: "Underweight", calories: 440, protein: 22, carbs: 52, fat: 14, price_rm: 15.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Quinoa dengan chickpeas bakar, avokado, edamame, timun dan tahini dressing." },
  { name: "Berry Protein Smoothie", name_ms: "Smoothie Protein Beri", category: "snack", bmi_category: "Underweight", calories: 220, protein: 16, carbs: 28, fat: 4, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Blend mixed berries, protein powder, susu badam dan biji chia." },
  { name: "Celery with Almond Butter", name_ms: "Saderi dengan Mentega Badam", category: "snack", bmi_category: "Underweight", calories: 160, protein: 5, carbs: 12, fat: 10, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Isi batang saderi dengan mentega badam semula jadi." },

  // ============================================================
  // NORMAL — WESTERN — REGULAR
  // ============================================================
  { name: "Granola with Milk", name_ms: "Granola dengan Susu", category: "breakfast", bmi_category: "Normal", calories: 350, protein: 10, carbs: 56, fat: 10, price_rm: 7.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Tuang granola dalam mangkuk. Tambah susu sejuk. Boleh hiaskan dengan buah." },
  { name: "Bacon & Egg Toast", name_ms: "Toast Bacon & Telur", category: "breakfast", bmi_category: "Normal", calories: 420, protein: 22, carbs: 36, fat: 20, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Goreng bacon dan telur. Letak atas roti bakar dengan sos tomato." },
  { name: "Caesar Salad with Chicken", name_ms: "Salad Caesar dengan Ayam", category: "lunch", bmi_category: "Normal", calories: 420, protein: 30, carbs: 24, fat: 22, price_rm: 13.00, budget_category: "premium", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Romaine lettuce dengan ayam panggang, crouton, parmesan dan caesar dressing." },
  { name: "BLT Sandwich", name_ms: "Sandwic BLT", category: "lunch", bmi_category: "Normal", calories: 400, protein: 18, carbs: 44, fat: 18, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Bacon, lettuce dan tomato dalam roti. Sapu mayo." },
  { name: "Chicken Chop with Coleslaw", name_ms: "Chicken Chop dengan Coleslaw", category: "dinner", bmi_category: "Normal", calories: 520, protein: 34, carbs: 40, fat: 22, price_rm: 14.00, budget_category: "premium", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Goreng chicken chop. Serve dengan coleslaw, kentang dan sos mushroom." },
  { name: "Fish & Chips", name_ms: "Ikan & Cip", category: "dinner", bmi_category: "Normal", calories: 560, protein: 28, carbs: 62, fat: 22, price_rm: 14.00, budget_category: "premium", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Celup ikan dalam tepung. Goreng hingga crispy. Serve dengan fries dan tartar sauce." },
  { name: "Chocolate Chip Cookies (2pcs)", name_ms: "Biskut Cip Coklat (2 keping)", category: "snack", bmi_category: "Normal", calories: 200, protein: 2, carbs: 28, fat: 9, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Cookies coklat homemade atau kedai bakeri." },
  { name: "Banana Bread Slice", name_ms: "Kek Roti Pisang", category: "snack", bmi_category: "Normal", calories: 220, protein: 4, carbs: 38, fat: 7, price_rm: 4.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Kek roti pisang homemade. Boleh makan suam atau sejuk." },

  // ============================================================
  // NORMAL — WESTERN — PCOS
  // ============================================================
  { name: "Smoked Salmon Bagel (Wholemeal)", name_ms: "Bagel Salmon Asap (Wholemeal)", category: "breakfast", bmi_category: "Normal", calories: 360, protein: 22, carbs: 42, fat: 12, price_rm: 14.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Letak cream cheese dan smoked salmon atas bagel wholemeal. Hiaskan dengan capers dan dill." },
  { name: "Egg White Omelette with Spinach", name_ms: "Telur Putih Dadar dengan Bayam", category: "breakfast", bmi_category: "Normal", calories: 220, protein: 20, carbs: 8, fat: 10, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Pukul putih telur. Masak dengan bayam, bawang dan tomato. Rendah kalori, tinggi protein." },
  { name: "Nicoise Salad", name_ms: "Salad Nicoise", category: "lunch", bmi_category: "Normal", calories: 380, protein: 28, carbs: 24, fat: 18, price_rm: 15.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Tuna, telur rebus, kacang hijau, tomato dan zaitun dengan French dressing." },
  { name: "Grilled Chicken & Quinoa Bowl", name_ms: "Mangkuk Ayam Panggang & Quinoa", category: "lunch", bmi_category: "Normal", calories: 420, protein: 36, carbs: 40, fat: 10, price_rm: 14.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Ayam panggang atas quinoa dengan roasted veg dan lemon herb dressing." },
  { name: "Herb Crusted Salmon", name_ms: "Salmon Berempah Herbs", category: "dinner", bmi_category: "Normal", calories: 420, protein: 38, carbs: 12, fat: 22, price_rm: 20.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Sapu salmon dengan herbs dan breadcrumbs wholemeal. Bakar 180°C, 15 minit." },
  { name: "Zucchini Noodles with Pesto Chicken", name_ms: "Mi Zucchini dengan Ayam Pesto", category: "dinner", bmi_category: "Normal", calories: 360, protein: 32, carbs: 18, fat: 18, price_rm: 15.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Spiral zucchini jadi mi. Goreng ayam dengan pesto. Campurkan. Tabur parmesan." },
  { name: "Mixed Berries with Yogurt", name_ms: "Beri Campur dengan Yogurt", category: "snack", bmi_category: "Normal", calories: 150, protein: 8, carbs: 22, fat: 3, price_rm: 6.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Greek yogurt dengan strawberry, blueberry dan raspberry." },

  // ============================================================
  // OVERWEIGHT — WESTERN — REGULAR
  // ============================================================
  { name: "Boiled Egg with Toast", name_ms: "Telur Rebus dengan Toast", category: "breakfast", bmi_category: "Overweight", calories: 300, protein: 16, carbs: 34, fat: 10, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Rebus 2 telur. Serve dengan roti wholemeal bakar. Kurangkan butter." },
  { name: "Cereal with Skim Milk", name_ms: "Bijirin dengan Susu Skim", category: "breakfast", bmi_category: "Overweight", calories: 280, protein: 10, carbs: 50, fat: 3, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Bijirin rendah gula dengan susu skim. Pilih yang high fibre." },
  { name: "Tuna Sandwich (Wholemeal)", name_ms: "Sandwic Tuna (Wholemeal)", category: "lunch", bmi_category: "Overweight", calories: 360, protein: 26, carbs: 40, fat: 10, price_rm: 7.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Tuna campur mayo rendah lemak, celery dan bawang. Letak dalam roti wholemeal." },
  { name: "Garden Salad with Grilled Chicken", name_ms: "Salad Taman dengan Ayam Panggang", category: "lunch", bmi_category: "Overweight", calories: 340, protein: 30, carbs: 18, fat: 14, price_rm: 12.00, budget_category: "premium", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Salad hijau campur dengan ayam panggang tanpa kulit. Dressing balsamic." },
  { name: "Baked Chicken with Steamed Veg", name_ms: "Ayam Bakar dengan Sayur Kukus", category: "dinner", bmi_category: "Overweight", calories: 380, protein: 36, carbs: 20, fat: 14, price_rm: 12.00, budget_category: "premium", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Bakar ayam tanpa kulit dengan herbs. Serve dengan brokoli dan lobak kukus." },
  { name: "Minestrone Soup with Bread", name_ms: "Sup Minestrone dengan Roti", category: "dinner", bmi_category: "Overweight", calories: 320, protein: 12, carbs: 48, fat: 7, price_rm: 10.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Sup sayur Italia dengan pasta, kacang dan tomato. Serve dengan roti wholemeal." },
  { name: "Rice Cake with Peanut Butter", name_ms: "Kek Nasi dengan Mentega Kacang", category: "snack", bmi_category: "Overweight", calories: 160, protein: 5, carbs: 22, fat: 6, price_rm: 3.50, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Rice cake dengan sedikit peanut butter. Rendah kalori, mengenyangkan." },
  { name: "Apple Slices with Cinnamon", name_ms: "Hirisan Epal dengan Kayu Manis", category: "snack", bmi_category: "Overweight", calories: 100, protein: 0, carbs: 26, fat: 0, price_rm: 3.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Hiris epal. Taburkan kayu manis. Tanpa gula tambahan." },

  // ============================================================
  // OVERWEIGHT — WESTERN — PCOS
  // ============================================================
  { name: "Chia Overnight Oats", name_ms: "Oat Semalaman dengan Chia", category: "breakfast", bmi_category: "Overweight", calories: 290, protein: 12, carbs: 44, fat: 8, price_rm: 6.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Rendam oat, chia, susu badam semalaman. Tambah buah segar sebelum makan." },
  { name: "Spinach & Mushroom Omelette", name_ms: "Telur Dadar Bayam & Cendawan", category: "breakfast", bmi_category: "Overweight", calories: 260, protein: 18, carbs: 8, fat: 16, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Telur dengan bayam dan cendawan. Masak dengan minyak zaitun sedikit." },
  { name: "Lentil & Veggie Soup", name_ms: "Sup Lentil & Sayur", category: "lunch", bmi_category: "Overweight", calories: 320, protein: 18, carbs: 48, fat: 5, price_rm: 8.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Rebus lentil merah dengan tomato, bawang, wortel dan rempah Mediterranean." },
  { name: "Grilled Chicken Caesar (No Crouton)", name_ms: "Caesar Ayam Panggang (Tanpa Crouton)", category: "lunch", bmi_category: "Overweight", calories: 350, protein: 32, carbs: 12, fat: 18, price_rm: 13.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Caesar salad tanpa crouton. Ayam panggang, romaine, parmesan, light caesar dressing." },
  { name: "Baked Salmon with Asparagus", name_ms: "Salmon Bakar dengan Asparagus", category: "dinner", bmi_category: "Overweight", calories: 380, protein: 38, carbs: 10, fat: 20, price_rm: 20.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Bakar salmon dan asparagus dengan minyak zaitun, lemon dan bawang putih." },
  { name: "Turkey Meatball with Zucchini Noodle", name_ms: "Bebola Daging Turki dengan Mi Zucchini", category: "dinner", bmi_category: "Overweight", calories: 360, protein: 32, carbs: 18, fat: 16, price_rm: 16.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Buat bebola daging turki. Masak dengan sos tomato. Serve dengan zucchini noodle." },
  { name: "Walnuts & Dark Chocolate", name_ms: "Walnut & Coklat Gelap", category: "snack", bmi_category: "Overweight", calories: 200, protein: 4, carbs: 14, fat: 15, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Segenggam walnut dengan 2-3 ketul dark chocolate (70% cocoa). Elak milk chocolate." },
  { name: "Cucumber & Hummus", name_ms: "Timun & Hummus", category: "snack", bmi_category: "Overweight", calories: 140, protein: 5, carbs: 18, fat: 6, price_rm: 5.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Hiris timun. Serve dengan hummus homemade atau kedai." },

  // ============================================================
  // OBESE — WESTERN — REGULAR
  // ============================================================
  { name: "Poached Egg on Wholemeal Toast", name_ms: "Telur Poach atas Roti Wholemeal", category: "breakfast", bmi_category: "Obese", calories: 260, protein: 14, carbs: 30, fat: 9, price_rm: 6.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Poach telur. Letak atas roti wholemeal. Tabur lada hitam dan chili flakes." },
  { name: "Low Fat Yogurt Parfait", name_ms: "Parfait Yogurt Rendah Lemak", category: "breakfast", bmi_category: "Obese", calories: 240, protein: 12, carbs: 36, fat: 4, price_rm: 7.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Layer yogurt rendah lemak, granola sikit dan buah segar dalam gelas." },
  { name: "Grilled Chicken Salad", name_ms: "Salad Ayam Panggang", category: "lunch", bmi_category: "Obese", calories: 300, protein: 30, carbs: 14, fat: 12, price_rm: 12.00, budget_category: "premium", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Ayam panggang tanpa kulit atas mixed greens. Light vinaigrette dressing." },
  { name: "Chicken Soup (No Noodle)", name_ms: "Sup Ayam (Tanpa Mi)", category: "lunch", bmi_category: "Obese", calories: 240, protein: 24, carbs: 14, fat: 8, price_rm: 9.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Sup ayam dengan sayur tanpa mi atau nasi. Rendah karbohidrat." },
  { name: "Steamed Broccoli with Grilled Chicken", name_ms: "Brokoli Kukus dengan Ayam Panggang", category: "dinner", bmi_category: "Obese", calories: 280, protein: 32, carbs: 14, fat: 10, price_rm: 11.00, budget_category: "sederhana", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Kukus brokoli. Panggang ayam tanpa kulit. Perasakan dengan herbs dan lemon." },
  { name: "Baked Fish with Salad", name_ms: "Ikan Bakar dengan Salad", category: "dinner", bmi_category: "Obese", calories: 300, protein: 32, carbs: 12, fat: 12, price_rm: 13.00, budget_category: "premium", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Bakar ikan white fish dengan herbs. Serve dengan salad segar tanpa dressing berat." },
  { name: "Sliced Apple", name_ms: "Epal Hiris", category: "snack", bmi_category: "Obese", calories: 80, protein: 0, carbs: 21, fat: 0, price_rm: 2.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Hiris epal segar. Makan tanpa apa-apa tambahan." },
  { name: "Carrot Sticks", name_ms: "Lobak Merah Hiris", category: "snack", bmi_category: "Obese", calories: 70, protein: 1, carbs: 16, fat: 0, price_rm: 2.00, budget_category: "ekonomi", is_pcos_friendly: 0, is_low_gi: 0, cuisine_type: "western", recipe: "Hiris lobak merah. Makan dengan dip low fat atau plain." },

  // ============================================================
  // OBESE — WESTERN — PCOS
  // ============================================================
  { name: "Flaxseed Smoothie", name_ms: "Smoothie Biji Flax", category: "breakfast", bmi_category: "Obese", calories: 220, protein: 10, carbs: 28, fat: 8, price_rm: 7.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Blend biji flax, bayam, pisang kecil, susu badam dan protein powder." },
  { name: "Egg & Veggie Scramble", name_ms: "Telur Scramble & Sayur", category: "breakfast", bmi_category: "Obese", calories: 240, protein: 18, carbs: 10, fat: 14, price_rm: 7.00, budget_category: "sederhana", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Scramble telur dengan spinach, tomato dan capsicum. Guna minyak zaitun sedikit." },
  { name: "Tuna & Avocado Salad", name_ms: "Salad Tuna & Avokado", category: "lunch", bmi_category: "Obese", calories: 320, protein: 28, carbs: 12, fat: 18, price_rm: 13.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Tuna, avokado, tomato cherry, timun dengan lemon dressing. Tanpa mayo." },
  { name: "Cauliflower Rice Bowl with Chicken", name_ms: "Mangkuk Nasi Cauliflower dengan Ayam", category: "lunch", bmi_category: "Obese", calories: 300, protein: 28, carbs: 16, fat: 12, price_rm: 12.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Parut cauliflower jadi 'nasi'. Serve dengan ayam panggang dan sayur bakar." },
  { name: "Grilled Salmon with Steamed Broccoli", name_ms: "Salmon Panggang dengan Brokoli Kukus", category: "dinner", bmi_category: "Obese", calories: 360, protein: 38, carbs: 10, fat: 18, price_rm: 20.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Grill salmon. Kukus brokoli. Perasakan dengan lemon, bawang putih dan dill." },
  { name: "Chicken & Veg Lettuce Wrap", name_ms: "Wrap Selada Ayam & Sayur", category: "dinner", bmi_category: "Obese", calories: 280, protein: 28, carbs: 12, fat: 12, price_rm: 12.00, budget_category: "premium", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Isi daun selada dengan ayam cincang goreng, lobak, timun dan sos hoisin sedikit." },
  { name: "Almonds (Small Handful)", name_ms: "Badam (Segenggam Kecil)", category: "snack", bmi_category: "Obese", calories: 160, protein: 6, carbs: 6, fat: 14, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Badam mentah atau bakar tanpa garam. Hadkan 20-25 biji." },
  { name: "Cucumber with Greek Yogurt Dip", name_ms: "Timun dengan Dip Yogurt Greek", category: "snack", bmi_category: "Obese", calories: 120, protein: 8, carbs: 12, fat: 3, price_rm: 4.00, budget_category: "ekonomi", is_pcos_friendly: 1, is_low_gi: 1, cuisine_type: "western", recipe: "Hiris timun. Buat dip dengan yogurt greek, bawang putih dan dill." },
];

async function main() {
  console.log("🚀 Starting add-cuisine migration...\n");

  // ── STEP 1: Add cuisine_type column ──
  try {
    await run(`ALTER TABLE recipes ADD COLUMN cuisine_type TEXT DEFAULT 'local'`);
    console.log("✅ Column 'cuisine_type' added\n");
  } catch (e) {
    if (e.message.includes("duplicate column")) {
      console.log("ℹ️  Column 'cuisine_type' already exists, skipping\n");
    } else {
      throw e;
    }
  }

  // ── STEP 2: Set all existing meals to 'local' ──
  await run(`UPDATE recipes SET cuisine_type = 'local' WHERE cuisine_type IS NULL OR cuisine_type = ''`);
  console.log("✅ All existing meals set to 'local'\n");

  // ── STEP 3: Insert western meals ──
  console.log("📦 Inserting western meals...\n");
  let inserted = 0;
  let skipped  = 0;

  for (const m of westernMeals) {
    const existing = await all(
      `SELECT id FROM recipes WHERE name = ? AND bmi_category = ? AND is_pcos_friendly = ? AND cuisine_type = 'western'`,
      [m.name, m.bmi_category, m.is_pcos_friendly]
    );

    if (existing.length > 0) {
      skipped++;
      continue;
    }

    await run(
      `INSERT INTO recipes 
        (name, name_ms, category, bmi_category, calories, protein, carbs, fat, price_rm, budget_category, is_pcos_friendly, is_low_gi, cuisine_type, recipe)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        m.name, m.name_ms, m.category, m.bmi_category,
        m.calories, m.protein, m.carbs, m.fat,
        m.price_rm, m.budget_category,
        m.is_pcos_friendly, m.is_low_gi, m.cuisine_type,
        m.recipe
      ]
    );
    inserted++;
    console.log(`  ✅ [${m.bmi_category}][PCOS:${m.is_pcos_friendly}][western] ${m.name}`);
  }

  console.log(`\n🎉 Done! Inserted: ${inserted}, Skipped: ${skipped}`);

  // ── STEP 4: Summary ──
  const summary = await all(`
    SELECT bmi_category, cuisine_type, is_pcos_friendly, COUNT(*) as cnt 
    FROM recipes 
    GROUP BY bmi_category, cuisine_type, is_pcos_friendly 
    ORDER BY bmi_category, cuisine_type, is_pcos_friendly
  `);

  console.log("\n📊 Database summary:");
  console.table(summary);

  process.exit(0);
}

main().catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});