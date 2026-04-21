# 챗봇 UX 개편 모달

## 폴더 구조 (npm workspaces 모노레포)
`Modal/` 가 모노레포 루트. 공용 의존성·잠금파일·gitignore 는 루트 한 곳에서만 관리하고,
각 모달은 독립 Vite 프리뷰 + Vercel 배포 단위로 동작합니다.

```
Modal/
├── package.json            # workspaces 선언, 공용 scripts (build:settings / build:preview)
├── package-lock.json       # 단일 lockfile (workspaces hoist)
├── node_modules/           # 단일 hoisted node_modules
├── .npmrc                  # 로컬 루트 설치용 (Blumnai 사설 레지스트리 토큰)
├── .gitignore              # git은 재귀 적용되므로 하위 모달 전부 커버
├── CLAUDE.md               # 이 문서
├── voice-settings-modal/   # 프리미엄 상담 보이스 설정
└── voice-preview-modal/    # ARS Flow Builder 미리듣기
```

각 모달 폴더의 구성 (Vercel 배포 단위로 자체 완결):
```
<modal>/
├── package.json            # workspace 멤버 (의존성 선언은 동일하나 workspaces 로 hoist됨)
├── .npmrc                  # Vercel 빌드 샌드박스가 사설 레지스트리 접근할 때 필요
├── tsconfig.json           # 모달별 include 지정
├── vite.config.ts          # 모달별 포트
├── index.html
├── src/main.tsx
├── src/styles.css          # ⚠️ 아래 "공용 스타일 동기화 규칙" 참고
├── <Modal>.tsx
└── .vercel/                # Vercel 프로젝트 링크 (git 제외)
```

### 로컬 개발
- 루트에서 한 번 설치: `cd Modal && npm install`
- 모달 dev: `npm run dev:settings` / `npm run dev:preview`
- 모달 build: `npm run build:settings` / `npm run build:preview`

### 공용 스타일 동기화 규칙 (필수)
`voice-settings-modal/src/styles.css` 와 `voice-preview-modal/src/styles.css` 는
내용이 완전히 동일해야 합니다. Vercel 배포 시 각 모달 폴더만 업로드되므로
상위 경로의 공용 파일은 참조할 수 없어 물리적으로 복제 유지합니다.
- 한쪽을 수정하면 즉시 반대편에도 동일 변경을 적용할 것.
- 신규 모달 추가 시 동일 내용으로 초기화.

## 디자인 시스템 규칙 (필수)
모든 모달은 Blumnai DS를 기준으로 작성합니다. DS의 가이드라인을 반드시 따르세요.

### 액션 버튼 컬러 규칙 (필수)
주요(Primary) 액션 버튼은 DS 브랜드 프라이머리 컬러 대신 **블랙 톤**을 사용합니다. 브랜드 프라이머리는 지정된 위치에서만 사용.
- Default: `bg/inverted` (var(--bg-inverted))
- Hover: `bg/inverted` + `#ffffff 15%` 오버레이 (`color-mix(in srgb, var(--bg-inverted) 85%, #fff)`)
- 구현: `voice-settings-modal/src/styles.css`의 `.btn-primary-black` 클래스 참고 (Button에 `className="btn-primary-black"` 적용)

### 핵심 원칙
- 컴포넌트는 `@blumnai-studio/blumnai-design-system` 에서 import (Dialog, Button, Radio, Tabs, InfoBox 등)
- 커스텀 UI 금지, DS 컴포넌트 재사용
- Tailwind 기본 유틸리티 금지, DS 유틸리티 사용
  - Typography: `size-{xs,sm,md,lg,xl,2xl}`, `line-height-leading-*`, `font-{body,headline}`, `font-{normal,medium,semibold}`
  - Spacing: `padding-{0,1,2,4,6,8,10,12,16,20,24}`, `ds-gap-{0,1,2,4,6,8,10,12,16,20,24,32}`
  - Padding directional 사용 가능 값이 전체와 다름 — `utilities.css` 확인 후 사용
  - Colors: `text-{default,subtle,muted,hint}`, `bg-{default,subtle,muted,card,inverted,overlay}`
  - Border radius: `rounded-{2xs,xs,sm,md,lg,xl,2xl,3xl,full}` — 임의값 금지

### 상세 가이드 (DS 레포 참조)
- 전체 규칙: `../blumnai-design-system/CLAUDE.md`
- Foundations:
  - 색상: `../blumnai-design-system/ux-guideline/foundations/color.md`
  - 타이포그래피: `../blumnai-design-system/ux-guideline/foundations/typography.md`
  - 간격: `../blumnai-design-system/ux-guideline/foundations/spacing.md`
  - 컴포넌트: `../blumnai-design-system/ux-guideline/foundations/components.md`
  - 인터랙션: `../blumnai-design-system/ux-guideline/foundations/interaction.md`
  - 보더 라디우스: `../blumnai-design-system/ux-guideline/foundations/border-radius.md`
  - 엘리베이션: `../blumnai-design-system/ux-guideline/foundations/elevation.md`
  - 일관성 가이드라인: `../blumnai-design-system/ux-guideline/일관성-가이드라인.md`

### 새 모달 추가 절차
1. `Modal/<modal-name>/` 폴더 생성 후 기존 모달 구조 복제
2. `Modal/package.json` 의 `workspaces` 배열에 폴더명 추가, `dev:*` / `build:*` 스크립트 추가
3. `Modal/<modal-name>/src/styles.css` 는 기존 모달과 동일 내용으로 초기화
4. 루트에서 `npm install` 재실행 후 `npm run build:<name>` 검증
5. 컴포넌트 작성 전 DS foundation md 참고
