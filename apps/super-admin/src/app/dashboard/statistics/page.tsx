'use client'

import ScoreChartPanel from "@/app/dashboard/statistics/ScoreChartPanel.tsx";
import LineChartPanel from "@/app/dashboard/statistics/LineChartPanel.tsx";

function StatisticsPage() {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <ScoreChartPanel/>
            <LineChartPanel />
        </div>
    );
}

export default StatisticsPage;