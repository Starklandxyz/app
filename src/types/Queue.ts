export class Queue<T> {
    private items: T[] = [];

    enqueue(item: T) {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    clone(): Queue<T> {
        const q = new Queue<T>()
        q.items = Array.from(this.items);
        return q
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }
}