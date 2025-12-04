import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { useVillage } from '@/contexts/VillageContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';

export function RadarChartProfile() {
    const { gauges } = useVillage();
    const { highContrast } = useAccessibility();

    const data = [
        { subject: 'Coût', A: gauges.cost, fullMark: 100, emoji: '💰' },
        { subject: 'Écologie', A: gauges.ecology, fullMark: 100, emoji: '🌍' },
        { subject: 'Autonomie', A: gauges.autonomy, fullMark: 100, emoji: '🔓' },
        { subject: 'Inclusion', A: gauges.inclusion, fullMark: 100, emoji: '👥' },
    ];

    // Couleurs dynamiques selon le mode accessibilité
    const strokeColor = highContrast ? '#ffff00' : '#10b981'; // Yellow vs Primary Green
    const fillColor = highContrast ? '#ffff00' : '#10b981';
    const textColor = highContrast ? '#ffffff' : '#374151';

    return (
        <div className="w-full h-[300px] md:h-[400px] bg-card/50 rounded-2xl p-4">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke={highContrast ? '#666' : '#e5e7eb'} />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: textColor, fontSize: 14, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Ton Lycée"
                        dataKey="A"
                        stroke={strokeColor}
                        strokeWidth={3}
                        fill={fillColor}
                        fillOpacity={0.5}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: highContrast ? '#000' : '#fff',
                            borderColor: highContrast ? '#fff' : '#e5e7eb',
                            borderRadius: '12px',
                            color: textColor
                        }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
