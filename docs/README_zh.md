<div align="center">
  <div align="center">
   <img width="100" height="100" src="public/logo.png" alt="Logo" />
  </div>
	<h1 align="center">CompressO</h1>
	<p align="center">
		将任何视频压缩成小体积。
    </p>
    <i align="center">
		CompressO (🔉 发音类似 "Espresso" ) 是一款免费开源的跨平台视频压缩应用，由 FFmpeg 驱动。
    </i>
    <br />
    <p align="center">
		支持 <strong>Linux</strong>、<strong>Windows</strong> 和 <strong>MacOS</strong>。
    </p>
    <br />
	<div>
  <a href="https://github.com/codeforreal1/compressO/releases">
    <img alt="Linux" src="https://img.shields.io/badge/-Linux-yellow?style=flat-square&logo=linux&logoColor=black&color=orange" />
  </a>
  <a href="https://github.com/codeforreal1/compressO/releases">
    <img alt="Windows" src="https://img.shields.io/badge/-Windows-blue?style=flat-square&logo=windows&logoColor=white" />
  </a>
  <a href="https://github.com/codeforreal1/compressO/releases">
    <img alt="macOS" src="https://img.shields.io/badge/-macOS-black?style=flat-square&logo=apple&logoColor=white" />
  </a>
</div>
	    <br />

</div>

### 🌐 Languages / 语言 / 言語 / 언어

[**English**](../README.md) | [**中文**](README_zh.md) | [**日本語**](README_ja.md) | [**한국어**](README_ko.md)

<div align="center">
    <img src="public/screenshot.png" alt="Screenshot" height="500" style="border-radius: 16px;" />
</div>

### ✨ 功能特性

- 🎬 **视频压缩** - 高质量压缩任何视频
- 🌍 **多语言支持** - 支持 11 种语言：English、中文、日本語、한국어、Español、Français、Deutsch、Русский、Português、Tiếng Việt、Bahasa Indonesia
- 🚀 **GPU 加速** - 支持 NVIDIA (NVENC)、AMD (AMF) 和 Intel (QSV) GPU 的硬件加速编码
- ✂️ **裁剪与分割** - 可视化时间轴编辑器，裁剪和分割视频
- 📦 **批量压缩** - 一次压缩多个视频
- 🎨 **视频变换** - 旋转、翻转和裁剪视频
- 🔊 **音频配置** - 调整音量、比特率、声道和编码器
- 📝 **字幕嵌入** - 将字幕嵌入视频
- 🏷️ **元数据编辑** - 编辑视频元数据（标题、艺术家、年份等）
- 🖼️ **自定义缩略图** - 为视频设置自定义缩略图
- 🔒 **隐私优先** - 完全离线工作，无网络请求

### 安装
从 [releases](https://github.com/codeforreal1/compressO/releases) 页面下载特定平台的安装包📦。

<strong>安装包说明：</strong>

- `CompressO_amd64.deb`: Debian 系 Linux 发行版，如 Ubuntu
- `CompressO_amd64.AppImage`: 适用于所有 Linux 发行版的通用包
- `CompressO_aarch64.dmg` : 适用于搭载 Apple Silicon 芯片的 MacBook
- `CompressO_x64.dmg` : 适用于搭载 Intel 芯片的 MacBook
- `CompressO_x64.msi`: Windows 64 位

<strong>Homebrew: 仅限 MacOS!</strong>
```
brew install --cask codeforreal1/tap/compresso
```

> [!NOTE]
> 使用 CompressO 即表示您承认它未经 [公证](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution)。
>
> 公证是 Apple 的"安全"功能。
> 您将二进制文件发送给 Apple，他们要么批准要么不批准。
> 实际上，公证是向 Apple 支付每年 100 美元的费用，并按照他们想要的方式构建应用/二进制文件。
>
> 这是一个免费的开源应用。支付年费并公证应用以取悦 Apple 是不可行的。
>
> [Homebrew 安装脚本](https://github.com/codeforreal1/homebrew-tap/blob/main/Casks/compresso.rb) 配置为
> 自动删除 `com.apple.quarantine` 属性，因此应用应该可以开箱即用，不会出现
> "CompressO 已损坏，无法打开。您应该将其移至垃圾箱。" 这样的警告，这是 Apple 作为看门人显示的。


### 技术

此应用使用 [Tauri](https://tauri.app/) 创建，这是一个 Rust🦀 框架，用于构建跨平台桌面应用。它使用 [Vite](https://vite.dev/) 作为前端层。压缩完全由 [FFmpeg](https://ffmpeg.org/) 使用特定平台的独立二进制文件完成。
应用完全离线工作，应用不会进行任何网络请求。

### 截图
<details>
<summary>
  <strong> 
 	查看应用截图
  </strong>
</summary>
	<img src="https://github.com/user-attachments/assets/f89d3c18-20fd-4359-937b-d4f0c2a4a3f8" width="100%" alt="压缩输出" loading="lazy" />
	<img src="https://github.com/user-attachments/assets/49f95db6-5e9e-4abf-bc7f-54dd3f0ae534" width="100%" alt="裁剪/分割功能" loading="lazy" />
	<img src="https://github.com/user-attachments/assets/b96fcd4b-1d02-4394-9dd7-419cb4568234" width="100%" alt="批量压缩" loading="lazy" />
	<img src="https://github.com/user-attachments/assets/d86dae45-60c9-4d54-b7b2-98674105103a" width="576" alt="视频/音频配置" loading="lazy" />
	<img src="https://github.com/user-attachments/assets/f7877316-ab91-4f08-9b4d-e2bb21cc8d5a" width="576" alt="应用设置" loading="lazy" />
	<img src="https://github.com/user-attachments/assets/b7367803-c336-4eca-a8e3-cf53044340df" width="576" alt="字幕嵌入" loading="lazy" />
	<img src="https://github.com/user-attachments/assets/23bdeb17-5fb1-4376-84ed-61a0712e7aea" width="576" alt="元数据更新" loading="lazy" />
	<img src="https://github.com/user-attachments/assets/61559ad7-cd2c-46cf-925f-ae189db0599c" width="576" alt="关于" loading="lazy" />
</details>

### 常见问题
<details>
<summary>
  <strong> 
  MacOS: "CompressO" 已损坏，无法打开。您应该将其移至垃圾箱。 
  </strong>
</summary>
<img src="assets/image.png" width="300" />
<p>
  此错误由 Apple 显示，用于阻止应用开发者使用其应用，除非在支付 100 美元/年费用后由 Apple 签名。该消息完全具有误导性，因为应用根本没有损坏。由于这是一个免费应用，我不会走 Apple 的路线，只是为了让他们信任我的应用。以下是此问题的简单解决方案。打开终端并运行命令：
</p>

```
xattr -cr /Applications/CompressO.app
```
<p>
  如果通过 Homebrew 安装应用，则不会显示此错误。
</p>
<p>
  如果您对应用上述解决方案感到不舒服，可以简单地将应用移至垃圾箱（这也意味着您无法在 Mac 上使用 CompressO）。
</p>
</details>
<details>
<summary>
  <strong>MacOS: 无法打开 "CompressO"，因为无法验证开发者。</strong>
</summary>
<img src="assets/image-1.png" width="300" />
<p>
  此错误本质上与常见问题 1 相同。Apple 只是显示不同的消息来警告用户有关未验证开发者的信息。请参考常见问题 1 中的解决方案：
</p>
<pre><code>
xattr -cr /Applications/CompressO.app
</code></pre>
<p>
  如果通过 Homebrew 安装应用，则不会显示此错误。
</p>
<p>
  如果您不想运行命令，可以右键单击应用并选择"打开"以绕过警告，或将应用移至垃圾箱。
</p>
</details>

<details>
<summary>
  <strong>Windows: Microsoft Defender SmartScreen 阻止了一个无法识别的应用启动。运行此应用可能会使您的电脑面临风险。</strong>
</summary>
<img src="assets/image-2.png" width="500" />
<p>
  发生这种情况是因为您从外部来源下载了 Windows 安装程序。Windows Defender 会在运行任何未知应用之前警告您。您可以通过单击"更多信息"然后选择"仍要运行"来安全地安装 CompressO。
</p>
</details>

<details>
<summary>
  <strong>应用在 Debian 13 和 Ubuntu 24 上无法工作</strong>
</summary>
<p>
  Tauri 似乎缺少在 Debian 13 及其衍生版本（如 Ubuntu 24）中删除的一些软件包。Tauri 团队正在调查此问题，因此目前没有解决方案。
</p>
</details>

### 许可证 🚨

<a href="./LICENSE">AGPL 3.0 许可证</a>

<p className="block text-sm">
本软件使用 FFmpeg 项目的库，遵循 LGPLv2.1。
</p>
