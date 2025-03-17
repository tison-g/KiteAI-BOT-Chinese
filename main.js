import { agents, rateLimitConfig } from "./config.js";
import agentService from "./src/services/agent.service.js";
import walletService from "./src/services/wallet.service.js";
import dashboard from "./src/ui/dashboard.js";
import { sleep, formatError } from "./src/utils/helpers.js";

let isRunning = true;
const stats = {
  total: 0,
  successful: 0,
  failed: 0,
};

const startTime = Date.now();

process.on("SIGINT", () => {
  dashboard.log("正在平稳停止脚本...");
  isRunning = false;
  setTimeout(() => {
    dashboard.log("感谢您使用 Kite AI!");
    process.exit(0);
  }, 1000);
});

async function processAgentCycle(wallet, agentId, agentName) {
  try {
    dashboard.log(`使用代理: ${agentName}`);

    const nanya = await agentService.sendQuestion(agentId);
    stats.total++;

    if (nanya) {
      // dashboard.log(`问题: ${nanya.question}`);
      dashboard.log(`答案: ${nanya.response ?? ""}`);

      const reported = await agentService.reportUsage(wallet, {
        agent_id: agentId,
        question: nanya.question,
        response: nanya?.response ?? "No answer",
      });
      dashboard.log(`已报告: ${reported}`);

      if (reported) {
        stats.successful++;
        dashboard.log("使用数据已成功报告！");
      } else {
        stats.failed++;
        dashboard.log("使用报告失败");
      }

      dashboard.updateStats(stats);
    } else {
      stats.failed++;
      dashboard.updateStats(stats);
    }
  } catch (error) {
    stats.failed++;
    dashboard.updateStats(stats);
    dashboard.log(`代理循环错误: ${formatError(error)}`);
  }
}

async function processWallet(wallet, cycleCount) {
  await agentService.updateProxy();
  dashboard.log(`正在处理钱包: ${wallet.slice(0, 6)}...${wallet.slice(-4)}`);
  dashboard.updateStatus(wallet, cycleCount, Date.now() - startTime);

  for (const [agentId, agentName] of Object.entries(agents)) {
    if (!isRunning) break;

    await processAgentCycle(wallet, agentId, agentName);

    if (isRunning) {
      const waitTime = rateLimitConfig.intervalBetweenCycles / 1000;
      dashboard.log(`等待 ${waitTime} 秒后重试...`);
      await sleep(rateLimitConfig.intervalBetweenCycles);
    }
  }
}

async function startContinuousProcess(wallets) {
  let cycleCount = 1;

  while (isRunning) {
    dashboard.log(`开始循环 #${cycleCount}`);

    for (const wallet of wallets) {
      if (!isRunning) break;
      await processWallet(wallet, cycleCount);
    }

    cycleCount++;
    dashboard.updateProgress((cycleCount % 10) * 10);
  }
}

async function main() {
  try {
    const wallets = walletService.loadWallets();
    if (wallets.length === 0) {
      dashboard.log("在 wallets.txt 中未找到钱包。正在停止程序。");
      process.exit(1);
    }

    dashboard.log(`从 wallets.txt 中加载了 ${wallets.length} 个钱包`);
    dashboard.updateStatus("正在初始化...");

    await startContinuousProcess(wallets);
  } catch (error) {
    dashboard.log(`发生错误: ${formatError(error)}`);
    process.exit(1);
  }
}

main();