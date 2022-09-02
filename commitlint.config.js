module.exports = {
  ignores: [commit => commit.includes('init')], // 忽略带有init 的信息
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'], // body 换行
    'footer-leading-blank': [2, 'always'], // footer 换行
    'header-max-length': [2, 'always', 108], // 头部的字数
    'subject-empty': [2, 'never'], // <subject> 不能为空
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新  功能
        'fix', // 修改 bug
        'perf', // 性能优化
        'style', // 代码结构化修改
        'docs', // 文档和注释
        'test', // 测试相关
        'refactor', // 重构
        'ci', // 持续集成
        'chore', // 依赖更新/脚手架配置修改
        'revert', // 撤销修改
        'wip', // 正在开发
        'workflow', // 工作流
        'types', // 类型定义文件修改
      ]
    ]
  }
}