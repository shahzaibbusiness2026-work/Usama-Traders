import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Ruler,
  Layers,
  Sparkles,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  ArrowRight,
  Info,
  CheckCircle2,
  Share2,
  FileSpreadsheet,
} from 'lucide-react';
import { Product } from '../../types';

interface SlabPriceEstimatorProps {
  product: Product;
  currentThickness?: string;
  onApplyToQuote: (configuredProduct: {
    product: Product;
    quantity: number;
    thickness: string;
    dimensions: string;
    totalSqFt: number;
    estimatedPrice: number;
  }) => void;
}

interface StandardDimensionPreset {
  id: string;
  name: string;
  lengthFt: number;
  widthFt: number;
  tag: string;
}

const PRESET_DIMENSIONS: StandardDimensionPreset[] = [
  { id: 'standard', name: 'Standard Slabs', lengthFt: 9.5, widthFt: 5.2, tag: 'Most Popular' },
  { id: 'large', name: 'Large Format', lengthFt: 10.5, widthFt: 5.8, tag: 'Seamless Walls' },
  { id: 'jumbo', name: 'Jumbo Executive', lengthFt: 11.5, widthFt: 6.5, tag: 'Full Bookmatch' },
];

export const SlabPriceEstimator: React.FC<SlabPriceEstimatorProps> = ({
  product,
  currentThickness = '18 mm',
  onApplyToQuote,
}) => {
  // Dimension mode: preset vs custom
  const [selectedPreset, setSelectedPreset] = useState<string>('standard');
  const [isCustomDimensions, setIsCustomDimensions] = useState(false);

  // Custom length and width in feet
  const [customLengthFt, setCustomLengthFt] = useState<number>(9.5);
  const [customWidthFt, setCustomWidthFt] = useState<number>(5.2);

  // Thickness
  const [thickness, setThickness] = useState<string>(currentThickness);

  // Quantity of slabs
  const [quantity, setQuantity] = useState<number>(2);

  // Cutting / Pattern Wastage buffer
  const [wastagePercent, setWastagePercent] = useState<number>(10);

  // Additional options
  const [edgeTreatment, setEdgeTreatment] = useState<'none' | 'mitred' | 'bullnose'>('none');
  const [includeSealant, setIncludeSealant] = useState(true);

  // Active dimensions
  const activeLength = isCustomDimensions
    ? customLengthFt
    : (PRESET_DIMENSIONS.find((p) => p.id === selectedPreset)?.lengthFt ?? 9.5);

  const activeWidth = isCustomDimensions
    ? customWidthFt
    : (PRESET_DIMENSIONS.find((p) => p.id === selectedPreset)?.widthFt ?? 5.2);

  // Calculations
  const calculations = useMemo(() => {
    // 1. Single Slab Area (Sq. Ft.)
    const singleSlabSqFt = Number((activeLength * activeWidth).toFixed(2));
    const singleSlabSqM = Number((singleSlabSqFt * 0.092903).toFixed(2));

    // 2. Total Net Area (Sq. Ft.)
    const totalNetSqFt = Number((singleSlabSqFt * quantity).toFixed(2));

    // 3. Gross Area with Wastage Allowance
    const wastageMultiplier = 1 + wastagePercent / 100;
    const grossSqFt = Number((totalNetSqFt * wastageMultiplier).toFixed(2));

    // 4. Rate adjustments based on thickness
    let thicknessMultiplier = 1.0;
    if (thickness === '20 mm') thicknessMultiplier = 1.12;
    if (thickness === '30 mm') thicknessMultiplier = 1.28;

    const baseRatePerSqFt = Math.round(product.price * thicknessMultiplier);

    // 5. Material Subtotal
    const materialCost = Math.round(grossSqFt * baseRatePerSqFt);

    // 6. Edge treatment cost (perimeter estimation)
    // Perimeter per slab in linear ft = 2 * (L + W)
    const linearFeetPerSlab = (activeLength + activeWidth) * 2;
    const totalLinearFeet = linearFeetPerSlab * quantity;
    let edgeCost = 0;
    if (edgeTreatment === 'mitred') edgeCost = totalLinearFeet * 850;
    if (edgeTreatment === 'bullnose') edgeCost = totalLinearFeet * 650;

    // 7. Stone sealant cost
    const sealantCost = includeSealant ? Math.round(grossSqFt * 180) : 0;

    // 8. Total Estimated Cost
    const totalEstimatedCost = materialCost + edgeCost + sealantCost;

    // 9. Logistics Weight Estimate (~75 kg/m2 for 18mm, scaled by thickness)
    const weightPerSqM =
      thickness === '18 mm' ? 75 : thickness === '20 mm' ? 84 : 125;
    const totalWeightKg = Math.round((grossSqFt * 0.092903) * weightPerSqM);

    return {
      singleSlabSqFt,
      singleSlabSqM,
      totalNetSqFt,
      grossSqFt,
      baseRatePerSqFt,
      materialCost,
      edgeCost,
      sealantCost,
      totalEstimatedCost,
      totalWeightKg,
      totalLinearFeet,
    };
  }, [
    activeLength,
    activeWidth,
    quantity,
    wastagePercent,
    thickness,
    product.price,
    edgeTreatment,
    includeSealant,
  ]);

  const handleApply = () => {
    const dimString = `${activeLength.toFixed(1)} ft × ${activeWidth.toFixed(1)} ft (${calculations.singleSlabSqFt} sq. ft./slab)`;
    onApplyToQuote({
      product,
      quantity,
      thickness,
      dimensions: dimString,
      totalSqFt: calculations.grossSqFt,
      estimatedPrice: calculations.totalEstimatedCost,
    });
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*Saleem Traders Price Estimate for ${product.name}*\n` +
      `• Slab Size: ${activeLength.toFixed(1)} ft × ${activeWidth.toFixed(1)} ft (${calculations.singleSlabSqFt} sq. ft.)\n` +
      `• Quantity: ${quantity} slab(s)\n` +
      `• Thickness: ${thickness}\n` +
      `• Gross Coverage (inc. ${wastagePercent}% cut factor): ${calculations.grossSqFt} sq. ft.\n` +
      `• Estimated Total: PKR ${calculations.totalEstimatedCost.toLocaleString()}\n` +
      `Please provide an official project quotation.`
    );
    window.open(`https://wa.me/923111333786?text=${text}`, '_blank');
  };

  return (
    <div
      id="slab-price-estimator"
      className="bg-white rounded-xl border border-stone-200/90 shadow-sm overflow-hidden my-8 transition-all"
    >
      {/* Header bar */}
      <div className="bg-stone-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#886d4b]/20 border border-[#d5c1a4]/30 flex items-center justify-center text-[#d5c1a4]">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-editorial text-lg font-normal tracking-wide text-white">
              Dynamic Slab Price & Coverage Estimator
            </h3>
            <p className="text-[11px] text-stone-300 font-light">
              Calculate realistic square footage, thickness multipliers, and project investment
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[10px] uppercase font-sans tracking-widest px-2.5 py-0.5 rounded bg-white/10 text-stone-300 border border-white/10">
            Stone Calculator
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* LEFT CONFIGURATION CONTROLS (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Dimension Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-stone-900 flex items-center gap-1.5 font-sans">
                <Ruler className="w-3.5 h-3.5 text-[#886d4b]" />
                <span>1. Select Slab Dimensions</span>
              </label>
              <button
                type="button"
                onClick={() => setIsCustomDimensions(!isCustomDimensions)}
                className="text-[11px] text-[#886d4b] font-medium hover:underline"
              >
                {isCustomDimensions ? '← Standard Quarry Sizes' : 'Custom Dimensions →'}
              </button>
            </div>

            {!isCustomDimensions ? (
              <div className="grid grid-cols-3 gap-2.5">
                {PRESET_DIMENSIONS.map((preset) => {
                  const isSelected = selectedPreset === preset.id;
                  const sqft = (preset.lengthFt * preset.widthFt).toFixed(1);
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedPreset(preset.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'border-[#886d4b] bg-[#fbf8f3] ring-1 ring-[#886d4b]'
                          : 'border-stone-200 bg-stone-50/50 hover:border-stone-300'
                      }`}
                    >
                      <span className="text-[10px] font-medium text-[#886d4b] uppercase tracking-wider block font-sans">
                        {preset.tag}
                      </span>
                      <div className="text-xs font-medium text-stone-900 mt-0.5 font-serif">
                        {preset.name}
                      </div>
                      <div className="text-[11px] text-stone-600 mt-1 font-mono">
                        {preset.lengthFt} ft × {preset.widthFt} ft
                      </div>
                      <div className="text-[10px] text-stone-400 font-light">
                        ({sqft} sq. ft.)
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Slab Length (Feet)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="4"
                      max="14"
                      value={customLengthFt}
                      onChange={(e) => setCustomLengthFt(Number(e.target.value) || 0)}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#886d4b] bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 mb-1">
                      Slab Width (Feet)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="2"
                      max="8"
                      value={customWidthFt}
                      onChange={(e) => setCustomWidthFt(Number(e.target.value) || 0)}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:outline-none focus:border-[#886d4b] bg-white font-mono"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                  <span>Single Slab Area:</span>
                  <span className="font-medium text-stone-800 font-mono">
                    {calculations.singleSlabSqFt} sq. ft. (~{calculations.singleSlabSqM} m²)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 2. Slab Thickness & Multiplier */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-stone-900 flex items-center gap-1.5 font-sans">
              <Layers className="w-3.5 h-3.5 text-[#886d4b]" />
              <span>2. Stone Thickness</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: '18 mm', note: 'Standard Residential', factor: 'Baseline' },
                { label: '20 mm', note: 'Enhanced Structural', factor: '+12% Rate' },
                { label: '30 mm', note: 'Commercial / Countertops', factor: '+28% Rate' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setThickness(item.label)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    thickness === item.label
                      ? 'border-[#886d4b] bg-[#fbf8f3] ring-1 ring-[#886d4b]'
                      : 'border-stone-200 bg-stone-50/50 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-stone-900">{item.label}</span>
                    <span className="text-[10px] text-[#886d4b] font-medium">{item.factor}</span>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5 leading-tight font-light">{item.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Slab Quantity & Wastage Allowance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quantity */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-900 flex items-center justify-between font-sans">
                <span>3. Number of Slabs</span>
                <span className="text-[11px] text-stone-400 font-light">
                  (~{calculations.totalNetSqFt} sq. ft. net)
                </span>
              </label>
              <div className="flex items-center border border-stone-300 rounded bg-white p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 text-stone-600 hover:text-stone-900 rounded hover:bg-stone-100 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  className="flex-1 text-center text-xs font-mono font-medium text-stone-900 border-none focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1.5 text-stone-600 hover:text-stone-900 rounded hover:bg-stone-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Wastage */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-900 flex items-center justify-between font-sans">
                <span>Wastage Allowance</span>
                <span className="text-[11px] text-[#886d4b] font-medium">{wastagePercent}%</span>
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { label: '5%', desc: 'Exact cut' },
                  { label: '10%', desc: 'Standard' },
                  { label: '15%', desc: 'Bookmatch' },
                ].map((w) => {
                  const val = parseInt(w.label);
                  return (
                    <button
                      key={w.label}
                      type="button"
                      onClick={() => setWastagePercent(val)}
                      className={`py-1.5 px-2 rounded text-center text-[11px] font-medium border transition-all ${
                        wastagePercent === val
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {w.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. Optional Fabrication & Protection Add-ons */}
          <div className="space-y-2 pt-1 border-t border-stone-100">
            <label className="text-xs font-medium text-stone-900 flex items-center gap-1.5 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#886d4b]" />
              <span>4. Fabrication & Finishing (Optional)</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {/* Edge Profiling */}
              <div className="p-2.5 rounded-lg border border-stone-200 bg-stone-50/60 flex flex-col justify-between">
                <span className="text-[11px] font-medium text-stone-800">Edge Profiling</span>
                <select
                  value={edgeTreatment}
                  onChange={(e) => setEdgeTreatment(e.target.value as any)}
                  className="mt-1 w-full text-[11px] px-2 py-1.5 border border-stone-300 rounded bg-white focus:outline-none"
                >
                  <option value="none">Raw Factory Edge (Included)</option>
                  <option value="mitred">Mitred 45° Waterfall (+PKR 850/ft)</option>
                  <option value="bullnose">Double Chamfer / Bullnose (+PKR 650/ft)</option>
                </select>
              </div>

              {/* Stone Sealer */}
              <label className="p-2.5 rounded-lg border border-stone-200 bg-stone-50/60 flex items-center justify-between cursor-pointer select-none">
                <div>
                  <div className="text-[11px] font-medium text-stone-800">Deep Stone Penetrating Sealer</div>
                  <div className="text-[10px] text-stone-500 font-light">Dual-coat stain repellent treatment</div>
                </div>
                <input
                  type="checkbox"
                  checked={includeSealant}
                  onChange={(e) => setIncludeSealant(e.target.checked)}
                  className="w-4 h-4 text-[#886d4b] rounded border-stone-300 focus:ring-0"
                />
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SUMMARY & QUOTE BREAKDOWN (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-stone-50 rounded-xl p-5 border border-stone-200/90 shadow-2xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <span className="text-xs font-medium uppercase tracking-wider text-stone-800 font-sans">
                Specification Summary
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#886d4b]/15 text-[#886d4b] font-medium">
                BOQ Estimate
              </span>
            </div>

            {/* Metrics Breakdown Table */}
            <div className="space-y-2 text-xs divide-y divide-stone-200/60 font-light">
              <div className="flex justify-between items-center py-1">
                <span className="text-stone-500">Dimensions per Slab:</span>
                <span className="font-mono font-medium text-stone-900">
                  {activeLength.toFixed(1)} ft × {activeWidth.toFixed(1)} ft ({calculations.singleSlabSqFt} sq. ft.)
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-stone-500">Quantity of Slabs:</span>
                <span className="font-mono font-medium text-stone-900">{quantity} Slabs</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-stone-500">Gross Coverage (w/ {wastagePercent}% buffer):</span>
                <span className="font-mono font-medium text-stone-900">{calculations.grossSqFt} sq. ft.</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-stone-500">Adjusted Rate per sq. ft. ({thickness}):</span>
                <span className="font-mono font-medium text-stone-900">
                  PKR {calculations.baseRatePerSqFt.toLocaleString()}
                </span>
              </div>

              {calculations.edgeCost > 0 && (
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-500">Edge Treatment ({edgeTreatment}):</span>
                  <span className="font-mono font-medium text-stone-800">
                    +PKR {calculations.edgeCost.toLocaleString()}
                  </span>
                </div>
              )}

              {calculations.sealantCost > 0 && (
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-500">Stone Sealant Application:</span>
                  <span className="font-mono font-medium text-stone-800">
                    +PKR {calculations.sealantCost.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-1">
                <span className="text-stone-500 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-stone-400" />
                  Estimated Material Weight:
                </span>
                <span className="font-mono text-stone-700">~{calculations.totalWeightKg.toLocaleString()} kg</span>
              </div>
            </div>

            {/* Total Estimated Cost Callout */}
            <div className="p-4 rounded-lg bg-stone-900 text-white space-y-1 mt-3">
              <div className="text-[10px] text-[#d5c1a4] uppercase tracking-widest font-sans font-medium">
                Estimated Project Investment
              </div>
              <div className="font-editorial text-2xl sm:text-3xl font-normal tracking-tight text-white">
                PKR {calculations.totalEstimatedCost.toLocaleString()}
              </div>
              <div className="text-[10px] text-stone-400 font-light">
                Avg. PKR {Math.round(calculations.totalEstimatedCost / calculations.grossSqFt).toLocaleString()} / sq. ft. all-inclusive
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 space-y-2">
            <button
              type="button"
              onClick={handleApply}
              className="w-full py-3 bg-[#886d4b] hover:bg-[#73593b] text-white text-xs font-medium tracking-wider uppercase rounded shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#d5c1a4]" />
              <span>Apply to Specification Quote ({quantity} Slabs)</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full py-2 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs font-medium rounded flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Share Calculation to WhatsApp</span>
            </button>

            <p className="text-[10px] text-stone-400 text-center flex items-center justify-center gap-1 font-light">
              <ShieldCheck className="w-3 h-3 text-[#886d4b]" />
              <span>Price lock guaranteed for 14 days upon BOQ submission</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
