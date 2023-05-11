import Layout from "../components/layout";
import App from "../components/apps/app";
import Comments from "../components/comment/comments";

export default function Apps() {
    return (
        <Layout>
            <div
                className="p-4 flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-flow-row-dense max-w-7xl mx-auto">
                <App title="3D滚蛋吧" img1="/apps/roll.jpg" detail="微信扫一扫，一起来玩滚蛋吧，看谁滚的远...😂" />
                <App title="跨平台剪切板" img1="/apps/clipboard.jpg" link="/clipboard"
                    detail="跨平台跨网络发送文字，保存信息？最简单的方式：使用 跨平台剪切板 即可：" />
                
                <App title="暗黑破坏神不朽小助手" img1="/apps/diablo.jpg" detail="玩暗黑，查询职业、技能、物品、怪物、宝石、套装、传奇装备。" />
                <App title="谁是卧底发牌员" large img1="/apps/dealer1.png" img2="/apps/dealer2.png"
                    deprecated="暂停维护"
                    github="https://github.com/wangyucode/dealer" detail="线下聚会必备，只需要一个网页链接就能一起玩..." />
                <App title="Websocket聊天室" large img1="/apps/chat1.png" img2="/apps/chat2.png" link="/lab/chat"
                    detail="基于Websocket的网页聊天室，无需注册，完全匿名，清理记录，掉线重连：" />
                <App title="西安公共自行车" large img1="/apps/bike1.png" img2="/apps/bike2.png" link="/apps/bike.apk"
                    github="https://github.com/wangyucode/XiAnBike"
                    detail="开源、纯净、无广告；省电、安全、不推送；适配安卓2.3至安卓7.1的纯净版西安自行车网点查询来了，还你一个简单纯净的出行APP，立即下载：" />
                <App title="局域网五子棋" large img1="/apps/fiveChess.png"
                    github="https://github.com/wangyucode/FiveChess"
                    detail="JavaFX技术实现的五子棋，可以局域网对局，可以聊天，可以自动判定胜负，可以悔棋，总代码不超过1000行，编译后仅18KB" />
                <App title="DOTA2英雄技能物品天梯助手" img1="/apps/dota.jpg" detail="玩DOTA2，查英雄，查物品，查赛事，查天梯排行就看DOTA2英雄技能物品天梯助手" deprecated="已下架 2022年11月"/>
                <App title="养鱼小助手" img1="/apps/fish.jpg" deprecated="已下架 2020年3月" detail="造福鱼友：查养鱼攻略，查鱼类品种，问答社区" />
                <App title="宝宝圈亲友云相册" img1="/apps/album.jpg"
                    deprecated="已下架 2021年11月"
                    github="https://github.com/wangyucode/baby-album-achive"
                    detail="记录宝宝成长，上传云相册永不丢失，分享给宝宝的亲友们，即可共同查看和管理宝宝照片。也可以用于情侣，家人，同学共同维护的私人云相册。" />
                <App title="Wengine"
                    github="https://github.com/wangyucode/Wengine-android"
                    detail="Wengine是一款轻量级Android游戏引擎，使用纯Java开发，可以用极少的代码实现一些简单的小游戏，目前有5款demo，打砖块，天天跑酷，FlappyBird，打飞机，蛇蛇大作战" />
                <div className="sm:col-span-2 md:col-span-3 lg:col-span-4"><Comments /></div>
            </div>
        </Layout>
    );
}