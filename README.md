# 🌟 KiteAI 机器人 - AI 驱动自动化 🤖

🚀 **一个使用 Node.js 开发的机器人，旨在与 KiteAI 测试网络平台进行互动，它拥有优雅的终端界面和自动化的 AI 驱动互动。**

---

## ✨ 功能特点

👉 **支持多个钱包** 💰  
👉 **自动化的 AI 互动** (Professor, Crypto Buddy, Sherlock) 🧠  
👉 **实时分析与进度跟踪** 📊  
👉 **内置限流和错误处理** ⚡  
👉 **集成 Groq AI** 用于智能问题生成 🔍  

---

## 📌 前置条件

安装前，请确保你具备以下条件：

| 要求                     | 描述                                                    |
|--------------------------|---------------------------------------------------------|
| 🔹 **Node.js v16+**      | [点击这里下载](https://nodejs.org/) 🖥️                  |
| 🔹 **KiteAI 测试网账号** | [点击注册](https://testnet.gokite.ai?r=R7H32kqJ) 🔗       |
| 🔹 **Groq API 密钥**     | [点击获取](https://console.groq.com) 🔑                 |

---

## 🛠️ 安装指南

### **🔹 Linux/macOS 用户 🐧🍏**

#### 1️⃣ 克隆仓库：  
```bash
git clone https://github.com/rpchubs/KiteAI-BOT.git
```

#### 2️⃣ 进入项目文件夹：  
```bash
cd KiteAI-BOT
```

#### 3️⃣ 安装依赖：  
```bash
npm install
```

#### 4️⃣ 创建所需配置文件：  
- **钱包地址文件：**  
  ```bash
  nano wallets.txt
  ```
- **私钥文件：**  
  ```bash
  nano priv.txt
  ```
- **代理文件：**  
  ```bash
  nano proxies.txt
  ```
  **格式：** `http://user:pass@host:port`
- **创建配置文件：**  
  ```bash
  nano config.js
  ```

### **🔹 Windows 用户 🏁**

#### 1️⃣ 克隆仓库：  
- 可使用 Git Bash 或从仓库页面 **下载 ZIP**。

#### 2️⃣ 解压 ZIP 文件（如果已下载）。

#### 3️⃣ 进入解压后的文件夹并安装依赖：  
- 打开 **文件资源管理器**，进入 `KiteAI-BOT` 文件夹，并在此文件夹中打开 **命令提示符**。  
- 运行：  
  ```powershell
  npm install
  ```

#### 4️⃣ 使用相关软件创建所需配置文件：  

- **钱包地址：**  
  - 打开 **记事本** 并创建一个名为 `wallets.txt` 的新文件  
  - 添加钱包地址（每行一个）并保存文件。

- **私钥：**  
  - 打开 **记事本** 并创建一个名为 `priv.txt` 的新文件  
  - 添加私钥（每行一个）并保存文件。

- **代理设置（可选）：**  
  - 打开 **记事本**，创建 `proxies.txt`，并按以下格式添加代理：  
    ```
    http://user:pass@host:port
    ```

- **配置设置：**  
  - 打开 **VS Code** 或 **Notepad++**，创建 `config.js`，并进行配置。

## ⚙️ 配置指南

### 📂 **钱包地址 💰：**  
- 打开 `wallets.txt`，每行添加一个钱包地址：  
  ```
  0xwallet1address
  0xwallet2address
  ```

### 🔐 **私钥 🔑：**  
- 打开 `priv.txt`，每行添加一个私钥 **（请妥善保管！）**  
  ```
  privatekey1
  privatekey2
  ```

### 🔑 **API 密钥和推荐码设置：**  
1️⃣ 在文本编辑器中打开 `config.js`.  
2️⃣ 找到以下部分并更新你的 API 密钥：  
    ```javascript
    export const groqConfig = {
        apiKey: "your-groq-api-key-here",
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
    };
    ```
3️⃣ 找到推荐码部分并更新：  
    ```javascript
    export const refCode = {
        code: "your-referral-code-here"
    };
    ```
4️⃣ **保存文件。**

---

## ▶️ 使用指南 🚀

### 📝 **注册（仅限首次用户）📜**  

🔹 **运行 `register.js` 前，请确保 `priv.txt` 中包含你的私钥。**  

#### **Linux/macOS：**  
```bash
node register.js
```

#### **Windows：**  
1️⃣ 在 `KiteAI-BOT` 文件夹中打开 **命令提示符**。  
2️⃣ 运行：  
   ```powershell
   node register.js
   ```

### 🚀 **启动机器人 🤖**  

🔹 **确保 `wallets.txt` 配置正确。**  
🔹 **使用前，必须先注册并签名钱包。**  

#### **Linux/macOS：**  
```bash
node main.js
```

#### **Windows：**  
1️⃣ 在 `KiteAI-BOT` 文件夹中打开 **命令提示符**。  
2️⃣ 运行：  
   ```powershell
   node main.js
   ```

---

## 🎯 仪表盘概览 📊  

| 部分                  | 说明                               |
|-----------------------|------------------------------------|
| 📌 **横幅**            | 显示项目信息及链接                  |
| 🤖 **AI 互动**         | 实时 AI 对话记录                     |
| 📟 **状态**            | 钱包、周期进度和会话时间              |
| 📈 **分析**            | 成功率、API 请求和错误                |
| ⏳ **进度条**          | 展示进行中任务的可视化进度             |

---

## 🛠️ 故障排除 🛑  

| ❌ 问题                   | ✅ 解决方案                                       |
|-------------------------|-------------------------------------------------|
| `Command not found`     | 确保已安装 Node.js 并加入 PATH                    |
| `Error: API Key Missing`| 在 `config.js` 中更新有效的 API 密钥               |
| `Permission Denied`     | 如有需要，请对脚本运行 `chmod +x`（适用于 Linux/macOS） |

---

## 🤝 贡献 💡  

1️⃣ **Fork 仓库**  
2️⃣ **创建功能分支**  
3️⃣ **提交你的更改**  
4️⃣ **推送分支**  
5️⃣ **发起 Pull Request** 🎉  

---

## 🔗 有用链接 🌍  

- [Github 仓库](https://github.com/rpchubs)  
- [KiteAI 测试网](https://testnet.gokite.ai?r=R7H32kqJ)  
- [Groq 控制台](https://console.groq.com)  

---

🚀 **快乐机器人操作！** 🎯