import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import InvitationCard from "./components/InvitationCard";
import Celebration from "./components/Celebration";
import { getStage } from "./data/invitationMessages";
import { getNextNoPosition, type Position } from "./utils/noButtonPosition";

function App() {
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState<Position | null>(null);
  const [accepted, setAccepted] = useState(false);

  const handleNoAttempt = useCallback(() => {
    setNoPosition((previous) => getNextNoPosition(previous));
    setNoAttempts((attempts) => attempts + 1);
  }, []);

  const handleYes = useCallback(() => setAccepted(true), []);

  const stage = getStage(noAttempts);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-sky-100 p-4">
      <AnimatePresence mode="wait">
        {accepted ? (
          <Celebration key="celebration" />
        ) : (
          <InvitationCard
            key="invitation"
            stage={stage}
            noAttempts={noAttempts}
            noPosition={noPosition}
            onYes={handleYes}
            onNoAttempt={handleNoAttempt}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
