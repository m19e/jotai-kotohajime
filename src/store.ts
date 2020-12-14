import { atom } from "jotai";

export type TodoAtom = {
    title: string;
    done: boolean;
};

export const filterAtom = atom("all");
export const todosAtom = atom<TodoAtom[]>([]);
export const filteredAtom = atom((get) => {
    const filter = get(filterAtom);
    const todos = get(todosAtom);
    if (filter === "all") return todos;
    else if (filter === "done") return todos.filter((t) => t.done);
    else return todos.filter((t) => !t.done);
});
