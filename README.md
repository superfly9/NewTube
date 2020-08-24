## NewTube

#### 사이트주소:https://seoul-tube.herokuapp.com/
![사이트 동작](https://github.com/superfly9/newtube/blob/master/newTube.gif)
### 목적
- #### 동영상 업로드 및 댓글 작성 가능한 사이트 만들기

---
### Tools
- #### React/Redux/ES6
- #### MongoDB/NodeJs/Express
---
### 기능
- #### 회원가입/로그인/동영상 업로드/구독하는 비디오 모아보기
- #### 동영상 댓글 작성 및 삭제/대댓글 작성 및 삭제
---
### API Reference
#### 1.userRouter(회원가입/로그인/로그아웃 관리)
>  - ***/register(회원가입):*** jwt통한 토큰 생성 =>성공시 DB에 저장 
 - ***/login(로그인):***    회원가입시 입력한 Email로 DB에서 일치하는 유저 찾기=>로그인 폼에 입력한 비밀번호와 회원가입 일치 시=>토큰생성 후 브라우저의 쿠키에 저장=>redux action에 loginSuccess와 userId전송
 
- ***/logout(로그아웃):***  현재 로그인한 유저의 아이디를 가지고 DB에서 유저 찾기=>유저가 존재한다면 토큰과 토큰 유효기간을 비워버리고 success:true를 전송=>브라우저가 success:true를 받으면 로그인 페이지로 다시 이동

#### 2.videoRouter(비디오 생성/삭제/업로드를 관리)

>
 - ***/getVideos(DB에 저장된 모든 비디오 정보 가져오기)***: 요청시 DB에 저장된 모든 비디오들의 정보를 가져온다
 
 - ***/getVideoDetail(특정 비디오의 상세 정보를 준다)
:***  props.match.params.videoId를 통해 가져온 특정 비디오의 아이디를 넘겨주면 해당 비디오의 정보를 반환해준다
-  ***/uploadFile(파일을 노드 서버에 저장):*** npm multer를 통해 지정된 폴더에 업로드한 파일을 저장한 req.file을 통해 fileName/filePath를 클라이언트에게 반환해준다
-  ***/uploadvideo(비디오 업로드):*** 비디오 업로드 요청시
 클라이언트가 form을 통해 넘겨준 값들(video duration/title/descrtion..)등을 가지고
 DB에 비디오 정보를 저장한다
 - ***/deleteVideo(비디오 삭제):*** 클라이언트가 비디오id와 그 비디오를 업로드한 유저의 id를 Axios를 통해 전달해주면 해당 비디오를 삭제해준다
 
#### 3.subScribeRouter(비디오의 구독여부를 관리)

>  - 변수:
***userTo*** :비디오 만든 사람의 mongoDB Id
***userFrom*** :로그인 유저의 mongoDB Id(localStorage나 redux state.user에 저장해놓은 상태)
 - ***/getSubscribeNumber(비디오 업로드 유저의 구독자수를 반환):*** 클라이언트에서 해당 비디오 구독을 누른 userTo를 body에 담아서 요청하면 유저의 구독자 수 반환
 
 - ***/subscribed(구독 여부 반환):***
userFrom와 userTo전달해서 일치하는 게 존재한다면 구독 중/아니라면 구독하지 않는 중임을 판단하고 true/false를 반환
- ***/addToSubscribe(구독리스트에 추가):*** 클라이언트에서 userTo,userFrom을 req.body에 담아서 전달하면 mongoDB에서 subscribe모델에 새로운 document를 생성
- ***/removeFromSubscribe(구독리스트 삭제):***
클라이언트에서 userTo,userFrom을 req.body에 담아서 전달하면 mongoDB에서 subscribe모델에서 해당 document를 삭제
- ***/getSubscribeVideo(구독하고 있는 유저의 비디오들만 보여주는 api):***
클라이언트에서 userFrom을 req.body에 담아 전달하면
구독하고 있는 유저가 만든 비디오들을 다 가져온다

#### 4.commentRouter

>  - 변수:
- ***writer(로그인한 유저의 mongoDB Id)***
	***content(댓글 내용)***/***videoId(내가 댓글을 다는 비디오의 mongoDB Id)***
	
- ***/saveComment(댓글 저장):*** writer/content/videoId 정보를 클라이언트에서 담아서 서버에 요청을 하면 댓글을 생성한다.
- ***/getComments(저장된 댓글들을 가져오는 역할):*** 클라이언트가 videoId를 담아 서버에 요청을 하면 Comment Model에서 해당 videoId를 가진 comment들을 다 반환한다.
- ***/deleteComment(댓글삭제):***
클라이언트에서 videoId/writer/responseTo(해당 댓글의 mongoDB Id)를 전달받으면 댓글을 삭제하고 해당 비디오에 남아있는 댓글들만 반환

#### 5.likeRouter
 - 특징: 
- 좋아요/싫어요는 비디오/댓글에 대한 좋아요 2가지로 구분됨
- 이걸 구분하기 위해 <LikeDisLike />컴포넌트에 videoId라는 props를 줌으로써 비디오 관한 좋아요인지 댓글 대한 좋아요인지를 구분
```<LikeDisLike video />``` => 비디오에 대한 좋아요/싫어요 다루는 컴포넌트
```<LikeDisLike  />``` =>댓글 대한 좋아요/싫어요 다루는 컴포넌트
 #### 동작방식
 ---
 ### LikeButton 클릭시
- ***DisLike Button이 클릭 되어있다면***
=> 싫어요 수 1 감소(동시에 DB에서도 싫어요 삭제 해줘야) / 좋아요 수 1증가(DB에서 좋아요 document생성필요)
- ***DisLike Button이 클릭 X라면***
=>좋아요 수 1증가
 dislike는 이것과 정확히 똑같이 동작
---
- ***/getLikeNumber (좋아요 수 가져오는 역할):***
    req.body에 담겨있는 값이 videoId/commentId 중 누구인지 따라 video/comment의 좋아요 document.length를 통해 가져온다.
- ***/upLike(좋아요 document생성):*** videoId/userId 혹은 comment/userId를
req.body에 담아 서버에 요청하면 document생성, 싫어요가 눌러져 있는 상황이라면 DisLike모델에서 해당 document을 찾아서 삭제시킴
- ***/unLike(좋아요 document삭제):*** videoId/userId 혹은 commentId/userId통해 Like모델에서 해당 document삭제
