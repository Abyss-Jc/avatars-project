'use client';

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ConversationChartProps {
    timeRange: string;
}

export function ConversationChart({ timeRange }: ConversationChartProps) {
    const data = [
        { time: '00:00', admissions: 45, student: 32, academic: 28, tech: 15 },
        { time: '04:00', admissions: 38, student: 28, academic: 22, tech: 12 },
        { time: '08:00', admissions: 95, student: 68, academic: 52, tech: 35 },
        { time: '12:00', admissions: 125, student: 88, academic: 68, tech: 45 },
        { time: '16:00', admissions: 108, student: 75, academic: 58, tech: 38 },
        { time: '20:00', admissions: 72, student: 52, academic: 42, tech: 28 },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.24 0.02 264)" />
                <XAxis dataKey="time" stroke="oklch(0.60 0.015 264)" style={{ fontSize: '12px' }} />
                <YAxis stroke="oklch(0.60 0.015 264)" style={{ fontSize: '12px' }} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'oklch(0.16 0.015 264)',
                        border: '1px solid oklch(0.24 0.02 264)',
                        borderRadius: '8px',
                        color: 'oklch(0.98 0.01 264)',
                    }}
                />
                <Line type="monotone" dataKey="admissions" stroke="oklch(0.65 0.25 264)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="student" stroke="oklch(0.60 0.20 220)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="academic" stroke="oklch(0.70 0.18 285)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="tech" stroke="oklch(0.55 0.15 310)" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
}
