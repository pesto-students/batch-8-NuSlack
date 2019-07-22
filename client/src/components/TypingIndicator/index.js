import React from 'react';

// TODO Derive it from the global state
function TypingIndicator(props) {
  const isTyping = props.isTyping;
  if (isTyping) {
    return (
      <div>
        {props.users} is {props.text}
      </div>
    );
  }
  return null;
}

export default TypingIndicator;