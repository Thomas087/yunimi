export interface PlatformConfig {
  value: string
  label: string
  description: string
  icon: string
}

export const PLATFORM_CONFIGS: PlatformConfig[] = [
  { 
    value: 'red', 
    label: 'Red', 
    description: 'China\'s leading social media platform',
    icon: '🔴'
  },
  { 
    value: 'weibo', 
    label: 'Weibo', 
    description: 'China\'s Twitter equivalent',
    icon: '📱'
  },
  { 
    value: 'wechat', 
    label: 'WeChat', 
    description: 'Multi-purpose messaging and social app',
    icon: '💬'
  },
  { 
    value: 'douyin', 
    label: 'Douyin', 
    description: 'China\'s TikTok - short video platform',
    icon: '🎵'
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

export const getPlatformDescription = (platformValue: string): string => {
  const config = getPlatformConfig(platformValue)
  return config ? config.description : ''
}
