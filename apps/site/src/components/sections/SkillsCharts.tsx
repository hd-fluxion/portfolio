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
      <div className="glass h-72 rounded-2xl p-4">
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
      </div>
      <div className="glass h-72 rounded-2xl p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Strength by Domain
        </p>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis domain={[0, 5]} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  background: "#0b0f1a",
                  border: "1px solid #334155",
                  color: "#e2e8f0",
                }}
              />
              <Bar dataKey="value" fill="#f4f1ea" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
