import Button from "../components/Button";
import { InputElement } from "../components/InputElement";
import { User } from "../components/User";
import { useState } from "react";
import { SettingsForm } from "../components/SettingsForm";
import { Message } from "../components/Message";

export function ChatRoomPage(props) {
  const [formState, setFormState] = useState({ message: '' });
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState({});

  const updateSettings = (settings) => {
    setSettings({ ...settings });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formState.message !== '') {
      setMessages((state) => [
        ...state,
        {
          ...formState,
          author: props.user.username,
          settings: { ...settings },
        },
      ]);
      setFormState({ message: '' });
    }
  }

  const handleChange = (event) => {
    setFormState((state) => ({
          ...state,
          [event.target.name]: event.target.value,
    }));
  }

  const messageElements = messages.map((item, index) => (
    <Message
      key={index}
      settings={item.settings}
      author={item.author}
      message={item.message}
    />
  ));

  return (
    <div>
      <Button type="button" onClick={props.onSignOut}>Sign out</Button>
      <User src="/avatar.jpg" username={props.user.username} />

      <SettingsForm user={props.user} onSubmit={updateSettings} />

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <InputElement name="message"
            label="Message"
            type="text"
            onChange={handleChange}
            value={formState.message} />
        </div>
        <div className="form-field">
          <Button type="submit">Send</Button>
        </div>
      </form>
      <div className="message-list">
        {messageElements}
      </div>
    </div>
  );
}