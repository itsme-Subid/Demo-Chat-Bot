import { styled } from "styled-components";
import InputBox from "../components/InputBox";
import MessageList from "../components/MessageList";

const StyledChat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: calc(100vh - 2rem);
  margin-block: 1rem;
`;

const Chat = () => {
  return (
    <StyledChat>
      <MessageList />
      <InputBox />
    </StyledChat>
  );
};

export default Chat;
