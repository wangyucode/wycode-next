export function getRandomColorById(id: string | number): string {
  // 将id转换为字符串
  const idStr = String(id);
  
  // 使用id作为种子，确保相同id总是相同颜色
  let seed = 0;
  for (let i = 0; i < idStr.length; i++) {
    seed += idStr.charCodeAt(i);
  }

  // 预定义一些柔和的颜色，避免使用过于刺眼的颜色
  const lightColors = [
    'bg-blue-50 hover:bg-blue-100',
    'bg-green-50 hover:bg-green-100',
    'bg-purple-50 hover:bg-purple-100',
    'bg-pink-50 hover:bg-pink-100',
    'bg-yellow-50 hover:bg-yellow-100',
    'bg-red-50 hover:bg-red-100',
    'bg-cyan-50 hover:bg-cyan-100',
    'bg-indigo-50 hover:bg-indigo-100',
  ];

  const darkColors = [
    'dark:bg-blue-900/30 dark:hover:bg-blue-900/50',
    'dark:bg-green-900/30 dark:hover:bg-green-900/50',
    'dark:bg-purple-900/30 dark:hover:bg-purple-900/50',
    'dark:bg-pink-900/30 dark:hover:bg-pink-900/50',
    'dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50',
    'dark:bg-red-900/30 dark:hover:bg-red-900/50',
    'dark:bg-cyan-900/30 dark:hover:bg-cyan-900/50',
    'dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50',
  ];

  const index = seed % lightColors.length;

  // 返回适合两种模式的颜色类
  return `${lightColors[index]} ${darkColors[index]}`;
}