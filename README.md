# ChatbotUX_Redesign

챗봇 UX 개편 관련 모달/화면 리디자인 작업 저장소.

## 구조

- `Modal/` — 모달 디자인 모음
  - `voice-settings-modal/` — 프리미엄 상담 보이스 설정 모달
  - `CLAUDE.md` — DS 규칙 및 새 모달 추가 절차

## 로컬에서 실행하기

각 모달은 독립 Vite 프로젝트입니다. 예를 들어 voice-settings-modal을 실행하려면:

```bash
cd Modal/voice-settings-modal
# 최초 1회: GitHub Packages 토큰 설정 (DS 패키지 설치에 필요)
export GITHUB_TOKEN_BLUMNAI="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
npm install
npm run dev
```

토큰 발급 방법:
1. https://github.com/settings/tokens → Generate new token (classic)
2. Scope: `read:packages`, `repo`
3. 발급된 토큰을 위 환경변수에 설정

## 배포

Vercel로 자동 배포됩니다. Root Directory는 모달별 하위 폴더 지정.

## 디자인 시스템

모든 컴포넌트는 Blumnai DS(`@blumnai-studio/blumnai-design-system`) 기반. 자세한 규칙은 `Modal/CLAUDE.md` 참고.
