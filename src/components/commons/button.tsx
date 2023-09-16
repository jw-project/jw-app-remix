import type { ComponentProps, PropsWithChildren } from 'react';

import { useNavigate } from '@remix-run/react';
import { w, type W } from 'windstitch';

import { useTranslation } from '~/i18n/i18n';

import { Icon, type IconOpts } from './icon';

const ButtonStyled = w.button(
  `
    leading-normal
    flex
    border
    cursor-pointer
    justify-center
    px-4
    py-2
    text-center
    whitespace-nowrap
    rounded
    focus:outline-none
    disabled:opacity-50
    disabled:cursor-not-allowed
`,
  {
    variants: {
      buttonstyle: {
        primary: `
          bg-blue-500
          dark:bg-blue-400
          border-blue-500
          dark:border-blue-400
          text-white
          enabled:hover:bg-blue-600
          enabled:hover:border-blue-600
          enabled:active:bg-blue-700
          enabled:hover:dark:bg-blue-500
          enabled:hover:dark:border-blue-500
          enabled:active:dark:bg-blue-400
        `,
        secondary: `
          bg-gray-100
          dark:bg-gray-200
          border-gray-100
          dark:border-gray-200
          text-gray-700
          enabled:hover:bg-gray-300
          enabled:hover:border-gray-300
          enabled:active:bg-gray-400
          enabled:hover:dark:bg-gray-400
          enabled:hover:dark:border-gray-400
          enabled:active:dark:bg-gray-500
        `,
        danger: `
          bg-red-500
          dark:bg-red-400
          border-red-500
          dark:border-red-400
          text-white
          enabled:hover:bg-red-600
          enabled:hover:border-red-600
          enabled:active:bg-red-700
          enabled:hover:dark:bg-red-500
          enabled:hover:dark:border-red-500
          enabled:active:dark:bg-red-400
`,
      },
      bold: (bold: boolean) => (bold ? 'font-bold' : ''),
    },
    defaultVariants: { buttonstyle: 'primary', bold: false },
    transient: ['bold'],
  },
);

type ButtonStyledType = W.Infer<typeof ButtonStyled>;

export const Button = ({
  buttonstyle = 'primary',
  icon,
  children,
  ...props
}: PropsWithChildren<
  ComponentProps<'button'> & ButtonStyledType & { icon?: IconOpts }
>) => {
  const iconColors = {
    primary: 'mr-1 text-white dark:text-black',
    secondary: 'mr-1 text-gray-700 dark:text-gray-300',
    danger: 'mr-1 text-white dark:text-black',
  };

  return (
    <ButtonStyled buttonstyle={buttonstyle} {...props}>
      {icon && <Icon icon={icon} className={iconColors[buttonstyle]} />}
      {children}
    </ButtonStyled>
  );
};

export function NewButton({
  button = 'common.empty-state.button',
  icon = 'add',
}: {
  button?: string;
  icon?: IconOpts;
}) {
  const { translate } = useTranslation();
  const navigate = useNavigate();

  const goTo = () => {
    navigate('./new');
  };

  return (
    <Button onClick={goTo} icon={icon}>
      {translate(button)}
    </Button>
  );
}

export function DeleteButton({
  button = 'common.delete',
  icon = 'delete',
  onClick,
}: {
  button?: string;
  icon?: IconOpts;
  onClick: () => void;
}) {
  const { translate } = useTranslation();

  return (
    <Button buttonstyle="danger" onClick={onClick} icon={icon}>
      {translate(button)}
    </Button>
  );
}
