> 사용하는 api 가 로컬에서만 돌아가니 코딩스타일 참고용으로만 봐주세요

![1](https://github.com/njustice4all/portfolio/blob/master/images/boom/1.png) ![2](https://github.com/njustice4all/portfolio/blob/master/images/boom/2.png) ![3](https://github.com/njustice4all/portfolio/blob/master/images/boom/3.png)

- 홈화면 FlatList 무한스크롤/페이지네이션
- 상점 터치시 browser app 실행
- 앱 시작시 shop locations 이 담긴 api 호출
- 백그라운드 gps location listen
- location 계산후 소리라이브러리 구동 / 종료
- gps 수동으로 해지시 라이브러리 종료
- 소리발생시 notification popup
- 화면이 꺼진 상태에서도 notification 처리 (화면 켜짐)
- notification 내에서 닫힘 / 열기 처리 (닫기 or 브라우저열기)
- android gps 설정으로 이동하는 모듈
- 앱, background service 종료하는 모듈

### TODOS

- [x] react-navigation
- [x] redux state for navigation
- [ ] Migrate to typescript
