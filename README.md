# blog_node
- 我发誓这是最后一次开blog的坑
- 解决一些痛点,并学习熟练一些刚学习过的技术

## 要解决的问题
- 此项目主要重构原先的blog项目
    - 解决老项目 blog 不被搜索引擎收录的问题
        - 完全分离的锅子
    - 解决用爬虫去获取github的问题
        - 使用githubAPI获取
    - 解决本地化markdown的问题
        - 脱离github可提交markdown

## 技术选型
- nodejs
    - express
        - 轻量级web框架,简洁,扩展性好
    - swig
        - 前端模板引擎
            - 学习成本较低
- vue.js
    - 解决一些数据交互问题
- 其他待补充

## 代码管理问题
- 下个提交引入workflow插件 管理源代码