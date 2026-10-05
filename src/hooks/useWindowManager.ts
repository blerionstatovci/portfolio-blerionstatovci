import { useReducer } from "react";
import type { AppId, DockOrigin, WindowManagerState, WindowState } from "../types/app";

export type WindowManagerAction =
  | { type: "open"; id: AppId; origin: DockOrigin; position?: { x: number; y: number } }
  | { type: "focus"; id: AppId }
  | { type: "update"; id: AppId; patch: Partial<WindowState> }
  | { type: "minimize"; id: AppId; origin: DockOrigin }
  | { type: "close"; id: AppId }
  | { type: "finish"; id: AppId; status: "open" | "minimized" };

export const initialWindowManagerState: WindowManagerState = {
  windows: [],
  focus: "projects",
};

const nextZIndex = (windows: WindowState[]) => Math.max(0, ...windows.map((window) => window.z), 0) + 1;

export function windowManagerReducer(
  state: WindowManagerState,
  action: WindowManagerAction,
): WindowManagerState {
  switch (action.type) {
    case "open": {
      const z = nextZIndex(state.windows);
      const existing = state.windows.find((window) => window.id === action.id);

      if (existing) {
        return {
          focus: action.id,
          windows: state.windows.map((window) =>
            window.id === action.id
              ? { ...window, minimized: false, status: window.minimized ? "opening" : "open", z }
              : window,
          ),
        };
      }

      return {
        focus: action.id,
        windows: [
          ...state.windows,
          {
            id: action.id,
            minimized: false,
            maximized: false,
            status: "opening",
            origin: action.origin,
            z,
            x: action.position?.x,
            y: action.position?.y,
            snap: null,
          },
        ],
      };
    }
    case "focus":
      return {
        focus: action.id,
        windows: state.windows.map((window) =>
          window.id === action.id ? { ...window, z: nextZIndex(state.windows) } : window,
        ),
      };
    case "update":
      return {
        ...state,
        windows: state.windows.map((window) =>
          window.id === action.id ? { ...window, ...action.patch } : window,
        ),
      };
    case "minimize":
      return {
        ...state,
        focus: action.id,
        windows: state.windows.map((window) =>
          window.id === action.id
            ? { ...window, minimized: true, status: "minimizing", origin: action.origin }
            : window,
        ),
      };
    case "close":
      return { ...state, windows: state.windows.filter((window) => window.id !== action.id) };
    case "finish":
      return {
        ...state,
        windows: state.windows.map((window) =>
          window.id === action.id
            ? { ...window, status: action.status, minimized: action.status === "minimized" ? true : false }
            : window,
        ),
      };
    default:
      return state;
  }
}

export function useWindowManager() {
  const [state, dispatch] = useReducer(windowManagerReducer, initialWindowManagerState);

  return { state, dispatch };
}
