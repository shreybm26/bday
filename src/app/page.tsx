import HeroSection from "@/components/sections/hero-section";
import PasswordProtectedLetter from "@/components/sections/password-protected-letter";
import NotesSection from "@/components/sections/notes-section";
import MemoriesSection from "@/components/sections/memories-section";
import GuestbookSection from "@/components/sections/guestbook-section";
import ScrollAnimator from "@/components/scroll-animator";

export default function Home() {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <HeroSection />

      <ScrollAnimator>
        <PasswordProtectedLetter />
      </ScrollAnimator>

      <ScrollAnimator>
        <NotesSection />
      </ScrollAnimator>

      <ScrollAnimator>
        <MemoriesSection />
      </ScrollAnimator>
      
      <ScrollAnimator>
        <GuestbookSection />
      </ScrollAnimator>
    </div>
  );
}
