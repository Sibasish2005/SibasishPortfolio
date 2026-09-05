import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0D0D0D',
          borderRadius: 40,
          border: '6px solid #FF5500',
          position: 'relative',
        }}
      >
        <svg
          width="114"
          height="114"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Futuristic Cyber Monogram S */}
          <path
            d="M18.5 6C18.5 4.34315 17.1569 3 15.5 3H8C6.067 3 4.5 4.567 4.5 6.5C4.5 8.433 6.067 10 8 10H16C17.933 10 19.5 11.567 19.5 13.5C19.5 15.433 17.933 17 16 17H7.5C5.84315 17 4.5 15.6569 4.5 14"
            stroke="#FF5500"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Technical Telemetry Point */}
          <circle cx="18.5" cy="5" r="1.5" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
