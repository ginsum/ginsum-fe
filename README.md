# HAUS Product list & detail page

## 프로젝트 설명

로그인이 가능하며 HAUS 상품 목록과 상품 상세를 볼 수 있는 페이지

### 목차

- [실행방법](#실행방법)
- [프로젝트 구조](#프로젝트-구조)
- [사용 라이브러리](#사용-라이브러리)
- [구현 기능](#구현-기능)
- [추가 구현](#추가-구현)

## 실행방법

```
$ git checkout feature
$ yarn install
$ yarn dev
```

실행 주소
[http://localhost:3000](http://localhost:3000)

## 프로젝트 구조

```
src
├── api
├── components
├── fetch
├── hooks
├── pages
├── recoil
├── types
└── utilities
```

- components: AuthGard, InputForm, PageHeader 추가
- fetch: api 요청 함수 추가
- hooks: useAuth, usePagination 추가
- pages: 초기 스타일 렌더 위한 \_document.tsx, 존재하지 않는 페이지 위한 404.tsx 추가
- recoil: 유저 정보 저장을 위한 userInfoState 추가
- utilities: axios, 유효성 검사 위한 react-hook-form rules 추가

## 사용 라이브러리

1. React-Hook-Form

- form의 validation을 빠르고 쉽게 도와주는 라이브러리
- 비제어 컴포넌트를 사용하여 리렌더링을 줄여주는 장점이 있음
- 로그인 페이지의 아이디와 비밀번호의 유효성 검사와 에러 처리를 위하여 사용

2. Recoil

- React를 위한 상태관리 라이브러리
- Redux에 비해 보일러플레이트가 적고 러닝커브가 낮으며 미들웨어 없이 비동기 로직을 구현할 수 있는 장점이 있음
- 유저 정보를 전역으로 관리하기 위해 사용

3. Axios

- 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리
- fetch와 달리 response가 자동으로 JSON데이터 형식으로 변환되어 사용에 편리함
- 브라우저 호환성이 좋으며 CSRF 보호 기능이 내장되어있음

## 구현 기능

1. 로그인 및 유저 정보

- React-hook-form을 이용하여 아이디 및 비밀번호의 유효성 검사 및 에러 메시지 처리
- 유효성 검사를 통과해야 로그인 버튼 활성화
- 로그인 상테에 헤더에 유저 네임 보여주기
- 로그인 상태에서 로그인 페이지 접근시 홈 화면으로('/')로 돌아감
- AuthGard를 추가하여 로그인 상테에서 새로고침 시 로그인 상태 유지

2. 상품 리스트

- 상품 리스트 정보를 getServerSideProps 이용하여 데이터 받아오도록 처리함
- usePagination 추가하여 페이지네이션 기능 구현
- 가격에 콤마(,) 처리
- 존재하지 않는 상품일 경우 404페이지로 이동

3. 상품 상세

- 상품 리스트에서 상품 클릭시 상품 상세 페에지 보여주기
- 상품 상세 정보를 getServerSideProps 이용하여 데이터 받아오도록 처리함
- 가격에 콤마(,) 처리
- 존재하지 않는 상품일 경우 404페이지로 이동

4. 그 외

- 공통으로 쓰이는 PageHeader 부분 컴포넌트화
- 시멘틱한 마크업을 위해 <header>, <main>, <section> 태그 추가
- 존재하지 않는 페이지 위한 404 페이지 추가

## 추가 구현

1. 초기 렌더시 스타일이 늦게 적용되는 부분 개선

- 문제 파악
- Next.js는 초기 렌더시 미리 생성된 HTML파일을 렌더한다
- CSS-in-JS인 styled-components는 미리 생성된 HTML이 렌더된 후 Hydration 과정에서 적용된다
- 그렇기 때문에 초기 렌더시엔 스타일이 적용되지 않았다가 Hydration 과정을 거친 후에 스타일이 적용되어 보인다
- 초기 렌더시 스타일이 적용 안 된 페이지가 유저들에게 노출되는 문제가 있다

- 해결 방안

- 서버 사이드 렌더링 시 styled-components가 헤더에 주입되도록 \_document.tsx 파일에 renderPage 와 ServerStyleSheet를 이용한 코드를 추가한다
- babel-plugin-styled-components 을 설치하여 hashed className을 일관되게 유지해준다

2. Next/Image를 활용한 이미지 최적화

- 리스트 페이지에 접근 했을떼 이미지가 느리게 떠 빈 공간이 보이는 부분의 사용성을 개선하기 위해 사용
- Next/Image에서 placeholder 기능을 제공하는 것을 이용하여 이미지가 로드되기 전 blur 화면을 보여주게 작업
