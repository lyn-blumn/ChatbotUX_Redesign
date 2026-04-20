# 챗봇 UX 개편 모달

## 폴더 구조
각 모달은 개별 하위 폴더로 관리합니다. 각 폴더는 독립 Vite 프리뷰로 동작합니다.

- `voice-settings-modal/` — 프리미엄 상담 보이스 설정

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
1. `chatbot-ux-modals/<modal-name>/` 폴더 생성
2. 기존 `voice-settings-modal/`의 `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/styles.css` 구조를 참고
3. DS alias 경로는 `../../../blumnai-design-system/...` (3단계 위)
4. 컴포넌트 작성 전 DS의 foundation md 참고
