import { InputSelection } from "@constants/input";
import { useTranslation } from "@hooks/useTranslation";
import { Dispatch, SetStateAction, useMemo } from "react";
import {
  ButtonText,
  SelectorButton,
  SelectorContainer,
} from "./Selector.styles";

interface SelectorProps {
  isLight: boolean;
  selected: InputSelection;
  setSelected: Dispatch<SetStateAction<InputSelection>>;
}

export const Selector = ({
  isLight,
  selected,
  setSelected,
}: SelectorProps): JSX.Element => {
  const { t } = useTranslation();

  const options = useMemo(() => {
    return Object.values(InputSelection);
  }, []);

  const handleOnClick = (input: InputSelection) => {
    setSelected(input);
  };

  const hasOptions = !!options.length;

  return (
    <SelectorContainer>
      {hasOptions &&
        options.map((option) => (
          <SelectorButton
            type="button"
            selected={selected === option}
            key={option}
            isLight={isLight}
            onClick={() => handleOnClick(option)}
          >
            <ButtonText selected={selected === option} isLight={isLight}>
              {t({ id: `label.${option}` })}
            </ButtonText>
          </SelectorButton>
        ))}
    </SelectorContainer>
  );
};
