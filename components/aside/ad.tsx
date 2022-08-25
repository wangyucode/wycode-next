import Script from "next/script";

export default function Ad() {
    return (
        <div className="my-4 p-2 border rounded border-slate-700/30 dark:border-slate-300/30">
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4650660107955528"
                crossOrigin="anonymous"></script>
            <ins className="adsbygoogle"
                style={{display:'block'}}
                data-ad-client="ca-pub-4650660107955528"
                data-ad-slot="6505490608"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({ });
            </script>
        </div>

    );
}