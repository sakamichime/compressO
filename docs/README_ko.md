<div align="center">
  <div align="center">
   <img width="100" height="100" src="public/logo.png" alt="Logo" />
  </div>
	<h1 align="center">CompressO</h1>
	<p align="center">
		모든 동영상을 작은 크기로 압축하세요.
    </p>
    <i align="center">
		CompressO (🔉 "에스프레소"처럼 발음)는 FFmpeg로 구동되는 무료 오픈 소스 크로스 플랫폼 동영상 압축 앱입니다.
    </i>
    <br />
    <p align="center">
		<strong>Linux</strong>, <strong>Windows</strong> & <strong>MacOS</strong>에서 사용 가능합니다.
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

### ✨ 기능

- 🎬 **동영상 압축** - 고품질로 모든 동영상을 압축
- 🌍 **다국어 지원** - 11개 언어 지원: English, 中文, 日本語, 한국어, Español, Français, Deutsch, Русский, Português, Tiếng Việt, Bahasa Indonesia
- 🚀 **GPU 가속** - NVIDIA (NVENC), AMD (AMF), Intel (QSV) GPU를 위한 하드웨어 가속 인코딩 지원
- ✂️ **트리밍 & 분할** - 시각적 타임라인 편집기로 동영상 트리밍 및 분할
- 📦 **일괄 압축** - 여러 동영상을 한 번에 압축
- 🎨 **동영상 변환** - 동영상 회전, 뒤집기, 자르기
- 🔊 **오디오 설정** - 볼륨, 비트레이트, 채널, 코덱 조정
- 📝 **자막 삽입** - 동영상에 자막 삽입
- 🏷 **메타데이터 편집** - 동영상 메타데이터 (제목, 아티스트, 연도 등) 편집
- 🖼️ **사용자 지정 썸네일** - 동영상에 사용자 지정 썸네일 설정
- 🔒 **개인정보 보호** - 완전히 오프라인으로 작동, 네트워크 요청 없음

### 설치
각 플랫폼용 설치 프로그램📦은 [releases](https://github.com/codeforreal1/compressO/releases) 페이지에서 다운로드할 수 있습니다.

<strong>설치 프로그램 정보:</strong>

- `CompressO_amd64.deb`: Ubuntu와 같은 Debian 계열 Linux
- `CompressO_amd64.AppImage`: 모든 Linux 배포판용 범용 패키지
- `CompressO_aarch64.dmg` : Apple Silicon 칩이 탑재된 Macbook용
- `CompressO_x64.dmg` : Intel 칩이 탑재된 Macbook용
- `CompressO_x64.msi`: Windows 64비트

<strong>Homebrew: MacOS만!</strong>
```
brew install --cask codeforreal1/tap/compresso
```

> [!NOTE]
> CompressO를 사용함으로써 [공증되지 않음](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution)을 인정하는 것으로 간주됩니다.
>
> 공증은 Apple의 "보안" 기능입니다.
> 바이너리를 Apple로 보내면 승인 여부가 결정됩니다.
> 실제로 공증은 Apple에 연간 $100 달러의 수수료를 지불하고 Apple이 원하는 방식으로 앱/바이너리를 빌드하는 것입니다.
>
> 이것은 무료 오픈 소스 앱입니다. Apple을 만족시키기 위해 연간 수수료를 지불하고 앱을 공증하는 것은 실현 가능하지 않습니다.
>
> [Homebrew 설치 스크립트](https://github.com/codeforreal1/homebrew-tap/blob/main/Casks/compresso.rb)는
> `com.apple.quarantine` 속성을 자동으로 삭제하도록 구성되어 있어, Apple이 게이트키퍼로 표시하는
> "CompressO가 손상되어 열 수 없습니다. 휴지통으로 이동해야 합니다."와 같은 경고 없이
> 앱이 즉시 작동해야 합니다.


### 기술

이 앱은 [Tauri](https://tauri.app/)를 사용하여 만들어졌습니다. Tauri는 크로스 플랫폼 데스크톱 앱을 구축하기 위한 Rust🦀 프레임워크입니다. 프론트엔드 레이어로 [Vite](https://vite.dev/)를 사용합니다. 압축은 플랫폼별 독립 실행형 바이너리를 사용하여 [FFmpeg](https://ffmpeg.org/)에 의해 완전히 수행됩니다.
앱은 완전히 오프라인으로 작동하며 앱으로/에서 네트워크 요청이 전혀 없습니다.

### 스크린샷
<details>
<summary>
  <strong> 
 	앱 스크린샷 보기
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

### 자주 묻는 질문
<details>
<summary>
  <strong> 
  MacOS: "CompressO"가 손상되어 열 수 없습니다. 휴지통으로 이동해야 합니다. 
  </strong>
</summary>
<img src="assets/image.png" width="300" />
<p>
  이 오류는 Apple이 앱 개발자가 연간 $100 달러의 수수료를 지불하고 Apple에 서명하지 않은 한 앱 사용을 게이트키퍼로 표시하기 위해 표시합니다. 메시지는 완전히 오해의 소지가 있으며 앱이 전혀 손상되지 않았습니다. 이것은 무료 앱이므로 Apple을 만족시켜 사람들이 내 앱을 신뢰하게 만들기 위해 Apple의 경로를 따를 생각이 없습니다. 이 문제의 간단한 해결책이 있습니다. 터미널을 열고 다음 명령을 실행하세요:
</p>

```
xattr -cr /Applications/CompressO.app
```
<p>
  Homebrew를 통해 앱을 설치하면 이 오류가 표시되지 않습니다.
</p>
<p>
  위의 해결책을 적용하는 것이 불편하다면 앱을 휴지통으로 이동하면 됩니다 (즉, Mac에서 CompressO를 사용할 수 없음).
</p>
</details>
<details>
<summary>
  <strong>MacOS: 개발자를 확인할 수 없어 "CompressO"를 열 수 없습니다.</strong>
</summary>
<img src="assets/image-1.png" width="300" />
<p>
  이 오류는 본질적으로 자주 묻는 질문 1과 동일합니다. Apple은 확인되지 않은 개발자에 대해 사용자에게 경고하기 위해 다른 메시지를 표시할 뿐입니다. 자주 묻는 질문 1의 해결책을 참조하세요:
</p>
<pre><code>
xattr -cr /Applications/CompressO.app
</code></pre>
<p>
  Homebrew를 통해 앱을 설치하면 이 오류가 표시되지 않습니다.
</p>
<p>
  명령을 실행하고 싶지 않다면 앱을 마우스 오른쪽 버튼으로 클릭하고 "열기"를 선택하여 경고를 우회하거나 앱을 휴지통으로 이동할 수 있습니다.
</p>
</details>

<details>
<summary>
  <strong>Windows: Microsoft Defender SmartScreen이 인식할 수 없는 앱의 시작을 차단했습니다. 이 앱을 실행하면 PC가 위험에 처할 수 있습니다.</strong>
</summary>
<img src="assets/image-2.png" width="500" />
<p>
  이것은 외부 소스에서 Windows 설치 프로그램을 다운로드했기 때문에 발생합니다. Windows Defender는 알 수 없는 앱을 실행하기 전에 경고합니다. "자세한 정보"를 클릭한 다음 "어쨌든 실행"을 선택하여 CompressO를 안전하게 설치할 수 있습니다.
</p>
</details>

<details>
<summary>
  <strong>Debian 13 및 Ubuntu 24에서 앱이 작동하지 않음</strong>
</summary>
<p>
  Tauri가 Debian 13 및 그 파생 버전(예: Ubuntu 24)에서 제거된 일부 패키지가 누락된 것으로 보입니다. Tauri 팀이 이 문제를 조사 중이므로 안타깝게도 현재로서는 해결책이 없습니다.
</p>
</details>

### 라이선스 🚨
<a href="./LICENSE">AGPL 3.0 라이선스</a>

<p className="block text-sm">
이 소프트웨어는 LGPLv2.1에 따라 FFmpeg 프로젝트의 라이브러리를 사용합니다.
</p>
