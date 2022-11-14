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
import { getPluginType, ELEMENT_UL, toggleIndentList } from "@udecode/plate";

import { Transforms } from "slate";
import { ELEMENT_MENTION, ELEMENT_MENTION_INPUT } from "./createMentionPlugin";
import { MentionPlugin, TMentionElement } from "./types";

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
    console.log("item-", item);
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
      // Selectors are sensitive to operations, it's better to create everything
      // before the editor state is changed. For example, asking for text after
      // removeNodes below will return null.
      const props = createMentionNode!(item, {
        search: comboboxSelectors.text() ?? "",
      });

      select(editor, targetRange);

      withoutMergingHistory(editor, () =>
        removeNodes(editor, {
          match: (node) => node.type === ELEMENT_MENTION_INPUT,
        })
      );
      console.log("porp inside", props);

      if (
        props.value === "bold" ||
        props.value === "italic" ||
        props.value === "underline" ||
        props.value === "strikethrough" ||
        props.value === "code"
      ) {
        insertNodes<TMentionElement>(editor, {
          type: "p",
          children: [{ text: "", [`${props.value}`]: true }],
          // ...props,
        } as TMentionElement);
      } else if (props.value === "ul") {
        toggleIndentList(editor, {
          listStyleType: "disc",
        });
        insertNodes<TMentionElement>(editor, {
          type: getPluginType(editor, ELEMENT_UL),
          children: [{ type: "li", text: "" }],
          // children: [
          //   [
          //     {
          //       children: [
          //         {
          //           type: "lic",
          //           children: [{ text: "" }],
          //         },
          //       ],
          //       type: "li",
          //     },
          //   ],
          // ],
          // ...props,
        } as unknown as TMentionElement);
      } else {
        insertNodes<TMentionElement>(editor, {
          type: `${props.value}`,
          children: [{ text: "" }],
          // ...props,
        } as TMentionElement);
      }
      // move the selection after the element
      // moveSelection(editor, { unit: "offset" });

      // if (isBlockEnd() && insertSpaceAfterMention) {
      //   insertText(editor, " ");
      // }
    });

    return comboboxActions.reset();
  };
