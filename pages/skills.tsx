import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { GraphChart, GraphSeriesOption } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";
import {
  LegendComponent,
  LegendComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from "echarts/components";

import Layout from "../components/layout";
import Comments from "../components/comment/comments";
import { useContext } from "react";
import { AppStateContext } from "../components/app-context";

export default function Skills() {
  const { theme } = useContext<any>(AppStateContext);

  echarts.use([
    GraphChart,
    SVGRenderer,
    TooltipComponent,
    LegendComponent,
  ]);

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
          fontSize: 16,
        },
        color:[
          "#fb923c",
          "#a3e635",
          "#34d399",
          "#2dd4bf",
          "#f87171"
        ],
        draggable: true,
        force: {
          edgeLength: 100,
          repulsion: 1000,
          gravity: 0.3,
        },
        categories: [
          { name: "默认" },
          { name: "在用" },
          { name: "用过" },
          { name: "用过很久了" }
        ],
        data: [
          { name: "平台", symbolSize: 60, x: 0, y: 0},
          { name: "工具", symbolSize: 60, x: 100, y: 0 },
          { name: "语言", symbolSize: 60, x: 100, y: 100 },
          { name: "框架", symbolSize: 60, x: 0, y: 100 },
          { name: "Android", symbolSize: 40, category: "用过" },
          { name: "iOS", symbolSize: 20, category: "用过很久了" },
          { name: "Browser", symbolSize: 50, category: "在用" },
          { name: "Unity", symbolSize: 40, category: "用过" },
          { name: "Flutter", symbolSize: 30, category: "用过很久了" },
          { name: "Node.js", symbolSize: 50, category: "在用" },
          { name: "小程序", symbolSize: 50, category: "在用" },
          { name: "Java", symbolSize: 50, category: "在用" },
          { name: "Kotlin", symbolSize: 50, category: "在用" },
          { name: "Javascript", symbolSize: 50, category: "在用" },
          { name: "Typescript", symbolSize: 50, category: "在用" },
          { name: "C#", symbolSize: 30, category: "用过" },
          { name: "Rust", symbolSize: 40, category: "在用" },
          { name: "Swift", symbolSize: 20, category: "用过很久了" },
          { name: "Objective-C", symbolSize: 20, category: "用过很久了" },
          { name: "Angular", symbolSize: 40, category: "在用" },
          { name: "AngularJS", symbolSize: 40, category: "在用" },
          { name: "React", symbolSize: 50, category: "在用" },
          { name: "Next.js", symbolSize: 50, category: "在用" },
          { name: "VUE", symbolSize: 30, category: "用过很久了" },
          { name: "Linux", symbolSize: 40, category: "在用" },
          { name: "Github Actions", symbolSize: 50, category: "在用" },
          { name: "Docker", symbolSize: 50, category: "在用" },
          { name: "Docker Compose", symbolSize: 50, category: "在用" },
          { name: "Spring", symbolSize: 50, category: "在用" },
          { name: "MongoDB", symbolSize: 50, category: "在用" },
          { name: "Git", symbolSize: 50, category: "在用" },
        ],
        links: [
          { source: "平台", target: "Android" },
          { source: "平台", target: "语言" },
          { source: "语言", target: "框架" },
          { source: "框架", target: "工具" },
          { source: "工具", target: "平台" },
          { source: "平台", target: "Android" },
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
          { source: "工具", target: "Github Actions" },
          { source: "工具", target: "Docker" },
          { source: "框架", target: "Spring" },
          { source: "工具", target: "MongoDB" },
          { source: "工具", target: "Git" },
          { source: "工具", target: "Github Actions" },
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
          { source: "工具", target: "Linux" },
        ],
      },
    ],
  };

  return (
    <Layout>
      <div className="p-4 max-w-7xl mx-auto flex flex-col items-center">
        <div className="my-4 w-full h-4/5">
          <ReactECharts
            echarts={echarts}
            option={option}
            theme={theme}
            style={{ height: "864px" }}
            className="w-full"
          />
        </div>
        <Comments />
      </div>
    </Layout>
  );
}
