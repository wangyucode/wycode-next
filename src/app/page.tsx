import Articles from "@/components/articles";

export default function Home() {

  const articles = [
    {
      id: "1",
      title: "文章1",
      date: "2023-01-01",
      cid: "1",
      category: "分类1",
      tags: ["标签1", "标签2"],
      withExcerpt: true,
      excerptHtml: "<p>这是文章1的摘要。</p>",
      contentHtml: "<p>这是文章1的内容。</p>",
    },
  ];


  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Articles articles={articles} />
      <aside className="flex-1">
        <ul>
          <li><a href="#">相关资源1</a></li>
          <li><a href="#">相关资源2</a></li>
        </ul>
      </aside>
    </div>
  );
}
