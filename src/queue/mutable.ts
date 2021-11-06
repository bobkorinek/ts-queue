import { Queue } from '..';

export const createQueue = <T>(limit?: number): Queue<T> => {
    const items: T[] = [];
    const emptyQueue: Queue<T> = {
        enqueue: (item: T) => emptyQueue,
        dequeue: () => emptyQueue,
        getDequeuedItem: () => undefined,
    };

    let dequeuedItem: T | undefined;

    const queue: Queue<T> = {
        ...emptyQueue,
        getDequeuedItem: () => dequeuedItem,
    };

    queue.enqueue = (item: T) => {
        if (limit && items.length >= limit) {
            throw new Error('Queue is full');
        }

        items.push(item);

        return queue;
    };

    queue.dequeue = () => {
        if (items.length === 0) {
            throw new Error('Queue is empty');
        }

        dequeuedItem = items.shift();

        return queue;
    };

    return queue as Queue<T>;
};
