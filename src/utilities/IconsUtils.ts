export function weatherIcon(imageName: string) {
  const icons = <Record<string, { default: string }>>(
    import.meta.glob("../assets/icons/weather/*.png", { eager: true })
  );
  const [iconKey] = Object.keys(icons).filter((icon) =>
    icon.includes(imageName)
  );

  return icons[iconKey].default;
}
