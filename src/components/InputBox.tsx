import { styled } from "styled-components";
import { BiSend } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addMessage } from "../../redux/features/messages-slice";
import { useState } from "react";

const StyledInputBox = styled.div`
  position: sticky;
  inset: auto 0 0;
  width: min(100vw - 1rem, 40rem);
  & form {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 0.5rem;
    padding: 0.5rem;
    background-color: rgb(var(--light-color) / 0.1);
    & .suggestion {
      position: absolute;
      inset: -3.5rem auto auto;
      padding: 0.5rem 1rem;
      border-radius: 5rem;
      border: 1px solid rgb(var(--secondary-color) / 0.5);
      color: rgb(var(--secondary-color));
      background-color: rgb(var(--dark-color));
      user-select: none;
      cursor: pointer;
    }
    & input {
      flex: 1;
      padding: 0.5rem;
      border: none;
    }
    & button {
      display: grid;
      place-items: center;
      padding: 0.5rem;
      border: none;
      background: none;
      color: rgb(var(--primary-color));
      font-size: 1.5rem;
    }
  }
`;

const InputBox = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addMessage({
        message,
        isUser: true,
      })
    );
    e.currentTarget.reset();
  };
  const handleSuggestion = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.currentTarget.style.display = "none";
    dispatch(
      addMessage({
        message: "Got it!",
        isUser: true,
      })
    );
  };
  return (
    <StyledInputBox>
      <form onSubmit={handleSubmit}>
        <span className="suggestion" onClick={handleSuggestion}>
          Got it!
        </span>
        <input
          type="text"
          placeholder="Write a message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>
          <BiSend />
        </button>
      </form>
    </StyledInputBox>
  );
};

export default InputBox;
