'use client';

import {useMemo, useState} from 'react';
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
  TooltipProps,
  type LegendProps
} from 'recharts';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {cn} from '@/lib/utils';

export type UseOfProceedsItem = {
  item: string;
  pct: number;
  sar: number;
};

const COLORS = ['#03735F', '#03423C', '#E7D2A0', '#0F1F1C', '#4ba598', '#6f8a7d', '#b5aa8c'];

export function UseOfProceeds({
  items,
  ask,
  rationale,
  tableLabel,
  chartLabel,
  legendLabel,
  columnTitle
}: {
  items: UseOfProceedsItem[];
  ask: string;
  rationale: string;
  tableLabel: string;
  chartLabel: string;
  legendLabel: string;
  columnTitle: string;
}) {
  const totalPct = useMemo(() => items.reduce((sum, item) => sum + item.pct, 0), [items]);
  if (Math.abs(totalPct - 100) > 0.01) {
    throw new Error('Use of proceeds must equal 100%');
  }

  const [activeKeys, setActiveKeys] = useState(() => new Set(items.map((item) => item.item)));

  const handleToggle = (key: string) => {
    setActiveKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next.size === 0 ? prev : next;
    });
  };

  const filtered = items.filter((item) => activeKeys.has(item.item));

  const handleLegendClick: LegendProps['onClick'] = (entry) => {
    if (!entry || typeof entry.id !== 'string') return;
    handleToggle(entry.id);
  };

  return (
    <section className="container-responsive mt-24" aria-labelledby="use-of-proceeds">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-4">
          <p className="text-gradient text-sm font-semibold uppercase tracking-widest" id="use-of-proceeds">
            {legendLabel}
          </p>
          <h2 className="text-3xl font-bold text-ink dark:text-mist">{ask}</h2>
          <p className="text-sm text-ink/70 dark:text-mist/70">{rationale}</p>
        </div>
        <Tabs defaultValue="table" className="glass-card">
          <TabsList>
            <TabsTrigger value="table">{tableLabel}</TabsTrigger>
            <TabsTrigger value="chart">{chartLabel}</TabsTrigger>
          </TabsList>
          <TabsContent value="table">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-ink/10 text-sm dark:divide-mist/10">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-widest text-ink/70 dark:text-mist/70">
                    <th className="py-3">{columnTitle}</th>
                    <th className="py-3">%</th>
                    <th className="py-3">SAR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10 dark:divide-mist/10">
                  {items.map((row, idx) => (
                    <tr key={row.item} className="transition hover:bg-ink/5 dark:hover:bg-mist/10">
                      <td className="py-3 pr-4 font-medium text-ink dark:text-mist">
                        <button
                          type="button"
                          onClick={() => handleToggle(row.item)}
                          className="flex items-center gap-2"
                          aria-pressed={activeKeys.has(row.item)}
                        >
                          <span
                            className={cn('h-3 w-3 rounded-full', {
                              'opacity-30': !activeKeys.has(row.item)
                            })}
                            style={{backgroundColor: COLORS[idx % COLORS.length]}}
                          />
                          {row.item}
                        </button>
                      </td>
                      <td className="py-3 pr-4 text-forest dark:text-sand">{row.pct}%</td>
                      <td className="py-3 text-ink/80 dark:text-mist/80">
                        SAR {row.sar.toLocaleString('en-US')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="chart">
            <div className="h-[340px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={filtered}
                    dataKey="pct"
                    nameKey="item"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={3}
                  >
                    {filtered.map((entry, index) => (
                      <Cell key={entry.item} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{paddingTop: 16}}
                    payload={items.map((entry, index) => ({
                      id: entry.item,
                      type: 'circle',
                      value: entry.item,
                      color: COLORS[index % COLORS.length],
                      inactive: !activeKeys.has(entry.item)
                    }))}
                    onClick={handleLegendClick}
                    formatter={(value: any) => <span className="text-xs text-ink/70 dark:text-mist/70">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function CustomTooltip({active, payload}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  return (
    <div className="rounded-2xl border border-ink/10 bg-mist/95 p-4 text-xs shadow-soft dark:border-mist/10 dark:bg-ink/90">
      <p className="font-semibold text-ink dark:text-mist">{entry.name}</p>
      <p className="text-forest dark:text-sand">{entry.value}%</p>
    </div>
  );
}
