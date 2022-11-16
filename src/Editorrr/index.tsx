import React from "react";
import {
  createComboboxPlugin,
  // createMentionPlugin,
  // MentionCombobox,
  MentionElement,
  Plate,
  TComboboxItem,
  createIndentListPlugin,
} from "@udecode/plate";
import { basicNodesPlugins } from "../basic-nodes/basicNodesPlugins";
import { editableProps } from "../common/editableProps";
import { plateUI } from "../common/plateUI";
// import { MENTIONABLES } from './mention/mentionables';
// import { mentionValue } from "../mention/mentionValue";
import { createMyPlugins, MyValue } from "../typescript/plateTypes";
import { createMentionPlugin } from "../customMention/src";
import { MentionCombobox } from "../customMentionComponent";
import { Button, Modal, Dialog } from "@mui/material";
export const MENTIONABLES: TComboboxItem[] = [
  { key: "0", text: "bold" },
  { key: "1", text: "italic" },
  {
    key: "2",
    text: "underline",
  },
  {
    key: "3",
    text: "h1",
  },
  {
    key: "4",
    text: "h2",
  },
  {
    key: "5",
    text: "h3",
  },
  {
    key: "6",
    text: "h4",
  },
  {
    key: "7",
    text: "h5",
  },
  {
    key: "8",
    text: "h6",
  },
  {
    key: "9",
    text: "blockquote",
  },
  {
    key: "10",
    text: "code_block",
  },
  {
    key: "11",
    text: "strikethrough",
  },
  {
    key: "12",
    text: "code",
  },
  {
    key: "13",
    text: "ul",
  },
];
const plugins = createMyPlugins(
  [
    ...basicNodesPlugins,
    createComboboxPlugin(),
    createMentionPlugin(),
    createIndentListPlugin(),
    createMentionPlugin({
      key: "#",
      component: MentionElement,
      // handlers: {
      //   onKeyDown: () => (e) => console.log("hanler", e),
      // },
      options: {
        trigger: "#",
        createMentionNode: (item) => ({ value: item.text }),
      },
    }),
  ],
  {
    components: plateUI,
  }
);

const Editor = ({ mentionValue, setEditorValue }: any) => {
  console.log("mentionValue", mentionValue);
  return (
    <>
      <Plate<MyValue>
        editableProps={editableProps}
        plugins={plugins}
        initialValue={mentionValue}
        onChange={(e) => setEditorValue(e)}
      >
        <MentionCombobox items={MENTIONABLES} />
        <MentionCombobox items={MENTIONABLES} pluginKey="#" />
        <MentionCombobox
          items={[MENTIONABLES[0], MENTIONABLES[1]]}
          pluginKey="/"
        />
      </Plate>
    </>
  );
};

export default Editor;
