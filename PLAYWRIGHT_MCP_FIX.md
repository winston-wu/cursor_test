# Playwright MCP 安裝問題修復指南

## 問題描述
Playwright MCP 伺服器在安裝時出現多個 `TAR_ENTRY_ERROR ENOENT` 錯誤，導致模組缺失無法啟動。這通常是 Windows 上 npx 的文件權限或路徑長度問題。

## 已執行的修復步驟
1. ✅ 清理 npm 緩存：`npm cache clean --force`
2. ✅ 刪除損壞的 npx 緩存目錄
3. ✅ 更新 npm 從 9.5.1 到 9.9.4
4. ✅ **本地安裝 Playwright MCP**（推薦方案）

## 解決方案：使用本地安裝（已完成）

### 步驟 1：本地安裝（已完成）
```powershell
npm install @playwright/mcp
```
✅ 已在項目中成功安裝

### 步驟 2：更新 Cursor MCP 配置
在 Cursor 的 MCP 配置文件中，將 Playwright MCP 的命令從：
```
npx @playwright/mcp@latest
```

改為使用本地安裝的完整路徑：
```
node "D:\Data\GitHub\cursor_test\node_modules\@playwright\mcp\cli.js"
```

**注意**：請確保路徑用引號括起來，因為路徑中包含空格。

### 步驟 3：驗證安裝
運行以下命令測試本地安裝是否正常：
```powershell
node "D:\Data\GitHub\cursor_test\node_modules\@playwright\mcp\cli.js" --help
```

### 如何找到 Cursor MCP 配置文件
MCP 配置文件通常位於：
- Windows: `%APPDATA%\Cursor\User\globalStorage\mcp.json` 或類似位置
- 或在 Cursor 設置中搜索 "MCP" 或 "Model Context Protocol"

## 其他備選方案（如果本地安裝仍有問題）

### 方案 A：手動清理所有 npx 緩存
```powershell
Remove-Item -Path "$env:APPDATA\npm-cache\_npx" -Recurse -Force -ErrorAction SilentlyContinue
```

### 方案 B：檢查 Windows 路徑長度限制
如果路徑過長，可能需要啟用 Windows 長路徑支持：
1. 以管理員身份運行 PowerShell
2. 執行：`New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force`

## 驗證修復
1. 更新 Cursor MCP 配置使用本地路徑
2. 重新啟動 Cursor
3. 檢查 MCP 伺服器是否正常運行

## 如果問題持續存在
1. 檢查網絡連接是否穩定
2. 嘗試使用不同的 npm registry
3. 檢查防毒軟體是否阻擋文件下載
4. 查看完整錯誤日誌：`D:\npm\npm-cache\_logs\2025-12-15T04_26_36_369Z-debug-0.log`

