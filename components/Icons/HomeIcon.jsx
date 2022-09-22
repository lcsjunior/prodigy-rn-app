import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

// https://transform.tools/svg-to-react-native

function HomeIcon({ color = '#000', ...props }) {
  return (
    <Svg
      height="20px"
      id="Layer_1"
      viewBox="0 0 20 20"
      width="20px"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 20 20"
      {...props}
    >
      <G opacity={0}>
        <Path className="st1" d="M-2 -2H-1V21H-2z" />
        <Path
          className="st1"
          transform="rotate(90 10 21.5)"
          d="M9.5 9.5H10.5V33.5H9.5z"
        />
      </G>
      <Path
        d="M19.99 6.313L10 .071.012 6.313l1.06 1.697L2 7.43V17c0 1.103.897 2 2 2h5v-8h2v8h5c1.103 0 2-.897 2-2V7.43l.929.58 1.06-1.697zM16 17h-3v-6c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v6H4V6.18l6-3.75 6 3.75V17z"
        fill={color}
      />
    </Svg>
  );
}

export default HomeIcon;
