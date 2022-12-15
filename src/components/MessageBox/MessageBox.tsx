import { useTranslation } from "@hooks/useTranslation";
import { Message, MessageContainer, WarningIcon } from "./MessageBox.styles";

interface MessageBoxProps {
  message: FormatjsIntl.Message["ids"];
}

export const MessageBox = ({ message }: MessageBoxProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <MessageContainer type="error">
      <WarningIcon />
      <Message>{t({ id: message })}</Message>
    </MessageContainer>
  );
};
