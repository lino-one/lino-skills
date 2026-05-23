---
name: 🧪 Knowledge Alchemy — 炼金术式复习法
description: 把笔记内容转成元素组合游戏。不用答题，靠试配方式解锁概念——好奇心驱动复习。
trigger: 用户说"好无聊不想复习"、"做成游戏"、"炼金术"、"alchemy"、"做点好玩的"
visibility: private
---

# 🧪 Knowledge Alchemy — 炼金术式复习法

把任何知识笔记变成一场 **元素组合实验**。不答题、不背卡——从基础元素开始，两个两个配在一起，解锁新概念。

## 核心玩法

1. **基础元素**（5-12 个）：从笔记中提炼最原子级的概念。比如 Data、Noise、Encoder、Image…
2. **配方表**：定义哪些元素组合能合成什么新概念。每个配方是 `[元素A] + [元素B] → [新概念] + 一句话解释`
3. **交互**：点击选两个元素 → 点"炼金" → 如果配方存在就解锁新概念卡片，有动画 + 描述
4. **进度追踪**：显示已解锁 / 总数（如 `3 / 13`）
5. **提示系统**：选中一个元素后，与之存在有效配对的元素高亮脉冲显示（紫色边框）
6. **重置**：一键清空进度重来

## 设计原则

### 元素设计
- 基础元素要够基础：尽量用笔记里出现频次最高、最原生的概念
- 配方组合讲究"直觉感"：`Encoder + Decoder → Autoencoder` 比 `Probability + Image → VAE` 更显自然
- 每个解锁概念配一句**人话解释**（不要术语堆砌，用类比或大白话）

### 配方表结构（参考模板）
```js
const RECIPES = [
  // 元素A, 元素B → 产物
  {a:'encoder', b:'decoder', r:{id:'autoencoder', emoji:'🔁', name:'Autoencoder',
    desc:'Encoder 压缩 → Decoder 解压。Latent 是离散点，没法创造新样本。'}},
  // ...更多配方
];
```

### 配方表的连接逻辑
- 配方可以**多级**：基础元素 → 中级概念 → 高级概念（如 `Data + Encoder → Latent Code`，然后 `Latent Code + Decoder → Reconstruction`）
- 所有配方的产物也可以作为其他配方的 A 或 B
- 用 `sort().join(',')` 做 key，保证 A+B 和 B+A 等价

### 视觉风格
- 轻、卡片化、圆角
- 基础元素 Chip（方糖状）
- 解锁概念卡片（带 emoji + 名称 + 描述）
- 新解锁卡片有弹入动画（`popIn`）
- 可配对元素有呼吸脉冲提示

### 交互规范
- 选中一个槽位后点击同元素 = 取消选中
- 两个槽位满时再点新元素 → 替换第二个槽位
- 点击已解锁卡片也可以放入槽位（用在多级配方中）
- 无效组合 → 显示"💨 什么都没发生..."+ 清空槽位
- 已解锁配方 → 显示"♻️ 已经炼出来啦"

## 适用场景

| 主题 | 基础元素举例 | 配方连线 |
|------|-------------|----------|
| GenAI | Data, Noise, Encoder, Decoder, Image... | Encoder+Decoder→Autoencoder |
| 机器学习基础 | Data, Label, Model, Loss, Gradient | Model+Loss→Training |
| 操作系统 | Process, Memory, CPU, File, IO | Process+Memory→Virtual Memory |
| 生物学 | DNA, RNA, Protein, Cell | DNA+RNA→Transcription |

## 实施步骤

1. 从目标笔记中提取 5-12 个最原子的基础元素
2. 梳理笔记中核心概念之间的逻辑关系，整理 10-15 个可用配方
3. 为每个产物取名 + emoji + 一句话人话解释
4. 用 Spark HTML 实现（参考 GenAI Alchemy 实现）
5. 测试全解锁路径：确保所有配方可达

## 为什么有效

- **好奇心驱动**：不是"我该背什么"，而是"这两个放一起会发生什么？"
- **主动构建知识**：配方关系本身就是对概念之间联系的理解
- **低压力**：试错了不会扣分，只会有趣的反馈
- **自带动画奖励**：新卡片弹入的视觉反馈 = 多巴胺