import Layout from "../components/layout";
import LabItem from "../components/lab/lab-item";
import rollImg from "../public/lab/roll.jpg";
import clipboardImg from "../public/lab/clipboard.jpg";
import dotaImg from "../public/lab/dota.jpg";
import fishImg from "../public/lab/fish.jpg";
import albumImg from "../public/lab/album.jpg";
import chessImg from "../public/lab/fiveChess.png";
import dealer1Img from "../public/lab/dealer1.png";
import dealer2Img from "../public/lab/dealer2.png";
import chat1Img from "../public/lab/chat1.png";
import chat2Img from "../public/lab/chat2.png";
import bike1Img from "../public/lab/bike1.png";
import bike2Img from "../public/lab/bike2.png";

export default function Lab() {
    return (
        <Layout>
            <div
                className="p-4 flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-flow-row-dense max-w-7xl mx-auto">
                <LabItem title="3D滚蛋吧" img1={rollImg} detail="微信扫一扫，一起来玩滚蛋吧，看谁滚的远...😂"/>
                <LabItem title="跨平台剪切板" img1={clipboardImg} link="/clipboard.html"
                         detail="跨平台跨网络发送文字，保存信息？最简单的方式：使用 跨平台剪切板 即可："/>
                <LabItem title="DOTA2英雄技能物品天梯助手" img1={dotaImg} detail="玩DOTA2，查英雄，查物品，查赛事，查天梯排行就看DOTA2英雄技能物品天梯助手"/>
                <LabItem title="谁是卧底发牌员" large img1={dealer1Img} img2={dealer2Img}
                         deprecated="暂停维护"
                         link="https://wycode.cn/dealer/"
                         github="https://github.com/wangyucode/dealer" detail="线下聚会必备，只需要一个网页链接就能一起玩..."/>
                <LabItem title="Websocket聊天室" large img1={chat1Img} img2={chat2Img}
                         deprecated="暂停维护"
                         github="https://github.com/wangyucode/chatroom-angular-antdesign-websocket-stomp"
                         detail="基于Websocket和STOMP协议的网页聊天室，无需注册，完全匿名，聊天记录自动清除，邀请码定时刷新，短线自动重连："/>
                <LabItem title="西安公共自行车" large img1={bike1Img} img2={bike2Img} link="https://wycode.cn/lib/bike.apk"
                         github="https://github.com/wangyucode/XiAnBike"
                         detail="开源、纯净、无广告；省电、安全、不推送；适配安卓2.3至安卓7.1的纯净版西安自行车网点查询来了，还你一个简单纯净的出行APP，立即下载："/>
                <LabItem title="养鱼小助手" img1={fishImg} deprecated="已下架 2020年3月" detail="造福鱼友：查养鱼攻略，查鱼类品种，问答社区"/>
                <LabItem title="局域网五子棋" large img1={chessImg}
                         github="https://github.com/wangyucode/FiveChess"
                         detail="JavaFX技术实现的五子棋，可以局域网对局，可以聊天，可以自动判定胜负，可以悔棋，总代码不超过1000行，编译后仅18KB"/>
                <LabItem title="宝宝圈亲友云相册" img1={albumImg}
                         deprecated="已下架 2021年11月"
                         github="https://github.com/wangyucode/baby-album-achive"
                         detail="记录宝宝成长，上传云相册永不丢失，分享给宝宝的亲友们，即可共同查看和管理宝宝照片。也可以用于情侣，家人，同学共同维护的私人云相册。"/>
                <LabItem title="Wengine"
                         github="https://github.com/wangyucode/Wengine-android"
                         detail="Wengine是一款轻量级Android游戏引擎，使用纯Java开发，对Android开发者友好，可以用极少的代码实现一些简单的小游戏，目前有5款demo，打砖块，天天跑酷，FlappyBird，打飞机，蛇蛇大作战"/>
            </div>
        </Layout>
    );
}