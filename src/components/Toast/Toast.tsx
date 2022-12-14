import { useTranslation } from "@hooks/useTranslation";
import {
  CloseBtn,
  CloseIcon,
  InfoIcon,
  InnerWrapper,
  ToastText,
  ToastWrapper,
  WarningIcon,
} from "./Toast.styles";
import { ToastProps } from "./Toast.types";

export const Toast = ({ type, message, onClose }: ToastProps): JSX.Element => {
  const { t } = useTranslation();
  const { variables } = message;

  return (
    <ToastWrapper type={type}>
      <InnerWrapper>
        {type === "Error" ? <WarningIcon /> : <InfoIcon />}
        <ToastText>{t({ id: message.id }, { ...variables })}</ToastText>
        <CloseBtn onClick={onClose}>
          <CloseIcon />
        </CloseBtn>
      </InnerWrapper>
    </ToastWrapper>
  );
};
