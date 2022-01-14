import classnames from 'classnames';
import { SVGProps } from 'react';

interface ButtonProps {
  type?: 'submit' | 'button';
  text: string;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: 'primary' | 'danger';
  size?: 'sm' | 'md';
}

const Button = (props: ButtonProps) => {
  const buttonClasses = classnames({
    'm-auto inline-flex shadow-lg': true,
    'bg-white border border-red-600 text-red-600': props.color === 'danger',
    'bg-violet hover:bg-purple-600 text-purple-100':
      props.color === 'primary' || !props.color,
    'px-4 py-2 rounded-lg': props.size === 'md' || !props.size,
    'px-2 py-1 text-xs rounded-md': props.size === 'sm'
  });
  return (
    <button
      type={props.type || 'button'}
      onClick={props.onClick}
      className={buttonClasses}
    >
      {props.icon ? (
        <span className="mr-2 inline-block w-4 h-4 m-auto">
          {props.icon(null)}
        </span>
      ) : null}
      <span>{props.text}</span>
    </button>
  );
};

export default Button;
