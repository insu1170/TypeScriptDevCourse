# 브랜치 전략과 사용

## 브랜치 이름 규칙

- **기능 개발**
    - `feature/*`
    - 예: `feature/login`, `feature/select-product`
- **출시 준비**
    - `release-*`
    - 예: `release-1.3`, `release-1.4`
- **긴급 수정**
    - `hotfix-*`
    - 예: `hotfix-1.2.1`

---

# Git 브랜치 전략 (Git Flow)

- Git Flow라고도 불림
- 팀과 프로젝트 규모에 따라 다양한 전략이 존재함

## 주요 병합 전략

### Fast-forward 병합

- 브랜치 생성 이후 `main`을 건드리지 않음
- 생성한 브랜치에서 모든 작업 완료 후 바로 병합
- 커밋 히스토리가 깔끔함

### 3-way 병합

- 여러 브랜치(A, B)에서 각각 작업 진행
- 공통 조상 커밋을 기준으로 변경 사항을 비교하여 병합
- 병합 커밋이 생성됨

---

# 병합과 충돌

## 브랜치 보호

- GitHub → **Branch settings**에서 설정 가능
- 직접 `main` 브랜치에 push 방지
- Pull Request를 통해서만 병합 허용

## 병합(Merge)

- 작업 브랜치를 `main` 브랜치로 합치는 과정
- 보통 **Pull Request(PR)** 를 통해 수행

## 브랜치 삭제

- `git branch -d feature/login`
    - 병합이 완료된 로컬 브랜치 삭제

## 브랜치 동기화

- `git fetch -p`
    - 원격에서 삭제된 브랜치 정보 정리

## 원격 브랜치 기준으로 체크아웃

- `git checkout -t origin/branch-name`

---

## 충돌(Conflict) 발생 시

1. GitHub 또는 로컬에서 **Resolve conflicts** 선택
2. 충돌 표시 코드 확인
3. 필요 없는 코드 제거 및 올바른 코드 선택
4. 충돌 해결 후 다시 commit