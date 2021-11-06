import 'mocha';
import * as assert from 'assert';
import { createImmutableQueue, createQueue } from '../src';

describe('Test', () => {
    describe('Queue', () => {
        it('creates queue', () => {
            const queue = createQueue<unknown>();

            assert.ok(queue.dequeue);
            assert.ok(queue.enqueue);
        });
    });

    describe('Immutable Queue', () => {
        it('creates queue', () => {
            const queue = createImmutableQueue<unknown>();

            assert.ok(queue.dequeue);
            assert.ok(queue.enqueue);
        });

        it('enqueues and dequeues items', () => {
            const queue = createImmutableQueue<number>();

            const filledQueue = queue.enqueue(1).enqueue(2);

            assert.equal(filledQueue.dequeue().getDequeuedItem(), 1);
            assert.equal(filledQueue.dequeue().dequeue().getDequeuedItem(), 2);
        });
    });
});
