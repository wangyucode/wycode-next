import Layout from "../components/layout";


export default function Lab() {
    return (
        <Layout lab>
            <div className="p-4 grid grid-cols-4 grid-flow-row-dense max-w-7xl mx-auto ">
                <div>3D滚蛋吧</div>
                <div>跨平台剪切板</div>
                <div>DOTA2英雄技能物品天梯助手</div>
                <div className="col-span-2">谁是卧底发牌员</div>
                <div className="col-span-2">Websocket聊天室</div>
                <div className="col-span-2">西安公共自行车</div>
                <div>养鱼小助手</div>
                <div>宝宝圈亲友云相册</div>
                <div className="col-span-2">局域网五子棋</div>
                <div>Wengine</div>
            </div>
        </Layout>
    );
}