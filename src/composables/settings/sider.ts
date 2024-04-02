enum Sidebars {
  Theme = '主题',
  Smart = '清单',
}

interface SidebarsItem {
  title: Sidebars
  name: string
  path: string
}

export const sidebars: Array<SidebarsItem> = [
  {
    title: Sidebars.Theme,
    name: 'theme',
    path: '/theme',
  },
  {
    title: Sidebars.Smart,
    name: 'smart',
    path: '/smart',
  },
]
