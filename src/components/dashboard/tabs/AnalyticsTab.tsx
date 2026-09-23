import React from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  DollarSign,
  Download,
  PieChart,
  BarChart3,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  CATEGORY_MARGIN_DATA,
  BRAND_PERFORMANCE_DATA,
  REGIONAL_SALES_DATA,
} from '../../../data/dashboardMockData';

interface AnalyticsTabProps {
  showToast: (msg: string) => void;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ showToast }) => {
  const handleExportAnalytics = () => {
    showToast('Exporting Q4 Financial & Category Margin Analytics (Excel / CSV)...');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Margin Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Overall Gross Margin</span>
            <TrendingUp className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-zinc-900 font-sans">
              38.7%
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+2.4% above FY2024 target</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Net Gross Profit</span>
            <DollarSign className="w-4 h-4 text-amber-800" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-zinc-900 font-sans">
              Rs. 18.8M
            </div>
            <div className="text-xs text-zinc-500 mt-1">On Rs. 48.6M monthly turnover</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Highest Margin Line</span>
            <Layers className="w-4 h-4 text-zinc-700" />
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold text-amber-800 font-sans">
              48.2%
            </div>
            <div className="text-xs text-zinc-500 mt-1">Brassware, Concealed Showers</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            <span>Financial Export</span>
            <Download className="w-4 h-4 text-zinc-700" />
          </div>
          <div className="mt-3">
            <button
              onClick={handleExportAnalytics}
              className="w-full py-2 px-3 bg-zinc-900 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Margin Sheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Revenue & Margin Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
                Category Economics
              </span>
              <h3 className="font-serif text-xl font-medium text-zinc-900 tracking-tight mt-0.5">
                Turnover vs COGS by Architectural Product Line (PKR Millions)
              </h3>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={CATEGORY_MARGIN_DATA}
                margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 10, fill: '#71717a' }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    color: '#fff',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '11px',
                  }}
                  formatter={(val: any, name: any) => [
                    `Rs. ${val}M`,
                    name === 'revenue' ? 'Sales Revenue' : 'Cost of Goods (COGS)',
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar
                  dataKey="revenue"
                  name="Sales Revenue"
                  fill="#92400e"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  dataKey="cogs"
                  name="Cost of Goods (COGS)"
                  fill="#71717a"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-zinc-100 mb-4">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
                Geographic Presence
              </span>
              <h3 className="font-serif text-xl font-medium text-zinc-900 tracking-tight mt-0.5">
                Territory Specification Share
              </h3>
            </div>

            <div className="space-y-4">
              {REGIONAL_SALES_DATA.map((reg) => (
                <div key={reg.region} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-800">{reg.region}</span>
                    <span className="font-mono font-bold text-zinc-900">{reg.value}</span>
                  </div>
                  <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-800 rounded-full"
                      style={{ width: `${reg.share}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-zinc-400 text-right">{reg.share}% of volume</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 p-3 bg-amber-50/60 rounded-xl border border-amber-200/50 text-xs text-amber-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
            <span>Islamabad and Rawalpindi sector grew +32% following diplomat suite tenders.</span>
          </div>
        </div>
      </div>

      {/* Brand Margin Breakdown Table */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-sm">
        <div className="p-5 lg:p-6 border-b border-zinc-100">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
            Brand Contribution
          </span>
          <h3 className="font-serif text-2xl font-medium text-zinc-900 tracking-tight mt-0.5">
            Partner Brand Performance & Gross Profit Margin
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50/90 text-xs font-semibold uppercase tracking-wider text-zinc-500 py-3.5 px-6 border-b border-zinc-100">
              <tr>
                <th className="py-3.5 px-6">Brand Name</th>
                <th className="py-3.5 px-6 text-right">Revenue (PKR M)</th>
                <th className="py-3.5 px-6 text-right">Gross Margin %</th>
                <th className="py-3.5 px-6 text-right">Year-over-Year Growth</th>
                <th className="py-3.5 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-800">
              {BRAND_PERFORMANCE_DATA.map((brand) => (
                <tr key={brand.brand} className="hover:bg-zinc-50/60 transition-colors">
                  <td className="py-4 px-6 font-bold text-zinc-900 text-sm">{brand.brand}</td>
                  <td className="py-4 px-6 text-right font-mono font-bold text-sm text-zinc-900">
                    Rs. {brand.revenue}M
                  </td>
                  <td className="py-4 px-6 text-right font-mono font-bold text-sm text-emerald-700">
                    {brand.marginPct}%
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-zinc-700">{brand.growth}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Tier 1 Strategic
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
