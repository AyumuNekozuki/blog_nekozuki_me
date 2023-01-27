import React from 'react';

export default function MisskeyIcon({ color, className }: any) {
	const setColor = color || 'black';

	return (
		<svg className={className} width='265' height='186' viewBox='0 0 265 186' fill='black' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M32.2922 0.000263331C28.5287 -0.0150515 24.7939 0.637743 21.2606 1.93232C15.002 4.13383 9.84266 8.09414 5.80045 13.796C1.93588 19.3127 0 25.4702 0 32.2729V153.107C0 161.933 3.13293 169.571 9.38443 176.004C15.8275 182.259 23.4685 185.384 32.2922 185.384C41.3137 185.384 48.9485 182.259 55.2067 176.011C61.6497 169.571 64.8631 161.933 64.8631 153.107V131.137C64.9316 126.378 69.8347 127.63 72.3179 131.137C76.9553 139.169 86.7979 146.072 98.2619 146.031V146.038C109.718 145.99 119.24 140.332 124.205 131.137C126.087 128.921 131.389 125.141 131.936 131.137V153.107C131.936 161.933 135.061 169.571 141.313 176.004C147.763 182.259 155.394 185.384 164.224 185.384C173.239 185.384 180.881 182.259 187.139 176.011C193.582 169.571 196.796 161.933 196.796 153.107V32.2729C196.796 25.4702 194.773 19.3127 190.73 13.796C186.859 8.08744 181.797 4.13383 175.546 1.93232C171.866 0.640615 168.187 0.000263331 164.507 0.000263331C154.569 0.000263331 146.196 3.86247 139.383 11.5878L106.614 49.9193C105.882 50.4731 103.439 54.6889 98.2547 54.6889C93.0839 54.6889 90.924 50.4735 90.1851 49.9265L57.133 11.5878C50.5123 3.86247 42.2302 0.000263331 32.2922 0.000263331ZM236.503 0.00361525C228.774 0.00361525 222.149 2.76267 216.632 8.27743C211.296 13.6099 208.629 20.1383 208.629 27.8636C208.629 35.589 211.296 42.2107 216.632 47.7255C222.149 53.0579 228.774 55.7241 236.503 55.7241C244.232 55.7241 250.856 53.0579 256.378 47.7255C261.895 42.2107 264.652 35.589 264.652 27.8636C264.652 20.1383 261.895 13.6099 256.378 8.27743C250.856 2.76267 244.232 0.00361525 236.503 0.00361525ZM236.775 61.2456C229.046 61.2456 222.421 64.0051 216.904 69.5199C211.386 75.039 208.629 81.6597 208.629 89.3851V157.524C208.629 165.248 211.386 171.87 216.904 177.385C222.426 182.718 229.051 185.384 236.775 185.384C244.509 185.384 251.043 182.718 256.378 177.385C261.895 171.87 264.652 165.248 264.652 157.524V89.3851C264.652 81.6554 261.895 75.0346 256.378 69.5199C251.039 64.0051 244.504 61.2456 236.775 61.2456Z' />
		</svg>
	);
}
