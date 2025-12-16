# Filesystem MCP 全域安裝完成 ✅

## 安裝狀態

- ✅ **全域安裝成功**
- **版本**: @modelcontextprotocol/server-filesystem@2025.11.25
- **安裝位置**: `D:\npm\npm-glodal\node_modules\@modelcontextprotocol\server-filesystem`
- **執行文件**: `D:\npm\npm-glodal\node_modules\@modelcontextprotocol\server-filesystem\dist\index.js`

## 如何在其他專案使用

### 在 Cursor MCP 配置中

對於任何專案，都可以使用以下配置：

```json
{
  "mcpServers": {
    "filesystem-your-project": {
      "command": "node",
      "args": [
        "D:\\npm\\npm-glodal\\node_modules\\@modelcontextprotocol\\server-filesystem\\dist\\index.js",
        "D:/Path/To/Your/Project"
      ]
    }
  }
}
```

### 多個專案範例

假設您有三個專案：

```json
{
  "mcpServers": {
    "filesystem-project1": {
      "command": "node",
      "args": [
        "D:\\npm\\npm-glodal\\node_modules\\@modelcontextprotocol\\server-filesystem\\dist\\index.js",
        "D:/Projects/Project1"
      ]
    },
    "filesystem-project2": {
      "command": "node",
      "args": [
        "D:\\npm\\npm-glodal\\node_modules\\@modelcontextprotocol\\server-filesystem\\dist\\index.js",
        "D:/Projects/Project2"
      ]
    },
    "filesystem-project3": {
      "command": "node",
      "args": [
        "D:\\npm\\npm-glodal\\node_modules\\@modelcontextprotocol\\server-filesystem\\dist\\index.js",
        "D:/Projects/Project3"
      ]
    }
  }
}
```

## 優點

1. ✅ **一次安裝，所有專案可用**
2. ✅ **不需要每個專案都安裝**
3. ✅ **統一版本管理**
4. ✅ **節省磁碟空間**

## 更新版本

當需要更新到新版本時：

```powershell
# 確保使用 Node.js v22
$nvmPath = "D:\Program Files\nvm"
$versions = Get-ChildItem "$nvmPath" -Directory | Where-Object { $_.Name -match "^v22" } | Sort-Object Name -Descending
if ($versions) {
    $latest = $versions[0].FullName
    $env:Path = "$latest;$nvmPath;$env:Path"
    
    # 更新全域安裝
    npm update -g @modelcontextprotocol/server-filesystem
}
```

## 驗證安裝

檢查全域安裝：

```powershell
$nvmPath = "D:\Program Files\nvm"
$versions = Get-ChildItem "$nvmPath" -Directory | Where-Object { $_.Name -match "^v22" } | Sort-Object Name -Descending
if ($versions) {
    $latest = $versions[0].FullName
    $env:Path = "$latest;$nvmPath;$env:Path"
    
    npm list -g @modelcontextprotocol/server-filesystem
}
```

## 注意事項

1. **路徑格式**: 
   - 在 JSON 中使用 `\\` 轉義反斜線
   - 專案路徑可以使用 `/` 或 `\\`

2. **Cursor 配置位置**:
   - Windows: `%APPDATA%\Cursor\User\globalStorage\mcp.json`
   - 或在 Cursor 設置中搜索 "MCP"

3. **重新啟動**: 
   - 修改配置後需要重新啟動 Cursor

## 與本地安裝的對比

| 特性 | 全域安裝 | 本地安裝（cursor_test） |
|------|---------|----------------------|
| 安裝位置 | `D:\npm\npm-glodal\node_modules\...` | `D:\Data\GitHub\cursor_test\node_modules\...` |
| 使用範圍 | 所有專案 | 僅 cursor_test 專案 |
| 更新方式 | `npm update -g` | 在各專案中 `npm update` |
| 推薦度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 現在可以

✅ 在任何專案中使用 filesystem MCP  
✅ 不需要重複安裝  
✅ 統一管理版本  

只需在 Cursor MCP 配置中添加對應的專案路徑即可！

