# Frontend


# 규칙

---

-브랜치는 제품 백로그 단위로 생성한다 
- 브랜치를 생성하기전 제품 백로그 단위로 issue를 생성하여 스프린트 백로그를 정리한다.
- 스프린트 백로그는 pull request를 통해 생성한다.
- commit 할때 Commit Message Rule 을 지켜준다.

---

## Commit Message Rule

    - feat : 새로운 기능 추가
    - update : 버전 등 업데이트
    - fix : 수정
    - bug : 버그 수정
    - docs : 문서
    - style : 코드 스타일 혹은 포맷 등에 관한 커밋
    - refactor : 코드 리펙토링
    - test : 테스트 코드 수정

---

## Pull Request Rule

- 브랜치의 이름은 feature/제품 백로그 단위로 설정한다. <br>
    ex) feature/login
- pull request의 경우에는 스프린트 백로그를 기준으로 생성하고 제목은 브랜치명/이슈 제목으로 한다. <br>
   ex) feature/login 로그인 유효성 검사
- Merge Request의 경우 내용을 resolve: #{이슈번호}  로 한다. ( 같이 closed 하기 위해 )
