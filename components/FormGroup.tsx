import classnames from 'classnames';

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

const FormGroup = (props: FormGroupProps) => {
  const classes = classnames({
    'my-4': true,
    [props.className]: !!props.className
  });
  return <div className={classes}>{props.children}</div>;
};

export default FormGroup;
