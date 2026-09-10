import type { ReactNode, SVGProps } from "react";

export type IconName =
  // — UI —
  | "arrow"
  | "arrow-up-right"
  | "chevron-down"
  | "chevron-right"
  | "close"
  | "menu"
  | "play"
  | "check"
  | "star"
  | "search"
  | "quote"
  | "calendar"
  | "globe"
  | "sparkle"
  | "award"
  | "graduation"
  | "target"
  | "stethoscope"
  | "handshake"
  // — Contact / social —
  | "phone"
  | "whatsapp"
  | "mail"
  | "map-pin"
  | "clock"
  | "facebook"
  | "instagram"
  | "youtube"
  | "tiktok"
  // — Trust / values —
  | "lock"
  | "shield"
  | "heart-pulse"
  // — Domain (andrology, drawn abstract — no explicit anatomy) —
  | "microscope"
  | "wave"
  | "ultrasound"
  | "lab"
  | "dna"
  | "fertility"
  | "vitality"
  | "consultation"
  | "diagnosis"
  | "plan"
  | "procedure"
  | "follow-up"
  // — Stats —
  | "experience"
  | "patients";

/**
 * One dependency-free line-icon set — 24×24 grid, 1.6 stroke, rounded caps.
 * Centralising every glyph keeps the visual language identical everywhere.
 */
export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {renderIcon(name)}
    </svg>
  );
}

function renderIcon(name: IconName): ReactNode {
  switch (name) {
    case "arrow":
      return (
        <>
          <path d="M5 12h13" />
          <path d="M13 6l6 6-6 6" />
        </>
      );
    case "arrow-up-right":
      return (
        <>
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </>
      );
    case "chevron-down":
      return <path d="m6 9 6 6 6-6" />;
    case "chevron-right":
      return <path d="m9 6 6 6-6 6" />;
    case "close":
      return (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6 6 18" />
        </>
      );
    case "menu":
      return (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      );
    case "play":
      return <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" />;
    case "check":
      return <path d="m5 12.5 4.5 4.5L19 7" />;
    case "star":
      return (
        <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L5.5 9.7l5.9-.9L12 3.5Z" />
      );
    case "search":
      return (
        <>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-3.6-3.6" />
        </>
      );
    case "quote":
      return (
        <>
          <path d="M9 7c-2.5 1-4 3.2-4 6v4h5v-5H6.8C7 10.4 8 8.8 10 8L9 7Z" fill="currentColor" stroke="none" />
          <path d="M19 7c-2.5 1-4 3.2-4 6v4h5v-5h-3.2c.2-1.6 1.2-3.2 3.2-4L19 7Z" fill="currentColor" stroke="none" />
        </>
      );
    case "calendar":
      return (
        <>
          <rect x="4" y="5" width="16" height="16" rx="3" />
          <path d="M4 10h16M9 3v4M15 3v4" />
        </>
      );
    case "globe":
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.5 2.5 2.5 14.5 0 17M12 3.5c-2.5 2.5-2.5 14.5 0 17" />
        </>
      );
    case "sparkle":
      return (
        <path d="M12 3.5c.7 3.9 1.6 4.8 5.5 5.5-3.9.7-4.8 1.6-5.5 5.5-.7-3.9-1.6-4.8-5.5-5.5 3.9-.7 4.8-1.6 5.5-5.5ZM18 15c.3 1.7.7 2.1 2.4 2.4-1.7.3-2.1.7-2.4 2.4-.3-1.7-.7-2.1-2.4-2.4 1.7-.3 2.1-.7 2.4-2.4Z" />
      );

    case "award":
      return (
        <>
          <circle cx="12" cy="9" r="5.5" />
          <path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" />
          <path d="m9.7 9 1.6 1.6L14.3 7.5" />
        </>
      );
    case "graduation":
      return (
        <>
          <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" />
          <path d="M6.5 10.5V15c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.5" />
          <path d="M21.5 8.5v5" />
        </>
      );
    case "target":
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        </>
      );
    case "stethoscope":
      return (
        <>
          <path d="M6 3.5v5a4 4 0 0 0 8 0v-5" />
          <path d="M5 3.5h2M13 3.5h2" />
          <path d="M10 16.5c0 2.8 2.2 4 4.5 4s4.5-1.6 4.5-4.5V14" />
          <circle cx="19" cy="12" r="2.2" />
        </>
      );
    case "handshake":
      return (
        <>
          <path d="m11 6-3.5 3a2 2 0 0 0 2.6 3l1.4-1.2" />
          <path d="m3 8 4-2 5 3 3-1 6 3" />
          <path d="m21 8-3 6-4-2" />
          <path d="M12 10.8 14 13a1.8 1.8 0 0 1-2.6 2.5L10 14" />
        </>
      );

    case "phone":
      return (
        <path d="M6.5 4h3l1.4 4-2 1.3a11 11 0 0 0 5.8 5.8l1.3-2 4 1.4v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />
      );
    case "whatsapp":
      return (
        <>
          <path d="M4.5 19.5 6 15a7.5 7.5 0 1 1 3 3l-4.5 1.5Z" />
          <path d="M9.2 9c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2.1s.9 2.4 1.1 2.6c.1.2 1.8 2.9 4.4 3.9 2.2.8 2.6.7 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.4l-1.6-.8c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.5-.6-2.4-1.6-.7-.8-1.1-1.6-1.3-1.9-.1-.2 0-.4.1-.5l.5-.6c.1-.2.2-.3.3-.5 0-.2 0-.3-.1-.5l-.7-1.6c-.2-.4-.3-.4-.6-.4h-.5Z" fill="currentColor" stroke="none" />
        </>
      );
    case "mail":
      return (
        <>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
          <path d="m4.5 7 7.5 5.5L19.5 7" />
        </>
      );
    case "map-pin":
      return (
        <>
          <path d="M12 21c4-4.5 6.5-8 6.5-11a6.5 6.5 0 1 0-13 0c0 3 2.5 6.5 6.5 11Z" />
          <circle cx="12" cy="10" r="2.4" />
        </>
      );
    case "clock":
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </>
      );
    case "facebook":
      return <path d="M14.5 8.5H16V6h-2c-2 0-3.2 1.3-3.2 3.3V11H9v2.6h1.8V21h2.7v-7.4h2l.4-2.6h-2.4V9.6c0-.7.3-1.1 1-1.1Z" fill="currentColor" stroke="none" />;
    case "instagram":
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="16.6" cy="7.4" r="1" fill="currentColor" stroke="none" />
        </>
      );
    case "youtube":
      return (
        <>
          <rect x="3" y="6" width="18" height="12" rx="3.5" />
          <path d="m10.5 9.3 4.5 2.7-4.5 2.7V9.3Z" fill="currentColor" stroke="none" />
        </>
      );
    case "tiktok":
      return (
        <path d="M13 4h2.4c.3 1.8 1.4 3.2 3.6 3.5v2.4c-1.4 0-2.7-.4-3.6-1.1v5.8a4.9 4.9 0 1 1-4.9-4.9c.3 0 .5 0 .8.1v2.5a2.4 2.4 0 1 0 1.7 2.3V4Z" fill="currentColor" stroke="none" />
      );

    case "lock":
      return (
        <>
          <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" />
          <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
          <path d="M12 14.5v2.5" />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M12 3.5 5.5 6v5c0 4.2 2.7 7.4 6.5 9 3.8-1.6 6.5-4.8 6.5-9V6L12 3.5Z" />
          <path d="m9.3 12 2 2 3.4-3.6" />
        </>
      );
    case "heart-pulse":
      return (
        <>
          <path d="M12 20s-7-4.7-9-9c-1.3-2.9.4-6 3.4-6 2 0 3.1 1.2 3.6 2 .5-.8 1.6-2 3.6-2 3 0 4.7 3.1 3.4 6-.5 1.1-1.4 2.2-2.4 3.2" />
          <path d="M4 12h3l1.5-2.5L11 15l1.7-3 1 2H20" />
        </>
      );

    case "microscope":
      return (
        <>
          <path d="M6 20h12" />
          <path d="M9 20a6 6 0 0 0 6-6" />
          <path d="m8.5 13.5 3-3" />
          <rect x="10.2" y="4.2" width="4.4" height="7.6" rx="2.2" transform="rotate(45 12.4 8)" />
          <path d="M7 16.5h4" />
        </>
      );
    case "wave":
      return (
        <>
          <path d="M3 12c1.5-4 3-4 4.5 0S10.5 16 12 12s3-4 4.5 0 3 4 4.5 0" />
          <path d="M3 17c1.5-3 3-3 4.5 0" opacity="0.5" />
        </>
      );
    case "ultrasound":
      return (
        <>
          <path d="M4 8a9 9 0 0 1 16 0" />
          <path d="M7 10.5a5.5 5.5 0 0 1 10 0" opacity="0.7" />
          <path d="M10.2 13a2.4 2.4 0 0 1 3.6 0" opacity="0.5" />
          <path d="M8 16.5h8l-1.5 4h-5L8 16.5Z" />
        </>
      );
    case "lab":
      return (
        <>
          <path d="M9 3.5h6" />
          <path d="M10 3.5v6L6 17a2.5 2.5 0 0 0 2.3 3.5h7.4A2.5 2.5 0 0 0 18 17l-4-7.5v-6" />
          <path d="M8.2 14h7.6" />
        </>
      );
    case "dna":
      return (
        <>
          <path d="M8 3c0 4 8 5 8 9s-8 5-8 9" />
          <path d="M16 3c0 4-8 5-8 9s8 5 8 9" />
          <path d="M9.5 6.5h5M9.5 17.5h5M8 10h8M8 14h8" opacity="0.6" />
        </>
      );
    case "fertility":
      return (
        <>
          <circle cx="12" cy="9" r="5.5" />
          <path d="M12 14.5V21M9 18h6" />
          <circle cx="12" cy="9" r="1.6" fill="currentColor" stroke="none" />
        </>
      );
    case "vitality":
      return (
        <>
          <path d="M13 3 5 13h5l-1 8 8-10h-5l1-8Z" />
        </>
      );
    case "consultation":
      return (
        <>
          <path d="M4.5 6.5A2.5 2.5 0 0 1 7 4h6a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 13 12H8l-3.5 2.5v-8Z" />
          <path d="M11 15.5a2.5 2.5 0 0 0 2.5 2.5H16l3.5 2.5V13A2.5 2.5 0 0 0 17 10.5" opacity="0.6" />
        </>
      );
    case "diagnosis":
      return (
        <>
          <path d="M9 4v4a3 3 0 0 0 6 0V4" />
          <path d="M6 4h4M14 4h4" />
          <path d="M12 14v2a4 4 0 0 0 8 0v-1" />
          <circle cx="20" cy="13.5" r="1.8" />
        </>
      );
    case "plan":
      return (
        <>
          <rect x="4.5" y="4" width="15" height="16" rx="2.5" />
          <path d="m8 9 1.5 1.5L12.5 7M8 15l1.5 1.5L12.5 13" />
          <path d="M15 9.5h2M15 15.5h2" />
        </>
      );
    case "procedure":
      return (
        <>
          <path d="M4 15c3-1 5-3 8-8l2 2c-5 5-7 5-8 8H4v-2Z" />
          <path d="m13 5 3-3 3 3-3 3" />
          <path d="m6 18 1 1" />
        </>
      );
    case "follow-up":
      return (
        <>
          <path d="M20 8A8 8 0 1 0 21 12" />
          <path d="M20 4v4h-4" />
          <path d="m9.5 12 2 2 4-4.5" />
        </>
      );

    case "experience":
      return (
        <>
          <path d="M8 8V6a4 4 0 0 1 8 0v2" />
          <rect x="4.5" y="8" width="15" height="12" rx="2.5" />
          <path d="M12 12v4M10 14h4" />
        </>
      );
    case "patients":
      return (
        <>
          <circle cx="9" cy="8.5" r="3" />
          <path d="M4 19c0-3 2.2-5 5-5s5 2 5 5" />
          <path d="M15.5 6.5a3 3 0 0 1 0 6M17 19c0-2.4-1-4.3-2.6-5.2" opacity="0.6" />
        </>
      );

    default:
      return null;
  }
}
