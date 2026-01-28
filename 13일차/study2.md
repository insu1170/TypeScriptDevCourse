# Node 기본 생태계

# Node.js 기본 개념 정리

## 런타임(Runtime)

- **V8 엔진**을 기반으로 JavaScript를 실행하는 환경
- 브라우저 밖(서버, 로컬 환경)에서도 JS 실행 가능

---

## 패키지 매니저(Package Manager)

프로젝트의 **의존성(dependency)** 을 관리하는 도구

- **npm**
    - Node.js 기본 패키지 매니저
    - 생태계가 가장 큼
- **yarn**
    - npm 대체 매니저
    - 속도 개선, 보안성 강화
- **pnpm**
    - 패키지를 중복 설치하지 않고 **효율적인 스토리지 사용**

---

## package.json

- 프로젝트 설정 및 의존성 정의 파일
- 주요 역할:
    - 프로젝트 정보(name, version)
    - 의존성 목록(dependencies, devDependencies)
    - 실행 스크립트(scripts)

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  }
}

```

---

## package-lock.json

- 실제 설치된 패키지의 **정확한 버전** 기록
- 팀원·배포 환경 간 **의존성 일관성 유지** 역할

---

## 모듈 시스템(Module System)

### CommonJS (CJS)

```jsx
const express = require('express');
module.exports = app;

```

### ECMAScript Module (ESM)

```jsx
import express from 'express';
export default app;

```

- Node.js는 **CJS + ESM 둘 다 지원**
- ESM 사용 시:
    - `package.json`에 `"type": "module"` 설정
    - 또는 `.mjs` 확장자 사용

---

## 프레임워크 & 라이브러리

- **Express**: 가장 기본적인 Node.js 웹 프레임워크
- **NestJS**: 구조화된 아키텍처 (DI, 데코레이터 기반)
- **Fastify**: 높은 성능과 타입 안정성 중시