# 라우팅

## 1. main page

<img width="1680" alt="스크린샷 2023-07-12 오후 8 50 01" src="https://github.com/daedongyourjido/full_code/assets/90092013/2ab08461-e99c-446b-a070-b2e1eb096976">

1. 지도 상의 지역 -> '/{지역명}' : 각 지역별 게시판으로 이동
2. Sign In 버튼 (로그아웃 상태) -> '/login' : 로그인 페이지로 이동
3. 프로필 사진 & 닉네임 (로그인 상태) -> '/profile' : 프로필 화면으로 이동

## 2. login page

<img width="1680" alt="스크린샷 2023-07-12 오후 8 58 23" src="https://github.com/daedongyourjido/full_code/assets/90092013/8d73d5e5-0154-4607-a55f-b7d50a2afcb6">

1. Sign Up 버튼 -> '/signup' : 회원가입 페이지로 이동
2. 로고 -> '/' : 메인으로 이동

## 3. signup page

<img width="1680" alt="스크린샷 2023-07-12 오후 9 00 12" src="https://github.com/daedongyourjido/full_code/assets/90092013/7ba5636d-37cc-4ba2-877a-5c7137caceae">

1. Sign In 버튼 -> '/login' : 로그인 페이지로 이동
2. 로고 -> '/' : 메인으로 이동

## 4. profile page

<img width="1680" alt="스크린샷 2023-07-12 오후 8 55 25" src="https://github.com/daedongyourjido/full_code/assets/90092013/e26ae1d5-853f-4939-808c-7da1b6427cee">

1. 설정 아이콘 (임시 위치지정) -> '/setting/change' : 비밀번호변경 페이지로 이동
2. Header -> '/' : 메인으로 이동

## 5. setting page

<img width="1680" alt="스크린샷 2023-07-12 오후 9 02 52" src="https://github.com/daedongyourjido/full_code/assets/90092013/f25dced5-a69d-45c9-80a3-6563fc0b61f0">

1. 회원 탈퇴 -> '/setting/withdraw' : 회원 탈퇴 페이지로 이동
2. 로고 -> '/' : 메인으로 이동
3. 뒤로 가기 화살표 -> '/profile' : 프로필로 이동 (설정 페이지 접근할 수 있는 루트가 프로필 밖에 없어서 일단 프로필로만 지정)
