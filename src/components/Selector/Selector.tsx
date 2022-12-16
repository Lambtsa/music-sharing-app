import { useTranslation } from "@hooks/useTranslation";
import { useMemo, useState } from "react";
import {
  ButtonText,
  SelectorButton,
  SelectorContainer,
} from "./Selector.styles";
import { InputSelection, SelectorProps } from "./Selector.types";

export const Selector = ({ isLight }: SelectorProps): JSX.Element => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<InputSelection>(
    InputSelection.Artist
  );

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
