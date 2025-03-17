export const rateLimitConfig = {
    maxRetries: 5, // 最大重试次数
    baseDelay: 2000, // 基础延迟（毫秒）
    maxDelay: 10000, // 最大延迟（毫秒）
    requestsPerMinute: 15, // 每分钟请求数
    intervalBetweenCycles: 20000, // 每个循环之间的间隔（毫秒）
    walletVerificationRetries: 3, // 钱包验证的重试次数
};

export const agents = {
    deployment_vxJKb0YqfT5VLWZU7okKWa8L: "Professor",
    deployment_fseGykIvCLs3m9Nrpe9Zguy9: "Crypto Buddy",
    // deployment_nC8HdPWdvy8SNOoYpA5SqCVc: "Sherlock",
};

export const groqConfig = {
    apiKey: "your-groq-api-key", // groq API 密钥
    model: "mixtral-8x7b-32768", // 模型名称
    temperature: 0.7, // 温度参数
};

export const refCode = {
    code: "R7H32kqJ" // 引用代码
};

export const proxyConfig = {
    useProxy: true, // 是否使用代理，设置为 false 则不使用代理
};