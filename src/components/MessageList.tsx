import { styled } from "styled-components";
import Message from "./Message";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { decrementCount } from "../../redux/features/messages-slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StyledMessageList = styled.div`
  overflow-y: auto;
  padding-bottom: 5rem;
  width: 100%;
`;

const MessageList = () => {
  const navigate = useNavigate();
  const messages = useAppSelector((state) => state.messageReducer.value);
  const count = useAppSelector((state) => state.messageReducer.count);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) {
        dispatch(decrementCount());
      } else if (count === 0) {
        navigate("/success");
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count, dispatch, navigate]);

  return (
    <StyledMessageList>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      {count > 0 && (
        <Message message={{ message: count.toString(), isUser: false }} />
      )}
    </StyledMessageList>
  );
};

export default MessageList;
