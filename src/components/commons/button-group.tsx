import { w, type W } from 'windstitch';

import { Icon, type IconOpts } from './icon';
import { Tooltip } from './tooltip';

const ButtonGroupStyled = w.button(
  `
  inline-flex
  items-center
  px-4
  py-2
  text-sm
  font-medium
  text-gray-900
  bg-white
  border-gray-200
  hover:bg-gray-100
  hover:text-blue-700
  focus:z-10
  focus:ring-2
  focus:ring-blue-700
  focus:text-blue-700
  dark:bg-gray-700
  dark:border-gray-600
  dark:text-white
  dark:hover:text-white
  dark:hover:bg-gray-600
  dark:focus:ring-blue-500
  dark:focus:text-white
`,
  {
    variants: {
      position: {
        start: `
            border
            rounded-l-lg
        `,
        middle: `
            border-t
            border-b
        `,
        end: `
            border
            rounded-r-md
`,
      },
    },
    defaultVariants: { position: 'middle' },
    transient: ['position'],
  },
);

type ButtonGroupStyledType = W.Infer<typeof ButtonGroupStyled>;

export type ButtonGroupProps = Array<{
  text?: string;
  icon?: IconOpts;
  tooltip?: string;
}>;

export const ButtonGroup = ({ buttons }: { buttons: ButtonGroupProps }) => {
  return (
    <div className="relative inline-flex rounded-md shadow-sm" role="group">
      {buttons.map(({ text, tooltip, icon }, index) => {
        let position: ButtonGroupStyledType['position'] = 'middle';
        if (index === 0) {
          position = 'start';
        } else if (index === buttons.length - 1) {
          position = 'end';
        }

        return (
          <Tooltip message={tooltip} direction="top" key={index}>
            <ButtonGroupStyled position={position}>
              {icon && (
                <Icon
                  icon={icon}
                  size="icon-x-small"
                  className={text ? 'mr-1' : ''}
                />
              )}
              {text}
            </ButtonGroupStyled>
          </Tooltip>
        );
      })}
    </div>
  );
};
