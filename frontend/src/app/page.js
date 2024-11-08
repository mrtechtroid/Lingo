import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div id = "nav" className="fixed top-0 left-0 w-full h-16  z-50 text-white">
        <span style={{color:"#58cc02",}}><Image src = "/logo.png" alt="logo" width={50} height = {50} priority />Lingo</span>
        <a href="#" class="nes-badge">
          <span class="is-primary">Home</span>
        </a>
        <a href="#" class="nes-badge">
          <span class="is-primary">About</span>
        </a>
        <a href="#" class="nes-badge">
          <span class="is-primary">FAQ</span>
        </a>
      </div>
    </div>
  );
}
