import React from "react";
import { Provider, atom, useAtom, WritableAtom } from "jotai";
import { filterAtom, todosAtom, filteredAtom, TodoAtom } from "./store";

type FilteredProps = {
    remove: (todo: any) => void;
};

type TodoItemsProps = FilteredProps & {
    atom: any;
};

const TodoItem = ({ atom, remove }: TodoItemsProps) => {
    const [item, setItem] = useAtom(atom);
    const toggleDone = () => setItem((prev: TodoAtom) => ({ ...prev, done: !prev.done }));
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <input type="checkbox" checked={(item as TodoAtom).done} onChange={toggleDone} style={{ padding: "8px" }} />
            <span style={{ padding: "8px", textDecoration: (item as TodoAtom).done ? "line-through" : "" }}>{(item as TodoAtom).title}</span>
            <button onClick={() => remove(atom)} style={{ margin: "8px" }}>
                remove
            </button>
        </div>
    );
};

const Filter = () => {
    const [filter, set] = useAtom(filterAtom);
    const handleWatchedRadios = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        set(e.currentTarget.value);
    };
    return (
        <div>
            <input type="radio" value="all" checked={filter === "all"} onChange={handleWatchedRadios} />
            <label>ALL</label>
            <input type="radio" value="done" checked={filter === "done"} onChange={handleWatchedRadios} />
            <label>DONE</label>
            <input type="radio" value="notyet" checked={filter !== "all" && filter !== "done"} onChange={handleWatchedRadios} />
            <label>NOT YET</label>
        </div>
    );
};

const Filtered = ({ remove }: FilteredProps) => {
    const [todos] = useAtom(filteredAtom);
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "300px", justifyContent: "start" }}>
            {todos.map((todo, i) => (
                <TodoItem key={i} atom={todo} remove={remove} />
            ))}
        </div>
    );
};

const TodoList = () => {
    const [todos, setTodos] = useAtom(todosAtom);
    const remove = (todo: any) => {
        setTodos((prev) => prev.filter((item) => item !== todo));
    };
    const add = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const title = e.currentTarget.inputTitle.value;
        e.currentTarget.inputTitle.value = "";
        setTodos((prev: any) => [...prev, atom({ title, done: false })]);
        // setTodos((prev) => prev);
    };

    return (
        <form onSubmit={add}>
            <Filter />
            <input name="inputTitle" placeholder="Type..." style={{ width: "300px", fontSize: "1.5rem" }} />
            <Filtered remove={remove} />
        </form>
    );
};

const App = () => (
    <Provider>
        <div style={{ width: "100%", height: "100vh" }}>
            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                <h1 style={{ textAlign: "center", fontSize: "6rem", margin: "8px" }}>Jōtai</h1>
                <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TodoList />
                </div>
            </div>
        </div>
    </Provider>
);
export default App;
