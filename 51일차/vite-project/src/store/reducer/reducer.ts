/*
Redux
상태 관리 라이브러리(선택사항)

State, Props를 이용해 상태를 여러 컴포넌트와 공유

앱 커지면 관리 어려움, 소스코드 지저분해짐
-> Redux 사용

Flow
- Action(객체) Dispatch(함수) (액션 전달)
-> Reducer 함수 type return
-> Redux Store State
-> React Component Rerendering

Toolkit Reducer Slice
*/

import { boardsReducer } from "../slices/boardsSlice";
import { loggerReducer } from "../slices/loggerSlice";
import { modalReducer } from "../slices/modalSlice";

const reducer = {
    logger: loggerReducer,
    boards: boardsReducer,
    modal: modalReducer
}

export default reducer;