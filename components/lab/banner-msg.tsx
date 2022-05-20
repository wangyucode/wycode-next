export default function BannerMsg({msg}: any) {
    return (
        <div className="py-2 px-4 my-2 rounded-lg bg-rose-300/50 text-rose-500 border-rose-500 dark:bg-rose-500/50 dark:text-rose-100 border dark:border-rose-300">{msg}</div>
    );
}