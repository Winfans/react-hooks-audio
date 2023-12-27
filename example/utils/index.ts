import { assign, keys } from 'lodash-es';
import { ReactElement, cloneElement } from 'react';
import cls from 'classnames';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { NativeProps } from 'example/types';

dayjs.extend(duration);

export const blockTimeFormat = (seconds: number) => {
  const durationObject = dayjs.duration(seconds, 'seconds');
  return `${durationObject.minutes()}:${durationObject.seconds().toString().padStart(2, '0')}`;
};

export const withNativeProps = <P extends NativeProps>(props: P, element: ReactElement) => {
  const elementProps = element.props;
  const nativeProps: NativeProps & Record<string, any> = {};
  if (props.className) {
    nativeProps.className = cls(elementProps.className, props.className);
  }
  if (props.style) {
    nativeProps.style = assign({}, elementProps.style, props.style);
  }
  keys(props).forEach((key) => {
    if (key.startsWith('data-') || key.startsWith('aria-')) {
      nativeProps[key] = (props as typeof nativeProps)[key];
    }
  });
  if (keys(nativeProps).length) {
    return cloneElement(element, assign({}, elementProps, nativeProps));
  }
  return element;
};

export const convertBlob2AudioUrl = (data: ArrayBuffer) => {
  const blob = new Blob([data], { type: 'audio/x-wav' });
  return URL.createObjectURL(blob);
};

export const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
