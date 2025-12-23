import React, { useState, useEffect } from 'react';
import { Plus, X, Save, Trash2, AlertTriangle, CheckCircle, Backpack, Zap, TrendingDown, MessageSquare } from 'lucide-react';

// Pre-loaded gear database with categories and weights in grams
const GEAR_DATABASE = {
  shelter: [
    { name: 'Ultralight Tent (1P)', weight: 900, essential: true, affiliate: '#' },
    { name: 'Ultralight Tent (2P)', weight: 1400, essential: true, affiliate: '#' },
    { name: 'Standard Tent (2P)', weight: 2500, essential: true },
    { name: 'Standard Tent (3P)', weight: 3200, essential: true },
    { name: 'Family Tent (4P)', weight: 5000, essential: true },
    { name: 'Tarp Shelter', weight: 400, essential: true, affiliate: '#' },
    { name: 'Bivy Sack', weight: 300, essential: true, affiliate: '#' },
    { name: 'Hammock + Straps', weight: 650, essential: true },
    { name: 'Hammock (with rainfly)', weight: 1100, essential: true },
    { name: 'Sleeping Bag (Summer)', weight: 600, essential: true, affiliate: '#' },
    { name: 'Sleeping Bag (3-Season)', weight: 1100, essential: true },
    { name: 'Sleeping Bag (Winter)', weight: 1800, essential: true },
    { name: 'Quilt (Ultralight)', weight: 550, essential: true, affiliate: '#' },
    { name: 'Sleeping Pad (Inflatable)', weight: 450, essential: true, affiliate: '#' },
    { name: 'Sleeping Pad (Foam)', weight: 280, essential: true, affiliate: '#' },
    { name: 'Sleeping Pad (Insulated)', weight: 650, essential: true },
    { name: 'Pillow (Inflatable)', weight: 70, essential: false, affiliate: '#' },
    { name: 'Pillow (Stuff Sack)', weight: 100, essential: false },
  ],
  food: [
    { name: 'Freeze-Dried Meal', weight: 120, essential: true, perDay: true },
    { name: 'Dehydrated Meal', weight: 150, essential: true, perDay: true },
    { name: 'Energy Bar', weight: 50, essential: true, perDay: true },
    { name: 'Protein Bar', weight: 65, essential: true, perDay: true },
    { name: 'Trail Mix (per 100g)', weight: 100, essential: true, perDay: true },
    { name: 'Jerky (per 50g)', weight: 50, essential: false, perDay: true },
    { name: 'Nuts (per 100g)', weight: 100, essential: true, perDay: true },
    { name: 'Dried Fruit (per 100g)', weight: 100, essential: false, perDay: true },
    { name: 'Instant Oatmeal', weight: 40, essential: true, perDay: true },
    { name: 'Instant Noodles', weight: 85, essential: false, perDay: true },
    { name: 'Energy Gel', weight: 35, essential: false, perDay: true },
    { name: 'Instant Coffee/Tea', weight: 10, essential: false, perDay: true },
    { name: 'Electrolyte Mix', weight: 20, essential: false, perDay: true },
    { name: 'Hot Chocolate Mix', weight: 25, essential: false, perDay: true },
  ],
  water: [
    { name: 'Water Bottle (1L Plastic)', weight: 150, essential: true },
    { name: 'Water Bottle (1L Nalgene)', weight: 180, essential: true },
    { name: 'Water Bottle (1L Insulated)', weight: 350, essential: true },
    { name: 'Hydration Bladder (2L)', weight: 200, essential: true },
    { name: 'Hydration Bladder (3L)', weight: 280, essential: true },
    { name: 'Collapsible Water Container (2L)', weight: 50, essential: false },
    { name: 'Water Filter (Squeeze)', weight: 90, essential: true },
    { name: 'Water Filter (Pump)', weight: 350, essential: true },
    { name: 'Water Filter (UV)', weight: 120, essential: true },
    { name: 'Water Purification Tablets', weight: 30, essential: true },
  ],
  cooking: [
    { name: 'Ultralight Stove (Canister)', weight: 250, essential: false },
    { name: 'Standard Backpacking Stove', weight: 450, essential: false },
    { name: 'Alcohol Stove', weight: 30, essential: false },
    { name: 'Wood Burning Stove', weight: 320, essential: false },
    { name: 'Fuel Canister (100g)', weight: 200, essential: false },
    { name: 'Fuel Canister (230g)', weight: 370, essential: false },
    { name: 'Pot (600ml Titanium)', weight: 150, essential: false },
    { name: 'Pot (1L Aluminum)', weight: 180, essential: false },
    { name: 'Pot Set (Nesting)', weight: 400, essential: false },
    { name: 'Pan (Frying)', weight: 220, essential: false },
    { name: 'Mug (Insulated)', weight: 110, essential: false },
    { name: 'Spork (Titanium)', weight: 15, essential: false },
    { name: 'Spork (Plastic)', weight: 10, essential: false },
    { name: 'Utensil Set', weight: 45, essential: false },
    { name: 'Lighter', weight: 20, essential: true },
    { name: 'Waterproof Matches', weight: 35, essential: false },
  ],
  clothing: [
    { name: 'Rain Jacket (Ultralight)', weight: 250, essential: true, affiliate: '#' },
    { name: 'Rain Jacket (Standard)', weight: 400, essential: true },
    { name: 'Rain Pants', weight: 200, essential: false, affiliate: '#' },
    { name: 'Fleece Jacket', weight: 400, essential: true },
    { name: 'Down Jacket (Light)', weight: 350, essential: true, affiliate: '#' },
    { name: 'Down Jacket (Heavy)', weight: 650, essential: true },
    { name: 'Synthetic Insulation Layer', weight: 500, essential: true },
    { name: 'Base Layer Top', weight: 120, essential: false, affiliate: '#' },
    { name: 'Base Layer Bottom', weight: 140, essential: false, affiliate: '#' },
    { name: 'Hiking Pants (Convertible)', weight: 280, essential: false },
    { name: 'Hiking Shorts', weight: 180, essential: false, affiliate: '#' },
    { name: 'Extra Shirt', weight: 150, essential: false },
    { name: 'Extra Socks (pair)', weight: 50, essential: true },
    { name: 'Underwear (extra)', weight: 40, essential: false },
    { name: 'Beanie', weight: 50, essential: false, affiliate: '#' },
    { name: 'Sun Hat', weight: 85, essential: false },
    { name: 'Gloves (Light)', weight: 70, essential: false },
    { name: 'Gloves (Winter)', weight: 150, essential: false },
    { name: 'Buff/Neck Gaiter', weight: 30, essential: false, affiliate: '#' },
  ],
  tools: [
    { name: 'Multi-tool (Full Size)', weight: 180, essential: true },
    { name: 'Multi-tool (Compact)', weight: 80, essential: true },
    { name: 'Knife (Fixed Blade)', weight: 150, essential: false },
    { name: 'Knife (Folding)', weight: 90, essential: false },
    { name: 'Headlamp (Basic)', weight: 80, essential: true },
    { name: 'Headlamp (High-Power)', weight: 140, essential: true },
    { name: 'Flashlight', weight: 120, essential: false },
    { name: 'Extra Batteries (AAA 2-pack)', weight: 25, essential: true },
    { name: 'Extra Batteries (AA 2-pack)', weight: 50, essential: true },
    { name: 'Power Bank (10000mAh)', weight: 220, essential: false },
    { name: 'Power Bank (20000mAh)', weight: 350, essential: false },
    { name: 'Solar Charger', weight: 400, essential: false },
    { name: 'Rope/Cord (10m)', weight: 150, essential: false },
    { name: 'Paracord (15m)', weight: 80, essential: false },
    { name: 'Carabiners (2-pack)', weight: 60, essential: false },
    { name: 'Trekking Poles (Pair, Ultralight)', weight: 350, essential: false },
    { name: 'Trekking Poles (Pair, Standard)', weight: 550, essential: false },
    { name: 'Map & Compass', weight: 100, essential: true },
    { name: 'GPS Device', weight: 200, essential: false },
    { name: 'Repair Kit (Tape, Cord, Patches)', weight: 80, essential: false },
  ],
  safety: [
    { name: 'First Aid Kit (Minimal)', weight: 120, essential: true },
    { name: 'First Aid Kit (Basic)', weight: 250, essential: true },
    { name: 'First Aid Kit (Comprehensive)', weight: 450, essential: true },
    { name: 'Emergency Blanket', weight: 50, essential: true },
    { name: 'Emergency Bivy', weight: 90, essential: false },
    { name: 'Whistle', weight: 10, essential: true },
    { name: 'Signal Mirror', weight: 20, essential: false },
    { name: 'Fire Starter', weight: 30, essential: true },
    { name: 'Flint & Steel', weight: 50, essential: false },
    { name: 'Personal Locator Beacon', weight: 200, essential: false },
    { name: 'Satellite Messenger', weight: 240, essential: false },
    { name: 'Bear Spray', weight: 320, essential: false },
    { name: 'Bear Canister', weight: 1100, essential: false },
    { name: 'Bear Bag + Rope', weight: 150, essential: false },
  ],
  hygiene: [
    { name: 'Toothbrush (Travel Size)', weight: 20, essential: true },
    { name: 'Toothpaste (Travel Size)', weight: 30, essential: true },
    { name: 'Sunscreen (Small 50ml)', weight: 80, essential: true },
    { name: 'Sunscreen (Large 100ml)', weight: 150, essential: true },
    { name: 'Lip Balm with SPF', weight: 15, essential: false },
    { name: 'Toilet Paper (compressed)', weight: 50, essential: true },
    { name: 'Trowel (Plastic)', weight: 50, essential: true },
    { name: 'Trowel (Metal)', weight: 90, essential: true },
    { name: 'Hand Sanitizer (60ml)', weight: 70, essential: false },
    { name: 'Biodegradable Soap (60ml)', weight: 65, essential: false },
    { name: 'Quick-Dry Towel (Small)', weight: 100, essential: false },
    { name: 'Quick-Dry Towel (Large)', weight: 200, essential: false },
    { name: 'Bug Spray (Small)', weight: 60, essential: false },
    { name: 'Bug Spray (Large)', weight: 120, essential: false },
    { name: 'Wet Wipes (Pack)', weight: 80, essential: false },
  ],
};

const TRIP_TYPES = {
  dayHike: { 
    name: 'Day Hike', 
    maxWeight: 8000, 
    days: 1, 
    description: 'Short day trip, minimal gear',
    suggestions: [
      'Skip shelter items - you won\'t need a tent or sleeping bag',
      'Pack light on food - just snacks and lunch',
      'Bring 1-2L of water or a filter for refills',
      'Essential: first aid, headlamp, rain jacket, map',
      'Consider trekking poles for stability and reduced knee strain'
    ]
  },
  weekend: { 
    name: 'Weekend Trip', 
    maxWeight: 12000, 
    days: 2, 
    description: '1-2 nights camping',
    suggestions: [
      'Bring a lightweight tent or tarp shelter',
      'Pack a 3-season sleeping bag and pad',
      'Plan 2-3 meals per day plus snacks',
      'A simple stove setup saves weight vs. campfire cooking',
      'Extra socks and a warm layer for evening comfort'
    ]
  },
  multiDay: { 
    name: 'Multi-Day', 
    maxWeight: 15000, 
    days: 5, 
    description: '3-7 days backcountry',
    suggestions: [
      'Invest in reliable shelter - weather can change quickly',
      'Food planning is critical - aim for 2000-3000 calories/day',
      'Water filter essential - carrying all water is impractical',
      'Bring repair items: duct tape, extra cord, needle & thread',
      'Consider resupply points if trip exceeds 5 days',
      'Pack layers for temperature swings and weather changes'
    ]
  },
  ultralight: { 
    name: 'Ultralight', 
    maxWeight: 9000, 
    days: 3, 
    description: 'Minimalist setup for experienced',
    suggestions: [
      'Every gram counts - question each item\'s necessity',
      'Use tarp or bivy instead of traditional tent',
      'Choose multi-use items (bandana, buff, trekking poles as tent poles)',
      'Cut unnecessary extras: spare clothes, bulky first aid, heavy tools',
      'Requires experience - know your limits and environment',
      'Focus on the "Big Three": shelter, sleep system, backpack'
    ]
  },
};

const GearWeightOptimizer = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [customItems, setCustomItems] = useState([]);
  const [tripType, setTripType] = useState('weekend');
  const [tripDays, setTripDays] = useState(2);
  const [bodyWeight, setBodyWeight] = useState(70);
  const [bodyWeightInput, setBodyWeightInput] = useState('70');
  const [experienceLevel, setExperienceLevel] = useState('intermediate');
  const [unitSystem, setUnitSystem] = useState('kg'); // 'g' or 'oz' or 'kg' or 'lb'
  const [savedTrips, setSavedTrips] = useState([]);
  const [activeCategory, setActiveCategory] = useState('shelter');
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [newCustomItem, setNewCustomItem] = useState({ name: '', weight: '', category: 'tools' });
  const [showCustomForm, setShowCustomForm] = useState(false);
  
  // Donation and affiliate links (can be updated with real URLs)
  const [donationUrl, setDonationUrl] = useState('https://ko-fi.com/alopexgear');
  const [affiliateDisclosure, setAffiliateDisclosure] = useState(true);

  // Export trip to CSV
  const exportToCSV = () => {
    if (selectedItems.length === 0) {
      alert('Please add some items before exporting.');
      return;
    }

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const filename = `Alopex_Trip_${today}.csv`;

    // Helper function to escape CSV values
    const escapeCSV = (value) => {
      if (value === null || value === undefined) return '';
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    // Calculate category totals
    const categoryTotals = {};
    selectedItems.forEach(item => {
      const weight = item.perDay ? item.weight * tripDays : item.weight;
      if (!categoryTotals[item.category]) {
        categoryTotals[item.category] = 0;
      }
      categoryTotals[item.category] += weight;
    });

    // Build CSV content
    let csv = '';

    // TRIP SUMMARY SECTION
    csv += '--- TRIP SUMMARY ---\n';
    csv += `Trip Type,${tripInfo.name}\n`;
    csv += `Trip Duration,${tripDays} days\n`;
    csv += `Experience Level,${experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)}\n`;
    csv += `Body Weight,${bodyWeight.toFixed(1)} kg (${kgToLbs(bodyWeight).toFixed(1)} lbs)\n`;
    if (recommendedWeight) {
      csv += `Recommended Max Weight,${(recommendedWeight.minWeight / 1000).toFixed(1)}-${(recommendedWeight.maxWeight / 1000).toFixed(1)} kg (${kgToLbs(recommendedWeight.minWeight / 1000).toFixed(1)}-${kgToLbs(recommendedWeight.maxWeight / 1000).toFixed(1)} lbs)\n`;
      // ADDITION: Add recommended weight in selected unit
      csv += `Recommended Max Weight (${getUnitLabel(unitSystem)}),${formatWeightInUnit(recommendedWeight.minWeight, unitSystem)}-${formatWeightInUnit(recommendedWeight.maxWeight, unitSystem)} ${getUnitLabel(unitSystem)}\n`;
    }
    csv += `Actual Pack Weight,${(totalWeight / 1000).toFixed(2)} kg (${kgToLbs(totalWeight / 1000).toFixed(1)} lbs)\n`;
    // ADDITION: Add actual pack weight in grams and selected unit
    csv += `Actual Pack Weight (g),${Math.round(totalWeight)} g\n`;
    csv += `Actual Pack Weight (${getUnitLabel(unitSystem)}),${formatWeightInUnit(totalWeight, unitSystem)} ${getUnitLabel(unitSystem)}\n`;
    csv += `Pack Weight as % of Body Weight,${weightPercentage.toFixed(1)}%\n`;
    
    // Add weight status warnings
    const warnings = [];
    if (recommendedWeight && totalWeight > recommendedWeight.maxWeight) {
      const excess = totalWeight - recommendedWeight.maxWeight;
      warnings.push(`Pack exceeds recommended max by ${(excess / 1000).toFixed(2)} kg (${kgToLbs(excess / 1000).toFixed(1)} lbs)`);
    }
    if (weightPercentage > 25) {
      warnings.push(`Pack weight exceeds 25% of body weight (currently ${weightPercentage.toFixed(1)}%)`);
    }
    if (weightPercentage > 30) {
      warnings.push(`WARNING: Pack weight exceeds 30% of body weight - high risk of injury`);
    }
    
    if (warnings.length > 0) {
      csv += `Weight Status,${warnings.join('; ')}\n`;
    } else {
      csv += `Weight Status,Within recommended limits\n`;
    }
    
    csv += `Date Exported,${new Date().toLocaleDateString()}\n`;
    csv += '\n\n';

    // ITEM LIST SECTION
    csv += '--- ITEM LIST ---\n';
    // ADDITION: Added Unit Weight (oz) and weights in currently selected unit
    csv += `Category,Item Name,Quantity,Unit Weight (g),Unit Weight (oz),Unit Weight (kg),Unit Weight (lbs),Unit Weight (${getUnitLabel(unitSystem)}),Total Weight (kg),Total Weight (lbs),Total Weight (${getUnitLabel(unitSystem)}),Is Preset,Per Day\n`;
    
    selectedItems.forEach(item => {
      const quantity = item.perDay ? tripDays : 1;
      const unitWeightG = item.weight;
      const unitWeightKg = unitWeightG / 1000;
      const unitWeightLbs = kgToLbs(unitWeightKg);
      // ADDITION: Calculate oz and selected unit
      const unitWeightOz = gToOz(unitWeightG);
      const unitWeightSelected = formatWeightInUnit(unitWeightG, unitSystem);
      const totalWeightG = unitWeightG * quantity;
      const totalWeightKg = totalWeightG / 1000;
      const totalWeightLbs = kgToLbs(totalWeightKg);
      const totalWeightSelected = formatWeightInUnit(totalWeightG, unitSystem);
      const isPreset = item.custom ? 'No' : 'Yes';
      const perDay = item.perDay ? 'Yes' : 'No';

      // ADDITION: Added new columns to CSV row
      csv += `${escapeCSV(item.category)},${escapeCSV(item.name)},${quantity},${unitWeightG},${unitWeightOz.toFixed(1)},${unitWeightKg.toFixed(2)},${unitWeightLbs.toFixed(2)},${unitWeightSelected},${totalWeightKg.toFixed(2)},${totalWeightLbs.toFixed(2)},${totalWeightSelected},${isPreset},${perDay}\n`;
    });

    csv += '\n\n';

    // CATEGORY SUMMARY SECTION
    csv += '--- CATEGORY SUMMARY ---\n';
    csv += 'Category,Total Weight (kg),Total Weight (lbs),Percent of Total\n';
    
    Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1]) // Sort by weight descending
      .forEach(([category, weight]) => {
        const weightKg = weight / 1000;
        const weightLbs = kgToLbs(weightKg);
        const percentage = ((weight / totalWeight) * 100).toFixed(1);
        csv += `${escapeCSV(category)},${weightKg.toFixed(2)},${weightLbs.toFixed(1)},${percentage}%\n`;
      });

    csv += '\n';
    csv += `TOTAL,${(totalWeight / 1000).toFixed(2)},${kgToLbs(totalWeight / 1000).toFixed(1)},100.0%\n`;

    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Unit conversion functions
  const kgToLbs = (kg) => kg * 2.20462;
  const lbsToKg = (lbs) => lbs / 2.20462;
  
  // ADDITION: New conversion functions for additional units
  const gToOz = (g) => g * 0.035274;
  const gToLb = (g) => g * 0.00220462;
  const gToKg = (g) => g / 1000;
  const ozToG = (oz) => oz / 0.035274;
  const lbToG = (lb) => lb / 0.00220462;
  const kgToG = (kg) => kg * 1000;
  
  const convertWeight = (weight, toUnit) => {
    if (toUnit === 'lbs') {
      return kgToLbs(weight);
    }
    return weight; // Already in kg
  };

  // ADDITION: New function to format weight in any unit from grams
  const formatWeightInUnit = (grams, unit) => {
    switch(unit) {
      case 'g':
        return Math.round(grams);
      case 'oz':
        return gToOz(grams).toFixed(1);
      case 'lb':
        return gToLb(grams).toFixed(2);
      case 'kg':
        return gToKg(grams).toFixed(2);
      default:
        return gToKg(grams).toFixed(2);
    }
  };

  // ADDITION: Get unit label
  const getUnitLabel = (unit) => {
    const labels = { 'g': 'g', 'oz': 'oz', 'kg': 'kg', 'lb': 'lb' };
    return labels[unit] || 'kg';
  };

  const displayWeight = (weightInGrams) => {
    const weightInKg = weightInGrams / 1000;
    if (unitSystem === 'lbs') {
      return kgToLbs(weightInKg).toFixed(1) + 'lbs';
    }
    // ADDITION: Handle new units
    if (unitSystem === 'g') {
      return Math.round(weightInGrams) + 'g';
    }
    if (unitSystem === 'oz') {
      return gToOz(weightInGrams).toFixed(1) + 'oz';
    }
    if (unitSystem === 'lb') {
      return gToLb(weightInGrams).toFixed(2) + 'lb';
    }
    return weightInKg.toFixed(2) + 'kg';
  };

  // Handle body weight input changes
  const handleBodyWeightChange = (value) => {
    setBodyWeightInput(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      // ADDITION: Convert from selected unit to kg (internal storage remains in kg)
      // NOTE: Body weight input only accepts lb or kg (g/oz selections default to lb)
      if (unitSystem === 'lbs' || unitSystem === 'lb' || unitSystem === 'g' || unitSystem === 'oz') {
        setBodyWeight(lbsToKg(numValue));
      } else {
        setBodyWeight(numValue); // already kg
      }
    }
  };

  // Update input display when unit system changes
  const getBodyWeightDisplay = () => {
    // ADDITION: Display body weight in lb or kg only (g/oz default to lb)
    if (unitSystem === 'lbs' || unitSystem === 'lb' || unitSystem === 'g' || unitSystem === 'oz') {
      return kgToLbs(bodyWeight).toFixed(1);
    }
    return bodyWeight.toFixed(1); // kg
  };

  // Effect to update input when unit changes
  React.useEffect(() => {
    setBodyWeightInput(getBodyWeightDisplay());
  }, [unitSystem]);

  // Calculate recommended pack weight based on body weight, trip type, and experience
  const getRecommendedWeight = () => {
    const weightRanges = {
      dayHike: {
        beginner: { min: 0.10, max: 0.15 },
        intermediate: { min: 0.08, max: 0.12 },
        experienced: { min: 0.05, max: 0.10 },
      },
      weekend: {
        beginner: { min: 0.25, max: 0.30 },
        intermediate: { min: 0.20, max: 0.25 },
        experienced: { min: 0.15, max: 0.20 },
      },
      multiDay: {
        beginner: { min: 0.30, max: 0.30 },
        intermediate: { min: 0.20, max: 0.25 },
        experienced: { min: 0.15, max: 0.20 },
      },
      thruHike: {
        beginner: { min: 0.20, max: 0.20 },
        intermediate: { min: 0.15, max: 0.20 },
        experienced: { min: 0.10, max: 0.15 },
      },
      ultralight: { // Using ultralight as winter trip
        beginner: { min: 0.30, max: 0.30 },
        intermediate: { min: 0.25, max: 0.30 },
        experienced: { min: 0.20, max: 0.25 },
      },
    };

    const range = weightRanges[tripType]?.[experienceLevel];
    if (!range) return null;

    const minWeight = bodyWeight * 1000 * range.min;
    const maxWeight = bodyWeight * 1000 * range.max;
    
    // Determine status based on current pack weight
    let status = 'good';
    if (totalWeight > maxWeight) {
      status = 'over';
    } else if (totalWeight < minWeight * 0.7) {
      status = 'under';
    }

    return {
      minWeight,
      maxWeight,
      minPercent: (range.min * 100).toFixed(0),
      maxPercent: (range.max * 100).toFixed(0),
      status,
    };
  };

  // Format weight display - use kg for items over 1000g
  const formatWeight = (grams, isCustom = false) => {
    const prefix = isCustom ? '' : '~';
    const weightInKg = grams / 1000;
    
    // ADDITION: Handle all 4 units
    if (unitSystem === 'g') {
      return `${prefix}${Math.round(grams)}g`;
    }
    
    if (unitSystem === 'oz') {
      return `${prefix}${gToOz(grams).toFixed(1)}oz`;
    }
    
    if (unitSystem === 'lb') {
      return `${prefix}${gToLb(grams).toFixed(2)}lb`;
    }
    
    if (unitSystem === 'lbs') {
      const lbs = kgToLbs(weightInKg);
      return `${prefix}${lbs.toFixed(1)}lbs`;
    }
    
    // Default: kg (existing behavior)
    if (grams >= 1000) {
      return `${prefix}${weightInKg.toFixed(2)}kg`;
    }
    return `${prefix}${grams}g`;
  };

  // Calculate total weight including per-day items
  const calculateTotalWeight = () => {
    let total = 0;
    selectedItems.forEach(item => {
      if (item.perDay) {
        total += item.weight * tripDays;
      } else {
        total += item.weight;
      }
    });
    return total;
  };

  const totalWeight = calculateTotalWeight();
  const weightPercentage = (totalWeight / (bodyWeight * 1000)) * 100;
  const maxRecommended = bodyWeight * 1000 * 0.25; // 25% of body weight
  const tripInfo = TRIP_TYPES[tripType];

  // Toggle item selection
  const toggleItem = (item, category) => {
    const itemWithCategory = { ...item, category };
    const exists = selectedItems.find(i => i.name === item.name && i.category === category);
    
    if (exists) {
      setSelectedItems(selectedItems.filter(i => !(i.name === item.name && i.category === category)));
    } else {
      setSelectedItems([...selectedItems, itemWithCategory]);
    }
  };

  // Add custom item
  const addCustomItem = () => {
    if (newCustomItem.name && newCustomItem.weight) {
      const inputWeight = parseFloat(newCustomItem.weight);
      let weightInGrams = inputWeight;
      
      // Convert from selected unit to grams for storage
      if (unitSystem === 'kg') {
        weightInGrams = inputWeight * 1000;
      } else if (unitSystem === 'lb') {
        weightInGrams = lbToG(inputWeight);
      } else if (unitSystem === 'oz') {
        weightInGrams = ozToG(inputWeight);
      }
      // else already in grams
      
      const item = {
        name: newCustomItem.name,
        weight: Math.round(weightInGrams), // Store as grams
        category: newCustomItem.category,
        essential: false,
        custom: true,
      };
      setCustomItems([...customItems, item]);
      setSelectedItems([...selectedItems, item]);
      setNewCustomItem({ name: '', weight: '', category: 'tools' });
      setShowCustomForm(false); // Close form after adding
    }
  };

  // Get optimization suggestions
  const getOptimizations = () => {
    const suggestions = [];
    
    // Check for heavy non-essential items
    const nonEssential = selectedItems.filter(i => !i.essential).sort((a, b) => b.weight - a.weight);
    if (nonEssential.length > 0 && totalWeight > maxRecommended) {
      suggestions.push({
        type: 'remove',
        items: nonEssential.slice(0, 3),
        message: `Consider removing these non-essential items to save ${nonEssential.slice(0, 3).reduce((sum, i) => sum + i.weight, 0)}g`,
      });
    }

    // Check for over-packing in categories
    const categoryWeights = {};
    selectedItems.forEach(item => {
      const weight = item.perDay ? item.weight * tripDays : item.weight;
      categoryWeights[item.category] = (categoryWeights[item.category] || 0) + weight;
    });

    Object.entries(categoryWeights).forEach(([cat, weight]) => {
      if (weight > 3000 && cat !== 'shelter') {
        suggestions.push({
          type: 'category',
          category: cat,
          message: `${cat} weighs ${(weight / 1000).toFixed(1)}kg - consider lighter alternatives`,
        });
      }
    });

    // Check if over weight limit
    if (totalWeight > tripInfo.maxWeight) {
      const excess = totalWeight - tripInfo.maxWeight;
      suggestions.push({
        type: 'overweight',
        message: `You're ${(excess / 1000).toFixed(1)}kg over the recommended ${tripInfo.name} weight`,
      });
    }

    return suggestions;
  };

  // Get heaviest categories
  const getHeaviestCategories = () => {
    if (selectedItems.length === 0) return [];
    
    const categoryWeights = {};
    selectedItems.forEach(item => {
      const weight = item.perDay ? item.weight * tripDays : item.weight;
      categoryWeights[item.category] = (categoryWeights[item.category] || 0) + weight;
    });

    return Object.entries(categoryWeights)
      .map(([category, weight]) => ({
        category,
        weight,
        percentage: ((weight / totalWeight) * 100).toFixed(1),
      }))
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 3);
  };

  // Get affiliate suggestions for heavy categories
  const getAffiliateSuggestions = () => {
    if (selectedItems.length === 0) return [];
    
    const categoryWeights = {};
    selectedItems.forEach(item => {
      const weight = item.perDay ? item.weight * tripDays : item.weight;
      categoryWeights[item.category] = (categoryWeights[item.category] || 0) + weight;
    });

    const suggestions = [];
    const heavyThreshold = 2500; // Consider categories over 2.5kg as potentially heavy

    Object.entries(categoryWeights).forEach(([category, weight]) => {
      if (weight > heavyThreshold) {
        // Find lighter alternatives from the database with affiliate links
        const lighterItems = GEAR_DATABASE[category]
          ?.filter(item => item.affiliate && item.weight < weight / 3) // Significantly lighter items
          .sort((a, b) => a.weight - b.weight)
          .slice(0, 2); // Show max 2 suggestions per category

        if (lighterItems && lighterItems.length > 0) {
          suggestions.push({
            category,
            currentWeight: weight,
            items: lighterItems,
          });
        }
      }
    });

    return suggestions;
  };

  // Load saved trips from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('alopex_saved_trips');
    if (saved) {
      try {
        setSavedTrips(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved trips:', e);
      }
    }
  }, []);

  // Save trip to localStorage
  const saveTrip = () => {
    if (selectedItems.length === 0) {
      alert('Please add some items before saving.');
      return;
    }

    const tripName = prompt('Name this trip:');
    if (!tripName) return; // User cancelled

    const newTrip = {
      id: Date.now(), // Unique ID
      name: tripName,
      items: selectedItems,
      customItems: customItems,
      tripType,
      days: tripDays,
      bodyWeight,
      experienceLevel,
      weight: totalWeight,
      date: new Date().toLocaleDateString(),
    };

    const updatedTrips = [...savedTrips, newTrip];
    setSavedTrips(updatedTrips);
    
    // Save to localStorage
    try {
      localStorage.setItem('alopex_saved_trips', JSON.stringify(updatedTrips));
      alert(`✓ Trip "${tripName}" saved!`);
    } catch (e) {
      alert('Error saving trip. Storage might be full.');
      console.error('Save error:', e);
    }
  };

  // Load saved trip
  const loadTrip = (trip) => {
    setSelectedItems(trip.items);
    setTripType(trip.tripType);
    setTripDays(trip.days);
    setBodyWeight(trip.bodyWeight);
    setBodyWeightInput(trip.bodyWeight.toFixed(1));
    setExperienceLevel(trip.experienceLevel || 'intermediate');
    
    // Restore custom items if they exist
    if (trip.customItems) {
      setCustomItems(trip.customItems);
    }
  };

  // Delete saved trip
  const deleteTrip = (tripId) => {
    if (!confirm('Delete this saved trip?')) return;
    
    const updatedTrips = savedTrips.filter(t => t.id !== tripId);
    setSavedTrips(updatedTrips);
    
    try {
      localStorage.setItem('alopex_saved_trips', JSON.stringify(updatedTrips));
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  // AI Assistant
  const askAI = async () => {
    if (!aiPrompt.trim()) return;
    
    setAiLoading(true);
    setAiResponse('');

    try {
      const gearContext = {
        selectedItems: selectedItems.map(i => ({ name: i.name, weight: i.weight, category: i.category, essential: i.essential })),
        totalWeight: totalWeight,
        tripType: tripInfo.name,
        days: tripDays,
        bodyWeight: bodyWeight,
        weightPercentage: weightPercentage.toFixed(1),
        recommendations: getOptimizations(),
      };

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are a backpacking and outdoor gear expert. Help optimize this user's gear setup.

Current Setup:
- Total Weight: ${(totalWeight / 1000).toFixed(2)}kg (${weightPercentage.toFixed(1)}% of body weight)
- Trip Type: ${tripInfo.name} (${tripDays} days)
- Body Weight: ${bodyWeight}kg
- Selected Items: ${selectedItems.map(i => `${i.name} (${i.weight}g)`).join(', ')}

User Question: ${aiPrompt}

Provide specific, actionable advice based on their gear and trip type. Be concise and practical.`
          }],
        }),
      });

      const data = await response.json();
      const text = data.content.map(item => item.type === 'text' ? item.text : '').join('\n');
      setAiResponse(text);
    } catch (error) {
      setAiResponse('Sorry, I encountered an error connecting to the AI assistant. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const optimizations = getOptimizations();
  const heaviestCategories = getHeaviestCategories();
  const recommendedWeight = getRecommendedWeight();
  const affiliateSuggestions = getAffiliateSuggestions();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#3d4f4a',
      fontFamily: '"Inter", -apple-system, sans-serif',
      color: '#e8e6e0',
      padding: '20px',
      position: 'relative',
    }}>
      {/* Subtle paper texture overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.08,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay',
        zIndex: 0,
      }}></div>
      
      {/* Subtle contour line pattern (topo map inspiration) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.04,
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 80px,
          rgba(232, 230, 224, 0.1) 80px,
          rgba(232, 230, 224, 0.1) 81px
        ),
        repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 120px,
          rgba(232, 230, 224, 0.08) 120px,
          rgba(232, 230, 224, 0.08) 121px
        )`,
        zIndex: 0,
      }}></div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          box-sizing: border-box;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .main-grid {
            grid-template-columns: 1fr !important;
          }
          
          .stat-card-grid {
            grid-template-columns: 1fr !important;
          }
          
          .category-tabs {
            justify-content: center !important;
          }
          
          .unit-toggle {
            position: static !important;
            margin-bottom: 20px;
            justify-content: center;
          }
          
          .header-content {
            padding: 0 10px;
          }
          
          .main-title {
            font-size: 2.5rem !important;
          }
          
          .fox-icon {
            width: 45px !important;
            height: 45px !important;
          }
        }

        .category-tab {
          transition: all 0.2s ease;
        }

        .category-tab:hover {
          transform: translateY(-2px);
        }

        .gear-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gear-item:hover {
          transform: translateX(5px);
        }

        .stat-card {
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease backwards;
        }

        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        input:focus, textarea:focus, select:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(139, 195, 74, 0.3);
        }

        button {
          cursor: pointer;
          transition: all 0.2s ease;
        }

        button:active {
          transform: scale(0.95);
        }
      `}</style>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header style={{
          textAlign: 'center',
          marginBottom: '40px',
          animation: 'fadeInUp 0.8s ease backwards',
          position: 'relative',
        }} className="header-content">
          {/* Unit Toggle Switch */}
          <div className="unit-toggle" style={{
            position: 'absolute',
            top: '0',
            right: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            {/* ADDITION: 4 unit buttons instead of 2 */}
            <button
              onClick={() => setUnitSystem('g')}
              style={{
                padding: '6px 10px',
                background: unitSystem === 'g' ? '#6b8577' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: unitSystem === 'g' ? '#4a5c55' : '#e8e6e0',
                fontWeight: '600',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              g
            </button>
            <button
              onClick={() => setUnitSystem('oz')}
              style={{
                padding: '6px 10px',
                background: unitSystem === 'oz' ? '#6b8577' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: unitSystem === 'oz' ? '#4a5c55' : '#e8e6e0',
                fontWeight: '600',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              oz
            </button>
            <button
              onClick={() => setUnitSystem('kg')}
              style={{
                padding: '6px 10px',
                background: unitSystem === 'kg' ? '#6b8577' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: unitSystem === 'kg' ? '#4a5c55' : '#e8e6e0',
                fontWeight: '600',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              kg
            </button>
            <button
              onClick={() => setUnitSystem('lb')}
              style={{
                padding: '6px 10px',
                background: unitSystem === 'lb' ? '#6b8577' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: unitSystem === 'lb' ? '#4a5c55' : '#e8e6e0',
                fontWeight: '600',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              lb
            </button>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '15px',
            }}>
            <svg className="fox-icon" width="60" height="60" viewBox="0 0 100 100" style={{ stroke: '#e8e6e0', fill: 'none', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'miter' }}>
              {/* Arctic Fox Head - Sharp Angular Lines */}
              
              {/* Ears - sharp, widely spaced triangular */}
              <path d="M 35 35 L 30 15 L 40 30" />
              <path d="M 65 35 L 70 15 L 60 30" />
              
              {/* Inner ear lines */}
              <path d="M 35 30 L 32 20" strokeWidth="1" />
              <path d="M 65 30 L 68 20" strokeWidth="1" />
              
              {/* Head - wider at top, narrow at bottom */}
              <path d="M 30 35 L 35 40 L 38 50 L 40 58" />
              <path d="M 70 35 L 65 40 L 62 50 L 60 58" />
              
              {/* Snout - long and pointed (fox characteristic) */}
              <path d="M 40 58 L 45 65 L 50 68 L 55 65 L 60 58" />
              <path d="M 45 65 L 50 63 L 55 65" />
              
              {/* Nose - small triangle at tip */}
              <polygon points="48,68 52,68 50,70" fill="#e8e6e0" stroke="#e8e6e0" />
              
              {/* Center line from nose up snout */}
              <path d="M 50 68 L 50 63" strokeWidth="1" />
              
              {/* Eyes - angular, positioned higher and wider */}
              <path d="M 38 42 L 36 40 L 38 38 L 40 40 Z" fill="#e8e6e0" />
              <path d="M 62 42 L 60 40 L 62 38 L 64 40 Z" fill="#e8e6e0" />
              
              {/* Cheek fur/whisker marks - angled outward */}
              <path d="M 38 52 L 30 50" strokeWidth="1" />
              <path d="M 40 56 L 32 56" strokeWidth="1" />
              <path d="M 62 52 L 70 50" strokeWidth="1" />
              <path d="M 60 56 L 68 56" strokeWidth="1" />
              
              {/* Forehead marking */}
              <path d="M 45 35 L 50 30 L 55 35" strokeWidth="1" />
            </svg>
            <h1 className="main-title" style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              margin: '0',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              fontFamily: '"Source Serif 4", serif',
            }}>ALOPEX</h1>
          </div>
          <p style={{
            fontSize: '0.95rem',
            fontFamily: '"Inter", monospace',
            opacity: '0.7',
            margin: '0',
            letterSpacing: '0.02em',
            fontWeight: '400',
          }}>A simple gear calculator</p>
          
          {/* Banner text */}
          <p style={{
            fontSize: '0.9rem',
            fontFamily: '"Inter", sans-serif',
            opacity: '0.75',
            margin: '12px 0 0 0',
            lineHeight: '1.5',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Plan your pack weight — no account required. Start with presets or add custom gear.
          </p>
          </div>
        </header>

        {/* Stats Dashboard */}
        <div className="stat-card-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}>
          <div className="stat-card" style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <div style={{ fontSize: '0.9rem', opacity: '0.7', marginBottom: '8px', fontWeight: '600', letterSpacing: '0.1em' }}>TOTAL WEIGHT</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', fontFamily: '"Inter", monospace' }}>
              {/* ADDITION: Display in selected unit */}
              {formatWeightInUnit(totalWeight, unitSystem)}
              <span style={{ fontSize: '1.2rem', opacity: '0.7', marginLeft: '8px' }}>{getUnitLabel(unitSystem)}</span>
            </div>
            <div style={{ fontSize: '0.85rem', opacity: '0.6', marginTop: '5px' }}>
              {selectedItems.length} items selected
            </div>
          </div>

          <div className="stat-card" style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <div style={{ fontSize: '0.9rem', opacity: '0.7', marginBottom: '8px', fontWeight: '600', letterSpacing: '0.1em' }}>BODY WEIGHT %</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', fontFamily: '"Inter", monospace' }}>
              {weightPercentage.toFixed(1)}
              <span style={{ fontSize: '1.2rem', opacity: '0.7', marginLeft: '8px' }}>%</span>
            </div>
            <div style={{ fontSize: '0.85rem', opacity: '0.6', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {weightPercentage > 25 ? (
                <>
                  <AlertTriangle size={14} style={{ opacity: '0.8' }} />
                  Over recommended 25%
                </>
              ) : (
                '✓ Within safe range'
              )}
            </div>
          </div>

          <div className="stat-card" style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <div style={{ fontSize: '0.9rem', opacity: '0.7', marginBottom: '8px', fontWeight: '600', letterSpacing: '0.1em' }}>TRIP TYPE</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '5px' }}>
              {tripInfo.name}
            </div>
            <div style={{ fontSize: '0.85rem', opacity: '0.6' }}>
              {tripDays} days • Max: {(tripInfo.maxWeight / 1000).toFixed(1)}kg
            </div>
          </div>
        </div>

        <div className="main-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '350px 1fr',
          gap: '30px', 
          alignItems: 'start' 
        }}>
          {/* Left Column - Trip Setup */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Trip Configuration */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '1.2rem', fontWeight: '700', letterSpacing: '0.05em' }}>TRIP SETUP</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', opacity: '0.8' }}>Trip Type</label>
                <select
                  value={tripType}
                  onChange={(e) => {
                    setTripType(e.target.value);
                    setTripDays(TRIP_TYPES[e.target.value].days);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#e8e6e0',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit',
                  }}
                >
                  {Object.entries(TRIP_TYPES).map(([key, type]) => (
                    <option key={key} value={key} style={{ background: '#4a5c55', color: '#e8e6e0' }}>
                      {type.name} - {type.description}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', opacity: '0.8' }}>
                  Trip Duration: {tripDays} days
                </label>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={tripDays}
                  onChange={(e) => setTripDays(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: '#6b8577',
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', opacity: '0.8' }}>
                  Your Weight ({unitSystem === 'g' || unitSystem === 'oz' ? 'lb' : unitSystem === 'lb' ? 'lb' : 'kg'})
                </label>
                <input
                  type="number"
                  value={bodyWeightInput}
                  onChange={(e) => handleBodyWeightChange(e.target.value)}
                  placeholder={
                    unitSystem === 'g' ? '154' : 
                    unitSystem === 'oz' ? '154' :
                    unitSystem === 'lb' ? '154' :
                    unitSystem === 'lbs' ? '154' : 
                    '70'
                  }
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#e8e6e0',
                    fontSize: '0.95rem',
                    fontFamily: '"Inter", monospace',
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', opacity: '0.8' }}>Experience Level</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#e8e6e0',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit',
                  }}
                >
                  <option value="beginner" style={{ background: '#4a5c55', color: '#e8e6e0' }}>Beginner</option>
                  <option value="intermediate" style={{ background: '#4a5c55', color: '#e8e6e0' }}>Intermediate</option>
                  <option value="experienced" style={{ background: '#4a5c55', color: '#e8e6e0' }}>Experienced / Ultralight</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  onClick={saveTrip}
                  style={{
                    padding: '12px',
                    background: '#6b8577',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#4a5c55',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Save size={18} />
                  SAVE
                </button>

                <button
                  onClick={exportToCSV}
                  disabled={selectedItems.length === 0}
                  style={{
                    padding: '12px',
                    background: selectedItems.length === 0 ? 'rgba(107, 133, 119, 0.3)' : '#6b8577',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#4a5c55',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: selectedItems.length === 0 ? 0.5 : 1,
                    cursor: selectedItems.length === 0 ? 'not-allowed' : 'pointer',
                  }}
                  title="Export trip to CSV spreadsheet"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  EXPORT
                </button>
              </div>

              {/* Recommended Weight Display */}
              {recommendedWeight && (
                <div style={{
                  marginTop: '20px',
                  padding: '20px',
                  background: recommendedWeight.status === 'good' 
                    ? 'rgba(107, 133, 119, 0.15)' 
                    : 'rgba(212, 165, 116, 0.15)',
                  border: `1px solid ${recommendedWeight.status === 'good' 
                    ? 'rgba(107, 133, 119, 0.3)' 
                    : 'rgba(212, 165, 116, 0.3)'}`,
                  borderRadius: '12px',
                }}>
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    opacity: '0.7',
                    marginBottom: '10px',
                    letterSpacing: '0.05em',
                  }}>
                    RECOMMENDED RANGE
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '8px',
                    fontFamily: '"Inter", monospace',
                  }}>
                    {/* ADDITION: Display in selected unit */}
                    {`${formatWeightInUnit(recommendedWeight.minWeight, unitSystem)}–${formatWeightInUnit(recommendedWeight.maxWeight, unitSystem)}${getUnitLabel(unitSystem)}`}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    opacity: '0.7',
                    marginBottom: '12px',
                  }}>
                    {recommendedWeight.minPercent}–{recommendedWeight.maxPercent}% of body weight
                  </div>
                  {recommendedWeight.status === 'over' && (
                    <div style={{
                      fontSize: '0.8rem',
                      padding: '8px 10px',
                      background: 'rgba(212, 165, 116, 0.2)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      <AlertTriangle size={14} />
                      Current weight exceeds recommendation
                    </div>
                  )}
                  {recommendedWeight.status === 'good' && (
                    <div style={{
                      fontSize: '0.8rem',
                      padding: '8px 10px',
                      background: 'rgba(107, 133, 119, 0.2)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      <CheckCircle size={14} />
                      Within recommended range
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Trip Type Suggestions */}
            {tripInfo.suggestions && (
              <div style={{
                background: 'rgba(139, 195, 74, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '25px',
                border: '1px solid rgba(139, 195, 74, 0.2)',
              }}>
                <h3 style={{
                  margin: '0 0 15px 0',
                  fontSize: '1rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: '0.9',
                }}>
                  <CheckCircle size={20} />
                  {tripInfo.name.toUpperCase()} TIPS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tripInfo.suggestions.map((suggestion, idx) => (
                    <div key={idx} style={{
                      padding: '10px 12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      lineHeight: '1.5',
                      borderLeft: '3px solid rgba(139, 195, 74, 0.4)',
                    }}>
                      {suggestion}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Heavy? Callout */}
            {heaviestCategories.length > 0 && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '25px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}>
                <h3 style={{
                  margin: '0 0 15px 0',
                  fontSize: '1rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: '0.9',
                }}>
                  <TrendingDown size={20} />
                  WHAT'S HEAVY?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {heaviestCategories.map((cat, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      borderLeft: '3px solid rgba(232, 230, 224, 0.3)',
                    }}>
                      <div>
                        <div style={{ 
                          fontSize: '0.85rem', 
                          fontWeight: '600',
                          textTransform: 'capitalize',
                          marginBottom: '3px',
                        }}>
                          {cat.category}
                        </div>
                        <div style={{ 
                          fontSize: '0.75rem', 
                          opacity: '0.6',
                          fontFamily: '"Inter", sans-serif',
                        }}>
                          {formatWeight(cat.weight, false)}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        fontFamily: '"Inter", sans-serif',
                        opacity: '0.8',
                      }}>
                        {cat.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimizations */}
            {optimizations.length > 0 && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '25px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}>
                <h3 style={{
                  margin: '0 0 15px 0',
                  fontSize: '1rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: '0.9',
                }}>
                  <TrendingDown size={20} />
                  SUGGESTIONS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {optimizations.map((opt, idx) => (
                    <div key={idx} style={{
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      lineHeight: '1.5',
                      borderLeft: '3px solid rgba(255, 255, 255, 0.3)',
                    }}>
                      {opt.message}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Affiliate Suggestions */}
            {affiliateSuggestions.length > 0 && (
              <div style={{
                background: 'rgba(107, 133, 119, 0.08)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '25px',
                border: '1px solid rgba(107, 133, 119, 0.2)',
              }}>
                <h3 style={{
                  margin: '0 0 15px 0',
                  fontSize: '1rem',
                  fontWeight: '700',
                  opacity: '0.9',
                }}>
                  Lighter Options
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {affiliateSuggestions.map((suggestion, idx) => (
                    <div key={idx}>
                      <div style={{
                        fontSize: '0.85rem',
                        marginBottom: '10px',
                        opacity: '0.8',
                        lineHeight: '1.5',
                      }}>
                        Your <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>{suggestion.category}</span> is heavy ({formatWeight(suggestion.currentWeight, false)}). Consider lighter options:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {suggestion.items.map((item, itemIdx) => (
                          <a
                            key={itemIdx}
                            href={item.affiliate}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '10px 12px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(107, 133, 119, 0.3)',
                              borderRadius: '8px',
                              color: '#e8e6e0',
                              textDecoration: 'none',
                              fontSize: '0.85rem',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = 'rgba(107, 133, 119, 0.15)';
                              e.currentTarget.style.transform = 'translateX(3px)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                              e.currentTarget.style.transform = 'translateX(0)';
                            }}
                          >
                            <span style={{ fontWeight: '500' }}>{item.name}</span>
                            <span style={{ opacity: '0.7', fontFamily: '"Inter", monospace' }}>
                              {formatWeight(item.weight, false)} →
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {affiliateDisclosure && (
                  <div style={{
                    marginTop: '15px',
                    paddingTop: '15px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '0.75rem',
                    opacity: '0.6',
                    lineHeight: '1.5',
                  }}>
                    Some links are affiliate links. They help support Alopex at no extra cost to you.
                  </div>
                )}
              </div>
            )}

            {/* Donation Button */}
            {selectedItems.length > 0 && (
              <a
                href={donationUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '15px 20px',
                  background: 'rgba(212, 165, 116, 0.12)',
                  border: '1px solid rgba(212, 165, 116, 0.3)',
                  borderRadius: '12px',
                  color: '#e8e6e0',
                  textDecoration: 'none',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  lineHeight: '1.6',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 165, 116, 0.18)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 165, 116, 0.12)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '4px', fontSize: '0.9rem' }}>
                  ☕ Support Alopex
                </div>
                <div style={{ opacity: '0.8', fontSize: '0.8rem' }}>
                  If this helped you pack lighter, consider supporting it — keeps the tool free and simple.
                </div>
              </a>
            )}

            {/* AI Assistant Toggle */}
            <button
              onClick={() => setShowAI(!showAI)}
              style={{
                width: '100%',
                padding: '15px',
                background: showAI ? '#6b8577' : 'rgba(139, 195, 74, 0.2)',
                border: '1px solid #6b8577',
                borderRadius: '12px',
                color: showAI ? '#4a5c55' : '#6b8577',
                fontWeight: '700',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <MessageSquare size={20} />
              AI GEAR ADVISOR
            </button>

            {/* Saved Trips */}
            {savedTrips.length > 0 && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '25px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '1rem', fontWeight: '700' }}>SAVED TRIPS</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {savedTrips.map((trip) => (
                    <div
                      key={trip.id}
                      style={{
                        padding: '12px',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <button
                        onClick={() => loadTrip(trip)}
                        style={{
                          flex: 1,
                          background: 'transparent',
                          border: 'none',
                          color: '#e8e6e0',
                          textAlign: 'left',
                          fontSize: '0.85rem',
                          padding: '0',
                        }}
                      >
                        <div style={{ fontWeight: '700', marginBottom: '4px' }}>{trip.name}</div>
                        <div style={{ opacity: '0.6', fontSize: '0.8rem' }}>
                          {(trip.weight / 1000).toFixed(2)}kg • {trip.items.length} items • {trip.date}
                        </div>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTrip(trip.id);
                        }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 8px',
                          color: '#e8e6e0',
                          opacity: '0.6',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.opacity = '1';
                          e.currentTarget.style.background = 'rgba(212, 165, 116, 0.3)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.opacity = '0.6';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        }}
                        title="Delete trip"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Gear Selection */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            {showAI ? (
              <div>
                <h3 style={{
                  margin: '0 0 20px 0',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <MessageSquare size={24} />
                  AI GEAR ADVISOR
                </h3>

                <div style={{ marginBottom: '20px' }}>
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Ask anything: 'What can I remove to save 2kg?' or 'Suggest ultralight alternatives' or 'Is my setup good for 5 days?'"
                    style={{
                      width: '100%',
                      minHeight: '120px',
                      padding: '15px',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: '#e8e6e0',
                      fontSize: '0.95rem',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  onClick={askAI}
                  disabled={aiLoading || !aiPrompt.trim()}
                  style={{
                    padding: '12px 24px',
                    background: aiLoading ? 'rgba(139, 195, 74, 0.5)' : '#6b8577',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#4a5c55',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    opacity: aiLoading || !aiPrompt.trim() ? 0.5 : 1,
                  }}
                >
                  {aiLoading ? 'THINKING...' : 'ASK AI'}
                </button>

                {aiResponse && (
                  <div style={{
                    marginTop: '25px',
                    padding: '20px',
                    background: 'rgba(139, 195, 74, 0.1)',
                    border: '1px solid rgba(139, 195, 74, 0.3)',
                    borderRadius: '12px',
                    lineHeight: '1.7',
                    fontSize: '0.95rem',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {aiResponse}
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Collapsible Add Custom Item Button */}
                <button
                  onClick={() => setShowCustomForm(!showCustomForm)}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    marginBottom: '15px',
                    background: showCustomForm ? 'rgba(117, 138, 158, 0.2)' : 'rgba(117, 138, 158, 0.12)',
                    border: '1px solid rgba(117, 138, 158, 0.3)',
                    borderRadius: '10px',
                    color: '#e8e6e0',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(117, 138, 158, 0.25)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = showCustomForm ? 'rgba(117, 138, 158, 0.2)' : 'rgba(117, 138, 158, 0.12)';
                  }}
                >
                  <Plus size={18} />
                  ADD CUSTOM ITEM
                </button>

                {/* Collapsible Custom Item Form */}
                {showCustomForm && (
                  <div style={{
                    marginBottom: '20px',
                    padding: '20px',
                    background: 'rgba(117, 138, 158, 0.12)',
                    borderRadius: '12px',
                    border: '1px solid rgba(117, 138, 158, 0.25)',
                    animation: 'fadeInUp 0.3s ease',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <input
                        type="text"
                        placeholder="Item name (e.g., Custom Tent)"
                        value={newCustomItem.name}
                        onChange={(e) => setNewCustomItem({ ...newCustomItem, name: e.target.value })}
                        style={{
                          padding: '12px',
                          background: 'rgba(0, 0, 0, 0.3)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          color: '#e8e6e0',
                          fontSize: '0.95rem',
                        }}
                      />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                        <input
                          type="number"
                          placeholder={`Weight (${getUnitLabel(unitSystem)})`}
                          value={newCustomItem.weight}
                          onChange={(e) => setNewCustomItem({ ...newCustomItem, weight: e.target.value })}
                          style={{
                            padding: '12px',
                            background: 'rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: '#e8e6e0',
                            fontSize: '0.95rem',
                            fontFamily: '"Inter", monospace',
                          }}
                        />
                        <select
                          value={newCustomItem.category}
                          onChange={(e) => setNewCustomItem({ ...newCustomItem, category: e.target.value })}
                          style={{
                            padding: '12px',
                            background: 'rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: '#e8e6e0',
                            fontSize: '0.95rem',
                            textTransform: 'capitalize',
                          }}
                        >
                          {Object.keys(GEAR_DATABASE).map(cat => (
                            <option key={cat} value={cat} style={{ background: '#4a5c55', color: '#e8e6e0', textTransform: 'capitalize' }}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={addCustomItem}
                          disabled={!newCustomItem.name || !newCustomItem.weight}
                          style={{
                            padding: '12px',
                            background: (!newCustomItem.name || !newCustomItem.weight) ? 'rgba(117, 138, 158, 0.3)' : '#758a9e',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff',
                            fontWeight: '700',
                            fontSize: '0.95rem',
                            cursor: (!newCustomItem.name || !newCustomItem.weight) ? 'not-allowed' : 'pointer',
                            opacity: (!newCustomItem.name || !newCustomItem.weight) ? 0.5 : 1,
                          }}
                        >
                          ADD
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="category-tabs" style={{
                  display: 'flex',
                  gap: '10px',
                  marginBottom: '25px',
                  flexWrap: 'wrap',
                }}>
                  {Object.keys(GEAR_DATABASE).map(cat => (
                    <button
                      key={cat}
                      className="category-tab"
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        padding: '10px 18px',
                        background: activeCategory === cat ? '#6b8577' : 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        color: activeCategory === cat ? '#4a5c55' : '#e8e6e0',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                  {customItems.length > 0 && (
                    <button
                      key="custom"
                      className="category-tab"
                      onClick={() => setActiveCategory('custom')}
                      style={{
                        padding: '10px 18px',
                        background: activeCategory === 'custom' ? '#6b8577' : 'rgba(117, 138, 158, 0.2)',
                        border: '1px solid rgba(117, 138, 158, 0.3)',
                        borderRadius: '8px',
                        color: activeCategory === 'custom' ? '#4a5c55' : '#e8e6e0',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      CUSTOM ({customItems.length})
                    </button>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  maxHeight: '500px',
                  overflowY: 'auto',
                  paddingRight: '10px',
                }}>
                  {activeCategory === 'custom' ? (
                    // Show all custom items in the custom tab
                    customItems.length > 0 ? (
                      customItems.map((item, idx) => {
                        const isSelected = selectedItems.some(i => i.name === item.name && i.custom);
                        return (
                          <button
                            key={`custom-${idx}`}
                            className="gear-item"
                            onClick={() => toggleItem(item, item.category)}
                            style={{
                              padding: '15px 18px',
                              background: isSelected ? 'rgba(117, 138, 158, 0.25)' : 'rgba(117, 138, 158, 0.12)',
                              border: `1px solid ${isSelected ? '#758a9e' : 'rgba(117, 138, 158, 0.3)'}`,
                              borderRadius: '10px',
                              color: '#e8e6e0',
                              textAlign: 'left',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                                {item.name}
                                <span style={{ color: '#758a9e', marginLeft: '8px', fontSize: '0.8rem' }}>CUSTOM</span>
                                <span style={{ color: '#e8e6e0', marginLeft: '8px', fontSize: '0.75rem', opacity: '0.6', textTransform: 'capitalize' }}>
                                  ({item.category})
                                </span>
                              </div>
                              <div style={{ fontSize: '0.85rem', opacity: '0.6', fontFamily: '"Inter", monospace' }}>
                                {formatWeight(item.weight, true)}
                              </div>
                            </div>
                            {isSelected && <CheckCircle size={20} color="#758a9e" />}
                          </button>
                        );
                      })
                    ) : (
                      <div style={{
                        padding: '40px 20px',
                        textAlign: 'center',
                        opacity: '0.6',
                        fontSize: '0.9rem',
                      }}>
                        No custom items yet. Add items below to see them here.
                      </div>
                    )
                  ) : (
                    // Show items from selected database category
                    GEAR_DATABASE[activeCategory].map((item, idx) => {
                      const isSelected = selectedItems.some(i => i.name === item.name && i.category === activeCategory);
                      return (
                        <button
                          key={idx}
                          className="gear-item"
                          onClick={() => toggleItem(item, activeCategory)}
                          style={{
                            padding: '15px 18px',
                            background: isSelected ? 'rgba(139, 195, 74, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                            border: `1px solid ${isSelected ? '#6b8577' : 'rgba(255, 255, 255, 0.1)'}`,
                            borderRadius: '10px',
                            color: '#e8e6e0',
                            textAlign: 'left',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                              {item.name}
                              {item.essential && <span style={{ color: '#d4a574', marginLeft: '8px', fontSize: '0.8rem' }}>⚠ ESSENTIAL</span>}
                              {item.perDay && <span style={{ color: '#6b8577', marginLeft: '8px', fontSize: '0.8rem' }}>× {tripDays} days</span>}
                            </div>
                            <div style={{ fontSize: '0.85rem', opacity: '0.6', fontFamily: '"Inter", monospace' }}>
                              {item.perDay 
                                ? `${formatWeight(item.weight, item.custom)}/day (${formatWeight(item.weight * tripDays, item.custom)} total)`
                                : formatWeight(item.weight, item.custom)
                              }
                            </div>
                          </div>
                          {isSelected && <CheckCircle size={20} color="#6b8577" />}
                        </button>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GearWeightOptimizer;
export default GearWeightOptimizer;
