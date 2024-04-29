import { useConnectedShop } from '@/state/shop.ts';
import { sendMessageToShop } from '@/utils/message.tsx';

const useMessage = () => {
  const connectedShop = useConnectedShop();
  return (type: string, payload: unknown) => {
    sendMessageToShop(connectedShop.domain, type, payload);
  };
};

export default useMessage;
