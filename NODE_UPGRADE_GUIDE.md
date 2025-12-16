# Node.js 升級指南

## 當前狀態
- 當前 Node.js 版本: v18.16.0
- 目標版本: v22.x

## 升級方法

### 方法 1: 使用 nvm-windows（推薦）

1. **安裝 nvm-windows**
   - 下載地址: https://github.com/coreybutler/nvm-windows/releases
   - 下載 `nvm-setup.exe` 並安裝

2. **安裝 Node.js v22**
   ```powershell
   nvm install 22
   nvm use 22
   ```

3. **驗證版本**
   ```powershell
   node --version
   ```

### 方法 2: 直接從官網安裝

1. 訪問 https://nodejs.org/
2. 下載 Node.js v22.x LTS 版本
3. 執行安裝程式並覆蓋現有版本

### 方法 3: 使用 Chocolatey（如果已安裝）

```powershell
choco upgrade nodejs-lts --version=22.11.0
```

## 升級後步驟

1. **重新安裝依賴**
   ```powershell
   npm install
   ```

2. **驗證專案運行**
   ```powershell
   npm test  # 如果有測試
   ```

## 注意事項

- 升級後可能需要重新安裝全域套件
- 某些套件可能需要更新以支援 Node.js v22
- 建議在升級前備份專案

