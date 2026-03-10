<div align="center">
  <div align="center">
   <img width="100" height="100" src="public/logo.png" alt="Logo" />
  </div>
	<h1 align="center">CompressO</h1>
	<p align="center">
		あらゆる動画を小さなサイズに圧縮します。
    </p>
    <i align="center">
		CompressO (🔉 「エスプレッソ」のように発音 ) は、FFmpeg を搭載した無料のオープンソース クロスプラットフォーム動画圧縮アプリです。
    </i>
    <br />
    <p align="center">
		<strong>Linux</strong>、<strong>Windows</strong>、<strong>MacOS</strong> に対応しています。
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

### ✨ 機能

- 🎬 **動画圧縮** - 高品質であらゆる動画を圧縮
- 🌍 **多言語対応** - 11言語に対応：English、中文、日本語、한국어、Español、Français、Deutsch、Русский、Português、Tiếng Việt、Bahasa Indonesia
- 🚀 **GPU アクセラレーション** - NVIDIA (NVENC)、AMD (AMF)、Intel (QSV) GPU に対応したハードウェアアクセラレーションエンコード
- ✂️ **トリミング & 分割** - ビジュアルタイムラインエディタで動画をトリミング・分割
- 📦 **バッチ圧縮** - 複数の動画を一度に圧縮
- 🎨 **動画変換** - 動画の回転、反転、クロップ
- 🔊 **オーディオ設定** - 音量、ビットレート、チャンネル、コーデックを調整
- 📝 **字幕埋め込み** - 動画に字幕を埋め込み
- 🏷 **メタデータ編集** - 動画のメタデータ（タイトル、アーティスト、年など）を編集
- 🖼️ **カスタムサムネイル** - 動画にカスタムサムネイルを設定
- 🔒 **プライバシー重視** - 完全にオフラインで動作、ネットワークリクエストなし

### インストール
各プラットフォーム向けのインストーラー📦 は [releases](https://github.com/codeforreal1/compressO/releases) ページからダウンロードできます。

<strong>インストーラー情報:</strong>

- `CompressO_amd64.deb`: Ubuntu などの Debian 系 Linux
- `CompressO_amd64.AppImage`: すべての Linux ディストリビューション用のユニバーサルパッケージ
- `CompressO_aarch64.dmg` : Apple Silicon チップ搭載の Macbook 用
- `CompressO_x64.dmg` : Intel チップ搭載の Macbook 用
- `CompressO_x64.msi`: Windows 64 ビット

<strong>Homebrew: MacOS のみ!</strong>
```
brew install --cask codeforreal1/tap/compresso
```

> [!NOTE]
> CompressO を使用することにより、[公証済み](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution) ではないことを認めたものとみなされます。
>
> 公証は Apple による「セキュリティ」機能です。
> バイナリを Apple に送信し、承認するかどうかが決まります。
> 実際には、公証は Apple に年間 100 ドルの料金を支払い、Apple が望む方法でアプリ/バイナリをビルドすることです。
>
> これは無料のオープンソースアプリです。Apple を満足させるために年間料金を支払い、アプリを公証することは実現可能ではありません。
>
> [Homebrew インストールスクリプト](https://github.com/codeforreal1/homebrew-tap/blob/main/Casks/compresso.rb) は
> `com.apple.quarantine` 属性を自動的に削除するように設定されているため、Apple がゲートキーパーとして表示する
> 「CompressO は破損しているため開けません。ゴミ箱に入れる必要があります。」 などの警告なしで、
> アプリはすぐに動作するはずです。


### 技術

このアプリは [Tauri](https://tauri.app/) を使用して作成されています。Tauri は、クロスプラットフォームのデスクトップアプリを構築するための Rust🦀 フレームワークです。フロントエンドレイヤーとして [Vite](https://vite.dev/) を使用しています。圧縮は、プラットフォーム固有のスタンドアロンバイナリを使用して [FFmpeg](https://ffmpeg.org/) によって完全に行われます。
アプリは完全にオフラインで動作し、アプリとの間でネットワークリクエストは一切行われません。

### スクリーンショット
<details>
<summary>
  <strong> 
 	アプリのスクリーンショットを表示
  </strong>
</summary>
	<img src="https://github.com/user-attachments/assets/f89d3c18-20fd-4359-937b-d4f0c2a4a3f8" width="100%" alt="Compression Output" loading="lazy" />
	<img src="https://github.com/user-attachments/assets/49f95db6-5e9e-4abf-bc7f-54dd3f0ae534" width="100%" alt="Trim/Split feature" loading="lazy" />
	<img src="https://github.com/user-attachments/assets/b96fcd4b-1d02-4394-9dd7-419cb4568234" width="100%" alt="Batch Compression" loading="lazy" />
	<img src="https://github.com/user-attachments/assets/d86dae45-60c9-4d54-b7b2-98674105103a" width="576" alt="Vide/Audio Config" loading="lazy" />
	<img src="https://github.com/user-attachments/assets/f7877316-ab91-4f08-9b4d-e2bb21cc8d5a" width="576" alt="App Settings" loading="lazy" />
	<img src="https://github.com/user-attachments/assets/b7367803-c336-4eca-a8e3-cf53044340df" width="576" alt="Subtitle Embed" loading="lazy" />
	<img src="https://github.com/user-attachments/assets/23bdeb17-5fb1-4376-84ed-61a0712e7aea" width="576" alt="Metadata Update" loading="lazy" />
	<img src="https://github.com/user-attachments/assets/61559ad7-cd2c-46cf-925f-ae189db0599c" width="576" alt="About" loading="lazy" />
</details>

### よくある質問
<details>
<summary>
  <strong> 
  MacOS: 「CompressO」は破損しているため開けません。ゴミ箱に入れる必要があります。 
  </strong>
</summary>
<img src="assets/image.png" width="300" />
<p>
  このエラーは、Apple がアプリ開発者が年間 100 ドルの料金を支払って Apple に署名されない限り、アプリの使用をゲートキーパーとして表示するものです。メッセージは完全に誤解を招くもので、アプリはまったく破損していません。これは無料のアプリなので、Apple のルートをたどって人々にアプリを信頼させるために Apple を満足させるつもりはありません。この問題の簡単な解決策があります。ターミナルを開いて次のコマンドを実行してください：
</p>

```
xattr -cr /Applications/CompressO.app
```
<p>
  Homebrew 経由でアプリをインストールした場合、このエラーは表示されません。
</p>
<p>
  上記の解決策を適用することに不安がある場合は、アプリをゴミ箱に移動してください（つまり、Mac で CompressO を使用できなくなります）。
</p>
</details>
<details>
<summary>
  <strong>MacOS: 「CompressO」は開発者が確認できないため開けません。</strong>
</summary>
<img src="assets/image-1.png" width="300" />
<p>
  このエラーは本質的によくある質問 1 と同じです。Apple は未確認の開発者についてユーザーに警告するために異なるメッセージを表示しているだけです。よくある質問 1 の解決策を参照してください：
</p>
<pre><code>
xattr -cr /Applications/CompressO.app
</code></pre>
<p>
  Homebrew 経由でアプリをインストールした場合、このエラーは表示されません。
</p>
<p>
  コマンドを実行したくない場合は、アプリを右クリックして「開く」を選択して警告を回避するか、アプリをゴミ箱に移動できます。
</p>
</details>

<details>
<summary>
  <strong>Windows: Microsoft Defender SmartScreen が認識されないアプリの起動を阻止しました。このアプリを実行すると PC が危険にさらされる可能性があります。</strong>
</summary>
<img src="assets/image-2.png" width="500" />
<p>
  これは、外部ソースから Windows インストーラーをダウンロードしたために発生します。Windows Defender は、未知のアプリを実行する前に警告します。「詳細情報」をクリックし、「とにかく実行」を選択することで、CompressO を安全にインストールできます。
</p>
</details>

<details>
<summary>
  <strong>アプリが Debian 13 と Ubuntu 24 で動作しない</strong>
</summary>
<p>
  Tauri は、Debian 13 とその派生版（Ubuntu 24 など）で削除されたいくつかのパッケージが不足しているようです。Tauri チームはこの問題を調査中なので、残念ながら現時点では解決策がありません。
</p>
</details>

### ライセンス 🚨
<a href="./LICENSE">AGPL 3.0 ライセンス</a>

<p className="block text-sm">
このソフトウェアは、LGPLv2.1 の下で FFmpeg プロジェクトのライブラリを使用しています。
</p>
