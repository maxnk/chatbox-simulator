import {NavigateFunction, useNavigate, useParams} from 'react-router-dom';
import React, {ComponentType} from 'react';

interface RouterProps {
  navigate: NavigateFunction;
}

export type WithRouterProps<T> = T & RouterProps;
type OmitRouter<T> = Omit<T, keyof RouterProps>;

export function withRouter<T>(
  Component: ComponentType<OmitRouter<T> & RouterProps>
) {
  return (props: OmitRouter<T>) => {
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Component
        navigate={navigate}
        params={params}
        {...props}
      />
    );
  };
}
