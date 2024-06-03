export function isEnterKeyPressedWithoutShift(event: React.KeyboardEvent<HTMLTextAreaElement>): boolean {
  return event.key === 'Enter' && !event.shiftKey;
}
