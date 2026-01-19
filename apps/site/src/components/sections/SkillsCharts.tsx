"use client";

import { createElement } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Props = {
  radarData: { name: string; level: number }[];
  barData: { name: string; value: number }[];
};

export default function SkillsCharts({ radarData, barData }: Props) {
  return (
    <div className="grid gap-6">
      <div className="glass relative h-72 rounded-2xl p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Radar Overview
        </p>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1f2937" />
              {createElement(Radar as any, {
                dataKey: "level",
                stroke: "#38bdf8",
                fill: "#38bdf8",
                fillOpacity: 0.35,
              })}
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="pointer-events-none absolute inset-0">
          {radarData.map((item, index) => (
            <span
              key={item.name}
              className={[
                "absolute text-xs text-white/60",
                index === 0 && "left-1/2 top-8 -translate-x-1/2",
                index === 1 && "right-6 top-1/3",
                index === 2 && "right-8 bottom-10",
                index === 3 && "left-1/2 bottom-6 -translate-x-1/2",
                index === 4 && "left-8 bottom-10",
                index === 5 && "left-6 top-1/3",
                index === 6 && "right-1/2 top-16 translate-x-1/2",
                index === 7 && "right-6 bottom-1/3",
                index === 8 && "left-6 bottom-1/3",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
      <div className="glass h-72 rounded-2xl p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Strength by Domain
        </p>
        <div className="mt-6 space-y-3">
          {barData.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>{item.name}</span>
                <span>{item.value.toFixed(1)} / 5</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-sand"
                  style={{ width: `${(item.value / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
