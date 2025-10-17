export interface PlatformConfig {
  value: string
  label: string
  description: string
  icon: string
  imagePath?: string
}

export const PLATFORM_CONFIGS: PlatformConfig[] = [
  { 
    value: 'red', 
    label: 'Red', 
    description: 'China\'s leading social media platform',
    icon: '🔴',
    imagePath: '/images/platforms/red.svg'
  },
  { 
    value: 'weibo', 
    label: 'Weibo', 
    description: 'China\'s Twitter equivalent',
    icon: '📱',
    imagePath: '/images/platforms/weibo.svg'
  },
  { 
    value: 'wechat', 
    label: 'WeChat', 
    description: 'Multi-purpose messaging and social app',
    icon: '💬',
    imagePath: '/images/platforms/wechat.svg'
  },
  { 
    value: 'douyin', 
    label: 'Douyin', 
    description: 'China\'s TikTok - short video platform',
    icon: '🎵',
    imagePath: '/images/platforms/douyin.svg'
  }
]

export const getPlatformConfig = (platformValue: string): PlatformConfig | undefined => {
  return PLATFORM_CONFIGS.find(config => config.value === platformValue)
}

export const getPlatformLabel = (platformValue: string): string => {
  const config = getPlatformConfig(platformValue)
  return config ? config.label : platformValue
}

export const getPlatformIcon = (platformValue: string): string => {
  const config = getPlatformConfig(platformValue)
  return config ? config.icon : '📱'
}

export const getPlatformImagePath = (platformValue: string): string | undefined => {
  const config = getPlatformConfig(platformValue)
  return config ? config.imagePath : undefined
}

export const getPlatformDescription = (platformValue: string): string => {
  const config = getPlatformConfig(platformValue)
  return config ? config.description : ''
}
