import { useSelector } from "react-redux";
import styles from "./offlineBanner.module.css";

export const OfflineBanner = () => {
   const isOnline = useSelector((state: any) => state.network.isOnline);
  if (isOnline) return null;

  return (
    <div role="status" className={styles.banner}>
      You're offline. Changes are saved on this device and will sync automatically when you reconnect.
    </div>
  );
};
