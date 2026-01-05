# 3일차 - GIT HUB & Branch ?
## 원격 저장소(GitHub) 관련 명령어

- `git remote add origin <URL>`
    - 로컬 저장소와 GitHub 원격 저장소를 연결
- `git remote -v`
    - 연결된 원격 저장소 목록 확인
- `git push origin main`
    - 로컬 `main` 브랜치를 원격 저장소(`origin`)의 `main` 브랜치로 업로드
- `git pull origin main`
    - 원격 저장소(`origin`)의 `main` 브랜치 변경 사항을 가져와 로컬에 반영

---

## origin이란?

- 원격 저장소의 **별칭 이름**
- 기본적으로 GitHub 저장소를 `origin`이라는 이름으로 설정함

---

# Branch

## 브랜치 관련 명령어

- `git branch`
    - 브랜치 목록 확인
- `git branch dev`
    - `dev` 브랜치 생성
- `git checkout dev`
    - `dev` 브랜치로 이동

---

## 브랜치를 사용하는 이유

- 기능 구현을 단계별로 나누어 작업하기 위함
- 메인 브랜치(`main`)를 안정적으로 유지
- 실험적 기능이나 개발 중인 기능을 독립적으로 관리 가능

---

## 브랜치 활용 예시

1. `main` : 배포용 안정 브랜치
2. `dev` : 개발 중인 기능 통합 브랜치
3. `feature/*` : 개별 기능 개발 브랜치