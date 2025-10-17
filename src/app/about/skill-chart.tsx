'use client'
import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { GraphChart, GraphSeriesOption } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import {
    LegendComponent,
    LegendComponentOption,
    TooltipComponent,
    TooltipComponentOption,
} from 'echarts/components';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { SKILLS_OPTION } from './skills';

// 注册 echarts 组件
echarts.use([
    GraphChart,
    SVGRenderer,
    TooltipComponent,
    LegendComponent,
]);


const SkillChart: React.FC = () => {
    return (
        <div className="card bg-base-100 shadow-sm mb-6">
            <div className="card-body">
                <h3 className="card-title flex items-center mb-4">
                    <PuzzlePieceIcon className="mr-2 h-5 w-5" /> 技能图谱
                </h3>
                <div className="h-[600px] w-full">
                    <ReactECharts
                        echarts={echarts}
                        option={SKILLS_OPTION}
                        style={{ height: '100%', width: '100%' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SkillChart;