import { useContext, useEffect, useRef, useState } from "react";
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
    TooltipComponent,
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([
    TooltipComponent,
    PieChart,
    SVGRenderer,
    LabelLayout
]);

import AdminTile from "../admin-tile";
import { Access } from "../../types";
import { AppStateContext } from "../../app-context";
import { he } from "date-fns/locale";

export const AppCount = AdminTile(function () {

    const { theme } = useContext(AppStateContext);

    const [option, setOption] = useState({});

    useEffect(() => {
        fetch('https://wycode.cn/node/analysis/apps')
            .then(res => res.json())
            .then(res => {
                console.log('apps->', res, theme);
                if (res.success) {
                    const data = res.payload.map((app: Access) => ({ value: app.pre_monthly, name: app._id }));
                    setOption({
                        backgroundColor: 'transparent',
                        tooltip: {
                            trigger: 'item'
                        },
                        series: [
                            {
                                type: 'pie',
                                data,
                                label: {
                                    position: 'inner',
                                    formatter: '{b}\n{d}%'
                                },
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
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
            className="w-48 h-48" />
    )
});