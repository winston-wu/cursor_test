# 在多個專案中使用 Filesystem MCP

## 問題

Filesystem MCP 目前只安裝在 `cursor_test` 專案中，如何在其他專案中使用？

## 解決方案

### 方案 1: 全域安裝（推薦）⭐

一次安裝，所有專案都可以使用。

#### 步驟 1: 全域安裝
```powershell
# 確保使用 Node.js v22
$nvmPath = "D:\Program Files\nvm"
$versions = Get-ChildItem "$nvmPath" -Directory | Where-Object { $_.Name -match "^v22" } | Sort-Object Name -Descending
if ($versions) {
    $latest = $versions[0].FullName
    $env:Path = "$latest;$nvmPath;$env:Path"
    
    # 全域安裝
    npm install -g @modelcontextprotocol/server-filesystem
}
```

#### 步驟 2: 查找全域安裝位置
```powershell
npm list -g @modelcontextprotocol/server-filesystem
npm root -g
```

通常位於：
- Windows: `%APPDATA%\npm\node_modules\@modelcontextprotocol\server-filesystem\dist\index.js`
- 或: `C:\Program Files\nodejs\node_modules\@modelcontextprotocol\server-filesystem\dist\index.js`

#### 步驟 3: 在 Cursor MCP 配置中使用全域路徑

對於每個專案，在 Cursor MCP 配置中使用全域安裝的路徑：

```json
{
  "mcpServers": {
    "filesystem-project1": {
      "command": "node",
      "args": [
        "%APPDATA%\\npm\\node_modules\\@modelcontextprotocol\\server-filesystem\\dist\\index.js",
        "D:/Path/To/Project1"
      ]
    },
    "filesystem-project2": {
      "command": "node",
      "args": [
        "%APPDATA%\\npm\\node_modules\\@modelcontextprotocol\\server-filesystem\\dist\\index.js",
        "D:/Path/To/Project2"
      ]
    }
  }
}
```

**注意**: Cursor 可能不支援環境變數 `%APPDATA%`，請使用完整路徑，例如：
```json
{
  "mcpServers": {
    "filesystem-project1": {
      "command": "node",
      "args": [
        "C:\\Users\\YourUsername\\AppData\\Roaming\\npm\\node_modules\\@modelcontextprotocol\\server-filesystem\\dist\\index.js",
        "D:/Path/To/Project1"
      ]
    }
  }
}
```

### 方案 2: 使用絕對路徑指向 cursor_test（臨時方案）

如果不想全域安裝，可以讓其他專案指向 `cursor_test` 的安裝。

#### 在 Cursor MCP 配置中：

```json
{
  "mcpServers": {
    "filesystem-project1": {
      "command": "node",
      "args": [
        "D:\\Data\\GitHub\\cursor_test\\node_modules\\@modelcontextprotocol\\server-filesystem\\dist\\index.js",
        "D:/Path/To/Project1"
      ]
    },
    "filesystem-project2": {
      "command": "node",
      "args": [
        "D:\\Data\\GitHub\\cursor_test\\node_modules\\@modelcontextprotocol\\server-filesystem\\dist\\index.js",
        "D:/Path/To/Project2"
      ]
    }
  }
}
```

**優點**:
- 不需要重複安裝
- 共享同一個版本

**缺點**:
- 依賴 cursor_test 專案存在
- 如果刪除 cursor_test，其他專案會失效
- 路徑硬編碼，不夠靈活

### 方案 3: 每個專案都安裝一份

在每個需要使用的專案中分別安裝。

#### 步驟 1: 進入專案目錄
```powershell
cd D:\Path\To\Project1
```

#### 步驟 2: 安裝到專案
```powershell
npm install @modelcontextprotocol/server-filesystem
```

#### 步驟 3: 在 Cursor MCP 配置中使用相對路徑

```json
{
  "mcpServers": {
    "filesystem-project1": {
      "command": "node",
      "args": [
        "./node_modules/@modelcontextprotocol/server-filesystem/dist/index.js",
        "D:/Path/To/Project1"
      ],
      "cwd": "D:\\Path\\To\\Project1"
    }
  }
}
```

**優點**:
- 每個專案獨立
- 可以有不同的版本
- 不依賴其他專案

**缺點**:
- 每個專案都要安裝，占用空間
- 需要維護多個安裝

### 方案 4: 修復 npx 後使用 npx（理想方案）

如果修復了 npx 問題，可以使用 npx，這樣就不需要安裝了。

#### 在 Cursor MCP 配置中：

```json
{
  "mcpServers": {
    "filesystem-project1": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "D:/Path/To/Project1"
      ]
    },
    "filesystem-project2": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "D:/Path/To/Project2"
      ]
    }
  }
}
```

**優點**:
- 不需要安裝
- 自動使用最新版本
- 配置簡單

**缺點**:
- 需要先修復 npx 問題
- 每次啟動都會下載（如果緩存失效）

## 推薦方案對比

| 方案 | 安裝次數 | 靈活性 | 穩定性 | 推薦度 |
|------|---------|--------|--------|--------|
| **全域安裝** | 1 次 | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **絕對路徑** | 0 次 | ⭐ | ⭐⭐ | ⭐⭐ |
| **每專案安裝** | N 次 | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **npx** | 0 次 | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |

## 實際操作：全域安裝

讓我幫您執行全域安裝：

```powershell
# 1. 確保使用 Node.js v22
$nvmPath = "D:\Program Files\nvm"
$versions = Get-ChildItem "$nvmPath" -Directory | Where-Object { $_.Name -match "^v22" } | Sort-Object Name -Descending
if ($versions) {
    $latest = $versions[0].FullName
    $env:Path = "$latest;$nvmPath;$env:Path"
    
    # 2. 全域安裝
    npm install -g @modelcontextprotocol/server-filesystem
    
    # 3. 查找安裝位置
    $globalPath = npm root -g
    Write-Host "全域安裝位置: $globalPath"
    
    # 4. 驗證安裝
    $fsPath = Join-Path $globalPath "@modelcontextprotocol\server-filesystem\dist\index.js"
    if (Test-Path $fsPath) {
        Write-Host "✅ 安裝成功: $fsPath"
    } else {
        Write-Host "❌ 安裝失敗"
    }
}
```

## 在 Cursor 中配置多個專案

### 範例配置

假設您有三個專案：
- `D:/Projects/Project1`
- `D:/Projects/Project2`
- `D:/Projects/Project3`

使用全域安裝的配置：

```json
{
  "mcpServers": {
    "filesystem-project1": {
      "command": "node",
      "args": [
        "C:\\Users\\YourUsername\\AppData\\Roaming\\npm\\node_modules\\@modelcontextprotocol\\server-filesystem\\dist\\index.js",
        "D:/Projects/Project1"
      ]
    },
    "filesystem-project2": {
      "command": "node",
      "args": [
        "C:\\Users\\YourUsername\\AppData\\Roaming\\npm\\node_modules\\@modelcontextprotocol\\server-filesystem\\dist\\index.js",
        "D:/Projects/Project2"
      ]
    },
    "filesystem-project3": {
      "command": "node",
      "args": [
        "C:\\Users\\YourUsername\\AppData\\Roaming\\npm\\node_modules\\@modelcontextprotocol\\server-filesystem\\dist\\index.js",
        "D:/Projects/Project3"
      ]
    }
  }
}
```

## 注意事項

1. **路徑格式**:
   - Windows 路徑在 JSON 中需要使用 `\\` 或 `/`
   - 最後一個參數（專案路徑）可以使用 `/` 或 `\\`

2. **環境變數**:
   - Cursor 可能不支援 `%APPDATA%` 等環境變數
   - 建議使用完整絕對路徑

3. **更新版本**:
   - 全域安裝：`npm update -g @modelcontextprotocol/server-filesystem`
   - 本地安裝：在各專案中 `npm update @modelcontextprotocol/server-filesystem`

4. **檢查安裝位置**:
   ```powershell
   npm root -g  # 查看全域 node_modules 位置
   npm list -g @modelcontextprotocol/server-filesystem  # 查看版本
   ```

## 快速查找全域安裝路徑的腳本

```powershell
# 查找全域 filesystem MCP 安裝位置
$nvmPath = "D:\Program Files\nvm"
$versions = Get-ChildItem "$nvmPath" -Directory | Where-Object { $_.Name -match "^v22" } | Sort-Object Name -Descending
if ($versions) {
    $latest = $versions[0].FullName
    $env:Path = "$latest;$nvmPath;$env:Path"
    
    $globalRoot = npm root -g
    $fsPath = Join-Path $globalRoot "@modelcontextprotocol\server-filesystem\dist\index.js"
    
    if (Test-Path $fsPath) {
        Write-Host "✅ Filesystem MCP 全域安裝位置:"
        Write-Host $fsPath
        Write-Host ""
        Write-Host "在 Cursor MCP 配置中使用:"
        Write-Host "`"$fsPath`""
    } else {
        Write-Host "❌ 未找到全域安裝，請先執行: npm install -g @modelcontextprotocol/server-filesystem"
    }
}
```

