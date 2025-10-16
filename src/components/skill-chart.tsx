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

// 注册 echarts 组件
echarts.use([
    GraphChart,
    SVGRenderer,
    TooltipComponent,
    LegendComponent,
]);

// GraphChart 配置
const option: echarts.ComposeOption<
    TooltipComponentOption | GraphSeriesOption | LegendComponentOption
> = {
    backgroundColor: "transparent",
    tooltip: {},
    legend: [
        {
            data: ["在用", "用过", "用过很久了", "准备学"],
        },
    ],
    series: [
        {
            type: "graph",
            layout: "force",
            label: {
                show: true,
                fontSize: 12,
            },
            color: [
                "#3b82f6", // 蓝色 - 代表主要技能
                "#10b981", // 绿色 - 代表熟练技能
                "#f59e0b", // 橙色 - 代表一般技能
                "#8b5cf6", // 紫色 - 代表辅助技能
                "#ec4899"  // 粉色 - 代表其他技能
            ],
            draggable: true,
            force: {
                edgeLength: 60,       // 连线长度
                repulsion: 1000,      // 斥力
                gravity: 1,         // 重力
                layoutAnimation: true, // 局动画，使布局更稳定
                friction: 0.6        // 摩擦系数，减缓节点运动
            },
            roam: true,              // 允许缩放和平移，方便查看
            scaleLimit: {
                min: 0.5,
                max: 2
            },
            categories: [
                { name: "默认" },
                { name: "在用" },
                { name: "用过" },
                { name: "用过很久了" }
            ],
            data: [
                { name: "平台", symbolSize: 45, x: 0, y: 0 },
                { name: "工具", symbolSize: 45, x: 100, y: 0 },
                { name: "语言", symbolSize: 45, x: 100, y: 100 },
                { name: "框架", symbolSize: 45, x: 0, y: 100 },
                { name: "Android", symbolSize: 30, category: "用过" },
                { name: "iOS", symbolSize: 15, category: "用过很久了" },
                { name: "Browser", symbolSize: 38, category: "在用" },
                { name: "Unity", symbolSize: 30, category: "用过" },
                { name: "Flutter", symbolSize: 23, category: "用过很久了" },
                { name: "Node.js", symbolSize: 38, category: "在用" },
                { name: "小程序", symbolSize: 38, category: "在用" },
                { name: "Java", symbolSize: 38, category: "在用" },
                { name: "Kotlin", symbolSize: 38, category: "在用" },
                { name: "Javascript", symbolSize: 38, category: "在用" },
                { name: "Typescript", symbolSize: 38, category: "在用" },
                { name: "C#", symbolSize: 23, category: "用过" },
                { name: "Rust", symbolSize: 30, category: "在用" },
                { name: "Swift", symbolSize: 15, category: "用过很久了" },
                { name: "Objective-C", symbolSize: 15, category: "用过很久了" },
                { name: "Angular", symbolSize: 30, category: "在用" },
                { name: "AngularJS", symbolSize: 30, category: "在用" },
                { name: "React", symbolSize: 38, category: "在用" },
                { name: "Next.js", symbolSize: 38, category: "在用" },
                { name: "VUE", symbolSize: 23, category: "用过很久了" },
                { name: "Linux", symbolSize: 30, category: "在用" },
                { name: "Github Actions", symbolSize: 38, category: "在用" },
                { name: "Docker", symbolSize: 38, category: "在用" },
                { name: "Docker Compose", symbolSize: 38, category: "在用" },
                { name: "Spring", symbolSize: 38, category: "在用" },
                { name: "MongoDB", symbolSize: 38, category: "在用" },
                { name: "Git", symbolSize: 38, category: "在用" },
            ],
            links: [
                { source: "平台", target: "Android" },
                { source: "平台", target: "语言" },
                { source: "语言", target: "框架" },
                { source: "框架", target: "工具" },
                { source: "工具", target: "平台" },
                { source: "平台", target: "iOS" },
                { source: "平台", target: "Browser" },
                { source: "平台", target: "Unity" },
                { source: "平台", target: "Flutter" },
                { source: "平台", target: "Node.js" },
                { source: "平台", target: "小程序" },
                { source: "语言", target: "Java" },
                { source: "语言", target: "Kotlin" },
                { source: "语言", target: "Javascript" },
                { source: "语言", target: "Swift" },
                { source: "语言", target: "Objective-C" },
                { source: "语言", target: "Rust" },
                { source: "框架", target: "Angular" },
                { source: "框架", target: "AngularJS" },
                { source: "框架", target: "React" },
                { source: "框架", target: "Next.js" },
                { source: "框架", target: "VUE" },
                { source: "工具", target: "Linux" },
                { source: "平台", target: "Linux" },
                { source: "工具", target: "Docker" },
                { source: "框架", target: "Spring" },
                { source: "工具", target: "MongoDB" },
                { source: "工具", target: "Git" },
                { source: "Angular", target: "Typescript" },
                { source: "AngularJS", target: "Javascript" },
                { source: "iOS", target: "Swift" },
                { source: "iOS", target: "Objective-C" },
                { source: "Swift", target: "Objective-C" },
                { source: "Javascript", target: "Typescript" },
                { source: "小程序", target: "Javascript" },
                { source: "Node.js", target: "Javascript" },
                { source: "小程序", target: "Typescript" },
                { source: "Java", target: "Kotlin" },
                { source: "Android", target: "Kotlin" },
                { source: "Android", target: "Java" },
                { source: "Browser", target: "Javascript" },
                { source: "React", target: "Javascript" },
                { source: "React", target: "Javascript" },
                { source: "React", target: "Next.js" },
                { source: "VUE", target: "Next.js" },
                { source: "Spring", target: "Java" },
                { source: "Spring", target: "Kotlin" },
                { source: "Browser", target: "Typescript" },
                { source: "Node.js", target: "Typescript" },
                { source: "Docker", target: "Docker Compose" },
                { source: "Unity", target: "C#" },
                { source: "语言", target: "C#" },
            ],
        },
    ],
};


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
                        option={option}
                        style={{ height: '100%', width: '100%' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SkillChart;