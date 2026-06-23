# 📷 스냅블리스 (SnapBliss) - 프로젝트 문서화

동탄, 화성, 경기 남부 지역을 중심으로 활동하는 출장스냅 전문 브랜드 **'스냅블리스 (SnapBliss)'**의 공식 단일 페이지 웹사이트 프로젝트입니다. 따뜻하고 부드러운 감성을 담은 디자인과 반응형 레이아웃, 풍부한 마이크로 인터랙션을 반영하여 개발되었습니다.

---

## 📂 디렉토리 구조 (Directory Structure)

본 프로젝트는 경량화와 빠른 로딩 속도를 위해 프레임워크 없이 순수 HTML, CSS, JavaScript로 구현된 정적 웹 사이트입니다.

```text
홈페이지/
│
├── index.html          # 메인 페이지 마크업 (SEO 및 시맨틱 태그 적용)
│
├── css/
│   └── style.css       # 메인 스타일시트 (디자인 시스템 변수, 레이아웃, 애니메이션 정의)
│
├── js/
│   └── main.js         # 인터랙션 스크립트 (네비게이션, 필터링, 탭 전환, 스크롤 애니메이션)
│
└── images/             # 이미지 리소스 폴더
    └── hero_bg.png     # 히어로 섹션 배경 이미지
```

---

## 🎨 디자인 시스템 & 스타일 가이드 (Design System)

스냅블리스 브랜드가 지향하는 **"따뜻하고 밝은 가족·아기 스냅 감성"**을 시각적으로 전달하기 위해 맞춤형 HSL 컬러 팔레트와 타이포그래피를 정의하여 사용 중입니다.

### 1. 색상 정의 (CSS Variables)
`css/style.css` 상단에 선언되어 일관되게 적용된 주요 색상표입니다.

| 변수명 | 색상 코드 | 설명 | 적용 위치 |
| :--- | :--- | :--- | :--- |
| `--cream` | `#FFF8F0` | 따뜻하고 부드러운 미색 | 웹 사이트 기본 배경색 |
| `--blush` | `#F2C4B8` | 연한 핑크빛 스킨톤 | 보더, 플레이스홀더 배경 |
| `--rose` | `#E8927A` | 브랜드 시그니처 웜로즈 | 포인트 컬러, 액티브 탭, 강조 텍스트 |
| `--warm-brown` | `#8B5E52` | 따뜻한 톤의 브라운 | 타이틀, 로고 텍스트, 메인 아이콘 |
| `--gold` | `#C9956A` | 차분하고 고급스러운 골드 | 그라디언트 포인트, 배지 라인 |
| `--soft-pink` | `#F9EDE8` | 부드러운 핑크베이지 | 섹션 배경, 호버 시 배경색 |
| `--text-dark` | `#3A2E2A` | 가독성 높은 짙은 갈색 | 기본 본문 글자색 |

### 2. 타이포그래피 (Typography)
*   **영문 / 로고**: `Playfair Display` (Serif 계열) — 감성적이고 클래식한 분위기를 연출합니다.
*   **국문 / 본문**: `Noto Sans KR` (Sans-serif 계열) — 가독성이 높고 깔끔한 화면을 제공합니다.

---

## ✨ 핵심 기능 분석 (Key Features)

### 1. 스크롤 인터랙션
*   **스크롤 진행 바 (Scroll Progress Bar)**: 화면 상단에 페이지 전체 대비 스크롤 진척도를 바(`linear-gradient` 사용)로 시각화하여 사용자가 콘텐츠의 깊이를 인지할 수 있게 돕습니다.
*   **헤더 효과 (Header Scroll Effect)**: 스크롤을 내릴 때 상단 고정 헤더의 높이가 줄어들고(`68px` ➡️ `58px`), 미세한 그림자(`box-shadow`)와 불투명 배경이 생성되어 콘텐츠 가독성을 보장합니다.
*   **스크롤 애니메이션 (Scroll Reveal)**: `IntersectionObserver`를 활용하여 화면 스크롤 시 각 섹션 요소들이 자연스럽게 아래에서 위로 떠오르는 페이드인(`reveal`) 애니메이션 효과를 구현했습니다.

### 2. 모바일 반응형 네비게이션
*   화면 너비에 맞춰 레이아웃이 유연하게 변경되며, 모바일 기기에서는 우측 상단 햄버거 메뉴 버튼을 통해 부드럽게 세로 메뉴가 슬라이드 다운되도록 처리했습니다.

### 3. 포트폴리오 카테고리 필터링 (Gallery Filter)
*   돌스냅, 웨딩, 야외스냅, 행사 등의 카테고리 버튼을 누르면, JavaScript가 각 아이템의 `data-category` 속성을 감지하여 가시성을 조정합니다.
*   `opacity` 및 `scale` 트랜지션을 주어 아이템이 딱딱하게 끊기지 않고 부드럽게 사라지고 나타나도록 연출했습니다.

### 4. 가격 패키지 탭 전환 (Pricing Tabs)
*   각 카테고리별 요금 정보가 불필요하게 스크롤을 늘리지 않도록 탭 인터페이스를 차용했습니다.
*   원하는 서비스를 선택하면 해당 요금제 정보(Basic, Standard, Premium 등)만 동적으로 표기되며 애니메이션이 재실행됩니다.

### 5. 예약/문의 다중 연동 (Contact & Call to Action)
*   네이버 톡톡, 네이버 스마트스토어, 전화 걸기, 인스타그램 다이렉트 메시지 등 고객이 가장 선호하는 채널로 바로 연결되도록 링크와 버튼이 구성되어 있습니다.
*   화면 우측 하단에 항상 고정되는 **플로팅 CTA (Floating Call-To-Action)**를 배치하여 언제든 간편하게 문의할 수 있는 환경을 만들었습니다.

---

## 🛠️ 유지보수 및 커스터마이징 가이드 (Maintenance Guide)

### 1. 포트폴리오 사진 교체 방법
현재 포트폴리오 영역은 기본 이모지와 타이틀을 보여주는 `.gallery-placeholder` 구조로 되어 있습니다. 실제 촬영물 이미지 파일(`jpg`, `png` 등)을 추가하려면 `index.html` 파일의 `#gallery-grid` 내 요소를 다음과 같이 변경하십시오.

**기존 코드:**
```html
<div class="gallery-item reveal" data-category="dol" id="gal-1">
  <div class="gallery-placeholder">
    <span>🎂</span>
    <p>돌스냅 사진</p>
  </div>
  <div class="gallery-item-overlay"><span class="gallery-item-label">돌스냅</span></div>
</div>
```

**변경 후 코드:**
```html
<div class="gallery-item reveal" data-category="dol" id="gal-1">
  <img src="./images/photos/dol_01.jpg" alt="돌잔치 현장 출장 돌스냅 사진" loading="lazy" />
  <div class="gallery-item-overlay"><span class="gallery-item-label">돌스냅</span></div>
</div>
```
> [!TIP]
> 이미지 로딩 지연으로 인한 초기 렌더링 부하를 줄이기 위해 `loading="lazy"` 속성을 필수로 기입해주시는 것이 SEO 및 성능 측면에서 권장됩니다.

### 2. 채널별 외부 연결 링크 수정
`index.html`에서 문의 연결이 동작하지 않거나 다른 주소로 교체하려면 아래의 아이디(`id`)를 참조하여 링크 주소(`href`)를 갱신하면 됩니다.

*   **네이버 톡톡**: `id="contact-naver-btn"`, `id="float-naver-btn"` ➡️ `href="https://talk.naver.com/ct/자신의톡톡아이디"`
*   **네이버 스마트스토어**: `id="contact-store-btn"`, `id="footer-store"` ➡️ `href="https://smartstore.naver.com/자신의스토어주소"`
*   **전화 걸기**: `id="contact-phone-btn"`, `id="float-phone-btn"`, `id="footer-phone"` ➡️ `href="tel:010-XXXX-XXXX"`
*   **인스타그램**: `id="gallery-insta-link"`, `id="contact-insta-btn"`, `id="footer-insta"` ➡️ `href="https://www.instagram.com/자신의계정"`
*   **네이버 플레이스**: `id="footer-place"` ➡️ `href="https://map.naver.com/p/entry/place/등록된장소번호"`

---

## 💡 성능 및 SEO 최적화 사항 (SEO Best Practices)
*   **구조화된 타이틀 & 설명 메타데이터**: 네이버/구글 검색에 노출될 수 있도록 제목 태그, 설명 메타 태그, 주요 검색 키워드(동탄 돌스냅, 웨딩스냅 등)를 정성껏 배치했습니다.
*   **Open Graph 프로토콜**: 카카오톡이나 SNS에 홈페이지 링크를 공유할 때 썸네일 이미지(`hero_bg.png`)와 브랜드 설명이 이쁘게 나올 수 있게 최적화했습니다.
*   **시맨틱 마크업**: `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>` 등의 시맨틱 요소를 적극 채택하여 검색엔진의 크롤링 편의성과 접근성을 높였습니다.
