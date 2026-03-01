interface USPItem {
  icon: string;
  text: string;
}

interface USPBarProps {
  items?: USPItem[];
}

export default function USPBar({ 
  items = [
    { icon: "✔️", text: "DNase / RNase Free" },
    { icon: "✔️", text: "Pyrogen & Endotoxin Free" },
    { icon: "✔️", text: "Sterile Packaging" },
    { icon: "✔️", text: "ISO 13485 Certified Facility" },
    { icon: "✔️", text: "Compatible with Major Automation Platforms" }
  ]
}: USPBarProps) {
  return (
    <div className="trust-bar">
      {items.map((item, index) => (
        <div key={index} className="trust-item">
          <span className="trust-icon">{item.icon}</span>
          {item.text}
        </div>
      ))}
    </div>
  );
}
