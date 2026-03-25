import { BlogPost } from "./blogPosts";

const existingImages = [
  "/images/blog-diagnostic-lab-process.png",
  "/images/blog-home-sample-collection.png",
  "/images/blog-wellness-habits.jpg",
  "/images/blog-preventive-india.png",
  "/images/blog-signs-checkup.png",
  "/images/blog-imaging-tests.png",
  "/images/blog-test-accuracy.png",
  "/images/blog-home-collection.jpg",
  "/images/blog-liver-kidney.jpg",
  "/images/blog-hba1c.jpg",
  "/images/blog-corporate-health.jpg",
];

const img = (i: number) => existingImages[i % existingImages.length];

export const scheduledBlogPosts: BlogPost[] = [
  {
    slug: "understanding-cbc-complete-blood-count-test",
    img: img(0), date: "March 25, 2026", dateSort: "2026-03-25",
    title: "Understanding CBC: What Your Complete Blood Count Reveals",
    desc: "Learn what a CBC test measures, why doctors prescribe it, and how to read your complete blood count results for better health awareness.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Pathology",
    metaTitle: "CBC Test Explained – Complete Blood Count Guide",
    metaDescription: "Understand what a CBC test reveals about your health. Learn about RBC, WBC, haemoglobin & platelets from Aarvak Diagnostics, trusted lab in Gurugram.",
    content: `A Complete Blood Count, or CBC, is one of the most commonly prescribed blood tests in India. Whether you're visiting a doctor for fatigue, fever, or a routine checkup, chances are a CBC is part of the panel.

## What Does a CBC Measure?

A CBC evaluates three major components of your blood:

- **Red Blood Cells (RBC):** Carry oxygen throughout your body. Low RBC count may indicate anaemia.
- **White Blood Cells (WBC):** Fight infections. Elevated WBC can signal infection or inflammation.
- **Platelets:** Help blood clot. Abnormal platelet counts can indicate bleeding or clotting disorders.
- **Haemoglobin:** The protein in RBCs that carries oxygen. Low haemoglobin is a hallmark of anaemia.

## Why Is a CBC Important?

A CBC helps doctors:
- Diagnose infections, anaemia, and immune disorders
- Monitor chronic conditions
- Screen for blood cancers
- Evaluate overall health before surgeries

## When Should You Get a CBC?

You should consider a CBC if you experience unexplained fatigue, frequent infections, easy bruising, or as part of your annual [health checkup](/health-checkups). At Aarvak Diagnostics, CBC results are typically available within 6 hours.

## Understanding Your Results

Your report will show values alongside reference ranges. Don't panic over minor variations — your doctor interprets results in context. If you need a CBC test, [book with us](/contact-us#contact) or schedule a [home collection](/insights/home-sample-collection-benefits-safety-how-it-works) across Gurugram.`,
    tags: ["CBC", "Blood Test", "Pathology", "Complete Blood Count", "Health Checkup"],
  },
  {
    slug: "thyroid-disorders-signs-symptoms-testing",
    img: img(1), date: "March 27, 2026", dateSort: "2026-03-27",
    title: "Thyroid Disorders: Signs, Symptoms, and Diagnostic Testing",
    desc: "Thyroid disorders affect millions in India. Learn about hypothyroidism, hyperthyroidism symptoms, and why regular thyroid testing matters.",
    author: "Aarvak Diagnostics", readTime: "5 min", category: "Endocrinology",
    metaTitle: "Thyroid Disorders – Signs, Symptoms & Testing",
    metaDescription: "Learn about thyroid disorder symptoms, T3, T4, TSH testing and early detection. Book thyroid profile tests at Aarvak Diagnostics, Gurugram.",
    content: `Thyroid disorders are among the most common yet under-diagnosed conditions in India, affecting an estimated 42 million people. The thyroid gland controls metabolism, energy, and mood — when it malfunctions, the effects touch every part of your body.

## Common Signs of Thyroid Problems

### Hypothyroidism (Underactive Thyroid)
- Unexplained weight gain
- Constant fatigue and lethargy
- Dry skin and hair loss
- Feeling cold all the time
- Depression and brain fog

### Hyperthyroidism (Overactive Thyroid)
- Unexpected weight loss
- Rapid heartbeat and anxiety
- Excessive sweating
- Trembling hands
- Sleep difficulties

## The Thyroid Profile Test

A thyroid profile measures three key hormones:
- **TSH (Thyroid Stimulating Hormone):** The primary screening test
- **T3 (Triiodothyronine):** Active thyroid hormone
- **T4 (Thyroxine):** The main hormone produced by the thyroid

At Aarvak Diagnostics, thyroid tests are included in our [health checkup packages](/health-checkups) from the ADC Essential Panel onwards.

## Who Should Get Tested?

- Women over 30 (higher risk)
- Anyone with family history of thyroid disease
- People experiencing unexplained weight changes
- Those with fatigue that doesn't improve with rest

Early detection through regular [pathology testing](/pathology) helps manage thyroid conditions before they cause serious complications. [Book your thyroid profile](/contact-us#contact) today.`,
    tags: ["Thyroid", "Hypothyroidism", "Hyperthyroidism", "TSH", "Health Screening"],
  },
  {
    slug: "vitamin-d-testing-essential-urban-india",
    img: img(2), date: "March 28, 2026", dateSort: "2026-03-28",
    title: "Why Vitamin D Testing Is Essential in Urban India",
    desc: "Over 70% of urban Indians are Vitamin D deficient. Learn why testing matters, symptoms of deficiency, and how to maintain healthy levels.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Nutrition & Wellness",
    metaTitle: "Vitamin D Testing – Why It's Essential in India",
    metaDescription: "Over 70% of urban Indians lack Vitamin D. Learn deficiency symptoms, testing importance & how Aarvak Diagnostics Gurugram can help you check levels.",
    content: `Despite India's abundant sunshine, Vitamin D deficiency has become an epidemic in urban areas. Studies show over 70% of people in cities like Gurugram, Delhi, and Mumbai have insufficient Vitamin D levels.

## Why Are Urban Indians Deficient?

- Indoor lifestyles and air-conditioned offices
- Air pollution blocking UV rays
- Dark skin requiring more sun exposure
- Vegetarian diets low in natural Vitamin D sources
- Excessive use of sunscreen

## Symptoms of Vitamin D Deficiency

- Bone and joint pain
- Muscle weakness and cramps
- Chronic fatigue
- Frequent infections
- Mood changes and depression
- Hair loss

Many people dismiss these symptoms as "normal" tiredness, delaying diagnosis for months or years.

## Why Testing Matters

A simple blood test can measure your 25-hydroxyvitamin D level. Normal range is 30-100 ng/mL. Levels below 20 indicate deficiency, 20-29 indicate insufficiency.

Vitamin D testing is included in our ADC Advanced and [Supreme health packages](/health-checkups). You can also book it as a standalone test.

## How to Improve Your Levels

- Get 15-20 minutes of morning sunlight daily
- Include fortified foods, egg yolks, and fatty fish
- Consider supplements after consulting your doctor
- Retest every 3-6 months to track improvement

Don't guess — [get tested at Aarvak Diagnostics](/contact-us#contact). Early detection prevents bone loss, fractures, and immune weakness.`,
    tags: ["Vitamin D", "Deficiency", "Nutrition", "Bone Health", "Health Testing"],
  },
  {
    slug: "iron-deficiency-symptoms-diagnostic-tests",
    img: img(3), date: "March 29, 2026", dateSort: "2026-03-29",
    title: "Iron Deficiency: Symptoms, Causes, and Diagnostic Tests",
    desc: "Iron deficiency is India's most common nutritional disorder. Understand its symptoms, how it's diagnosed, and why early testing prevents complications.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Nutrition & Health",
    metaTitle: "Iron Deficiency – Symptoms, Tests & Prevention",
    metaDescription: "Iron deficiency affects 50% of Indian women. Learn symptoms, diagnostic tests & treatment. Get iron studies at Aarvak Diagnostics Gurugram.",
    content: `Iron deficiency anaemia affects nearly 50% of Indian women and a significant number of men and children. It develops gradually, often going unnoticed until it severely impacts daily life.

## Warning Signs of Iron Deficiency

- Persistent fatigue and weakness
- Pale skin, nails, and inner eyelids
- Shortness of breath during activity
- Dizziness and headaches
- Cold hands and feet
- Brittle nails
- Unusual cravings (ice, dirt)

## How Is Iron Deficiency Diagnosed?

An iron studies panel at Aarvak Diagnostics includes:
- **Serum Iron:** Amount of iron in your blood
- **Ferritin:** Iron stored in your body
- **TIBC:** Total iron-binding capacity
- **Transferrin Saturation:** How much iron is bound to transport proteins

Combined with a [CBC test](/insights/understanding-cbc-complete-blood-count-test), these tests give a complete picture of your iron status.

## Who Is at Risk?

- Women with heavy menstrual periods
- Pregnant and lactating women
- Children and adolescents
- Vegetarians and vegans
- People with chronic conditions

## Prevention and Treatment

- Include iron-rich foods: spinach, lentils, jaggery, red meat
- Pair iron with Vitamin C for better absorption
- Avoid tea/coffee with meals (inhibits absorption)
- Regular monitoring through [health checkups](/health-checkups)

Don't wait for symptoms to worsen. [Book your iron studies test](/contact-us#contact) at Aarvak Diagnostics today.`,
    tags: ["Iron Deficiency", "Anaemia", "Blood Test", "Nutrition", "Women's Health"],
  },
  {
    slug: "understanding-lipid-profile-results-cholesterol",
    img: img(4), date: "March 30, 2026", dateSort: "2026-03-30",
    title: "Understanding Your Lipid Profile: A Complete Guide",
    desc: "Learn how to read your lipid profile results including total cholesterol, LDL, HDL, and triglycerides for better heart health management.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Heart Health",
    metaTitle: "Lipid Profile Results – Cholesterol Guide",
    metaDescription: "Understand your lipid profile results — total cholesterol, LDL, HDL & triglycerides. Book lipid tests at Aarvak Diagnostics Gurugram for heart health.",
    content: `A lipid profile is one of the most important tests for assessing heart disease risk. Yet many people receive their results without truly understanding what the numbers mean.

## What Does a Lipid Profile Measure?

- **Total Cholesterol:** Overall cholesterol level (ideal: below 200 mg/dL)
- **LDL (Bad Cholesterol):** Builds up in artery walls (ideal: below 100 mg/dL)
- **HDL (Good Cholesterol):** Helps remove bad cholesterol (ideal: above 60 mg/dL)
- **Triglycerides:** Fat from food stored in blood (ideal: below 150 mg/dL)
- **VLDL:** Very low-density lipoprotein (ideal: below 30 mg/dL)

## Why Your Ratios Matter

More than individual numbers, doctors look at ratios:
- Total Cholesterol/HDL ratio (ideal: below 4.5)
- LDL/HDL ratio (ideal: below 2.5)

These ratios better predict cardiovascular risk than any single value.

## Who Should Get Tested?

- All adults over 20 (at least every 5 years)
- Annually if over 40 or with risk factors
- More frequently if managing high cholesterol
- People with family history of heart disease

## Improving Your Lipid Profile

- Reduce saturated fats and trans fats
- Increase fibre intake (oats, fruits, legumes)
- Exercise regularly (30 minutes daily)
- Quit smoking and limit alcohol
- Consider medication if lifestyle changes aren't enough

A lipid profile is included in all [ADC health packages](/health-checkups). [Book your test](/contact-us#contact) at Aarvak Diagnostics and take control of your heart health.`,
    tags: ["Lipid Profile", "Cholesterol", "Heart Health", "LDL", "HDL", "Preventive Health"],
  },
  {
    slug: "kidney-function-test-kft-guide",
    img: img(5), date: "March 31, 2026", dateSort: "2026-03-31",
    title: "Kidney Function Tests: What KFT Results Tell You",
    desc: "Understand kidney function tests (KFT), what creatinine, BUN, and uric acid levels mean, and why regular kidney screening is essential.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Organ Health",
    metaTitle: "KFT Guide – Kidney Function Test Explained",
    metaDescription: "Learn what kidney function tests reveal about your health. Understand creatinine, BUN & uric acid levels. Book KFT at Aarvak Diagnostics Gurugram.",
    content: `Your kidneys filter about 150 litres of blood daily, removing waste and excess fluid. Kidney disease often develops silently, making regular testing crucial for early detection.

## What Does a KFT Include?

- **Creatinine:** Waste product from muscle metabolism (elevated = reduced kidney function)
- **Blood Urea Nitrogen (BUN):** Measures urea in blood (high = kidney or dehydration issues)
- **Uric Acid:** Elevated levels indicate gout risk or kidney problems
- **Electrolytes:** Sodium, potassium, chloride balance
- **eGFR:** Estimated glomerular filtration rate (overall kidney efficiency)

## Warning Signs of Kidney Problems

- Swelling in feet, ankles, or face
- Changes in urination (frequency, colour, foamy urine)
- Persistent fatigue
- Nausea and loss of appetite
- High blood pressure that's hard to control

## Who Needs Regular KFT?

- People with diabetes or high blood pressure
- Those taking long-term medications (NSAIDs, antibiotics)
- Family history of kidney disease
- People over 40
- Anyone with urinary issues

## Protecting Your Kidneys

- Stay hydrated (8-10 glasses of water daily)
- Limit sodium intake
- Control blood sugar and blood pressure
- Avoid excessive painkillers
- Get regular [health checkups](/health-checkups) including KFT

KFT is included in all ADC panels at Aarvak Diagnostics. [Book your test](/contact-us#contact) for early detection and peace of mind.`,
    tags: ["KFT", "Kidney Health", "Creatinine", "Organ Health", "Preventive Testing"],
  },
  {
    slug: "liver-function-test-lft-complete-guide",
    img: img(6), date: "April 1, 2026", dateSort: "2026-04-01",
    title: "Liver Function Tests: A Complete LFT Guide",
    desc: "Learn what LFT measures, why liver testing is important, and how to interpret your liver function test results for better health.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Organ Health",
    metaTitle: "LFT Guide – Liver Function Test Explained",
    metaDescription: "Understand liver function tests — bilirubin, ALT, AST, ALP & albumin. Book LFT at Aarvak Diagnostics Gurugram for accurate liver health screening.",
    content: `Your liver performs over 500 functions including detoxification, bile production, and nutrient processing. Liver disease is often called a "silent killer" because symptoms appear only at advanced stages.

## What Does an LFT Measure?

- **Bilirubin:** Yellowish waste product (high = jaundice risk)
- **ALT & AST:** Liver enzymes (elevated = liver cell damage)
- **Alkaline Phosphatase (ALP):** Enzyme in liver and bones
- **Albumin:** Protein made by the liver (low = liver dysfunction)
- **Total Protein:** Measures albumin and globulin

## Why Regular LFT Matters

Conditions like fatty liver, hepatitis, and cirrhosis develop gradually without symptoms. By the time you notice fatigue, jaundice, or abdominal pain, significant damage may have occurred.

## Risk Factors for Liver Disease

- Regular alcohol consumption
- Obesity and high-fat diet
- Long-term medication use
- Diabetes and metabolic syndrome
- Hepatitis B or C infection

## Keeping Your Liver Healthy

- Limit alcohol consumption
- Maintain healthy weight
- Eat a balanced diet rich in vegetables
- Exercise regularly
- Get vaccinated for Hepatitis A and B
- Regular [diagnostic testing](/pathology) for early detection

LFT is part of all ADC health packages at [Aarvak Diagnostics](/health-checkups). [Book now](/contact-us#contact) and ensure your liver is functioning well.`,
    tags: ["LFT", "Liver Health", "Liver Function Test", "Organ Health", "Diagnostics"],
  },
  {
    slug: "diabetes-prevention-regular-testing-guide",
    img: img(7), date: "April 2, 2026", dateSort: "2026-04-02",
    title: "Diabetes Prevention: The Role of Regular Testing",
    desc: "India has 77 million diabetics. Learn how regular blood sugar and HbA1c testing helps prevent diabetes and catch pre-diabetes early.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Diabetes & Prevention",
    metaTitle: "Diabetes Prevention Through Regular Testing",
    metaDescription: "India's diabetes crisis is growing. Learn how regular blood sugar & HbA1c tests can help prevent diabetes. Book testing at Aarvak Diagnostics Gurugram.",
    content: `India is the world's diabetes capital with over 77 million diagnosed cases and millions more unaware of their condition. The key to fighting this epidemic lies in early detection through regular testing.

## Pre-Diabetes: The Golden Window

Pre-diabetes is a reversible condition where blood sugar is higher than normal but not yet diabetic. An estimated 136 million Indians are pre-diabetic — most don't know it.

Key pre-diabetes indicators:
- Fasting sugar: 100-125 mg/dL
- HbA1c: 5.7-6.4%
- Post-meal sugar: 140-199 mg/dL

At this stage, lifestyle changes alone can [prevent progression to diabetes](/insights/hba1c-test-blood-sugar-3-month-average).

## Essential Diabetes Tests

- **Fasting Blood Sugar:** Snapshot of current glucose level
- **HbA1c:** 3-month average blood sugar
- **Post-Prandial Sugar:** Blood sugar 2 hours after eating
- **Fasting Insulin:** Measures insulin resistance

## Who Should Get Tested?

- Adults over 35
- Family history of diabetes
- Overweight or obese individuals
- Sedentary lifestyle
- History of gestational diabetes
- PCOD/PCOS patients

## Prevention Through Lifestyle

- 30 minutes of daily exercise
- Reduce refined carbohydrates and sugar
- Maintain healthy weight
- Manage stress levels
- Get annual [health checkups](/health-checkups)

Diabetes screening starts at ₹599 with our [ADC Basic Panel](/health-checkups). [Book your test](/contact-us#contact) and take control of your metabolic health.`,
    tags: ["Diabetes", "Pre-Diabetes", "Blood Sugar", "HbA1c", "Prevention"],
  },
  {
    slug: "health-checkup-after-40-must-do-tests",
    img: img(8), date: "April 3, 2026", dateSort: "2026-04-03",
    title: "Health Checkup After 40: Tests You Must Not Skip",
    desc: "Turning 40? These essential diagnostic tests help detect age-related conditions early. A complete guide to health screening for adults over 40.",
    author: "Aarvak Diagnostics", readTime: "5 min", category: "Preventive Health",
    metaTitle: "Health Tests After 40 – Essential Screening Guide",
    metaDescription: "Essential health tests for people over 40: diabetes, thyroid, heart, kidney, liver & cancer markers. Book comprehensive checkup at Aarvak Diagnostics.",
    content: `After 40, your body's ability to repair and regenerate slows down. Many conditions that were dormant in your 20s and 30s begin surfacing. Regular health screening becomes not just important but essential.

## Must-Do Tests After 40

### Blood Sugar & HbA1c
Diabetes risk increases significantly after 40. Annual fasting sugar and HbA1c tests are non-negotiable.

### Complete Lipid Profile
Heart disease risk rises with age. Monitor your cholesterol, LDL, HDL, and triglycerides annually.

### Thyroid Profile
Thyroid disorders become more common, especially in women. TSH, T3, and T4 should be checked annually.

### Liver & Kidney Function
Years of medication, stress, and dietary habits take a toll. LFT and KFT reveal organ health status.

### Vitamin D & B12
Deficiencies are rampant in urban India and worsen with age. Both affect bone health, energy, and cognition.

### Cardiac Markers
CPK-MB and other cardiac markers help assess heart muscle health, especially if you have risk factors.

### Cancer Markers
PSA for men, CA-125 for women — early screening can be lifesaving.

## The Right Package for You

Our [ADC Supreme Panel](/health-checkups) at ₹2,999 covers all essential tests for people over 40, including vitamins, cancer markers, cardiac markers, and comprehensive organ function panels.

Don't wait for symptoms. [Book your checkup](/contact-us#contact) at Aarvak Diagnostics or schedule [home collection](/insights/home-sample-collection-benefits-safety-how-it-works).`,
    tags: ["Health Checkup", "Over 40", "Preventive Health", "Age-Related Testing", "Screening"],
  },
  {
    slug: "understanding-urine-analysis-test-results",
    img: img(9), date: "April 4, 2026", dateSort: "2026-04-04",
    title: "Understanding Urine Analysis: What Your Results Reveal",
    desc: "A urine test is simple yet powerful. Learn what urine analysis detects, from infections to kidney disease, and why it's part of every health checkup.",
    author: "Aarvak Diagnostics", readTime: "3 min", category: "Diagnostics",
    metaTitle: "Urine Test Guide – What Results Reveal",
    metaDescription: "Learn what urine analysis reveals about kidney, liver & metabolic health. Understand urine test results with Aarvak Diagnostics Gurugram.",
    content: `A routine urine analysis is one of the simplest yet most informative diagnostic tests available. It can reveal conditions affecting your kidneys, urinary tract, liver, and metabolism.

## What Does Urine Analysis Check?

- **Colour & Appearance:** Dark or cloudy urine may indicate dehydration or infection
- **pH Level:** Acidity balance (normal: 4.6-8.0)
- **Protein:** Presence may indicate kidney disease
- **Glucose:** Sugar in urine suggests uncontrolled diabetes
- **Blood:** Hidden blood may indicate infections, stones, or tumours
- **WBCs & Bacteria:** Indicate urinary tract infection

## Conditions Detected Through Urine Tests

- Urinary tract infections (UTIs)
- Kidney disease and kidney stones
- Uncontrolled diabetes
- Liver dysfunction
- Dehydration
- Metabolic disorders

## When to Get a Urine Test

- As part of your annual [health checkup](/health-checkups)
- If you have burning urination or frequent urination
- For diabetes monitoring
- During pregnancy
- Before surgery

Urine analysis is included in all [ADC health packages](/health-checkups) at Aarvak Diagnostics. [Book your test](/contact-us#contact) for a quick, non-invasive health assessment.`,
    tags: ["Urine Test", "Urine Analysis", "UTI", "Kidney Health", "Diagnostics"],
  },
  {
    slug: "regular-blood-tests-working-professionals",
    img: img(10), date: "April 5, 2026", dateSort: "2026-04-05",
    title: "Why Working Professionals Need Regular Blood Tests",
    desc: "Desk jobs, stress, and fast food take a hidden toll. Learn why regular blood tests are crucial for corporate professionals to stay healthy.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Corporate Wellness",
    metaTitle: "Blood Tests for Working Professionals – Guide",
    metaDescription: "Desk jobs & stress affect health silently. Learn why working professionals in Gurugram need regular blood tests. Book at Aarvak Diagnostics.",
    content: `The modern corporate lifestyle in cities like Gurugram comes with hidden health costs. Long hours at desks, irregular meals, chronic stress, and poor sleep create the perfect storm for lifestyle diseases.

## The Silent Impact of Desk Jobs

- Sedentary behaviour raises diabetes and heart disease risk
- Screen time causes eye strain and disrupted sleep
- Stress elevates cortisol, affecting immunity and metabolism
- Irregular meals lead to nutritional deficiencies
- Air-conditioned offices reduce Vitamin D exposure

## Essential Tests for Professionals

- **CBC:** Detect anaemia and infections
- **Blood Sugar & HbA1c:** Screen for diabetes
- **Lipid Profile:** Assess heart health
- **Thyroid Profile:** Check metabolism
- **Vitamin D & B12:** Common deficiencies in office workers
- **Liver & Kidney Function:** Organ health check

## Why Regular Testing Matters

Many professionals in their 30s and 40s are pre-diabetic or have elevated cholesterol without knowing it. Regular testing catches these conditions at the "fixable" stage.

## Make It Easy with Home Collection

No time to visit a lab? Our [home sample collection](/insights/home-sample-collection-benefits-safety-how-it-works) service covers all of Gurugram. Schedule an early morning slot before work.

Your employer may also offer [corporate wellness programs](/corporate) through Aarvak Diagnostics. [Book your test](/contact-us#contact) today.`,
    tags: ["Corporate Health", "Working Professionals", "Blood Tests", "Lifestyle Disease", "Wellness"],
  },
  {
    slug: "monsoon-health-risks-diagnostic-tests",
    img: img(0), date: "April 6, 2026", dateSort: "2026-04-06",
    title: "Monsoon Health Risks: Essential Diagnostic Tests",
    desc: "Monsoon brings waterborne and vector-borne diseases. Know which tests to get during rainy season to stay safe and healthy.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Seasonal Health",
    metaTitle: "Monsoon Health Tests – Stay Safe This Season",
    metaDescription: "Protect your health during monsoon. Learn about essential tests for dengue, malaria, typhoid & waterborne diseases at Aarvak Diagnostics Gurugram.",
    content: `The monsoon season in India brings relief from the heat but also a surge in waterborne and vector-borne diseases. Contaminated water, mosquito breeding, and humid conditions create health risks that require awareness and timely testing.

## Common Monsoon Diseases

- **Dengue:** Transmitted by Aedes mosquitoes. Symptoms: high fever, headache, joint pain
- **Malaria:** Transmitted by Anopheles mosquitoes. Symptoms: chills, sweating, fever cycles
- **Typhoid:** Caused by contaminated food/water. Symptoms: sustained fever, stomach pain
- **Leptospirosis:** From contaminated water exposure. Symptoms: muscle pain, fever, jaundice
- **Gastroenteritis:** Waterborne infections causing diarrhoea and vomiting

## Essential Monsoon Tests

- **Dengue NS1 Antigen & Antibodies:** Early detection of dengue
- **Malaria Antigen Test:** Quick malaria screening
- **Widal Test:** Typhoid detection
- **CBC:** Monitors platelet count (critical in dengue)
- **Liver Function Test:** Hepatitis screening
- **Stool Examination:** Detects intestinal infections

## Prevention Tips

- Use mosquito repellents and nets
- Drink only purified water
- Eat freshly cooked food
- Wash hands frequently
- Don't ignore fever lasting more than 2 days

If you develop fever, body aches, or stomach issues during monsoon, get tested immediately at [Aarvak Diagnostics](/pathology) or [book home collection](/contact-us#contact).`,
    tags: ["Monsoon Health", "Dengue", "Malaria", "Typhoid", "Seasonal Testing"],
  },
  {
    slug: "summer-health-tips-preventive-testing",
    img: img(1), date: "April 7, 2026", dateSort: "2026-04-07",
    title: "Summer Health Tips and Preventive Testing Guide",
    desc: "Beat the summer heat with preventive health tips and essential diagnostic tests to stay hydrated, healthy, and energised throughout the season.",
    author: "Aarvak Diagnostics", readTime: "3 min", category: "Seasonal Health",
    metaTitle: "Summer Health Tips & Preventive Testing",
    metaDescription: "Stay healthy this summer with preventive testing tips. Learn about dehydration, heat stroke prevention & essential tests at Aarvak Diagnostics.",
    content: `Gurugram summers with temperatures exceeding 45°C put enormous stress on your body. Dehydration, heat exhaustion, and UV exposure can trigger health issues that are easily preventable with awareness and testing.

## Summer Health Risks

- Dehydration and electrolyte imbalance
- Heat stroke and heat exhaustion
- Food poisoning from bacterial growth
- Skin damage from UV exposure
- Aggravated kidney and urinary issues

## Recommended Summer Tests

- **Electrolyte Panel:** Check sodium, potassium balance
- **Kidney Function Test:** Dehydration affects kidneys first
- **Urine Analysis:** Detect UTIs (common in summer)
- **CBC:** Screen for infections
- **Vitamin D:** Ironically, despite more sun, deficiency persists

## Summer Health Tips

- Drink at least 3-4 litres of water daily
- Eat seasonal fruits (watermelon, cucumber, mango)
- Avoid heavy meals during peak heat
- Wear light, breathable clothing
- Use sunscreen and limit sun exposure between 11 AM - 4 PM

## Stay Ahead with Preventive Checkups

A preventive [health checkup](/health-checkups) before summer can identify risk factors and help you prepare. [Book your test](/contact-us#contact) at Aarvak Diagnostics with [convenient home collection](/insights/home-sample-collection-benefits-safety-how-it-works).`,
    tags: ["Summer Health", "Dehydration", "Heat Stroke", "Preventive Testing", "Seasonal Wellness"],
  },
  {
    slug: "essential-diagnostic-tests-women-health",
    img: img(2), date: "April 8, 2026", dateSort: "2026-04-08",
    title: "Essential Diagnostic Tests Every Woman Needs",
    desc: "Women's health requires specific screening. Learn about essential tests for thyroid, iron, hormones, and reproductive health every woman should get.",
    author: "Aarvak Diagnostics", readTime: "5 min", category: "Women's Health",
    metaTitle: "Women's Health Tests – Essential Screening Guide",
    metaDescription: "Essential diagnostic tests for women: thyroid, iron, hormones, Vitamin D & more. Book women's health screening at Aarvak Diagnostics Gurugram.",
    content: `Women's bodies go through unique physiological changes throughout life — from puberty to pregnancy to menopause. Each phase requires different health monitoring, making regular diagnostic testing essential.

## Essential Tests for Women Under 30

- **CBC:** Screen for anaemia (common in menstruating women)
- **Thyroid Profile:** Thyroid disorders are 5-8x more common in women
- **Iron Studies:** Detect iron deficiency early
- **Vitamin D & B12:** Essential for bone health and energy
- **Blood Sugar:** Baseline screening for diabetes

## Additional Tests After 30

- **Lipid Profile:** Heart disease is the leading cause of death in women
- **HbA1c:** Long-term blood sugar monitoring
- **Calcium & Phosphorus:** Bone health assessment
- **Hormonal Panel:** FSH, LH, estrogen levels

## Tests During Pregnancy

- **Complete Blood Panel:** Including blood group and Rh factor
- **Glucose Tolerance Test:** Gestational diabetes screening
- **Thyroid Profile:** Critical for fetal development
- **Iron & Folate Levels:** Essential for baby's growth

## Perimenopause and Beyond (40+)

- **Bone Density Markers:** Osteoporosis risk
- **Cancer Markers (CA-125):** Ovarian cancer screening
- **Cardiac Risk Assessment:** Post-menopausal heart disease risk

At Aarvak Diagnostics, our [health checkup packages](/health-checkups) are designed with women's health needs in mind. [Book your screening](/contact-us#contact) today.`,
    tags: ["Women's Health", "Thyroid", "Iron Deficiency", "Hormones", "Preventive Health"],
  },
  {
    slug: "key-health-tests-men-over-30",
    img: img(3), date: "April 9, 2026", dateSort: "2026-04-09",
    title: "Key Health Tests Every Man Over 30 Should Get",
    desc: "Men often neglect health screenings. Learn which diagnostic tests are essential for men over 30 to prevent heart disease, diabetes, and more.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Men's Health",
    metaTitle: "Health Tests for Men Over 30 – Must-Do Guide",
    metaDescription: "Essential health tests for men over 30: heart, diabetes, liver, kidney & hormone checks. Book men's health screening at Aarvak Diagnostics Gurugram.",
    content: `Men are statistically less likely to visit a doctor or get regular health checkups than women. This cultural tendency means many conditions go undetected until they become serious. After 30, proactive screening becomes critical.

## Priority Tests for Men Over 30

### Metabolic Health
- **Fasting Blood Sugar & HbA1c:** Diabetes screening
- **Lipid Profile:** Cholesterol and heart disease risk
- **Liver Function Test:** Especially if consuming alcohol

### Organ Function
- **Kidney Function Test:** Monitor creatinine and uric acid
- **Uric Acid:** Gout and kidney stone risk
- **Electrolytes:** Especially for active individuals

### Nutritional Status
- **Vitamin D & B12:** Common deficiencies in desk-bound professionals
- **Iron Studies:** Less common in men but still important
- **Thyroid Profile:** Underdiagnosed in men

### After 40
- **PSA (Prostate Specific Antigen):** Prostate health screening
- **Cardiac Markers:** Heart health assessment
- **ECG:** Baseline heart rhythm check

## Why Men Avoid Checkups

- "I feel fine" mentality
- Busy schedules
- Fear of finding something wrong

The reality is that most serious conditions — diabetes, heart disease, kidney disease — are silent in early stages. Only testing reveals them.

Get comprehensive [health screening](/health-checkups) at Aarvak Diagnostics. [Book now](/contact-us#contact) or schedule [home collection](/insights/home-sample-collection-benefits-safety-how-it-works).`,
    tags: ["Men's Health", "Health Screening", "Heart Disease", "Diabetes", "Preventive Health"],
  },
  {
    slug: "cholesterol-testing-management-lifestyle",
    img: img(4), date: "April 10, 2026", dateSort: "2026-04-10",
    title: "Cholesterol Management: Testing and Lifestyle Changes",
    desc: "High cholesterol has no symptoms but causes heart disease. Learn about cholesterol testing, reading results, and proven lifestyle changes.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Heart Health",
    metaTitle: "Cholesterol Testing & Management Guide",
    metaDescription: "High cholesterol is a silent killer. Learn about lipid profile testing, results interpretation & lifestyle changes at Aarvak Diagnostics Gurugram.",
    content: `Cholesterol is essential for building cells, but excess cholesterol silently builds up in arteries, increasing heart attack and stroke risk. India has one of the highest rates of heart disease globally, making cholesterol management a public health priority.

## Understanding Cholesterol Numbers

- **Total Cholesterol:** Below 200 mg/dL (desirable)
- **LDL (Bad):** Below 100 mg/dL (optimal)
- **HDL (Good):** Above 60 mg/dL (protective)
- **Triglycerides:** Below 150 mg/dL (normal)

## Lifestyle Changes That Work

### Diet Modifications
- Replace saturated fats with olive oil and nuts
- Eat more soluble fibre (oats, beans, fruits)
- Include omega-3 rich foods (fish, flaxseeds)
- Limit processed and fried foods

### Physical Activity
- 30 minutes of moderate exercise daily
- Walking, cycling, swimming are excellent options
- Even standing desks help reduce sedentary time

### Other Factors
- Quit smoking (raises HDL within weeks)
- Manage stress through meditation or yoga
- Maintain healthy weight
- Limit alcohol consumption

## When to Test

Get a [lipid profile](/insights/understanding-lipid-profile-results-cholesterol) every year after 20, more frequently if you have risk factors. All ADC [health packages](/health-checkups) include lipid testing. [Book yours](/contact-us#contact) today.`,
    tags: ["Cholesterol", "Lipid Profile", "Heart Health", "Lifestyle Changes", "Preventive Health"],
  },
  {
    slug: "anaemia-india-causes-diagnosis-prevention",
    img: img(5), date: "April 11, 2026", dateSort: "2026-04-11",
    title: "Anaemia in India: Causes, Diagnosis, and Prevention",
    desc: "Anaemia affects over 50% of Indian women. Understand its types, symptoms, diagnostic tests, and effective prevention strategies.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Haematology",
    metaTitle: "Anaemia in India – Causes, Tests & Prevention",
    metaDescription: "Anaemia affects millions of Indians. Learn about types, symptoms, CBC & iron tests, and prevention at Aarvak Diagnostics Gurugram. Book now.",
    content: `Anaemia is India's most prevalent nutritional disorder. According to NFHS-5, over 57% of women and 25% of men in India are anaemic. Yet it remains significantly under-diagnosed and under-treated.

## Types of Anaemia

- **Iron Deficiency Anaemia:** Most common, caused by inadequate iron intake or absorption
- **Vitamin B12 Deficiency:** Common in vegetarians
- **Folate Deficiency:** Important during pregnancy
- **Thalassemia:** Genetic condition common in India
- **Chronic Disease Anaemia:** Associated with kidney disease, cancer

## Symptoms to Watch

- Persistent fatigue and weakness
- Pale or yellowish skin
- Shortness of breath
- Dizziness and headaches
- Cold hands and feet
- Irregular heartbeat
- Brittle nails

## Diagnostic Tests for Anaemia

- **CBC with Peripheral Smear:** Identifies type and severity
- **Iron Studies:** Serum iron, ferritin, TIBC
- **Vitamin B12 & Folate Levels:** Rule out deficiency
- **Reticulocyte Count:** Measures bone marrow response

## Prevention Strategies

- Iron-rich diet: green leafy vegetables, jaggery, red meat
- Vitamin C with meals for better iron absorption
- Regular deworming for children
- Avoid tea/coffee during meals
- Regular [health screening](/health-checkups)

Don't ignore fatigue. [Get tested at Aarvak Diagnostics](/contact-us#contact) and understand your blood health through a comprehensive [pathology assessment](/pathology).`,
    tags: ["Anaemia", "Iron Deficiency", "CBC", "Blood Health", "Women's Health"],
  },
  {
    slug: "thyroid-profile-t3-t4-tsh-explained",
    img: img(6), date: "April 12, 2026", dateSort: "2026-04-12",
    title: "Thyroid Profile: T3, T4, and TSH Explained Simply",
    desc: "Confused by your thyroid test results? Learn what T3, T4, and TSH mean, normal ranges, and when values indicate thyroid problems.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Endocrinology",
    metaTitle: "T3, T4, TSH Explained – Thyroid Profile Guide",
    metaDescription: "Understand T3, T4, TSH thyroid test results. Learn normal ranges & what abnormal values mean at Aarvak Diagnostics Gurugram. Book thyroid tests.",
    content: `Thyroid tests are among the most commonly prescribed blood tests, yet many patients struggle to understand their results. Let's break down what T3, T4, and TSH actually mean.

## The Thyroid Hormones

### TSH (Thyroid Stimulating Hormone)
- Produced by the pituitary gland
- Normal range: 0.4–4.0 mIU/L
- **High TSH** = Underactive thyroid (hypothyroidism)
- **Low TSH** = Overactive thyroid (hyperthyroidism)

### T4 (Thyroxine)
- Main hormone produced by the thyroid
- Normal Free T4: 0.8–1.8 ng/dL
- Low T4 with high TSH confirms hypothyroidism

### T3 (Triiodothyronine)
- The active form of thyroid hormone
- Normal: 80–200 ng/dL
- Usually tested when hyperthyroidism is suspected

## Common Thyroid Conditions

- **Hypothyroidism:** Fatigue, weight gain, cold intolerance, depression
- **Hyperthyroidism:** Weight loss, anxiety, rapid heartbeat, sweating
- **Hashimoto's Disease:** Autoimmune hypothyroidism
- **Graves' Disease:** Autoimmune hyperthyroidism

## Who Should Get Tested?

- Women (especially over 30)
- People with family history of thyroid disease
- Anyone with unexplained weight changes or fatigue
- Pregnant women (thyroid affects fetal development)

Thyroid testing is included in our [ADC Essential Panel](/health-checkups) onwards. [Book your thyroid test](/contact-us#contact) at Aarvak Diagnostics today.`,
    tags: ["Thyroid", "TSH", "T3", "T4", "Endocrinology", "Hormones"],
  },
  {
    slug: "pre-diabetes-testing-reversal-guide",
    img: img(7), date: "April 13, 2026", dateSort: "2026-04-13",
    title: "Pre-Diabetes: How Testing Can Help You Reverse It",
    desc: "136 million Indians are pre-diabetic. Learn how early testing, lifestyle changes, and regular monitoring can reverse pre-diabetes naturally.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Diabetes & Prevention",
    metaTitle: "Pre-Diabetes Reversal – Testing & Lifestyle Guide",
    metaDescription: "136 million Indians are pre-diabetic. Learn how HbA1c testing & lifestyle changes can reverse pre-diabetes at Aarvak Diagnostics Gurugram.",
    content: `Pre-diabetes is a wake-up call, not a life sentence. Research shows that with proper intervention, up to 58% of pre-diabetics can prevent progression to Type 2 diabetes. The key is early detection through testing.

## What Is Pre-Diabetes?

Pre-diabetes means your blood sugar is higher than normal but not yet in the diabetic range:
- **Fasting Sugar:** 100-125 mg/dL
- **HbA1c:** 5.7-6.4%
- **Oral Glucose Tolerance:** 140-199 mg/dL (2-hour)

## Why Most People Miss It

Pre-diabetes has virtually no symptoms. You won't feel different. The only way to know is through blood testing, which is why regular [health checkups](/health-checkups) are critical.

## The Reversal Plan

### Dietary Changes
- Reduce refined carbohydrates and sugar
- Increase fibre intake (vegetables, whole grains)
- Control portion sizes
- Choose complex carbs over simple ones

### Physical Activity
- 150 minutes of moderate exercise weekly
- Walking after meals reduces sugar spikes
- Strength training improves insulin sensitivity

### Monitoring
- Check fasting sugar every 3 months
- Track [HbA1c every 6 months](/insights/hba1c-test-blood-sugar-3-month-average)
- Monitor weight and waist circumference

## Testing at Aarvak Diagnostics

Our [ADC health packages](/health-checkups) include fasting sugar and HbA1c testing. [Book your screening](/contact-us#contact) and catch pre-diabetes while it's still reversible.`,
    tags: ["Pre-Diabetes", "HbA1c", "Blood Sugar", "Diabetes Prevention", "Lifestyle"],
  },
  {
    slug: "cardiac-markers-heart-health-tests",
    img: img(8), date: "April 14, 2026", dateSort: "2026-04-14",
    title: "Cardiac Markers: What Heart Tests Reveal About You",
    desc: "Heart disease is India's top killer. Learn about cardiac marker tests, ECG, and how regular heart health screening saves lives.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Cardiology",
    metaTitle: "Cardiac Markers & Heart Tests Explained",
    metaDescription: "Understand cardiac marker tests for heart health. Learn about CPK-MB, troponin & ECG screening at Aarvak Diagnostics Gurugram. Book now.",
    content: `Heart disease claims more lives in India than any other condition. Yet many cardiac events could be prevented with regular screening and early detection.

## Key Cardiac Markers

- **CPK-MB:** Enzyme released when heart muscle is damaged
- **Troponin:** Most specific marker for heart muscle injury
- **BNP/NT-proBNP:** Indicates heart failure risk
- **CRP (hs-CRP):** Measures inflammation linked to heart disease
- **Homocysteine:** Elevated levels increase cardiovascular risk

## Essential Heart Tests

- **Lipid Profile:** Cholesterol, LDL, HDL, triglycerides
- **ECG:** Records heart's electrical activity
- **Blood Sugar & HbA1c:** Diabetes significantly increases heart risk
- **Blood Pressure:** Silent contributor to heart disease

## Risk Factors You Can Control

- High cholesterol and triglycerides
- Smoking and tobacco use
- Sedentary lifestyle
- Unmanaged diabetes
- Obesity and high sodium diet
- Chronic stress

## Heart Health at Every Age

- **20s-30s:** Baseline lipid profile, blood pressure
- **30s-40s:** Annual lipid + sugar + ECG
- **40s+:** Comprehensive cardiac screening including markers

Our [Heart Health Check Package](/health-checkups) covers all essential cardiac tests. [Book at Aarvak Diagnostics](/contact-us#contact) and protect your heart.`,
    tags: ["Heart Health", "Cardiac Markers", "ECG", "Cholesterol", "Cardiology"],
  },
  {
    slug: "allergy-testing-when-why-needed",
    img: img(9), date: "April 15, 2026", dateSort: "2026-04-15",
    title: "Allergy Testing: When and Why You Need It",
    desc: "Sneezing, rashes, breathing issues? Learn about allergy testing methods, IgE tests, and how diagnostic testing identifies your triggers.",
    author: "Aarvak Diagnostics", readTime: "3 min", category: "Immunology",
    metaTitle: "Allergy Testing Guide – When & Why to Test",
    metaDescription: "Suffering from allergies? Learn about IgE testing, allergy panels & trigger identification at Aarvak Diagnostics Gurugram. Book allergy tests.",
    content: `Allergies affect millions of Indians, yet most people rely on trial-and-error to identify triggers. Diagnostic allergy testing provides definitive answers about what's causing your symptoms.

## Common Allergy Symptoms

- Persistent sneezing and runny nose
- Skin rashes, hives, or eczema
- Itchy, watery eyes
- Breathing difficulties or asthma
- Digestive issues after certain foods
- Swelling of face or throat

## Types of Allergy Tests

### Total IgE
Measures overall allergic response. High IgE suggests allergic tendency.

### Specific IgE Panel
Tests for specific allergens:
- **Food Allergens:** Milk, eggs, nuts, wheat, seafood
- **Inhalant Allergens:** Dust mites, pollen, mould, pet dander
- **Contact Allergens:** Latex, metals, chemicals

## When to Get Tested

- Recurring unexplained symptoms
- Family history of allergies
- Asthma or respiratory issues
- Skin reactions to unknown causes
- Suspected food allergies

## Managing Allergies

- Identify and avoid triggers
- Keep indoor environment clean
- Use air purifiers during high pollen seasons
- Consult an allergist for immunotherapy

IgE testing is included in our [Pollution Health Package](/health-checkups). For comprehensive allergy screening, [book at Aarvak Diagnostics](/contact-us#contact).`,
    tags: ["Allergy", "IgE", "Immunology", "Skin Allergy", "Food Allergy"],
  },
  {
    slug: "crp-test-inflammation-markers-explained",
    img: img(10), date: "April 16, 2026", dateSort: "2026-04-16",
    title: "CRP Test: Understanding Inflammation Markers",
    desc: "C-reactive protein (CRP) is a key inflammation marker. Learn what CRP tests reveal about infections, autoimmune conditions, and heart disease risk.",
    author: "Aarvak Diagnostics", readTime: "3 min", category: "Diagnostics",
    metaTitle: "CRP Test – Inflammation Marker Explained",
    metaDescription: "Understand what CRP test measures and what high CRP means. Learn about inflammation, heart risk & autoimmune markers at Aarvak Diagnostics Gurugram.",
    content: `C-Reactive Protein (CRP) is one of the most valuable yet often overlooked diagnostic markers. Produced by the liver in response to inflammation, CRP levels help doctors assess infections, autoimmune conditions, and cardiovascular risk.

## What Does CRP Measure?

CRP rises rapidly when there's inflammation anywhere in your body. It's a non-specific marker — it tells your doctor inflammation exists but not exactly where.

## Normal vs Elevated CRP

- **Below 1 mg/L:** Low cardiovascular risk
- **1-3 mg/L:** Moderate risk
- **Above 3 mg/L:** High risk or active inflammation
- **Above 10 mg/L:** Likely acute infection or inflammation

## When Doctors Order CRP Tests

- Suspected infections (bacterial vs viral)
- Autoimmune disease monitoring (RA, lupus)
- Heart disease risk assessment (hs-CRP)
- Post-surgical recovery monitoring
- Chronic inflammatory conditions

## RA Factor and CRP Together

CRP combined with RA Factor (Rheumatoid Factor) helps diagnose rheumatoid arthritis. Both are included in our [ADC Essential Plus](/health-checkups) and higher packages.

## Reducing Inflammation Naturally

- Anti-inflammatory diet (turmeric, omega-3, vegetables)
- Regular exercise
- Adequate sleep
- Stress management
- Quit smoking

CRP testing is available at [Aarvak Diagnostics](/pathology). [Book your test](/contact-us#contact) for comprehensive inflammation assessment.`,
    tags: ["CRP", "Inflammation", "RA Factor", "Heart Risk", "Autoimmune"],
  },
  {
    slug: "bone-health-dexa-scan-when-to-test",
    img: img(0), date: "April 17, 2026", dateSort: "2026-04-17",
    title: "Bone Health and DEXA Scan: When Should You Test?",
    desc: "Osteoporosis affects millions silently. Learn about bone density testing, calcium markers, and when to get a DEXA scan for bone health.",
    author: "Aarvak Diagnostics", readTime: "3 min", category: "Musculoskeletal Health",
    metaTitle: "Bone Health & DEXA Scan – When to Test",
    metaDescription: "Understand bone health testing, calcium, Vitamin D & DEXA scan. Learn when to test for osteoporosis at Aarvak Diagnostics Gurugram. Book now.",
    content: `Bone loss happens silently over years. By the time a fracture occurs, significant bone density has already been lost. Testing is the only way to catch osteoporosis early.

## Key Bone Health Tests

- **Calcium & Phosphorus:** Essential mineral levels for bone strength
- **Vitamin D:** Critical for calcium absorption (deficient in 70%+ Indians)
- **Alkaline Phosphatase (ALP):** Bone formation marker
- **Parathyroid Hormone (PTH):** Regulates calcium metabolism

## Who Should Get Bone Screening?

- Women over 40 (especially post-menopausal)
- Men over 50
- People with Vitamin D deficiency
- Those on long-term steroid medication
- Family history of osteoporosis
- Smokers and heavy alcohol users

## Protecting Your Bones

- Get adequate Vitamin D (sunlight + supplements)
- Calcium-rich diet (dairy, ragi, sesame seeds)
- Weight-bearing exercise (walking, jogging, strength training)
- Avoid excessive caffeine and sodium
- Regular bone health screening

## Testing at Aarvak Diagnostics

Calcium, Vitamin D, and phosphorus tests are available in our [health packages](/health-checkups). For [radiology services](/radiology) including bone imaging, visit our Gurugram centre. [Book now](/contact-us#contact).`,
    tags: ["Bone Health", "Osteoporosis", "Calcium", "Vitamin D", "DEXA Scan"],
  },
  {
    slug: "essential-tests-during-pregnancy",
    img: img(1), date: "April 18, 2026", dateSort: "2026-04-18",
    title: "Essential Diagnostic Tests During Pregnancy",
    desc: "Pregnancy requires specific health monitoring. Learn about blood tests, glucose screening, thyroid checks, and other vital tests for expecting mothers.",
    author: "Aarvak Diagnostics", readTime: "5 min", category: "Maternal Health",
    metaTitle: "Pregnancy Tests – Essential Diagnostic Guide",
    metaDescription: "Essential diagnostic tests during pregnancy: blood group, glucose, thyroid, iron & more. Book pregnancy testing at Aarvak Diagnostics Gurugram.",
    content: `Pregnancy is a time of significant physiological changes. Regular diagnostic testing ensures both mother and baby stay healthy throughout the journey.

## First Trimester Tests (Weeks 1-12)

- **Blood Group & Rh Factor:** Critical for Rh incompatibility
- **CBC:** Baseline blood health and anaemia screening
- **Blood Sugar:** Baseline glucose levels
- **Thyroid Profile:** TSH critical for fetal brain development
- **HIV, Hepatitis B & C, VDRL:** Infectious disease screening
- **Urine Analysis:** Kidney function and UTI screening

## Second Trimester Tests (Weeks 13-26)

- **Glucose Tolerance Test (GTT):** Gestational diabetes screening (24-28 weeks)
- **Iron Studies:** Anaemia prevention
- **Thyroid Recheck:** Medication adjustment if needed
- **Urine Culture:** UTI detection

## Third Trimester Tests (Weeks 27-40)

- **CBC:** Monitor haemoglobin before delivery
- **Blood Sugar:** Continue diabetes monitoring
- **Group B Streptococcus:** Infection screening (35-37 weeks)
- **Liver & Kidney Function:** Pre-eclampsia screening

## Tips for Healthy Pregnancy Testing

- Keep a testing schedule with your doctor
- Don't skip prescribed tests
- Fast properly when required for accurate results
- [Home sample collection](/insights/home-sample-collection-benefits-safety-how-it-works) is especially convenient during pregnancy

Aarvak Diagnostics provides all pregnancy-related [pathology tests](/pathology) with gentle, experienced phlebotomists. [Book your appointment](/contact-us#contact).`,
    tags: ["Pregnancy", "Prenatal Tests", "Maternal Health", "Gestational Diabetes", "Women's Health"],
  },
  {
    slug: "senior-health-tests-over-60",
    img: img(2), date: "April 19, 2026", dateSort: "2026-04-19",
    title: "Senior Health: Essential Tests for People Over 60",
    desc: "After 60, regular health monitoring becomes critical. Learn which diagnostic tests seniors need for heart, kidney, liver, diabetes, and bone health.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Senior Health",
    metaTitle: "Health Tests for Seniors Over 60 – Guide",
    metaDescription: "Essential health tests for people over 60: heart, diabetes, kidney, bone & cancer markers. Book senior health checkup at Aarvak Diagnostics Gurugram.",
    content: `After 60, the body's repair mechanisms slow down and chronic conditions become more prevalent. Regular comprehensive testing isn't optional — it's essential for maintaining quality of life.

## Priority Tests for Seniors

### Every 6 Months
- **Fasting Sugar & HbA1c:** Diabetes monitoring
- **Blood Pressure:** Cardiovascular health
- **CBC:** Anaemia and infection screening

### Annually
- **Complete Lipid Profile:** Heart disease prevention
- **Liver & Kidney Function:** Organ health monitoring
- **Thyroid Profile:** Metabolism assessment
- **Vitamin D, B12, Calcium:** Nutritional status
- **Electrolytes:** Sodium, potassium balance
- **Uric Acid:** Gout and kidney health
- **ECG:** Heart rhythm assessment

### Cancer Screening
- **PSA (Men):** Prostate health
- **CA-125 (Women):** Ovarian marker
- **CEA:** General cancer marker

## Special Considerations for Seniors

- Medication monitoring (many drugs affect liver/kidney)
- Fall risk assessment (bone health testing)
- Cognitive health monitoring
- Vision and hearing checks

## Home Collection for Seniors

Visiting a lab can be difficult for seniors. Our [home collection service](/insights/home-sample-collection-benefits-safety-how-it-works) is designed with elderly patients in mind — gentle phlebotomists, comfortable home environment, no travel stress.

Our [ADC Supreme Panel](/health-checkups) covers all essential senior tests. [Book now](/contact-us#contact) at Aarvak Diagnostics.`,
    tags: ["Senior Health", "Over 60", "Health Screening", "Preventive Care", "Elderly"],
  },
  {
    slug: "arthritis-diagnosis-ra-factor-tests",
    img: img(3), date: "April 20, 2026", dateSort: "2026-04-20",
    title: "Arthritis Diagnosis: RA Factor and Other Tests",
    desc: "Joint pain could be arthritis. Learn about RA Factor, CRP, anti-CCP, and other diagnostic tests for early arthritis detection and management.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Rheumatology",
    metaTitle: "Arthritis Tests – RA Factor & Diagnosis Guide",
    metaDescription: "Joint pain? Learn about RA Factor, CRP & anti-CCP tests for arthritis diagnosis. Book rheumatology tests at Aarvak Diagnostics Gurugram.",
    content: `Arthritis is not just an "old age" disease. Rheumatoid arthritis can affect people in their 30s and 40s. Early diagnosis through blood tests significantly improves outcomes.

## Types of Arthritis

- **Rheumatoid Arthritis (RA):** Autoimmune, affects joints symmetrically
- **Osteoarthritis:** Wear and tear of joint cartilage
- **Gout:** Caused by elevated uric acid crystals
- **Psoriatic Arthritis:** Associated with psoriasis

## Key Diagnostic Tests

- **RA Factor (Rheumatoid Factor):** Positive in 70-80% of RA patients
- **Anti-CCP Antibodies:** More specific for RA than RA Factor
- **CRP (C-Reactive Protein):** Measures inflammation levels
- **ESR (Erythrocyte Sedimentation Rate):** General inflammation marker
- **Uric Acid:** Elevated in gout
- **ANA (Antinuclear Antibodies):** Autoimmune screening

## When to Get Tested

- Persistent joint pain lasting more than 6 weeks
- Morning stiffness lasting over 30 minutes
- Joint swelling, warmth, or redness
- Symmetrical joint involvement
- Family history of autoimmune diseases

## Early Treatment Benefits

Early diagnosis allows:
- Slower disease progression
- Better joint preservation
- More treatment options
- Improved quality of life

RA Factor and CRP are included in our [ADC Essential Plus](/health-checkups) and above. [Book your test](/contact-us#contact) at Aarvak Diagnostics.`,
    tags: ["Arthritis", "RA Factor", "Rheumatoid Arthritis", "Joint Pain", "Autoimmune"],
  },
  {
    slug: "electrolyte-tests-health-importance",
    img: img(4), date: "April 21, 2026", dateSort: "2026-04-21",
    title: "Electrolyte Tests: What They Tell About Your Health",
    desc: "Electrolyte imbalances cause fatigue, cramps, and heart irregularities. Learn what sodium, potassium, and chloride tests reveal about your body.",
    author: "Aarvak Diagnostics", readTime: "3 min", category: "Internal Medicine",
    metaTitle: "Electrolyte Tests – Sodium, Potassium Guide",
    metaDescription: "Understand electrolyte tests: sodium, potassium, chloride & their health impact. Book electrolyte panel at Aarvak Diagnostics Gurugram.",
    content: `Electrolytes are minerals that carry electrical charges in your body, controlling everything from heartbeat to muscle function. Imbalances can be subtle but dangerous.

## Key Electrolytes

- **Sodium:** Controls fluid balance (normal: 136-145 mEq/L)
- **Potassium:** Critical for heart rhythm (normal: 3.5-5.0 mEq/L)
- **Chloride:** Works with sodium for fluid balance
- **Calcium:** Muscle contraction and nerve function
- **Magnesium:** Over 300 enzymatic reactions

## Symptoms of Imbalance

### Low Electrolytes
- Muscle cramps and weakness
- Fatigue and lethargy
- Irregular heartbeat
- Nausea and vomiting
- Confusion and dizziness

### High Electrolytes
- Heart palpitations
- Numbness and tingling
- Excessive thirst
- Swelling

## Common Causes of Imbalance

- Dehydration (especially in Gurugram's heat)
- Excessive sweating during exercise
- Kidney disease
- Certain medications (diuretics)
- Chronic vomiting or diarrhoea

## Who Should Get Tested?

- People with kidney conditions
- Athletes and those in hot climates
- Elderly individuals
- Those on blood pressure medications
- People with chronic digestive issues

Electrolyte testing is available at [Aarvak Diagnostics](/pathology). Include it in your next [health checkup](/health-checkups). [Book now](/contact-us#contact).`,
    tags: ["Electrolytes", "Sodium", "Potassium", "Internal Medicine", "Health Testing"],
  },
  {
    slug: "post-covid-health-checkup-recovery-guide",
    img: img(5), date: "April 22, 2026", dateSort: "2026-04-22",
    title: "Post-COVID Health Checkup: Recovery Testing Guide",
    desc: "COVID-19 can have lasting effects on lungs, heart, and organs. Learn which tests to get after recovery for complete health assessment.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Post-COVID Care",
    metaTitle: "Post-COVID Health Checkup – Recovery Guide",
    metaDescription: "COVID-19 affects lungs, heart & organs long-term. Learn about post-COVID health tests and recovery monitoring at Aarvak Diagnostics Gurugram.",
    content: `Even after recovering from COVID-19, many people experience lingering symptoms — fatigue, breathlessness, brain fog, and joint pain. A post-COVID health checkup helps identify ongoing issues and supports complete recovery.

## Common Post-COVID Symptoms

- Persistent fatigue (lasting weeks to months)
- Shortness of breath during mild activity
- Brain fog and difficulty concentrating
- Joint and muscle pain
- Heart palpitations
- Anxiety and sleep disturbances

## Essential Post-COVID Tests

### Blood Tests
- **CBC:** Check for lingering infection markers
- **CRP & ESR:** Measure residual inflammation
- **D-Dimer:** Clotting risk assessment
- **Ferritin:** Inflammation and iron status
- **Liver & Kidney Function:** Organ recovery check

### Heart Health
- **ECG:** Heart rhythm assessment
- **Cardiac Markers (CPK-MB):** Heart muscle health
- **Lipid Profile:** Cardiovascular status

### Lung & Respiratory
- **Chest X-Ray:** Lung condition assessment
- **Pulmonary Function Test:** Breathing capacity

### Nutritional
- **Vitamin D & B12:** Often depleted during illness
- **Iron Studies:** Post-infection anaemia

## When to Get Tested

- 4-6 weeks after recovery
- If symptoms persist beyond 4 weeks
- Before resuming intense physical activity
- For ongoing medication management

Aarvak Diagnostics offers comprehensive post-COVID panels combining [pathology](/pathology) and [radiology](/radiology) services. [Book your recovery checkup](/contact-us#contact) today.`,
    tags: ["Post-COVID", "COVID Recovery", "Long COVID", "Health Checkup", "Lung Health"],
  },
  {
    slug: "gut-health-tests-digestion-improvement",
    img: img(6), date: "April 23, 2026", dateSort: "2026-04-23",
    title: "Gut Health: Tests That Can Transform Your Digestion",
    desc: "Digestive issues affect daily life. Learn about stool tests, H. pylori screening, and other diagnostic tests that uncover the root cause.",
    author: "Aarvak Diagnostics", readTime: "3 min", category: "Gastroenterology",
    metaTitle: "Gut Health Tests – Improve Your Digestion",
    metaDescription: "Struggling with digestive issues? Learn about gut health tests, H. pylori screening & stool analysis at Aarvak Diagnostics Gurugram. Book now.",
    content: `Your gut is often called your "second brain" — it influences immunity, mood, energy, and overall health. When digestive issues persist, diagnostic testing helps identify the root cause instead of just treating symptoms.

## Common Digestive Symptoms

- Bloating and gas after meals
- Acid reflux and heartburn
- Irregular bowel movements
- Abdominal pain or cramping
- Food intolerances
- Unexplained weight changes

## Diagnostic Tests for Gut Health

- **Stool Examination:** Detects parasites, blood, and fat malabsorption
- **H. pylori Test:** Identifies bacterial infection causing ulcers
- **Liver Function Test:** Bile production and digestion
- **Pancreatic Enzymes (Amylase, Lipase):** Digestive enzyme function
- **Food-Specific IgE:** Food allergy identification
- **Celiac Panel:** Gluten sensitivity screening

## When to Get Tested

- Persistent digestive symptoms (more than 2 weeks)
- Unexplained weight loss or gain
- Blood in stool
- Chronic heartburn not responding to antacids
- Family history of gastrointestinal conditions

## Supporting Your Gut Health

- Eat fibre-rich foods (fruits, vegetables, whole grains)
- Stay hydrated
- Include probiotics (yoghurt, fermented foods)
- Eat smaller, more frequent meals
- Manage stress (gut-brain connection)

Don't ignore persistent digestive issues. [Get tested at Aarvak Diagnostics](/contact-us#contact) for accurate diagnosis and targeted treatment.`,
    tags: ["Gut Health", "Digestion", "H. Pylori", "Gastroenterology", "Stool Test"],
  },
  {
    slug: "blood-group-testing-why-everyone-should-know",
    img: img(7), date: "April 24, 2026", dateSort: "2026-04-24",
    title: "Blood Group Testing: Why Everyone Should Know Theirs",
    desc: "Your blood group matters in emergencies, surgery, and pregnancy. Learn about blood group types, Rh factor, and why testing is essential.",
    author: "Aarvak Diagnostics", readTime: "3 min", category: "Haematology",
    metaTitle: "Blood Group Testing – Why It Matters",
    metaDescription: "Know your blood group for emergencies, surgery & pregnancy. Learn about ABO & Rh testing at Aarvak Diagnostics Gurugram. Book blood group test.",
    content: `Knowing your blood group is one of the simplest yet most important pieces of health information you can have. In emergencies, it can save your life.

## Blood Group Types

### ABO System
- **Type A:** Has A antigens on red cells
- **Type B:** Has B antigens
- **Type AB:** Has both A and B (universal receiver)
- **Type O:** Has neither (universal donor)

### Rh Factor
- **Rh Positive (+):** Has Rh protein (most common)
- **Rh Negative (-):** Lacks Rh protein

## Why Knowing Your Blood Group Matters

- **Emergency Transfusions:** Wrong blood type can be fatal
- **Surgery Preparation:** Pre-surgical requirement
- **Pregnancy:** Rh incompatibility can harm the baby
- **Organ Donation:** Compatibility matching
- **Legal Documentation:** Required for many official forms

## Blood Group Distribution in India

- O+ is the most common (about 36%)
- B+ is second most common (about 31%)
- AB- and O- are the rarest

## When to Get Tested

- Everyone should know their blood group
- Before marriage (Rh compatibility)
- During pregnancy (first trimester)
- Before any planned surgery
- For blood donation registration

Blood group testing is quick and affordable at [Aarvak Diagnostics](/pathology). [Book your test](/contact-us#contact) today — it's a one-time test that serves you for life.`,
    tags: ["Blood Group", "Rh Factor", "Blood Typing", "Emergency", "Haematology"],
  },
  {
    slug: "hormone-testing-when-why-to-get-tested",
    img: img(8), date: "April 25, 2026", dateSort: "2026-04-25",
    title: "Hormone Testing: When and Why You Should Get Tested",
    desc: "Hormones control metabolism, mood, and reproduction. Learn about thyroid, insulin, testosterone, and other hormone tests and when you need them.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Endocrinology",
    metaTitle: "Hormone Testing Guide – When to Get Tested",
    metaDescription: "Understand hormone testing: thyroid, insulin, testosterone & more. Learn when hormonal tests are needed at Aarvak Diagnostics Gurugram. Book now.",
    content: `Hormones are your body's chemical messengers, controlling everything from metabolism and sleep to mood and reproduction. When they're imbalanced, the effects can be widespread and confusing.

## Common Hormones Tested

- **Thyroid (TSH, T3, T4):** Metabolism regulation
- **Insulin:** Blood sugar management
- **Cortisol:** Stress response
- **Testosterone:** Male health and muscle mass
- **Estrogen & Progesterone:** Female reproductive health
- **FSH & LH:** Fertility assessment
- **Prolactin:** Breast milk production, fertility

## Signs of Hormonal Imbalance

- Unexplained weight gain or loss
- Chronic fatigue despite adequate rest
- Mood swings, anxiety, or depression
- Irregular menstrual cycles
- Hair loss or excessive hair growth
- Low libido or sexual dysfunction
- Sleep disturbances
- Skin changes (acne, dryness)

## When to Get Tested

- Persistent unexplained symptoms
- Fertility concerns
- Menstrual irregularities
- Suspected thyroid issues
- PCOD/PCOS evaluation
- Low energy or muscle weakness in men
- Menopausal symptoms

## Preparing for Hormone Tests

- Most hormone tests require morning fasting samples
- Inform your doctor about any medications
- Follow specific timing instructions (some hormones fluctuate)

Thyroid testing is included in most [ADC health packages](/health-checkups). For comprehensive hormonal assessment, [book at Aarvak Diagnostics](/contact-us#contact).`,
    tags: ["Hormones", "Thyroid", "Testosterone", "PCOD", "Endocrinology"],
  },
  {
    slug: "childrens-health-essential-diagnostic-tests",
    img: img(9), date: "April 26, 2026", dateSort: "2026-04-26",
    title: "Children's Health: Essential Tests for Growing Kids",
    desc: "Ensure your child's healthy growth with essential blood tests. Learn about CBC, iron, Vitamin D, and other tests every parent should know about.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Paediatric Health",
    metaTitle: "Kids Health Tests – Essential Diagnostic Guide",
    metaDescription: "Essential health tests for children: CBC, iron, Vitamin D & growth markers. Book paediatric health screening at Aarvak Diagnostics Gurugram.",
    content: `Children's health needs are unique. Growing bodies require specific nutrients and monitoring. Many conditions in childhood, if caught early, can be managed effectively before they impact development.

## Essential Tests for Children

### Basic Blood Work
- **CBC:** Screen for anaemia, infections, blood disorders
- **Blood Group:** Important to know early
- **ESR:** General inflammation marker

### Nutritional Screening
- **Iron Studies & Ferritin:** Anaemia is common in Indian children
- **Vitamin D:** Critical for bone development
- **Vitamin B12:** Especially for vegetarian families
- **Calcium:** Bone and teeth development

### Growth Monitoring
- **Thyroid Profile:** Affects growth and brain development
- **Blood Sugar:** Even children can develop Type 1 diabetes
- **Liver & Kidney Function:** Baseline organ health

## When Should Kids Get Tested?

- Annual wellness check after age 5
- If growth is slower than expected
- Persistent fatigue or weakness
- Frequent infections or slow healing
- Before starting school (baseline)
- Poor appetite or picky eating (nutritional deficiency check)

## Making Testing Comfortable

- Choose [home collection](/insights/home-sample-collection-benefits-safety-how-it-works) for younger children
- Explain the process simply beforehand
- Reward courage after the test
- Choose experienced paediatric phlebotomists

At Aarvak Diagnostics, our phlebotomists are trained to handle young patients with care and patience. [Book your child's health screening](/contact-us#contact) today.`,
    tags: ["Children's Health", "Paediatric", "Iron Deficiency", "Growth", "Vitamins"],
  },
  {
    slug: "corporate-health-checkups-employee-wellness",
    img: img(10), date: "April 27, 2026", dateSort: "2026-04-27",
    title: "Corporate Health Checkups: Why Employee Wellness Matters",
    desc: "Employee health directly impacts productivity. Learn why corporate health checkup programs are essential and how companies can implement them.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Corporate Wellness",
    metaTitle: "Corporate Health Checkups – Employee Wellness",
    metaDescription: "Corporate health checkups boost productivity & reduce absenteeism. Learn about employee wellness programs at Aarvak Diagnostics Gurugram.",
    content: `Healthy employees are productive employees. Corporate health checkups aren't just a perk — they're a strategic investment in your organisation's most valuable asset: its people.

## Why Corporate Health Programs Matter

- **Reduced Absenteeism:** Early detection prevents extended sick leaves
- **Higher Productivity:** Healthy employees perform better
- **Lower Insurance Claims:** Prevention costs less than treatment
- **Employee Retention:** Wellness programs increase loyalty
- **Legal Compliance:** Many industries mandate health screening

## Common Corporate Health Findings

In our experience serving companies across Gurugram:
- 35% of employees have borderline high cholesterol
- 25% have Vitamin D deficiency
- 15% show pre-diabetic markers
- 10% have undiagnosed thyroid issues

These are all preventable or manageable with early detection.

## Aarvak Diagnostics Corporate Solutions

We offer customised [corporate wellness programs](/corporate) including:
- On-site health camps at your office
- Individual health packages for all employee levels
- Digital report delivery and trend analysis
- Doctor consultations for abnormal findings
- Follow-up testing schedules

## Package Options

- **Basic Employee Package:** CBC, sugar, lipid profile, LFT, KFT
- **Executive Package:** Comprehensive testing including vitamins, thyroid, cardiac markers
- **Senior Leadership Package:** Full-body screening with imaging

## Implementation is Easy

- Contact us to discuss your team size and requirements
- Choose package levels for different employee tiers
- We handle scheduling, collection, and reporting
- Aggregate health insights (anonymised) for HR

[Get in touch](/contact-us#contact) with Aarvak Diagnostics to set up your corporate wellness program.`,
    tags: ["Corporate Health", "Employee Wellness", "Workplace Health", "Preventive Care", "HR"],
  },
  {
    slug: "dengue-malaria-typhoid-monsoon-tests",
    img: img(0), date: "April 28, 2026", dateSort: "2026-04-28",
    title: "Dengue, Malaria, and Typhoid: Monsoon Testing Guide",
    desc: "Monsoon diseases peak in India. Learn about diagnostic tests for dengue, malaria, typhoid, and how early testing prevents complications.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Infectious Diseases",
    metaTitle: "Dengue, Malaria & Typhoid – Testing Guide",
    metaDescription: "Get tested for dengue, malaria & typhoid during monsoon season. Learn about NS1, malaria antigen & Widal tests at Aarvak Diagnostics Gurugram.",
    content: `India records millions of dengue, malaria, and typhoid cases every monsoon season. Gurugram and NCR are particularly vulnerable due to urban water stagnation and construction activities. Early testing can be the difference between simple recovery and serious complications.

## Dengue: What to Test

- **Dengue NS1 Antigen:** Detects dengue in first 5 days of fever
- **Dengue IgM/IgG Antibodies:** Detects after day 5
- **CBC with Platelet Count:** Low platelets are a hallmark of dengue

**Warning Signs:** Sudden high fever, severe headache behind eyes, joint/muscle pain, rash

## Malaria: What to Test

- **Malaria Antigen Test (Rapid):** Quick screening
- **Peripheral Blood Smear:** Gold standard for malaria diagnosis
- **CBC:** Monitors overall blood health

**Warning Signs:** Fever with chills and sweating in cycles, fatigue, nausea

## Typhoid: What to Test

- **Widal Test:** Traditional typhoid screening
- **Typhidot (IgM):** More specific than Widal
- **Blood Culture:** Definitive diagnosis

**Warning Signs:** Sustained fever (especially evening rise), stomach pain, weakness

## When to Get Tested

- Fever lasting more than 2-3 days during monsoon
- Fever with body aches and headache
- Fever with gastrointestinal symptoms
- Any fever with platelet concerns

## Prevention Tips

- Eliminate standing water around your home
- Use mosquito nets and repellents
- Drink only purified/boiled water
- Eat freshly cooked food

Don't delay testing during monsoon fevers. [Book at Aarvak Diagnostics](/contact-us#contact) or call for urgent [home collection](/insights/home-sample-collection-benefits-safety-how-it-works).`,
    tags: ["Dengue", "Malaria", "Typhoid", "Monsoon Health", "Infectious Diseases"],
  },
  {
    slug: "prostate-health-psa-testing-men-over-45",
    img: img(1), date: "April 29, 2026", dateSort: "2026-04-29",
    title: "Prostate Health: PSA Testing for Men Over 45",
    desc: "Prostate issues affect most men over 50. Learn about PSA testing, what results mean, and why regular screening matters for prostate health.",
    author: "Aarvak Diagnostics", readTime: "3 min", category: "Men's Health",
    metaTitle: "PSA Test & Prostate Health – Men's Guide",
    metaDescription: "Prostate health matters for men over 45. Learn about PSA testing, normal ranges & prostate screening at Aarvak Diagnostics Gurugram. Book now.",
    content: `Prostate conditions become increasingly common as men age. By 50, a significant percentage of men experience prostate issues. Regular PSA testing helps detect problems early when treatment is most effective.

## What Is PSA?

PSA (Prostate-Specific Antigen) is a protein produced by the prostate gland. Elevated levels may indicate:
- Benign Prostatic Hyperplasia (BPH) — enlarged prostate
- Prostatitis — prostate infection/inflammation
- Prostate cancer — requires further investigation

## PSA Normal Ranges

- **Under 50 years:** Below 2.5 ng/mL
- **50-59 years:** Below 3.5 ng/mL
- **60-69 years:** Below 4.5 ng/mL
- **70+ years:** Below 6.5 ng/mL

Note: Elevated PSA doesn't always mean cancer. Your doctor interprets results in context.

## Symptoms to Watch

- Frequent urination (especially at night)
- Difficulty starting or stopping urine flow
- Weak urine stream
- Pain during urination
- Blood in urine or semen

## Who Should Get PSA Testing?

- All men over 50 (annually)
- Men over 45 with family history of prostate cancer
- Men experiencing urinary symptoms
- African-descent men (higher risk)

## Early Detection Saves Lives

Prostate cancer caught early has a 5-year survival rate above 98%. Regular screening is the key.

PSA is included in our [ADC Supreme Panel](/health-checkups). For standalone testing, [book at Aarvak Diagnostics](/contact-us#contact).`,
    tags: ["PSA", "Prostate Health", "Men's Health", "Cancer Screening", "Urology"],
  },
  {
    slug: "weight-management-lab-tests-guide",
    img: img(2), date: "April 30, 2026", dateSort: "2026-04-30",
    title: "Weight Management: How Lab Tests Can Help You",
    desc: "Struggling with weight? The answer might be in your blood. Learn how thyroid, insulin, and hormone tests can reveal hidden weight management barriers.",
    author: "Aarvak Diagnostics", readTime: "4 min", category: "Wellness & Nutrition",
    metaTitle: "Weight Management Through Lab Testing",
    metaDescription: "Can't lose weight despite trying? Lab tests can reveal thyroid, insulin & hormonal barriers. Get tested at Aarvak Diagnostics Gurugram. Book now.",
    content: `If you've been struggling with weight despite diet and exercise, the answer might not be willpower — it could be your hormones, metabolism, or nutritional status. Blood tests can reveal hidden barriers to weight management.

## Tests That Uncover Weight Issues

### Thyroid Panel
- Hypothyroidism (underactive thyroid) is one of the most common causes of unexplained weight gain
- Even "subclinical" hypothyroidism can slow metabolism
- [Thyroid testing](/insights/thyroid-disorders-signs-symptoms-testing) should be the first step

### Insulin & Blood Sugar
- **Fasting Insulin:** High insulin promotes fat storage
- **HbA1c:** Chronic high sugar affects weight
- **HOMA-IR:** Insulin resistance assessment
- Insulin resistance makes weight loss extremely difficult

### Hormonal Factors
- **Cortisol:** Chronic stress elevates cortisol, promoting belly fat
- **Testosterone (Men):** Low testosterone causes muscle loss and fat gain
- **Estrogen/Progesterone (Women):** Imbalances affect weight distribution
- **PCOD Panel:** Hormonal weight gain in women

### Nutritional Factors
- **Vitamin D:** Deficiency linked to weight gain
- **Vitamin B12:** Affects energy and metabolism
- **Iron:** Low iron causes fatigue, reducing activity levels

## The Testing Approach

1. Start with a comprehensive [health checkup](/health-checkups)
2. Identify specific imbalances
3. Work with your doctor on targeted treatment
4. Retest in 3-6 months to track progress

## Beyond Numbers

Lab tests don't replace good nutrition and exercise — they complement them. Understanding your body's unique chemistry helps you make targeted changes that actually work.

Get your comprehensive metabolic assessment at [Aarvak Diagnostics](/contact-us#contact). Because effective weight management starts with understanding your body.`,
    tags: ["Weight Management", "Thyroid", "Insulin Resistance", "Hormones", "Metabolism"],
  },
];
