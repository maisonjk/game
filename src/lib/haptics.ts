import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

let enabled = true;
export const setHapticsEnabled = (on: boolean) => {
  enabled = on;
};

const native = Capacitor.isNativePlatform();

export function tap() {
  if (!enabled) return;
  if (native) Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
}

export function thud() {
  if (!enabled) return;
  if (native) Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
}

export function success() {
  if (!enabled) return;
  if (native) Haptics.notification({ type: NotificationType.Success }).catch(() => {});
}

export function warn() {
  if (!enabled) return;
  if (native) Haptics.notification({ type: NotificationType.Warning }).catch(() => {});
}
