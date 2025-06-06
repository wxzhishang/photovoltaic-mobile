# Taroify 迁移指南

## 概述

本项目已成功从 `taro-ui` 迁移到 `@taroify/core`。Taroify 是移动端组件库 Vant 的 Taro 版本，提供更好的性能和更丰富的组件。

## 已完成的迁移内容

### 1. 依赖替换
- ✅ 移除 `taro-ui: ^3.1.0-beta.2`
- ✅ 添加 `@taroify/core: ^0.8.1`

### 2. 组件替换

#### AtSearchBar → Search
**原代码 (taro-ui):**
```tsx
import { AtSearchBar } from 'taro-ui'

<AtSearchBar
  value={searchKeyword}
  onChange={handleSearch}
  placeholder='搜索岗位或公司'
  showActionButton={false}
/>
```

**新代码 (Taroify):**
```tsx
import { Search } from '@taroify/core'
import '@taroify/core/search/style'

<Search
  value={searchKeyword}
  onChange={handleSearch}
  placeholder='搜索岗位或公司'
/>
```

#### AtGrid → 自定义实现
- 原本导入了 `AtGrid` 但实际未使用
- 已移除相关导入，保持现有的自定义网格布局

## 安装说明

如果需要在新环境中安装 Taroify：

```bash
npm install @taroify/core@^0.8.1 --legacy-peer-deps
```

注：使用 `--legacy-peer-deps` 是为了解决与 Taro 4.x 版本的依赖兼容性问题。

## 组件使用对比

### 搜索组件
| 特性 | taro-ui AtSearchBar | Taroify Search |
|------|-------------------|----------------|
| 基础搜索 | ✅ | ✅ |
| 占位符 | ✅ | ✅ |
| 值绑定 | ✅ | ✅ |
| 样式定制 | 有限 | 更丰富 |
| 性能 | 一般 | 更优 |

### 网格组件
- 项目中原本导入了 `AtGrid` 但未实际使用
- 现在使用自定义的网格布局实现，无需额外组件

## 样式导入

Taroify 需要手动导入样式：
```tsx
import '@taroify/core/search/style'
import '@taroify/core/button/style'
// 按需导入所需组件的样式
```

## 优势对比

### Taroify 相比 taro-ui 的优势：
1. **性能更好**: 组件平均体积小于 1KB
2. **组件更丰富**: 70+ 高质量组件
3. **类型支持**: 完整的 TypeScript 类型定义
4. **测试覆盖**: 单元测试覆盖率超过 90%
5. **主题定制**: 内置 700+ 个主题变量
6. **按需引入**: 支持 Tree Shaking

## 注意事项

1. **API 差异**: 部分组件的 API 可能有细微差别，需要参考 Taroify 文档进行调整
2. **样式导入**: 必须手动导入组件样式文件
3. **依赖兼容**: 可能需要使用 `--legacy-peer-deps` 安装

## 相关链接

- [Taroify 官方文档](https://taroify.github.io/taroify.com/introduce/)
- [Taroify GitHub](https://github.com/mallfoundry/taroify)
- [Vant 官方文档](https://vant-contrib.gitee.io/vant/)

## 迁移状态

- ✅ package.json 依赖更新
- ✅ 移除未使用的 AtGrid 导入
- ✅ 替换 AtSearchBar 为 Search 组件
- ✅ 更新相关导入语句
- ✅ 测试编译通过

迁移完成！项目现在使用 Taroify 作为 UI 组件库。 