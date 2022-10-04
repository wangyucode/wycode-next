import { useContext, useEffect, useState } from "react";
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
    TooltipComponent,
    GridComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([
    GridComponent,
    TooltipComponent,
    LineChart,
    SVGRenderer
]);

import AdminTile from "../admin-tile";
import { AppStateContext } from "../../app-context";

export const AccessRecord = AdminTile(function ({ data }: { data: []}) {
    const { theme } = useContext<{ theme: string }>(AppStateContext);
    const dates: string[] = [];
    const pv: number[] = [];
    const uv: number[] = [];
    const fv: number[] = [];
    data.forEach((record: any) => {
        dates.push(record.date);
        pv.push(record.pv);
        uv.push(record.uv);
        fv.push(record.fv || 0);
    });
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            top: '3%',
            left: '0',
            right: '3%',
            bottom: 0,
            containLabel: true
        },
        xAxis: {
            data: dates,
            boundaryGap: false,
            axisLabel: {
                rotate: 60,
                interval: 0
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: pv,
                name: 'pv',
                type: 'line',
                areaStyle: {}
            },
            {
                data: uv,
                name: 'uv',
                type: 'line',
                areaStyle: {}
            },
            {
                data: fv,
                name: 'fv',
                type: 'line',
                areaStyle: {}
            },
        ]
    };

    return (
        <ReactECharts
            echarts={echarts}
            option={option}
            theme={theme}
            style={{ height: '192px' }}
            className="w-[256px] sm:w-[384px] md:w-[512px]" />
    )
});