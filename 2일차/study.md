# GIT 기초

## Git이란?

- **로컬 시스템 기반 분산 버전 관리 시스템**
- Git과 GitHub는 다르다
- **Git**: 로컬에서 버전 관리하는 도구
- **GitHub**: Git 저장소를 원격으로 관리·공유하는 플랫폼
- Git은 로컬 버전 관리를 수행하고, GitHub와 **연동(소통)** 할 수 있는 시스템

---

## Git 주요 명령어

- `git init`
    - 현재 폴더를 Git 저장소로 초기화
    - `.git` 폴더 생성
- `git --version`
    - Git 버전 확인
- `git status`
    - 현재 Git 상태 확인 (추적 여부, 변경 파일 등)
- `git log`
    - 커밋 기록 확인
- `git add`
    - 파일을 Git이 추적하도록 스테이징 영역에 추가
- `git commit`
    - add된 파일들을 하나의 버전(커밋)으로 생성
- `git remote`
    - 원격 저장소(GitHub 등)와 연결 관리

---

# CLI & GUI

## GUI (Graphical User Interface)

- 그래픽 화면을 통해 컴퓨터에 명령을 내리는 방식
- 마우스 클릭 중심
- 예: 탐색기, GitHub Desktop, Sourcetree 등

## CLI (Command Line Interface)

- 텍스트 명령어를 입력해 컴퓨터에 명령을 내리는 방식
- 키보드 중심
- 예: cmd, PowerShell, Terminal

---

## 자주 사용하는 CLI 명령어

- `ls`
    - 현재 경로의 파일 및 폴더 목록 확인
- `mkdir`
    - 폴더 생성