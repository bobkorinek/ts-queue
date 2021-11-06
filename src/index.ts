export { createQueue } from './queue/mutable';
export { createImmutableQueue } from './queue/immutable';

export interface Queue<T> {
    enqueue(item: T): Queue<T>;

    dequeue(): Queue<T>;

    getDequeuedItem(): T | undefined;
}
