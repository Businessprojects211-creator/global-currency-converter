type AdBannerProps = {
  slot: string;
  className?: string;
};

export default function AdBanner({
  slot,
  className = "",
}: AdBannerProps) {
  void slot;
  void className;
  return null;
}