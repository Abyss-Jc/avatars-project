interface AppLogoProps {
  className?: string;
  alt?: string;
}

export default function AppLogo({ className, alt = "App Logo" }: AppLogoProps) {
  return (
    <div className="relative">
      {/* Light logo */}
      <img
        src="/white_logo.png"
        alt={alt}
        className={`block dark:hidden ${className}`}
      />
      {/* Dark logo */}
      <img
        src="/dark_logo.png"
        alt={alt}
        className={`hidden dark:block ${className}`}
      />
    </div>
  );
}
