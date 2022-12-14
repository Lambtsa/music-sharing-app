import { useCallback } from "react";
import { Form, Inner, Input, Label, Switch } from "./Toggle.styles";
import { ReactComponent as Sun } from "@assets/sun.svg";
import { ReactComponent as Moon } from "@assets/moon.svg";
import { useLightOrDarkTheme } from "@context/ThemeContext";

export const Toggle = (): JSX.Element => {
  const { isLight, setIsLight } = useLightOrDarkTheme();

  const handleChange = useCallback(() => {
    setIsLight(!isLight);
  }, [isLight, setIsLight]);

  return (
    <Form>
      <Input
        type="checkbox"
        onChange={handleChange}
        name="themeToggle"
        id="themeToggle"
        checked={isLight}
      />
      <Label isLight={isLight} htmlFor="themeToggle">
        <Inner isChecked={isLight}>
          <Sun />
          <Moon />
        </Inner>
        <Switch isChecked={isLight}></Switch>
      </Label>
    </Form>
  );
};
