import {
  comboboxActions,
  ComboboxOnSelectItem,
  comboboxSelectors,
  Data,
  NoData,
  TComboboxItem,
} from "@udecode/plate-combobox";
import {
  getBlockAbove,
  getPlugin,
  insertNodes,
  insertText,
  isEndPoint,
  moveSelection,
  PlatePluginKey,
  removeNodes,
  select,
  TNodeProps,
  withoutMergingHistory,
  withoutNormalizing,
  setNodes,
} from "@udecode/plate-core";
import {
  getPluginType,
  ELEMENT_UL,
  toggleIndentList,
  getPreventDefaultHandler,
  // toggleMark,
  isMarkActive,
  Simplify,
  TEditor,
  TextOf,
  UnionToIntersection,
  MARK_BOLD,
} from "@udecode/plate";

import { ELEMENT_MENTION, ELEMENT_MENTION_INPUT } from "./createMentionPlugin";
import { MentionPlugin, TMentionElement } from "./types";
import { clear } from "@testing-library/user-event/dist/clear";
import { useSlate } from "slate-react";
import { toggleMark } from "@udecode/slate-plugins";
import { Transforms } from "slate";

export interface CreateMentionNode<TData extends Data> {
  (
    item: TComboboxItem<TData>,
    meta: CreateMentionNodeMeta
  ): TNodeProps<TMentionElement>;
}

export interface CreateMentionNodeMeta {
  search: string;
}

export const getMentionOnSelectItem =
  <TData extends Data = NoData>({
    key = ELEMENT_MENTION,
  }: PlatePluginKey = {}): ComboboxOnSelectItem<TData> =>
  (editor, item) => {
    console.log("getMentionOnSelectItem");
    const targetRange = comboboxSelectors.targetRange();
    if (!targetRange) return;

    const {
      type,
      options: { insertSpaceAfterMention, createMentionNode },
    } = getPlugin<MentionPlugin>(editor as any, key);

    const pathAbove = getBlockAbove(editor)?.[1];
    const isBlockEnd = () =>
      editor.selection &&
      pathAbove &&
      isEndPoint(editor, editor.selection.anchor, pathAbove);

    withoutNormalizing(editor, () => {
      const props = createMentionNode!(item, {
        search: comboboxSelectors.text() ?? "",
      });

      select(editor, targetRange);

      withoutMergingHistory(editor, () =>
        removeNodes(editor, {
          match: (node) => node.type === ELEMENT_MENTION_INPUT,
        })
      );

      if (
        props.value === "bold" ||
        props.value === "italic" ||
        props.value === "underline" ||
        props.value === "strikethrough" ||
        props.value === "code"
      ) {
        const type = getPluginType(editor, MARK_BOLD);
        console.log(
          "  ="
          // getPreventDefaultHandler(toggleMark, editor, { key: type })
        );
        // const editorss = useSlate();
        editor.addMark(props.value, true);
        // Editor.addMark(editor, getPluginType(editor, MARK_BOLD), true);
        // toggleMark(editor, props.value);
        // insertNodes<TMentionElement>(editor, {
        //   type: "p",
        //   children: [{ text: "", [`${props.value}`]: true }],
        // } as TMentionElement);
        console.log("insertSpaceAfterMention", insertSpaceAfterMention);
      } else if (props.value === "ul") {
        toggleIndentList(editor, {
          listStyleType: "disc",
        });
        insertNodes<TMentionElement>(editor, {
          type: getPluginType(editor, ELEMENT_UL),
          children: [{ type: "li", text: "" }],
        } as unknown as TMentionElement);
      } else {
        // const editorss = useSlate();

        Transforms.setNodes(editor as any, { type: props.value } as any);
        // setNodes(editor, getPluginType(editor, props.value));
        // insertNodes<TMentionElement>(editor, {
        //   type: `${props.value}`,
        //   children: [{ text: "" }],
        //   // ...props,
        // } as TMentionElement);
      }
    });

    return comboboxActions.reset();
  };
