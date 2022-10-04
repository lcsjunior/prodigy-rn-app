import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

// https://transform.tools/svg-to-react-native

function HomeIcon({ color = '#000', ...props }) {
  return (
    <Svg
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      {...props}
    >
      <Path
        d="M23.769 11.064L13.196.491c-.643-.644-1.768-.645-2.413 0L.136 11.138a.499.499 0 00.354.854h1.5v11.5a.5.5 0 00.5.5h6a.5.5 0 00.5-.5v-8.5h6v8.5a.5.5 0 00.5.5h6a.5.5 0 00.5-.5V11.991h1.51a.496.496 0 00.51-.5.503.503 0 00-.241-.427z"
        fill={color}
      />
    </Svg>
  );
}

export default HomeIcon;
