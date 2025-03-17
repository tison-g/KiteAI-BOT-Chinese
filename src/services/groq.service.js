import { Groq } from "groq-sdk";
import { groqConfig } from "../../config.js";
import dashboard from "../ui/dashboard.js";

// 备用问题列表
const FALLBACK_QUESTIONS = [
  "Kite AI 的主要功能是什么？",
  "Kite AI 如何帮助公司利用 AI 数据和模型？",
  "Kite AI 平台上有哪些类型的 AI 数据和模型？",
  "Kite AI 的定价模式是什么？",
  "Kite AI 的团队成员有哪些经验？",
  "Kite AI 如何确保数据安全？",
  "Kite AI 支持哪些编程语言或工具？",
  "Kite AI 的客户群体有哪些？",
  "Kite AI 的发展前景如何？",
  "Kite AI 的创新之处是什么？",
  "什么是区块链技术？",
  "比特币和以太坊有什么区别？",
  "如何选择一个好的加密货币投资？",
  "什么是去中心化金融（DeFi）？",
  "加密货币市场的主要风险是什么？",
  "如何安全存储我的加密货币？",
  "什么是代币和硬币的区别？",
  "如何进行加密货币交易？",
  "什么时候是进入市场的好时机？",
  "如何理解加密货币的市值和流通量？",
  "区块链技术的主要优势是什么？",
  "去中心化金融与传统金融有何不同？",
  "智能合约在区块链生态系统中扮演什么角色？",
  "权益证明与工作量证明有什么区别？",
  "区块链采用面临的主要挑战是什么？",
  "区块链如何提高供应链的透明度？",
  "与区块链相关的环境问题有哪些？",
  "Web3 与当前的互联网基础设施有何不同？",
  "什么是 NFT，它们如何创造价值？",
  "区块链技术如何帮助打击欺诈？",
];

class GroqService {
  constructor() {
    this.client = new Groq({
      apiKey: groqConfig.apiKey,
    });
    this.useGroq = true;
    this.connectionErrorCount = 0;
    this.connectionErrorThreshold = 3;
  }

  getRandomFallbackQuestion() {
    const randomIndex = Math.floor(Math.random() * FALLBACK_QUESTIONS.length);
    return FALLBACK_QUESTIONS[randomIndex];
  }

  async generateQuestion() {
    if (
      !this.useGroq ||
      this.connectionErrorCount >= this.connectionErrorThreshold
    ) {
      return this.getRandomFallbackQuestion();
    }

    try {
      const prompt = `生成一个关于区块链、加密货币或 Web3 技术的随机、有吸引力的问题。
                     使其发人深省，并适合 AI 助手回答。
                     只返回问题，不包含其他内容。`;

      const completion = await this.client.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: groqConfig.model,
        temperature: groqConfig.temperature,
      });

      this.connectionErrorCount = 0;
      return completion.choices[0]?.message?.content?.trim();
    } catch (error) {
      this.connectionErrorCount++;

      if (this.connectionErrorCount >= this.connectionErrorThreshold) {
        dashboard.log(
          `连接错误次数过多 (${this.connectionErrorCount})。切换到备用问题。`
        );
        this.useGroq = false;
      }

      return this.getRandomFallbackQuestion();
    }
  }
}

export default new GroqService();