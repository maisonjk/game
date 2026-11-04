import { Capacitor } from '@capacitor/core';
import { ENTITLEMENT_ID, PRICE_FALLBACK, PRODUCT_ID } from '../data/meta';

/**
 * One-time "Unlock All Worlds" purchase via RevenueCat.
 * The public iOS SDK key (starts with "appl_") is injected at build time as VITE_RC_IOS_KEY.
 * On web, or without a key, purchases are unavailable and the paywall says so.
 */
const RC_KEY = import.meta.env.VITE_RC_IOS_KEY as string | undefined;
const native = Capacitor.isNativePlatform();

type RC = typeof import('@revenuecat/purchases-capacitor').Purchases;
let rc: RC | null = null;
let ready: Promise<boolean> | null = null;

export const purchasesAvailable = () => native && !!RC_KEY;

function init(): Promise<boolean> {
  if (!purchasesAvailable()) return Promise.resolve(false);
  if (!ready) {
    ready = (async () => {
      try {
        const mod = await import('@revenuecat/purchases-capacitor');
        rc = mod.Purchases;
        await rc.configure({ apiKey: RC_KEY! });
        return true;
      } catch (e) {
        console.warn('[purchases] init failed', e);
        return false;
      }
    })();
  }
  return ready;
}

type CustomerInfoLike = {
  entitlements?: { active?: Record<string, unknown> };
  nonSubscriptionTransactions?: { productIdentifier: string }[];
};

function hasAccess(info: CustomerInfoLike | undefined): boolean {
  if (!info) return false;
  if (info.entitlements?.active?.[ENTITLEMENT_ID]) return true;
  return !!info.nonSubscriptionTransactions?.some((t) => t.productIdentifier === PRODUCT_ID);
}

export async function checkUnlocked(): Promise<boolean> {
  if (!(await init()) || !rc) return false;
  try {
    const { customerInfo } = await rc.getCustomerInfo();
    return hasAccess(customerInfo as CustomerInfoLike);
  } catch {
    return false;
  }
}

export async function getPrice(): Promise<string> {
  if (!(await init()) || !rc) return PRICE_FALLBACK;
  try {
    const { products } = await rc.getProducts({ productIdentifiers: [PRODUCT_ID] });
    return products[0]?.priceString ?? PRICE_FALLBACK;
  } catch {
    return PRICE_FALLBACK;
  }
}

export type PurchaseOutcome = 'success' | 'cancelled' | 'unavailable' | 'error';

export async function buyUnlock(): Promise<PurchaseOutcome> {
  if (!(await init()) || !rc) return 'unavailable';
  try {
    const { products } = await rc.getProducts({ productIdentifiers: [PRODUCT_ID] });
    const product = products[0];
    if (!product) return 'unavailable';
    const { customerInfo } = await rc.purchaseStoreProduct({ product });
    return hasAccess(customerInfo as CustomerInfoLike) ? 'success' : 'error';
  } catch (e: unknown) {
    const err = e as { userCancelled?: boolean; code?: string | number };
    if (err?.userCancelled || err?.code === '1' || err?.code === 1) return 'cancelled';
    return 'error';
  }
}

export async function restoreUnlock(): Promise<'restored' | 'none' | 'unavailable' | 'error'> {
  if (!(await init()) || !rc) return 'unavailable';
  try {
    const { customerInfo } = await rc.restorePurchases();
    return hasAccess(customerInfo as CustomerInfoLike) ? 'restored' : 'none';
  } catch {
    return 'error';
  }
}
