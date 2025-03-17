// 睡眠函数，等待指定毫秒数后继续执行
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 格式化地址，将地址截取前6位和后4位，中间以省略号连接
export const formatAddress = (address) => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// 将毫秒数格式化为时、分、秒
export const formatDuration = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(" ");
};

// 根据部分值和总值计算百分比
export const calculatePercentage = (part, total) => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};

// 格式化错误信息
export const formatError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  return error.message || "发生未知错误";
};

// 获取当前时间戳（格式化为本地时间字符串）
export const getTimestamp = () => {
  return new Date().toLocaleTimeString();
};

// 格式化统计信息，返回请求总数、成功数、失败数和成功率
export const formatStats = (stats) => {
  const successRate = calculatePercentage(stats.successful, stats.total);
  return [
    `Total Requests: ${stats.total}`,
    `Successful: ${stats.successful}`,
    `Failed: ${stats.failed}`,
    `Success Rate: ${successRate}%`,
  ].join("\n");
};