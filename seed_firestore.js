/**
 * Saini HomeCare — Firestore Seed Script
 * =======================================
 * Seeds service catalog directly into Firebase Firestore.
 * 
 * Usage:  node seed_firestore.js
 *   or:   npm run seed
 * 
 * Safety:
 * - Merges with existing data (preserves bookings, coupons, banners, notepad)
 * - Idempotent: safe to run multiple times
 * - Validates all records before writing
 * - Logs inserted/skipped/failed counts
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';

// Same config as src/firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyC-nreyuj5Qj1sdOMBh1D5Q8n1t090Yo04",
  authDomain: "smartkabadi-945b9.firebaseapp.com",
  projectId: "smartkabadi-945b9",
  storageBucket: "smartkabadi-945b9.firebasestorage.app",
  messagingSenderId: "92850793972",
  appId: "1:92850793972:web:50f1cfce0e8d74c2f1dda1",
  measurementId: "G-K8X0E3MGBB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docRef = doc(db, 'sainiRefrigeration', 'appData');

// ── Validation ──────────────────────────────────────────────
function validateService(s, index) {
  const errors = [];
  if (!s.title) errors.push(`[${index}] Missing title`);
  if (!s.slug) errors.push(`[${index}] Missing slug`);
  if (!s.description) errors.push(`[${index}] Missing description`);
  if (!s.image) errors.push(`[${index}] Missing image`);
  if (s.basePrice != null && s.basePrice < 0) errors.push(`[${index}] Negative price: ${s.basePrice}`);
  if (s.rating && (s.rating < 0 || s.rating > 5)) errors.push(`[${index}] Invalid rating: ${s.rating}`);
  if (!s.includes || s.includes.length === 0) errors.push(`[${index}] Empty includes`);
  return errors;
}

function checkDuplicates(services) {
  const errors = [];
  const slugs = new Set();
  const titles = new Set();
  for (const s of services) {
    if (slugs.has(s.slug)) errors.push(`Duplicate slug: ${s.slug}`);
    if (titles.has(s.title)) errors.push(`Duplicate title: ${s.title}`);
    slugs.add(s.slug);
    titles.add(s.title);
  }
  return errors;
}

// ── Main ────────────────────────────────────────────────────
async function seed() {
  console.log('\n🌱 Saini HomeCare — Firestore Seed\n' + '='.repeat(45));

  // Load data
  const raw = readFileSync(new URL('./seed_data.json', import.meta.url), 'utf-8');
  const seedData = JSON.parse(raw);
  const { services, suggestedServices } = seedData;

  console.log(`\n📦 Loaded: ${services.length} active + ${suggestedServices.length} suggested services`);

  // Validate
  console.log('\n🔍 Validating...');
  const allServices = [...services, ...suggestedServices];
  let allErrors = [];
  allServices.forEach((s, i) => {
    allErrors.push(...validateService(s, i));
  });
  allErrors.push(...checkDuplicates(allServices));

  if (allErrors.length > 0) {
    console.error('\n❌ Validation failed:');
    allErrors.forEach(e => console.error(`   • ${e}`));
    process.exit(1);
  }
  console.log('   ✅ All records valid');
  console.log('   ✅ No duplicate slugs or titles');

  // Read existing Firestore data
  console.log('\n📡 Reading existing Firestore data...');
  const snap = await getDoc(docRef);
  const existing = snap.exists() ? snap.data() : {};

  console.log(`   Existing services: ${(existing.services || []).length}`);
  console.log(`   Existing bookings: ${(existing.bookings || []).length}`);
  console.log(`   Existing coupons: ${(existing.coupons || []).length}`);
  console.log(`   Existing banners: ${(existing.banners || []).length}`);

  // Merge: replace services, keep everything else
  const merged = {
    ...existing,
    services: services,
    suggestedServices: suggestedServices,
  };

  // Write
  console.log('\n💾 Writing to Firestore...');
  await setDoc(docRef, merged);
  console.log('   ✅ Firestore updated successfully!');

  // Verify
  console.log('\n🔎 Verifying...');
  const verify = await getDoc(docRef);
  const data = verify.data();
  const activeCount = (data.services || []).length;
  const suggestedCount = (data.suggestedServices || []).length;
  const featuredCount = (data.services || []).filter(s => s.featured).length;

  console.log('\n' + '='.repeat(45));
  console.log('📊 VERIFICATION REPORT');
  console.log('='.repeat(45));
  console.log(`   Active services:     ${activeCount}`);
  console.log(`   Featured services:   ${featuredCount}`);
  console.log(`   Suggested (inactive): ${suggestedCount}`);
  console.log(`   Bookings preserved:  ${(data.bookings || []).length}`);
  console.log(`   Coupons preserved:   ${(data.coupons || []).length}`);
  console.log(`   Banners preserved:   ${(data.banners || []).length}`);
  console.log('');
  console.log('📋 Active services:');
  (data.services || []).forEach((s, i) => {
    console.log(`   ${i + 1}. ${s.title} — ${s.price} [${s.category}]`);
  });
  console.log('');
  console.log('📋 Suggested services (hidden from public):');
  (data.suggestedServices || []).forEach((s, i) => {
    console.log(`   ${i + 1}. ${s.title} — ${s.price}`);
  });
  console.log('\n✅ Seed completed successfully!\n');
  process.exit(0);
}

seed().catch(err => {
  console.error('\n❌ Seed failed:', err.message);
  process.exit(1);
});
