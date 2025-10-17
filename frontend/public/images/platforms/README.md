# Platform Images

This folder contains the platform icons for the social media platforms used in the signup process.

## Required Images

Place the following image files in this directory:

- `red.png` - Red platform icon
- `weibo.png` - Weibo platform icon
- `wechat.png` - WeChat platform icon
- `douyin.png` - Douyin platform icon

## Image Requirements

- **Format**: PNG (recommended) or SVG
- **Size**: 64x64 pixels minimum (will be scaled as needed)
- **Background**: Transparent or white
- **Style**: Consistent with your brand design
- **Quality**: High resolution for crisp display

## Fallback Behavior

If an image file is missing or fails to load, the system will automatically fall back to the emoji icon defined in the platform configuration.

## Usage

The images are automatically used when `useImage="true"` is set on the `PlatformIcon` component. You can switch between images and emojis by toggling this prop.

## Adding New Platforms

1. Add the platform configuration to `src/constants/platforms.ts`
2. Add the corresponding image file to this directory
3. The image will be automatically available in all components using `PlatformIcon`
