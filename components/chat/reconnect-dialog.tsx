export default function ReconnectDialog(
  {onConnect, onCancel }: {onConnect: () => void; onCancel: () => void },
) {
  const rid = localStorage.getItem("chat-rid");
  const uid = localStorage.getItem("chat-uid");
  return (
    <>
      <ul className="text-left text-sm">
        <li>💡 你是 {rid} 号房间的 {uid} 号玩家，是否重连？</li>
      </ul>
      <button
        className="w-full mt-2 px-2 py-1 rounded border border-slate-700/30 disabled:bg-slate-500 disabled:active:ring-0 dark:border-slate-300/30 text-slate-100 bg-sky-600 hover:bg-sky-500 active:ring-2"
        onClick={onConnect}
      >
        重连
      </button>
      <button
        className="w-full mt-2 px-2 py-1 rounded border border-slate-700/30 disabled:bg-slate-500 disabled:active:ring-0 dark:border-slate-300/30 text-slate-100 bg-slate-500/5 hover:bg-slate-500/20 active:ring-2"
        onClick={onCancel}
      >
        取消
      </button>
    </>
  );
}
