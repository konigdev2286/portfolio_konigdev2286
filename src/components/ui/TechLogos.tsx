import React from "react";

interface TechLogoProps {
  className?: string;
  size?: number;
}

export function NextjsLogo({ className = "w-5 h-5", size }: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 180 180"
      className={className}
      width={size}
      height={size}
      fill="currentColor"
    >
      <mask height="180" maskUnits="userSpaceOnUse" width="180" x="0" y="0">
        <circle cx="90" cy="90" fill="#fff" r="90" />
      </mask>
      <g mask="url(#mask0)">
        <circle cx="90" cy="90" fill="#000" r="90" />
        <path
          d="M149.508 157.438L69.147 54H54V125.97h12.113V69.384l72.661 93.309a90.045 90.045 0 0010.734-5.255z"
          fill="url(#paint0_linear)"
        />
        <rect fill="url(#paint1_linear)" height="72" width="12" x="115" y="54" />
      </g>
      <defs>
        <mask id="mask0">
          <circle cx="90" cy="90" fill="#fff" r="90" />
        </mask>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear"
          x1="109"
          x2="144.5"
          y1="116.5"
          y2="160.5"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear"
          x1="121"
          x2="120.799"
          y1="54"
          y2="106.875"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FlutterLogo({ className = "w-5 h-5", size }: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="currentColor"
    >
      <path
        d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zM6.02 15.672L0 21.693 2.314 24l8.333-8.328-4.627-4.627zm8.28 0l-3.7 3.702 4.613 4.626h7.401l-8.314-8.328z"
        fill="#02569B"
      />
      <path
        d="M14.314 0h7.37L6 15.7l-3.7-3.7L14.314 0z"
        fill="#0175C2"
      />
      <path
        d="M10.606 19.374l3.694-3.702 3.706 3.702-3.694 3.702-3.706-3.702z"
        fill="#29B6F6"
      />
      <path
        d="M14.3 23.076l3.706-3.702 4.61 4.626h-7.4l-.916-.924z"
        fill="#01579B"
      />
    </svg>
  );
}

export function TypeScriptLogo({ className = "w-5 h-5", size }: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="none"
    >
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M11.5 13.5H9.5V20H7.5V13.5H5.5V11.8H11.5V13.5ZM17.8 14.2C17.8 13.1 16.9 12.3 15.3 11.9C13.8 11.5 13.3 11.1 13.3 10.4C13.3 9.7 13.9 9.3 14.9 9.3C15.9 9.3 16.5 9.7 16.8 10.5L18.4 9.8C17.9 8.5 16.6 7.7 14.9 7.7C12.8 7.7 11.3 8.8 11.3 10.6C11.3 12.1 12.3 13 13.9 13.4C15.4 13.8 15.8 14.3 15.8 15C15.8 15.7 15.1 16.2 14.1 16.2C12.8 16.2 12.1 15.6 11.7 14.5L10.1 15.2C10.7 16.8 12.1 17.8 14.1 17.8C16.4 17.8 17.8 16.5 17.8 14.2Z"
        fill="white"
      />
    </svg>
  );
}

export function ReactLogo({ className = "w-5 h-5", size }: TechLogoProps) {
  return (
    <svg
      viewBox="-11.5 -10.23174 23 20.46348"
      className={className}
      width={size}
      height={size}
      fill="none"
    >
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function PythonLogo({ className = "w-5 h-5", size }: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
    >
      <path
        d="M11.914 0C5.781 0 6.16 2.656 6.16 2.656L6.168 5.41h5.836v.834H3.81S0 5.803 0 11.956c0 6.151 3.328 5.927 3.328 5.927l1.987-.005v-2.787s-.108-3.328 3.27-3.328h5.637s3.162.052 3.162-3.056V3.056S17.87 0 11.914 0zM8.7 1.722a1.002 1.002 0 110 2.004 1.002 1.002 0 010-2.004z"
        fill="#3776AB"
      />
      <path
        d="M12.086 24c6.133 0 5.754-2.656 5.754-2.656l-.008-2.754h-5.836v-.834h8.194S24 18.197 24 12.044c0-6.151-3.328-5.927-3.328-5.927l-1.987.005v2.787s.108 3.328-3.27 3.328H9.778s-3.162-.052-3.162 3.056v5.656S6.13 24 12.086 24zm3.214-1.722a1.002 1.002 0 110-2.004 1.002 1.002 0 010 2.004z"
        fill="#FFD43B"
      />
    </svg>
  );
}

export function JavaScriptLogo({ className = "w-5 h-5", size }: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="none"
    >
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M12.5 18C12.8 19 13.6 19.6 14.8 19.6C16 19.6 16.8 19 16.8 18C16.8 17 16.2 16.6 14.8 16L14 15.7C12 14.8 11 13.9 11 12C11 9.9 12.6 8.5 15 8.5C16.8 8.5 18.1 9.4 18.7 11L16.5 12C16.2 11.2 15.6 10.7 14.8 10.7C14 10.7 13.4 11.2 13.4 12C13.4 12.8 13.9 13.2 15.1 13.7L15.9 14C18.2 15 19.2 16 19.2 18C19.2 20.3 17.4 21.8 14.7 21.8C12.4 21.8 10.9 20.5 10.2 18.7L12.5 18ZM5.5 18.2L7.7 17.5C8.1 18.5 8.7 19.1 9.8 19.1C10.8 19.1 11.4 18.5 11.4 16.8V8.7H13.8V16.8C13.8 19.8 12.2 21.3 9.8 21.3C7.7 21.3 6.2 20.1 5.5 18.2Z"
        fill="#000"
      />
    </svg>
  );
}

export function CppLogo({ className = "w-5 h-5", size }: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="none"
    >
      <rect width="24" height="24" rx="4" fill="#00599C" />
      <path
        d="M11.5 7.5C9.3 7.5 7.5 9.3 7.5 11.5v1c0 2.2 1.8 4 4 4 1.6 0 3-1 3.6-2.3l-1.8-.8c-.3.7-1 1.1-1.8 1.1-1.1 0-2-0.9-2-2v-1c0-1.1.9-2 2-2 .8 0 1.5.4 1.8 1.1l1.8-.8C14.5 8.5 13.1 7.5 11.5 7.5zM16.5 10.5v1h-1v1h1v1h1v-1h1v-1h-1v-1h-1zM20 10.5v1h-1v1h1v1h1v-1h1v-1h-1v-1h-1z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function DartLogo({ className = "w-5 h-5", size }: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
    >
      <path
        d="M4.108 0L0 4.108l14.49 14.49 5.402-5.402L4.108 0z"
        fill="#01579B"
      />
      <path
        d="M4.108 0L0 4.108l4.108 4.108 5.402-5.402L4.108 0z"
        fill="#29B6F6"
      />
      <path
        d="M14.49 18.598L8.21 24h10.8L24 18.598H14.49z"
        fill="#02569B"
      />
      <path
        d="M19.892 13.196L14.49 18.598H24l-4.108-5.402z"
        fill="#0175C2"
      />
      <path
        d="M9.51 2.814l-5.402 5.402 10.382 10.382 5.402-5.402L9.51 2.814z"
        fill="#00B0FF"
      />
    </svg>
  );
}

export function SupabaseLogo({ className = "w-5 h-5", size }: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="none"
    >
      <path
        d="M13.435 23.364c-.79.947-2.315.421-2.37-.81L10.5 13H21.5c1.173 0 1.832 1.347 1.115 2.275l-9.18 8.089z"
        fill="url(#supabase-grad-a)"
      />
      <path
        d="M10.565.636c.79-.947 2.315-.421 2.37.81L13.5 11H2.5C1.327 11 .668 9.653 1.385 8.725l9.18-8.089z"
        fill="#3ECF8E"
      />
      <defs>
        <linearGradient
          id="supabase-grad-a"
          x1="13.5"
          y1="11"
          x2="17"
          y2="23.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#249361" />
          <stop offset="1" stopColor="#3ECF8E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PostgreSQLLogo({ className = "w-5 h-5", size }: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="none"
    >
      <rect width="24" height="24" rx="4" fill="#336791" />
      <path
        d="M12 4C7.58 4 4 7.58 4 12c0 3.1 1.76 5.8 4.36 7.15.17-.4.38-.93.58-1.5-.7-.47-1.14-1.26-1.14-2.15 0-1.38 1.12-2.5 2.5-2.5.55 0 1.06.18 1.48.49.53-.78 1.25-1.4 2.1-1.78-.11-.53-.18-1.07-.18-1.61 0-3.31 2.69-6 6-6 .54 0 1.08.07 1.6.2C19.12 5.58 15.82 4 12 4z"
        fill="#FFFFFF"
      />
      <path
        d="M16 11c0-1.66-1.34-3-3-3s-3 1.34-3 3c0 .87.37 1.65.96 2.19.4-.64.96-1.17 1.64-1.54.12-.41.51-.7 1.01-.7.58 0 1.05.47 1.05 1.05 0 .28-.11.53-.29.72.82.26 1.51.78 1.98 1.48.4-.61.65-1.34.65-2.2z"
        fill="#83B6D9"
      />
    </svg>
  );
}

export function N8nLogo({ className = "w-5 h-5", size }: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="none"
    >
      <rect width="24" height="24" rx="4" fill="#FF6D5A" />
      <path
        d="M6 15.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm12 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-6-5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        fill="#FFFFFF"
      />
      <path
        d="M8.5 13h7M8.5 12l3.5-3.5M12 8.5l3.5 3.5"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MistralLogo({ className = "w-5 h-5", size }: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="none"
    >
      <rect width="24" height="24" rx="4" fill="#131313" stroke="#FA520F" strokeWidth="0.8" />
      <rect x="4.5" y="5" width="3" height="3" fill="#FA520F" />
      <rect x="16.5" y="5" width="3" height="3" fill="#FA520F" />
      <rect x="4.5" y="9.5" width="6" height="3" fill="#FF8400" />
      <rect x="13.5" y="9.5" width="6" height="3" fill="#FF8400" />
      <rect x="4.5" y="14" width="15" height="3" fill="#FFB703" />
      <rect x="7.5" y="18" width="9" height="2" fill="#FFE248" />
    </svg>
  );
}

export function OpenAILogo({ className = "w-5 h-5", size }: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.737a4.485 4.485 0 0 1 2.365-1.993v5.68a.78.78 0 0 0 .388.677l5.815 3.355-2.02 1.169a.076.076 0 0 1-.067 0L4.01 14.839a4.505 4.505 0 0 1-1.67-6.102zm16.597 3.855l-5.833-3.387L15.119 8a.076.076 0 0 1 .067 0l4.811 2.776a4.5 4.5 0 0 1-.679 8.21v-5.698a.79.79 0 0 0-.38-.696zm2.723-4.148l-.141-.085-4.779-2.76a.776.776 0 0 0-.78 0l-5.844 3.37V6.637a.08.08 0 0 1 .033-.062L14.96 3.78a4.504 4.504 0 0 1 6.699 4.664zM8.742 15.35l-2.02-1.164a.076.076 0 0 1-.038-.057V8.544a4.5 4.5 0 0 1 7.37-3.454l-.142.08-4.778 2.758a.795.795 0 0 0-.392.681v6.741zm1.096-3.355l2.602-1.5 2.607 1.5v3.003l-2.607 1.5-2.602-1.5V12z" />
    </svg>
  );
}

export function AnthropicLogo({ className = "w-5 h-5", size }: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="currentColor"
    >
      <path
        d="M13.827 2.05h3.945l6.228 19.9h-4.004l-1.396-4.577H10.15l-1.396 4.577H4.75L10.978 2.05h2.849zm1.748 12.164L12.4 3.996h-.048l-3.175 10.218h6.398zM5.38 2.05h3.58l-5.38 19.9H0L5.38 2.05z"
        fill="#D97757"
      />
    </svg>
  );
}
