import React, { useRef } from 'react';

interface CopyToClipboardProps {
  children: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ children }) => {
  const textRef = useRef<HTMLSpanElement>(null);

  const handleCopy = () => {
    if (textRef.current) {
      const textToCopy = textRef.current.textContent || '';
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Copied to clipboard: ' + textToCopy);
      });
    }
  };

  return (
    <span onClick={handleCopy} style={{ cursor: 'pointer' }} ref={textRef}>
      {children}
    </span>
  );
};

export default CopyToClipboard;
