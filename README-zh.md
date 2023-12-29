# react-hooks-audio

适合在 React 16.x 技术栈项目中使用。

# 🎉 特性

- 自定义音频播放
- 基于 React Hooks 实现

# 🎉 在线 demo

https://winfans.github.io/react-hooks-audio/

# 安装

```
npm install --save react-hooks-audio
```

# 用法

<a href="https://github.com/Winfans/react-hooks-audio/blob/main/example/components/audio-player/index.tsx">demo</a>

```
import { useAudio } from 'react-hooks-audio';
const { playing, play, pause, currentTime, audioTime, setCurrentTime, init, rePlay } = useAudio({ value: 'xxx' });
```

# 浏览器兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                      | last 3 versions                                                                                                                                                                                                   | last 3 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |

# 开源协议

react-hooks-audio 遵循 [MIT 协议](https://github.com/Winfans/react-hooks-audio/LICENSE)。
