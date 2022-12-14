import { PlateEditor, Value } from "@udecode/plate-core";
import isHotkey from "is-hotkey";
import { findMentionInput } from "../queries/findMentionInput";
import { removeMentionInput } from "../transforms/removeMentionInput";
import { KeyboardEventHandler } from "./KeyboardEventHandler";
import {
  moveSelectionByOffset,
  MoveSelectionByOffsetOptions,
} from "./moveSelectionByOffset";

export const mentionOnKeyDownHandler: <V extends Value>(
  options?: MoveSelectionByOffsetOptions<V>
) => (editor: PlateEditor<V>) => KeyboardEventHandler =
  (options) => (editor) => (event) => {
    console.log("mentionOnKeyDownHandler");
    if (isHotkey("escape", event)) {
      event.preventDefault();
      const currentMentionInput = findMentionInput(editor)!;
      if (currentMentionInput) {
        removeMentionInput(editor, currentMentionInput[1]);
      }
      return true;
    }

    return moveSelectionByOffset(editor, options)(event);
  };
