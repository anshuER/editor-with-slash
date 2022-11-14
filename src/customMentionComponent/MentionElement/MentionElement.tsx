import React from "react";
import { getHandler, Value } from "@udecode/plate-core";
import { getRootProps } from "@udecode/plate-styled-components";
import { useFocused, useSelected } from "slate-react";
import { getMentionElementStyles } from "./MentionElement.styles";
import { MentionElementProps } from "./MentionElement.types";

export const MentionElement = <V extends Value>(
  props: MentionElementProps<V>
) => {
  const {
    attributes,
    children,
    nodeProps,
    element,
    prefix,
    onClick,
    renderLabel,
  } = props;

  const rootProps = getRootProps(props);

  const selected = useSelected();
  const focused = useFocused();
  console.log("selected", selected);
  console.log("focused", focused);

  const styles = getMentionElementStyles({ ...props, selected, focused });
  console.log("styles", styles);
  console.log("rootProps", rootProps);

  return (
    <span
      {...attributes}
      data-slate-value={element.value}
      className={styles.root.className}
      css={styles.root.css}
      contentEditable={false}
      onClick={getHandler(onClick, element)}
      {...rootProps}
      {...nodeProps}
    >
      {prefix}
      {renderLabel ? renderLabel(element) : element.value}
      {children}
    </span>
  );
};
