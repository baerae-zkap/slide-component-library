# IR Component Library (IR 슬라이드 컴포넌트 라이브러리)

구글 슬라이드 및 파워포인트(PPT) 작성을 돕기 위한 다양한 프레젠테이션 컴포넌트 라이브러리입니다.
IR(Investor Relations) 발표 자료나 비즈니스 제안서 작성 시 자주 사용되는 레이아웃과 디자인을 손쉽게 활용할 수 있도록 돕습니다.

## 🌟 프로젝트 소개

이 프로젝트는 **Next.js**와 **PptxGenJS**를 활용하여 웹 환경에서 프레젠테이션 슬라이드를 미리보고, 실제 편집 가능한 **PPTX 파일로 생성**할 수 있는 도구입니다. 아름다운 디자인의 차트, 팀 소개, 타임라인 등을 컴포넌트 형태로 제공하여 생산성을 높여줍니다.

## 🛠 기술 스펙 (Tech Stack)

이 프로젝트는 최신 웹 기술을 기반으로 구축되었습니다.

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router 사용)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **PPT Generation**: [PptxGenJS](https://gitbrent.github.io/PptxGenJS/) (PPTX 파일 생성 코어 엔진)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) (아이콘)

## ✨ 주요 기능

- **다양한 PPT 컴포넌트**: IR 덱 작성에 필수적인 다양한 카테고리의 슬라이드 템플릿을 제공합니다.
- **실시간 미리보기 (Live Preview)**: 웹 브라우저 상에서 PPTX 결과물과 유사한 미리보기를 제공합니다.
- **편집 가능한 파일 내보내기**: 생성된 슬라이드는 이미지 방식이 아닌, 텍스트와 도형이 살아있는 **편집 가능한 PPTX** 파일로 다운로드됩니다.
- **일관된 디자인 시스템**: 전문적인 컬러 팔레트와 타이포그래피가 적용되어 있어, 별도의 디자인 작업 없이도 고품질의 결과물을 얻을 수 있습니다.

## 🎨 제공 컴포넌트 카테고리

다음과 같은 다양한 카테고리의 컴포넌트를 포함하고 있습니다:

1. **커버/디바이더 (Cover/Divider)**: 임팩트 있는 표지 및 섹션 간지
2. **문제/솔루션 (Problem/Solution)**: 핵심 문제 정의와 해결 방안 제시 레이아웃
3. **데이터/지표 (Data/Metrics)**: 핵심 성과 지표(KPI) 및 데이터 시각화
4. **팀 (Team)**: 팀원 소개 및 조직도
5. **타임라인 (Timeline)**: 로드맵, 연혁 시각화
6. **플로우/프로세스 (Flow/Process)**: 서비스 흐름도 및 프로세스 단계
7. **비교 (Comparison)**: 경쟁사 비교 및 기능 대조표
8. **파트너십 (Partnership)**: 협력사 및 파트너 로고 그리드
9. **에코시스템 (Ecosystem)**: 서비스 생태계 구조도
10. **제품 쇼케이스 (Product Showcase)**: 모바일/웹 서비스 목업 화면
11. **재무/지표 (Financials)**: 매출 추이 및 재무 계획

## 📦 설치 및 실행 방법

### 1. 저장소 클론 (Clone Repository)
```bash
git clone git@github.com:baerae-zkap/slide-component-library.git
cd slide-component-library
```

### 2. 의존성 설치 (Install Dependencies)
```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 3. 개발 서버 실행 (Run Development Server)
```bash
npm run dev
```

터미널에 명령어를 입력한 후, 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 프로젝트를 확인할 수 있습니다.

## 📂 프로젝트 구조 (Project Structure)

```
src/
├── app/              # Next.js App Router 페이지
├── components/       # UI 및 PPT 컴포넌트
│   ├── ir/           # IR 관련 핵심 슬라이드 컴포넌트들
│   ├── preview/      # PPTX 미리보기용 컴포넌트
│   └── ui/           # 일반 UI 컴포넌트 (버튼, 입력창 등)
├── lib/              # 유틸리티 함수 및 상수 (colors, registry 등)
├── store/            # 전역 상태 관리 (Zustand)
└── types/            # TypeScript 타입 정의
```

## 🚀 배포 (Deployment)

이 프로젝트는 [Vercel](https://vercel.com) 배포에 최적화되어 있습니다.
GitHub 저장소를 Vercel에 연결하면 손쉽게 배포할 수 있습니다.

---
© 2024 IR Component Library. All rights reserved.
