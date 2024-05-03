import { useConnectedShop } from '@/state/shop.ts';
import { sendMessageToShop } from '@/utils/message.ts';

const useMessageToShop = () => {
  const connectedShop = useConnectedShop();
  return (type: string, payload: unknown) => {
    sendMessageToShop(connectedShop.domain, type, payload);
  };
};

export default useMessageToShop;
