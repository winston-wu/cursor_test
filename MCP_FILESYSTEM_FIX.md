# MCP Filesystem Server 問題修復指南

## 問題分析

根據日誌分析，發現以下主要問題：

### 1. Node.js 版本不兼容
- **當前版本**：v18.16.0
- **要求版本**：Node 20 或 >=22
- **影響**：`minimatch@10.1.1`、`@isaacs/brace-expansion@5.0.0` 等套件無法正常運行

### 2. npm 安裝權限錯誤
- 大量 `TAR_ENTRY_ERROR EPERM: operation not permitted` 錯誤
- 發生在 `D:\npm\npm-cache\_npx\` 目錄
- 可能原因：
  - Windows 文件權限問題
  - 防毒軟體阻擋
  - 文件被其他程序鎖定

### 3. 命令無法執行
- 錯誤訊息：`'mcp-server-filesystem' 不是內部或外部命令、可執行的程式或批次檔。`
- 原因：npx 安裝失敗，導致可執行文件未正確生成

## 解決方案

### 方案 1：升級 Node.js（推薦）

#### 步驟 1：檢查當前版本
```powershell
node --version
```

#### 步驟 2：升級 Node.js
1. 訪問 [Node.js 官網](https://nodejs.org/)
2. 下載並安裝 LTS 版本（建議 v20.x 或 v22.x）
3. 或使用 nvm（Node Version Manager）：
   ```powershell
   # 如果已安裝 nvm-windows
   nvm install 20
   nvm use 20
   ```

#### 步驟 3：驗證安裝
```powershell
node --version  # 應該顯示 v20.x 或 v22.x
npm --version
```

### 方案 2：清理並重新安裝（如果無法升級 Node.js）

#### 步驟 1：清理 npm 緩存
```powershell
npm cache clean --force
```

#### 步驟 2：刪除損壞的 npx 緩存
```powershell
Remove-Item -Path "$env:APPDATA\npm-cache\_npx" -Recurse -Force -ErrorAction SilentlyContinue
```

#### 步驟 3：以管理員身份運行 PowerShell
1. 右鍵點擊 PowerShell
2. 選擇「以系統管理員身分執行」
3. 重新嘗試安裝

### 方案 3：本地安裝 MCP Filesystem Server（臨時解決方案）

如果無法升級 Node.js，可以嘗試本地安裝：

#### 步驟 1：本地安裝
```powershell
npm install @modelcontextprotocol/server-filesystem
```

#### 步驟 2：更新 Cursor MCP 配置
在 Cursor 的 MCP 配置文件中，將命令從：
```
npx -y @modelcontextprotocol/server-filesystem D:/Data/GitHub/cursor_test
```

改為使用本地安裝的路徑：
```
node "D:\Data\GitHub\cursor_test\node_modules\@modelcontextprotocol\server-filesystem\dist\index.js" D:/Data/GitHub/cursor_test
```

**注意**：請根據實際安裝路徑調整。

### 方案 4：檢查 Windows 長路徑支持

如果路徑過長可能導致問題：

#### 啟用長路徑支持
1. 以管理員身份運行 PowerShell
2. 執行以下命令：
```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```
3. 重新啟動電腦

## 驗證修復

### 測試 npx 安裝
```powershell
npx -y @modelcontextprotocol/server-filesystem --help
```

### 檢查 MCP 配置
1. 打開 Cursor 設置
2. 搜索 "MCP" 或 "Model Context Protocol"
3. 確認 filesystem server 配置正確
4. 重新啟動 Cursor

## 如何找到 Cursor MCP 配置文件

MCP 配置文件通常位於：
- Windows: `%APPDATA%\Cursor\User\globalStorage\mcp.json`
- 或在 Cursor 設置中搜索 "MCP" 或 "Model Context Protocol"

## 如果問題持續存在

1. **檢查防毒軟體**：暫時關閉防毒軟體，看是否為權限問題
2. **檢查文件鎖定**：確保沒有其他程序正在使用 npm 緩存目錄
3. **使用不同的 npm registry**：
   ```powershell
   npm config set registry https://registry.npmmirror.com
   ```
4. **檢查網絡連接**：確保能正常訪問 npm registry
5. **查看完整錯誤日誌**：檢查 `D:\npm\npm-cache\_logs\` 目錄下的日誌文件

## 推薦操作順序

1. ✅ **優先升級 Node.js 到 v20 或 v22**（最根本的解決方案）
2. ✅ 清理 npm 緩存
3. ✅ 重新啟動 Cursor
4. ✅ 如果仍有問題，嘗試本地安裝方案

## 相關文件

- 類似問題的修復記錄：`PLAYWRIGHT_MCP_FIX.md`

