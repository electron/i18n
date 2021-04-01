# 实验APIs

有些Electrons API被标记为文档中的 `_Experimental_`。 This tag indicates that the API may not be considered stable and the API may be removed or modified more frequently than other APIs with less warning.

## 标记为实验的 API 的条件

Anyone can request an API be tagged as experimental in a feature PR, disagreements on the experimental nature of a feature can be discussed in the API WG if they can't be resolved in the PR.

## 移除实验性标签的过程

Once an API has been stable and in at least two major stable release lines it can be nominated to have its experimental tag removed.  这个讨论 应该在 API 工作组会议上进行。  讨论/提名时要考虑的事项：

* 上面的“两条主要马铃薯释放线”条件必须已经达到。
* 在这段时间内，不应该因采用此功能而引起任何主要bug/问题
* API 足够稳定，并且没有受到Chromium升级的严重影响
* 是否有人使用API？
* API 是否满足原来的拟议用途，是否有任何空白？
