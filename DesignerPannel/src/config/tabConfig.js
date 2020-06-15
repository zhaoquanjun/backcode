var tabList = (function() {
  return [
    {
      name: '数据',
      icon: require('@static/images/tab/data.png'),
      activeIcon: require('@static/images/tab/data_active.png'),
      style: { width: '17px', height: '18px' }
    },
    {
      name: '样式',
      icon: require('@static/images/tab/style.png'),
      activeIcon: require('@static/images/tab/style_active.png'),
      style: { width: '18px', height: '17px' }
    },
    {
      name: '触发',
      icon: require('@static/images/tab/trigger.png'),
      activeIcon: require('@static/images/tab/trigger_active.png'),
      style: { width: '12px', height: '16px' }
    },
    {
      name: '动效',
      icon: require('@static/images/tab/animate.png'),
      activeIcon: require('@static/images/tab/animate_active.png'),
      style: { width: '22px', height: '19px' }
    },
    {
      name: '排列',
      icon: require('@static/images/tab/layout.png'),
      activeIcon: require('@static/images/tab/layout_active.png'),
      style: { width: '19px', height: '20px' }
    }
  ]
})()

export default tabList
