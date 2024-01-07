import { Dialog } from '@headlessui/react';
import { useState } from 'react';

function FullScreenModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [hasAnswered, setHasAnswered] = useState(false)

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
     
    </Dialog>
  );
}

export default FullScreenModal;
