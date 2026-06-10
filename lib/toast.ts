/* Single bottom-center toast pill themed by --bridge-* vars.
   Tiny event emitter so any module (terminal, battle, konami) can toast. */

export interface BridgeToastEvent {
    message: string;
    duration: number;
}

type Listener = (event: BridgeToastEvent) => void;

const listeners = new Set<Listener>();

export function bridgeToast(message: string, duration = 2600) {
    listeners.forEach((fn) => fn({ message, duration }));
}

export function onBridgeToast(fn: Listener): () => void {
    listeners.add(fn);
    return () => listeners.delete(fn);
}
