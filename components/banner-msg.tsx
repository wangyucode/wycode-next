export default function BannerMsg({type, msg}: any) {
    let colorClasses = 'bg-sky-300/50 text-sky-500 border-sky-500 dark:bg-sky-500/50 dark:text-sky-100 dark:border-sky-300'
    if (type === 'error') colorClasses = 'bg-rose-300/50 text-rose-500 border-rose-500 dark:bg-rose-500/50 dark:text-rose-100 dark:border-rose-300'
    return (
        <p className={`py-2 px-4 my-2 rounded-lg border ${colorClasses}`}>{msg}</p>
    );
}