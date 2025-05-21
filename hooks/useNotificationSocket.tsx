import { NotificationDataType } from '@/types/notificationSliceType';
import { useEffect } from 'react';
import { useToast } from './useToast';

type NotificationData = NotificationDataType & {
  error?: string;
  unread_count: number;
};

type UseNotificationSocketProps = {
  token: string | null | undefined;
  onMessage?: (data: NotificationData) => void;
};

export function useNotificationSocket({ token, onMessage }: UseNotificationSocketProps) {
  /*--Custom Hooks--*/
  const toast = useToast();

  useEffect(() => {
    const socketRef = { current: null as WebSocket | null };
    if (token && !socketRef.current) {
      const socket = new WebSocket(
        `wss://${process.env.NEXT_PUBLIC_API_BASE_DOMAIN}/ws/notification?token=${token}`
      );

      socketRef.current = socket;

      socket.onopen = () => {
        console.log('WebSocket connected');
      };

      socket.onmessage = (event) => {
        try {
          const data: NotificationData = JSON.parse(event.data);
          if (data?.error) {
            toast("error", data?.error);
          } else {
            console.log("data--->", data)
            toast("success", data?.message);
            onMessage?.(data);
          }
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socket.onclose = (event) => {
        console.log('WebSocket closed:', event);
      };
    }

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN || WebSocket.CONNECTING) {
        socketRef?.current?.close();
        console.log('WebSocket cleaned up');
      }
    };
  }, [token, onMessage, toast]);
}
