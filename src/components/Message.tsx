import { styled } from "styled-components";
import chatGPT from "/chatgpt.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addMessage } from "../../redux/features/messages-slice";

const StyledMessage = styled.div`
  & .content {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: min(90%, 40rem);
    padding-block: 1.5rem;
    margin: auto;
    & .img-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      padding: 0.25rem;
      border-radius: 0.25rem;
      color: rgb(var(--light-color));
      & img {
        width: 100%;
        height: 100%;
        filter: invert(1);
      }
    }
    & .dropdown {
      min-width: 4rem;
      height: 2rem;
      padding: 0.25rem;
      border-radius: 0.25rem;
      background-color: transparent;
      color: rgb(var(--light-color));
      &:focus {
        outline: none;
      }
      & option {
        background-color: rgb(var(--dark-color));
        padding: 0.25rem;
      }
    }
  }
`;

const Message = ({
  message: { message, isUser },
}: {
  message: {
    message: string;
    isUser: boolean;
  };
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleAge = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      addMessage({
        message: e.target.value,
        isUser: true,
      })
    );
  };
  return (
    <StyledMessage
      style={{
        backgroundColor: !isUser
          ? "rgb(var(--light-color) / 0.1)"
          : "transparent",
      }}
    >
      <div className="content">
        <div
          className="img-box"
          style={{
            backgroundColor: !isUser
              ? "rgb(var(--tertiary-color))"
              : "transparent",
          }}
        >
          {!isUser && <img src={chatGPT} alt="ChatGPT" />}
        </div>
        <div className="message">{message}</div>
        {!isUser && message === "Enter your Age" && (
          <select name="age" id="age" className="dropdown" onChange={handleAge}>
            <option>Select an Option</option>
            {Array.from({ length: 24 }, (_, i) => i + 18).map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        )}
      </div>
    </StyledMessage>
  );
};

export default Message;
