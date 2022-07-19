import { Link, useLocation } from 'react-router-dom';

export function runtimeString(time){
    return `${Math.floor(time / 60)}h ${time % 60}m`
}

export const LinkWithQuery = ({ children, to, ...props }) => {
  const { search } = useLocation();

  return (
    <Link to={to + search} {...props}>
      {children}
    </Link>
  );
};