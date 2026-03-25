import type { ILogItem } from "../../types";
import { BsFillPersonFill } from 'react-icons/bs'
import { author, date, logItemWrap, message } from "./LogItem.css";

type TLogItemProps = {
  logItem: ILogItem;
}

const LogItem: React.FC<TLogItemProps> = ({
  logItem
}) => {
  // Date.now()는 impure 함수라 에러가 나는데, 일단 따라치려고 대충 수정
  const timeOffset = new Date(new Date().getTime() - Number(logItem.logTimestamp));

  const showOffsetTime = `
  ${timeOffset.getMinutes() > 0 ? `${timeOffset.getMinutes()}m` : ''}
  ${timeOffset.getSeconds() > 0 ? `${timeOffset.getSeconds()}s ago` : ''}
  ${timeOffset.getSeconds() === 0 ? 'just now' : ''}
  `;
  return (
    <div className={logItemWrap}>
      <div className={author}>
        <BsFillPersonFill />
        {logItem.logAuthor}
      </div>
      <div className={message}>{logItem.logMessage}</div>
      <div className={date}>{showOffsetTime}</div>
    </div>
  )
}

export default LogItem