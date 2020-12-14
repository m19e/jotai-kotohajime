import { atom } from "jotai";

export type TodoAtom = {
    title: string;
    done: boolean;
};

export const filterAtom = atom("all");
export const todosAtom = atom([atom({ title: "test todo 0", done: false })]);
export const filteredAtom = atom((get) => {
    const filter = get(filterAtom);
    const todos = get(todosAtom);
    if (filter === "all") return todos;
    else if (filter === "done") return todos.filter((atom) => get(atom).done);
    else return todos.filter((atom) => !get(atom).done);
});
