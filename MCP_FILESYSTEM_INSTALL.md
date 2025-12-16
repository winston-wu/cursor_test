# Filesystem MCP 重新安裝完成

## ✅ 安裝狀態

- **安裝方式**: 本地安裝到專案
- **安裝位置**: `node_modules\@modelcontextprotocol\server-filesystem`
- **主執行文件**: `node_modules\@modelcontextprotocol\server-filesystem\dist\index.js`
- **Node.js 版本**: v22.11.0 ✅
- **安裝狀態**: 成功安裝 130 個套件，無安全漏洞

## 📝 Cursor MCP 配置

### 方法 1: 使用本地安裝的路徑（推薦）

在 Cursor 的 MCP 配置文件中，將 filesystem server 的命令設置為：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": [
        "D:\\Data\\GitHub\\cursor_test\\node_modules\\@modelcontextprotocol\\server-filesystem\\dist\\index.js",
        "D:/Data/GitHub/cursor_test"
      ]
    }
  }
}
```

### 方法 2: 使用相對路徑（如果 Cursor 支援）

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": [
        "./node_modules/@modelcontextprotocol/server-filesystem/dist/index.js",
        "D:/Data/GitHub/cursor_test"
      ],
      "cwd": "D:\\Data\\GitHub\\cursor_test"
    }
  }
}
```

### 方法 3: 使用 npx（如果 npx 正常工作）

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "D:/Data/GitHub/cursor_test"
      ]
    }
  }
}
```

## 🔍 如何找到 Cursor MCP 配置文件

MCP 配置文件通常位於：
- **Windows**: `%APPDATA%\Cursor\User\globalStorage\mcp.json`
- 或在 Cursor 設置中搜索 "MCP" 或 "Model Context Protocol"

### 快速訪問配置文件

在 PowerShell 中執行：
```powershell
notepad "$env:APPDATA\Cursor\User\globalStorage\mcp.json"
```

或在檔案總管中：
```
%APPDATA%\Cursor\User\globalStorage\mcp.json
```

## ✅ 驗證安裝

### 測試本地安裝

```powershell
# 確保使用 Node.js v22
$nvmPath = "D:\Program Files\nvm"
$versions = Get-ChildItem "$nvmPath" -Directory | Where-Object { $_.Name -match "^v22" } | Sort-Object Name -Descending
if ($versions) {
    $latest = $versions[0].FullName
    $env:Path = "$latest;$nvmPath;$env:Path"
    
    # 測試執行
    node "node_modules\@modelcontextprotocol\server-filesystem\dist\index.js" --help
}
```

## 🔄 重新啟動 Cursor

配置完成後：
1. 保存 MCP 配置文件
2. **完全關閉 Cursor**（不只是關閉視窗）
3. 重新開啟 Cursor
4. 檢查 MCP 連接狀態

## 📦 專案依賴

已更新 `package.json`，包含：
- `@playwright/mcp`: latest
- `@modelcontextprotocol/server-filesystem`: latest

## 🛠️ 故障排除

### 如果 MCP 仍然無法連接

1. **檢查 Node.js 版本**：
   ```powershell
   node --version  # 應該是 v22.x.x
   ```

2. **檢查文件是否存在**：
   ```powershell
   Test-Path "node_modules\@modelcontextprotocol\server-filesystem\dist\index.js"
   ```

3. **檢查路徑格式**：
   - Windows 路徑使用反斜線 `\` 或正斜線 `/` 都可以
   - 在 JSON 中，反斜線需要轉義為 `\\`
   - 建議使用正斜線 `/` 或雙反斜線 `\\`

4. **查看 Cursor 日誌**：
   - 打開 Cursor 開發者工具（Help > Toggle Developer Tools）
   - 查看 Console 中的錯誤訊息

## 📚 相關文件

- `MCP_FILESYSTEM_FIX.md` - 原始問題修復指南
- `package.json` - 專案依賴配置

