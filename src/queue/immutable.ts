import { Queue } from '..';

export const createImmutableQueue = <T>(limit?: number): Queue<T> => {
    const emptyImmutableQueue: Queue<T> = {
        enqueue: (item: T) => emptyImmutableQueue,
        dequeue: () => emptyImmutableQueue,
        getDequeuedItem: () => undefined,
    };
    const dequeue = (items: T[]): Queue<T> => {
        if (items.length === 0) {
            throw new Error('Queue is empty');
        }

        const dequeuedItem = items[0];
        const reducedItems = items.slice(1);

        return {
            dequeue: () => dequeue(reducedItems),
            enqueue: (item: T) => enqueue(reducedItems, item),
            getDequeuedItem: () => dequeuedItem,
        };
    };

    const enqueue = (
        items: T[],
        item: T,
        getDequeuedItem: () => T | undefined = () => undefined
    ) => {
        if (limit && items.length >= limit) {
            throw new Error('Queue is full');
        }

        const newItems = [...items, item];

        return {
            dequeue: () => dequeue(newItems),
            enqueue: (item: T) => enqueue(newItems, item),
            getDequeuedItem: getDequeuedItem,
            items: newItems,
        };
    };

    return {
        enqueue: (item: T) => enqueue([], item),
        dequeue: () => dequeue([]),
        getDequeuedItem: () => undefined,
    };
};
