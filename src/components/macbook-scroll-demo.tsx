import { MacbookScroll } from "@/components/ui/macbook-scroll";

export function MacbookScrollDemo() {
  return (
<div className="w-full overflow-hidden bg-zinc-900 dark:bg-[#0B0B0F]">
      <MacbookScroll
        title={
  <span className="text-4xl font-bold text-white dark:text-white">
    Modern Templates For Your SaaS Site. <br /> For Free.
  </span>
}
        badge={
          <a href="https://peerlist.io/manuarora">
            <Badge className="h-10 w-10 -rotate-12 transform" />
          </a>
        }
        src="/linear.png"
        showGradient={false}
      />
    </div>
  );
}

const Badge = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* keep all your existing <path> tags here */}
    </svg>
  );
};