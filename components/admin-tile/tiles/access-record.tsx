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

export const AccessRecord = AdminTile(function () {

    const { theme } = useContext(AppStateContext);

    const [option, setOption] = useState({});

    useEffect(() => {
        fetch('https://wycode.cn/node/analysis/records')
            .then(res => res.json())
            .then(res => {
                console.log('records->', res);
                if (res.success) {
                    const dates: string[] = [];
                    const pv: number[] = [];
                    const uv: number[] = [];
                    res.payload.records.forEach((record: any) => {
                        dates.push(record.date);
                        pv.push(record.pv);
                        uv.push(record.uv);
                    });
                    setOption({
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
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            data: dates,
                            boundaryGap: false,
                            axisLabel: {
                                rotate: 60
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

                        ]
                    });
                }
            });
    }, []);

    return (
        <ReactECharts
            echarts={echarts}
            option={option}
            theme={theme}
            style={{ height: '192px' }}
            className="w-[256px] sm:w-[384px] md:w-[512px]" />
    )
});