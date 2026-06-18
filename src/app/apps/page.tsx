import { Metadata } from 'next';
import Image from 'next/image';
import GithubIcon from '@/components/svg/github';
import ExternalLinkIcon from '@/components/svg/external-link';
import Comments from '@/components/comments';
import { getRandomColorById } from '@/utils/style-utils';

interface AppItem {
  title: string;
  img1: string;
  img2?: string;
  github?: string;
  link?: string;
  detail: string;
  deprecated?: string;
  large?: boolean;
  type: string;
  techStacks: string[];
}

const PAGE_TITLE = "我的一些个人实验项目，涵盖不同技术栈和应用场景";

export default function AppsPage() {
  const apps: AppItem[] = [
    {
      title: "青衿AI",
      img1: "/apps/qingjin.png",
      link: "https://ai.wycode.cn",
      detail: "《青衿AI》有记忆，有生活，会做梦，会玩手机，真正活着的AI伴侣",
      type: "AI应用",
      techStacks: ["NextJS", "React", "TypeScript", "SQLite"]
    },
    {
      title: "ONI产物计算器",
      img1: "/apps/oni.jpg",
      github: "https://github.com/wangyucode/oni",
      detail: "计算《缺氧》游戏中的建筑、动物、植物、相变产物平衡的小工具",
      type: "Web+小程序",
      techStacks: ["微信小程序", "Taro", "React", "TypeScript", "MongoDB"]
    },
    {
      title: "3D滚蛋吧",
      img1: "/apps/roll.jpg",
      detail: "微信扫一扫，一起来玩滚蛋吧，看谁滚的远...😂",
      type: "小游戏",
      techStacks: ["微信小程序", "LayaBox", "TypeScript"]
    },
    {
      title: "跨平台剪切板",
      img1: "/apps/clipboard.jpg",
      link: "/clipboard",
      detail: "跨平台跨网络发送文字，保存信息？最简单的方式：使用 跨平台剪切板 即可：",
      type: "Web工具+小程序",
      techStacks: ["微信小程序", "JavaScript", "Node.js", "Koa", "MongoDB"]
    },
    {
      title: "Dogger",
      img1: "/apps/dogger.png",
      link: "/manage/dogger",
      github: "https://github.com/wangyucode/dogger",
      detail: "Dogger 是一个使用Rust和React编写的简单、快速Docker Web UI，旨在通过一个Web UI查看，管理你的Containers 和 Images。",
      large: true,
      type: "开源工具项目",
      techStacks: ["Rust", "React", "Vite", "Docker"]
    },
    {
      title: "SQLite WebUI",
      img1: "/apps/sqlite.png",
      large: true,
      link: "/manage/sqlite",
      github: "https://github.com/wangyucode/rust-sqlite-webui",
      detail: "基于 Rust (Axum) 和 Solid.js 的 极致轻量 SQLite Web 管理工具。",
      type: "开源工具项目",
      techStacks: ["Rust", "Solid", "SQLite"]
    },
    {
      title: "Crane",
      img1: "/apps/crane.jpg",
      github: "https://github.com/wangyucode/crane",
      detail: "Crane 是一个使用 Rust 编写的简单、快速且安全的工具，用于下载和部署您的 .tar.gz 归档文件，无需服务器密码或密钥。",
      type: "工具",
      techStacks: ["Rust", "Linux", "Docker"]
    },
    {
      title: "sftp-upload-action",
      img1: "/apps/sftp.jpeg",
      github: "https://github.com/wangyucode/sftp-upload-action",
      detail: "这是一个 GitHub Actions，用于将文件通过SFTP协议部署到服务器。",
      type: "开源工具项目",
      techStacks: ["Linux", "Docker"]
    },
    {
      title: "Websocket聊天室",
      img1: "/apps/chat1.png",
      img2: "/apps/chat2.png",
      link: "/lab/chat",
      detail: "基于Websocket的网页聊天室，无需注册，完全匿名，清理记录，掉线重连：",
      large: true,
      type: "Web应用",
      techStacks: ["WebSocket", "React", "Node.js", "Koa"],
      deprecated: "暂时下线"
    },
    {
      title: "西安公共自行车",
      img1: "/apps/bike1.png",
      img2: "/apps/bike2.png",
      github: "https://github.com/wangyucode/XiAnBike",
      detail: "开源、纯净、无广告；省电、安全、不推送；适配安卓2.3至安卓7.1的纯净版西安自行车网点查询来了，还你一个简单纯净的出行APP，立即下载：",
      large: true,
      type: "Android应用",
      techStacks: ["Java", "Android", "高德地图"],
      deprecated: "已停止维护，建议使用共享单车"
    },
    {
      title: "局域网五子棋",
      img1: "/apps/fiveChess.png",
      github: "https://github.com/wangyucode/FiveChess",
      detail: "JavaFX技术实现的五子棋，可以局域网对局，可以聊天，可以自动判定胜负，可以悔棋，总代码不超过1000行，编译后仅18KB",
      large: true,
      type: "桌面应用",
      techStacks: ["Java", "JavaFX", "Socket"]
    },
    {
      title: "DOTA2英雄技能物品天梯助手",
      img1: "/apps/dota.jpg",
      detail: "玩DOTA2，查英雄，查物品，查赛事，查天梯排行就看DOTA2英雄技能物品天梯助手",
      deprecated: "已下架 2022年11月",
      type: "微信小程序",
      techStacks: ["微信小程序", "JavaScript", "Node.js", "Koa", "MongoDB"]
    },
    {
      title: "养鱼小助手",
      img1: "/apps/fish.jpg",
      detail: "造福鱼友：查养鱼攻略，查鱼类品种，问答社区",
      deprecated: "已下架 2020年3月",
      type: "微信小程序",
      techStacks: ["微信小程序", "JavaScript", "Node.js", "Koa", "MongoDB"]
    },
    {
      title: "宝宝圈亲友云相册",
      img1: "/apps/album.jpg",
      github: "https://github.com/wangyucode/baby-album-achive",
      detail: "记录宝宝成长，上传云相册永不丢失，分享给宝宝的亲友们，即可共同查看和管理宝宝照片。也可以用于情侣，家人，同学共同维护的私人云相册。",
      deprecated: "已下架 2021年11月",
      type: "社交应用",
      techStacks: ["微信小程序", "JavaScript", "Node.js", "Koa", "MongoDB"]
    },
    {
      title: "Wengine",
      github: "https://github.com/wangyucode/Wengine-android",
      img1: "/apps/wengine.jpg",
      detail: "Wengine是一款轻量级Android游戏引擎，使用纯Java开发，可以用极少的代码实现一些简单的小游戏，目前有5款demo，打砖块，天天跑酷，FlappyBird，打飞机，蛇蛇大作战",
      type: "游戏引擎",
      techStacks: ["Java", "Android", "游戏开发"],
      deprecated: "已停止维护, 建议使用其它商业/开源游戏引擎"
    }
  ];

  return (
    <div className="container mx-auto p-4">
      {/* 页面标题卡片 */}
      <div className="card bg-base-100 shadow-lg mb-4">
        <div className="card-body">
          <h1 className="text-lg font-bold text-center">{PAGE_TITLE}</h1>

          {/* 项目统计 */}
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="text-center">
              <div className="font-bold text-lg">{apps.length}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">总项目数</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">{apps.filter(app => app.github).length}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">开源项目</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">{apps.filter(app => !app.deprecated).length}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">活跃项目</div>
            </div>
          </div>
        </div>
      </div>

      {/* 项目网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {apps.map((app, index) => (
          <div
            key={index}
            className={`card bg-base-100 shadow-sm ${app.large ? 'sm:col-span-2' : ''}`}
          >
            <div className="card-body flex flex-col gap-4">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold flex items-center flex-1">
                  {app.title}
                  <span className="ml-1 text-xs px-2 py-0.5 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded">
                    {app.type}
                  </span>
                </h3>
                <div className="flex gap-2">
                  {app.github && (
                    <a
                      href={app.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-ghost btn-circle hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="查看源码"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  )}
                  {app.link && (
                    <a
                      href={app.link}
                      target={app.link.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-ghost btn-circle hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="直接访问"
                    >
                      <ExternalLinkIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {app.deprecated && (
                <div className="alert alert-error alert-soft">
                  {app.deprecated}
                </div>
              )}

              <div className="flex gap-2">
                <img
                  src={app.img1}
                  alt={app.title}
                  className="flex-1 max-h-48 md:max-h-96 object-contain hover:scale-105 transition-transform duration-300 rounded-lg border border-slate-200 dark:border-slate-700"
                />
                {app.img2 && (
                  <img
                    src={app.img2}
                    alt={`${app.title}`}
                    className="flex-1 max-h-48 md:max-h-96 object-contain hover:scale-105 transition-transform duration-300 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-400">
                {app.detail}
              </p>

              {/* 技术栈标签 */}
              <div className="flex flex-wrap gap-2 mt-2">
                {app.techStacks.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`px-3 py-1 rounded-full text-sm ${getRandomColorById(tech)} text-slate-800 dark:text-slate-200`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Comments />
    </div>
  );
}

// 设置页面元数据
export const metadata: Metadata = {
  title: '个人项目 | 王郁的小站',
  description: PAGE_TITLE,
};